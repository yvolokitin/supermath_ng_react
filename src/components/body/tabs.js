import React, { useState, } from 'react';

import DigitGame from './../games/digitgame';
import Footer from "./footer";
import Card from './card';
import Wave from './wave';
import './tabs.css';

import {get_games_by_color, color_belts,} from './../halpers/programms';

import {set_item} from './../halpers/localstorage';
import {tabs} from './../translations/tabs';

function MenuTab(props) {
    return (
      <>
        {(props.selected) ? (
            <div className='tabs_div_wrapper' style={{backgroundColor: '#3f51b5'}}>
                <div className='tabs_div' onClick={() => props.onClick(props.id)}>
                    {(props.width<420) ? (
                        <font style={{color: props.font}}> {props.short_name} </font>
                    ) : (
                        <font style={{color: props.font}}> {props.name} </font>
                    )}
                </div>
            </div>
        ) : (
            <div className='tabs_div_wrapper' style={{backgroundColor: '#fbfbf8'}}>
                <div className='tabs_div' onClick={() => props.onClick(props.id)}>
                    {(props.width<420) ? (
                        <font style={{color: props.font}}> {props.short_name} </font>
                    ) : (
                        <font style={{color: props.font}}> {props.name} </font>
                    )}
                </div>
            </div>
        )}
      </>
    );
}

export default function Tabs(props) {
    const [color, setColor] = useState(props.belt);
    const [tasks, setTasks] = useState(get_games_by_color(props.belt));
    const [background, setBackground] = useState(props.belt);

    const [gameOpen, setGameOpen] = useState(false);
    const [game, setGame] = useState(false);

    React.useEffect(() => {
        console.log('Tabs(props) -> ' + props.belt);

    }, [props.belt, ]);

    function onTabChange(user_tab) {
        console.log('Tabs.onTabPress ' + user_tab.font);
        set_item(props.id, 'belt', user_tab.font);
        setColor(user_tab.font);
        setBackground(user_tab.bckgrnd);
        setTasks(user_tab.games);
    };

    function onGameOpen(task) {
        // console.log('Tabs.onGameOpen ' + task.id);
        setGame(task);
        setGameOpen(true);
    }

    function onGameClose(status, data) {
        if ((status === 'close') || (status === 'register')) {
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
                                id={tab.id}
                                font={tab.font}
                                width={props.width}
                                name={tabs[props.lang][tab.id]}
                                short_name={tabs[props.lang][tab.short_name]}
                                selected={color === tab.id}
                                onClick={() => onTabChange(tab)}/>
                    )}
            </div>

            <div className='tasks_wrapper'>
                {tasks.map(
                    (task) => 
                        <div key={task.uid}>
                            <Card task={task}
                                color={color}
                                lang={props.lang}
                                width={props.width}
                                onUpdate={onGameOpen}
                                nonexam={task.uid.indexOf('T') === -1}
                                locked={props.solved.toString().includes(task.uid)}/>
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
                name={props.name}
                email={props.email}
                lang={props.lang}/>

            <DigitGame open={gameOpen}
                id={props.id}
                game_uid={game.uid}
                type={game.type}
                task={game.task}
                amount={game.amount}
                lang={props.lang}
                belt={color}
                fullScreen={props.width<820}
                onClose={onGameClose}/>
        </div>
    );
}
