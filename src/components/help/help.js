import React, { useState } from 'react';
import { Dialog, Slide, Typography } from '@material-ui/core';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';

import Colors from './colors';
import SignIn from './signin';
import Glossary from './glossary';
import Issues from './issues';

import './help.css';
import {help} from './../translations/help';

const SCREEN = {
    NONE: 0,
    COLORS: 1,
    GLOSSARY: 2,
    SIGNIN: 3,
    PROFILE: 4,
    ISSUES: 5,
}

function HelpTab(props) {
    return (
        <>
            {(props.selected) ? (
                <div className='help_tab_wrapper' onClick={() => props.onClick(props.id)} style={{boxShadow: '0 3px 1px -1px grey'}}>
                    <font style={{color: 'green', transform: 'scale(1.07)'}}> {props.name} </font>
                </div>
            ) : (
                <div className='help_tab_wrapper' onClick={() => props.onClick(props.id)}>
                    <font> {props.name} </font>
                </div>
            )}
        </>
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

export default function Help(props) {
    const [screen, setScreen] = useState(SCREEN.GLOSSARY);

    const tabs = [
        {id: 1, name: help[props.lang]['colors']},
        {id: 2, name: help[props.lang]['glossary']},
        {id: 3, name: help[props.lang]['signin']},
        {id: 4, name: help[props.lang]['profile']},
        {id: 5, name: help[props.lang]['issues']},
    ];

    function onHelpTabChange(tab_id) {
        console.log('Help.onHelpTabChange ' + tab_id);
        setScreen(tab_id);
    }

    // 
    return (
        <Dialog open={props.open} fullScreen={true} onClose={() => props.onClose()}
            TransitionComponent={Transition} transitionDuration={800}>

            <Typography component='div' style={{height: '100%', width: '100%', backgroundColor:'#ffffcc'}}>
                <SMTitle title='' onClick={() => props.onClose()}/>
                <ColorLine/>
                <div className='help_wrapper'>
                    <div className='help_tabs_wrapper'>
                        {tabs.map(
                            (tab) => <HelpTab key={tab.id}
                                        selected={screen === tab.id}
                                        id={tab.id} name={tab.name}
                                        onClick={onHelpTabChange}/>
                        )}
                    </div>
                </div>

                <Colors open={screen === SCREEN.COLORS} lang={props.lang}/>
                <SignIn open={screen === SCREEN.SIGNIN} lang={props.lang}/>
                <Glossary open={screen === SCREEN.GLOSSARY} lang={props.lang}/>
                <Issues open={screen === SCREEN.ISSUES} lang={props.lang}/>

            </Typography>
        </Dialog>
    );
}
