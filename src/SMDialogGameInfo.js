import React from 'react';
import {Typography, Dialog, Card, CardMedia, Button, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

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
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function SMDialogGameInfo(props) {
    return (
        <Dialog onClose={() => props.onClick()} aria-labelledby="customized-dialog-title" transitionDuration={500} open={props.open}>
                      <DialogTitle onClose={() => props.onClick()}>
                        {props.title}
                      </DialogTitle>
                      <DialogContent dividers>
                        <Typography gutterBottom>
                            {this.state.viewDialogDescriptionText}
                        </Typography>
                        <Card style={{display: 'flex', flexDirection: 'column'}}>
                            <CardMedia component="img" alt="Media Card task" height="100%" image={this.state.viewDialogImageUrl}/>
                        </Card>
                        <Typography gutterBottom>
                            SuperMath is designed to help students transition from counting or calculating to recalling the basic arithmetic facts.
                            The timer allows SuperMath to distinguish a recalled answer from a counted or calculated answer.
                            The default three-second mastery threshold is carefully selected to be long enough to type in a recalled answer,
                            but not long enough for the student to comfortably enter a counted or calculated answer.
                            Via Settings, we have added the ability to hide/pause the timer, though student answers are still evaluated.
                            With less time pressure, students may not answer as quickly as they can, potentially resulting in lower scores
                            or slower progress than they might otherwise achieve.
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                          <Button onClick={this.state.handleInfoClose} color="primary">Play</Button>
                      </DialogActions>
                    </Dialog>
    );

/*
  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
*/
}
