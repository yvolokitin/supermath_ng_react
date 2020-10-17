﻿import React from 'react';
import {Dialog, Button} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import Title from './../title/title';
import ColorLine from './../line/line';

import image from './../../images/information.png';

import {info} from './../translations/info';

import './info.css';

export default function Info(props) {
    /*React.useEffect(() => {
        console.log('Info.useEffect -> ' + props.source);
    }, [props.source, ]);*/

    return (
        <Dialog open={props.open} fullScreen={props.fullScreen} transitionDuration={700} scroll='body'>
            <Title title={info[props.lang]['information']} src={image} onClose={() => props.onClose('info', false)} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            {(props.type === 'info') ? (
                <>
                    <div className='card_info_title' style={{color: props.color}}> {props.title} </div>
                    <div className='card_info_text'> {props.text} </div>
                    <div className='card_info_wrapper_img' onContextMenu={(e) => e.preventDefault()}>
                        <img src={props.source} alt={props.source}/>
                    </div>
                    <div className='card_info_wrapper_common'> {info[props.lang]['extra']} </div>
                </>
            ) : (
                <div className='card_info_wrapper_common'> {info[props.lang]['unlock']} </div>
            )}

            <ColorLine/>

            <div className='card_info_wrapper_btn' style={{height: '60px'}}>
                <Button size='small' color='primary' startIcon={<CancelIcon/>}
                        onClick={() => props.onClose('info')}> {info[props.lang]['close']} </Button>

                <Button size='small' color='primary' startIcon={<PlayCircleFilledWhiteIcon/>} disabled={props.locked}
                        onClick={() => props.onClose('play')}> {info[props.lang]['play']} </Button>
            </div>
        </Dialog>
    );
}
