import React from 'react';
import { Typography } from '@material-ui/core';

import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, } from './consts';
import {issues} from './../translations/issues';
import './help.css';

export default function Issues(props) {
    const [expanded, setExpanded] = React.useState('issues');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const questions = [
        {id: 'issues', content: 'issues-content', header: 'issues-header', text: 'issues_text', color: '#f2f2f2'},
        {id: 'techreq', content: 'techreq-content', header: 'techreq-header', text: 'techreq_text', color: '#f2f2f2'},
        {id: 'clear', content: 'clear-content', header: 'clear-header', text: 'clear_text', color: '#f2f2f2'},
        {id: 'address', content: 'address-content', header: 'address-header', text: 'address_text', color: '#f2f2f2'},

    ];

    /*
    */
    return (
        <Typography hidden={props.open === false} component='div'>
            <div className='typography_wrapper'>
                <div className='typography_div_wrapper'>
                    {questions.map((question) =>
                        <ExpansionPanel square key={question.header} expanded={expanded === question.id} onChange={handleChange(question.id)}>
                            <ExpansionPanelSummary aria-controls={question.content} id={question.header}>
                                <Typography> {issues[props.lang][question.id]} </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{backgroundColor: question.color}}>
                                <Typography> {issues[props.lang][question.text]} </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )}
                </div>
            </div>
        </Typography>
    );
}
