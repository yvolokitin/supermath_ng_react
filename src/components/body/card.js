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
import DigitGame from "./../games/digitgame";

import {body} from './../translations/body';
import './card.css';

export default function Card(props) {
    const [title, setTitle] = useState([]);
    const [desc, setDesc] = useState([]);
    const [animation, setAnimation] = useState(['none']);

    const [info, openInfo] = useState(false);
    const [game, openGame] = useState(false);

    useEffect(() => {
        // console.log('props.src ' + props.src);
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

    }, [props.task, props.color, props.lang]);

    function onOpen(property, value) {
        // console.log('Card.onClick ' + property + ', ' + value);
        setAnimation('rotate .9s');
        // call in .5sec to show picture rotate animation
        setTimeout(() => {
            if (property === 'info') { 
                openInfo(true);
            } else if (property === 'game') {
                openGame(value);
            }
        }, 500);
    }

    /*
        } else if ((status === 'close') ||
                   (status === 'replay') ||
                   (status === 'register')) {
    */
    function onClose(property, value, option) {
        setAnimation('none');

        // this.props.onClose(status, pass, fail);
        if ((property === 'close') || (property === 'interrapted') || (property === 'register')) {
            console.log('Card.onClose ' + property + ': ' + value + ' - ' + option);
            props.onUpdate(property, value, option);
            openGame(false);

        } else if (property === 'replay') {
            console.log('Card.onClose ' + property + ': ' + value + ' - ' + option);
            props.onUpdate(property, value, option);

        } else if (property === 'info') {
            openInfo(value);

        } else {
            console.log('ERROR: Unknown onClose property called ' + property);
            alert('ERROR: Unknown onClose property called ' + property);
        }
    }

    return (
        <div className='card_wrapper' style={{'animation': animation}}>
            <div onClick={() => onOpen('game', true)} className='card_wrapper_img'>
                <img src={props.task.logo} alt={props.task.logo} onContextMenu={(e) => e.preventDefault()}/>
            </div>

            <div className='card_wrapper_text'>
                {title}
            </div>

            <div className='card_wrapper_btn'>
                <Button size='small' color='primary' onClick={() => onOpen('info', true)}
                        startIcon={<VisibilityIcon/>}> {body[props.lang]['info']} </Button>
                <Button size='small' color='primary' onClick={() => onOpen('game', true)}
                        startIcon={<PlayCircleFilledWhiteIcon/>}> {body[props.lang]['play']} </Button>
            </div>

            <Info open={info}
                  title={title}
                  text={desc}
                  source={props.task.logo}
                  task={props.task.type}
                  lang={props.lang}
                  onClose={onClose}/>

            <DigitGame open={game}
                       type={props.task.type}
                       task={props.task.task}
                       amount={props.task.amount}
                       lang={props.lang}
                       belt='white'
                       onClose={onClose}/>
        </div>
    );
}
