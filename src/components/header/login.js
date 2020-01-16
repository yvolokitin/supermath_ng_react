import React from 'react';
import {Dialog, DialogContent, Avatar, TextField, Grid, Link, Button, Checkbox, FormControlLabel} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import SMTitle from "./../dialog/title";

import {red} from 'material-ui/colors';

import axios from 'axios';

export default class SMLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '',
                      pswd: ''};

        this.onLogin = this.onLogin.bind(this);
        this.onUserName = this.onUserName.bind(this);
        this.onPassword = this.onPassword.bind(this);
    }

    onUserName(event, newValue) {
        // console.log("event " + event + ", newValue " + newValue);
        // this.setState({name: newValue});
    }

    onPassword(event, newValue) {
        // this.setState({pswd: newValue})
    }

    // curl -i -X POST -H "Content-Type: application/json" -d "{"""user""":"""yura""","""pswd""":"""qwerty123"""}" https://supermathrest.herokuapp.com/api/login
    onLogin(event) {
        event.preventDefault();
        console.log("event " + event);
        var post_data = {'user': 'yura', 'pswd': 'test'};
        axios.post('https://supermathrest.herokuapp.com/api/login', post_data)
            .then(this.onLoginResponse)
            .catch(error => console.log("axios.post error " + error));
    }

    onLoginResponse(response) {
        console.log("YURA: axios.post response " + response.data);
    }

    render() {
        return (
            <Dialog onClose={() => this.props.onClick()} fullWidth={true} open={this.props.open}>
                <SMTitle title="" onClick={() => this.props.onClick()}/>

                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Avatar style={{margin: 10, width: 60, height: 60, backgroundColor: red[500] }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <DialogContent dividers>
                        <form noValidate>
                            <TextField variant="outlined" margin="normal" required fullWidth id="email"
                                       label="Email Address" name="email" autoComplete="email" autoFocus
                                       onChange = {this.onUserName}/>
                            <TextField variant="outlined" margin="normal" required fullWidth id="password"
                                       label="Password" name="password" type="password" autoComplete="current-password"
                                       onChange = {this.onPassword}/>
                            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>

                            <Button type="submit" fullWidth variant="contained" color="primary" onClick={this.onLogin}>
                                Login
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">Forgot password?</Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">{"Don't have an account? Sign Up"}</Link>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                </div>
            </Dialog>
        );
    }
}

