﻿import React from 'react';
import {Dialog, DialogContent, Avatar, Typography, TextField, Grid, Link, Button, Checkbox, FormControlLabel} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import MuiDialogTitle from '@material-ui/core/DialogTitle';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {red} from 'material-ui/colors';

import axios from 'axios';

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

export default class SMLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '',
                      pswd: ''};

        this.onLogin = this.onLogin.bind(this);
        this.onUserName = this.onUserName.bind(this);
        this.onPassword = this.onPassword.bind(this);
    }

    onUserName(event, newValue) {
        console.log("event " + event + ", newValue " + newValue);
        this.setState({name: newValue});
    }

    onPassword(event, newValue) {
        this.setState({pswd: newValue})
    }

    // curl -i -X POST -H "Content-Type: application/json" -d "{"""user""":"""yura""","""pswd""":"""qwerty123"""}" https://supermathrest.herokuapp.com/api/login
    onLogin(event) {
        console.log("event " + event);
        var auth = {"user": this.state.username, "pswd": this.state.password};
        axios.post("https://supermathrest.herokuapp.com/api/login", auth)
             .then(response => console.log("axios.post response " + response.data))
             .catch(error => console.log("axios.post error " + error));
    }

    // <Dialog onClose={() => props.onClick()} fullWidth={true} open={this.props.open}>
    render() {
        return (
            <Dialog onClose={() => this.props.onClick()} fullWidth={true} open={true}>
                <DialogTitle id="customized-dialog-title" onClose={() => this.props.onClick()}></DialogTitle>

                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Avatar style={{margin: 10, width: 60, height: 60, backgroundColor: red[500] }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography style={{color: 'green', fontFamily: 'Grinched', fontSize: '3.0rem'}}>
                        SUPERMATH LOGIN
                    </Typography>

                    <DialogContent dividers>
                        <form noValidate>
                            <TextField variant="outlined" margin="normal" required fullWidth id="email"
                                       label="Email Address" name="email" autoComplete="email" autoFocus
                                       onChange = {this.onUserName}/>
                            <TextField variant="outlined" margin="normal" required fullWidth id="password"
                                       label="Password" name="password" type="password" autoComplete="current-password"
                                       onChange = {this.onPassword}/>
                            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>

                            <Button type="submit" fullWidth variant="contained" color="primary" onClick={this.onLogin}>
                                Sign In
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">Forgot password?</Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">{"Don't have an account? Sign Up"}</Link>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                </div>
            </Dialog>
        );
    }
}

