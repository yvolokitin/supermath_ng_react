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

import {body} from './../translations/body';
import './card.css';

export default function Card(props) {
    const [source, setSource] = useState([]);
    const [title, setTitle] = useState([]);
    const [desc, setDesc] = useState([]);
    const [animation, setAnimation] = useState(['none']);

    useEffect(() => {
        // console.log('props.src ' + props.src);
        setSource(props.src);
        if (props.color === 'white') {
            setTitle(white_titles[props.lang][props.id]);
        } else if (props.color === 'orange') {
            setTitle(orange_titles[props.lang][props.id]);
        } else if (props.color === 'green') {
            setTitle(green_titles[props.lang][props.id]);
        } else if (props.color === 'white') {
            setTitle(white_titles[props.lang][props.id]);
        } else if (props.color === 'navy') {
            setTitle(navy_titles[props.lang][props.id]);
        } else if (props.color === 'brown') {
            setTitle(brown_titles[props.lang][props.id]);
        } else if (props.color === 'black') {
            setTitle(black_titles[props.lang][props.id]);
        }

    }, [props.id, props.color, props.src, props.lang]);

    function onClick() {
        console.log('Card.onClick');
        setAnimation('flashEffect 1.2s');
    }

    return (
        <div className='card_wrapper' style={{'animation': animation}}>
            <div onClick={() => onClick()} className='card_wrapper_img'>
                <img src={source} alt={source}/>
            </div>

            <div className='card_wrapper_text'>
                {title}
            </div>

            <div className='card_wrapper_btn'>
                <Button size='small' color='primary' startIcon={<VisibilityIcon/>}>
                    {body[props.lang]['info']}
                </Button>
                <Button size='small' color='primary' startIcon={<PlayCircleFilledWhiteIcon/>}>
                    {body[props.lang]['play']}
                </Button>
            </div>

        </div>
    );
}
