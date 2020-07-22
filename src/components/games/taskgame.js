import React, { useEffect, useState, useCallback } from 'react';
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

    const [total, setTotal] = useState(0);
    const [passed, setPassed] = useState(0);
    const [failed, setFailed] = useState(0);

    const [answer, setAnswer] = useState('?');
    const [result, setResult] = useState('?');

    const [openAlert, setOpenAlert] = useState(false);
    const [animation, setAnimation] = useState('blinker 3s linear infinite');
    const [font, setFont] = useState('grey');

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
                setAnimation('blinker 3s linear infinite');
                setFont('grey');
                setAnswer('?');
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

    }, [props.task, onGetNewTaskUpdate, onGetNewTaskError])

    useEffect(() => {
        console.log('TaskGame.useEffect -> ' + props.task.uid);
        if (props.open === true) {
            setLoading(true);
            getNewTask();
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
            setAnswer(number);
            setAnimation('none');
            setFont('black');
        } else {
            var new_aswer = answer + number;
            setAnswer(new_aswer);
        }
    }

    const onOperator = (symbol) => {
        console.log('TaskGame.onOperator ' + symbol);
    }

    return (
        <Dialog open={props.open} fullScreen={true} TransitionComponent={Transition} transitionDuration={900}>
            <div className='taskgame_header_div'>
                <div className='taskgame_header_div_left'>
                    <font onClick={() => setOpenAlert(true)}>SUPERMATH</font>
                </div>
                <div className='taskgame_header_div_right'>
                    <font style={{color: 'black'}}>{total}</font> &nbsp; &#128279; &nbsp;
                    <font style={{color: 'green'}}>{passed}</font> &nbsp; &#128515; &nbsp;
                    <font style={{color: 'red'}}>{failed}</font> &nbsp; &#128169;
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
                                <font styles={{'color': font, 'animation': animation}}>
                                    {answer}
                                </font>
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
