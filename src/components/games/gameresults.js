import React, { useEffect, useState } from 'react';

import RadialChart from "./../charts/radialchart";
import GameProgress from "./digitgameprogress";

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';

import './gameresults.css';
import {gameresults} from './../translations/gameresults';

export default function GameResults(props) {
    const [results, setResults] = useState(false);
    const [scores, setScores] = useState({});
    const [data, setData] = useState({});

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

    }, [props.id, props.game_uid, props.passed, props.failed, props.results, props.type,
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
        <div className='result_board_wrapper'>
            <SMTitle title='' onClick={() => props.onClose('close', data)}/>
            <ColorLine/>

            <div className='result_board'>
                <div className='result_board_title_wrapper'>
                    <div className='result_board_title_left'>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#9201;</span>
                        &nbsp; {gameresults[props.lang]['time']} 
                    </div>
                    <div className='result_board_title_right'>
                        {scores.hours} {gameresults[props.lang]['hours']},&nbsp;
                        {scores.minutes} {gameresults[props.lang]['minutes']},&nbsp;
                        {scores.seconds} {gameresults[props.lang]['seconds']}
                    </div>
                </div>

                <div className='result_board_chart' onClick={() => setResults(true)}>
                    <font style={{color:'#248f24',}}>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span> &nbsp; {props.passed} &nbsp;
                    </font>
                    &nbsp; <RadialChart progress={scores.percent}/> &nbsp;
                    <font style={{color:'red',}}>
                        &nbsp; {props.failed} &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                    </font>
                </div>
                <div className='result_board_body'>
                        {gameresults[props.lang]['reach']} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#9757;</span> &nbsp;
                        <font style={{color:'orange'}}> {gameresults[props.lang][scores.rate]} </font> {gameresults[props.lang]['score']}
                        &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128202;</span>
                </div>

                { (props.id > 0) ? (
                    <>
                        <div className='result_board_body'>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#129504;</span> {gameresults[props.lang]['brain']}
                        </div>
                        <div className='result_board_body'>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128138;</span> {gameresults[props.lang]['pill']}
                        </div>
                        <div className='result_board_body'>
                            {gameresults[props.lang]['smart']} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128170;</span>
                            {gameresults[props.lang]['health']} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128540;</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='result_board_body' onClick={() => props.onClose('register', data)} style={{cursor:'pointer'}}>
                            <font style={{color:'red'}}> {gameresults[props.lang]['register']} </font>
                        </div>
                        <div className='result_board_body' onClick={() => props.onClose('register', data)} style={{cursor:'pointer'}}>
                            <font style={{color:'orange'}}> {gameresults[props.lang]['save_results']} </font>
                        </div>
                    </>
                )}
            </div>

            <div className='result_board_button_wrapper'>
                <div className='result_board_button_left'>
                    <div className='result_board_button' onClick={() => setResults(true)}>
                        {gameresults[props.lang]['show']}
                    </div>
                    { (props.id === 0) ? (
                        <div className='result_board_button' onClick={() => props.onClose('register', data)}>
                            {gameresults[props.lang]['registration']}
                        </div>
                    ) : ( null )}
                </div>

                <div className='result_board_button_right'>
                    <div className='result_board_button' onClick={() => props.onClose('replay', data)}>
                        {gameresults[props.lang]['play']}
                        </div>
                    <div className='result_board_button' onClick={() => props.onClose('close', data)}>
                        {gameresults[props.lang]['close']}
                    </div>
                </div>
            </div>

            <GameProgress open={results}
                total={props.total}
                passed={props.passed}
                failed={props.failed}
                results={props.results}
                onClose={() => setResults(false)}/>
        </div>
    );
}
