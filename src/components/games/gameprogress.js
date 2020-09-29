import React from 'react';

import {Dialog, DialogTitle, DialogActions, DialogContent, Button, Slide} from '@material-ui/core';
import {Table, TableRow, TableBody, TableCell, TableContainer, Paper} from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import InfoIcon from '@material-ui/icons/Info';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import Title from './../title/title';
import ColorLine from './../line/line';

import image from './../../images/results.png';

import {game} from './../translations/game';

import { makeStyles } from '@material-ui/core/styles';
import './gameprogress.css';

const useStyles = makeStyles((theme) => ({
    title: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

// 
export default function GameProgress(props) {
    const classes = useStyles();

    const handleChange = (event, value) => {
        console.log('handleChange ' + value);
        props.onClose(value);
    }

    return (
        <Dialog open={props.open} onClose={() => props.onClose()}
            scroll='body' fullScreen={props.fullScreen}
            TransitionComponent={Transition} transitionDuration={900}>

            <Title title={game[props.lang]['progress']} src={image} onClose={() => props.onClose('')}/>
            <ColorLine margin={'0px'}/>

            <DialogTitle className={classes.title}>
                <font className='digitgameprogress_title' style={{color:'black'}}>
                    {props.results.length} &nbsp; &#128279; &nbsp;
                </font>
                <font className='digitgameprogress_title' style={{color:'green'}}>
                    {props.passed} &nbsp; &#128515; &nbsp;
                </font>
                <font className='digitgameprogress_title' style={{color:'red'}}>
                    {props.failed} &nbsp; &#128169; &nbsp;
                </font>
            </DialogTitle>

            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {props.results.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell align='center' component='th' scope='row' style={{backgroundColor: row.color}}>
                                        <font className='digitgameprogress_table'>{row.task}</font>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>

            <DialogContent scroll='body'>
                <BottomNavigation onChange={handleChange} showLabels>
                    <BottomNavigationAction label={game[props.lang]['settings_title']} value='settings' icon={<SettingsIcon/>}/>
                    <BottomNavigationAction label={game[props.lang]['help_title']} value='help' icon={<HelpOutlineIcon/>}/>

                    {(props.type === 'task') ? (
                        <BottomNavigationAction label={game[props.lang]['previous_title']} value='previous' icon={<ArrowBackIcon/>} disabled/>
                    ) : (
                        <BottomNavigationAction label={game[props.lang]['info_title']} value='info' icon={<InfoIcon/>}/>
                    )}

                    {(props.type === 'task') ? (
                        <BottomNavigationAction label={game[props.lang]['next_title']}  value='next' icon={<ArrowForwardIcon/>}/>
                    ) : (
                        <BottomNavigationAction label={game[props.lang]['results_title']} value='progress' icon={<ShowChartIcon/>}/>
                    )}

                </BottomNavigation>
            </DialogContent>

            <ColorLine/>
            <DialogActions>
                <Button onClick={() => props.onClose()} className='digitgameprogress_close' color='primary' autoFocus>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
