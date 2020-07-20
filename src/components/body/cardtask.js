import React, { useEffect, useState } from 'react';
import StarsIcon from '@material-ui/icons/Stars';
// import StarBorderIcon from '@material-ui/icons/StarBorder';

import {Button} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import {tasks} from './../translations/tasks';

import Info from './info';
import './cardtask.css';

export default function CardTask(props) {
    const [info, openInfo] = useState(false);

    const [stars, setStars] = useState(Array(props.value).fill(''));
    const [title, setTitle] = useState(tasks[props.lang][props.task.level]);
    const [description, setDescription] = useState(tasks[props.lang][props.task.level + '_desc']);

    useEffect(() => {
        console.log('CardTask.useEffect -> ' + props.task.uid);

        setStars(Array(props.value).fill(''))
        setTitle(tasks[props.lang][props.task.level]);
        setDescription(tasks[props.lang][props.task.level + '_desc']);

    }, [props.value, props.task, props.lang, ]);

    function onOpen(property) {
        // call in .5sec to show picture rotate animation
        setTimeout(() => {
            if (property === 'info') {
                openInfo(true);
            } else if (property === 'game') {
                props.onUpdate(props.task);
            }
        }, 700);
    }

    function onClose(property) {
        openInfo(false);
        if (property === 'play') { 
            props.onUpdate(props.task);
        }
    }

    /*
                        {description}
    */
    return (
        <>
            <div className='cardtask_wrapper'>
                <div className='cardtask_wrapper_title' onClick={() => onOpen('game')}
                    style={{color: props.task.color}}>
                        {title}
                </div>

                <div className='cardtask_wrapper_description'>
                    <div className='cardtask_wrapper_image'>
                        <img src={props.task.logo} alt='Vitamins!'/>
                    </div>
                </div>

                <div className='cardtask_wrapper_btn'>
                    <Button size='small' color='primary' onClick={() => onOpen('info')}
                        startIcon={<VisibilityIcon/>}> {tasks[props.lang]['info']}
                    </Button>
                    <Button size='small' color='primary' onClick={() => onOpen('game')}
                        disabled={props.task.locked}
                        startIcon={<PlayCircleFilledWhiteIcon/>}> {tasks[props.lang]['play']}
                    </Button>
                </div>

                <div className='cardtask_wrapper_rate'>
                    {stars.map((star, index) => <StarsIcon key={index} color='primary'/>)}
                </div>
            </div>

            <Info open={info}
                title={title}
                text={description}
                source={props.task.logo}
                task_id={props.task_id}
                task={props.task.type}
                fullScreen={props.width<820}
                lang={props.lang}
                onClose={onClose}/>
        </>
    );
}
