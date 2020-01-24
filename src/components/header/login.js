import React from 'react';
import {Fab, CircularProgress, Snackbar} from '@material-ui/core';
import {Dialog, DialogContent, TextField, Grid, Link, Button, Checkbox, FormControlLabel} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CheckIcon from '@material-ui/icons/Check';

import SMTitle from "./../dialog/title";

import axios from 'axios';

import './header.css';

export default class SMLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '',
                      password: '',
                      success: false,
                      loading: false,
                      color: 'red',
                      loginFailed: false,
                      loginError: '',
                      };

        this.onUserName = this.onUserName.bind(this);
        this.onPassword = this.onPassword.bind(this);

        this.onLogin = this.onLogin.bind(this);
        this.onLoginError = this.onLoginError.bind(this);
        this.onLoginClose = this.onLoginClose.bind(this);
        this.onLoginResponse = this.onLoginResponse.bind(this);
    }

    // event: The event source of the callback. You can pull out the new value by accessing event.target.value (string).
    onUserName(event, newValue) {
        // console.log("event " + event + ", newValue " + newValue);
        // this.setState({name: newValue});
    }

    onPassword(event, newValue) {
        // this.setState({pswd: newValue})
    }

    // curl -i -X POST -H "Content-Type: application/json" -d "{"""user""":"""yura""","""pswd""":"""qwerty123"""}" https://supermathrest.herokuapp.com/api/login
    onLogin(event) {
        event.preventDefault();
        console.log("event " + event);

        this.setState({success: false, loading: true});

        // simulation success login results
        // setTimeout(() => {this.onLoginResponse('qqq');}, 2000);

        // var post_data = {'user': 'yura', 'pswd': 'test'};
        var post_data = {'user': 'yura', 'pswd': ''};
        axios.post('https://supermathrest.herokuapp.com/api/login', post_data)
            .then(this.onLoginResponse)
            .catch(this.onLoginError);
    }

    onLoginClose() {
        // ignore close request if in progress
        if (this.state.loading === false) {
            this.props.onClick();
        }
    }

    onLoginResponse(response) {
        console.log("YURA: axios.post response " + response.data.user_id);
        console.log("YURA: axios.post response " + response.data.username);

        this.setState({success: true, loading: false, color:'green'});

        setTimeout(() => {this.props.onClick('successed', 'Sergey', '6', './../../images/avatars/queen-icon.png', '775', '13');}, 300);
    }

    onLoginError(error) {
        console.log("axios.post error " + error);
        this.setState({success: false, loading: false, color:'red', loginFailed: true, loginError: error.toString()});
    }

/*
                    <Avatar style={{margin: 10, width: 60, height: 60, backgroundColor: red[500] }}>
                        {success ? <CheckIcon/> : <LockOutlinedIcon/>}
                    </Avatar>
*/
    render() {
        return (
            <Dialog onClose={this.onLoginClose} fullWidth={true} open={this.props.open}>
                <SMTitle title='' onClick={this.onLoginClose}/>

                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <div style={{position:'relative',}}>
                        <Fab style={{color:'white',backgroundColor:this.state.color}}>
                            {this.state.success ? <CheckIcon/> : <LockOutlinedIcon/>}
                        </Fab>
                        {this.state.loading && <CircularProgress size={68} style={{color:'green',position:'absolute',top:-6,left:-6,zIndex:1,}}/>}
                    </div>

                    <DialogContent>
                        <form noValidate>
                            <TextField variant="outlined" margin="normal" required fullWidth id="email"
                                       label="Email Address" name="email" autoComplete="email" autoFocus
                                       onChange={this.onUserName} disabled={this.state.loading}/>
                            <TextField variant="outlined" margin="normal" required fullWidth id="password"
                                       label="Password" name="password" type="password" autoComplete="current-password"
                                       onChange={this.onPassword} disabled={this.state.loading}/>
                            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>

                            <Button type="submit" fullWidth variant="contained" color="primary"
                                    onClick={this.onLogin} disabled={this.state.loading}>
                                Login
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

                <Snackbar onClose={(e) => this.setState({loginFailed:false})} autoHideDuration={10000} open={this.state.loginFailed}>
                    <Alert onClose={(e) => this.setState({loginFailed:false})} severity="error">
                        Login failed with following reason: {this.state.loginError}
                    </Alert>
                </Snackbar>

            </Dialog>
        );
    }
}

