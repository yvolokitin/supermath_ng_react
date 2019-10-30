import React from 'react';
import {Dialog, DialogTitle, Typography, Grid, Paper} from '@material-ui/core';

/*
                        <Grid item xs={12}>2</Grid>
*/
export default class SMDialogGamePlay extends React.Component {
    render() {
        return (
        <Dialog onClose={() => this.props.onClick()} fullScreen={true} open={this.props.open}>
            <DialogTitle style={{fontFamily: "Grinched", fontVariant: "small-caps", color: "orange" }}>
                <Typography component={'div'} variant="h5" style={{fontFamily: "Grinched", color: "orange" }}>SUPERMATH</Typography>
            </DialogTitle>

            <Grid container justify="space-around" alignItems="center" spacing={5}>
                <Grid item xs={6} sm={6} component={Paper} elevation={6} square>
                    <Grid container direction="column" justify="space-around" alignItems="flex-end">
                        <Grid item xs={12}>2</Grid>
                        <Grid item xs={12}>+ 2</Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6} sm={6} component={Paper} elevation={6} square>
                        <Grid container justify="center" spacing={1}>
                            <Grid container justify="center" item xs={12} spacing={3}>
                                <Grid item xs={4} style={{fontFamily: "Grinched", color: "green"}}><Paper>7</Paper></Grid>
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
        </Dialog>
        );
    }
}
