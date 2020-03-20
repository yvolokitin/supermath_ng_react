﻿import React from 'react';
import {Dialog, TextField, FormControlLabel, Checkbox, Link} from '@material-ui/core';
import {Snackbar, CircularProgress} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

// email validator
import { validate } from 'validate.js';
import constraints from './constraints';

import axios from 'axios';

// import image from './../../images/monsters/Avengers-Iron-Man-icon.png';
import image from './../../images/help/sign-up.png';
import SMTitle from './../dialog/title';

import './registration.css';

/*

*/
export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '',
                      lang: props.lang,
                      surname: '',
                      birth: '',
                      email: '',
                      pswd: '',
                      subcsr: false,
                      color: 'orange',
                      loading: false,
                      error: false,
                      message: '',
                      duration: 10000};

        this.onClose = this.onClose.bind(this);

        this.onRegistration = this.onRegistration.bind(this);
        this.onRegistrationError = this.onRegistrationError.bind(this);
        this.onRegistrationResponse = this.onRegistrationResponse.bind(this);

        this.time = new Date().getTime();
    }

    onRegistration(event) {
        event.preventDefault();
        var result = validate({name: this.state.name}, constraints);
        if ('name' in result) {
            this.setState({error: true,
                           duration: 5000,
                           message: result.name});
            return;
        }
        result = validate({birth: this.state.birth}, constraints);
        if ('birth' in result) {
            this.setState({error: true,
                           duration: 5000,
                           message: result.birth});
            return;
        }
        result = validate({email: this.state.email}, constraints);
        if ('email' in result) {
            this.setState({error: true,
                           duration: 5000,
                           message: result.email});
            return;
        }
        result = validate({pswd: this.state.pswd}, constraints);
        if ('pswd' in result) {
            this.setState({error: true,
                           duration: 5000,
                           message: result.pswd});
            return;
        }

        var crypto = require('crypto');
        var mykey = crypto.createCipher('aes-128-cbc', this.state.pswd);
        var pswdhash = mykey.update('abc', 'utf8', 'hex');
        pswdhash += mykey.final('hex');
        console.log('crypto pswdhash: ' + pswdhash);

        this.setState({loading: true, color: '#ffd9b3'});
        var post_data = {'name': this.state.name,
                         'lang': this.state.lang,
                         'age': this.state.birth,
                         'lastname': this.state.surname,
                         'email': this.state.email,
                         'subcsr': this.state.subcsr,
                         'pswd': this.state.pswd,
                         'pswdhash': pswdhash};
        axios.post('http://supermath.xyz:3000/api/reg', post_data)
            .then(this.onRegistrationResponse)
            .catch(this.onRegistrationError);

        this.time = new Date().getTime();
    };

    onRegistrationResponse(response) {
        var timeout = new Date().getTime() - this.time;
        if (timeout < 2000) {
            timeout = 2000;
        }

        if ((response.data.error === undefined) && (response.data.id !== undefined)) {
            // age calculation based on server response value
            // 'age': 'Tue, 28 Jan 2014 06:13:13 GMT' -> need to convert in years
            var birthday = new Date(response.data.age);
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs);
            var age = Math.abs(ageDate.getUTCFullYear() - 1970);

            setTimeout(() => {
                this.props.onClose('successed', response.data.id, response.data.name, response.data.lang, response.data.email,
                                    response.data.surname, age, response.data.ava, response.data.pass, response.data.fail);
                this.setState({loading: false, color: 'orange'});
            }, timeout);

        } else {
            if (response.data.error !== undefined) {
                setTimeout(() => {this.setState({loading: false, color:'red', error: true, message: response.data.error.toString()});}, timeout);
            } else {
                setTimeout(() => {this.setState({loading: false, color:'red', error: true, message: 'Uuupps! Something went wrong'});}, timeout);
            }

            setTimeout(() => {this.setState({color: 'orange'});}, timeout+1000);
        }
    }

    onRegistrationError(error) {
        console.log('onRegistrationError '+ error.toString());
        this.setState({success: false, loading: false, color:'red', error: true, message: error.toString()});
        setTimeout(() => {this.setState({color: 'orange'});}, 1000);
    }

    onClose(status) {
        console.log('registration.onClose ' + status);
        // ignore close request if registration is in progress
        if (!this.state.loading) {
            this.props.onClose(status);
        }
    }

/*
*/
    render() {
        return (
            <Dialog transitionDuration={600} fullWidth={true} maxWidth='md' scroll='body' open={this.props.open}>
                <SMTitle title='' onClick={() => this.onClose()}/>

                <div className='registration_desk' style={{backgroundColor: this.state.color}}>
                    {this.state.loading ? <CircularProgress size={68} className='circular_progress'/> : null}

                    <div className='registration_desk_title'>
                        <img src={image} alt='Registration'/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} onChange={(event) => {this.setState({name: event.target.value})}}
                                   autoFocus required fullWidth variant='outlined' label='Name'/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} onChange={(event) => {this.setState({surname: event.target.value})}}
                                   fullWidth variant='outlined' label='Surname'/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} onChange={(event) => {this.setState({birth: event.target.value})}}
                                   fullWidth variant='outlined' type='date' placeholder='Birthday'/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} onChange={(event) => {this.setState({email: event.target.value})}}
                                   required fullWidth variant='outlined' label="Email"/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} onChange={(event) => {this.setState({pswd: event.target.value})}}
                                   required fullWidth variant='outlined' label="Password"/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <FormControlLabel disabled={this.state.loading} control={<Checkbox value={this.state.subscribtion}
                                          color="primary" />} onChange={(event) => {this.setState({subcsr: event.target.value})}}
                                          label='I want to receive inspiration, promotions and updates via email'/>
                    </div>
                </div>

                <div className='registration_desk_button' onClick={this.onRegistration}>Create account</div>

                <Link style={{marginRight:'5%',float:'right',cursor:'pointer'}} onClick={() => this.onClose('login')} >Already have an account? Sign in</Link>

                <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}}
                          onClose={(e) => this.setState({error:false})}
                          autoHideDuration={this.state.duration}
                          open={this.state.error}>
                            <Alert onClose={(e) => this.setState({error:false})} severity="error"> {this.state.message} </Alert>
                </Snackbar>

            </Dialog>
        );
    }
}
