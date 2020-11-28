import React, { useState, useEffect } from 'react';
import {Button} from '@material-ui/core';

import HelpIcon from '@material-ui/icons/Help';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import {FULL_SCREEN} from './../halpers/functions';

import {white_titles, white_descriptions} from './../translations/white';
import {orange_titles, orange_descriptions} from './../translations/orange';
import {green_titles, green_descriptions} from './../translations/green';
import {navy_titles, navy_descriptions} from './../translations/navy';
import {brown_titles, brown_descriptions} from './../translations/brown';
import {black_titles, black_descriptions} from './../translations/black';

import Info from './info';
import image from './../../images/tasks/numbers.png';

import {body} from './../translations/body';
import './card.css';

export default function Card(props) {
    // info type: information or help (if card disabled)
    const [type, setType] = useState('info');
    const [info, openInfo] = useState(false);

    const [desc, setDesc] = useState([]);
    const [title, setTitle] = useState([]);
    const [gradient, setGradient] = useState('');
    const [opacity, setOpacity] = useState('1.0');
    const [cursor, setCursor] = useState('pointer');
    const [animation, setAnimation] = useState('none');

    useEffect(() => {
        // console.log('Card.useEffect -> ' + props.task.uid + ', props.locked ' + props.locked);
        switch (props.color) {
            case 'black':
                setGradient('linear-gradient(to bottom, white 50%, black 50%)');
                setTitle(black_titles[props.lang][props.task.id]);
                setDesc(black_descriptions[props.lang][props.task.id]);
                break;

            case 'brown':
                setGradient('linear-gradient(to bottom, white 50%, brown 50%)');
                setTitle(brown_titles[props.lang][props.task.id]);
                setDesc(brown_descriptions[props.lang][props.task.id]);
                break;

            case 'navy':
                setGradient('linear-gradient(to bottom, white 50%, navy 50%)');
                setTitle(navy_titles[props.lang][props.task.id]);
                setDesc(navy_descriptions[props.lang][props.task.id]);
                break;

            case 'green':
                setGradient('linear-gradient(to bottom, white 50%, green 50%)');
                setTitle(green_titles[props.lang][props.task.id]);
                setDesc(green_descriptions[props.lang][props.task.id]);
                break;

            case 'orange':
                setGradient('linear-gradient(to bottom, white 50%, orange 50%)');
                setTitle(orange_titles[props.lang][props.task.id]);
                setDesc(orange_descriptions[props.lang][props.task.id]);
                break;

            default: // 'white'
                setGradient('linear-gradient(to bottom, white 50%, black 50%)');
                setTitle(white_titles[props.lang][props.task.id]);
                setDesc(white_descriptions[props.lang][props.task.id]);
                break;
        }

        if (props.locked) {
            setOpacity('0.5');
            setCursor('no-drop');

        } else {
            setOpacity('1.0');
            setCursor('pointer');
        }

    }, [props.task, props.color, props.lang, props.locked, props.nonexam]);

    function onOpen(property) {
        // console.log('Card.onClick, props.locked: ' + props.locked);
        if (property === 'info') {
            // open info without card animation
            setType('info'); openInfo(true);

        } else if (property === 'help') {
            // open help why card is disabled
            setType('help'); openInfo(true);

        } else if (props.locked === false) {
            setAnimation('rotate .8s');
            // call in .5sec to show picture rotate animation
            setTimeout(() => {
                if (property === 'game') {
                    props.onUpdate(props.task);
                }
            }, 700);
            setTimeout(() => {
                setAnimation('none');
            }, 1000);

        } else if (props.locked === true) {
            // open help to explain, why card is disabled
            setType('help'); openInfo(true);
        }
    }

    function onClose(property) {
        openInfo(false);
        if (property === 'play') { 
            props.onUpdate(props.task);
        }
    }

    return (
        <div className='card_wrapper' style={{'animation': animation}}>
            {(props.nonexam) ? (
                <>
                    <div className='card_wrapper_img' style={{'opacity': opacity, 'cursor': cursor}} onClick={() => onOpen('game')}>
                        <img src={props.task.logo} alt='logo' onContextMenu={(e) => e.preventDefault()}/>
                    </div>
                    <div className='card_wrapper_text' style={{'opacity': opacity}}> {title} </div>
                    <div className='card_wrapper_btn'>
                        <Button size='small' color='primary' onClick={() => onOpen('info')}
                            startIcon={<VisibilityIcon/>}> {body[props.lang]['info']}
                        </Button>
                        {(props.locked) ? (
                            <Button size='small' color='primary' onClick={() => onOpen('help')}
                                startIcon={<HelpIcon/>}> {body[props.lang]['help']}
                            </Button>
                        ) : (
                            <Button size='small' color='primary' onClick={() => onOpen('game')}
                                startIcon={<PlayCircleFilledWhiteIcon/>}> {body[props.lang]['play']}
                            </Button>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className='card_test_wrapper_img' onClick={() => onOpen('game')} style={{backgroundImage: gradient}}>
                        <img src={image} alt='numbers' onContextMenu={(e) => e.preventDefault()}/>
                    </div>
                    <div className='card_test_wrapper_text'> {title} </div>
                    <div className='card_wrapper_btn'>
                        <Button size='small' color='primary' onClick={() => onOpen('info')}
                            startIcon={<VisibilityIcon/>}> {body[props.lang]['info']}
                        </Button>
                        <Button size='small' color='primary' onClick={() => onOpen('game')}
                            startIcon={<PlayCircleFilledWhiteIcon/>}> {body[props.lang]['play']}
                        </Button>
                    </div>
                </>
            )}

            <Info open={info}
                type={type}
                locked={props.locked}
                title={title}
                text={desc}
                color={props.color}
                source={props.task.logo}
                task_id={props.task.uid}
                task={props.task.type}
                fullScreen={props.width<FULL_SCREEN}
                lang={props.lang}
                onClose={onClose}/>
        </div>
    );
}
