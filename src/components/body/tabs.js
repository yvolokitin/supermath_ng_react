import React, { useState, } from 'react';

import Card from './card';
import './tabs.css';

import {white_games, orange_games, green_games, navy_games, brown_games, black_games} from './../halpers/programms';
import {tabs} from './../translations/tabs';

export default function Tabs(props) {
    const [value, setValue] = useState('white');
    const [tasks, setTasks] = useState(white_games);

    const [white, setWhite] = React.useState('#3f51b5');
    const [orange, setOrange] = React.useState('#fbfbf8');
    const [green, setGreen] = React.useState('#fbfbf8');
    const [navy, setNavy] = React.useState('#fbfbf8');
    const [brown, setBrown] = React.useState('#fbfbf8');
    const [black, setBlack] = React.useState('#fbfbf8');

    function unset(color) {
        console.log('Tabs.unset ' + color);

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
        console.log('Tabs.onTabPress ' + color);
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
                            <Card task={task} color={value} lang={props.lang}/>
                        </div>
                    )
                }
            </div>

        </div>
    );
}
