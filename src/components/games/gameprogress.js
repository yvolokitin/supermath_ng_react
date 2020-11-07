import React from 'react';

import {Dialog, DialogTitle, DialogActions, DialogContent, Button, Slide, Typography} from '@material-ui/core';
import {Table, TableRow, TableBody, TableCell, TableContainer, Paper} from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import ReplayIcon from '@material-ui/icons/Replay';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

// import InfoIcon from '@material-ui/icons/Info';
// import SettingsIcon from '@material-ui/icons/Settings';

import Title from './../title/title';
import ColorLine from './../line/line';

import image from './../../images/results.png';

import {game} from './../translations/game';

import { makeStyles } from '@material-ui/core/styles';
import './gameprogress.css';

const useStyles = makeStyles((theme) => ({
    title: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

export default function GameProgress(props) {
    const classes = useStyles();

    const handleChange = (event, value) => {
        console.log('GameProgress.handleChange ' + value);
        props.onClose(value);
    }

    return (
        <Dialog open={props.open} onClose={() => props.onClose()}
            scroll='body' fullScreen={props.fullScreen}
            TransitionComponent={Transition} transitionDuration={900}>

            <Title title={game[props.lang]['results']} src={image} onClose={() => props.onClose('')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <DialogTitle className={classes.title}>
                <font className='digitgameprogress_title' style={{color:'black'}}>
                    {props.results.length} &nbsp; &#128279; &nbsp;
                </font>
                <font className='digitgameprogress_title' style={{color:'green'}}>
                    {props.passed} &nbsp; &#128515; &nbsp;
                </font>
                <font className='digitgameprogress_title' style={{color:'red'}}>
                    {props.failed} &nbsp; &#128169; &nbsp;
                </font>
            </DialogTitle>

            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {props.results.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell align='center' component='th' scope='row' style={{backgroundColor: row.color}}>
                                        <font className='digitgameprogress_table'>{row.task}</font>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>

            <DialogContent scroll='body'>
                {props.results.length < 3 &&
                    <Typography align='center'>
                        <img className='game_exit_image' src={image} alt='settings' onContextMenu={(e) => e.preventDefault()}/>
                    </Typography>
                }

                {props.from === 'game' &&
                    <BottomNavigation onChange={handleChange} showLabels>
                        <BottomNavigationAction label={game[props.lang]['exit_title']} value='exit' icon={<ExitToAppIcon/>} style={{transform:'scale(1.3)'}}/>
                        <BottomNavigationAction label={game[props.lang]['replay_title']} value='replay' icon={<ReplayIcon/>} style={{transform:'scale(1.3)'}}/>
                        <BottomNavigationAction label={game[props.lang]['help_title']} value='help' icon={<HelpOutlineIcon/>} style={{transform:'scale(1.3)'}}/>

                        {props.type === 'task' &&
                            <BottomNavigationAction label={game[props.lang]['previous_title']} value='previous' icon={<ArrowBackIcon/>} style={{transform:'scale(1.3)'}} disabled/>
                        }

                        {props.type === 'task' &&
                            <BottomNavigationAction label={game[props.lang]['next_title']}  value='next' icon={<ArrowForwardIcon/>} style={{transform:'scale(1.3)'}}/>
                        }
                    </BottomNavigation>
                }
            </DialogContent>

            <ColorLine/>
            <DialogActions>
                <Button onClick={() => props.onClose()} className='digitgameprogress_close' color='primary' autoFocus>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
