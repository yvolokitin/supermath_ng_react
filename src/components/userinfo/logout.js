import React, { useEffect, useState, useCallback } from 'react';
import {Typography, Button, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import ColorLine from "./../line/line";
import './logout.css';

import {logout} from './../translations/logout';

import {get_avatar_by_name} from './../halpers/avatars';
import {get_local_users, remove_local_user} from './../halpers/localstorage';

import image from './../../images/logout.png';

export default function Logout(props) {
    const [hidden, setHidden] = useState(true);
    const [users, setUsers] = useState([]);

    const onDelete = useCallback((user_id) => {
        console.log('Logout.onDelete ' + user_id);
        remove_local_user(user_id);
        setUsers(get_local_users(props.id));

    }, [props.id, ])

    useEffect(() => {
        // console.log('Logout.props.open ' + props.open);
        if (props.open) {
            setUsers(get_local_users(props.id));
            setHidden(false);
        } else {
            setHidden(true);
        }

    }, [props.open, props.id]);

    return (
        <Typography hidden={hidden} component='div'>
            <div className='logout_wrapper'>
                <IconButton onClick={() => props.onLogout('close')}
                    style={{position:'absolute',right:'1%',top:'1%',color:'grey'}}>
                        <CloseIcon/>
                </IconButton>

                <div className='logout_wrapper_img'>
                    <img src={image} alt={image} onClick={() => props.onLogout('logout')}/>
                </div>

                <div className='logout_wrapper_title' onClick={() => props.onLogout('logout')}>
                    {logout[props.lang]['logout']}
                </div>

                <div className='logout_wrapper_question'>
                    {logout[props.lang]['question']}
                </div>

                <div className='logout_wrapper_btns'>
                    <ColorLine margin={'5px'}/>
                    <div className='logout_wrapper_btns_left'>
                        <Button onClick={() => props.onLogout('close')} color='primary'>
                            {logout[props.lang]['no']}
                        </Button>
                    </div>
                    <div className='logout_wrapper_btns_right'>
                        <Button onClick={() => props.onLogout('logout')} color='primary' autoFocus>
                            {logout[props.lang]['yes']}
                        </Button>
                    </div>
                </div>

                {(users.length > 0) ? (
                    <div className='logout_users_wrapper'>
                        <ColorLine margin={'5px'}/>
                            {users.map((user) =>
                                <div key={user.id} className='logout_users_account'>
                                    <div className='logout_users_avatar' onClick={() => props.onLogout('hashlogin', user.id)}>
                                        <img src={get_avatar_by_name(user.avatar)} alt={user.avatar} onContextMenu={(e) => e.preventDefault()}/>
                                    </div>
                                    <div className='logout_users_name'>
                                        <div className='logout_users_name_signout' onClick={() => onDelete(user.id)}>
                                            <font>{logout[props.lang]['delete']}</font>
                                        </div>
                                        <div className='logout_users_name_surname' onClick={() => props.onLogout('hashlogin', user.id)}>
                                            {user.name} {user.surname}
                                        </div>
                                        <div className='logout_users_name_email' onClick={() => props.onLogout('hashlogin', user.id)}>
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                            )}
                        <ColorLine margin={'5px'}/>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </Typography>
    );
}
