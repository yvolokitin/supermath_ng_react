import React from 'react';
import {Dialog, Card, CardMedia, Button} from '@material-ui/core';
import {Radio, RadioGroup, FormControlLabel} from '@material-ui/core';

import axios from 'axios';

import SMTitle from "./../dialog/title";

import world from './../../images/world.jpg';
import './language.css';

export default function Language(props) {
    const [value, setValue] = React.useState(props.lang);
    const handleChange = event => {
        setValue(event.target.value);
        console.log('event.target.value: ' + event.target.value);
    };

    const onSave = () => {
        console.log('onClose value: ' + value);
        props.onClose(value);

        if (localStorage.getItem('user_id') !== null) {
            // update user failed counter in header and send to server
            var post_data = {'user_id': localStorage.getItem('user_id'),
                             'operation': 'lang',
                             'lang': value};
                axios.post('http://supermath.xyz:3000/api/update', post_data);
        } else {
            console.log('Language.onSave: do not sent language change \'' + value + '\'');
        }
    }

/*
                <FormControlLabel value='pl' control={<Radio />} label='Poland / Polish'/>
*/
    return (
        <Dialog onClose={() => props.onClose()} transitionDuration={500} open={props.open} scroll='body'>
            <SMTitle title='Select your language' className='language_title' onClick={() => props.onClose()}/>

            <Card style={{marginLeft:'5%',marginRight:'5%',display:'flex',flexDirection:'column'}}>
                <CardMedia component='img' alt='World map' height='140' src={world}/>
            </Card>

            <RadioGroup value={value} onChange={handleChange} className='language_selector' style={{border:'1px solid grey'}}>
                <FormControlLabel value='en' control={<Radio />} label='English (GB and US)'/>
                <FormControlLabel value='de' control={<Radio />} label='German / Deutsch'/>
                <FormControlLabel value='fr' control={<Radio />} label='French / Français'/>
                <FormControlLabel value='es' control={<Radio />} label='Spanish / Espanol'/>
                <FormControlLabel value='it' control={<Radio />} label='Italian / Italiano'/>
                <FormControlLabel value='nl' control={<Radio />} label='Nederlands / Dutch'/>
                <FormControlLabel value='ru' control={<Radio />} label='Russian / Русский'/>
            </RadioGroup>

            <Card style={{margin:'5%',display:'flex',flexDirection:'column'}}>
                <Button variant='contained' onClick={onSave}>Save</Button>
            </Card>
        </Dialog>
    );
}
