﻿import React from 'react';
import './digitgameheader.css';

import GameExit from './gameexit';
import GameHelp from './gamehelp';
import GameSettings from './gamesettings';
import GameProgress from "./digitgameprogress";

import {gameheader} from './../translations/gameheader';

const ALERT = {
    NONE: 0,
    EXIT: 1,
    HELP: 2,
    SETTINGS: 3,
    PROGRESS: 4,
}

export default function GameHeader(props) {
    const [openAlert, setOpenAlert] = React.useState(ALERT.NONE);

    const onAlertDialog = (status) => {
        console.log('GameHeader.onAlertDialog -> ' + status);
        switch (status) {
            case 'close':
                setOpenAlert(ALERT.NONE);
                props.onClick('interrapted');
                break;
            case 'exit':
                setOpenAlert(ALERT.EXIT);
                break;
            case 'help':
                setOpenAlert(ALERT.HELP);
                break;
            case 'settings':
                setOpenAlert(ALERT.SETTINGS);
                break;
            case 'progress':
                setOpenAlert(ALERT.PROGRESS);
                break;
            default:
                setOpenAlert(ALERT.NONE);
                break;
        }
    }

    return (
        <div className="games_header_div">
            <div className='games_header_div_left'>
                <font onClick={() => onAlertDialog('exit')}>SUPERMATH</font>
            </div>
            <div className='games_header_div_right' onClick={() => onAlertDialog('progress')}>
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

            <GameExit open={openAlert === ALERT.EXIT}
                fullScreen={props.width<880}
                title={gameheader[props.lang]['title']}
                text={gameheader[props.lang]['text']}
                yes={gameheader[props.lang]['yes']}
                no={gameheader[props.lang]['no']}
                type='game'
                lang={props.lang}
                onClose={onAlertDialog}/>

            <GameHelp open={openAlert === ALERT.HELP}
                description={props.description}
                fullScreen={props.width<880}
                type='game'
                lang={props.lang}
                onClose={onAlertDialog}/>

            <GameSettings open={openAlert === ALERT.SETTINGS}
                fullScreen={props.width<880}
                lang={props.lang}
                onClose={onAlertDialog}/>

            <GameProgress open={openAlert === ALERT.PROGRESS}
                total={props.total}
                passed={props.passed}
                failed={props.failed}
                results={props.results}
                onClose={onAlertDialog}/>
        </div>
    );
}
