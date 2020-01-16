import React from 'react';
import {Avatar, Dialog} from '@material-ui/core';

import './userinfo.css';
import SMTitle from "./../dialog/title";

import logo from './../../images/Martin-Berube-People-Kid.ico';

export default class UserInformation extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.onLogout = this.onLogout.bind(this);

        this.state = {percentage: ''};
    }

    onClose() {
        console.log('onClose');
        this.props.onClick();
    }

    onLogout() {
        console.log('onLogout');
    }


/*
import Avatar from 'react-avatar';
                    <Avatar facebookId="100008343750912" size="150"/>
                    <Avatar googleId="118096717852922241760" size="100" round={true} src="./../../images/vitamins.jpg"/>
                    <Avatar vkontakteId="1" size="150"/>

*/
    render() {
        return (
            <Dialog open={this.props.open} transitionDuration={500} fullWidth={true} maxWidth={false}>
                <SMTitle title="User Information" onClick={this.onClose}/>

                    <Avatar style={{margin: 10, width: 160, height: 160}}>
                        <img src={logo} alt='test'/>
                    </Avatar>

            </Dialog>
        );
    }
}
