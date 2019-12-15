import React from 'react';
import {Dialog, DialogContent, Avatar, Typography, TextField, Grid, Link, Button, Checkbox, FormControlLabel} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {red} from 'material-ui/colors';

export default function SMLogin(props) {
    return (
        <Dialog onClose={() => props.onClick()} fullWidth={true} open={props.open}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar style={{margin: 10, width: 60, height: 60, backgroundColor: red[500] }}><LockOutlinedIcon /></Avatar>
                <Typography component="h1" variant="h5">Sign In</Typography>
                <DialogContent dividers>
                    <form noValidate>
                        <TextField variant="outlined" margin="normal" required fullWidth id="email"
                                   label="Email Address" name="email" autoComplete="email" autoFocus/>
                        <TextField variant="outlined" margin="normal" required fullWidth id="password"
                                   label="Password" name="password" type="password" autoComplete="current-password"/>
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>

                        <Button type="submit" fullWidth variant="contained" color="primary">Sign In</Button>
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
