import React, { useState, } from 'react';

import DigitGame from './../games/digitgame';
import Footer from "./footer";
import Card from './card';
import Wave from './wave';
import './tabs.css';

import {white_games, orange_games, green_games, navy_games, brown_games, black_games} from './../halpers/programms';
import {set_item} from './../halpers/localstorage';
import {tabs} from './../translations/tabs';

const mapping = {
    'white': white_games,
    'orange': orange_games,
    'green': green_games,
    'navy': navy_games,
    'brown': brown_games,
    'black': black_games,
};

function MenuTab(props) {
    return (
      <>
        {(props.selected) ? (
            <div className='tabs_div_wrapper' style={{backgroundColor: '#3f51b5'}}>
                <div className='tabs_div' onClick={() => props.onClick(props.id)}>
                    <font style={{color: props.font}}> {props.name} </font>
                </div>
            </div>
        ) : (
            <div className='tabs_div_wrapper' style={{backgroundColor: '#fbfbf8'}}>
                <div className='tabs_div' onClick={() => props.onClick(props.id)}>
                    <font style={{color: props.font}}> {props.name} </font>
                </div>
            </div>
        )}
      </>
    );
}

export default function Tabs(props) {
    const [color, setColor] = useState(props.belt);
    const [tasks, setTasks] = useState(mapping[props.belt]);
    const [background, setBackground] = useState(props.belt);

    const [gameOpen, setGameOpen] = useState(false);
    const [game, setGame] = useState(false);

    const colors = [
        {id: 'white', font: 'black',},
        {id: 'orange', font: 'orange',},
        {id: 'green', font: 'green',},
        {id: 'navy', font: 'navy',},
        {id: 'brown', font: 'brown',},
        {id: 'black', font: 'black',},
    ];

    function onTabChange(color) {
        console.log('Tabs.onTabPress ' + color);
        set_item(props.id, 'belt', color);

        setColor(color);
        setBackground(color);
        setTasks(mapping[color]);
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
                {colors.map(
                    (tab) => <MenuTab key={tab.id}
                                id={tab.id}
                                font={tab.font}
                                name={tabs[props.lang][tab.id]}
                                selected={color === tab.id}
                                onClick={onTabChange}/>
                    )}
            </div>

            <div className='tasks_wrapper'>
                {tasks.map(
                    (task) => <Card key={task.uid}
                                task={task}
                                color={color}
                                lang={props.lang}
                                onUpdate={onGameOpen}
                                fullScreen={props.fullScreen}
                                locked={props.solved.toString().includes(task.uid)}/>
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
                fullScreen={props.fullScreen}
                onClose={onGameClose}/>
        </div>
    );
}
