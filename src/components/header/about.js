import React from 'react';
import {Slide, Dialog, DialogActions, Button} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';
import vitamins from './../../images/vitamins.jpg';
import {about} from './../translations/about';

import './about.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='right' ref={ref} {...props} />;
});

export default function About(props) {
    return (
        <Dialog open={props.open}
            fullWidth={true} maxWidth='md' 
            onClose={() => props.onClose()}
            fullScreen={props.fullScreen}
            TransitionComponent={Transition}
            transitionDuration={800}>

            <SMTitle title='' onClick={() => props.onClose()}/>
            <ColorLine/>

            <div className='about_title'>
                {about[props.lang]['use']} <font style={{color:'green'}}>SuperMath</font> {about[props.lang]['vitamins']}
            </div>

            <div className='about_image'>
                <img src={vitamins} alt='Vitamins!'/>
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
