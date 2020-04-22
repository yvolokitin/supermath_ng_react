import React from 'react';
import {Dialog, DialogActions, Button, AppBar, Toolbar, Typography} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import SMTitle from "./../dialog/title";
import './welcome.css';

import {welcome} from './../translations/welcome';
import image from './../../images/welcome/avatars.jpg';

export default function Welcome(props) {
    return (
        <Dialog onClose={() => props.onClose('close')} transitionDuration={500} open={props.open} scroll='body'>
            <SMTitle title='' onClick={() => props.onClose()}/>

            <div style={{height:'100%',width:'100%',}}>
                <div className='welcome_header_line'>
                    <div className='welcome_lightblue_line'></div>
                    <div className='welcome_blue_line'></div>
                    <div className='welcome_darkgreen_line'></div>
                    <div className='welcome_green_line'></div>
                    <div className='welcome_lightgreen_line'></div>
                    <div className='welcome_yellow_line'></div>
                    <div className='welcome_orange_line'></div>
                    <div className='welcome_lightred_line'></div>
                    <div className='welcome_red_line'></div>
                    <div className='welcome_violend_line'></div>
                </div>

                <div className='welcome_title'>
                    SUPERMATH.XYZ
                </div>

                <div className='welcome_content'>
                    <h3> {props.name} {props.surname}, {welcome[props.lang]['title']}</h3>
                    <p> {welcome[props.lang]['message']} </p>
                </div>

                <div onClick={() => props.onClose('userinfo')} className='welcome_content'>
                    <AppBar position="static">
                        <Toolbar style={{textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue',cursor:'pointer'}}>
                            <Typography style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',color:'orange'}}></Typography>
                            <Typography variant="h5" style={{flexGrow:1}}></Typography>
                            <Typography style={{fontSize:'2.0rem',fontFamily:'Grinched',color:'orange'}}>
                                {props.name}:
                                <font style={{color:'green'}}> {props.passed} </font> &#128515;
                                <font style={{color:'red'}}> {props.failed} </font> &#128169;
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>

                <div className='welcome_content' style={{marginTop:'4%'}}>
                    {welcome[props.lang]['text']}
                </div>

                <div onClick={() => props.onClose('userinfo')} className='welcome_content' style={{marginTop:'2%',cursor:'pointer'}}>
                    <img src={image} alt='avatars' style={{width:'100%',padding:'1%',border:'1px solid grey'}}/>
                </div>

                <div className='welcome_header_line'>
                    <div className='welcome_lightblue_line'></div>
                    <div className='welcome_blue_line'></div>
                    <div className='welcome_darkgreen_line'></div>
                    <div className='welcome_green_line'></div>
                    <div className='welcome_lightgreen_line'></div>
                    <div className='welcome_yellow_line'></div>
                    <div className='welcome_orange_line'></div>
                    <div className='welcome_lightred_line'></div>
                    <div className='welcome_red_line'></div>
                    <div className='welcome_violend_line'></div>
                </div>

                <DialogActions>
                    <Button size="small" color="primary" startIcon={<CancelIcon/>} style={{marginTop:'2%'}}
                            onClick={() => props.onClose()}>
                        {welcome[props.lang]['close']}
                    </Button>
               </DialogActions>
            </div>
        </Dialog>
    );
}
