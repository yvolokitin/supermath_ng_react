import React, { useEffect, useState } from 'react';
import {Typography, Button} from '@material-ui/core';

import './logout.css';
import {logout} from './../translations/logout';

import image from './../../images/logout.png';

export default function Logout(props) {
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        console.log('Logout.props.open' + props.open);
        if (props.open) {
            setHidden(false);
        } else {
            setHidden(true);
        }

    }, [props.open, props.name]);

    return (
        <Typography hidden={hidden} component='div'>
            <div className='logout_wrapper'>
                <div className='logout_wrapper_img'>
                    <img src={image} alt={image}/>
                </div>

                <div className='logout_wrapper_title'>
                    {logout[props.lang]['logout']}
                </div>

                <div className='logout_wrapper_question'>
                    {logout[props.lang]['question']}
                </div>

                <div className='logout_wrapper_btns'>
                    <div className='logout_wrapper_btns_left'>
                        <Button onClick={() => props.onLogout('close')} color="primary">
                            {logout[props.lang]['no']} {props.name}
                        </Button>
                    </div>
                    <div className='logout_wrapper_btns_right'>
                        <Button onClick={() => props.onLogout('logout')} color="primary" autoFocus>
                            {logout[props.lang]['yes']}
                        </Button>
                    </div>
                </div>
            </div>
        </Typography>
    );
}
