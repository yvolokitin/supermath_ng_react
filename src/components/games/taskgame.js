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

function TaskLoadingDialog(props) {
    return (
        <Dialog open={props.open} maxWidth='md' scroll='body'
            style={{backgroundColor: 'transparent'}}
            fullScreen={props.fullScreen} fullWidth={true}>
            <> </>
        </Dialog>
    );
}

export default function TaskGame(props) {
    const [task, setTask] = useState('');
    const [message, setMessage]  = useState('');
    const [loading, setLoading] = useState(true);

    const [result, setResult] = useState('?');
    const [image, setImage] = useState('');

    const [counter, setCounter] = useState(0);
    const [passed, setPassed] = useState(0);
    const [failed, setFailed] = useState(0);

    const [float_desk, setFloatDesk] = useState('left');
    const [float_board, setFloatBoard] = useState('right');

    const [animation, setAnimation] = useState('blinker 5s linear infinite');
    const [font, setFont] = useState('grey');

    const [openAlert, setOpenAlert] = useState(ALERT.NONE);

    const onUpdate = useCallback((response) => {
        if ('data' in response) {
            console.table(response.data);
            if ('error' in response.data) {
                setMessage(taskgame[props.lang]['error'] + response.data.error);
                setTask('Error: ' + response.data.error);
                setImage(url_prefix + 'sm_error.jpg');

            } else if ('id' in response.data) {
                setTask(response.data.description);
                setResult(response.data.result);
                setImage(url_prefix + response.data.image);
                setFont('grey'); setAnimation('blinker 5s linear infinite');

                if (props.lang !== response.data.lang) {
                    setMessage(taskgame[props.lang]['sorry']);
                } else {
                    setMessage('');
                }
            }
        }

        setCounter(prevCounter => prevCounter + 1);
        setLoading(false);
    }, [props.lang, ]);

    const onError = useCallback((error) => {
        console.log('TaskGame.onError ' + error);
        setMessage(taskgame[props.lang]['error'] + error);
        setTask('Error: ' + error); setLoading(false);
    }, [props.lang, ]);

    useEffect(() => {
        if (props.open) {
            console.log('TaskGame.useEffect -> ' + props.task.uid);

            if (counter === 0) {
                setFloatDesk('left'); setFloatBoard('right');
                setPassed(0); setFailed(0); setFont('grey');
                setAnimation('blinker 5s linear infinite');

                setLoading(true); setMessage('Loading task');
                var data = {'lang': props.lang, 'level': props.task.uid}
                axios.post('https://supermath.xyz:3000/api/gettask', data)
                    .then(onUpdate).catch(onError);
            }
        }

    }, [props.open, props.task, props.lang, counter, onUpdate, onError, ]);

    const onDialog = (status) => {
        console.log('TaskGame.onDialog ' + status + ', loading ' + loading);
        if (loading === false) {
            if (status === 'close') {
                setOpenAlert(ALERT.NONE); setCounter(0);
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
                console.log('Proceed with Next Task');
                setFailed(prevPassed => prevPassed + 1);
                setMessage(taskgame[props.lang]['loading']);
                setLoading(true);

                setTimeout(() => {
                    var data = {'lang': props.lang, 'level': props.task.uid}
                    axios.post('https://supermath.xyz:3000/api/gettask', data)
                        .then(onUpdate).catch(onError);
                }, 800);

                setOpenAlert(ALERT.NONE);

            } else { // close
                setOpenAlert(ALERT.NONE);
            }
        }
    }

    function onAnswer(answer) {
        console.log('TaskGame.onAnswer -> answer ' + answer + ', expected ' + result);
        if (answer === result) {
            setPassed(prevPassed => prevPassed + 1); setLoading(true);

            setTimeout(() => {
                var data = {'lang': props.lang, 'level': props.task.uid}
                axios.post('https://supermath.xyz:3000/api/gettask', data)
                    .then(onUpdate).catch(onError);
            }, 800);

        } else {
            console.log('TaskGame.onAnswer -> WRONG ANSWER !!!');
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
                        {counter} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128279;</span>
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

                    <div className='taskgame_gameboard_task_wrapper'> {task} </div>
                </div>

                <div className='taskgame_body_wrapper_right' style={{'float': float_board}}>
                    <EnterKeyboard open={loading}
                        animation={animation}
                        onAnswer={onAnswer}/>
                </div>
            </div>

            <div className='taskgame_footer_wrapper'> {message} </div>

            <GameExit open={openAlert === ALERT.EXIT}
                fullScreen={props.fullScreen}
                type='task'
                lang={props.lang}
                onClose={onDialog}/>

            <TaskLoadingDialog open={loading}/>

        </Dialog>
    );
}
