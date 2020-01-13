import React from 'react';
import {DialogContent, DialogActions, Typography, Dialog, Card, CardMedia, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

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

export default function SMAbout(props) {
    return (
        <Dialog onClose={() => props.onClick()} aria-labelledby="customized-dialog-title" transitionDuration={500} open={props.open}>
            <DialogTitle id="customized-dialog-title" onClose={() => props.onClick()}>
                <Typography style={{color: 'green', fontFamily: 'Grinched', fontSize: '3.0rem', textAlign:'center'}}>
                    About SuperMath
                </Typography>
            </DialogTitle>

            <DialogContent dividers>
                <Typography gutterBottom style={{color: 'orange', fontFamily: 'Grinched', fontSize: '2.0rem', textAlign:'center'}}>
                    Use SuperMath as mathematical vitamins!
                </Typography>

                <Card style={{display: 'flex', flexDirection: 'column'}}>
                    <CardMedia component="img" alt="Vitamins!" height="140" src={require('./../../images/vitamins.jpg')} title="Use SuperMath as mathematical vitamins!"/>
                </Card>

                <Typography gutterBottom>
                    Offer the child to regularly solve the examples in SuperMath
                    only once a day, for five minutes, and you will notice how much faster and more accurately he will
                    operate on the numbers. The speed and accuracy of the calculations - these are the bricks that lay
                    the foundation of your childs mathematical education.
                </Typography>

                <Typography gutterBottom>
                    In one day, I just personally asked myself - How can I contribute to improve a small part of the world.
                    Im father of two wonderful sons and due to a lot of work responsibility, in some days I could not get so much attantion to them, specially in Mathematics.
                    We could not image our current life now without Mobile phone and Internet and we have it because of Math.
                    When I developed that Math portal for kids I had vary clear goal - help kids with Math! :-)
                </Typography>
            </DialogContent>

            <DialogActions>
                  <Button onClose={() => props.onClick()} color="primary">CLOSE</Button>
            </DialogActions>
        </Dialog>
    );
}
