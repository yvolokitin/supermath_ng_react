import React from 'react';
import {DialogContent, DialogActions, Typography, Dialog, Card, CardMedia, Button} from '@material-ui/core';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import CancelIcon from '@material-ui/icons/Cancel';

import SMTitle from "./../dialog/title";

import world from './../../images/world.jpg';

export default function Language(props) {
    const [value, setValue] = React.useState(props.lang);
    const handleChange = event => {
        setValue(event.target.value);
    };

    return (
        <Dialog onClose={() => props.onClose()} transitionDuration={500} open={props.open} scroll='body'>
            <SMTitle title='' onClick={() => props.onClose()}/>

            <Typography gutterBottom style={{margin:'3%',color:'green',fontFamily:'Grinched',fontSize:'2.5rem',textAlign:'center',textShadow:'1px 1px 2px black',lineHeight:'0.9'}}>
                Select your language
            </Typography>

            <Card style={{margin:'5%',display:'flex',flexDirection:'column',fontWeight:'bold'}}>
                <CardMedia component='img' style={{boder:'3px solid black'}} alt='World map' height='140' src={world}/>
            </Card>

            <RadioGroup value={value} onChange={handleChange}>
                <FormControlLabel value='en' control={<Radio />} label='English (GB and US)'/>
                <FormControlLabel value='nl' control={<Radio />} label='Dutch / Nederlands'/>
                <FormControlLabel value='ru' control={<Radio />} label='Russian / Русский'/>
            </RadioGroup>

        </Dialog>
    );
}
