import React, { useEffect, useState } from 'react';
import {Typography, Grid, TextField, Button} from '@material-ui/core';

import './settings.css';
import {settings} from './../translations/settings';


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

/*
    const [birthday, setBirthday] = useState(props.birthday);
    const [editbirthday, setEditBirthday] = useState(true);

*/

    useEffect(() => {
        // console.log('Progress.props.open ' + props.open);
        if (props.open) {
            setHidden(false);
        } else {
            setHidden(true);
        }

    }, [props.open, props.name, props.surname, props.email, props.birthday]);

    /**
     * Set value for specified property
     */
    function saveValue(property) {
        switch (property) {
            case 'name':
                setEditSurname(true);
                break;

            case 'surname':
                setEditSurname(true);
                break;

            default:
                console.log('Settings.saveValue -> unknown ' + property);
                break;
        }

    }

    /*
                    <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                        <TextField disabled={this.state.editpswd} onChange={(event) => {this.setState({name: event.target.value})}} required
                                   fullWidth variant='outlined' value={props.pswd} label={settings[props.lang]['pswd']}/>
                        <Button disabled={!this.state.editpswd} size='small' color='primary' onClick={(event) => {this.setState({editpswd: false})}}>
                            {settings[props.lang]['edit']}
                        </Button>
                        <Button disabled={this.state.editpswd} size='small' color='primary' onClick={() => {this.onSave('pswd', {editpswd: true})}}>
                            {settings[props.lang]['save']}
                        </Button>
                        <Button disabled={this.state.editpswd} size='small' color='primary'
                            onClick={() => {this.setState({editpswd: true, pswd: '*******'})}}>
                            {settings[props.lang]['abort']}
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                        <TextField disabled={editbirthday} onChange={(event) => {this.setState({name: event.target.value})}}
                            required fullWidth  variant='outlined' type='date'
                            label={settings[props.lang]['birthday']}
                            value={birthday}/>
                        <Button disabled={!this.state.editbirth} size='small' color='primary' onClick={(event) => {this.setState({editbirth: false})}}>
                            {settings[props.lang]['edit']}
                        </Button>
                        <Button disabled={this.state.editpswd} size='small' color='primary' onClick={() => {this.onSave('pswd', {editbirth: true})}}>
                            {settings[props.lang]['save']}
                        </Button>
                    </Grid>
    */
    return (
        <Typography hidden={hidden} component='div'>
            <div className='settings_board_wrapper'>
                <div className='settings_board'>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                            <TextField disabled={editname} onChange={(event) => setName(event.target.value)} required
                                       fullWidth variant='outlined' value={name} label={settings[props.lang]['name']}/>
                            <Button disabled={!editname} size='small' color='primary' onClick={() => setEditName(false)}>
                                {settings[props.lang]['edit']}
                            </Button>
                            <Button disabled={editname} size='small' color='primary' onClick={() => setEditName(true)}>
                                {settings[props.lang]['save']}
                            </Button>
                            <Button disabled={editname} size='small' color='primary' onClick={() => {setName(props.name); setEditName(true);}}>
                                {settings[props.lang]['abort']}
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                            <TextField disabled={editsurname} onChange={(event) => setSurname(event.target.value)} required
                                       fullWidth variant='outlined' value={surname} label={settings[props.lang]['name']}/>
                            <Button disabled={!editsurname} size='small' color='primary' onClick={() => setEditSurname(false)}>
                                {settings[props.lang]['edit']}
                            </Button>
                            <Button disabled={editsurname} size='small' color='primary' onClick={() => saveValue('name')}>
                                {settings[props.lang]['save']}
                            </Button>
                            <Button disabled={editsurname} size='small' color='primary' onClick={() => {setSurname(props.surname); setEditSurname(true);}}>
                                {settings[props.lang]['abort']}
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                            <TextField disabled={editemail} onChange={(event) => setEmail(event.target.value)} required
                                       fullWidth variant='outlined' value={email} label={settings[props.lang]['name']}/>
                            <Button disabled={!editemail} size='small' color='primary' onClick={() => setEditEmail(false)}>
                                {settings[props.lang]['edit']}
                            </Button>
                            <Button disabled={editemail} size='small' color='primary' onClick={() => setEditEmail(true)}>
                                {settings[props.lang]['save']}
                            </Button>
                            <Button disabled={editemail} size='small' color='primary' onClick={() => {setEmail(props.email); setEditEmail(true);}}>
                                {settings[props.lang]['abort']}
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6} style={{padding:'1%'}}>
                            <TextField disabled={editpswdhash} onChange={(event) => setPswdhash(event.target.value)} required
                                       fullWidth variant='outlined' value={pswdhash} label={settings[props.lang]['pswd']}/>
                            <Button disabled={!editpswdhash} size='small' color='primary' onClick={() => {setPswdhash(''); setEditPswdhash(false)}}>
                                {settings[props.lang]['edit']}
                            </Button>
                            <Button disabled={editpswdhash} size='small' color='primary' onClick={() => setEditPswdhash(true)}>
                                {settings[props.lang]['save']}
                            </Button>
                            <Button disabled={editpswdhash} size='small' color='primary' onClick={() => {setPswdhash('*******'); setEditPswdhash(true);}}>
                                {settings[props.lang]['abort']}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Typography>
    );
}
