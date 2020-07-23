﻿import React, { useEffect, useState, useCallback } from 'react';
import {Dialog, Slide, } from '@material-ui/core';

import axios from 'axios';

import ColorLine from './../line/line';
import AlertDialog from './../alert/alert';
import {gameheader} from './../translations/gameheader';

import KeyBoard from './../keyboard/keyboard';

import './taskgame.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function TaskGame(props) {
    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(true);

    const [counter, setCounter] = useState(0);
    const [total, setTotal] = useState(0);
    const [passed, setPassed] = useState(0);
    const [failed, setFailed] = useState(0);

    const [answer, setAnswer] = useState('?');
    const [result, setResult] = useState('?');

    const [font, setFont] = useState('grey');
    const [animation, setAnimation] = useState('blinker 5s linear infinite');

    const [openAlert, setOpenAlert] = useState(false);

    const onGetNewTaskUpdate = useCallback((response) => {
        if ('data' in response) {
            if ('error' in response.data) {
                console.log('onGetNewTaskUpdate ' + response.data.id + ', ' + response.data.level);
                setTask('Error: ' + response.data.error);

            } else if ('id' in response.data) {
                console.log('onGetNewTaskUpdate ' + response.data.id + ', ' + response.data.level);
                setTask(response.data.description);
                setResult(response.data.result);

                // set answer to ? and blinking
                setCounter(0); setFont('grey'); setAnswer('?');
                setAnimation('blinker 5s linear infinite');
            }
        }

        setLoading(false);

    }, [ ])

    const onGetNewTaskError = useCallback((error) => {
        console.log('Header.onScoresError ' + error);
        setLoading(false);
    }, [ ])

    const getNewTask = useCallback(() => {
        var data = {'lang': props.lang, 'level': props.task.uid}
        axios.post('http://supermath.xyz:3000/api/gettask', data)
             .then(onGetNewTaskUpdate)
             .catch(onGetNewTaskError);

    }, [props.lang, props.task, onGetNewTaskUpdate, onGetNewTaskError])

    useEffect(() => {
        console.log('TaskGame.useEffect -> ' + props.task.uid);
        if (props.open === true) {
            setLoading(true);
            getNewTask();
        } else {
            setCounter(0); setTotal(0);
            setPassed(0); setFailed(0);
            setAnswer('?'); setResult('?');
            setFont('grey'); setAnimation('blinker 5s linear infinite');
        }

    }, [props.open, props.task, getNewTask]);

    const onAlertDialog = (status) => {
        if (loading === false) {
            if (status === 'logout') {
                props.onClose('close', {'passed': 0, 'failed': 0});
            }
            setOpenAlert(false);
        }
    }

    const onDigit = (number) => {
        console.log('TaskGame.onDigit ' + number);
        if (answer === '?') {
            setAnswer(number); setFont('black');
            setAnimation('none');
        } else {
            var new_aswer = answer + number;
            setAnswer(new_aswer);
        }
    }

    const onOperator = (symbol) => {
        console.log('TaskGame.onOperator ' + symbol);
        if (symbol === 'clear' && answer !== '?') {
            if (answer.length === 1) {
                setFont('grey'); setAnswer('?');
                setAnimation('blinker 5s linear infinite');
            } else {
                setAnswer(answer.slice(0, -1));
            }
        }
    }

    function checkAnswer() {
        console.log('answer ' + answer + ', result ' + result);
        if (answer !== '?') {
            if (answer === result) {
                setTotal(total + 1);
                if (counter === 0) {
                    setPassed(passed + 1);
                }

                setTimeout(() => {
                    getNewTask();
                }, 700);

            } else {
                if (counter === 0) {
                    setFailed(failed + 1);
                }

                setCounter(counter + 1);
            }
        }
    }

    return (
        <Dialog open={props.open} fullScreen={true} TransitionComponent={Transition} transitionDuration={900}>
            <div className='taskgame_header_div'>
                <div className='taskgame_header_div_left'>
                    <font onClick={() => setOpenAlert(true)}>SUPERMATH</font>
                </div>
                <div className='taskgame_header_div_right'>
                    <font style={{color: 'black'}}>
                        {total} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128279;</span>
                    </font> &nbsp;
                    <font style={{color: 'green'}}>
                        {passed} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                    </font> &nbsp;
                    <font style={{color: 'red'}}>
                        {failed} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                    </font>
                </div>
            </div>

            <ColorLine margin={'0px'}/>

            <div className='taskgame_board_wrapper'>
                <div className='taskgame_body_div_left'>
                    <div className='taskgame_line_gameboard'>
                        {task}
                    </div>
                </div>

                <div className='taskgame_body_div_right'>
                    <div className='taskgame_body_div_right_wrapper'>
                        <div className='taskgame_body_div_right_up'>
                            <div className='taskgame_answer'>
                                <font style={{'color': font, 'animation': animation}}>
                                    {answer}
                                </font>
                            </div>

                            <div className='taskgame_answer_btn' onClick={checkAnswer}>
                                {gameheader[props.lang]['answer']}
                            </div>
                        </div>

                        <div className='taskgame_body_div_right_down'>
                            <KeyBoard onDigit={onDigit} onOperator={onOperator}/>
                        </div>
                    </div>
                </div>
            </div>

            <AlertDialog open={openAlert}
                fullScreen={props.fullScreen}
                title={gameheader[props.lang]['title']}
                text={''}
                yes={gameheader[props.lang]['yes']}
                no={gameheader[props.lang]['no']}
                onClose={onAlertDialog}/>
        </Dialog>
    );
}
