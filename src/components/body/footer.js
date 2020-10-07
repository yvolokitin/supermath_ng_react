import React from 'react';
import { Link } from '@material-ui/core';

import Contact from './contact';
import Share from './share';

import {footer} from './../translations/footer';
import './footer.css';

export default function Footer(props) {
    const [contacts, setContacts] = React.useState(false);
    const [share, setShare] = React.useState(false);

    return (
        <div className='footer_wrapper'>
            <div className='footer_share'>
                <font onClick={() => setShare(true)}>{footer[props.lang]['share']}</font>
            </div>

            <div className='footer_copyright'>
                {'Copyright © '} <Link color='inherit' href='https://supermath.xyz'>SuperMath.XYZ</Link>{'. '} {new Date().getFullYear()}
            </div>

            <div className='footer_contacts'>
                <font onClick={() => setContacts(true)}>{footer[props.lang]['contacts']}</font>
            </div>

            <Share open={share}
                user_id={props.id}
                name={props.name}
                email={props.email}
                lang={props.lang}
                fullScreen={props.fullScreen}
                onClose={() => setShare(false)}/>

            <Contact open={contacts}
                name={props.name}
                email={props.email}
                lang={props.lang}
                fullScreen={props.fullScreen}
                onClose={() => setContacts(false)}/>

        </div>
    );
}
