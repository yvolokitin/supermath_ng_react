﻿import React from 'react';
import {Button, Slide, Typography} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import ReplayIcon from '@material-ui/icons/Replay';
import CancelIcon from '@material-ui/icons/Cancel';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ShowChartIcon from '@material-ui/icons/ShowChart';

// import InfoIcon from '@material-ui/icons/Info';
// import SettingsIcon from '@material-ui/icons/Settings';

import Title from './../title/title';
import ColorLine from './../line/line';

import './gameexit.css';
import image from './../../images/help.jpg';

import {game} from './../translations/game';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: 'TeleGrotesk',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='left' ref={ref} {...props} />;
});

export default function GameHelp(props) {
    const classes = useStyles();

    const handleChange = (event, value) => {
        console.log('GameHelp.handleChange ' + value);
        props.onClose(value);
    }

    /*
                    <BottomNavigationAction label={game[props.lang]['settings_title']} value='settings' icon={<SettingsIcon/>}/>
    */
    return (
        <Dialog open={props.open} onClose={() => props.onClose('')}
                scroll='body' fullScreen={props.fullScreen}
                TransitionComponent={Transition} transitionDuration={900}>

            <Title title={game[props.lang]['help']} src={image} onClose={() => props.onClose('')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <DialogTitle className={classes.title}> {game[props.lang]['help_question']} </DialogTitle>

            <DialogContent>
                <DialogContentText style={{textAlign: 'justify'}}> {game[props.lang]['help_text']} </DialogContentText>
            </DialogContent>

            <DialogContent>
                <Typography align='center'>
                    <img src={image} alt='help' className='game_exit_image' onContextMenu={(e) => e.preventDefault()}/>
                </Typography>
            </DialogContent>

            <DialogContent scroll='body'>
                <BottomNavigation onChange={handleChange} showLabels>
                    <BottomNavigationAction label={game[props.lang]['exit_title']} value='exit' icon={<ExitToAppIcon/>} style={{transform:'scale(1.3)'}}/>
                    <BottomNavigationAction label={game[props.lang]['replay_title']} value='replay' icon={<ReplayIcon/>} style={{transform:'scale(1.3)'}}/>
                    <BottomNavigationAction label={game[props.lang]['results_title']} value='progress' icon={<ShowChartIcon/>} style={{transform:'scale(1.3)'}}/>

                    {props.type === 'task' &&
                        <BottomNavigationAction label={game[props.lang]['previous_title']} value='previous' icon={<ArrowBackIcon/>} style={{transform:'scale(1.3)'}} disabled/>
                    }

                    {props.type === 'task' &&
                        <BottomNavigationAction label={game[props.lang]['next_title']}  value='next' icon={<ArrowForwardIcon/>} style={{transform:'scale(1.3)'}}/>
                    }
                </BottomNavigation>
            </DialogContent>

            <ColorLine/>
            <DialogActions>
                <Button onClick={() => props.onClose('')} color='primary' startIcon={<CancelIcon/>}> {game[props.lang]['close']} </Button>
            </DialogActions>
        </Dialog>
    );
}
