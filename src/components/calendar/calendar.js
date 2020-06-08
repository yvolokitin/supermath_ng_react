import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import {calendar} from './../translations/calendar';
import './calendar.css';

const monthes = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const weekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

export default function Calendar(props) {
    const [results, set_results] = useState([]);
    const [month, set_month] = useState((new Date()).getMonth());
    const [year, set_year] = useState((new Date()).getFullYear());
    const [days, set_days] = useState([]);

    const onResultsUpdate = useCallback((response) => {
        var array = [];
        for (var name in response.data) {
            var date = new Date(response.data[name]['date']);
            // console.log('Calendar.onResultsUpdate received ' + date.getDate() + ': ' + response.data[name]['percent']);

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

        set_results(array);
    }, [ ])

    const onResultsError = useCallback((error) => {
        console.log('Header.onScoresError ' + error);
    }, [ ])

    const get_results = useCallback((new_month, new_year) => {
        // console.log('get_results');
        var post_data = {
            'user_id': props.id,
            'pswdhash': props.pswdhash,
            // due to getMonth returns value in range 0..11
            'month': new_month+1,
            'year': new_year,
        };
        axios.post('http://supermath.xyz:3000/api/results', post_data)
            .then(onResultsUpdate)
            .catch(onResultsError);

    }, [props.id, props.pswdhash, onResultsUpdate, onResultsError])

    /**
     * Set number of days per exact month-year
     * have to increment month due to Date().getMonth() returns month in range 0-11
     */
    const set_month_days = useCallback((new_month, new_year) => {
        // console.log('set_month_days, new_month ' + new_month + ', old_month ' + month + ', new_year ' + new_year);
        var days_num = [], number = new Date(new_year, new_month+1, 0).getDate();

        // filling array with empty 
        var counter = 0;        
        while (counter < (weekdays.length - 1)) {
            var first = (new Date(new_year, new_month, 1)).getDay();
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
            var date = new Date(new_year, new_month, i+1);
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
        }

        set_days(days_num);

    }, [props.lang])

    /**
     * useEffect is Effect Hook for componentDidMount and componentDidUpdate
     */
    useEffect(() => {
        console.log('useEffect -> month ' + month + ', year ' + year);

        set_month(month);
        set_year(year);
        set_month_days(month, year);

        if (props.id > 0) {
            get_results(month, year);
        } else {
            set_results([]);
        }

    }, [props.lang, props.id, month, year, set_month_days, get_results]);

    function on_month(navigation) {
        if (navigation > 0) { // next month
            if (month > (monthes.length-2)) {
                set_month(0);
                set_year(year + 1);

            } else {
                set_month(month + 1);
            }
        } else { // previous month
            if (month > 0) {
                set_month(month - 1);
            } else {
                set_month(11);
                set_year(year - 1);
            }
        }
    }

    /*
                                    {(calendar_days_cell_box) ? () : ()}
    */
    return (
        <>
            <div className='calendar_wrapper'>
                <div className='calendar_prev_next' style={{float: 'left'}} onClick={() => on_month(-1)}>&#10094;</div>

                <div className='calendar_month' style={{float: 'left'}}>
                    {calendar[props.lang][monthes[month]]} <br/> {year}
                </div>
                
                <div className='calendar_prev_next' style={{float: 'right'}} onClick={() => on_month(1)}>&#10095;</div>
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
                        <div className='calendar_days_cell' key={day.id}>
                            {(results.some(result => result.day === day.day)) ? (
                                <div className='calendar_days_cell_does'>
                                    <div className='calendar_days_cell_circle'>
                                        {day.day}
                                    </div>
                                </div>
                            ) : (
                                <div className='calendar_days_cell_does'>
                                    <div className='calendar_days_cell_empty'>
                                        {day.day}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
        </>
    );
}
