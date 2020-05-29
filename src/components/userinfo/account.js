import React, { useEffect, useState } from 'react';
import { Dialog, Slide, Typography } from '@material-ui/core';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';

import Logout from './logout';
import Avatars from './avatars';
import Friends from './friends';
import Settings from './settings';
import Progress from './progress';

import {account} from './../translations/account';
import './account.css';

import ava1 from './../../images/avatars/astronaut-icon.png';
import ava2 from './../../images/avatars/confederate-soldier-icon.png';
import ava3 from './../../images/avatars/construction-worker-icon.png';
import ava4 from './../../images/avatars/doctor-icon.png';
import ava5 from './../../images/avatars/cowboy-icon.png';
import ava6 from './../../images/avatars/chef-icon.png';

import ava7 from './../../images/avatars/artist-icon.png';
import ava8 from './../../images/avatars/boy-icon.png';
import ava9 from './../../images/avatars/chief-icon.png';
import ava10 from './../../images/avatars/clown-icon.png';
import ava11 from './../../images/avatars/grandma-icon.png';
import ava12 from './../../images/avatars/lumberjack-icon.png';

import ava13 from './../../images/avatars/martin-berube.png';
import ava14 from './../../images/avatars/pirate-icon.png';
import ava15 from './../../images/avatars/policeman-icon.png';
import ava16 from './../../images/avatars/princess-icon.png';
import ava17 from './../../images/avatars/prisoner-icon.png';
import ava18 from './../../images/avatars/queen-icon.png';

import ava19 from './../../images/avatars/dentist-icon.png';
import ava20 from './../../images/avatars/baby-icon.png';
import ava21 from './../../images/avatars/soldier-icon.png';
import ava22 from './../../images/avatars/prince-icon.png';
import ava23 from './../../images/avatars/lady-icon.png';
import ava24 from './../../images/avatars/mom-icon.png';

import ava25 from './../../images/avatars/Indian-icon.png';
import ava26 from './../../images/avatars/Irish-icon.png';
import ava27 from './../../images/avatars/king-icon.png';
import ava28 from './../../images/avatars/waiter-icon.png';
import ava29 from './../../images/avatars/woman-icon.png';
import ava30 from './../../images/avatars/firefighter-icon.png';

import background from './../../images/background.png';

var avatars = [
    {id: 1, src: ava1, name: 'astronaut'},
    {id: 2, src: ava2, name: 'confederate'},
    {id: 3, src: ava3, name: 'worker'},
    {id: 4, src: ava4, name: 'doctor'},
    {id: 5, src: ava5, name: 'cowboy'},
    {id: 6, src: ava6, name: 'chef'},
    {id: 7, src: ava7, name: 'artist'},
    {id: 8, src: ava8, name: 'boy'},
    {id: 9, src: ava9, name: 'chief'},
    {id: 10, src: ava10, name: 'clown'},
    {id: 11, src: ava11, name: 'grandma'},
    {id: 12, src: ava12, name: 'lumberjack'},
    {id: 13, src: ava13, name: 'martin'},
    {id: 14, src: ava14, name: 'pirate'},
    {id: 15, src: ava15, name: 'policeman'},
    {id: 16, src: ava16, name: 'princess'},
    {id: 17, src: ava17, name: 'prisoner'},
    {id: 18, src: ava18, name: 'queen'},
    {id: 19, src: ava19, name: 'dentist'},
    {id: 20, src: ava20, name: 'baby'},
    {id: 21, src: ava21, name: 'solder'},
    {id: 22, src: ava22, name: 'prince'},
    {id: 23, src: ava23, name: 'lady'},
    {id: 24, src: ava24, name: 'mom'},
    {id: 25, src: ava25, name: 'Indian'},
    {id: 26, src: ava26, name: 'Irish'},
    {id: 27, src: ava27, name: 'king'},
    {id: 28, src: ava28, name: 'waiter'},
    {id: 29, src: ava29, name: 'woman'},
    {id: 30, src: ava30, name: 'firefighter'},
];

const SCREEN = {
    NONE: 0,
    AVATARS: 1,
    SETTINGS: 2,
    EXCHANGE: 3,
    PROGRESS: 4,
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
    const [current, setCurrent] = useState(1);
    const [avatar, setAvatar] = useState('');
    const [avatar_name, setAvatarName] = useState('');
    const [logout, setLogout] = useState(false);

    const tabs = [
        {id: 1, name: account[props.lang]['avatar']},
        {id: 2, name: account[props.lang]['settings']},
        {id: 3, name: account[props.lang]['exchange']},
        {id: 4, name: account[props.lang]['progress']},
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
     * Lifting property from Settgins Tab up to page.index.js level
     */
    function onSettings(property, value) {
        console.log('Account.onSettings: ' + property + ', value ' + value);
        props.onUpdate(property, value);
    }

    function onClose() {
        // console.log('Account.onClose ' +  + ', ' + avatar_name);
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
                <div className='account_board' style={{'backgroundImage': background}}>
                    <div className='account_board_user_info'>
                        <div className='account_board_user_info_line'>
                            {props.name} {props.surname}, {props.age} {account[props.lang]['years']}
                        </div>

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

            <Friends open={current === SCREEN.FRIENDS}
                name={props.name}
                lang={props.lang}/>

            <Progress open={current === SCREEN.PROGRESS}
                name={props.name}
                lang={props.lang}/>

            <Logout open={logout}
                name={props.name}
                lang={props.lang}
                onLogout={onLogout}/>

        </Typography>
        </Dialog>
    );
}
