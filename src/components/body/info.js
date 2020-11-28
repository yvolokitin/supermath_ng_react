import React from 'react';
import {Dialog, Button} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import Title from './../title/title';
import ColorLine from './../line/line';

import image_info from './../../images/information.png';
import image_locked from './../../images/locked.jpg';

import {info} from './../translations/info';

import './info.css';

export default function Info(props) {
    const [text, setText] = React.useState('');
    const [extra, setExtra] = React.useState('');
    const [title, setTitle] = React.useState(props.title);
    const [image, setImage] = React.useState(props.source);

    React.useEffect(() => {
        if (props.open) {
            // console.table(props);
            if (props.type === 'info') {
                setTitle(props.title);
                setImage(props.source);

                if (props.task === 'task') {
                    setText(info[props.lang]['each']
                        + props.task_id.charAt(props.task_id.length - 1)
                        + info[props.lang]['feka']);
                    setExtra(info[props.lang]['extra']);

                } else {
                    setText(props.text);
                    setExtra(info[props.lang]['extra']);
                }

            } else { // help -> when game/task is locked
                setTitle(info[props.lang]['task_locked']);
                setText('');
                setImage(image_locked);
                setExtra(info[props.lang]['unlock']);
            }
        }

    }, [props.open, props.type, props.task, props.task_id,
        props.text, props.title, props.source, props.lang]);

    return (
        <Dialog open={props.open} fullScreen={props.fullScreen} transitionDuration={700} scroll='body'>
            <Title title={info[props.lang]['information']} src={image_info} onClose={() => props.onClose('info', false)} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <div className='card_info_title' style={{'color': props.color}}> {title} </div>
            <div className='card_info_text'> {text} </div>

            {(props.task === 'help') ? (
                <div className='card_info_wrapper_img' onContextMenu={(e) => e.preventDefault()}>
                    <img src={image} alt='Game' style={{backgroundColor: props.color}}/>
                </div>
            ) : (
                <div className='card_info_task_wrapper_img' onContextMenu={(e) => e.preventDefault()}>
                    <img src={image} alt='Task'/>
                </div>
            )}

            <div className='card_info_text'> {extra} </div>

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
