import React from 'react';
import {Dialog, DialogTitle, DialogContent, Typography, Grid, Paper} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
/*

*/
export default class SMDialogGamePlay extends React.Component {
    render() {
        const dialogStyle = {
            backgroundColor: "black",
        };

        const gridStyle = {
            fontFamily: "Grinched",
            color: "green",
        };

        return (
        <Dialog onClose={() => this.props.onClick()} fullScreen={true} open={this.props.open}>
            <DialogTitle style={{backgroundColor: '#99ccff'}}>
                <Typography component={'div'} variant="h4" style={gridStyle}>SUPERMATH</Typography>
            </DialogTitle>

            <DialogContent dividers>
            <Grid container justify="space-around" alignItems="center" spacing={5} style={{ backgroundColor: 'orange' }}>
                <Grid item component={Paper} xs={6} sm={6}>
                    <Grid container direction="column" justify="space-around" alignItems="flex-end">
                        <Grid item xs={12}>2</Grid>
                        <Grid item xs={12}>+ 2</Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6} sm={6}>
                        <Grid container justify="center" component={Paper} spacing={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={6} sm={6} style={gridStyle}><Paper>7</Paper></Grid>
                                <Grid item xs={6} sm={6} style={gridStyle}><Paper>8</Paper></Grid>
                                <Grid item xs={6} sm={6} style={gridStyle}><Paper>9</Paper></Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={4}><Paper>4</Paper></Grid>
                                <Grid item xs={4}><Paper>5</Paper></Grid>
                                <Grid item xs={4}><Paper>6</Paper></Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={4}><Paper>1</Paper></Grid>
                                <Grid item xs={4}><Paper>2</Paper></Grid>
                                <Grid item xs={4}><Paper>3</Paper></Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={4}><Paper>0</Paper></Grid>
                                <Grid item xs={4}><Paper>+</Paper></Grid>
                                <Grid item xs={4}><Paper>-</Paper></Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={4}><Paper>&gt;</Paper></Grid>
                                <Grid item xs={4}><Paper>=</Paper></Grid>
                                <Grid item xs={4}><Paper>&lt;</Paper></Grid>
                            </Grid>
                        </Grid>
                </Grid>

            </Grid>
            </DialogContent>

            <DialogContent dividers>
                QQQQQQQQQQQQQQQQ
            </DialogContent>

        </Dialog>
        );
    }
}
