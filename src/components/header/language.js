import React from 'react';
import {Dialog, Slide, Card, Button} from '@material-ui/core';

import {language} from './../translations/language';
import {languages} from './../halpers/languages';

import Title from './../title/title';
import ColorLine from './../line/line';

import image_world from './../../images/world.jpg';
import image_lang from './../../images/world.jpg';

import './language.css';

function LanguageImage(props) {
    return (
        <>
            {(props.selected) ? (
                <div className='language_selector_row_selected'>
                    <div className='language_selector_row_image'>
                        <img src={props.src} alt={props.name} onContextMenu={(e) => e.preventDefault()}/>
                    </div>

                    <div className='language_selector_row_label'>
                        {props.label}
                    </div>
                </div>
            ) : (
                <div className='language_selector_row' onClick={() => props.onLanguageChange(props.name)}>
                    <div className='language_selector_row_image'>
                        <img src={props.src} alt={props.name}/>
                    </div>

                    <div className='language_selector_row_label'>
                        {props.label}
                    </div>
                </div>
            )}
        </>
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='left' ref={ref} {...props} />;
});

const STATUS = {
    NONE: 0,
    LANG: 10,
}

export default function Language(props) {
    function onLanguageChange(lang) {
        console.log('Language.onLangChange ' + lang);
        props.onUpdate(STATUS.NONE, lang);
    }

    return (
        <Dialog open={props.open} onClose={() => props.onUpdate(STATUS.NONE, props.lang)}
            fullScreen={props.width<820} fullWidth={true} maxWidth='sm' scroll='body'
            TransitionComponent={Transition} transitionDuration={800}>

            <Title title={language[props.lang]['title']} src={image_lang} onClose={() => props.onUpdate(STATUS.NONE, props.lang)} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <div className='language_selector_image_map'>
                <img src={image_world} alt='World Map' onContextMenu={(e) => e.preventDefault()}/>
            </div>

            <div className='language_selector_wrapper'>
                {languages.map((lang) =>
                    <LanguageImage key={lang.name}
                        name={lang.name}
                        src={lang.image}
                        label={lang.label}
                        selected={props.lang === lang.name}
                        onLanguageChange={onLanguageChange}/>
                )}

            </div>

            <Card className='language_selector_btn'>
                <Button variant='contained' onClick={() => props.onUpdate(STATUS.NONE, props.lang)}>
                    {language[props.lang]['close']}
                </Button>
            </Card>
        </Dialog>
    );
}
