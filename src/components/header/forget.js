import React from 'react';
import {Dialog, DialogContent, Typography, TextField, Grid, Link, Button, Fab, CircularProgress, Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CheckIcon from '@material-ui/icons/Check';

// email validator
import {validate} from 'validate.js';
import constraints from './constraints';

import SMTitle from './../dialog/title';
import ColorLine from "./../line/line";

import {forget} from './../translations/forget';

import axios from 'axios';

//import './header.css';
export default class Forget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '',
                      success: false,
                      loading: false,
                      color: 'red',
                      error: false,
                      message: '',
                      duration: 15000,};

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

        } else {
            var forgettime = parseInt(localStorage.getItem('forgettime'));
            if (((new Date().getTime()) - forgettime) < 15000) {
                this.setState({success: false,
                               error: true,
                               duration: 15000,
                               message: forget[this.props.lang]['later']});
                localStorage.setItem('forgettime', new Date().getTime());
    
            } else {
                console.log('onForget.email ' + this.state.email);

                localStorage.setItem('forgettime', new Date().getTime());

                this.setState({success: false, loading: true});
                var post_data = {'email': this.state.email};
                axios.post('http://supermath.xyz:3000/api/forget', post_data)
                    .then(this.onForgetResponse)
                    .catch(this.onForgetError);
                this.time = new Date().getTime();
            }
        }
    }

    onForgetResponse(response) {
        console.log('onForgetResponse:: email ' + response.data.email + ', error ' + response.data.error);

        var timeout = new Date().getTime() - this.time;
        if (timeout < 3000) {
            timeout = 3000 - timeout;
        }

        if ('data' in response) {
            if ('email' in response.data) {
                console.log('ERROR Header.onApiUpdate received ' + response.data.error);
                setTimeout(() => {
                    this.setState({success: true, loading: false});
                }, timeout);

            } else if ('error' in response.data) {
                setTimeout(() => {
                    this.setState({success: false, loading: false, color:'red', error: true, message: response.data.error});
                }, timeout);

            } else {
                console.log('ERROR: Header.onApiUpdate no error and id in data message from server');
            }
        } else {
            console.log('ERROR: Header.onApiUpdate received no data in response from server');
        }
    }

    onForgetError(error) {
        console.log("axios.post error " + error);

        var timeout = new Date().getTime() - this.time;
        if (timeout < 3000) {
            timeout = 3000 - timeout;
        }

        setTimeout(() => {
            this.setState({success: false, loading: false, color:'red', error: true, message: error.toString()});
        }, timeout);
    }

    onClose(status) {
        // console.log("login.onClose " + status);
        // ignore close request if login is in progress
        if (!this.state.loading) {
            this.props.onClose(status);
        }
    }

    /*
    */
    render() {
        return (
            <Dialog open={this.props.open} fullWidth={true} fullScreen={this.props.fullScreen} transitionDuration={600}>
                <SMTitle title='' onClick={() => this.onClose('close')}/>
                <ColorLine/>

                <div style={{marginTop:'15px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <div style={{position:'relative',}}>
                        <Fab style={{color:'white',backgroundColor:this.state.color}}>
                            {this.state.success ? <CheckIcon/> : <LockOutlinedIcon/>}
                        </Fab>
                        {this.state.loading && <CircularProgress size={68} style={{color:'green',position:'absolute',top:-6,left:-6,zIndex:1,}}/>}
                    </div>

                    <DialogContent>
                        <Typography style={{marginTop:'3%',marginBottom:'3%',flexGrow:1}}>
                            {forget[this.props.lang]['description']}
                        </Typography>

                        <form noValidate>
                            <TextField disabled={this.state.loading} onChange={(event) => {this.setState({email: event.target.value})}}
                                       required fullWidth autoFocus variant='outlined' margin='normal' autoComplete='email' label={forget[this.props.lang]['email']}/>

                            <Button disabled={this.state.loading} onClick={this.onForget} fullWidth type='submit' variant='contained' color='primary'>
                                {forget[this.props.lang]['send']}
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link disabled={this.state.loading} onClick={() => this.onClose('login')} style={{cursor:'pointer'}} variant='body2'>
                                        {forget[this.props.lang]['login']}
                                    </Link>
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

