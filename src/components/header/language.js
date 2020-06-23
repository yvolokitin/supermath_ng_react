import React, {useState} from 'react';
import {Dialog, Slide, Card, CardMedia, Button} from '@material-ui/core';
import {Radio, RadioGroup, FormControlLabel} from '@material-ui/core';

import {languages} from './../halpers/languages';

import SMTitle from "./../dialog/title";
import world from './../../images/world.jpg';
import './language.css';

function LanguageImage(props) {
    return (
        <>
            {(props.selected) ? (
                <div className='language_selector_row_selected'>
                    <img src={props.src} alt={props.name} onContextMenu={(e) => e.preventDefault()}/>
                </div>
            ) : (
                <div className='language_selector_row' onClick={() => props.onLangUpdate(props.name)}>
                    <img src={props.src} alt={props.name}/>
                </div>
            )}
        </>
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='left' ref={ref} {...props} />;
});

export default function Language(props) {
    const [value, setValue] = useState(props.lang);
    const handleChange = event => {
        // console.log('event.target.value: ' + event.target.value);
        setValue(event.target.value);
    };

    function onLangChange(lang) {
        console.log('Language.onLangChange ' + lang);
    }

    return (
        <Dialog open={props.open}
            onClose={() => props.onClose(value)}
            TransitionComponent={Transition}
            transitionDuration={800}
            fullScreen={props.fullScreen}>

            <SMTitle title='Select your language' className='language_title' onClick={() => props.onClose(value)}/>

            <Card style={{marginLeft:'5%',marginRight:'5%',display:'flex',flexDirection:'column'}}>
                <CardMedia component='img' alt='World map' height='140' src={world}/>
            </Card>

            <div className='language_selector_wrapper'>
                {languages.map((language) =>
                    <LanguageImage key={language.name}
                        name={language.name}
                        src={language.image}
                        selected={props.lang === language.name}
                        onClick={onLangChange}/>
                )}

            </div>

            <RadioGroup value={value} onChange={handleChange} className='language_selector' style={{border:'1px solid grey'}}>
                <FormControlLabel value='en' control={<Radio />} label='English (GB and US)'/>
                <FormControlLabel value='nl' control={<Radio />} label='Nederlands / Dutch'/>
                <FormControlLabel value='ru' control={<Radio />} label='Russian / Русский'/>
                <FormControlLabel value='de' control={<Radio />} label='German / Deutsch'/>
                <FormControlLabel value='fr' control={<Radio />} label='French / Français'/>
                <FormControlLabel value='es' control={<Radio />} label='Spanish / Espanol'/>
                <FormControlLabel value='it' control={<Radio />} label='Italian / Italiano'/>
            </RadioGroup>

            <Card style={{margin:'5%',display:'flex',flexDirection:'column'}}>
                <Button variant='contained' onClick={() => props.onClose(value)}>Save</Button>
            </Card>
        </Dialog>
    );
}
