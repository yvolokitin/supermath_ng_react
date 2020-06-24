import React, { useEffect, useState } from 'react';
import { Dialog, Slide, Typography } from '@material-ui/core';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';

import './help.css';
import {help} from './../translations/help';

import image from './../../images/help/belts.jpg';

function HelpTab(props) {
    return (
        <div className='help_tab_wrapper' onClick={() => props.onClick(props.id)} style={{boxShadow: '0 11px 1px -1px black'}}>
            {(props.selected) ? (
                <font style={{color: 'green', transform: 'scale(1.1)'}}> {props.name} </font>
            ) : (
                <font> {props.name} </font>
            )}
        </div>
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

export default function Help(props) {
    const tabs = [
        {id: 1, name: help[props.lang]['colors']},
        {id: 2, name: help[props.lang]['signin']},
        {id: 3, name: help[props.lang]['account']},
        {id: 4, name: help[props.lang]['glossary']},
    ];

    useEffect(() => {
        console.log('Help.useEffect ' + props.open + ', props.lang ' + props.lang);

    }, [props.open]);

    function onHelpTabChange(tab_id) {

    }

    // 
    return (
        <Dialog open={props.open} fullScreen={true} onClose={() => props.onClose()}
            TransitionComponent={Transition} transitionDuration={800}>

            <div className='help_wrapper'>
                <SMTitle title='' onClick={() => props.onClose()}/>
                <ColorLine/>

                <div className='help_tabs_wrapper'>
                    {tabs.map(
                        (tab) => <HelpTab key={tab.name}
                                    id={tab.id} name={tab.name}
                                    onClick={onHelpTabChange}/>
                    )}
                </div>

            </div>

        </Dialog>
    );
}
