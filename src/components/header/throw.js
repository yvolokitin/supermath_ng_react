import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import ColorLine from "./../line/line";

export default function Throw(props) {
    return (
        <Dialog open={props.open} onClose={() => props.onClose('close')} fullScreen={props.fullScreen}>
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText> {props.question} </DialogContentText>
            </DialogContent>

            <ColorLine/>

            <DialogActions>
                <Button onClick={() => props.onClose('throw')} color="primary" autoFocus>
                    {props.yes}
                </Button>
                <Button onClick={() => props.onClose('close')} color="primary">
                    {props.no}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
