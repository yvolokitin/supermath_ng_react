import React, { useEffect, useState } from 'react';
import { Dialog, Slide, Typography } from '@material-ui/core';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';

import './help.css';
import {help} from './../translations/help';

import image from './../../images/help/belts.jpg';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

export default function Help(props) {
    useEffect(() => {
        console.log('Help.useEffect ' + props.open + ', props.lang ' + props.lang);

    }, [props.open]);

    return (
        <Dialog open={props.open} fullScreen={true} onClose={() => props.onClose()}
            TransitionComponent={Transition} transitionDuration={800}>

            <div className='help_wrapper'>
                <SMTitle title='' onClick={() => props.onClose()}/>
                <ColorLine/>

            </div>

        </Dialog>
    );
}
