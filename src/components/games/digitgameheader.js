﻿import React from 'react';
import './digitgameheader.css';

import GameExit from './gameexit';
import GameProgress from "./digitgameprogress";

import {gameheader} from './../translations/gameheader';

export default function GameHeader(props) {
    const [value, setValue] = React.useState(false);
    const [progress, setProgress] = React.useState(false);

    const onAlertDialog = (status) => {
        if (status === 'logout') {
            props.onClick('interrapted');
        }
        setValue(false);
    }

    const onGameProgress = (status) => {
        setProgress(false);
    }

    return (
        <div className="games_header_div">
            <div className='games_header_div_left'>
                <font onClick={() => setValue(true)}>SUPERMATH</font>
            </div>
            <div className='games_header_div_right' onClick={() => setProgress(true)}>
                <font style={{color: 'black'}}>
                    {props.total} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128279;</span>
                </font>
                <font style={{color: 'green'}}>
                    {props.passed} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                </font>
                <font style={{color: 'red'}}>
                    {props.failed} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                </font>
            </div>

            <GameExit open={value}
                fullScreen={props.fullScreen}
                title={gameheader[props.lang]['title']}
                text={gameheader[props.lang]['text']}
                yes={gameheader[props.lang]['yes']}
                no={gameheader[props.lang]['no']}
                onClose={onAlertDialog}/>

            <GameProgress open={progress}
                total={props.total}
                passed={props.passed}
                failed={props.failed}
                results={props.results}
                onClose={onGameProgress}/>
        </div>
    );
}
