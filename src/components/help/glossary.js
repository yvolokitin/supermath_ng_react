import React from 'react';
import { Typography } from '@material-ui/core';

import {glossary} from './../translations/glossary';
import './help.css';

export default function Glossary(props) {
    return (
        <Typography hidden={props.open === false} component='div' style={{backgroundColor:'#ffffcc'}}>
            <div className='typography_wrapper'>
                <div className='typography_div_wrapper'>
                    <div className='typography_div_title' style={{fontWeight: 'bold'}}>
                        {glossary[props.lang]['title']}
                    </div>

                    <div className='typography_div_title'>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#129355;</span> {glossary[props.lang]['color']}
                    </div>

                    <div className='typography_div_title'>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128291;</span> {glossary[props.lang]['task']}
                    </div>

                    <div className='typography_div_title'>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128203;</span> {glossary[props.lang]['instance']}
                    </div>

                    <div className='typography_div_title'>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span> {glossary[props.lang]['smile']}
                    </div>

                    <div className='typography_div_title'>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span> {glossary[props.lang]['poop']}
                    </div>

                    <div className='typography_div_title'>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127183;</span> {glossary[props.lang]['joker']}
                    </div>

                </div>
            </div>
        </Typography>
    );
}
