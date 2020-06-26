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

    useEffect(() => {
        console.log('Colors.props.open ' + props.open);
        if (props.open) {
            setHidden(false);
        } else {
            setHidden(true);
        }

    }, [props.open]);

    const colors = [
        {id: 'white', name: colors[props.lang]['white'], body: colors[props.lang]['white_body'], title: colors[props.lang]['white_title']},
        {id: 'orange', name: colors[props.lang]['orange'], body: colors[props.lang]['orange_body'], title: colors[props.lang]['orange_title']},
        {id: 'green', name: colors[props.lang]['green'], body: colors[props.lang]['green_body'], title: colors[props.lang]['green_title']},
        {id: 'navy', name: colors[props.lang]['navy'], body: colors[props.lang]['navy_body'], title: colors[props.lang]['navy_title']},
        {id: 'brown', name: colors[props.lang]['brown'], body: colors[props.lang]['brown_body'], title: colors[props.lang]['brown_title']},
        {id: 'black', name: colors[props.lang]['black'], body: colors[props.lang]['black_body'], title: colors[props.lang]['black_title']},
    ];

    /*
                    <ExpansionPanelSummary aria-controls="white-content" id="white-header">
    */
    return (
        <Typography hidden={hidden} component='div'>
            {props.colors.map((color) =>
                <ExpansionPanel square expanded={expanded === color.id} onChange={handleChange(color.id)}>
                    <ExpansionPanelSummary aria-controls="white-content" id="white-header">
                        <Typography> {color.name} </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography> {color.body} </Typography>
                        <Typography> {color.title} </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )}
        </Typography>
    );
}
