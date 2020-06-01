import React, { useEffect, useState, useCallback } from 'react';
import {Dialog, Slide, DialogActions, Button} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import axios from 'axios';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';
import {trophy} from './../translations/trophy';
import './trophy.css';

import {get_avatar_by_name} from './../halpers/avatars';
import image from './../../images/trophy/numbers.png';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

export default function Trophy(props) {
    const [loading, setLoading] = useState(true);
    const [scores, setScores] = useState([]);
    
    const onScoresUpdate = useCallback((response) => {
        // console.log('Header.onScoresUpdate received ' + response.data);
        var array = [];
        for (var i in response.data) {
            // console.log('avatar ' + response.data[i].avatar + ' -> ' + get_avatar_by_name(response.data[i].avatar));
            array.push(response.data[i]);
        }
        setScores(array);
        setLoading(false);
    }, [ ])

    const onScoresError = useCallback((error) => {
        console.log('Header.onScoresError ' + error);
    }, [ ])

    const getScores = useCallback(() => {
        axios.post('http://supermath.xyz:3000/api/scores', {'amount': 10})
             .then(onScoresUpdate)
             .catch(onScoresError);

    }, [onScoresUpdate, onScoresError])

    useEffect(() => {
        // console.log('Trophy.props.open ' + props.open);
        if (props.open === true) {
            setLoading(true);
            setTimeout(() => {
                getScores();
            }, 950);
        }

    }, [props.open, props.lang, props.id, getScores]);

    /*
            <div className='trophy_title'>
            </div>
    */
    return (
        <Dialog open={props.open}
            onClose={() => props.onClose()}
            maxWidth='md' fullWidth={true}
            fullScreen={props.fullScreen}
            TransitionComponent={Transition} 
            transitionDuration={800}>

            <SMTitle title='' onClick={() => props.onClose()}/>
            <ColorLine/>

            <div className='trophy_wrapper'>
                <div className='trophy_table_wrapper'>
                    { (loading === true) ? (
                        <div className='trophy_table_row'>
                            <img src={image} alt='progress'/>
                        </div>
                    ) : (
                      <>
                        <div className='trophy_table_row'>
                            <div className='trophy_table_cell_num'>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127942;</span>
                            </div>
                            <div className='trophy_table_cell_ava'>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128102;</span>
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
                                    <div className='trophy_table_cell_num' style={{backgroundColor:'green',color:'orange'}}> {index+1} </div>
                                    <div className='trophy_table_cell_ava' style={{backgroundColor:'green',color:'orange'}}>
                                        <img src={get_avatar_by_name(user.avatar)} alt={user.avatar} onContextMenu={(e) => e.preventDefault()}/>
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
                                    <div className='trophy_table_cell_num'> {index+1} </div>
                                    <div className='trophy_table_cell_ava'>
                                        <img src={get_avatar_by_name(user.avatar)} alt={user.avatar} onContextMenu={(e) => e.preventDefault()}/>
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
        </Dialog>
    );
}
