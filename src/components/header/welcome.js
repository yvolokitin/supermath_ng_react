import React, {useState} from 'react';
import {Dialog, Card, CardMedia, Button} from '@material-ui/core';

import SMTitle from "./../dialog/title";
import './welcome.css';

import {welcome} from './../translations/welcome';

export default function Welcome(props) {
    return (
        <Dialog onClose={() => props.onClose()} transitionDuration={500} open={props.open} scroll='body'>
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
                    <h1>SUPERMATH.XYZ</h1>
                </div>

            <div className='welcome_content'>
                <h3> {props.name} {props.surname} </h3>
                <p> {welcome[props.lang]['description']} </p>
            </div>

        <div className='welcome_content_img'>
            <img src='http://supermath.xyz:3000/static/images/plain_tasks_image.jpg' alt='tasks_image' width='80%'/>
        </div>

        <div className='welcome_content'>
            <p> {welcome[props.lang]['text']} </p>
        </div>

        <div className='welcome_content_img'>
            <img src='http://supermath.xyz:3000/static/images/userinfo_image.jpg' alt='tasks_image' width='80%'/>
        </div>

    </div>


            <Button variant='contained' onClick={() => props.onClose()}>OK</Button>
        </Dialog>
    );
}
