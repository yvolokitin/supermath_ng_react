import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';

import Contact from './contact';
import {footer} from './../translations/footer';
import './footer.css';

export default function Footer(props) {
    const [value, setValue] = useState(true); // useState(false);
    const [fontColor, setFontColor] = useState('white');

    useEffect(() => {
        // console.log('Footer. useEffect ' + props.color);
        if (props.color === 'white') {
            setFontColor('#3f51b5');
        } else if (props.color === 'yellow') {
            setFontColor('brown');
        } else if (props.color === 'green') {
            setFontColor('orange');
        } else if (props.color === 'orange') {
            setFontColor('green');
        } else if (props.color === 'black') {
            setFontColor('white');
        } else {
            setFontColor('white');
        }

    }, [props.color, props.lang]);

    /*
        <footer style={{backgroundColor: props.color}}>
        </footer>
    */
    return (
        <div className='footer_wrapper' style={{backgroundColor: props.color, color: fontColor}}>
            <div className='footer_copyright'>
                {'Copyright © '} <Link color='inherit' href='http://supermath.xyz'>SuperMath.XYZ</Link>{' '} {new Date().getFullYear()}
            </div>

            <div className='footer_contacts'>
                <font onClick={() => setValue(true)}>{footer[props.lang]['contacts']}</font>
            </div>

            <Contact open={value}
                     title={footer[props.lang]['title']}
                     text={footer[props.lang]['questions']}
                     onClose={() => setValue(false)}/>
        </div>
    );
}
