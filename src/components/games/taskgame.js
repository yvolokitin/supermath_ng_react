﻿import React, { useEffect, useState, useCallback } from 'react';
import {Dialog, Slide, } from '@material-ui/core';

import axios from 'axios';

import GameExit from './gameexit';
// import GameHelp from './gamehelp';

import {taskgame} from './../translations/taskgame';
import EnterKeyboard from './../keyboard/enterkeyboard';

import './taskgame.css';

const url_prefix = 'https://supermath.xyz:3000/static/images/';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

const ALERT = {
    NONE: 0,
    EXIT: 1,
    HELP: 2,
    SETTINGS: 3,
}

export default function TaskGame(props) {
    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(true);

    const [counter, setCounter] = useState(0);
    const [total, setTotal] = useState(0);
    const [passed, setPassed] = useState(0);
    const [failed, setFailed] = useState(0);

    const [image, setImage] = useState('');
    const [answer, setAnswer] = useState('?');
    const [result, setResult] = useState('?');

    const [float_desk, setFloatDesk] = useState('left');
    const [float_board, setFloatBoard] = useState('right');

    const [font, setFont] = useState('grey');
    const [animation, setAnimation] = useState('blinker 5s linear infinite');

    const [openAlert, setOpenAlert] = useState(ALERT.NONE);

    const onGetNewTaskUpdate = useCallback((response) => {
        if ('data' in response) {
            if ('error' in response.data) {
                console.log('onGetNewTaskUpdate error ' + response.data.error);
                setTask('Error: ' + response.data.error);
                setImage(url_prefix + 'sm_error.jpg');

            } else if ('id' in response.data) {
                console.log('onGetNewTaskUpdate ' + response.data.id + ', ' + response.data.level + ', ' + response.data.image);
                setTask(response.data.description);
                setResult(response.data.result);
                setImage(url_prefix + response.data.image);

                // set answer to ? and blinking
                setCounter(0); setFont('grey'); setAnswer('?');
                setAnimation('blinker 5s linear infinite');
            }
        }

        setLoading(false);
    }, [ ])

    const onGetNewTaskError = useCallback((error) => {
        console.log('Header.onScoresError ' + error);
        setTask('Error: ' + error);
        setLoading(false);
    }, [ ])

    const getNewTask = useCallback(() => {
        var data = {'lang': props.lang, 'level': props.task.uid}
        axios.post('https://supermath.xyz:3000/api/gettask', data)
             .then(onGetNewTaskUpdate)
             .catch(onGetNewTaskError);

    }, [props.lang, props.task, onGetNewTaskUpdate, onGetNewTaskError])

    useEffect(() => {
        if (props.open) {
            console.log('TaskGame.useEffect -> ' + props.task.uid);

            setFloatDesk('left'); setFloatBoard('right');
            setLoading(true); getNewTask();

        // } else {
            setCounter(0); setTotal(0);
            setPassed(0); setFailed(0);
            setAnswer('?'); setResult('?');
            setFont('grey'); setAnimation('blinker 5s linear infinite');
        }

    }, [props.open, props.task, getNewTask]);

    const onDialog = (status) => {
        console.log('TaskGame.onDialog ' + status);
        if (loading === false) {
            if (status === 'close') {
                setOpenAlert(ALERT.NONE);
                props.onClose('close', {'passed': 0, 'failed': 0});

            } else if (status === 'exit') {
                setOpenAlert(ALERT.EXIT);

            } else if (status === 'help') {
                setOpenAlert(ALERT.HELP);

            } else if (status === 'settings') {
                setOpenAlert(ALERT.SETTINGS);

            } else if (status === 'previous') {
                console.log('Back to Previous Task, escaped');

            } else if (status === 'next') {
                // console.log('Proceed with Next Task');
                setLoading(true); getNewTask();
                setOpenAlert(ALERT.NONE);

            } else { // close
                setOpenAlert(ALERT.NONE);
            }
        }
    }

    const onDigit = (number) => {
        // console.log('TaskGame.onDigit ' + number);
        // if result is ? -> some error from server and we have no task
        if (result !== '?') {
            if (answer === '?') {
                setAnswer(number); setFont('black');
                setAnimation('none');
            } else {
                var new_aswer = answer + number;
                setAnswer(new_aswer);
            }
        }
    }

    const onOperator = (symbol) => {
        // console.log('TaskGame.onOperator ' + symbol);
        if (symbol === 'clear' && answer !== '?' && result !== '?') {
            if (answer.length === 1) {
                setFont('grey'); setAnswer('?');
                setAnimation('blinker 5s linear infinite');
            } else {
                setAnswer(answer.slice(0, -1));
            }
        } else if (symbol === 'enter') {
            checkAnswer();
        }
    }

    function checkAnswer() {
        console.log('answer ' + answer + ', result ' + result);
        if (answer !== '?') {
            if (answer === result) {
                setTotal(total => total + 1);

                if (counter === 0) {
                    setPassed(passed => passed + 1);
                }

                setFont('green');
                setLoading(true);

                setTimeout(() => {
                    getNewTask();
                }, 1300);

            } else {
                if (counter === 0) {
                    setFailed(failed => failed + 1);
                }

                setCounter(counter => counter + 1);
            }
        }
    }

    return (
        <Dialog open={props.open} fullScreen={true} TransitionComponent={Transition} transitionDuration={900}>
            <div className='taskgame_header_wrapper'>
                <div className='taskgame_header_wrapper_left' style={{'float': float_desk}}>
                    <font style={{color: 'orange'}} onClick={() => onDialog('exit')}>SUPERMATH</font>
                </div>
                <div className='taskgame_header_wrapper_right' style={{'float': float_board}}>
                    <font style={{color: 'black'}}>
                        {total} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128279;</span>
                    </font>
                    <font style={{color: 'green'}}>
                        {passed} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                    </font>
                    <font style={{color: 'red'}}>
                        {failed} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                    </font>
                </div>
            </div>

            <div className='taskgame_body_wrapper'>
                <div className='taskgame_body_wrapper_left' style={{'float': float_desk}}>
                    <div className='taskgame_gameboard_image_wrapper'>
                        <img src={image} alt='task' onContextMenu={(e) => e.preventDefault()}/>
                    </div>

                    <div className='taskgame_gameboard_answer_wrapper'>
                        <font style={{'color': font, 'animation': animation}}> {answer} </font>
                    </div>

                    <div className='taskgame_gameboard_wrapper'> {task} </div>
                </div>

                <div className='taskgame_body_wrapper_right' style={{'float': float_board}}>
                    <EnterKeyboard navi='true' onDigit={onDigit} onOperator={onOperator}/>
                </div>
            </div>

            <div className='taskgame_footer_wrapper'> {taskgame[props.lang]['sorry']} </div>

            <GameExit open={openAlert === ALERT.EXIT}
                fullScreen={props.fullScreen}
                type='task'
                lang={props.lang}
                onClose={onDialog}/>

        </Dialog>
    );
}
