import React from 'react';
import {Dialog, TextField, Button} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';

// email validator
import {validate} from 'validate.js';
import constraints from './../header/constraints';

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

    function sendMessage(event) {
        event.preventDefault();


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
                        <TextField autoFocus required fullWidth variant='outlined' label={contact[props.lang]['name']}/>
                    </div>

                    <div className='contact_textfield'>
                        <TextField required fullWidth variant='outlined' label={contact[props.lang]['email']}/>
                    </div>

                    <div className='contact_textfield'>
                        <TextField required multiline fullWidth rows={4} variant='outlined' label={contact[props.lang]['message']}/>
                    </div>

                    <Button size='large' color='primary' startIcon={<SendIcon/>} onClick={() => props.onClose()}>
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
