import React from 'react';
import {Dialog, TextField, Button} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';

import image from './../../images/contact/mail_icon.png';
import ColorLine from './../line/line';
import SMTitle from './../dialog/title';
import './contact.css';

export default function Info(props) {
    return (
        <Dialog open={props.open} transitionDuration={700} fullScreen={props.fullScreen} fullWidth={true} maxWidth='md' scroll='body'>
            <SMTitle title='' onClick={() => props.onClose()}/>
            <ColorLine/>

            <div className='contact_email_wrapper'>
                <div className='contact_email_image'>
                    <div className='contact_email_image_img'>
                        <img src={image} alt={image}/>
                    </div>
                    <div className='contact_email_image_alt_text'>
                        If you have questions or just want to get in rouch, use the form below. We look forward to hearing from you!
                    </div>
                </div>

                <div className='contact_email_form'>
                    <div className='contact_info_title'> {props.title} </div>

                    <div className='contact_textfield'>
                        <TextField autoFocus required fullWidth variant='outlined' label='Your Name'/>
                    </div>

                    <div className='contact_textfield'>
                        <TextField required fullWidth variant='outlined' label='Your Email Address'/>
                    </div>

                    <div className='contact_textfield'>
                        <TextField required multiline fullWidth rows={4} variant='outlined' label='Message'/>
                    </div>
                </div>

            </div>

            <ColorLine/>

            <div className='contact_connect_wrapper'>
                or connect with us on...
            </div>

            <ColorLine/>

            <div className='card_wrapper_btn' style={{height: '60px'}}>
                <Button size='small' color='primary' startIcon={<CancelIcon/>}
                        onClick={() => props.onClose()}> close </Button>
            </div>
        </Dialog>
    );
}
