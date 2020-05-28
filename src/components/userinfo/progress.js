import React, { useEffect, useState } from 'react';
import {Typography} from '@material-ui/core';

import './progress.css';

import image from './../../images/under_development.gif';

export default function Progress(props) {
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        console.log('Progress.props.open' + props.open);
        if (props.open) {
            setHidden(false);
        } else {
            setHidden(true);
        }

    }, [props.open, props.name]);

    return (
        <Typography hidden={hidden} component='div' style={{height: '100%', width: 'auto'}}>
            <div className='progress_board'>
                <img src={image} alt={props.name} onContextMenu={(e) => e.preventDefault()}/>
            </div>
        </Typography>
    );
}
