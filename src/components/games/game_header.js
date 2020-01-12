import React from 'react';
import './game_header.css';

export default function GameHeader(props) {
    return (
        <div className="games_header_div">
            <div className="games_header_div_left" onClick={() => props.onClick()}>
                SUPERMATH
            </div>
            <div className="games_header_div_right">
                <font style={{color: 'black'}}>{props.counter}</font> &nbsp; &#128279; &nbsp;
                <font style={{color: 'green'}}>{props.passed}</font> &nbsp; &#128515; &nbsp;
                <font style={{color: 'red'}}>{props.failed}</font> &nbsp; &#128169;
            </div>
        </div>
    );
}
