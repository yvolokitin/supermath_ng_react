﻿import React from 'react';
import {Button, Slide, Typography} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import RestoreIcon from '@material-ui/icons/Restore';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FavoriteIcon from '@material-ui/icons/Favorite';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';

import './gameexit.css';
import image from './../../images/logout.png';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function GameExit(props) {
    return (
        <Dialog open={props.open} onClose={() => props.onClose('close')} fullScreen={props.fullScreen} TransitionComponent={Transition} transitionDuration={900}>
            <SMTitle title='' onClick={() => props.onClose('close')}/>
            <ColorLine/>

            <DialogTitle> {props.title} </DialogTitle>

            <DialogContent>
                <DialogContentText>{props.text}</DialogContentText>
            </DialogContent>

            <DialogContent>
                <Typography align='center' onClick={() => props.onClose('logout')}>
                    <img src={image} alt={'logout'} className='game_exit_image' onContextMenu={(e) => e.preventDefault()}/>
                </Typography>
            </DialogContent>

            <DialogContent>
            </DialogContent>

            <DialogContent>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label='Recents' value='recents' icon={<RestoreIcon/>}/>
                    <BottomNavigationAction label='Favorites' value='favorites' icon={<FavoriteIcon/>}/>
                    <BottomNavigationAction label='Help' value='favorites' icon={<HelpOutlineIcon/>}/>
                    <BottomNavigationAction label='Previous Task' value='back' icon={<ArrowBackIcon/>}/>
                    <BottomNavigationAction label='Next Task' value='next' icon={<ArrowForwardIcon/>}/>
                </BottomNavigation>
            </DialogContent>

            <ColorLine/>
            <DialogActions>
                <Button onClick={() => props.onClose('logout')} color='primary' startIcon={<ExitToAppIcon/>} autoFocus> {props.yes} </Button>
                <Button onClick={() => props.onClose('close')} color='primary' startIcon={<FavoriteBorderIcon/>}> {props.no} </Button>
            </DialogActions>
        </Dialog>
  );
}
