import React from 'react';
import {Avatar, Button, Dialog, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { makeStyles } from '@material-ui/core/styles';

import image from './../../images/monsters/Avengers-Iron-Man-icon.png'
import SMTitle from './../dialog/title';

const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        width: '160px',
        height:'160px',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: '2.00rem',
        fontFamily:'Grinched',
        fontVariant:'small-caps',
        color:'green',
        textShadow:'2px 2px 2px black',
    }
}));

/*

*/
export default function Registration(props) {
    const classes = useStyles();

    return (
        <Dialog transitionDuration={600} fullWidth={true} maxWidth='md' open={props.open}>
            <SMTitle title='' onClick={() => props.onClick()}/>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}> <img src={image} alt='User Avatar'/> </Avatar>
    
                <Typography className={classes.title} component="h1" variant="h5">
                    <font style={{color:'orange'}}> SUPERMATH </font>
                    <font style={{marginLeft:'2%',color:'green'}}> REGISTRATION </font>
                </Typography>

                <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth id="firstName" autoComplete="fname" name="firstName" variant="outlined" label="Child First Name" autoFocus/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="lastName" variant="outlined" name="lastName" label="Child Last Name" autoComplete="lname"/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth id="email" label="Email Address" name="email" autoComplete="email"/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, promotions and updates via email."/>
                            </Grid>
                        </Grid>

                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" onClick={() => props.onClick('login')}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
            </div>
    </Dialog>
    );
}
