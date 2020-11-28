import React from 'react';
import {Slide, Dialog, DialogActions, Button} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';

import Title from './../title/title';
import ColorLine from './../line/line';

import image_about from './../../images/information.png';
import image_vitamins from './../../images/vitamins.jpg';

import {about} from './../translations/about';

import './about.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='right' ref={ref} {...props} />;
});

export default function About(props) {
    return (
        <Dialog open={props.open} onClose={() => props.onClose('close')}
            fullScreen={props.fullScreen} scroll='body' fullWidth={true} maxWidth='md' 
            TransitionComponent={Transition} transitionDuration={800}>

            <Title title={props.title} src={image_about} onClose={() => props.onClose('close')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <div className='about_title'>
                {about[props.lang]['use']} <font style={{color:'green'}}>SuperMath</font> {about[props.lang]['vitamins']}
            </div>

            <div className='about_image'>
                <img src={image_vitamins} alt='Vitamins!'/>
            </div>

            <div className='about_text'>
                {about[props.lang]['designed']}
            </div>

            <div className='about_text'>
                {about[props.lang]['offer']}
            </div>

            <div className='about_text'>
                {about[props.lang]['nonprofit']}
            </div>

            <div className='about_text'>
                {about[props.lang]['colors']}
            </div>

            <ColorLine/>

            <DialogActions>
                <Button size='small' color='primary' startIcon={<CancelIcon />}
                        onClick={() => props.onClose()}> {about[props.lang]['close']} </Button>
            </DialogActions>
        </Dialog>
    );
}
