import React, { useEffect, useState, useCallback } from 'react';
import {Dialog, CircularProgress, Slide, } from '@material-ui/core';

import axios from 'axios';

import GameExit from './gameexit';
import GameImage from './gameimage';

import {taskgame} from './../translations/taskgame';
import EnterKeyboard from './../keyboard/enterkeyboard';

import image_thinking from './../../images/thinking.png';
import image_numbers from './../../images/trophy/numbers.png';

import './taskgame.css';

const url_prefix = 'https://supermath.xyz:3000/static/images/';
const image_error = 'sm_error.jpg';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

const ALERT = {
    NONE: 0,
    EXIT: 1,
    HELP: 2,
    SETTINGS: 3,
    IMAGE: 4,
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
    // task description -> conditions and explanation
    const [task, setTask] = useState('');
    // task exepcted result -> received from server
    const [result, setResult] = useState('?');
    // task image, sometimes necessary for task condition
    const [image, setImage] = useState('');

    const [tasksFailed, setTasksFailed] = useState({});
    const [tasksProgress, setTasksProgress] = useState({});

    const [message, setMessage]  = useState('');
    const [loading, setLoading] = useState(true);

    const [counter, setCounter] = useState(0);
    const [passed, setPassed] = useState(0);
    const [failed, setFailed] = useState(0);

    const [float_desk, setFloatDesk] = useState('left');
    const [float_board, setFloatBoard] = useState('right');

    const [animation, setAnimation] = useState('blinker 5s linear infinite');
    const [font, setFont] = useState('grey');

    const [boardanimation, setBoardAnimation] = React.useState('');
    const [board, setBoard] = React.useState('#006600');

    const [openAlert, setOpenAlert] = useState(ALERT.NONE);

    const onUpdate = useCallback((response) => {
        if ('data' in response) {
            console.table(response.data);
            if ('error' in response.data) {
                setMessage(taskgame[props.lang]['error'] + response.data.error);
                setTask('Error: ' + response.data.error);
                setImage(url_prefix + image_error);

            } else if ('id' in response.data) {
                setTask(response.data.description);
                setResult(response.data.result);
                setImage(url_prefix + response.data.image);
                setFont('grey'); setBoard('#006600');
                setAnimation('blinker 5s linear infinite');

                console.table(tasksProgress);

                if (props.lang !== response.data.lang) {
                    setMessage(taskgame[props.lang]['sorry']);
                } else {
                    setMessage('');
                }
            }
        }

        setCounter(prevCounter => prevCounter + 1);
        setLoading(false);

    }, [props.lang, tasksProgress, ]);

    const onError = useCallback((error) => {
        console.log('TaskGame.onError ' + error);
        setMessage(taskgame[props.lang]['error'] + error);
        setTask(taskgame[props.lang]['error'] + error);
        setLoading(false);

    }, [props.lang, ]);

    useEffect(() => {
        if (props.open) {
            console.log('TaskGame.useEffect -> ' + props.task.uid + ', props.user_id ' + props.user_id);

            if (counter === 0) {
                // later it will be gathered from user settings
                setFloatDesk('left'); setFloatBoard('right');

                setPassed(0); setFailed(0); setFont('grey');
                setAnimation('blinker 5s linear infinite');
                setMessage(taskgame[props.lang]['loading']);
                setTasksProgress(props.tasks_progress); 
                setTasksFailed(props.tasks_failed);

                setLoading(true);
                var data = {'lang': props.lang,
                    'level': props.task.uid,
                    'user_id': props.user_id,
                    'counter': props.tasks_progress[props.task.uid],
                    'failed': props.tasks_failed[props.task.uid],}
                axios.post('https://supermath.xyz:3000/api/gettask', data)
                    .then(onUpdate).catch(onError);
            }
        }

    }, [props.open, props.task, props.user_id, props.lang,
        props.tasks_progress, props.tasks_failed, counter, onUpdate, onError]);

    function onTaskImageLoad(event) {
        if (props.open && image !== '') {
            // console.log('onTaskImageLoad -> ' + event.toString());
        }
    }

    function onTaskImageError(event) {
        if (props.open && image !== '') {
            console.log('onTaskImageError -> ' + event.toString());
            // var http = new XMLHttpRequest();
            // http.open('HEAD', image, true);
            // http.send();
            setImage(image_thinking);
        }
    }

    function getNewTask() {
        // setTasksProgress(props.tasks_progress); 
        // setTasksFailed(props.tasks_failed);

        var data = {'lang': props.lang,
            'level': props.task.uid,
            'user_id': props.user_id,
            'counter': tasksProgress[props.task.uid],
            'failed': tasksFailed[props.task.uid],}
        axios.post('https://supermath.xyz:3000/api/gettask', data)
            .then(onUpdate).catch(onError);
    }

    function onAnswer(answer) {
        console.log('TaskGame.onAnswer -> answer ' + answer + ', expected ' + result);
        if (answer === result) {
            // tasksProgress
            console.table(tasksProgress);
            // tasks_progress[props.task.uid]
            // setTasksProgress(prevProgress => prevProgress[props.task.uid] + 1);

            setPassed(prevPassed => prevPassed + 1);
            setMessage(taskgame[props.lang]['loading']);
            setImage(image_numbers); setLoading(true);
            setTimeout(() => getNewTask(), 1100);

        } else {
            if ((passed + failed) < counter) {
                setFailed(prevFailed => prevFailed + 1);
            }

            setBoard('red'); setBoardAnimation('shake 0.6s');
            setTimeout(() => {
                setBoardAnimation('smooth_red_to_green 0.6s');
                setBoard('#006600');
            }, 800);

            setMessage(answer + ' - ' + taskgame[props.lang]['wrong_answer']);
        }
    }

    function onDialog(status) {
        console.log('TaskGame.onDialog ' + status + ', loading ' + loading);
        if (loading === false) {
            if (status === 'close') {
                setOpenAlert(ALERT.NONE); setCounter(0);
                props.onClose('close', {'passed': 0, 'failed': 0});

            } else if (status === 'next') {
                console.log('Proceed with Next Task');
                setFailed(prevPassed => prevPassed + 1);
                setMessage(taskgame[props.lang]['loading']);
                setImage(image_numbers); setLoading(true);
                setTimeout(() => getNewTask(), 1100);
                setOpenAlert(ALERT.NONE);

            } else if (status === 'image') {
                if (image.indexOf(image_error) === -1 &&
                    image.indexOf('think') === -1) {
                        setOpenAlert(ALERT.IMAGE);
                }

            } else if (status === 'exit') {
                setOpenAlert(ALERT.EXIT);

            } else if (status === 'help') {
                setOpenAlert(ALERT.HELP);

            } else if (status === 'settings') {
                setOpenAlert(ALERT.SETTINGS);

            } else if (status === 'previous') {
                console.log('Back to Previous Task, escaped');

            } else { // close
                setOpenAlert(ALERT.NONE);
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
                    <div className='taskgame_gameboard_image_wrapper' onClick={() => onDialog('image')}>
                        {loading ? (
                            <CircularProgress size={68} className='circular_progress'/>
                        ): (
                            <img src={image} alt='task' onLoad={(e) => onTaskImageLoad(e)}
                                onError={(e) => onTaskImageError(e)}
                                onContextMenu={(e) => e.preventDefault()}/>
                        )}
                    </div>

                    <div className='taskgame_gameboard_task_wrapper'
                        style={{backgroundColor: board, animation: boardanimation}}> {task} </div>
                </div>

                <div className='taskgame_body_wrapper_right' style={{'float': float_board}}>
                    <EnterKeyboard open={loading} animation={animation} onAnswer={onAnswer}/>
                </div>
            </div>

            {message.length>0 && <div className='taskgame_footer_wrapper'> {message} </div>}

            <GameExit open={openAlert === ALERT.EXIT}
                fullScreen={props.fullScreen}
                type='task'
                lang={props.lang}
                onClose={onDialog}/>

            <GameImage open={openAlert === ALERT.IMAGE}
                fullScreen={props.fullScreen}
                lang={props.lang}
                image={image}
                onClose={onDialog}/>

            <TaskLoadingDialog open={loading}/>

        </Dialog>
    );
}
