import React from 'react';
import {Button, Slide, Typography} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import CancelIcon from '@material-ui/icons/Cancel';

import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

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
                <Typography align='center' onClick={() => props.onClose('logout')}>
                    <img src={image} alt={'logout'} className='game_exit_image' onContextMenu={(e) => e.preventDefault()}/>
                </Typography>
            </DialogContent>

            <DialogContent>
            </DialogContent>

            <DialogContent scroll='body'>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label='Settings' value='settings' icon={<SettingsIcon/>}/>
                    <BottomNavigationAction disabled label='Previous' value='back' icon={<ArrowBackIcon/>}/>
                    <BottomNavigationAction label='Next Task' value='next' icon={<ArrowForwardIcon/>}/>
                </BottomNavigation>
            </DialogContent>

            <ColorLine/>
            <DialogActions>
                <Button onClick={() => props.onClose('')} color='primary' startIcon={<CancelIcon/>}> {game[props.lang]['close']} </Button>
            </DialogActions>
        </Dialog>
  );
}
