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

import Info from './info';
import image from './../../images/tasks/numbers.png';
import {body} from './../translations/body';
import './card.css';

export default function Card(props) {
    const [info, openInfo] = useState(false);

    const [desc, setDesc] = useState([]);
    const [title, setTitle] = useState([]);
    const [gradient, setGradient] = useState('');
    const [animation, setAnimation] = useState(['none']);

    useEffect(() => {
        // console.log('Card.useEffect -> ' + props.task.uid + ', nonexam ' + props.nonexam + ', locked ' + props.locked);
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

    }, [props.task, props.color, props.lang, props.locked, props.nonexam]);

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
            {(props.nonexam === false) ? (
                <div className='card_wrapper' style={{'animation': animation}}>
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
                </div>
            ) : (
              <>
                {(props.locked === false) ? (
                    <div className='card_wrapper' style={{'animation': animation}}>
                        <div className='card_wrapper_img' onClick={() => onOpen('game')}>
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
            )}

            <Info open={info}
                title={title}
                text={desc}
                source={props.task.logo}
                task_id={props.task_id}
                task={props.task.type}
                fullScreen={props.width<820}
                lang={props.lang}
                onClose={onClose}/>
        </>
    );
}
