import React, { useState, } from 'react';

import DigitGame from './../games/digitgame';
import TaskGame from './../games/taskgame';

import Card from './card';
import CardTask from './cardtask';

import Footer from "./footer";
import Wave from './wave';

import './tabs.css';

import {get_belt_by_color, color_belts,} from './../halpers/programms';
import {FULL_SCREEN} from './../halpers/functions';

import {set_item} from './../halpers/localstorage';
import {tabs} from './../translations/tabs';

function MenuTab(props) {
    return (
      <>
        {(props.selected) ? (
            <div className='tabs_div_wrapper' style={{backgroundColor: '#3f51b5'}}>
                <div className='tabs_div' onClick={() => props.onClick(props.user_tab)}>
                    {(props.width<420) ? (
                        <font style={{color: props.user_tab.font}}> {props.short_name} </font>
                    ) : (
                        <font style={{color: props.user_tab.font}}> {props.name} </font>
                    )}
                </div>
            </div>
        ) : (
            <div className='tabs_div_wrapper' style={{backgroundColor: '#fbfbf8'}}>
                <div className='tabs_div' onClick={() => props.onClick(props.user_tab)}>
                    {(props.width<420) ? (
                        <font style={{color: props.user_tab.font}}> {props.short_name} </font>
                    ) : (
                        <font style={{color: props.user_tab.font}}> {props.name} </font>
                    )}
                </div>
            </div>
        )}
      </>
    );
}

export default function Tabs(props) {
    const [color, setColor] = useState(props.belt);
    const [tasks, setTasks] = useState(get_belt_by_color(props.belt)['games']);
    const [background, setBackground] = useState(get_belt_by_color(props.belt)['bckgrnd']);

    const [gameOpen, setGameOpen] = useState(false);
    const [taskOpen, setTaskOpen] = useState(false);

    const [game, setGame] = useState(false);
    const [description, setDescription] = useState('');

    /*React.useEffect(() => {
        console.log('Tabs(props) -> ' + props.belt + ' <-');

    }, [props.belt, ]);*/

    function onTabChange(user_tab) {
        console.log('Tabs.onTabPress ' + user_tab.font);
        set_item(props.id, 'belt', user_tab.id);

        setColor(user_tab.id);
        setTasks(user_tab.games);
        setBackground(user_tab.bckgrnd);
    };

    function onGameOpen(task, description) {
        console.log('Tabs.onGameOpen ' + task.uid);
        setDescription(description);
        setGame(task);

        if (task.type === 'task') {
            setTaskOpen(true);
        } else {
            setGameOpen(true);
        }
    }

    function onGameClose(status, data) {
        if ((status === 'close') || (status === 'register')) {
            setTaskOpen(false);
            setGameOpen(false);
        }

        if (props.id > 0) {
            if (('failed' in data) && ('passed' in data)) {
                if ((data.failed > 0) || (data.passed > 0)) {
                    props.onUpdate('counter', data);
                }
            }

        } else if (status === 'register') {
            props.onUpdate(status, data);
        }
    }

    return (
        <div className='body_wrapper' style={{backgroundColor: background}}>
            <div className='tabs_wrapper'>
                {color_belts.map(
                    (tab) => <MenuTab key={tab.id}
                                user_tab={tab}
                                width={props.width}
                                name={tabs[props.lang][tab.id]}
                                short_name={tabs[props.lang][tab.short_name]}
                                selected={color === tab.id}
                                onClick={onTabChange}/>
                    )}
            </div>

            <div className='tasks_wrapper'>
                {tasks.map(
                    (task) => 
                        <div key={task.uid}>
                            {(task.type === 'task') ? (
                                <CardTask task={task}
                                    value={task.id}
                                    color={color}
                                    lang={props.lang}
                                    width={props.width}
                                    onUpdate={onGameOpen}/>
                            ) : (
                                <Card task={task}
                                    color={color}
                                    lang={props.lang}
                                    width={props.width}
                                    onUpdate={onGameOpen}
                                    nonexam={task.uid.indexOf('T') === -1}
                                    locked={props.solved.toString().includes(task.uid)}/>
                            )}
                        </div>
                )}
            </div>

            <div className='tasks_waver'>
                <Wave mask='url(#mask)' fill={'#3f51b5'}>
                    <defs>
                        <linearGradient id='gradient' gradientTransform='rotate(90)'>
                            <stop offset='0' stopColor='white' />
                            <stop offset='0.5' stopColor='black' />
                        </linearGradient>
                        <mask id='mask'>
                            <rect x='0' y='0' width='2000' height='200' fill='url(#gradient)'/>
                        </mask>
                    </defs>
                </Wave>
            </div>

            <Footer id={props.id}
                lang={props.lang}
                name={props.name}
                email={props.email}
                fullScreen={props.width<FULL_SCREEN}/>

            <DigitGame open={gameOpen}
                id={props.id}
                game_uid={game.uid}
                type={game.type}
                task={game.task}
                amount={game.amount}
                lang={props.lang}
                belt={color}
                width={props.width}
                fullScreen={props.width<FULL_SCREEN}
                onClose={onGameClose}/>

            <TaskGame open={taskOpen}
                id={props.id}
                task={game}
                lang={props.lang}
                width={props.width}
                description={description}
                onClose={onGameClose}/>
        </div>
    );
}
