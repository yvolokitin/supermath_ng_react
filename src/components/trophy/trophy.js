import React, { useEffect, useState, useCallback } from 'react';
import {Dialog, Slide, DialogActions, Button, Snackbar} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import Alert from '@material-ui/lab/Alert';

import axios from 'axios';

import Throw from './throw';
import SMTitle from './../dialog/title';
import ColorLine from './../line/line';
import {trophy} from './../translations/trophy';
import './trophy.css';

import {get_avatar_by_name} from './../halpers/avatars';
import {get_belt_color} from './../halpers/functions';
import image from './../../images/trophy/numbers.png';

const POOP_COST = 50;

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
                    console.log('avatar ' + response.data[i].avatar + ' -> ' + response.data[i].level);
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
        axios.post('http://supermath.xyz:3000/api/scores', {'amount': 10})
             .then(onScoresUpdate)
             .catch(onScoresError);

    }, [onScoresUpdate, onScoresError])

    const throwPoop = useCallback(() => {
        var post = {
            'user_id': props.id,
            'pswdhash': props.pswdhash,
            'target_id': target,
        };
        axios.post('http://supermath.xyz:3000/api/poopthrow', post)
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
        console.log('Trophy.onThrow ' + user_id + ', ' + user_name);
        if (props.id > 0 && user_id > 0) {
            if (props.passed > POOP_COST) {
                setTarget(user_id);
                setName(user_name);
                setProgress(true);
            } else {
                setError(trophy[props.lang]['error_smiles']);
            }
        }
    }

    /*
    */
    return (
        <Dialog open={props.open} onClose={() => props.onClose()}
            maxWidth='md' fullWidth={true} fullScreen={props.width<840}
            TransitionComponent={Transition} transitionDuration={800}>

            <SMTitle title='' onClick={() => props.onClose()}/>
            <ColorLine/>

            <div className='trophy_wrapper'>
                <div className='trophy_table_wrapper'>
                    { (loading === true) ? (
                        <div className='trophy_throw_wrapper'>
                            <img src={image} alt='progress'/>
                        </div>
                    ) : (
                      <>
                        <div className='trophy_table_row'>
                            {(props.id > 0) ? (
                                <div className='trophy_table_cell_throw' style={{border: 'none'}}>  </div>
                            ) : (
                                <> </>
                            )}

                            <div className='trophy_table_cell_num'>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127942;</span>
                            </div>
                            <div className='trophy_table_cell_ava'>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128102;</span>
                            </div>
                            <div className='trophy_table_cell_blt'>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#129355;</span>
                            </div>
                            <div className='trophy_table_cell_name'>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127947;</span>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128105;</span>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128170;</span>
                            </div>
                            <div className='trophy_table_cell_res'>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127919;</span>
                            </div>
                            <div className='trophy_table_cell_res' style={{backgroundColor:'#bbff99'}}>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                            </div>

                            <div className='trophy_table_cell_res' style={{backgroundColor:'#cc9900'}}>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                            </div>
                        </div>
                        {scores.map((user, index) => (
                            (props.id === user.id) ? (
                                <div className='trophy_table_row' key={index}>
                                    {(props.id > 0) ? ( <div className='trophy_table_cell_throw'>  </div> ) : ( <> </> )}

                                    <div className='trophy_table_cell_num' style={{backgroundColor:'green',color:'orange'}}> {index+1} </div>
                                    <div className='trophy_table_cell_ava' style={{backgroundColor:'green',color:'orange'}}>
                                        <img src={get_avatar_by_name(user.avatar)} alt={user.avatar} onContextMenu={(e) => e.preventDefault()}/>
                                    </div>
                                    <div className='trophy_table_cell_blt'>
                                        <div className='trophy_table_cell_blt_level' style={{backgroundColor: user.color}}></div>
                                    </div>
                                    <div className='trophy_table_cell_name' style={{backgroundColor:'green',color:'orange'}}> {user.name} {user.surname} </div>
                                    {
                                        (user.score.toString().includes('-')) ? (
                                            <div className='trophy_table_cell_res' style={{backgroundColor:'green',color:'orange'}}> {user.score} </div>
                                        ):(
                                            <div className='trophy_table_cell_res' style={{backgroundColor:'green',color:'orange'}}> +{user.score} </div>
                                        )
                                    }
                                    <div className='trophy_table_cell_res' style={{backgroundColor:'green',color:'orange'}}> {user.passed} </div>
                                    <div className='trophy_table_cell_res' style={{backgroundColor:'green',color:'orange'}}> {user.failed} </div>
                                </div>
                            ) : (
                                <div className='trophy_table_row' key={index}>
                                    {(props.id > 0) ? (
                                        <div className='trophy_table_cell_throw' onClick={() => onThrow(user.id, user.name)}>
                                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128168;</span>
                                        </div>
                                    ) : (
                                        <> </>
                                    )}

                                    <div className='trophy_table_cell_num'> {index+1} </div>
                                    <div className='trophy_table_cell_ava'>
                                        <img src={get_avatar_by_name(user.avatar)} alt={user.avatar} onContextMenu={(e) => e.preventDefault()}/>
                                    </div>
                                    <div className='trophy_table_cell_blt'>
                                        <div className='trophy_table_cell_blt_level' style={{backgroundColor: user.color}}></div>
                                    </div>
                                    <div className='trophy_table_cell_name'> {user.name} {user.surname} </div>
                                    {
                                        (user.score.toString().includes('-')) ? (
                                            <div className='trophy_table_cell_res'> {user.score} </div>
                                        ):(
                                            <div className='trophy_table_cell_res'> +{user.score} </div>
                                        )
                                    }
                                    <div className='trophy_table_cell_res' style={{backgroundColor:'#bbff99'}}> {user.passed} </div>
                                    <div className='trophy_table_cell_res' style={{backgroundColor:'#cc9900'}}> {user.failed} </div>
                                </div>
                            )
                        ))}
                      </>
                    )}
                </div>
            </div>

            <DialogActions>
                <Button size='small' color='primary' startIcon={<CancelIcon />}
                        onClick={() => props.onClose()}> {trophy[props.lang]['close']} </Button>
            </DialogActions>

            <Throw open={progress}
                name={name}
                lang={props.lang}
                fullScreen={props.fullScreen}
                onThrow={onThrowConfirmation}/>

            <Snackbar open={error.length !== 0} onClose={() => setError('')} autoHideDuration={15000} anchorOrigin={{vertical:'top', horizontal:'center'}}>
                <Alert onClose={() => setError('')} severity='error'> {error} </Alert>
            </Snackbar>
        </Dialog>
    );
}
