import React, { useEffect, useState } from 'react';
import {Dialog, DialogContent, Slide} from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import ReplayIcon from '@material-ui/icons/Replay';
import CategoryIcon from '@material-ui/icons/Category';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import RadialChart from "./../charts/radialchart";
import GameProgress from "./gameprogress";

import Title from './../title/title';
import ColorLine from './../line/line';

import image from './../../images/time.png';

import {gameresults} from './../translations/gameresults';

import './gameresults.css';

const FULL_SCREEN = 890;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function GameResults(props) {
    // if 
    const [progress, setProgress] = useState(false);

    const [title, setTitle] = useState('');
    const [scores, setScores] = useState({});
    const [data, setData] = useState({});

    const handleChange = (event, value) => {
        console.log('GameProgress.handleChange ' + value);
        if (value === 'results') {
            setProgress(true);

        } else {
            props.onClose(value, data);
        }
    }

    useEffect(() => {
        var current_rates = calculate_rates(props.duration, props.passed, props.amount);
        setScores(current_rates);
        setData({
            'operation': 'results',
            'passed': props.passed,
            'failed': props.failed,
            'duration': props.duration,
            'percent': current_rates.percent,
            'rate': current_rates.rate,
            'belt': props.belt,
            'task': props.type,
            'game_uid': props.game_uid,
        });

        setTitle(gameresults[props.lang]['time'] + current_rates.hours + ' ' + gameresults[props.lang]['hours']
            + ', ' + current_rates.minutes + ' ' + gameresults[props.lang]['minutes']
            + ', ' + current_rates.seconds + ' ' + gameresults[props.lang]['seconds']);

    }, [props.user_id, props.game_uid, props.passed, props.failed, props.results, props.type,
        props.amount, props.duration, props.belt, props.lang]);

    function calculate_rates(duration, passed, amount) {
        var hours = 0, minutes = 0, seconds = 0;
        if (duration > (1000 * 60 * 60)) {
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
            duration = duration - hours*(1000 * 60 * 60);
        }
        if (duration > (1000 * 60)) {
            minutes = Math.floor((duration / (1000 * 60)) % 60);
            duration = duration - minutes*(1000 * 60);
        }
        if (duration > 1000) {
            seconds = Math.floor((duration / 1000) % 60);
        }

        var rate = 'really_bad';
        var percent = 100 * passed / amount;
        if (percent > 99) { rate = 'excellent';
        } else if (percent > 95) { rate = 'quite_good';
        } else if (percent > 90) { rate = 'good';
        } else if (percent > 80) { rate = 'well';
        } else if (percent > 60) { rate = 'not_well';
        } else if (percent > 40) { rate = 'quite_bad';}

        return {'percent': percent, 'rate': rate, 'hours': hours, 'minutes': minutes, 'seconds': seconds}
    }

    return (
        <Dialog open={props.open} fullScreen={true} TransitionComponent={Transition} transitionDuration={900}>
            <Title title={title} src={image} onClose={() => props.onClose('close', data)} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <div className='result_board'>
                <div className='result_board_chart'>
                    <font style={{color:'#248f24',}}>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span> &nbsp; {props.passed} &nbsp;
                    </font>
                    &nbsp; <RadialChart progress={scores.percent}/> &nbsp;
                    <font style={{color:'red',}}>
                        &nbsp; {props.failed} &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                    </font>
                </div>

                { (props.user_id > 0) ? (
                    <div className='result_board_body'>
                        {gameresults[props.lang]['reach']} &nbsp; <font style={{color:'orange'}}> {gameresults[props.lang][scores.rate]} </font>
                        &nbsp; {gameresults[props.lang]['score']} &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#129504;</span>
                        &nbsp; {gameresults[props.lang]['brain']} &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128138;</span>
                        &nbsp; {gameresults[props.lang]['pill']} {gameresults[props.lang]['smart']}
                        &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128170;</span> &nbsp;
                        {gameresults[props.lang]['health']} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128540;</span>
                    </div>
                ) : (
                    <div className='result_board_body'>
                        {gameresults[props.lang]['reach']} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#9757;</span> &nbsp;
                        <font style={{color:'orange'}}> {gameresults[props.lang][scores.rate]} </font> &nbsp; {gameresults[props.lang]['score']}
                        &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128202;</span>
                        <font style={{color:'red'}}> {gameresults[props.lang]['register']} </font>
                        <font style={{color:'orange'}}> {gameresults[props.lang]['save_results']} </font>
                    </div>
                )}
            </div>

            <DialogContent scroll='body'>
                <BottomNavigation onChange={handleChange} showLabels>
                    <BottomNavigationAction label={gameresults[props.lang]['replay']} value='replay' icon={<ReplayIcon/>}/>
                    <BottomNavigationAction label={gameresults[props.lang]['results']} value='results' icon={<CategoryIcon/>}/>
                    <BottomNavigationAction label={gameresults[props.lang]['close']} value='close' icon={<HighlightOffIcon/>}/>
                </BottomNavigation>
            </DialogContent>

            <GameProgress open={progress}
                fullScreen={props.width<FULL_SCREEN}
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
