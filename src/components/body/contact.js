import React, { useState, useEffect } from 'react';
import {Dialog, TextField, Button} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';

// email validator
import {validate} from 'validate.js';
import constraints from './../header/constraints';

import {send_email} from './../halpers/communicator';

import image from './../../images/contact/mail_icon.png';
import twitter from './../../images/contact/twitter.webp';
import youtube from './../../images/contact/youtube.webp';
import facebook from './../../images/contact/facebook.png';
import vkontakte from './../../images/contact/vkontakte.webp';
import instagram from './../../images/contact/instagram.png';

import {contact} from './../translations/contact';
import ColorLine from './../line/line';
import SMTitle from './../dialog/title';
import './contact.css';

export default function Contact(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        setName(localStorage.getItem('name') ? localStorage.getItem('name') : '');
        setEmail(localStorage.getItem('email') ? localStorage.getItem('email') : '');
        setMessage('');

    }, [props.task, props.color, props.lang]);

    function sendMessage(event) {
        console.log('name ' + name + ', email ' + email + ', message ' + message);
        event.preventDefault();

        if (name.length < 2) {
            alert('Name is too short');
        } else {
            var result = validate({'email': email}, constraints);
            if ('email' in result) {
                alert('Email is incorrect ' + result.email);
            } else {
                if (message.length < 2) {
                    alert('Message is too short');
                } else {
                    send_email({'name': name, 'email': email, 'lang': props.lang, 'message': message});
                    props.onClose();
                    if (localStorage.getItem('name') !== null) {
                        setMessage('');
                    } else {
                        setName(''); setEmail(''); setMessage('');
                    }
                }
            }
        }
    }

    return (
        <Dialog open={props.open} onClose={() => props.onClose()} transitionDuration={700} fullScreen={props.fullScreen} fullWidth={true} maxWidth='md' scroll='body'>
            <SMTitle title='' onClick={() => props.onClose()}/>
            <ColorLine/>

            <div className='contact_email_wrapper'>
                <div className='contact_email_image'>
                    <div className='contact_email_image_img'>
                        <img src={image} alt={image} onContextMenu={(e) => e.preventDefault()}/>
                    </div>
                    <div className='contact_email_image_alt_text'>
                        {contact[props.lang]['alt_text']}
                    </div>
                    <div className='contact_email_image_alt_text'>
                        <a href="mailto:supermath.xyz@gmail.com">supermath.xyz@gmail.com</a>
                    </div>
                </div>

                <div className='contact_email_form'>
                    <div className='contact_info_title'> {props.title} </div>

                    <div className='contact_textfield'>
                        <TextField required fullWidth variant='outlined' value={name}
                                   onChange={(event) => {setName(event.target.value)}}
                                   label={contact[props.lang]['name']}/>
                    </div>

                    <div className='contact_textfield'>
                        <TextField required fullWidth variant='outlined' value={email}
                                   onChange={(event) => {setEmail(event.target.value)}}
                                   label={contact[props.lang]['email']}/>
                    </div>

                    <div className='contact_textfield'>
                        <TextField required multiline fullWidth rows={4} variant='outlined'
                                   onChange={(event) => {setMessage(event.target.value)}}
                                   label={contact[props.lang]['message']}/>
                    </div>

                    <Button size='large' color='primary' startIcon={<SendIcon/>}
                            onClick={(event) => sendMessage(event)}>
                                {contact[props.lang]['send']}
                    </Button>
                </div>
            </div>

            <div className='contact_connect_wrapper'>
                <img src={youtube} alt={youtube} onContextMenu={(e) => e.preventDefault()}/>
                <img src={twitter} alt={twitter} onContextMenu={(e) => e.preventDefault()}/>
                <img src={vkontakte} alt={vkontakte} onContextMenu={(e) => e.preventDefault()}/>
                <img src={facebook} alt={facebook} onContextMenu={(e) => e.preventDefault()}/>
                <img src={instagram} alt={instagram} onContextMenu={(e) => e.preventDefault()}/>
            </div>

            <ColorLine/>

            <div className='card_wrapper_btn' style={{height: '60px'}}>
                <Button size='small' color='primary' startIcon={<CancelIcon/>}
                        onClick={() => props.onClose()}> close </Button>
            </div>
        </Dialog>
    );
}
