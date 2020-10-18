import React, { useState, } from 'react';
import { Link } from '@material-ui/core';

import DigitGame from './../games/digitgame';
import TaskGame from './../games/taskgame';

import Card from './card';
import CardTask from './cardtask';

import Wave from './wave';
import Share from './share';
import Contact from './contact';

import './body.css';

import {tabs} from './../translations/tabs';
import {footer} from './../translations/footer';

import {get_belt_by_color, color_belts,} from './../halpers/programms';
import {FULL_SCREEN} from './../halpers/functions';

import {set_item} from './../halpers/localstorage';

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

const STATUS = {
    NONE: 0,
    GAME: 1,
    TASK: 2,
    SHARE: 3,
    CONTACTS: 4,
}

export default function Body(props) {
    const [color, setColor] = useState(props.belt);
    const [tasks, setTasks] = useState(get_belt_by_color(props.belt)['games']);
    const [background, setBackground] = useState(get_belt_by_color(props.belt)['bckgrnd']);

    const [game, setGame] = useState(false);
    const [description, setDescription] = useState('');

    const [status, setStatus] = useState(STATUS.NONE);

    /*React.useEffect(() => {
        console.log('Body(props) -> ' + props.belt);
    }, [props.belt, ]);*/

    function onTabChange(user_tab) {
        console.log('Body.onTabPress ' + user_tab.font);
        set_item(props.id, 'belt', user_tab.id);

        setColor(user_tab.id);
        setTasks(user_tab.games);
        setBackground(user_tab.bckgrnd);
    };

    function onGameOpen(task, description) {
        console.log('Body.onGameOpen ' + task.uid);
        setGame(task); setDescription(description);

        if (task.type === 'task') {
            setStatus(STATUS.TASK);
        } else {
            setStatus(STATUS.GAME);
        }
    }

    function onShare(property) {
        console.log('Body.Share -> ' + property);
        switch (property) {
            case 'contacts':
                setStatus(STATUS.CONTACTS);
                break;

            case 'help':
            case 'about':
            case 'register':
                setStatus(STATUS.NONE);
                props.onUpdate(property);
                break;

            default:
                setStatus(STATUS.NONE);
                break;
        }
    }

    function onGameClose(status, data) {
        if ((status === 'close') || (status === 'register')) {
            setStatus(STATUS.NONE);
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

            <div className='footer_wrapper'>
                <div className='footer_share'>
                    <font onClick={() => setStatus(STATUS.SHARE)}>{footer[props.lang]['share']}</font>
                </div>
                <div className='footer_copyright'>
                    {'Copyright © '} <Link color='inherit' href='https://supermath.xyz'>SuperMath.XYZ</Link>{'. '} {new Date().getFullYear()}
                </div>
                <div className='footer_contacts'>
                    <font onClick={() => setStatus(STATUS.CONTACTS)}>{footer[props.lang]['contacts']}</font>
                </div>
            </div>

            <DigitGame open={status === STATUS.GAME}
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

            <TaskGame open={status === STATUS.TASK}
                id={props.id}
                task={game}
                lang={props.lang}
                width={props.width}
                description={description}
                fullScreen={props.width<FULL_SCREEN}
                onClose={onGameClose}/>

            <Share open={status === STATUS.SHARE}
                user_id={props.id}
                name={props.name}
                email={props.email}
                lang={props.lang}
                fullScreen={props.width<FULL_SCREEN}
                onClose={onShare}/>

            <Contact open={status === STATUS.CONTACTS}
                user_id={props.id}
                name={props.name}
                email={props.email}
                lang={props.lang}
                fullScreen={props.width<FULL_SCREEN}
                onClose={() => setStatus(STATUS.NONE)}/>

        </div>
    );
}
