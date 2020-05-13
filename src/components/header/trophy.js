import React, { useEffect, useState, useCallback } from 'react';
import {Dialog, DialogActions, Button} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import axios from 'axios';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';
import {trophy} from './../translations/trophy';
import './trophy.css';

import image from './../../images/trophy/numbers.png';

export default function Trophy(props) {
    const [passing, setPassing] = useState(true);
    const [passed, setPassed] = useState([]);

    const [failing, setFailing] = useState(true);
    const [failed, setFailed] = useState([]);
    
    const onPassed = useCallback((response) => {
        console.log('Header.onPassed received ' + response.data[1].name);
        var array = [];
        for (var i = 1; i < 11; i++) {
            // console.log('response.data[i] ' + response.data[i].name + ': ' + response.data[i].pass);
            array.push(response.data[i]);
        }
        setPassed(array);
        setPassing(false);
    }, [ ])

    const onFailed = useCallback((response) => {
        // console.log('Header.onFailed received ' + response.data[1].name);
        var array = [];
        for (var i = 1; i < 11; i++) {
            // console.log('response.data[i] ' + response.data[i].name + ': ' + response.data[i].pass);
            array.push(response.data[i]);
        }
        setFailed(array);
        setFailing(false);
    }, [ ])

    const onError = useCallback((error) => {
        console.log('Header.onError ' + error);
    }, [ ])

    const getPassed = useCallback(() => {
        axios.post('http://supermath.xyz:3000/api/toppassed', {'amount': 10})
             .then(onPassed)
             .catch(onError);

    }, [onPassed, onError])

    const getFailed = useCallback(() => {
        axios.post('http://supermath.xyz:3000/api/topfailed', {'amount': 10})
             .then(onFailed)
             .catch(onError);

    }, [onFailed, onError])

    useEffect(() => {
        // console.log('Trophy.props.open ' + props.open);
        if (props.open === true) {
            setPassing(true);
            setFailing(true);
            getPassed();
            getFailed();
        }

    }, [props.open, props.lang, getPassed, getFailed]);

    /*
                <div className='trophy_table_wrapper' style={{backgroundColor:'brown',color:'white',}}>
                    { (failing === true) ? (
                        <img src={image} alt='progress'/>
                      ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' style={{fontSize:'1.2rem',lineHeight:'0.9',fontWeight: 'bold'}}>
                                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127942;</span>
                                    </TableCell>
                                    <TableCell align='left' style={{fontSize:'1.2rem',lineHeight:'0.9',fontWeight: 'bold'}}>
                                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128102;</span>
                                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127947;</span>
                                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128105;</span>
                                    </TableCell>
                                    <TableCell align='center' style={{fontSize:'1.2rem',lineHeight:'0.9',fontWeight: 'bold'}}>
                                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127774;</span>
                                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127919;</span>
                                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128142;</span>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {failed.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell align='center' component='th' scope='row' style={{fontSize:'1.2rem',lineHeight:'0.9',fontWeight: 'bold',color:'white',}}> {index+1} </TableCell>
                                        <TableCell align='left' style={{fontSize:'1.2rem',lineHeight:'0.9',fontWeight: 'bold',color:'white',}}> {user.name} {user.surname} </TableCell>
                                        <TableCell align='center' style={{fontSize:'1.2rem',lineHeight:'0.9',fontWeight: 'bold',color:'white',}}> {user.fail} </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                      )
                    }
                </div>
    */
    return (
        <Dialog open={props.open} onClose={() => props.onClose()}
            fullScreen={props.fullScreen} fullWidth={true}
            maxWidth='md' transitionDuration={700} scroll='body'>

            <SMTitle title='' onClick={() => props.onClose()}/>
            <ColorLine/>

            <div className='trophy_title'>

            </div>

            <div className='trophy_wrapper'>
                { (passing === true) ? (
                    <img src={image} alt='progress'/>
                ) : (
                    <div className='trophy_table_wrapper'>
                        <div className='trophy_table_row'>
                            <div className='trophy_table_cell_num'>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127942;</span>
                            </div>
                            <div className='trophy_table_cell_name'>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128102;</span>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127947;</span>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128105;</span>
                            </div>
                            <div className='trophy_table_cell_res'>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127919;</span>
                            </div>
                        </div>
                        {passed.map((user, index) => (
                            <div className='trophy_table_row' key={index}>
                                <div className='trophy_table_cell_num'>
                                    {index+1}
                                </div>
                                <div className='trophy_table_cell_name'>
                                    {user.name} {user.surname}
                                </div>
                                <div className='trophy_table_cell_res'>
                                    {user.pass}
                                </div>
                            </div>
                        ))}

                    </div>
                )}

                <div className='trophy_table_wrapper'>
                    { (passing === true) ? (
                        <img src={image} alt='progress'/>
                      ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' style={{fontSize:'1.4rem',lineHeight:'0.9',fontWeight: 'bold'}}>
                                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127942;</span>
                                    </TableCell>
                                    <TableCell align='left' style={{fontSize:'1.4rem',lineHeight:'0.9',fontWeight: 'bold'}}>
                                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128102;</span>
                                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127947;</span>
                                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128105;</span>
                                    </TableCell>
                                    <TableCell align='center' style={{fontSize:'1.4rem',lineHeight:'0.9',fontWeight: 'bold'}}>
                                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127774;</span>
                                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127919;</span>
                                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128142;</span>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {passed.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell align='center' component='th' scope='row' style={{fontSize:'1.2rem',lineHeight:'0.9',fontWeight: 'bold'}}> {index+1} </TableCell>
                                        <TableCell align='left' style={{fontSize:'1.2rem',lineHeight:'0.9',fontWeight: 'bold',overflow:'hidden',textOverflow:'clip'}}> {user.name} {user.surname} </TableCell>
                                        <TableCell align='center' style={{fontSize:'1.2rem',lineHeight:'0.9',fontWeight: 'bold'}}> {user.pass} </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                      )
                    }
                </div>
            </div>

            <DialogActions>
                <Button size='small' color='primary' startIcon={<CancelIcon />}
                        onClick={() => props.onClose()}> {trophy[props.lang]['close']} </Button>
            </DialogActions>
        </Dialog>
    );
}
