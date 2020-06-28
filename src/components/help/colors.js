import React, { useEffect, useState } from 'react';

import { Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';

import {colors} from './../translations/colors';
import './colors.css';

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

export default function Colors(props) {
    const [hidden, setHidden] = useState(true);

    const [expanded, setExpanded] = React.useState('white');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const levels = [
        {id: 'white', content: 'white-content', header: 'white-header', name: colors[props.lang]['white'], body: colors[props.lang]['white_text'], title: colors[props.lang]['white_body']},
        {id: 'orange', content: 'orange-content', header: 'orange-header', name: colors[props.lang]['orange'], body: colors[props.lang]['orange_text'], title: colors[props.lang]['orange_body']},
        {id: 'green', content: 'green-content', header: 'green-header', name: colors[props.lang]['green'], body: colors[props.lang]['green_text'], title: colors[props.lang]['green_body']},
        {id: 'navy', content: 'navy-content', header: 'navy-header', name: colors[props.lang]['navy'], body: colors[props.lang]['navy_text'], title: colors[props.lang]['navy_body']},
        {id: 'brown', content: 'brown-content', header: 'brown-header', name: colors[props.lang]['brown'], body: colors[props.lang]['brown_text'], title: colors[props.lang]['brown_body']},
        {id: 'black', content: 'black-content', header: 'black-header', name: colors[props.lang]['black'], body: colors[props.lang]['black_text'], title: colors[props.lang]['black_body']},
    ];

    useEffect(() => {
        console.log('Colors.props.open ' + props.open);
        if (props.open) {
            setHidden(false);
        } else {
            setHidden(true);
        }

    }, [props.open]);

    /*
        <ExpansionPanelSummary aria-controls="white-content" id="white-header">
    */
    return (
        <Typography hidden={hidden} component='div' className='typography_wrapper'>
            <div className='colors_wrapper'>
                {levels.map((level) =>
                    <ExpansionPanel square key={level.header} expanded={expanded === level.id} onChange={handleChange(level.id)}>
                        <ExpansionPanelSummary aria-controls={level.content} id={level.header}>
                            <Typography> {level.name} </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography> {level.body} </Typography>
                        </ExpansionPanelDetails>
                        <ExpansionPanelDetails>
                            <Typography> {level.title} </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )}
            </div>
        </Typography>
    );
}
