import React from 'react';
import { Typography } from '@material-ui/core';

import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, } from './consts';
import {colors} from './../translations/colors';
import './help.css';

export default function Colors(props) {
    const [expanded, setExpanded] = React.useState('white');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const levels = [
        {id: 'white', content: 'white-content', header: 'white-header', text: 'white_text', body: 'white_body', color: '#f2f2f2'},
        {id: 'orange', content: 'orange-content', header: 'orange-header', text: 'orange_text', body: 'orange_body', color: '#ffe0b3'},
        {id: 'green', content: 'green-content', header: 'green-header', text: 'green_text', body: 'green_body', color: '#b3ffb3'},
        {id: 'navy', content: 'navy-content', header: 'navy-header', text: 'navy_text', body: 'navy_body', color: '#b3b3ff'},
        {id: 'brown', content: 'brown-content', header: 'brown-header', text: 'brown_text', body: 'brown_body', color: '#dfbf9f'},
        {id: 'black', content: 'black-content', header: 'black-header', text: 'black_text', body: 'black_body', color: '#bfbfbf'},
        {id: 'tasks', content: 'tasks-content', header: 'tasks-header', text: 'tasks_text', body: 'tasks_body', color: '#bfbfbf'},
    ];

    /*
    */
    return (
        <Typography hidden={props.open === false} component='div' style={{backgroundColor:'#ffffcc'}}>
            <div className='typography_wrapper'>
                <div className='typography_div_wrapper'>
                    <div className='typography_div_title'>
                        {colors[props.lang]['title']}
                    </div>

                    {levels.map((level) =>
                        <ExpansionPanel square key={level.header} expanded={expanded === level.id} onChange={handleChange(level.id)}>
                            <ExpansionPanelSummary aria-controls={level.content} id={level.header}>
                                <Typography> {colors[props.lang][level.id]} </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{backgroundColor: level.color}}>
                                <Typography> {colors[props.lang][level.text]} </Typography>
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails style={{backgroundColor: level.color}}>
                                <Typography> {colors[props.lang][level.body]} </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )}
                </div>
            </div>
        </Typography>
    );
}
