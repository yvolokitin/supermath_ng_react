import React, { useEffect } from 'react';
import {Grid, Avatar} from '@material-ui/core';

import './avatars.css';

export default function Avatars(props) {
    // const [avatar, setAvatar] = useState([]);
    useEffect(() => {
        console.log('Avatars.props.avatar ' + props.avatar);
        // console.log('keys ' + props.avatars[1][1]);

    }, [props.avatars, props.avatar]);

    function onAvatarChange(id, avatar) {
        console.log('Avatars.onAvatarChange ' + id + ', ' + avatar);
        props.onAvatar(id);    
        // setAvatar(id);
    }

    return (
        <div className='avatarsboard'>
            <Grid container spacing={0}>
                {
                    props.avatars.map((avatar, id) => (
                        <Grid item key={id} xs={2} className='avatargrid'>
                            <Avatar src={avatar[0]} alt='avatar' onClick={(e) => onAvatarChange(id)}
                                    className='avatarimage' style={{width:'140px',height:'140px'}}/>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
}
