import React from 'react';
import {Grid, TextField, Button} from '@material-ui/core';

/*
    <Settings id={this.props.id} email={this.props.email} user={this.props.user} surname={this.props.surname} age={this.props.age} lang={this.props.lang}/>
*/
export default class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {name: props.user,
                      surname: props.surname,
                      email: props.email,
                      birth: '',
                      pswd: ''};

        console.log('Settings.constructor ' + props.id + ', ' + props.email + ', ' + props.user + ', ' + props.surname + ', ' + props.age);
    }

    render() {
        console.log('this.state.name ' + this.state.name);
        return (
            <div className='settingsboard'>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={6} style={{padding:'3%'}}>
                        <TextField onChange={(event) => {this.setState({name: event.target.value})}} required
                                   fullWidth variant='outlined' label='Name' value={this.state.name}/>
                        <Button size='small' color='primary'>save</Button>
                    </Grid>

                    <Grid item xs={12} sm={6}style={{padding:'3%'}}>
                        <TextField onChange={(event) => {this.setState({name: event.target.value})}} required
                                   fullWidth variant='outlined' label='Surname' value={this.state.surname}/>
                        <Button size='small' color='primary'>save</Button>
                    </Grid>

                    <Grid item xs={12} sm={6}style={{padding:'3%'}}>
                        <TextField onChange={(event) => {this.setState({name: event.target.value})}} required
                                   fullWidth variant='outlined' label='Email' value={this.state.email}/>
                        <Button size='small' color='primary'>save</Button>
                    </Grid>

                    <Grid item xs={12} sm={6}style={{padding:'3%'}}>
                        <TextField onChange={(event) => {this.setState({name: event.target.value})}} required
                                   fullWidth variant='outlined' label='Set New Password' value={this.state.pswd}/>
                        <Button size='small' color='primary'>save</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
