import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import HomeIcon from '@material-ui/icons/Home';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
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

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default class SMHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen(e) {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        return (
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                <IconButton color="inherit">
                  <HomeIcon />
                </IconButton>
                <IconButton color="inherit" onClick={(e) => this.handleOpen(e)}>
                  <InfoOutlinedIcon />
                </IconButton>
                 <IconButton color="inherit">
                  <HelpOutlineIcon />
                </IconButton>
                <IconButton color="inherit">
                  <PersonOutlineIcon />
                </IconButton>
                <Button color="inherit">Login</Button>
              </Typography>
            </Toolbar>

            <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
              <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>SuperMath Information</DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <b>Use SuperMath as mathematical vitamins!</b>
                    </Typography>

                    <img src={require('./imgs/vitamins.jpg')} alt="Logo" style={{maxWidth: "100%"}} />
    
                    <CardMedia image={require('./imgs/vitamins.jpg')} title={'QWe'}/>

                    <Typography gutterBottom>
                        Offer the child to regularly solve the examples in SuperMath
                        only once a day, for five minutes, and you will notice how much faster and more accurately he will
                        operate on the numbers. The speed and accuracy of the calculations - these are the bricks that lay
                        the foundation of your childs mathematical education.
                    </Typography>
                </DialogContent>

                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">CLOSE</Button>
                </DialogActions>

              </Dialog>
          </AppBar>
        )
    };
}
