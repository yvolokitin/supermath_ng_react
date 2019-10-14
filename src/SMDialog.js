import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/core/styles';

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
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
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

export default class SMDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: true};
        alert('!!!!!!!' + this.state);
//        this.clickOpen = this.clickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
/*
    clickOpen(description) {
        alert("SMDialog.clickOpen " + description);
        this.setState({ open: true });
        this.setState({ title: "YURA" });
        this.setState({ text: description });
    }
*/
    handleClose() {
        alert("SMDialog, handleClose!!!");
        this.setState({ open: false });
    }

    render() {
      return (
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>{this.props.title}</DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>{this.props.text}</Typography>
          </DialogContent>
        </Dialog>
      );
    }
}
