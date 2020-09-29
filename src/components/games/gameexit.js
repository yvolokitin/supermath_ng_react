import React from 'react';
import {Button, Slide, Typography} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

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
        console.log('handleChange ' + value);
        props.onClose(value);
    }

    return (
        <Dialog open={props.open} onClose={() => props.onClose('')}
                scroll='body' fullScreen={props.fullScreen}
                TransitionComponent={Transition} transitionDuration={900}>

            <Title title={game[props.lang]['exit']} src={image} onClose={() => props.onClose('')}/>
            <ColorLine margin={'0px'}/>

            <DialogTitle className={classes.title}> {game[props.lang]['exit_question']} </DialogTitle>

            <DialogContent>
                <DialogContentText style={{textAlign: 'justify'}}> {game[props.lang]['exit_text']} {props.text} </DialogContentText>
            </DialogContent>

            <DialogContent>
                <Typography align='center' onClick={() => props.onClose('close')}>
                    <img className='game_exit_image' src={image} alt='logout' onContextMenu={(e) => e.preventDefault()}/>
                </Typography>
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
