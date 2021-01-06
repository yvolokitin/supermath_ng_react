import React from 'react';
import {Slide, Dialog, DialogActions, Button} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';

import Title from './../title/title';
import ColorLine from './../line/line';

import image_about from './../../images/information.png';

import {about} from './../translations/about';

import './team.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='right' ref={ref} {...props} />;
});

export default function Team(props) {
    return (
        <Dialog open={props.open} onClose={() => props.onClose('close')}
            fullScreen={props.fullScreen} scroll='body' fullWidth={true} maxWidth='md' 
            TransitionComponent={Transition} transitionDuration={800}>

            <Title title={'Team'} src={image_about} onClose={() => props.onClose('close')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <div className='team_title'>
                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127183;</span>
             </div>

            <DialogActions>
                <Button size='small' color='primary' startIcon={<CancelIcon />}
                        onClick={() => props.onClose()}> {about[props.lang]['close']} </Button>
            </DialogActions>
        </Dialog>
    );
}
