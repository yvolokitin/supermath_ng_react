﻿import React, { useEffect, useState } from 'react';
import {Typography, Grid, TextField, Button} from '@material-ui/core';

import {settings} from './../translations/settings';

/*
*/
export default class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.onSave = this.onSave.bind(this);

        this.state = {
            name: props.name,
            editname: true,
            surname: props.surname,
            editsurname: true,
            email: props.email,
            editemail: true,
            pswd: '*******',
            editpswd: true,
            birthday: props.birthday,
            editbirth: true,
        };
    }

    onSave(property, edit) {
        console.log('Settings.onSave ' + property + ', ' + this.state[property]);
        this.props.onSettings(property, this.state[property]);
        this.setState(edit);
    }

    render() {
        return (
            <div className='settingsboard'>
                <Typography style={{color:'green',fontFamily:'Grinched',fontSize:'2.0rem',textAlign:'center',textShadow:'1px 1px 2px black'}}>
                    {settings[this.props.lang]['description']}
                </Typography>

                <Grid container spacing={0}>
                    <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                        <TextField disabled={this.state.editname} onChange={(event) => {this.setState({name: event.target.value})}} required
                                   fullWidth variant='outlined' value={this.state.name} label={settings[this.props.lang]['name']}/>
                        <Button disabled={!this.state.editname} size='small' color='primary' onClick={(event) => {this.setState({editname: false})}}>
                            {settings[this.props.lang]['edit']}
                        </Button>
                        <Button disabled={this.state.editname} size='small' color='primary' onClick={() => {this.onSave('name', {editname: true})}}>
                            {settings[this.props.lang]['save']}
                        </Button>
                        <Button disabled={this.state.editname} size='small' color='primary'
                            onClick={() => {this.setState({editname: true, name: this.props.name})}}>
                            {settings[this.props.lang]['abort']}
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                        <TextField disabled={this.state.editsurname} onChange={(event) => {this.setState({surname: event.target.value})}} required
                                   fullWidth variant='outlined' value={this.state.surname} label={settings[this.props.lang]['surname']}/>
                        <Button disabled={!this.state.editsurname} size='small' color='primary' onClick={(event) => {this.setState({editsurname: false})}}>
                            {settings[this.props.lang]['edit']}
                        </Button>
                        <Button disabled={this.state.editsurname} size='small' color='primary' onClick={() => {this.onSave('surname', {editsurname: true})}}>
                            {settings[this.props.lang]['save']}
                        </Button>
                        <Button disabled={this.state.editsurname} size='small' color='primary'
                            onClick={() => {this.setState({editsurname: true, surname: this.props.surname})}}>
                            {settings[this.props.lang]['abort']}
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                        <TextField disabled={this.state.editemail} onChange={(event) => {this.setState({email: event.target.value})}} required
                                   fullWidth variant='outlined' value={this.state.email} label={settings[this.props.lang]['email']}/>
                        <Button disabled={!this.state.editemail} size='small' color='primary' onClick={(event) => {this.setState({editemail: false})}}>
                            {settings[this.props.lang]['edit']}
                        </Button>
                        <Button disabled={this.state.editemail} size='small' color='primary' onClick={() => {this.onSave('email', {editemail: true})}}>
                            {settings[this.props.lang]['save']}
                        </Button>
                        <Button disabled={this.state.editemail} size='small' color='primary'
                            onClick={() => {this.setState({editemail: true, email: this.props.email})}}>
                            {settings[this.props.lang]['abort']}
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                        <TextField disabled={this.state.editpswd} onChange={(event) => {this.setState({name: event.target.value})}} required
                                   fullWidth variant='outlined' value={this.state.pswd} label={settings[this.props.lang]['pswd']}/>
                        <Button disabled={!this.state.editpswd} size='small' color='primary' onClick={(event) => {this.setState({editpswd: false})}}>
                            {settings[this.props.lang]['edit']}
                        </Button>
                        <Button disabled={this.state.editpswd} size='small' color='primary' onClick={() => {this.onSave('pswd', {editpswd: true})}}>
                            {settings[this.props.lang]['save']}
                        </Button>
                        <Button disabled={this.state.editpswd} size='small' color='primary'
                            onClick={() => {this.setState({editpswd: true, pswd: '*******'})}}>
                            {settings[this.props.lang]['abort']}
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                        <TextField disabled={this.state.editbirth}
                            onChange={(event) => {this.setState({name: event.target.value})}}
                            required fullWidth  variant='outlined' type='date'
                            label={settings[this.props.lang]['birthday']}
                            value={this.state.birthday}/>
                        <Button disabled={!this.state.editbirth} size='small' color='primary' onClick={(event) => {this.setState({editbirth: false})}}>
                            {settings[this.props.lang]['edit']}
                        </Button>
                        <Button disabled={this.state.editpswd} size='small' color='primary' onClick={() => {this.onSave('pswd', {editbirth: true})}}>
                            {settings[this.props.lang]['save']}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
