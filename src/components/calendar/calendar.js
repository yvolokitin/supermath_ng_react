import React, { useEffect, useState } from 'react';
//import axios from 'axios';

import {calendar} from './../translations/calendar';
import './calendar.css';

const monthes = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

export default function Calendar(props) {
    // const [loading, setLoading] = useState(true);
    const [month, setCurMonth] = useState();
    const [year, setCurYear] = useState();

    useEffect(() => {
        setCurMonth(monthes[(new Date()).getMonth()]);
        setCurYear((new Date()).getFullYear());

    }, [props.lang, props.id]);

    /*
                    
    */
    return (
        <>
            <div className='calendar_month'>
                <div className='calendar_prev'>&#10094;</div>
                <div className='calendar_month_month'> {calendar[props.lang][month]} </div>
                <div className='calendar_month_year'> {year} </div>
                <div className='calendar_next'>&#10095;</div>
            </div>

            <div className='calendar_weekdays'>
                <li> {calendar[props.lang]['MO']} </li>
                <li> {calendar[props.lang]['TU']} </li>
                <li> {calendar[props.lang]['WE']} </li>
                <li> {calendar[props.lang]['TH']} </li>
                <li> {calendar[props.lang]['FR']} </li>
                <li> {calendar[props.lang]['SA']} </li>
                <li> {calendar[props.lang]['SU']} </li>
            </div>
        </>
    );
}
