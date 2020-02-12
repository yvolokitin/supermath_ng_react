import React from 'react';
import {Dialog, TextField, FormControlLabel, Checkbox, Link} from '@material-ui/core';

// date picker
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

// import image from './../../images/monsters/Avengers-Iron-Man-icon.png';
import image from './../../images/help/sign-up.png';
import SMTitle from './../dialog/title';

import './registration.css';

/*
props.open
*/
export default function Registration(props) {
    // const [selectedDate, handleDateChange] = React.useState();
    const [values, setValues] = React.useState({
        name: '',
        surname: '',
        birth: new Date(),
        email: '',
        password: '',
        subscribtion: false,
    });

    const handleChange = prop => event => {
        console.log('handleChange ' + event.target.value);
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <Dialog transitionDuration={600} fullWidth={true} maxWidth='md' scroll="body" open={true}>
            <SMTitle title='' onClick={() => props.onClick()}/>
            <div className='registration_desk'>
                <div className='registration_desk_title'>
                    <img src={image} alt='Registration'/>
                </div>

                <div className='registration_desk_textfield'>
                    <TextField autoFocus required fullWidth variant="outlined" label="Child Name" onChange={handleChange('name')}/>
                </div>

                <div className='registration_desk_textfield'>
                    <TextField fullWidth variant="outlined" label="Child Surname" onChange={handleChange('surname')}/>
                </div>

                <div className='registration_desk_textfield'>
                    <TextField required fullWidth variant="outlined" label="Child Birthday" type="date" defaultValue="2014-01-28">
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DatePicker value={values.birth} onChange={handleChange('birth')}/>
                        </MuiPickersUtilsProvider>
                    </TextField>
                </div>

                <div className='registration_desk_textfield'>
                    <TextField required fullWidth variant="outlined" label="Email Address" onChange={handleChange('email')}/>
                </div>

                <div className='registration_desk_textfield'>
                    <TextField required fullWidth variant="outlined" label="Password" onChange={handleChange('password')}/>
                </div>

                <div className='registration_desk_textfield'>
                    <FormControlLabel control={<Checkbox value={values.subscribtion} color="primary" />} onChange={handleChange('subscribtion')}
                                      label='I want to receive inspiration, promotions and updates via email'/>
                </div>
            </div>

            <div className='registration_desk_button' onClick={() => this.onClose('replay')}>Create account</div>

            <Link href="" style={{marginRight:'5%',float:'right'}} onClick={() => props.onClick('login')}>Already have an account? Sign in</Link>
        </Dialog>
    );
}
