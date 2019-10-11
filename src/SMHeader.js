import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

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

export default function SMHeader(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
    <AppBar position="relative">
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap>
        <IconButton color="inherit">
          <HomeIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleClickOpen}>
          <InfoOutlinedIcon />
        </IconButton>
         <IconButton color="inherit" >
          <HelpOutlineIcon />
        </IconButton>
      </Typography>

      <IconButton color="inherit" >
        <PersonOutlineIcon />
        <Button color="inherit">{props.login}</Button>
      </IconButton>

    </Toolbar>

    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title"
                   onClose={handleClose}
                   style={{fontFamily: "Grinched", fontVariant: "small-caps", color: "red" }}>
        Information
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
            <b>Use SuperMath as mathematical vitamins!</b> Offer the child to regularly solve the examples in SuperMath
            only once a day, for five minutes, and you will notice how much faster and more accurately he will
            operate on the numbers. The speed and accuracy of the calculations - these are the bricks that lay
            the foundation of your child\'s mathematical education.
        </Typography>
      </DialogContent>
    </Dialog>
    </AppBar>
);
}
