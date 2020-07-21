import React, { useEffect, useState, useCallback } from 'react';
import {Dialog, Slide} from '@material-ui/core';

import axios from 'axios';

import ColorLine from './../line/line';
import AlertDialog from './../alert/alert';
import {gameheader} from './../translations/gameheader';

import SMKeyBoard from './../keyboard/keyboard';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function TaskGame(props) {
    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(true);

    const [openAlert, setOpenAlert] = useState(false);

    const onGetNewTaskUpdate = useCallback((response) => {
        if ('data' in response) {
            console.log('Trophy.onScoresUpdate received ' + response.data);
            setTask('uywiurye aksudfy iashdkjahs dkjahsd kjash dkj haskd hakjsdh akj sdhkajs hdkas hyduirwey rkajd');
        }

        setLoading(false);

    }, [ ])

    const onGetNewTaskError = useCallback((error) => {
        console.log('Header.onScoresError ' + error);
        setLoading(false);
    }, [ ])

    const getNewTask = useCallback(() => {
        var data = {'amount': 10, 'uid': props.task.uid}
        axios.post('http://supermath.xyz:3000/api/scores', data)
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

    const onDigit = (target) => {
        if ('innerText' in target) {
            console.log('onDigit ' + target.innerText);
        } else {
            console.log('onDigit received wrong argument');
        }
    }

    const onOperator = (target) => {
        console.log('check operator response ' + target.innerText);
    }

    return (
        <Dialog open={props.open} fullScreen={true} TransitionComponent={Transition} transitionDuration={900}>
            <div className="games_header_div">
                <div className='games_header_div_left'>
                    <font onClick={() => setOpenAlert(true)}>SUPERMATH</font>
                </div>
                <div className='games_header_div_right'>
                    <font style={{color: 'black'}}>{props.total}</font> &nbsp; &#128279; &nbsp;
                    <font style={{color: 'green'}}>{props.passed}</font> &nbsp; &#128515; &nbsp;
                    <font style={{color: 'red'}}>{props.failed}</font> &nbsp; &#128169;
                </div>
            </div>

            <ColorLine margin={'0px'}/>

            <div className='gameboard_wrapper'>
                <div className='line_body_div_left'>
                    <div className='line_gameboard' style={{backgroundColor: '#006600'}}>
                        {task}
                    </div>
                </div>

                <div className='line_body_div_right'>
                    <SMKeyBoard onDigit={onDigit} onOperator={onOperator}/>
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
