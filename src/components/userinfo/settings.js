import React, { useEffect, useState } from 'react';
import {Typography, Grid, TextField, Button} from '@material-ui/core';

import './settings.css';
import {settings} from './../translations/settings';

import {validate_name, validate_email, validate_pswd} from './../halpers/validator.js';

export default function Settings(props) {
    const [hidden, setHidden] = useState(true);

    const [name, setName] = useState(props.name);
    const [editname, setEditName] = useState(true);

    const [surname, setSurname] = useState(props.surname);
    const [editsurname, setEditSurname] = useState(true);

    const [email, setEmail] = useState(props.email);
    const [editemail, setEditEmail] = useState(true);

    const [pswdhash, setPswdhash] = useState('*******');
    const [editpswdhash, setEditPswdhash] = useState(true);

    const [birthday, setBirthday] = useState(props.birthday);
    const [editbirthday, setEditBirthday] = useState(true);

    useEffect(() => {
        if (props.open) {
            setHidden(false);
            console.log('Settings -> props.birthday ' + props.birthday);
        } else {
            setHidden(true);
        }

    }, [props.open, props.name, props.surname, props.email, props.birthday]);

    /**
     * Set value for specified property
     */
    function saveValue(property, value) {
        console.log('Settings.saveValue -> property ' + property + ', value ' + value);

        var result = 'not ok';
        if (property === 'name') {
            if (props.name !== value) {
                result = validate_name(value, props.lang);
                if (result === 'ok') {
                    setEditName(true);
                } else {
                    alert(result);
                }
            } else {
                setEditName(true);
            }

        } else if (property === 'surname') {
            if (props.surname !== value) {
                result = validate_name(value, props.lang);
                if (result === 'ok') {
                    setEditSurname(true);
                } else {
                    alert(result);
                }
            } else {
                setEditSurname(true);
            }

        } else if (property === 'email') {
            if (props.email !== value) {
                result = validate_email(value, props.lang);
                if (result === 'ok') {
                    setEditEmail(true);
                } else {
                    alert(result);
                }
            } else {
                setEditEmail(true);
            }

        } else if (property === 'pswdhash') {
            result = validate_pswd(value, props.lang);
            if (result === 'ok') {
                setEditPswdhash(true);

                var crypto = require('crypto');
                var mykey = crypto.createCipher('aes-128-cbc', value);
                var hash = mykey.update('abc', 'utf8', 'hex');
                hash += mykey.final('hex');
                value = hash;
                // localStorage.setItem('pswdhash', hash);

            } else {
                setEditPswdhash(true);
                alert(result);
            }

        } else if (property === 'birthday') {
            setEditBirthday(true);
        }

        if (result === 'ok') {
            props.onSettings(property, value);
        }
    }

    return (
        <Typography hidden={hidden} component='div'>
            <div className='settings_board_wrapper'>
                <div className='settings_board'>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                            <TextField disabled={editname} onChange={(event) => setName(event.target.value)} required
                                fullWidth variant='outlined' value={name} label={settings[props.lang]['name']}/>
                            <Button disabled={!editname} size='small' color='primary'
                                onClick={() => setEditName(false)}>
                                    {settings[props.lang]['edit']}
                            </Button>
                            <Button disabled={editname} size='small' color='primary'
                                onClick={() => saveValue('name', name)}>
                                    {settings[props.lang]['save']}
                            </Button>
                            <Button disabled={editname} size='small' color='primary'
                                onClick={() => {setName(props.name); setEditName(true);}}>
                                    {settings[props.lang]['abort']}
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                            <TextField disabled={editsurname} onChange={(event) => setSurname(event.target.value)} required
                                fullWidth variant='outlined' value={surname} label={settings[props.lang]['name']}/>
                            <Button disabled={!editsurname} size='small' color='primary'
                                onClick={() => setEditSurname(false)}>
                                    {settings[props.lang]['edit']}
                            </Button>
                            <Button disabled={editsurname} size='small' color='primary'
                                onClick={() => saveValue('surname', surname)}>
                                    {settings[props.lang]['save']}
                            </Button>
                            <Button disabled={editsurname} size='small' color='primary'
                                onClick={() => {setSurname(props.surname); setEditSurname(true);}}>
                                    {settings[props.lang]['abort']}
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                            <TextField disabled={editemail} onChange={(event) => setEmail(event.target.value)} required
                                fullWidth variant='outlined' value={email} label={settings[props.lang]['name']}/>
                            <Button disabled={!editemail} size='small' color='primary'
                                onClick={() => setEditEmail(false)}>
                                    {settings[props.lang]['edit']}
                            </Button>
                            <Button disabled={editemail} size='small' color='primary'
                                onClick={() => saveValue('email', email)}>
                                    {settings[props.lang]['save']}
                            </Button>
                            <Button disabled={editemail} size='small' color='primary'
                                onClick={() => {setEmail(props.email); setEditEmail(true);}}>
                                    {settings[props.lang]['abort']}
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                            <TextField disabled={editpswdhash} onChange={(event) => setPswdhash(event.target.value)} required
                                fullWidth variant='outlined' value={pswdhash} label={settings[props.lang]['pswd']}/>
                            <Button disabled={!editpswdhash} size='small' color='primary'
                                onClick={() => {setPswdhash(''); setEditPswdhash(false)}}>
                                    {settings[props.lang]['edit']}
                            </Button>
                            <Button disabled={editpswdhash} size='small' color='primary'
                                onClick={() => saveValue('pswdhash', pswdhash)}>
                                    {settings[props.lang]['save']}
                            </Button>
                            <Button disabled={editpswdhash} size='small' color='primary'
                                onClick={() => {setPswdhash('*******'); setEditPswdhash(true);}}>
                                    {settings[props.lang]['abort']}
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                            <TextField disabled={editbirthday} onChange={(event) => setBirthday(event.target.value)}
                                fullWidth variant='outlined' type='date' value={birthday} placeholder='Birthday'/>

                            <Button disabled={!editbirthday} size='small' color='primary'
                                onClick={() => setEditBirthday(false)}>
                                    {settings[props.lang]['edit']}
                            </Button>
                            <Button disabled={editbirthday} size='small' color='primary'
                                onClick={() => saveValue('birthday', birthday)}>
                                    {settings[props.lang]['save']}
                            </Button>
                            <Button disabled={editbirthday} size='small' color='primary'
                                onClick={() => {setBirthday(props.birthday); setEditBirthday(true);}}>
                                    {settings[props.lang]['abort']}
                            </Button>
                        </Grid>

                    </Grid>
                </div>
            </div>
        </Typography>
    );
}
