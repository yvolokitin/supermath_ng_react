import React from 'react';
import {Dialog, TextField, FormControlLabel, Checkbox, Link} from '@material-ui/core';
import {Snackbar, CircularProgress} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

// name validator
// import {validate_name} from './../halpers/validator.js';

// email validator
import {validate} from 'validate.js';
import constraints from './constraints';

import {registration} from './../translations/registration';

import axios from 'axios';

// import image from './../../images/monsters/Avengers-Iron-Man-icon.png';
import image from './../../images/help/sign-up.png';
import SMTitle from './../dialog/title';
import ColorLine from './../line/line';

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
                      duration: 15000};

        this.onClose = this.onClose.bind(this);

        this.onRegistration = this.onRegistration.bind(this);
        this.onRegistrationError = this.onRegistrationError.bind(this);
        this.onRegistrationResponse = this.onRegistrationResponse.bind(this);

        this.time = new Date().getTime();
    }

    onRegistration(event) {
        event.preventDefault();
        // var result = validate_name(this.state.name, this.props.lang);
        /*
        if (result !== 'ok') {
            this.setState({error: true,
                           duration: 5000,
                           message: 'QQQQQQQQQ ' + result});
            return;
        }
        */
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
        localStorage.setItem('pswdhash', pswdhash);
        // console.log('onRegistration -> crypto pswdhash: ' + pswdhash);

        this.setState({loading: true, color: '#ffd9b3'});
        var post_data = {'name': this.state.name,
                         'lang': this.state.lang,
                         'birthday': this.state.birth,
                         'lastname': this.state.surname,
                         'email': this.state.email,
                         'subcsr': this.state.subcsr,
                         'pswdhash': pswdhash,
                         'passed': this.props.passed,
                         'failed': this.props.failed};
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
            setTimeout(() => {
                this.props.onClose('successed', response.data);
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
        console.log('registration.onClose ' + status + ', ' + this.state.loading);
        // ignore close request if registration is in progress
        if (!this.state.loading) {
            this.props.onClose(status);
        }
    }

    /*
    */
    render() {
        return (
            <Dialog transitionDuration={600} fullScreen={this.props.fullScreen} fullWidth={true} maxWidth='md' scroll='body' open={this.props.open}>
                <SMTitle title='' onClick={() => this.onClose('close')}/>
                <ColorLine/>

                <div className='registration_desk' style={{backgroundColor: this.state.color}}>
                    {this.state.loading ? <CircularProgress size={68} className='circular_progress'/> : null}

                    <div className='registration_desk_title'>
                        <img src={image} alt='Registration'/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} onChange={(event) => {this.setState({name: event.target.value})}}
                                   autoFocus required fullWidth variant='outlined' label={registration[this.props.lang]['name']}/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} onChange={(event) => {this.setState({surname: event.target.value})}}
                                   fullWidth variant='outlined' label={registration[this.props.lang]['surname']}/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} onChange={(event) => {this.setState({birth: event.target.value})}}
                                   fullWidth variant='outlined' type='date' placeholder='Birthday'/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} onChange={(event) => {this.setState({email: event.target.value})}}
                                   required fullWidth variant='outlined' label={registration[this.props.lang]['email']}/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} onChange={(event) => {this.setState({pswd: event.target.value})}}
                                   required fullWidth variant='outlined' label={registration[this.props.lang]['password']}/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <FormControlLabel disabled={this.state.loading}
                                          control={<Checkbox value={this.state.subscribtion} defaultChecked={true} color='primary'/>}
                                          onChange={(event) => {this.setState({subcsr: event.target.value})}}
                                          label={registration[this.props.lang]['subscribe']}/>
                    </div>
                </div>

                <div className='registration_desk_button' onClick={this.onRegistration}>{registration[this.props.lang]['create']}</div>

                <Link style={{marginRight:'5%',float:'right',cursor:'pointer'}} onClick={() => this.onClose('login')}>
                    {registration[this.props.lang]['registered']}
                </Link>

                <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} onClose={(e) => this.setState({error:false})} autoHideDuration={this.state.duration} open={this.state.error}>
                    <Alert onClose={(e) => this.setState({error:false})} severity='error'>
                        {registration[this.props.lang]['error']}: {this.state.message}
                    </Alert>
                </Snackbar>

            </Dialog>
        );
    }
}
