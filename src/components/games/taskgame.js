import React, { useEffect, useState, useCallback } from 'react';
import {Dialog, CircularProgress, Slide, } from '@material-ui/core';

import axios from 'axios';

import GameExit from './gameexit';
import GameImage from './gameimage';
import GameResults from './gameresults';

import {taskgame} from './../translations/taskgame';
import EnterKeyboard from './../keyboard/enterkeyboard';

import {get_rate_per_percent} from './../halpers/functions';

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
    RESULTS: 5,
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
    const [image, setImage] = useState(image_numbers);

    const [error, setError] = useState('');

    const [results, setResults] = React.useState([]);
    const [resultData, setResultData] = React.useState({});

    const [current, setCurrent] = useState(0);
    const [fails, setFails] = useState('');

    const [message, setMessage]  = useState('');
    const [loading, setLoading] = useState(true);

    const [duration, setDuration] = React.useState(new Date().getTime());

    const [counter, setCounter] = useState(0);
    const [passed, setPassed] = useState(0);
    const [failed, setFailed] = useState(0);

    const [float_desk, setFloatDesk] = useState('left');
    const [float_board, setFloatBoard] = useState('right');

    const [boardanimation, setBoardAnimation] = React.useState('');
    const [board, setBoard] = React.useState('#006600');

    const [openAlert, setOpenAlert] = useState(ALERT.NONE);

    const onUpdate = useCallback((response) => {
        console.log('TaskGame.onUpdate');
        if ('data' in response) {
            console.table(response.data);
            if ('error' in response.data) {
                var messer = taskgame[props.lang]['error']
                    + '. ' + response.data.error
                    + '. ' + taskgame[props.lang]['later'];
                setMessage(messer); setTask(messer); console.log(messer);
                setBoard('red'); setImage(image_numbers);

            } else if (('id' in response.data) && 
                ('lang' in response.data) &&
                ('image' in response.data) &&
                ('result' in response.data) &&
                ('description' in response.data)) {
                    // task counter at current moment
                    setCounter(prevCounter => parseInt(prevCounter) + 1);
                    // current user task progress counter
                    setCurrent(prevCurrent => parseInt(prevCurrent) + 1);
                    setTask(response.data.description);
                    setResult(response.data.result);
                    setBoard('#006600');

                    // if image.length === 0 -> task has no exact image
                    // default image_thinking should be used in that case
                    if (response.data.image.length === 0) {
                        setImage(image_thinking);
                    } else {
                        setImage(url_prefix + response.data.image);
                    }

                    if (props.lang !== response.data.lang) {
                        setMessage(taskgame[props.lang]['sorry']);
                    } else {
                        setMessage('');
                    }

            } else {
                var logger = taskgame[props.lang]['error']
                    + taskgame[props.lang]['not_enough']
                    + ' ' + taskgame[props.lang]['later'];
                setMessage(logger); setTask(logger); console.log(logger);
                setBoard('red'); setImage(image_numbers);
            }
        }

        setLoading(false);

    }, [props.lang, ]);

    const onError = useCallback((msg) => {
        console.log('TaskGame.onError ' + msg);
        var logger = taskgame[props.lang]['error'] + msg
            + '. ' + taskgame[props.lang]['later'];
        setMessage(logger); setTask(logger); setError(logger);
        setBoard('red'); setLoading(false);
        setImage(image_numbers);

    }, [props.lang, ]);

    useEffect(() => {
        if (props.open) {
            // console.log('TaskGame.useEffect -> props.task_uid ' + props.task_uid + ', props.user_id ' + props.user_id);
            // console.log('TaskGame.useEffect -> task_current ' + props.task_current + ', task_fails ' + props.task_fails);

            // counter=0: initialization
            if (counter === 0) {
                // later it will be gathered from user settings
                setFloatDesk('left'); setFloatBoard('right');

                setPassed(0); setFailed(0); setImage(image_numbers);
                setResults([]); setBoard('#006600'); setLoading(true);

                setDuration(new Date().getTime());

                setMessage(taskgame[props.lang]['loading']);
                setCurrent(props.task_current);
                setFails(props.task_fails);

                setTimeout(() => {
                    var data = {'lang': props.lang,
                        'level': props.task_uid,
                        'user_id': props.user_id,
                        'current': props.task_current,
                        'fails': props.task_fails}
                    axios.post('https://supermath.xyz:3000/api/gettask', data)
                        .then(onUpdate).catch(onError);
                }, 600);
            }
        }

    }, [props.open, props.task_uid, props.user_id, props.lang,
        props.task_current, props.task_fails, counter, onUpdate, onError]);

    function onTaskImageLoad(event) {
        if (props.open && image !== '') {
            // console.log('onTaskImageLoad -> ' + event.toString());
        }
    }

    function onTaskImageError(event) {
        if (props.open && image !== '') {
            // console.log('onTaskImageError -> ' + event.toString());
            // var http = new XMLHttpRequest();
            // http.open('HEAD', image, true);
            // http.send();
            setImage(image_thinking);
        }
    }

    function getNewTask() {
        var data = {'lang': props.lang,
            'level': props.task_uid,
            'user_id': props.user_id,
            'current': props.task_current,
            'fails': props.task_fails}
        axios.post('https://supermath.xyz:3000/api/gettask', data)
            .then(onUpdate).catch(onError);
    }

    function onAnswer(answer) {
        console.log('TaskGame.onAnswer -> answer ' + answer + ', expected ' + result);

        // image_numbers shown in case of backend errors, possible root causes
        // supermath backend is down, various network issues etc.
        if (image === image_numbers) {
            return;
        }

        if (answer === result) {
            if (error.length > 0) {
                setError('');
            }

            // if passed + failed > counter -> wrong answer received on hat task
            if ((passed + failed) < counter) {
                setPassed(prevPassed => prevPassed + 1);
                setResults([...results, {'task': 'yura', 'color': 'green'}]);
            }

            if (counter < props.amount) {
                setMessage(taskgame[props.lang]['loading']);
                setImage(image_numbers); setLoading(true);
                setTimeout(() => getNewTask(), 1100);

            } else {
                console.log('Game is Finished, amount ' + props.amount);
                onDialog('finished');
            }

        } else {
            if ((passed + failed) < counter) {
                setFailed(prevFailed => prevFailed + 1);
            }

            setMessage(answer + ' - ' + taskgame[props.lang]['wrong_answer']);
            setError(answer + ' - ' + taskgame[props.lang]['wrong_answer']);
            setBoard('red'); setBoardAnimation('shake 0.6s');

            setTimeout(() => {
                setBoardAnimation('smooth_red_to_green 0.6s');
                setBoard('#006600');
            }, 800);
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

            } else if (status === 'finished') {
                console.log('EXIT: ' + current + ', fails ' + fails);

                var percent = 100 * (props.amount - failed) / props.amount;
                var result_data = {
                    'operation': 'results',
                    'game_uid': props.task_uid,
                    'passed': passed,
                    'failed': failed,
                    'duration': (new Date().getTime() - duration),
                    'rate': get_rate_per_percent(percent),
                    'percent': percent,
                    'belt': 'task',
                    'task': 'task',
                };

                console.table(result_data);
                setResultData(result_data);
                setOpenAlert(ALERT.RESULTS);

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
                    <EnterKeyboard open={loading} error={error} lock={image === image_numbers} onAnswer={onAnswer}/>
                </div>
            </div>

            {message.length>0 && <div className='taskgame_footer_wrapper'> {message} </div>}

            <TaskLoadingDialog open={loading}/>

            <GameExit open={openAlert === ALERT.EXIT}
                type='task'
                fullScreen={props.fullScreen}
                lang={props.lang}
                onClose={onDialog}/>

            <GameImage open={openAlert === ALERT.IMAGE}
                fullScreen={props.fullScreen}
                lang={props.lang}
                image={image}
                onClose={onDialog}/>

            <GameResults open={openAlert === ALERT.RESULTS}
                type='task'
                fullScreen={props.fullScreen}
                user_id={props.user_id}
                amount={props.amount}
                level={props.level}
                lang={props.lang}
                results={results}
                data={resultData}
                onClose={onDialog}/>

        </Dialog>
    );
}
