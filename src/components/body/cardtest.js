import React, { useState, useEffect } from 'react';
import {Button} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import Info from "./info";
import {body} from './../translations/body';
import './card.css';

import vitamins from './../../images/numbers.png';

export default function CardTest(props) {
    const [title, setTitle] = useState([]);
    const [desc, setDesc] = useState([]);
    const [animation, setAnimation] = useState(['none']);

    const [info, openInfo] = useState(false);

    function onOpen(property) {
        // console.log('Card.onClick, props.locked: ' + props.locked);
        setAnimation('rotate .8s');
        // call in .5sec to show picture rotate animation
        setTimeout(() => {
            if (property === 'info') {
                openInfo(true);
            } else if (property === 'game') {
                props.onUpdate(props.task);
            }
        }, 700);

        setTimeout(() => {
            setAnimation('none');
        }, 1000);
    }

    function onClose(property) {
        openInfo(false);
        if (property === 'play') { 
            props.onUpdate(props.task);
        }
    }

    return (
        <>
            <div className='card_wrapper' style={{'animation': animation}}>
                <div onClick={() => onOpen('game')} className='card_wrapper_img'>
                    <img src={props.task.logo} alt={props.task.logo} onContextMenu={(e) => e.preventDefault()}/>
                </div>

                <div className='card_wrapper_text'> {title} </div>

                <div className='card_wrapper_btn'>
                    <Button size='small' color='primary' onClick={() => onOpen('info')}
                            startIcon={<VisibilityIcon/>}> {body[props.lang]['info']}
                    </Button>
                    <Button size='small' color='primary' onClick={() => onOpen('game')}
                        startIcon={<PlayCircleFilledWhiteIcon/>}> {body[props.lang]['play']}
                    </Button>
                </div>

                <Info open={info}
                      title={title}
                      text={desc}
                      source={props.task.logo}
                      task_id={props.task_id}
                      task={props.task.type}
                      fullScreen={props.fullScreen}
                      lang={props.lang}
                      onClose={onClose}/>
            </div>
        </>
    );
}

