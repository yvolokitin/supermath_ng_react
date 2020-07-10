// import React, { useEffect,  } from 'react';
import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import './throw.css';
import SMTitle from './../dialog/title';
import ColorLine from "./../line/line";
import {trophy} from './../translations/trophy';

export default function Throw(props) {
    return (
        <Dialog open={props.open} fullScreen={props.fullScreen} onClose={() => props.onThrow('close')}>
            <SMTitle title='' onClick={() => props.onThrow('close')}/>
            <DialogTitle> {trophy[props.lang]['title']} </DialogTitle>

            <DialogContent>
                <DialogContentText> {trophy[props.lang]['question']} <b>{props.name}</b>? </DialogContentText>
            </DialogContent>

            <ColorLine/>

            <DialogActions>
                <Button onClick={() => props.onThrow('throw')} color="primary" autoFocus>
                    {trophy[props.lang]['yes']}
                </Button>
                <Button onClick={() => props.onThrow('close')} color="primary">
                    {trophy[props.lang]['no']}
                </Button>
            </DialogActions>

        </Dialog>
    );
}
