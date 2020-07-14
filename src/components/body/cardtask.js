import React, { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import {Button} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

// import {task_titles, task_descriptions} from './../translations/white';

import Info from './info';
// import image from './../../images/tasks/numbers.png';
import {body} from './../translations/body';
import './cardtask.css';

export default function CardTask(props) {
    const [info, openInfo] = useState(false);

    const [desc, setDesc] = useState([]);
    const [title, setTitle] = useState([]);
    const [gradient, setGradient] = useState('');
    const [animation, setAnimation] = useState(['none']);

    useEffect(() => {
        console.log('CardTask.useEffect -> ' + props.task.uid);

    }, [props.task, props.color, props.lang, ]);

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
            <div className='cardtask_wrapper' style={{'animation': animation}}>
                <div className='cardtask_wrapper_title' onClick={() => onOpen('game')} style={{backgroundImage: gradient}}>

                </div>

                <div className='cardtask_wrapper_btn'>
                    <Button size='small' color='primary' onClick={() => onOpen('info')}
                        startIcon={<VisibilityIcon/>}> {body[props.lang]['info']}
                    </Button>
                    <Button size='small' color='primary' onClick={() => onOpen('game')}
                        startIcon={<PlayCircleFilledWhiteIcon/>}> {body[props.lang]['play']}
                    </Button>
                </div>

                <div className='cardtask_wrapper_rate'>
                    <Rating name="disabled" max={10} value={props.value} size='small' precision={0.5} emptyIcon={<StarBorderIcon fontSize="inherit"/>} disabled/>
                </div>
            </div>

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
