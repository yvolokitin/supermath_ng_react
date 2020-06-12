import React, { useEffect, useState } from 'react';
import {Typography} from '@material-ui/core';

import './avatars.css';

function Avatar(props) {
    return (
        <>
            {(props.selected) ? (
                <div className='avatar_box_selected' onClick={() => props.onClick(props.id)}>
                    <img src={props.src} alt={props.name}
                        onContextMenu={(e) => e.preventDefault()}/>
                </div>
            ) : (
                <div className='avatar_box'>
                    <img src={props.src} alt={props.name}
                        onClick={() => props.onClick(props.id)}
                        onContextMenu={(e) => e.preventDefault()}/>
                </div>
            )}
        </>
    );
}

export default function Avatars(props) {
    const [current, setCurrent] = useState(1);
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        // console.log('Avatars. props.avatar ' + props.avatar);
        if (props.open) {
            setHidden(false);
            props.avatars.forEach(
                function (element) {
                    if (element.name === props.avatar) {
                        setCurrent(element.id)
                    }
            });

        } else {
            setHidden(true);
        }

    }, [props.open, props.avatars, props.avatar]);

    function onAvatarChange(id) {
        // console.log('Avatars.onAvatarChange ' + id);
        props.onAvatar(id);    
        setCurrent(id);
    }

    return (
        <Typography hidden={hidden} component='div'>
            <div className='avatars_board_wrapper'>
                <div className='avatars_board'>
                    {props.avatars.map(
                        (avatar) => <Avatar key={avatar.name}
                                        id={avatar.id}
                                        src={avatar.src}
                                        name={avatar.name}
                                        selected={current === avatar.id}
                                        onClick={onAvatarChange}/>
                        )
                    }
                </div>
            </div>
        </Typography>
    );
}
