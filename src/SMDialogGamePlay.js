import React, { useState } from 'react';
import {Dialog, DialogContentText, Typography, Grid, Paper, Button} from '@material-ui/core';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {makeStyles, withStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    width: '80%',
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    width: '80%',
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function SMDialogGamePlay(props) {
    const [openAlert, setOpenAlert] = useState(false);

    const classes = styles();

    // finishing game here
    const handleCloseGame = (event) => {
        props.callbackFromParent({open: false});
    };

    // interrapting game by ESCape button and exit
    const handleEscapeGame = (event) => {
        setOpenAlert(false);
        props.callbackFromParent({open: false});
    };

    // handle the escape key to show alert confirmation screen
    const handleOpenAlert = (event) => {
        console.log("CHILD, handleOpenAlert");
        setOpenAlert(true);
    };

    // close alert dialog and contunie playing game
    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    return (
        <div>
        <Dialog onEscapeKeyDown={handleOpenAlert} onClose={handleCloseGame} fullScreen={true} open={true}>
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
                                <Grid item xs={4}><Paper className={classes.paper}>7</Paper></Grid>
                                <Grid item xs={4}><Paper className={classes.paper}>8</Paper></Grid>
                                <Grid item xs={4}><Paper className={classes.paper}>9</Paper></Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                                <Grid item xs={4}><Paper className={classes.paper}>4</Paper></Grid>
                                <Grid item xs={4}><Paper className={classes.paper}>5</Paper></Grid>
                                <Grid item xs={4}><Paper className={classes.paper}>6</Paper></Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                                <Grid item xs={4}><Paper className={classes.paper}>1</Paper></Grid>
                                <Grid item xs={4}><Paper className={classes.paper}>2</Paper></Grid>
                                <Grid item xs={4}><Paper className={classes.paper}>3</Paper></Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                                <Grid item xs={4}><Paper className={classes.paper}>0</Paper></Grid>
                                <Grid item xs={4}><Paper className={classes.paper}>+</Paper></Grid>
                                <Grid item xs={4}><Paper className={classes.paper}>-</Paper></Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                                <Grid item xs={4}><Paper className={classes.paper}>&gt;</Paper></Grid>
                                <Grid item xs={4}><Paper className={classes.paper}>=</Paper></Grid>
                                <Grid item xs={4}><Paper className={classes.paper}>&lt;</Paper></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                CIRCLE CIRCLE CIRCLE CIRCLE CIRCLE CIRCLE CIRCLE
            </DialogActions>
        </Dialog>

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
        </div>
  );
}
