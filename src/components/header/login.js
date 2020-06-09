import React from 'react';
import {Fab, CircularProgress, Snackbar} from '@material-ui/core';
import {Dialog, DialogContent, TextField, Grid, Link, Button, Checkbox, FormControlLabel} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CheckIcon from '@material-ui/icons/Check';

// email validator
import {validate} from 'validate.js';
import constraints from './constraints';

import SMTitle from './../dialog/title';
import ColorLine from "./../line/line";

import {login} from './../translations/login';
import {get_local_users} from './../halpers/localstorage';

import axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
            pswd: localStorage.getItem('pswd') ? localStorage.getItem('pswd') : '',
            users: get_local_users(),
            success: false,
            loading: false,
            color: 'red',
            error: false,
            message: '',
            duration: 15000,
        };

        this.onClose = this.onClose.bind(this);

        this.onLogin = this.onLogin.bind(this);
        this.onLoginError = this.onLoginError.bind(this);
        this.onLoginResponse = this.onLoginResponse.bind(this);

        this.time = new Date().getTime();
    }

    onLogin(event) {
        event.preventDefault();

        var result = validate({email: this.state.email}, constraints);
        if ('email' in result) {
            this.setState({success: false,
                           error: true,
                           duration: 5000,
                           message: result.email});
            return;
        }
        result = validate({pswd: this.state.pswd}, constraints);
        if ('pswd' in result) {
            this.setState({success: false,
                           error: true,
                           duration: 5000,
                           message: result.pswd});
            return;
        }

        this.setState({success: false, loading: true});

        var crypto = require('crypto');
        var mykey = crypto.createCipher('aes-128-cbc', this.state.pswd);
        var pswdhash = mykey.update('abc', 'utf8', 'hex');
        pswdhash += mykey.final('hex');
        localStorage.setItem('pswdhash', pswdhash);
        // console.log('onLogin -> crypto pswdhash: ' + pswdhash);

        var post_data = {'email': this.state.email, 'pswdhash': pswdhash};
        axios.post('http://supermath.xyz:3000/api/login', post_data)
            .then(this.onLoginResponse)
            .catch(this.onLoginError);

        this.time = new Date().getTime();
    }

    /**
     * Login server response
     */
    onLoginResponse(response) {
        console.log('onLoginResponse:: error ' + response.data.error + ', id ' + response.data.id);

        var timeout = new Date().getTime() - this.time;
        if (timeout < 2000) {
            timeout = 2000;
        }

        if ('data' in response) {
            // id & etc. are mandatory user attributes
            if (('id' in response.data) &&
                ('name' in response.data) &&
                ('lang' in response.data) &&
                ('surname' in response.data) &&
                ('email' in response.data) &&
                ('passed' in response.data) &&
                ('failed' in response.data) &&
                ('solved' in response.data) &&
                ('cards' in response.data) &&
                ('avatar' in response.data) &&
                ('belt' in response.data)) {
                setTimeout(() => {
                    this.props.onClose('successed', response.data);
                    this.setState({success: true, loading: false, color:'green'});
                }, timeout);

            } else if ('error' in response.data) {
                setTimeout(() => {
                    this.setState({success: false, loading: false, color:'red', error: true,
                                   message: response.data.error.toString()});}, timeout);
            } else {
                var message = login[this.props.lang]['error_no_error'];
                setTimeout(() => {
                    this.setState({'success': false, 'loading': false, 'color':'red', 'error': true, 'message': message});
                }, timeout);
            }
        } else {
            setTimeout(() => {
                var message = login[this.props.lang]['error_no_data'];
                this.setState({'success': false, 'loading': false, 'color': 'red', 'error': true, 'message': message});
            }, timeout);
        } 
    }

    onLoginError(error) {
        console.log('axios.post error ' + error);
        this.setState({success: false, loading: false, color:'red', error: true, message: error.toString()});
    }

    onClose(status) {
        console.log('login.onClose ' + this.state.loading + ', ' + status);
        // ignore close request if login is in progress
        if (!this.state.loading) {
            this.props.onClose(status);
        }
    }

    /*
    */
    render() {
        console.log('Login -> this.state.users ' + this.state.users);

        return (
            <Dialog open={this.props.open} fullWidth={true} fullScreen={this.props.fullScreen} transitionDuration={600}>
                <SMTitle title='' onClick={() => this.onClose()}/>
                <ColorLine/>

                <div style={{marginTop:'15px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <div style={{position:'relative',}}>
                        <Fab style={{color:'white',backgroundColor:this.state.color}}>
                            {this.state.success ? <CheckIcon/> : <LockOutlinedIcon/>}
                        </Fab>
                        {this.state.loading && <CircularProgress size={68} style={{color:'green',position:'absolute',top:-6,left:-6,zIndex:1,}}/>}
                    </div>

                    <DialogContent>
                        <form noValidate>
                            <TextField disabled={this.state.loading} onChange={(event) => {this.setState({email: event.target.value})}}
                                       required fullWidth autoFocus variant='outlined' margin='normal' autoComplete='email' label={login[this.props.lang]['email']}/>

                            <TextField disabled={this.state.loading} onChange={(event) => {this.setState({pswd: event.target.value})}}
                                       required fullWidth variant='outlined' margin='normal' label={login[this.props.lang]['password']}
                                       type='password' autoComplete='current-password'/>

                            <FormControlLabel control={<Checkbox value='remember' defaultChecked={true} color='primary'/>} label={login[this.props.lang]['remember']}/>

                            <Button disabled={this.state.loading} onClick={this.onLogin} fullWidth type='submit' variant='contained' color='primary'>
                                {login[this.props.lang]['login']}
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link onClick={() => this.onClose('forget')} style={{cursor:'pointer'}} variant='body2'>{login[this.props.lang]['forgot']}</Link>
                                </Grid>
                                <Grid item>
                                    <Link onClick={() => this.onClose('register')} style={{cursor:'pointer'}} variant='body2'>{login[this.props.lang]['signup']}</Link>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                </div>

                <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} onClose={(e) => this.setState({error:false})} autoHideDuration={this.state.duration} open={this.state.error}>
                    <Alert onClose={(e) => this.setState({error:false})} severity='error'>
                        {login[this.props.lang]['error']}: {this.state.message}
                    </Alert>
                </Snackbar>

            </Dialog>
        );
    }
}

