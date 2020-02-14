import React from 'react';
import {Dialog, TextField, FormControlLabel, Checkbox, Link, Slide} from '@material-ui/core';
import {Snackbar, Fab, CircularProgress} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

// date picker
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

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
                      birth: new Date(),
                      email: '',
                      pswd: '',
                      subscribtion: false,
                      success: false,
                      color: 'orange',
                      loading: false,
                      error: false,
                      message: '',
                      duration: 10000,
                      };

        this.onName = this.onName.bind(this);
        this.onSurname = this.onSurname.bind(this);
        this.onEmail = this.onEmail.bind(this);
        this.onPswd = this.onPswd.bind(this);
        this.onBirth = this.onBirth.bind(this);
        this.onSubscribtion = this.onSubscribtion.bind(this);

        this.onRegistration = this.onRegistration.bind(this);
        this.onRegistrationClose = this.onRegistrationClose.bind(this);
        this.onRegistrationError = this.onRegistrationError.bind(this);
        this.onRegistrationResponse = this.onRegistrationResponse.bind(this);

        this.time = new Date().getTime();
    }

    onName(event) {
        this.setState({name: event.target.value});
    }

    onSurname(event) {
        this.setState({surname: event.target.value});
    };

    onEmail(event) {
        this.setState({email: event.target.value})
    }

    onPswd(event) {
        this.setState({pswd: event.target.value})
    }

    onBirth(event) {
        this.setState({birth: event.target.value})
    }

    onSubscribtion(event) {
        this.setState({pswd: event.target.value})
    }

    onRegistration() {
        var result = validate({name: this.state.name}, constraints);
        if ('name' in result) {
            this.setState({error: true,
                           duration: 5000,
                           message: result.name});
            return;
        }

        result = validate({email: this.state.email}, constraints);
        if ('email' in result) {
            this.setState({error: true,
                           duration: 5000,
                           message: result.email});
            return;
        }

        result = validate({email: this.state.email}, constraints);
        if ('pswd' in result) {
            this.setState({error: true,
                           duration: 5000,
                           message: result.pswd});
            return;
        }

        result = validate({birth: this.state.birth}, constraints);
        if ('birth' in result) {
            this.setState({error: true,
                           duration: 5000,
                           message: result.birth});
            return;
        }

        this.setState({success: false, loading: true, color: '#ffd9b3'});
        var post_data = {'user': this.state.name,
                         'age': this.state.surname,
                         'lastname': this.state.birth,
                         'email': this.state.email,
                         'pswd': this.state.password};
        axios.post('http://supermath.xyz:3000/api/reg', post_data)
            .then(this.onRegistrationResponse)
            .catch(this.onRegistrationError);

        this.time = new Date().getTime();
    };

    onRegistrationResponse(response) {
        var diff = new Date().getTime() - this.time;
        console.log('diff : ' + diff);
        console.log('onRegistrationResponse ' + response.error);



    }

    onRegistrationError(error) {
        console.log('onRegistrationError '+ error);
        this.setState({success: false,
                       loading: false,
                       color:'red',
                       isError: true,
                       error: error.toString()});
    }

    onRegistrationClose(status) {
        console.log('onRegistrationClose '+ status);

        // ignore close request if registration is in progress
        if (this.state.loading === false) {
            // this.props.onClose(status);
        }
    }

    render() {
        return (
            <Dialog onClose={this.onRegistrationClose} transitionDuration={600} fullWidth={true} maxWidth='md' scroll='body' open={this.props.open}>
                <SMTitle title='' onClick={this.onRegistrationClose}/>

                <div className='registration_desk' style={{backgroundColor: this.state.color}}>
                    {this.state.loading ? <CircularProgress size={68} className='circular_progress'/> : null}

                    <div className='registration_desk_title'>
                        <img src={image} alt='Registration'/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} onChange={this.onName} autoFocus required fullWidth variant='outlined' label='Name'/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} onChange={this.onSurname} fullWidth variant='outlined' label='Surname'/>
                    </div>

                    <div className='registration_desk_textfield'>
                        Child Birthday:
                        <TextField disabled={this.state.loading} onChange={this.onBirth} required fullWidth variant='outlined' type='date' defaultValue='dd-MM-yyyy'>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker value={this.state.birth} onChange={this.onBirth}/>
                            </MuiPickersUtilsProvider>
                        </TextField>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} onChange={this.onEmail} required fullWidth variant='outlined' label="Email"/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} onChange={this.onPswd} required fullWidth variant='outlined' label="Password"/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <FormControlLabel disabled={this.state.loading} control={<Checkbox value={this.state.subscribtion}
                                          color="primary" />} onChange={this.onSubscribtion}
                                          label='I want to receive inspiration, promotions and updates via email'/>
                    </div>

                </div>
                <div className='registration_desk_button' onClick={this.onRegistration}>Create account</div>
                <Link href="" disabled={this.state.loading} style={{marginRight:'5%',float:'right'}} onClick={this.onRegistrationClose('login')}>Already have an account? Sign in</Link>

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
