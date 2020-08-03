﻿import React from 'react';
import {Button, Slide, Typography} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import SettingsIcon from '@material-ui/icons/Settings';
import CancelIcon from '@material-ui/icons/Cancel';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';

import './gameexit.css';
import image from './../../images/information.png';
import {game} from './../translations/game';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='left' ref={ref} {...props} />;
});

export default function GameHelp(props) {
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
            </DialogContent>

            <DialogContent scroll='body'>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label={game[props.lang]['settings']} value='settings' icon={<SettingsIcon/>}/>
                </BottomNavigation>
            </DialogContent>

            <ColorLine/>
            <DialogActions>
                <Button onClick={() => props.onClose('')} color='primary' startIcon={<CancelIcon/>}> {game[props.lang]['close']} </Button>
            </DialogActions>
        </Dialog>
  );
}
