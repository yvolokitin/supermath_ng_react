import React, { useEffect, useState } from 'react';
//import axios from 'axios';

import {calendar} from './../translations/calendar';
import './calendar.css';

const monthes = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

var getDaysInMonth = function(month, year) {
    var num = new Date(year, month, 0).getDate();
    // console.log('' + year + '.' + month + ' -> ' + num);
    return num;
};

export default function Calendar(props) {
    // const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);
    const [year, setCurYear] = useState(0);
    const [days, setDays] = useState(0);

    useEffect(() => {
        var current_year = (new Date()).getFullYear();
        var current_month = (new Date()).getMonth();
        var get_days = getDaysInMonth(current_month+1, current_year)

        setDays(get_days);
        setCurrent((new Date()).getMonth());
        setCurYear((new Date()).getFullYear());

        console.log('current_year ' + current_year + ', current_month ' + current_month + ' -> ' + get_days);

    }, [props.lang, props.id]);

    function onMonthChange(navigation) {
        if (navigation > 0) { // next month
            if (current > (monthes.length-2)) {
                setDays(getDaysInMonth(0, year + 1));
                setCurYear(year + 1);
                setCurrent(0);

            } else {
                setDays(getDaysInMonth(current + 1, year));
                setCurrent(current + 1);
            }
        } else { // previous month
            if (current > 0) {
                setDays(getDaysInMonth(current - 1, year));
                setCurrent(current - 1);
            } else {
                setDays(getDaysInMonth(11, year - 1));
                setCurrent(11);
                setCurYear(year - 1);
            }
        }
    }

    /*
    {scores.map((user, index)
    */
    return (
        <>
            <div className='calendar_wrapper'>
                <div className='calendar_prev_next' style={{float: 'left'}} onClick={() => onMonthChange(-1)}>&#10094;</div>

                <div className='calendar_month' style={{float: 'left'}}>
                    {calendar[props.lang][monthes[current]]} <br/> {year}
                </div>
                
                <div className='calendar_prev_next' style={{float: 'right'}} onClick={() => onMonthChange(1)}>&#10095;</div>
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

            <div className='calendar_days'>
                {days}
            </div>
        </>
    );
}
