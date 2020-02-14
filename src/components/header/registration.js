import React from 'react';
import {Dialog, TextField, FormControlLabel, Checkbox, Link} from '@material-ui/core';
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
                      password: '',
                      subscribtion: false,
                      success: false,
                      color: 'orange',
                      loading: false,
                      loginFailed: false,
                      loginError: '',
                      };

        this.onChange = this.onChange.bind(this);

        this.onRegistration = this.onRegistration.bind(this);
        this.onRegistrationClose = this.onRegistrationClose.bind(this);
        this.onRegistrationError = this.onRegistrationError.bind(this);
        this.onRegistrationResponse = this.onRegistrationResponse.bind(this);

        this.time = new Date().getTime();
    }

    onChange(event) {
        // console.log("onChange:: event " + event.target.value);
        // console.log('onChange ' + ': ' + event.target.value);
        // this.setState({property: event.target.value});
    };

    onRegistration() {
        var result = validate({username: this.state.name}, constraints);
        // validationResult is undefined if there are no errors
        console.log('onRegistration.result "' + result + '"');

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
                       loginFailed: true,
                       loginError: error.toString()});
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
                        <TextField disabled={this.state.loading} autoFocus required fullWidth variant='outlined' label='Name' onChange={this.onChange}/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} fullWidth variant='outlined' label='Surname' onChange={this.onChange('surname')}/>
                    </div>

                    <div className='registration_desk_textfield'>
                        Child Birthday:
                        <TextField disabled={this.state.loading} required fullWidth variant='outlined' type='date' defaultValue='dd-MM-yyyy' onChange={this.onChange}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker value={this.state.birth} onChange={this.onChange('birth')}/>
                            </MuiPickersUtilsProvider>
                        </TextField>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} required fullWidth variant='outlined' label="Email Address" onChange={this.onChange}/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <TextField disabled={this.state.loading} required fullWidth variant='outlined' label="Password" onChange={this.onChange('password')}/>
                    </div>

                    <div className='registration_desk_textfield'>
                        <FormControlLabel disabled={this.state.loading} control={<Checkbox value={this.state.subscribtion}
                                          color="primary" />} onChange={this.onChange('subscribtion')}
                                          label='I want to receive inspiration, promotions and updates via email'/>
                    </div>

                </div>
                <div className='registration_desk_button' onClick={this.onRegistration}>Create account</div>
                <Link href="" disabled={this.state.loading} style={{marginRight:'5%',float:'right'}} onClick={this.onRegistrationClose('login')}>Already have an account? Sign in</Link>

                <Snackbar onClose={(e) => this.setState({loginFailed:false})} autoHideDuration={10000} open={this.state.loginFailed}>
                    <Alert onClose={(e) => this.setState({loginFailed:false})} severity="error"> {this.state.loginError} </Alert>
                </Snackbar>

            </Dialog>
        );
    }
}
