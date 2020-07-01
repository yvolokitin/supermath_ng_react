import React from 'react';
import { Typography } from '@material-ui/core';

import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, } from './consts';
import {signin} from './../translations/signin';
import './help.css';

export default function SignIn(props) {
    const [expanded, setExpanded] = React.useState('another_child');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const questions = [
        {id: 'another_child', content: 'another_child-content', header: 'another_child-header', text: 'another_child_text', color: 'white'},
        {id: 'benefits', content: 'benefits-content', header: 'benefits-header', text: 'benefits_text', color: 'white'},
        {id: 'why', content: 'why-content', header: 'why-header', text: 'why_text', color: 'white'},
        {id: 'unregisterd', content: 'unregisterd-content', header: 'unregisterd-header', text: 'unregisterd_text', color: 'white'},
        {id: 'parent', content: 'parent-content', header: 'parent-header', text: 'parent_text', color: 'white'},
    ];
    /*
    */
    return (
        <Typography hidden={props.open === false} component='div' style={{backgroundColor:'#ffffcc'}}>
            <div className='typography_wrapper'>
                <div className='typography_div_wrapper'>
                    <div className='typography_div_title' style={{fontWeight: 'bold'}}>
                        {signin[props.lang]['signin']}
                    </div>

                    {questions.map((question) =>
                        <ExpansionPanel square key={question.header} expanded={expanded === question.id} onChange={handleChange(question.id)}>
                            <ExpansionPanelSummary aria-controls={question.content} id={question.header}>
                                <Typography> {signin[props.lang][question.id]} </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{backgroundColor: question.color}}>
                                <Typography> {signin[props.lang][question.text]} </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )}
                </div>
            </div>
        </Typography>
    );
}
