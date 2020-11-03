import React from 'react';
import {Dialog, DialogContent, Slide} from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import ReplayIcon from '@material-ui/icons/Replay';
import CategoryIcon from '@material-ui/icons/Category';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import RadialChart from "./../charts/radialchart";
import GameProgress from "./gameprogress";

import Title from './../title/title';
import ColorLine from './../line/line';

import image from './../../images/time.png';

import {gameresults} from './../translations/gameresults';

import './gameresults.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function GameResults(props) {
    const [progress, setProgress] = React.useState(false);
    const [title, setTitle] = React.useState('');

    const [background, setBackground] = React.useState('white');
    const [game, setGame] = React.useState('');

    const handleChange = (event, value) => {
        console.log('GameResults.handleChange ' + value + ', props.user_id ' + props.user_id);
        if (value === 'results') {
            setProgress(true);
        } else {
            props.onClose(value);
        }
    }

    React.useEffect(() => {
        if (props.open) {
            console.log('GameResults.useEffect -> data: ' + JSON.stringify(props.data));

            var title_to_set = gameresults[props.lang]['time'] + ' ';

            var duration = props.data.duration, hours = 0, minutes = 0, seconds = 0;
            if (duration > (1000 * 60 * 60)) {
                hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
                duration = duration - hours*(1000 * 60 * 60);
                title_to_set = title_to_set + hours + ' ' + gameresults[props.lang]['hours'] + ', ';
            }

            if (duration > (1000 * 60)) {
                minutes = Math.floor((duration / (1000 * 60)) % 60);
                duration = duration - minutes*(1000 * 60);
                title_to_set = title_to_set + minutes + ' ' + gameresults[props.lang]['minutes']+ ', ';
            }

            if (duration > 1000) {
                seconds = Math.floor((duration / 1000) % 60);
            }

            setTitle(title_to_set + seconds + ' ' + gameresults[props.lang]['seconds']);

            setBackground(props.data.belt);
            setGame(props.data.game_uid);
        }

    }, [props.open, props.data, props.lang, ]);

    return (
        <Dialog open={props.open} fullScreen={true} TransitionComponent={Transition} transitionDuration={900}>
            <Title title={title} src={image} onClose={() => props.onClose('close')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <div className='result_board'>
                {(game.indexOf('T') === -1) ? (
                    <div className='result_board_chart' onClick={() => handleChange('', 'results')}>
                        <font style={{color:'#248f24',}}>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span> &nbsp; {props.data.passed} &nbsp;
                        </font>
                        &nbsp; <RadialChart progress={props.data.percent}/> &nbsp;
                        <font style={{color:'red',}}>
                            &nbsp; {props.data.failed} &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                        </font>
                    </div>
                ) : (
                    <div className='result_board_belt' style={{backgroundColor: background}} onClick={() => handleChange('', 'results')}>

                    </div>
                )}

                {(props.user_id > 0) ? (
                    <div className='result_board_body'>
                        {gameresults[props.lang]['reach']} &nbsp; <font style={{color:'orange'}}> {gameresults[props.lang][props.data.rate]} </font>
                        &nbsp; {gameresults[props.lang]['score']} &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#129504;</span>
                        &nbsp; {gameresults[props.lang]['brain']} &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128138;</span>
                        &nbsp; {gameresults[props.lang]['pill']} {gameresults[props.lang]['smart']}
                        &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128170;</span> &nbsp;
                        {gameresults[props.lang]['health']} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128540;</span>
                    </div>
                ) : (
                    <div className='result_board_body'>
                        {gameresults[props.lang]['reach']} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#9757;</span> &nbsp;
                        <font style={{color:'orange'}}> {gameresults[props.lang][props.data.rate]} </font> &nbsp; {gameresults[props.lang]['score']}
                        &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128202;</span>
                        <font style={{color:'red'}}> {gameresults[props.lang]['register']} </font>
                        <font style={{color:'orange'}}> {gameresults[props.lang]['save_results']} </font>
                    </div>
                )}
            </div>

            <DialogContent scroll='body'>
                <BottomNavigation onChange={handleChange} showLabels>
                    <BottomNavigationAction label={gameresults[props.lang]['replay']} value='restart' icon={<ReplayIcon/>} style={{transform:'scale(1.7)'}}/>
                    <BottomNavigationAction label={gameresults[props.lang]['results']} value='results' icon={<CategoryIcon/>} style={{transform:'scale(1.7)'}}/>
                    <BottomNavigationAction label={gameresults[props.lang]['close']} value='close' icon={<HighlightOffIcon/>} style={{transform:'scale(1.7)'}}/>

                    {props.user_id === 0 &&
                        <BottomNavigationAction label={gameresults[props.lang]['registration']} value='register' icon={<AccountCircleIcon/>} style={{transform:'scale(1.7)'}}/>
                    }
                </BottomNavigation>
            </DialogContent>

            <GameProgress open={progress}
                fullScreen={props.FULL_SCREEN}
                from='results'
                lang={props.lang}
                total={props.total}
                passed={props.passed}
                failed={props.failed}
                results={props.results}
                onClose={() => setProgress(false)}/>

        </Dialog>
    );
}
