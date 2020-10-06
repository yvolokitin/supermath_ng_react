import React, { useEffect, useState, useCallback } from 'react';
import {Dialog, Slide, DialogActions, Button, Snackbar} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import Alert from '@material-ui/lab/Alert';

import axios from 'axios';

import Throw from './throw';

import Title from './../title/title';
import ColorLine from './../line/line';

import image_trophy from './../../images/trophy.jpeg';
import image_numbers from './../../images/trophy/numbers.png';

import {trophy} from './../translations/trophy';
import './trophy.css';

import {get_avatar_by_name} from './../halpers/avatars';
import {get_belt_color} from './../halpers/functions';

const POOP_COST = 30;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

export default function Trophy(props) {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(false);
    const [scores, setScores] = useState([]);
    
    const [name, setName] = useState('');
    const [target, setTarget] = useState(0);
    const [error, setError] = useState('');

    const onScoresUpdate = useCallback((response) => {
        // console.log('Trophy.onScoresUpdate received ' + response.data);
        var array = [];
        if ('data' in response) {
            if ('error' in response.data) {
                setError(trophy[props.lang]['error_known'] + response.data.error);

            // response from poopthrow operation
            } else if ('operation' in response.data) {
                // console.log('You passed, responded ' + response.data.operation);
                // setTimeout(() => {
                // }, 800);
                props.onTrophyUpdate();

            } else {
                for (var i in response.data) {
                    // console.log('avatar ' + response.data[i].avatar + ' -> ' + response.data[i].level);
                    response.data[i]['color'] = get_belt_color(response.data[i].level);
                    array.push(response.data[i]);
                }
                setScores(array);
            }
        } else {
            setError(trophy[props.lang]['error_unknown']);
        }

        setLoading(false);

    }, [props, ])

    const onScoresError = useCallback((error) => {
        console.log('Header.onScoresError ' + error);
        setError(trophy[props.lang]['error_known'] + error);
        setLoading(false);
    }, [props.lang, ])

    const getScores = useCallback(() => {
        axios.post('https://supermath.xyz:3000/api/scores', {'amount': 10})
             .then(onScoresUpdate)
             .catch(onScoresError);

    }, [onScoresUpdate, onScoresError])

    const throwPoop = useCallback(() => {
        var post = {
            'user_id': props.id,
            'pswdhash': props.pswdhash,
            'target_id': target,
        };
        axios.post('https://supermath.xyz:3000/api/poopthrow', post)
            .then(onScoresUpdate)
            .catch(onScoresError);

    }, [props.id, props.pswdhash, target, onScoresUpdate, onScoresError])

    useEffect(() => {
        // console.log('Trophy.props.open ' + props.open);
        if (props.open === true) {
            setLoading(true);
            setTimeout(() => {
                getScores();
            }, 800);
        }

    }, [props.open, props.lang, props.id, getScores]);

    function onThrowConfirmation(status) {
        console.log('Trophy.onThrowConfirmation ' + status);

        if (status === 'throw') {
            setLoading(true);
            throwPoop();

        } else { // close
            console.log('close is close');
        }

        setProgress(false);
     }

    function onThrow(user_id, user_name) {
        console.log('Trophy.onThrow, current ' + props.id + ' to ' + user_id + ', ' + user_name);
        if (props.id < 1) {
            setError(trophy[props.lang]['error_login']);

        } else if (user_id < 1) {
            setError(trophy[props.lang]['error_login']);

        } else if (props.id !== user_id) {
            if (props.passed > POOP_COST) {
                setTarget(user_id);
                setName(user_name);
                setProgress(true);
            } else {
                setError(trophy[props.lang]['error_smiles']);
            }

        } else if (props.id === user_id) {
            // setError(trophy[props.lang]['error_login']);
            console.log('Throw to your self -> TBD.');
        }
    }

    /*
    */
    return (
        <Dialog open={props.open} onClose={() => props.onClose()} fullScreen={true} TransitionComponent={Transition} transitionDuration={800}>

            <Title title={trophy[props.lang]['top10']} src={image_trophy} onClose={() => props.onClose('')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <div className='trophy_wrapper'>
                {(loading) ? (
                    <div className='trophy_loading_wrapper'>
                        <img src={image_numbers} alt='progress'/>
                    </div>
                ) : (
                    <div className='trophy_table_wrapper'>
                        <div className='trophy_table_line_header'>
                            <div className='trophy_table_line_index_header'> </div>
                            <div className='trophy_table_line_name_header'>  </div>
                            <div className='trophy_table_line_numb_header'>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                            </div>
                            <div className='trophy_table_line_numb_header'>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                            </div>
                            <div className='trophy_table_line_numb_header'>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127919;</span>
                            </div>
                        </div>

                        {scores.map((user, index) => (
                            <div key={index} className='trophy_table_line' style={{backgroundColor: user.color}} onClick={() => onThrow(user.id, user.name)}>
                                <div className='trophy_table_line_index'> {index+1} </div>

                                <div className='trophy_table_line_name'>
                                    <img src={get_avatar_by_name(user.avatar)} alt={user.avatar} onContextMenu={(e) => e.preventDefault()}/>
                                    <font> {user.name} {user.surname} </font>
                                </div>
                                <div className='trophy_table_line_numb'> {user.failed} </div>
                                <div className='trophy_table_line_numb'> {user.passed} </div>
                                <div className='trophy_table_line_numb'> {user.score} </div>
                            </div>
                        ))}

                        <div className='trophy_table_line_fake'> </div>
                    </div>
                )}
            </div>

            <ColorLine margin={'0px'}/>

            <DialogActions>
                <Button size='small' color='primary' startIcon={<CancelIcon />}
                        onClick={() => props.onClose()}> {trophy[props.lang]['close']} </Button>
            </DialogActions>

            <Throw open={progress}
                name={name}
                lang={props.lang}
                fullScreen={props.fullScreen}
                onThrow={onThrowConfirmation}/>

            <Snackbar open={error.length !== 0} onClose={() => setError('')} autoHideDuration={15000}
                style={{border: '3px solid black', backgroundColor: 'white'}}
                anchorOrigin={{vertical:'top', horizontal:'center'}}>
                    <Alert onClose={() => setError('')} severity='error'> {error} </Alert>
            </Snackbar>
        </Dialog>
    );
}
