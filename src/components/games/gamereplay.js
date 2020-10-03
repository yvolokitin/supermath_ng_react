import React from 'react';
import {Button, Slide, Typography} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import InfoIcon from '@material-ui/icons/Info';
import CancelIcon from '@material-ui/icons/Cancel';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ShowChartIcon from '@material-ui/icons/ShowChart';

import Title from './../title/title';
import ColorLine from './../line/line';

import './gameexit.css';
import image from './../../images/replay.png';

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

export default function GameReplay(props) {
    const classes = useStyles();

    const handleChange = (event, value) => {
        console.log('GameReplay.handleChange ' + value);
        props.onClose(value);
    }

    return (
        <Dialog open={props.open} onClose={() => props.onClose('')}
                scroll='body' fullScreen={props.fullScreen}
                TransitionComponent={Transition} transitionDuration={900}>

            <Title title={game[props.lang]['replay']} src={image} onClose={() => props.onClose('')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <DialogTitle className={classes.title}> {game[props.lang]['replay_question']} </DialogTitle>

            <DialogContent>
                <DialogContentText style={{textAlign: 'justify'}}> {game[props.lang]['replay_text']} </DialogContentText>
            </DialogContent>

            <DialogContent>
                <Typography align='center' onClick={() => props.onClose('replay')}>
                    <img src={image} alt='help' className='game_exit_image' onContextMenu={(e) => e.preventDefault()}/>
                </Typography>
            </DialogContent>

            <DialogContent scroll='body'>
                <BottomNavigation onChange={handleChange} showLabels>
                    <BottomNavigationAction label={game[props.lang]['exit_title']} value='exit' icon={<ExitToAppIcon/>}/>
                    <BottomNavigationAction label={game[props.lang]['settings_title']} value='settings' icon={<SettingsIcon/>}/>

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
                <Button onClick={() => props.onClose('')} color='primary' startIcon={<CancelIcon/>}> {game[props.lang]['close']} </Button>
            </DialogActions>
        </Dialog>
    );
}
