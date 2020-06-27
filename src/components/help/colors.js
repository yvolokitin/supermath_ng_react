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
        // border: '1px solid rgba(0, 0, 0, .125)',
        border: '1px solid black',
        width: '90%',
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
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
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
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

export default function Colors(props) {
    const [hidden, setHidden] = useState(true);

    const [expanded, setExpanded] = React.useState('white');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const levels = [
        {id: 'white', header: 'white_header', name: colors[props.lang]['white'], body: colors[props.lang]['white_text'], title: colors[props.lang]['white_body']},
        {id: 'orange', header: 'orange_header', name: colors[props.lang]['orange'], body: colors[props.lang]['orange_text'], title: colors[props.lang]['orange_body']},
        {id: 'green', header: 'green_header', name: colors[props.lang]['green'], body: colors[props.lang]['green_text'], title: colors[props.lang]['green_body']},
        {id: 'navy', header: 'navy_header', name: colors[props.lang]['navy'], body: colors[props.lang]['navy_text'], title: colors[props.lang]['navy_body']},
        {id: 'brown', header: 'brown_header', name: colors[props.lang]['brown'], body: colors[props.lang]['brown_text'], title: colors[props.lang]['brown_body']},
        {id: 'black', header: 'black_header', name: colors[props.lang]['black'], body: colors[props.lang]['black_text'], title: colors[props.lang]['black_body']},
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
                    <ExpansionPanelSummary id={level.header}>
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
