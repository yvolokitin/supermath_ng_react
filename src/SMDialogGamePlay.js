import React, { useState } from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Typography, Grid, Paper, Button} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {makeStyles, withStyles} from '@material-ui/core/styles';

export default class SMDialogGamePlay extends React.Component {
    render() {
        return (
        <Dialog onClose={() => this.props.onClick()} fullScreen={true} open={this.props.open}>
            <DialogTitle style={{fontFamily: "Grinched", fontVariant: "small-caps", color: "orange" }}>
                <Typography component={'div'} variant="h5" style={{fontFamily: "Grinched", color: "orange" }}>SUPERMATH</Typography>
            </DialogTitle>

            <DialogContent style={{width: '95%',}}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Grid container justify="center" spacing={1}>
                            <Grid container justify="center" item xs={12} spacing={3}>2</Grid>
                            <Grid container justify="center" item xs={12} spacing={3}>+</Grid>
                            <Grid container justify="center" item xs={12} spacing={3}>2</Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Grid container justify="center" spacing={1}>
                            <Grid container justify="center" item xs={12} spacing={3}>
                                <Grid item xs={4}><Paper>7</Paper></Grid>
                                <Grid item xs={4}><Paper>8</Paper></Grid>
                                <Grid item xs={4}><Paper>9</Paper></Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                                <Grid item xs={4}><Paper>4</Paper></Grid>
                                <Grid item xs={4}><Paper>5</Paper></Grid>
                                <Grid item xs={4}><Paper>6</Paper></Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                                <Grid item xs={4}><Paper>1</Paper></Grid>
                                <Grid item xs={4}><Paper>2</Paper></Grid>
                                <Grid item xs={4}><Paper>3</Paper></Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                                <Grid item xs={4}><Paper>0</Paper></Grid>
                                <Grid item xs={4}><Paper>+</Paper></Grid>
                                <Grid item xs={4}><Paper>-</Paper></Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                                <Grid item xs={4}><Paper>&gt;</Paper></Grid>
                                <Grid item xs={4}><Paper>=</Paper></Grid>
                                <Grid item xs={4}><Paper>&lt;</Paper></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                CIRCLE CIRCLE CIRCLE CIRCLE CIRCLE CIRCLE CIRCLE
            </DialogActions>
        </Dialog>
        );
    }
}
