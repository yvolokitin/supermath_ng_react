import React from 'react';
import {Button, Slide, Typography} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import Title from './../title/title';
import ColorLine from './../line/line';

import './gameexit.css';
import image from './../../images/logout.png';

import {game} from './../translations/game';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function GameExit(props) {
    const handleChange = (event, value) => {
        console.log('handleChange ' + value);
        props.onClose(value);
    }

    return (
        <Dialog open={props.open} onClose={() => props.onClose('')}
                scroll='body' fullScreen={props.fullScreen}
                TransitionComponent={Transition} transitionDuration={900}>

            <Title title='EXIT' src={image} onClick={() => props.onClose('')}/>
            <ColorLine margin={'0px'}/>

            <DialogTitle> {props.title} </DialogTitle>

            <DialogContent>
                <DialogContentText> {props.text} </DialogContentText>
            </DialogContent>

            <DialogContent>
                <Typography align='center' onClick={() => props.onClose('close')}>
                    <img className='game_exit_image' src={image} alt='logout' onContextMenu={(e) => e.preventDefault()}/>
                </Typography>
            </DialogContent>

            <DialogContent>
            </DialogContent>

            <DialogContent scroll='body'>
                <BottomNavigation onChange={handleChange} showLabels>
                    <BottomNavigationAction label={game[props.lang]['settings']} value='settings' icon={<SettingsIcon/>}/>
                    <BottomNavigationAction label={game[props.lang]['help']} value='help' icon={<HelpOutlineIcon/>}/>
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
                <Button onClick={() => props.onClose('close')} color='primary' startIcon={<ExitToAppIcon/>} autoFocus> {props.yes} </Button>
                <Button onClick={() => props.onClose('')} color='primary' startIcon={<FavoriteBorderIcon/>}> {props.no} </Button>
            </DialogActions>
        </Dialog>
    );
}
