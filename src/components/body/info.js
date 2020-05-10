import React from 'react';
import {Dialog, Button} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import ColorLine from "./../line/line";

import SMTitle from './../dialog/title';
import {info} from './../translations/info';

import './card.css';

export default function Info(props) {
    return (
        <Dialog open={props.open} aria-labelledby='customized-dialog-title' fullScreen={props.fullScreen} transitionDuration={700} scroll='body'>
            <SMTitle title='' onClick={() => props.onClose('info', false)}/>
            <ColorLine/>

            <div className='card_info_title'>
                {props.title}
            </div>

            <div className='card_info_text'>
                {props.text}
            </div>

            <div className='card_info_text' onContextMenu={(e) => e.preventDefault()}>
                <img src={props.source} alt={props.source}/>
            </div>

            <div className='card_info_text'>
                {info[props.lang]['extra']}
            </div>

            <ColorLine/>

            <div className='card_wrapper_btn' style={{height: '60px'}}>
                <Button size='small' color='primary' startIcon={<CancelIcon/>}
                        onClick={() => props.onClose('info')}> {info[props.lang]['close']} </Button>

                <Button size='small' color='primary' startIcon={<PlayCircleFilledWhiteIcon/>}
                        onClick={() => props.onClose('play')}> {info[props.lang]['play']} </Button>
            </div>
        </Dialog>
    );
}
