import React, { useState, useEffect } from 'react';
import {Dialog, DialogActions, Button} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';
import {trophy} from './../translations/trophy';
import './trophy.css';

export default function Trophy(props) {
    
    useEffect(() => {
        console.log('Trophy.props.open ' + props.open);

    }, [props.open, props.lang]);

    return (
        <Dialog open={props.open} onClose={() => props.onClose()} fullScreen={props.fullScreen} transitionDuration={700} scroll='body'>
            <SMTitle title='' onClick={() => props.onClose()}/>
            <ColorLine/>

            <div className='about_title'>

            </div>

            <DialogActions>
                <Button size='small' color='primary' startIcon={<CancelIcon />}
                        onClick={() => props.onClose()}> {trophy[props.lang]['close']} </Button>
            </DialogActions>
        </Dialog>
    );
}
