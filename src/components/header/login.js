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
    onUserName(event) {
        console.log("onUserName:: event " + event.target.value);
        this.setState({email: event.target.value});
    }

    onPassword(event) {
        console.log("onUserName:: event " + event.target.value);
        this.setState({password: event.target.value})
    }

    // curl -i -X POST -H "Content-Type: application/json" -d "{"""email""":"""volokitin@bk.ru""","""pswd""":"""asdas12"""}" http://supermath.xyz:3000/api/login
    onLogin(event) {
        event.preventDefault();
        this.setState({success: false, loading: true});

        var post_data = {'email': this.state.email, 'pswd': this.state.password};
        axios.post('http://supermath.xyz:3000/api/login', post_data)
            .then(this.onLoginResponse)
            .catch(this.onLoginError);
    }

    // {"age":"Tue, 28 Jan 2014 06:13:13 GMT","ava":"martin-berube","creation":"Fri, 31 Jan 2020 13:13:13 GMT","email":"volokitin@bk.ru","fail":3,"id":1,"name":"Sergey","pass":15,"surname":"Volokitin"}
    onLoginResponse(response) {
        console.log("onLoginResponse:: error " + response.data.error + ", id " + response.data.id);

        if ((response.data.error === undefined) && (response.data.id !== undefined)) {
            this.setState({success: true, loading: false, color:'green'});

            // age calculation based on server response value
            // "age":"Tue, 28 Jan 2014 06:13:13 GMT" -> need to convert in years
            var birthday = new Date(response.data.age);
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs);
            var age = Math.abs(ageDate.getUTCFullYear() - 1970);

            setTimeout(() => {this.props.onClick('successed', response.data.id, response.data.name, response.data.surname, age, response.data.ava, response.data.pass, response.data.fail);}, 700);

        } else {
            if (response.data.error !== undefined) {
                setTimeout(() => {this.setState({success: false, loading: false, color:'red', loginFailed: true, loginError: response.data.error.toString()});}, 700);
                // this.setState({success: false, loading: false, color:'red', loginFailed: true, loginError: response.data.error.toString()});
            } else {
                setTimeout(() => {this.setState({success: false, loading: false, color:'red', loginFailed: true, loginError: 'Uuupps!Something goes wrong'});}, 700);
                // this.setState({success: false, loading: false, color:'red', loginFailed: true, loginError: 'Uuupps!Something goes wrong'});
            }
        }
    }

    onLoginError(error) {
        console.log("axios.post error " + error);
        this.setState({success: false, loading: false, color:'red', loginFailed: true, loginError: error.toString()});
    }

    onLoginClose() {
        // ignore close request if login is in progress
        if (this.state.loading === false) {
            this.props.onClose();
        }
    }

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
                                    <Link style={{cursor:'pointer'}} onClick={() => this.props.onClick('password')} variant="body2">Forgot password?</Link>
                                </Grid>
                                <Grid item>
                                    <Link style={{cursor:'pointer'}} onClick={() => this.props.onClick('registration')} variant='body2'>'Don\'t have an account? Sign Up'</Link>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                </div>

                <Snackbar onClose={(e) => this.setState({loginFailed:false})} autoHideDuration={10000} open={this.state.loginFailed}>
                    <Alert onClose={(e) => this.setState({loginFailed:false})} severity="error">
                        Login failed: {this.state.loginError}
                    </Alert>
                </Snackbar>

            </Dialog>
        );
    }
}

