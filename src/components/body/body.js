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

    const [game, setGame] = useState({type: 'linedigits', task: '0-7'});
    const [description, setDescription] = useState('');

    const [status, setStatus] = useState(STATUS.NONE);

    /*React.useEffect(() => {
        // console.log('Body(props) -> ' + props.belt);
        console.table(props.belt);
    }, [props]);*/

    function onTabChange(user_tab) {
        console.log('Body.onTabPress ' + user_tab.id + ', props.solved ' + props.solved);
        set_item(props.id, 'belt', user_tab.id);
        setBackground(user_tab.bckgrnd);
        setTasks(user_tab.games); setColor(user_tab.id);
    };

    function onGameOpen(task, description) {
        console.log('Body.onGameOpen -> type ' + task.type + ', uid ' + task.uid);
        setGame(task); setDescription(description);

        if (task.type === 'task') {
            setStatus(STATUS.TASK);
        } else {
            setStatus(STATUS.GAME);
        }
    }

    /**
     * Callback on close action from finished game or bonus
     */
    function onClose(property, data) {
        console.log('Body.onClose -> property ' + property + ', data: ' + JSON.stringify(data));
        switch (property) {
            case 'close':
                setStatus(STATUS.NONE);
                break;

            case 'contacts':
                setStatus(STATUS.CONTACTS);
                break;

            case 'help':
            case 'about':
                setStatus(STATUS.NONE);
                props.onUpdate(property);
                break;

            // data in that case is String value of bonus code
            case 'register':
                setStatus(STATUS.NONE);
                props.onUpdate(property, data);
                break;

            // data in that case is JSON Object
            case 'finished':
                props.onUpdate('counter', data);
                break;

            default:
                setStatus(STATUS.NONE);
                break;
        }

        console.log('Body.onGameClose -> status ' + status);
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
                fullScreen={props.width<FULL_SCREEN}
                user_id={props.id}
                game_uid={game.uid}
                type={game.type}
                conditions={game.task}
                amount={game.amount}
                level={props.level}
                lang={props.lang}
                belt={color}
                onClose={onClose}/>

            <TaskGame open={status === STATUS.TASK}
                fullScreen={props.width<FULL_SCREEN}
                user_id={props.id}
                task_uid={game.uid}
                task_current={props.tasks_progress[game.uid]}
                task_fails={props.tasks_failed[game.uid]}
                amount={game.amount}
                lang={props.lang}
                width={props.width}
                description={description}
                onClose={onClose}/>

            <Share open={status === STATUS.SHARE}
                fullScreen={props.width<FULL_SCREEN}
                user_id={props.id}
                name={props.name}
                email={props.email}
                lang={props.lang}
                onClose={onClose}/>

            <Contact open={status === STATUS.CONTACTS}
                fullScreen={props.width<FULL_SCREEN}
                user_id={props.id}
                name={props.name}
                email={props.email}
                lang={props.lang}
                onClose={onClose}/>

        </div>
    );
}
