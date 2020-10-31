import React, { useEffect, useCallback, useState } from 'react';
import {Snackbar, Slide, Dialog, TextField, Link, Button,} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import Title from './../title/title';
import ColorLine from './../line/line';

import {login} from './../translations/login';

import image from './../../images/login.png';

import {get_avatar_by_name} from './../halpers/avatars';
import {set_item, generate_pswdhash} from './../halpers/localstorage';
import {validate_email, validate_pswd} from './../halpers/validator.js';
import {get_local_users, remove_local_user} from './../halpers/localstorage';

import icon1 from './../../images/signin/g-logo.png';
import icon2 from './../../images/signin/f-logo.png';
import icon3 from './../../images/signin/t-logo.png';
import icon4 from './../../images/signin/VK_Compact_Logo.svg';

import axios from 'axios';
import './login.css';

// import GoogleLogin from 'react-google-login';
// import {GOOGLE_CLIENTID} from './../halpers/authentication';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

const DEFAULT_HIDDEN_PSWD = '*******';

export default function Login(props) {
    const networks = [
        {id: 'Google', icon: icon1},
        {id: 'Facebook', icon: icon2},
        {id: 'Twitter', icon: icon3},
        {id: 'VK', icon: icon4}];

    // login credentials: email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (props.open) {
            setUsers(get_local_users(0));
        }

    }, [props.open, ]);

    const onClose = useCallback((status, data) => {
        // console.log('Login.onClose loading ' + loading + ', status ' + status);
        if (loading === false) {
            props.onClose(status, data);
        }

    }, [loading, props, ])

    const onLoginResponse = useCallback((response) => {
        console.log('onLoginResponse:: error ' + response.data.error + ', id ' + response.data.id);

        var timeout = 1800;

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
                    if ((password.length > 0) && (password !== DEFAULT_HIDDEN_PSWD)) {
                        var pswdhash = generate_pswdhash(password);
                        set_item(response.data.id, 'pswdhash', pswdhash);
                    }

                    setLoading(false); onClose('successed', response.data);
                }, timeout);

            } else if ('error' in response.data) {
                setTimeout(() => {
                    var message = response.data.error;
                    if ('no user found') {
                        message = login[props.lang]['error_no_user'];
                    }
                    setLoading(false); setError(message);
                }, timeout);
            } else {
                setTimeout(() => {
                    setLoading(false); setError(login[props.lang]['error_no_error']);
                }, timeout);
            }
        } else {
            setTimeout(() => {
                setLoading(false); setError(login[props.lang]['error_no_data']);
            }, timeout);
        } 

    }, [props.lang, password, onClose, ])

    const onLoginError = useCallback((error) => {
        console.log('Login.onLoginError -> axios.post error ' + error);
        setLoading(false); setError(error.toString());

    }, [ ])

    const onLogin = useCallback((login_type) => {
        console.log('Login.onLogin -> ' + login_type);
        switch (login_type) {
            case 'Google':
                setLoading(true);
                setTimeout(() => {
                    setError(login[props.lang]['error_google']);
                    setLoading(false);
                }, 1700);
                break;

            case 'Facebook':
                setLoading(true);
                setTimeout(() => {
                    setError(login[props.lang]['error_facebook']);
                    setLoading(false);
                }, 1700);
                break;

            case 'Twitter':
                setLoading(true);
                setTimeout(() => {
                    setError(login[props.lang]['error_twitter']);
                    setLoading(false);
                }, 1700);
                break;

            case 'VK':
                setLoading(true);
                setTimeout(() => {
                    setError(login[props.lang]['error_vk']);
                    setLoading(false);
                }, 1700);
                break;

            default:
                console.log('Login.onLogin -> email ' + email + ', password ' + password);
                if (validate_email(email, props.lang) === 'ok') {
                    if (validate_pswd(password, props.lang) === 'ok') {
                        setLoading(true); var pswdhash = generate_pswdhash(password);
                        // console.log('onLogin -> crypto pswdhash: ' + pswdhash);
                        var post_data = {'email': email, 'pswdhash': pswdhash};
                        axios.post('https://supermath.xyz:3000/api/login', post_data)
                            .then(onLoginResponse)
                            .catch(onLoginError);
                    } else {
                        setError(validate_pswd(password, props.lang));
                    }
                } else {
                    setError(validate_email(email, props.lang));
                }
                break;
        }

    }, [props.lang, email, password, onLoginResponse, onLoginError, ])

    const onHashLogin = useCallback((user_email, user_pswd) => {
        console.log('Login.onHashLogin -> ' + user_email + ', ' + user_pswd);

        // set email of user from localstorage and 7* password
        setEmail(user_email); setPassword(DEFAULT_HIDDEN_PSWD);

        // process with login request from localstorage data
        setLoading(true); var post_data = {'email': user_email, 'pswdhash': user_pswd};
        axios.post('https://supermath.xyz:3000/api/login', post_data)
            .then(onLoginResponse)
            .catch(onLoginError);

    }, [onLoginResponse, onLoginError, ])

    const onDelete = useCallback((user_id) => {
        console.log('Login.onDelete ' + user_id);
        remove_local_user(user_id);
        setUsers(get_local_users(0));

    }, [ ])

    /*
    const onGoogleSuccess = (res) => {
        console.log('Login.onGoogleSuccess -> ' + res.profileObj);
        // refreshTokenSetup(res);
    };

    const onGoogleFailure = (res) => {
        console.log('Login.onGoogleFailure -> ' + res);
    };

                        <GoogleLogin clientId={GOOGLE_CLIENTID} buttonText='Sign in with Google' cookiePolicy={'single_host_origin'}
                            onSuccess={onGoogleSuccess} onFailure={onGoogleFailure} isSignedIn={true}/>
    */

    /*
                    <div style={{width: '98%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                        <img src={image_numbers} alt='progress'/>
                    </div>
    */
    function ProgressDialog(props) {
        return (
            <Dialog open={props.open} maxWidth='md' scroll='body'
                style={{backgroundColor: 'transparent'}}
                fullScreen={props.fullScreen} fullWidth={true}>

            </Dialog>
        );
    }

    return (
        <Dialog open={props.open} maxWidth='md' scroll='body'
            fullScreen={props.fullScreen} fullWidth={true}
            TransitionComponent={Transition} transitionDuration={900}>

            <Title title={props.title} src={image} onClose={() => props.onClose('close')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <div className='login_wrapper'>
                <div className='login_wrapper_left'>
                    <div className='login_forms'>
                        <TextField disabled={loading} onChange={(event) => setEmail(event.target.value)}
                            required fullWidth autoFocus variant='outlined' margin='normal' autoComplete='email' label={login[props.lang]['email']}/>
                    </div>
                    <div className='login_forms'>
                        <TextField disabled={loading} onChange={(event) => setPassword(event.target.value)} autoComplete='current-password'
                            required fullWidth variant='outlined' margin='normal' type='password' label={login[props.lang]['password']}/>
                    </div>
                    <div className='login_forms' style={{marginTop: '10px'}}>
                        <Button disabled={loading} onClick={() => onLogin('email')} fullWidth type='submit' variant='contained' color='primary'>
                            {login[props.lang]['login']}
                        </Button>
                    </div>
                    <div className='login_forms_links'>
                        <Link onClick={() => onClose('forget')} variant='body2'>{login[props.lang]['forgot']}</Link>
                        <Link onClick={() => onClose('register')} variant='body2'>{login[props.lang]['signup']}</Link>
                    </div>
                </div>

                <div className='login_wrapper_right'>
                    {networks.map((net) =>
                        <div key={net.id} className='login_wrapper_signin'>
                            <div className='login_wrapper_signin_net' onClick={() => onLogin(net.id)}>
                                <div className='login_wrapper_signin_net_icon'>
                                    <img src={net.icon} alt='login' onContextMenu={(e) => e.preventDefault()}/>
                                </div>
                                <font className='login_wrapper_signin_net_font'>
                                    {login[props.lang]['signin']} {net.id}
                                </font>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='login_wrapper' style={{justifyContent: 'center'}}>
                <div className='login_wrapper_center'>
                    {login[props.lang]['click']}
                    <a href='https://supermath.xyz:3000/static/policy/privacy_policy_ru.pdf' target='_blank' rel='noopener noreferrer'> {login[props.lang]['terms']} </a>
                    {login[props.lang]['acknowledge']} 
                    <a href='https://supermath.xyz:3000/static/policy/privacy_policy_ru.pdf' target='_blank' rel='noopener noreferrer'> {login[props.lang]['policy']} </a>
                    {login[props.lang]['applies']}
                </div>
            </div>

            <ColorLine margin={'10px'}/>
            {users.length > 0 &&
                <div className='login_wrapper' style={{flexDirection: 'column', marginTop: '5px'}}>
                    {users.map((user) =>
                        <div key={user.id} className='login_account'>
                            <div className='login_account_avatar' onClick={() => onHashLogin(user.email, user.pswdhash)}>
                                <img src={get_avatar_by_name(user.avatar)} alt={user.avatar} onContextMenu={(e) => e.preventDefault()}/>
                            </div>
                            <div className='login_account_name'>
                                <div className='login_account_name_signout' onClick={() => onDelete(user.id)}>
                                    <font>{login[props.lang]['delete']}</font>
                                </div>
                                <div className='login_account_name_surname' onClick={() => onHashLogin(user.email, user.pswdhash)}>
                                    {user.name} {user.surname}
                                </div>
                                <div className='login_account_name_email' onClick={() => onHashLogin(user.email, user.pswdhash)}>
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }

            <Snackbar open={error.length !== 0} onClose={() => setError('')} anchorOrigin={{vertical:'top', horizontal:'center'}}>
                <Alert onClose={() => setError('')} severity='error'>
                    {login[props.lang]['error']}: {error}
                </Alert>
            </Snackbar>

            <ProgressDialog open={loading}/>
        </Dialog>
    );
}
