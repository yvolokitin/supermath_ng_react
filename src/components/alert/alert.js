﻿import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

export default function AlertDialog(props) {
    return (
        <Dialog onClose={() => props.onClose('close')} open={props.open}>
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                {'text' in props ? (
                    <DialogContentText>{props.text}</DialogContentText>
                ) : (
                    <DialogContentText>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji' style={{fontSize:'70px'}}>&#9748;</span>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji' style={{fontSize:'70px'}}>&#127810;</span>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji' style={{fontSize:'70px'}}>&#128148;</span>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji' style={{fontSize:'70px'}}>&#128406;</span>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji' style={{fontSize:'70px'}}>&#128168;</span>
                    </DialogContentText>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={() => props.onClose('logout')} color="primary" autoFocus>{props.yes}</Button>
                <Button onClick={() => props.onClose('close')} color="primary">
                    {props.no}

                    {'name' in props ? (
                        <font style={{color:'red'}}>
                            &nbsp; {props.name}
                        </font>
                    ) : (null)}

                </Button>
            </DialogActions>
        </Dialog>
  );
}
