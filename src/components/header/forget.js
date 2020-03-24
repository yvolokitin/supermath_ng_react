﻿import React from 'react';
import {Dialog, DialogContent, TextField, Grid, Link, Button, Fab, CircularProgress, Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CheckIcon from '@material-ui/icons/Check';

// email validator
import {validate} from 'validate.js';
import constraints from './constraints';

import SMTitle from './../dialog/title';

import {forget} from './../halpers/forget';

import axios from 'axios';

import './header.css';

export default class Forget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
                      success: false,
                      loading: false,
                      color: 'red',
                      error: false,
                      message: '',
                      duration: 15000};

        this.onClose = this.onClose.bind(this);

        this.onForget = this.onForget.bind(this);
        this.onForgetError = this.onForgetError.bind(this);
        this.onForgetResponse = this.onForgetResponse.bind(this);

        this.time = new Date().getTime();
    }

    onForget(event) {
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
        console.log('onForget -> crypto pswdhash: ' + pswdhash);

        // console.log('onForget.email ' + this.state.email + ', pswd ' + this.state.pswd);
        var post_data = {'email': this.state.email, 'pswd': this.state.pswd};
        axios.post('http://supermath.xyz:3000/api/login', post_data)
            .then(this.onForgetResponse)
            .catch(this.onForgetError);

        this.time = new Date().getTime();
    }

    onForgetResponse(response) {
        console.log('onForgetResponse:: error ' + response.data.error + ', id ' + response.data.id);

        var timeout = new Date().getTime() - this.time;
        if (timeout < 2000) {
            timeout = 2000;
        }

        if ((response.data.error === undefined) && (response.data.id !== undefined)) {
            // age calculation based on server response value
            // "age":"Tue, 28 Jan 2014 06:13:13 GMT" -> need to convert in years
            var birthday = new Date(response.data.age);
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs);
            var age = Math.abs(ageDate.getUTCFullYear() - 1970);

            setTimeout(() => {
                this.props.onClose('successed', response.data.id, response.data.name, response.data.lang, response.data.email,
                                   response.data.surname, age, response.data.ava, response.data.pass, response.data.fail);
                this.setState({success: true, loading: false, color:'green'});
            }, timeout);

        } else {
            if (response.data.error !== undefined) {
                setTimeout(() => {this.setState({success: false, loading: false, color:'red', error: true, message: response.data.error.toString()});}, timeout);
            } else {
                setTimeout(() => {this.setState({success: false, loading: false, color:'red', error: true, message: 'Uuupps! Something went wrong'});}, timeout);
            }
        }
    }

    onForgetError(error) {
        console.log("axios.post error " + error);
        this.setState({success: false, loading: false, color:'red', error: true, message: error.toString()});
    }

    onClose(status) {
        // console.log("login.onClose " + status);
        // ignore close request if login is in progress
        if (!this.state.loading) {
            this.props.onClose(status);
        }
    }

    /*
                                <Grid item>
                                    <Link onClick={() => this.onClose('register')} style={{cursor:'pointer'}} variant='body2'>{forget[this.props.lang]['signup']}</Link>
                                </Grid>
    */
    render() {
        return (
            <Dialog fullWidth={true} open={this.props.open}>
                <SMTitle title='' onClick={() => this.onClose()}/>

                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <div style={{position:'relative',}}>
                        <Fab style={{color:'white',backgroundColor:this.state.color}}>
                            {this.state.success ? <CheckIcon/> : <LockOutlinedIcon/>}
                        </Fab>
                        {this.state.loading && <CircularProgress size={68} style={{color:'green',position:'absolute',top:-6,left:-6,zIndex:1,}}/>}
                    </div>

                    <DialogContent>
                        <form noValidate>
                            <TextField disabled={this.state.loading} onChange={(event) => {this.setState({email: event.target.value})}}
                                       required fullWidth autoFocus variant='outlined' margin='normal' autoComplete='email' label={forget[this.props.lang]['email']}/>

                            <Button disabled={this.state.loading} onClick={this.onForget} fullWidth type='submit' variant='contained' color='primary'>
                                {forget[this.props.lang]['send']}
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link onClick={() => this.onClose('login')} style={{cursor:'pointer'}} variant='body2'>{forget[this.props.lang]['login']}</Link>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                </div>

                <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} onClose={(e) => this.setState({error:false})} autoHideDuration={this.state.duration} open={this.state.error}>
                    <Alert onClose={(e) => this.setState({error:false})} severity='error'>
                        {forget[this.props.lang]['error']}: {this.state.message}
                    </Alert>
                </Snackbar>

            </Dialog>
        );
    }
}

