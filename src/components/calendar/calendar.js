﻿import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import {calendar} from './../translations/calendar';
import './calendar.css';

const monthes = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const weekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

export default function Calendar(props) {
    const [results, setResults] = useState([]);
    const [current, setCurrentMonth] = useState(0);
    const [year, set_year] = useState(0);
    const [days, setDays] = useState([]);

    /**
     * Set number of days per exact month-year
     * have to increment month due to Date().getMonth() returns month in range 0-11
     */
    const set_month_days = useCallback((month, year) => {
        // console.log('set_month_days, month ' + month + ', year ' + year);
        var days_num = [], number = new Date(year, month + 1, 0).getDate();

        // filling array with empty 
        var counter = 0;        
        while (counter < (weekdays.length - 1)) {
            var first = (new Date(year, month, 1)).getDay();
            if (weekdays[first] !== weekdays[counter + 1]) {
                days_num[counter] = {
                    'id': 'fake_day_' + (counter+1),
                    'date': '',
                    'day': '',
                    'name': '',
                };
                counter++;
            } else {
                break;
            }
        }

        for (var i = 0; i < number; i++) {
            var date = new Date(year, month, i+1);
            // getDay() is an integer corresponding to the day of the week:
            // 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
            var day_name = weekdays[date.getDay()];
            var name = calendar[props.lang][day_name];
            var day_id = date.toString() + ', ' + i;

            days_num[(i+counter)] = {
                'id': day_id,
                'date': date,
                'day': (i+1),
                'name': name,
            };
            // console.log('day_num ' + i + ', name ' + name);
        }

        setDays(days_num);
        setCurrentMonth(month);
    }, [props.lang] )

    const onResultsUpdate = useCallback((response) => {
        var array = [];
        for (var name in response.data) {
            var date = new Date(response.data[name]['date']);
            console.log('Calendar.onResultsUpdate received ' + date.getDate() + ': ' + response.data[name]['percent']);

            var data = {
                'date': date,
                'day': date.getDate(),
                'passed': response.data[name]['passed'],
                'failed': response.data[name]['failed'],
                'percent': response.data[name]['percent'],
                'duration': response.data[name]['duration'],
                'rate': response.data[name]['rate'],
                'belt': response.data[name]['belt'],
                'task': response.data[name]['task'],
            };
            array.push(data);
        }

        setResults(array);
    }, [ ])

    const onResultsError = useCallback((error) => {
        console.log('Header.onScoresError ' + error);
    }, [ ])

    /*
         = request.json.get('user_id')
        pswdhash = request.json.get('pswdhash')
        month = request.json.get('month')
    */
    const get_results = useCallback(() => {
        var post_data = {
            'user_id': props.id,
            'pswdhash': props.pswdhash,
            'month': current,
        };
        axios.post('http://supermath.xyz:3000/api/results', post_data)
             .then(onResultsUpdate)
             .catch(onResultsError);

    }, [current, props.id, props.pswdhash, onResultsUpdate, onResultsError])

    /**
     * useEffect is Effect Hook for componentDidMount and componentDidUpdate
     */
    useEffect(() => {
        var current_year = (new Date()).getFullYear();
        var current_month = (new Date()).getMonth();

        set_month_days(current_month, current_year);
        set_year(current_year);

        setResults([]);

        if (props.id > 0) {
            get_results();
        }

    }, [props.lang, props.id, set_month_days, get_results]);

    function onMonthChange(navigation) {
        if (navigation > 0) { // next month
            if (current > (monthes.length-2)) {
                set_month_days(0, year + 1);
                set_year(year + 1);
            } else {
                set_month_days(current + 1, year);
            }
        } else { // previous month
            if (current > 0) {
                set_month_days(current - 1, year);
            } else {
                set_month_days(11, year - 1);
                set_year(year - 1);
            }
        }
    }

    /*
results.length > 0
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
                {
                    days.map((day, index) => (
                        <li key={day.id}>
                            {(results.some(result => result.day === day.day)) ? (
                                <font style={{color:'green'}}>{day.day}</font>
                            ) : (
                                <font style={{color:'red'}}>{day.day}</font>
                            )}
                        </li>
                    ))
                }
            </div>
        </>
    );
}
