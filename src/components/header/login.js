import React, { useEffect, useState } from 'react';
import {Fab, CircularProgress, Snackbar} from '@material-ui/core';
import {Slide, Dialog, TextField, Link, Button,} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CheckIcon from '@material-ui/icons/Check';

import SMTitle from './../dialog/title';
import ColorLine from "./../line/line";

import {login} from './../translations/login';
import {get_avatar_by_name} from './../halpers/avatars';
import {get_local_users, get_item} from './../halpers/localstorage';
import {validate_email, validate_pswd} from './../halpers/validator.js';

import axios from 'axios';
import './login.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

export default function Login(props) {
    // login credentials: email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [color, setColor] = useState('red');

    const [users, setUsers] = useState([]);
    const [time, setLastTime] = useState('');

    useEffect(() => {
        console.log('Login.useEffect -> error ' + error);
        if (props.open) {
            var local_users = [], locals = get_local_users();
            for (var local in locals) {
                if (get_item(local, 'name') !== '') {
                    var data = {
                        'id': local,
                        'name': get_item(local, 'name'),
                        'email': get_item(local, 'email'),
                        'surname': get_item(local, 'surname'),
                        'avatar': get_item(local, 'avatar'),
                    };
                    local_users.push(data);
                }
            }

            if (local_users.length > 0) {
                setUsers(local_users);
            }

            setLastTime(new Date().getTime());
        }

    }, [props.open, ]);


    function onLogin() {
        console.log('Login.onLogin -> email ' + email + ', password ' + password);

        if (validate_email(email, props.lang) === 'ok') {
            if (validate_pswd(password, props.lang) === 'ok') {
                var crypto = require('crypto');
                var mykey = crypto.createCipher('aes-128-cbc', password);
                var pswdhash = mykey.update('abc', 'utf8', 'hex');
                pswdhash += mykey.final('hex');
                localStorage.setItem('pswdhash', pswdhash);

                setLoading(true);
                // console.log('onLogin -> crypto pswdhash: ' + pswdhash);
                var post_data = {'email': this.state.email, 'pswdhash': pswdhash};
                axios.post('http://supermath.xyz:3000/api/login', post_data)
                    .then(this.onLoginResponse)
                    .catch(this.onLoginError);
                setLastTime(new Date().getTime());

            } else {
                setError(validate_pswd(password, props.lang));
            }
        } else {
            setError(validate_email(email, props.lang));
        }
    }

    /**
     * Login server response
     */
    function onLoginResponse(response) {
        console.log('onLoginResponse:: error ' + response.data.error + ', id ' + response.data.id);

        var timeout = new Date().getTime() - time;
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
                    props.onClose('successed', response.data);
                    setSuccess(true); setLoading(false); setColor('green');
                }, timeout);

            } else if ('error' in response.data) {
                setTimeout(() => {
                    setSuccess(false); setLoading(false);
                    setColor('red'); setError(response.data.error);
                }, timeout);
            } else {
                setTimeout(() => {
                    setSuccess(false); setLoading(false);
                    setColor('red'); setError(login[props.lang]['error_no_error']);
                }, timeout);
            }
        } else {
            setTimeout(() => {
                setSuccess(false); setLoading(false);
                setColor('red'); setError(login[props.lang]['error_no_data']);
            }, timeout);
        } 
    }

    function onLoginError(error) {
        console.log('axios.post error ' + error);
        this.setState({success: false, loading: false, color:'red', error: true, message: error.toString()});
    }

    function onClose(status) {
        console.log('login.onClose ' + this.state.loading + ', ' + status);
        // ignore close request if login is in progress
        if (!this.state.loading) {
            props.onClose(status);
        }
    }

    return (
        <Dialog open={props.open} fullWidth={true} fullScreen={props.fullScreen}
            TransitionComponent={Transition} transitionDuration={600}>

            <SMTitle title='' onClick={() => props.onClose()}/>
            <ColorLine/>

            <div className='login_wrapper'>
                <div className='login_forms'>
                    <Fab style={{color:'white', backgroundColor: color}}>
                        {(success) ? (
                            <CheckIcon/>
                        ) : (
                            <LockOutlinedIcon/>
                        )}
                    </Fab>

                    {(loading) ? (
                        <CircularProgress size={68} style={{color:'green',position:'absolute',top:-6,left:-6,zIndex:1,}}/>
                    ) : (<> </>)}
                </div>

                <div className='login_forms'>
                    <TextField disabled={loading} onChange={(event) => setEmail(event.target.value)}
                        required fullWidth autoFocus variant='outlined' margin='normal' autoComplete='email' label={login[props.lang]['email']}/>
                </div>

                <div className='login_forms'>
                    <TextField disabled={loading} onChange={(event) => setPassword(event.target.value)} autoComplete='current-password'
                        required fullWidth variant='outlined' margin='normal' type='password' label={login[props.lang]['password']}/>
                </div>

                <div className='login_forms'>
                    <Button disabled={loading} onClick={() => onLogin()} fullWidth type='submit' variant='contained' color='primary'>
                        {login[props.lang]['login']}
                    </Button>
                </div>

                <Link onClick={() => this.onClose('forget')} style={{cursor:'pointer'}} variant='body2'>{login[props.lang]['forgot']}</Link>
                <Link onClick={() => this.onClose('register')} style={{cursor:'pointer'}} variant='body2'>{login[props.lang]['signup']}</Link>
            </div>

            <ColorLine/>

            <div className='login_wrapper'>
                {users.map((user) =>
                    <div key={user.id} className='login_account'>
                        <div className='login_account_avatar'>
                            <img src={get_avatar_by_name(user.avatar)} alt={user.avatar} onContextMenu={(e) => e.preventDefault()}/>
                        </div>
                        <div className='login_account_name'>
                            <div className='login_account_name_signout'>
                                sign out
                            </div>
                            <div className='login_account_name_surname'>
                                {user.name} {user.surname}
                            </div>
                            <div className='login_account_name_email'>
                                {user.email}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <ColorLine/>

            <Snackbar open={(error.length === 0)} onClose={() => setError('')} autoHideDuration={15000} anchorOrigin={{vertical:'top', horizontal:'center'}}>
                <Alert onClose={() => setError('')} severity='error'>
                    {login[props.lang]['error']}: {error}
                </Alert>
            </Snackbar>

        </Dialog>
    );
}
