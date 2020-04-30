import React, { useState, useEffect } from 'react';

import Card from './card';
import './tasks.css';

import {white_games, orange_games, green_games,
        navy_games, brown_games, black_games} from './../halpers/programms';

export default function Tasks(props) {
    const [tasks, setTasks] = useState(white_games);

    useEffect(() => {
        if (props.color === 'white') {
            setTasks(white_games);
        } else if (props.color === 'orange') {
            setTasks(orange_games);
        } else if (props.color === 'green') {
            setTasks(green_games);
        } else if (props.color === 'navy') {
            setTasks(navy_games);
        } else if (props.color === 'brown') {
            setTasks(brown_games);
        } else if (props.color === 'black') {
            setTasks(black_games);
        }

    }, [props.color]);

    return (
        <div className='tasks_wrapper' style={{backgroundColor: props.color}}>
            {tasks.map(
                (task) =>
                    <div key={task.id}>
                        <Card id={task.id} color={props.color} src={task.logo} lang={props.lang}/>
                    </div>
                )
            }

        </div>
    );
}
