import React from 'react';
import {Button, Slide, Typography} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import ReplayIcon from '@material-ui/icons/Replay';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

// import SettingsIcon from '@material-ui/icons/Settings';

import Title from './../title/title';
import ColorLine from './../line/line';

import image from './../../images/logout.png';

import {game} from './../translations/game';

import { makeStyles } from '@material-ui/core/styles';
import './gameexit.css';

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: 'TeleGrotesk',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function GameExit(props) {
    const classes = useStyles();

    const handleChange = (event, value) => {
        console.log('GameExit.handleChange ' + value);
        props.onClose(value);
    }

    /*
        <BottomNavigationAction label={game[props.lang]['settings_title']} value='settings' icon={<SettingsIcon/>}/>
    */
    return (
        <Dialog open={props.open} onClose={() => props.onClose('')}
                scroll='body' fullScreen={props.fullScreen}
                TransitionComponent={Transition} transitionDuration={900}>

            <Title title={game[props.lang]['exit']} src={image} onClose={() => props.onClose('')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            {props.type === 'task' ? (
                <DialogTitle className={classes.title}> {game[props.lang]['exit_task_question']} </DialogTitle>
            ) : (
                <DialogTitle className={classes.title}> {game[props.lang]['exit_question']} </DialogTitle>
            )}

            <DialogContent>
                {props.type === 'task' ? (
                    <DialogContentText style={{textAlign: 'justify'}}> {game[props.lang]['exit_task_text']} </DialogContentText>
                ) : (
                    <DialogContentText style={{textAlign: 'justify'}}> {game[props.lang]['exit_text']} </DialogContentText>
                )}
            </DialogContent>

            <DialogContent>
                <Typography align='center' onClick={() => props.onClose('close')}>
                    <img className='game_exit_image' src={image} alt='logout' onContextMenu={(e) => e.preventDefault()}/>
                </Typography>
            </DialogContent>

            <DialogContent scroll='body'>
                <BottomNavigation onChange={handleChange} showLabels>
                    {props.type === 'game' &&
                        <BottomNavigationAction label={game[props.lang]['replay_title']} value='replay' icon={<ReplayIcon/>} style={{transform:'scale(1.3)'}}/> }

                    <BottomNavigationAction label={game[props.lang]['help_title']} value='help' icon={<HelpOutlineIcon/>} style={{transform:'scale(1.3)'}}/>

                    {props.type === 'game' &&
                        <BottomNavigationAction label={game[props.lang]['results_title']} value='progress' icon={<ShowChartIcon/>} style={{transform:'scale(1.3)'}}/> }

                    {props.type === 'task' &&
                        <BottomNavigationAction label={game[props.lang]['previous']} value='previous' icon={<ArrowBackIcon/>} style={{transform:'scale(1.3)',cursor:'no-drop'}}/> }

                    {props.type === 'task' &&
                        <BottomNavigationAction label={game[props.lang]['next']} value='next' icon={<ArrowForwardIcon/>} style={{transform:'scale(1.3)'}}/> }
                </BottomNavigation>
            </DialogContent>

            <ColorLine/>
            <DialogActions>
                <Button onClick={() => props.onClose('close')} color='primary' startIcon={<ExitToAppIcon/>} autoFocus>
                    {game[props.lang]['answer_yes']}
                </Button>
                <Button onClick={() => props.onClose('')} color='primary' startIcon={<FavoriteBorderIcon/>}>
                    {game[props.lang]['answer_no']}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
