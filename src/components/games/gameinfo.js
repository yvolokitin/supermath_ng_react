import React from 'react';
import {Button, Slide, Typography} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ShowChartIcon from '@material-ui/icons/ShowChart';

import Title from './../title/title';
import ColorLine from './../line/line';

import image from './../../images/information.png';

import {game} from './../translations/game';

import { makeStyles } from '@material-ui/core/styles';
import './gameexit.css';

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: 'TeleGrotesk',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='left' ref={ref} {...props} />;
});

export default function GameInfo(props) {
    const classes = useStyles();

    const handleChange = (event, value) => {
        console.log('GameInfo.handleChange ' + value);
        props.onClose(value);
    }

    return (
        <Dialog open={props.open} onClose={() => props.onClose('')}
                scroll='body' fullScreen={props.fullScreen}
                TransitionComponent={Transition} transitionDuration={900}>

            <Title title={game[props.lang]['info']} src={image} onClose={() => props.onClose('')}/>
            <ColorLine margin={'0px'}/>

            <DialogTitle className={classes.title}> {game[props.lang]['settings_title']} </DialogTitle>

            <DialogContent>
                <Typography align='center'>
                    <img className='game_exit_image' src={image} alt='settings' onContextMenu={(e) => e.preventDefault()}/>
                </Typography>
            </DialogContent>

            <DialogContent>

            </DialogContent>

            <DialogContent scroll='body'>
                <BottomNavigation onChange={handleChange} showLabels>
                    <BottomNavigationAction label={game[props.lang]['exit_title']} value='exit' icon={<ExitToAppIcon/>}/>
                    <BottomNavigationAction label={game[props.lang]['settings_title']} value='settings' icon={<SettingsIcon/>}/>

                    {(props.type === 'task') ? (
                        <BottomNavigationAction label={game[props.lang]['previous_title']} value='previous' icon={<ArrowBackIcon/>} disabled/>
                    ) : (
                        <BottomNavigationAction label={game[props.lang]['help_title']} value='help' icon={<HelpOutlineIcon/>}/>
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
                <Button onClick={() => props.onClose('')} color='primary' startIcon={<CancelIcon/>}> {game[props.lang]['close']} </Button>
            </DialogActions>
        </Dialog>
    );
}
