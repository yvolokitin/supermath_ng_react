import React, { useEffect, useState } from 'react';
import {Typography} from '@material-ui/core';

import './friends.css';

import image from './../../images/under_development.gif';

export default function Friends(props) {
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        // console.log('Friends.props.open ' + props.open);
        if (props.open) {
            setHidden(false);
        } else {
            setHidden(true);
        }

    }, [props.open, props.name]);

    return (
        <Typography hidden={hidden} component='div'>
            <div className='friends_board'>
                <img src={image} alt={props.name} onContextMenu={(e) => e.preventDefault()}/>
            </div>
        </Typography>
    );
}
