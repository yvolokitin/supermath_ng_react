import React, { useEffect, useState } from 'react';
import { Dialog, Slide, Typography } from '@material-ui/core';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';

import Logout from './logout';
import Avatars from './avatars';
import Friends from './friends';
import Settings from './settings';
import Exchange from './exchange';
import Progress from './progress';

import {account} from './../translations/account';
import {avatars} from './../halpers/avatars';
import './account.css';

const SCREEN = {
    NONE: 0,
    AVATARS: 1,
    SETTINGS: 2,
    PROGRESS: 3,
    EXCHANGE: 4,
    FRIENDS: 5,
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function AccountTab(props) {
/*
    useEffect(() => {
        console.log('AccountTab.useEffect ' + props.id + ': ' + props.selected);

    }, [props.id, props.name, props.selected]);
*/
    return (
      <>
        {(props.selected) ? (
            <div className='account_tab' onClick={() => props.onClick(props.id)} style={{boxShadow: '0 11px 1px -1px black'}}>
                <font style={{color: '#334d00', transform: 'scale(1.1)'}}> {props.name} </font>
            </div>
        ) : (
            <div className='account_tab' onClick={() => props.onClick(props.id)} style={{boxShadow: 'none'}}>
                <font style={{color: 'green', transform: 'scale(1.0)'}}> {props.name} </font>
            </div>
        )}
      </>
    );
}

export default function Account(props) {
    const [current, setCurrent] = useState(SCREEN.PROGRESS);
    const [avatar, setAvatar] = useState('');
    const [avatar_name, setAvatarName] = useState('');
    const [logout, setLogout] = useState(false);

    const tabs = [
        {id: 1, name: account[props.lang]['avatar']},
        {id: 2, name: account[props.lang]['settings']},
        {id: 3, name: account[props.lang]['progress']},
        {id: 4, name: account[props.lang]['exchange']},
        {id: 5, name: account[props.lang]['friends']},
    ];

    useEffect(() => {
        // console.log('Account.useEffect ' + props.avatar);
        if (props.open) {
            avatars.forEach(
                function (element) {
                    if (element.name === props.avatar) {
                        setAvatarName(element.name)
                        setAvatar(element.src);
                    }
            });
        }

    }, [props.id, props.open, props.lang, props.avatar]);

    function onTabChange(id) {
        // console.log('Account.onTabChange ' + id);
        setCurrent(id);
    }

    function onAvatarChange(id) {
        console.log('Account.onAvatarChange ' + id + '->' + avatars[id-1].name);
        setAvatar(avatars[id-1].src);
        setAvatarName(avatars[id-1].name)
    }

    /**
     * Lifting property changes from Settings and Exchange Tabs up to page/index.js level
     */
    function onSettings(property, value) {
        console.log('Account.onSettings: ' + property + ', value ' + value);
        props.onUpdate(property, value);
    }

    function onClose() {
        // console.log('Account.onClose ' +  + ', ' + avatar_name);
        // props.onUpdate('logout');
        if (avatar_name !== props.avatar) {
            props.onUpdate('avatar', avatar_name);
        } else {
            props.onUpdate('close');
        }

        if (logout) {
            setLogout(false);
        }
    }

    function onLogout(status) {
        setLogout(false);
        if (status === 'logout') {
            props.onUpdate(status);
        }
    }

    /**
     * We have to use Typography inside of Dialog as wrapper, othervise iOs and iPod devices
     * display page incorrectly and tab content overwrite tab staff
     */
    return (
        <Dialog open={props.open} fullScreen={true} TransitionComponent={Transition} transitionDuration={800}>
            <Typography component='div'>
            <SMTitle title='' onClick={onClose}/>

            <ColorLine/>

            <div className='account_board_wrapper'>
                <div className='account_board'>
                    <div className='account_board_user_info'>
                        { (props.width > 440) ? (
                            <div className='account_board_user_info_line'>
                                {props.name} {props.surname}, {props.age} {account[props.lang]['years']}
                            </div>
                        ) : (
                            <div className='account_board_user_info_line'>
                                {props.name} {props.surname}, {props.age}
                            </div>
                        )}
                        <div className='account_board_user_info_line'>
                            <font style={{color:'green'}}> {props.passed} </font>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                            <font style={{color:'red'}}> {props.failed} </font>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                            <font style={{color:'green'}}> {props.cards} </font>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127183;</span>
                        </div>
                    </div>
                    <div className='account_board_avatar'>
                        <img src={avatar} alt={avatar_name}
                            onClick={() => setLogout(true)}
                            onContextMenu={(e) => e.preventDefault()}/>
                    </div>
                </div>

                <div className='account_tabs'>
                    {tabs.map(
                        (tab) => <AccountTab key={tab.name}
                                    id={tab.id}
                                    name={tab.name}
                                    selected={current === tab.id}
                                    onClick={onTabChange}/>
                    )}
                </div>
            </div>

            <Avatars open={current === SCREEN.AVATARS}
                avatars={avatars}
                avatar={props.avatar}
                onAvatar={onAvatarChange}/>

            <Settings open={current === SCREEN.SETTINGS}
                id={props.id}
                name={props.name}
                surname={props.surname}
                email={props.email}
                age={props.age}
                birthday={props.birthday}
                lang={props.lang}
                onSettings={onSettings}/>

            <Exchange open={current === SCREEN.EXCHANGE}
                passed={props.passed}
                failed={props.failed}
                cards={props.cards}
                lang={props.lang} 
                onExchange={onSettings}/>

            <Friends open={current === SCREEN.FRIENDS}
                name={props.name}
                lang={props.lang}/>

            <Progress open={current === SCREEN.PROGRESS}
                id={props.id}
                name={props.name}
                lang={props.lang}
                pswdhash={props.pswdhash}/>

            <Logout open={logout}
                name={props.name}
                lang={props.lang}
                onLogout={onLogout}/>

        </Typography>
        </Dialog>
    );
}
