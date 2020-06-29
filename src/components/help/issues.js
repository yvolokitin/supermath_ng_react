import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';

import {issues} from './../translations/issues';
import './help.css';

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        width: '100%',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
            fontWeight: 'bold',
        },
    },
    expanded: {},
}) (MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        fontWeight: 'bold',
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
             margin: '12px 0',
        },
    },
    expanded: {},
}) (MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
})) (MuiExpansionPanelDetails);

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
                                <Typography style={{textAlign: 'justify'}}> {issues[props.lang][question.text]} </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )}
                </div>
            </div>
        </Typography>
    );
}
