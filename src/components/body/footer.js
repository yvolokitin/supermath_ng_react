import React, { useState } from 'react';
import Link from '@material-ui/core/Link';

import Contact from './contact';
import {footer} from './../translations/footer';
import './footer.css';

export default function Footer(props) {
    const [value, setValue] = useState(false);

    return (
        <div className='footer_wrapper'>
            <div className='footer_copyright'>
                {'Copyright © '} <Link color='inherit' href='https://supermath.xyz'>SuperMath.XYZ</Link>{' '} {new Date().getFullYear()}
            </div>

            <div className='footer_contacts'>
                <font onClick={() => setValue(true)}>{footer[props.lang]['contacts']}</font>
            </div>

            <Contact open={value}
                name={props.name}
                email={props.email}
                lang={props.lang}
                onClose={() => setValue(false)}/>
        </div>
    );
}
