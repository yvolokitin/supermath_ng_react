import React, { useState, useEffect } from 'react';
import {Grid, Avatar} from '@material-ui/core';

import './avatars.css';

export default function Avatars(props) {
    const [avatar, setAvatar] = useState([]);

    // avatars={this.state.avatars} index={this.state.index} onAvatar={this.onAvatar}/>
    useEffect(() => {
        console.log('Avatars.props.avatar ' + props.avatar);
        // console.log('keys ' + props.avatars[1][1]);

    }, [props.avatars, props.avatar]);

    function onAvatarChange(id, avatar) {
        console.log('Avatars.onAvatarChange ' + id + ', ' + avatar);
        props.onAvatar(id, avatar);    
        setAvatar(id);
    }

    /*
          style={{width:'140px',height:'140px',cursor:'pointer',border:'1px solid grey'}}/>
    */
    return (
        <div className='avatarsboard'>
            <Grid container spacing={0}>
                {
                    props.avatars.map((avatar, id) => (
                        <Grid item key={id} xs={2} className='avatargrid'>
                            <Avatar src={avatar[0]} alt='avatar' onClick={(e) => onAvatarChange(id, avatar[1])}
                                    className='avatarimage' style={{width:'140px',height:'140px'}}/>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
}
