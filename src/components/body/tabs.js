import React, { useState, } from 'react';

import DigitGame from './../games/digitgame';
import Card from './card';
import Wave from './wave';
import './tabs.css';

import {white_games, orange_games, green_games, navy_games, brown_games, black_games} from './../halpers/programms';
import {tabs} from './../translations/tabs';

export default function Tabs(props) {
    const [value, setValue] = useState('white');
    const [tasks, setTasks] = useState(white_games);

    const [gameOpen, setGameOpen] = useState(false);
    const [game, setGame] = useState(false);

    const [white, setWhite] = React.useState('#3f51b5');
    const [orange, setOrange] = React.useState('#fbfbf8');
    const [green, setGreen] = React.useState('#fbfbf8');
    const [navy, setNavy] = React.useState('#fbfbf8');
    const [brown, setBrown] = React.useState('#fbfbf8');
    const [black, setBlack] = React.useState('#fbfbf8');

    function unset(color) {
        // console.log('Tabs.unset ' + color);
        if (value === 'white') {
            setWhite('#fbfbf8');
        } else if (value === 'orange') {
            setOrange('#fbfbf8');
        } else if (value === 'green') {
            setGreen('#fbfbf8');
        // #3f51b5 navi color as well
        } else if (value === '#3f51b5') {
            setNavy('#fbfbf8');
        } else if (value === 'navy') {
            setNavy('#fbfbf8');
        } else if (value === 'brown') {
            setBrown('#fbfbf8');
        } else if (value === 'black') {
            setBlack('#fbfbf8');
        }
    }

    function onTabPress(color) {
        // console.log('Tabs.onTabPress ' + color);
        if (color !== value) {
            if (color === 'white') {
                setWhite('#3f51b5');
                setTasks(white_games);
            } else if (color === 'orange') {
                setOrange('#3f51b5');
                setTasks(orange_games);
            } else if (color === 'green') {
                setGreen('#3f51b5');
                setTasks(green_games);
            } else if (color === 'navy') {
                setNavy('#3f51b5');
                setTasks(navy_games);
            } else if (color === 'brown') {
                setBrown('#3f51b5');
                setTasks(brown_games);
            } else if (color === 'black') {
                setBlack('#3f51b5');
                setTasks(black_games);
            }

            // unset previous tab
            unset(color);

            // set body background color
            if (color !== 'navy') {
                setValue(color);
            } else {
                setValue('#3f51b5');
            }
        }
    };

    function onGameOpen(task) {
        setGame(task);
        setGameOpen(true);
    }

    function onGameClose(status, passed, failed) {
        console.log('Tabs.onGameClose ' + status + ': ' + passed + ', ' + failed);

        // this.props.onClose(status, pass, fail);
        if (status === 'close') {
            setGameOpen(false);
            if ((failed > 0) || (passed > 0)) {
                props.onUpdate('counter', passed, failed);
            }

        } else if (status === 'register') {
            setGameOpen(false);
            props.onUpdate('register', passed, failed);

        } else if (status === 'replay') {
            props.onUpdate('counter', passed, failed);

        } else if (status === 'interrapted') {
            var fail = failed + parseInt(localStorage.getItem('fail'));
            var pass = parseInt(localStorage.getItem('pass'));
            props.onUpdate('counter', pass, fail);
            setGameOpen(false);

        } else {
            console.log('ERROR: Unknown onClose property called ' + status);
            alert('ERROR: Unknown onClose property called ' + status);
            setGameOpen(false);
        }
    }

    return (
        <div className='body_wrapper' style={{backgroundColor: value}}>
            <div className='tabs_wrapper'>
                <div className='tabs_div_wrapper' style={{backgroundColor: white}}>
                    <div className='tabs_div' onClick={() => onTabPress('white')}>
                        <font style={{color: 'black'}}> {tabs[props.lang]['white']} </font>
                    </div>
                </div>
                <div className='tabs_div_wrapper' style={{backgroundColor: orange}}>
                    <div className='tabs_div' onClick={() => onTabPress('orange')}>
                        <font style={{color: 'orange'}}> {tabs[props.lang]['orange']} </font>
                    </div>
                </div>
                <div className='tabs_div_wrapper' style={{backgroundColor: green}}>
                    <div className='tabs_div' onClick={() => onTabPress('green')}>
                        <font style={{color: 'green'}}> {tabs[props.lang]['green']} </font>
                    </div>
                </div>
                <div className='tabs_div_wrapper' style={{backgroundColor: navy}}>
                    <div className='tabs_div' onClick={() => onTabPress('navy')}>
                        <font style={{color: '#3f51b5'}}> {tabs[props.lang]['navy']} </font>
                    </div>
                </div>
                <div className='tabs_div_wrapper' style={{backgroundColor: brown}}>
                    <div className='tabs_div' onClick={() => onTabPress('brown')}>
                        <font style={{color: 'brown'}}> {tabs[props.lang]['brown']} </font>
                    </div>
                </div>
                <div className='tabs_div_wrapper' style={{backgroundColor: black}}>
                    <div className='tabs_div' onClick={() => onTabPress('black')}>
                        <font style={{color: 'black'}}> {tabs[props.lang]['black']} </font>
                    </div>
                </div>
            </div>

            <div className='tasks_wrapper'>
                {tasks.map(
                    (task) =>
                        <div key={task.id}>
                            <Card task={task} color={value} lang={props.lang} onUpdate={onGameOpen}/>
                        </div>
                    )
                }
            </div>

            <div className='tasks_footer'>
                <Wave mask='url(#mask)' fill='#3f51b5'>
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

            <DigitGame open={gameOpen}
                       type={game.type}
                       task={game.task}
                       amount={game.amount}
                       lang={props.lang}
                       belt={value}
                       onClose={onGameClose}/>

        </div>
    );
}
