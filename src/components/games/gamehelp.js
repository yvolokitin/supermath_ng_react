import React from 'react';
import {Button, Slide, Typography} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import SettingsIcon from '@material-ui/icons/Settings';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ShowChartIcon from '@material-ui/icons/ShowChart';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';

import './gameexit.css';
import image from './../../images/information.png';

import {game} from './../translations/game';
import {info} from './../translations/info';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='left' ref={ref} {...props} />;
});

export default function GameHelp(props) {
    const handleChange = (event, value) => {
        console.log('handleChange ' + value);
        props.onClose(value);
    }

    return (
        <Dialog open={props.open} onClose={() => props.onClose('')}
                scroll='body' fullScreen={props.fullScreen}
                TransitionComponent={Transition} transitionDuration={900}>

            <SMTitle title='' onClick={() => props.onClose('')}/>
            <ColorLine/>

            <DialogTitle> {game[props.lang]['help']} </DialogTitle>

            <DialogContent>
                <DialogContentText> {props.description} </DialogContentText>
            </DialogContent>

            <DialogContent>
                <Typography align='center' onClick={() => props.onClose('')}>
                    <img src={image} alt='help' className='game_exit_image' onContextMenu={(e) => e.preventDefault()}/>
                </Typography>
            </DialogContent>

            <DialogContent>
                {(props.type === 'game') ? (
                    <Typography align='justify'>
                        {info[props.lang]['extra']}
                    </Typography>
                ) : (<></>)}
            </DialogContent>

            <DialogContent scroll='body'>
                <BottomNavigation onChange={handleChange} showLabels>
                    <BottomNavigationAction label={game[props.lang]['settings']} value='settings' icon={<SettingsIcon/>}/>
                    {(props.type === 'task') ? (
                        <>
                            <BottomNavigationAction label={game[props.lang]['previous']} value='previous' icon={<ArrowBackIcon/>} disabled/>
                            <BottomNavigationAction label={game[props.lang]['next']}  value='next' icon={<ArrowForwardIcon/>}/>
                        </>
                    ) : (
                        <BottomNavigationAction label={game[props.lang]['results']} value='progress' icon={<ShowChartIcon/>}/>
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
