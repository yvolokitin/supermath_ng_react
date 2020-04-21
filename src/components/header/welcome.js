﻿import React from 'react';
import {Dialog, Button, AppBar, Toolbar, Typography} from '@material-ui/core';

import SMTitle from "./../dialog/title";
import './welcome.css';

import {welcome} from './../translations/welcome';

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

                <div className='welcome_content'>
                    <AppBar position="static">
                        <Toolbar onClick={() => props.onClose('')} style={{textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue',cursor:'pointer'}}>
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

                <div className='welcome_content' style={{marginTop:'2%'}}>
                    {welcome[props.lang]['text']}
                </div>

                <div className='welcome_content_img'>
                    <img src='http://supermath.xyz:3000/static/images/userinfo_image.jpg' alt='tasks_image' width='90%'/>
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

                <div className='welcome_content_img'>
                    <Button variant='contained' onClick={() => props.onClose('close')}>
                        {welcome[props.lang]['good']}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
