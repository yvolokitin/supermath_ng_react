import React, { useState, useEffect } from 'react';
import {Button} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import {white_titles, white_descriptions} from './../translations/white';
import {orange_titles, orange_descriptions} from './../translations/orange';
import {green_titles, green_descriptions} from './../translations/green';
import {navy_titles, navy_descriptions} from './../translations/navy';
import {brown_titles, brown_descriptions} from './../translations/brown';
import {black_titles, black_descriptions} from './../translations/black';

import Info from "./info";
import {body} from './../translations/body';
import './card.css';

export default function Card(props) {
    const [title, setTitle] = useState([]);
    const [desc, setDesc] = useState([]);
    const [animation, setAnimation] = useState(['none']);

    const [info, openInfo] = useState(false);

    useEffect(() => {
        // console.log('Card.useEffect -> ' + props.task.uid + ', props.locked ' + props.locked);
        if (props.color === 'white') {
            setTitle(white_titles[props.lang][props.task.id]);
            setDesc(white_descriptions[props.lang][props.task.id]);
        } else if (props.color === 'orange') {
            setTitle(orange_titles[props.lang][props.task.id]);
            setDesc(orange_descriptions[props.lang][props.task.id]);
        } else if (props.color === 'green') {
            setTitle(green_titles[props.lang][props.task.id]);
            setDesc(green_descriptions[props.lang][props.task.id]);
        } else if (props.color === 'navy') {
            setTitle(navy_titles[props.lang][props.task.id]);
            setDesc(navy_descriptions[props.lang][props.task.id]);
        } else if (props.color === 'brown') {
            setTitle(brown_titles[props.lang][props.task.id]);
            setDesc(brown_descriptions[props.lang][props.task.id]);
        } else if (props.color === 'black') {
            setTitle(black_titles[props.lang][props.task.id]);
            setDesc(black_descriptions[props.lang][props.task.id]);
        }

    }, [props.task, props.color, props.lang, props.locked]);

    function onOpen(property) {
        console.log('Card.onClick, props.locked: ' + props.locked);
        setAnimation('rotate .9s');
        // call in .5sec to show picture rotate animation
        setTimeout(() => {
            if (property === 'info') {
                openInfo(true);
            } else if (property === 'game') {
                props.onUpdate(props.task);
            }
        }, 500);

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
        {(props.locked === false) ? (
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
        ) : (
            <div className='card_wrapper' style={{opacity: '0.5'}}>
                <div className='card_wrapper_img_disabled'>
                    <img src={props.task.logo} alt={props.task.logo} onContextMenu={(e) => e.preventDefault()}/>
                </div>

                <div className='card_wrapper_text'> {title} </div>

                <div className='card_wrapper_btn'>
                    <Button size='small' color='primary' disabled
                            startIcon={<VisibilityIcon/>}> {body[props.lang]['info']}
                    </Button>
                    <Button size='small' color='primary' disabled
                        startIcon={<PlayCircleFilledWhiteIcon/>}> {body[props.lang]['play']}
                    </Button>
                </div>
            </div>
        )}
        </>
    );
}
