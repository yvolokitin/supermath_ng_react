import React, { useCallback, useState } from 'react';
import {Dialog, Slide, TextField, FormControlLabel, Checkbox, Link} from '@material-ui/core';
import {Snackbar, CircularProgress} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

// name validator
// import {validate_name} from './../halpers/validator.js';

// email validator
import {validate} from 'validate.js';
import constraints from './constraints';

import {registration} from './../translations/registration';
import {set_item, generate_pswdhash} from './../halpers/localstorage';

import axios from 'axios';

import Title from './../title/title';
import ColorLine from './../line/line';

import image_register from './../../images/register.png';
import image from './../../images/help/sign-up.png';

import './registration.css';

// timeout for error message
const TIMEOUT_DURATION = 15000;
const TIMEOUT_DEFAULT = 900;

// light orange color for background
const DEFAULT_COLOR = '#ffb366';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

export default function Registration(props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birth, setBirth] = useState('');
    const [email, setEmail] = useState('');
    const [pswd, setPswd] = useState('');
    const [bonus, setBonus] = useState('0000000');
    const [subcsr, setSubcsr] = useState(false);

    const [color, setColor] = useState(DEFAULT_COLOR);

    // fetch API and error handling
    // const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onClose = useCallback((status, data) => {
        console.log('Registration.onClose ' + status + ', loading ' + loading);
        if (loading === false) {
            props.onClose(status, data);
        }

    }, [loading, props, ])

    const onRegistrationResponse = useCallback((response) => {
        console.log('Registration.onRegistrationResponse');

        if ('data' in response) {
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
                    set_item(response.data.id, 'pswdhash', generate_pswdhash(pswd));
                    props.onClose('successed', response.data);
                    setLoading(false); setColor(DEFAULT_COLOR);
                }, TIMEOUT_DEFAULT);

            } else if ('error' in response.data) {
                setTimeout(() => {
                    setError(response.data.error.toString());
                    setLoading(false); setColor('red');
                }, TIMEOUT_DEFAULT);

            } else {
                setTimeout(() => {
                    setError('Uuupps! Something went wrong');
                    setLoading(false); setColor('red');
                }, TIMEOUT_DEFAULT);
            }
        } else {
            setTimeout(() => {
                setError('Uuupps! Something went wrong');
                setLoading(false); setColor('red');
            }, TIMEOUT_DEFAULT);
        }

    }, [props, pswd, ])

    const onRegistrationError = useCallback((error) => {
        console.log('Registration.onRegistrationError '+ error.toString());
        setError('Error: ' + error.toString());
        setLoading(false); setColor('red');
    }, [ ])

    const onRegistration = useCallback((event) => {
        if (loading) {
            return;
        }

        console.log('Registration.onRegistration -> ' + props.lang);
        var result = validate({'name': name}, constraints);
        if ('name' in result) {
            console.log('Registration.onRegistration -> ' + result.name);
            setError(result.name);
            return;
        }

        result = validate({'birth': birth}, constraints);
        if ('birth' in result) {
            setError(result.birth);
            return;
        }

        result = validate({'email': email}, constraints);
        if ('email' in result) {
            setError(result.email);
            return;
        }

        result = validate({'pswd': pswd}, constraints);
        if ('pswd' in result) {
            setError(result.pswd);
            return;
        }

        setLoading(true); setColor('#ffd9b3');
        var post_data = {
            'name': name,
            'lang': props.lang,
            'birthday': birth,
            'lastname': surname,
            'email': email,
            'subcsr': subcsr,
            'passed': props.passed,
            'failed': props.failed,
            'bonus': bonus,
            'pswdhash': generate_pswdhash(pswd),
        };
        axios.post('https://supermath.xyz:3000/api/reg', post_data)
             .then(onRegistrationResponse)
             .catch(onRegistrationError);

    }, [props.lang, props.passed, props.failed, onRegistrationResponse, onRegistrationError, 
        loading, name, surname, birth, email, pswd, subcsr, bonus, ])

    return (
        <Dialog open={props.open} fullScreen={props.fullScreen} fullWidth={true} maxWidth='md' scroll='body'
            TransitionComponent={Transition} transitionDuration={900}>

            <Title title={props.title} src={image_register} onClose={() => onClose('close')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <div className='registration_desk' style={{backgroundColor: color}}>
                {loading ? <CircularProgress size={68} className='circular_progress'/> : null}

                <div className='registration_desk_title'>
                    <img src={image} alt='Registration'/>
                </div>

                <div className='registration_desk_textfield'>
                    <TextField disabled={loading} onChange={(event) => setName(event.target.value)}
                        autoFocus required fullWidth variant='outlined' label={registration[props.lang]['name']}/>
                </div>

                <div className='registration_desk_textfield'>
                    <TextField disabled={loading} onChange={(event) => setSurname(event.target.value)}
                        fullWidth variant='outlined' label={registration[props.lang]['surname']}/>
                </div>

                <div className='registration_desk_textfield'>
                    <TextField disabled={loading} onChange={(event) => setBirth(event.target.value)}
                        fullWidth variant='outlined' type='date' placeholder='Birthday'/>
                </div>

                <div className='registration_desk_textfield'>
                    <TextField disabled={loading} onChange={(event) => setEmail(event.target.value)}
                        required fullWidth variant='outlined' label={registration[props.lang]['email']}/>
                </div>

                <div className='registration_desk_textfield'>
                    <TextField disabled={loading} onChange={(event) => setPswd(event.target.value)}
                        required fullWidth variant='outlined' label={registration[props.lang]['password']}/>
                </div>

                <div className='registration_desk_textfield'>
                    <TextField disabled={loading} onChange={(event) => setBonus(event.target.value)}
                        fullWidth variant='outlined' label={registration[props.lang]['bonus']}/>
                </div>

                <div className='registration_desk_textfield' style={{marginBottom: '0'}}>
                    <FormControlLabel disabled={loading} control={<Checkbox value={subcsr} defaultChecked={true} color='primary'/>}
                        onChange={(event) => setSubcsr(event.target.value)} label={registration[props.lang]['subscribe']}/>
                </div>
            </div>
            <ColorLine margin={'0px'}/>

            <div className='registration_desk_button' onClick={() => onRegistration()}> {registration[props.lang]['create']} </div>

            <Link style={{marginRight:'5%',float:'right',cursor:'pointer'}} onClick={() => onClose('login')}>
                {registration[props.lang]['registered']}
            </Link>

            <Snackbar open={error.length !== 0} onClose={() => {setError('');setColor(DEFAULT_COLOR);}}
                autoHideDuration={TIMEOUT_DURATION} anchorOrigin={{vertical:'top', horizontal:'center'}}>
                    <Alert onClose={() => {setError('');setColor(DEFAULT_COLOR);}} severity='error'>
                        {registration[props.lang]['error']}: {error}
                    </Alert>
            </Snackbar>

        </Dialog>
    );
}
