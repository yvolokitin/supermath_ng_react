import React from 'react';
import {Dialog, Paper, Typography} from '@material-ui/core';
import Avatar from 'react-avatar';

import './userinfo.css';
import SMTitle from "./../dialog/title";

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
    <DialogTitle id="customized-dialog-title" onClose={this.onClose}></DialogTitle>
                <Paper style={{height: 440,backgroundImage:'linear-gradient(to right, #33cc33, #ccff99)'}}>
*/
    render() {
        return (
            <Dialog open={this.props.open} transitionDuration={500} fullWidth={true} maxWidth={false}>
                <SMTitle title="User Information" onClick={this.onClose}/>

                <Paper style={{height: 440,backgroundImage:'linear-gradient(to right, #009900, #ff9900)'}}>
                    <Avatar facebookId="100008343750912" size="150"/>
                    <Avatar googleId="118096717852922241760" size="100" round={true} src="./../../images/vitamins.jpg"/>
                    <Avatar vkontakteId="1" size="150"/>
                </Paper>

            </Dialog>
        );
    }
}
