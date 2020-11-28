import React, { useState } from 'react';
import {Dialog, Slide, TextField, Button} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';

// email validator
import {validate} from 'validate.js';
import constraints from './../header/constraints';

import {send_email} from './../halpers/communicator';

import image_contacts from './../../images/contacts.jpg';

import image from './../../images/contact/mail_icon.jpg';
import twitter from './../../images/contact/twitter.jpg';
import youtube from './../../images/contact/youtube.jpg';
import facebook from './../../images/contact/facebook.jpg';
import vkontakte from './../../images/contact/vkontakte.jpg';
import instagram from './../../images/contact/instagram.jpg';

import Title from './../title/title';
import ColorLine from './../line/line';

import {contact} from './../translations/contact';
import './contact.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function Contact(props) {
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.email);
    const [message, setMessage] = useState('');

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

                    if (props.name.length > 0) {
                        setMessage('');
                    } else {
                        setName(''); setEmail(''); setMessage('');
                    }
                }
            }
        }
    }

    return (
        <Dialog open={props.open} onClose={() => props.onClose()}
            fullScreen={props.fullScreen} fullWidth={true} maxWidth='md' scroll='body'
            TransitionComponent={Transition} transitionDuration={900}>

            <Title title={contact[props.lang]['contact']} src={image_contacts} onClose={() => props.onClose('')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

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
