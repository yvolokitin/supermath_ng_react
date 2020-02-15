import React from 'react';
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
                      surname: '',
                      birth: '',
                      email: '',
                      pswd: '',
                      subscribtion: false,
                      success: false,
                      color: 'orange',
                      loading: false,
                      error: false,
                      message: '',
                      duration: 10000};

        this.onSubscribtion = this.onSubscribtion.bind(this);

        this.onRegistration = this.onRegistration.bind(this);
        this.onRegistrationClose = this.onRegistrationClose.bind(this);
        this.onRegistrationError = this.onRegistrationError.bind(this);
        this.onRegistrationResponse = this.onRegistrationResponse.bind(this);

        this.time = new Date().getTime();
    }

    onSubscribtion(event) {
        this.setState({pswd: event.target.value})
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

        this.setState({success: false, loading: true, color: '#ffd9b3'});
        var post_data = {'user': this.state.name,
                         'age': this.state.birth,
                         'lastname': this.state.surname,
                         'email': this.state.email,
                         'pswd': this.state.password};
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
            this.setState({success: true, color: 'green'});

            // age calculation based on server response value
            // "age":"Tue, 28 Jan 2014 06:13:13 GMT" -> need to convert in years
            var birthday = new Date(response.data.age);
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs);
            var age = Math.abs(ageDate.getUTCFullYear() - 1970);

            setTimeout(() => {
                this.setState({loading: false,});
                this.props.onClose('successed', response.data.id, response.data.name, response.data.surname, age, response.data.ava, response.data.pass, response.data.fail);
            }, timeout);

        } else {
            if (response.data.error !== undefined) {
                setTimeout(() => {this.setState({success: false, loading: false, color:'red', error: true, message: response.data.error.toString()});}, timeout);
            } else {
                setTimeout(() => {this.setState({success: false, loading: false, color:'red', error: true, message: 'Uuupps! Something went wrong'});}, timeout);
            }
        }
    }

    onRegistrationError(error) {
        console.log('onRegistrationError '+ error.toString());
        this.setState({success: false, loading: false, color:'red', error: true, message: error.toString()});
    }

    onRegistrationClose(status) {
        console.log('onRegistrationClose '+ status);
        // ignore close request if registration is in progress
        if (this.state.loading === false) {
            // this.props.onClose(status);
        }
    }

/*
*/
    render() {
        return (
            <Dialog transitionDuration={600} fullWidth={true} maxWidth='md' scroll='body' open={this.props.open}>
                <SMTitle title='' onClick={this.onRegistrationClose}/>

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
                                          color="primary" />} onChange={this.onSubscribtion}
                                          label='I want to receive inspiration, promotions and updates via email'/>
                    </div>

                </div>
                <div className='registration_desk_button' onClick={this.onRegistration}>Create account</div>
                <Link href="" disabled={this.state.loading} style={{marginRight:'5%',float:'right'}} >Already have an account? Sign in</Link>

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
