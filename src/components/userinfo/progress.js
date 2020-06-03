import React, { useEffect, useState } from 'react';
import {Typography} from '@material-ui/core';

import Calendar from './../calendar/calendar';

import './progress.css';

export default function Progress(props) {
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (props.open) {
            setHidden(false);
        } else {
            setHidden(true);
        }

    }, [props.open, props.name]);

    return (
        <Typography hidden={hidden} component='div'>
            <div className='progress_board_wrapper'>
                <div className='progress_board'>
                    <Calendar lang={props.lang}/>

                </div>
            </div>
        </Typography>
    );
}
