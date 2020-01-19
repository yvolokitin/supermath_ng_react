import React, { useState } from 'react';
import {Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Typography, Grid, Paper, Button} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class SMDialogAlert extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                value: null,
            };
    }

    render() {
        return (
            <Dialog open={openAlert} onClose={handleCloseAlert} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Would you like to EXIT from current Game?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEscapeGame} color="primary">YES</Button>
                    <Button onClick={handleCloseAlert} color="primary" autoFocus>NO</Button>
                </DialogActions>
            </Dialog>
        );
    }
}
