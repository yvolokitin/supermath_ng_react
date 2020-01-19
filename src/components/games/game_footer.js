﻿import React from 'react';
import './game_footer.css';

const circles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function GameFooter(props) {
    return (
        <div className="game_footer_div">
            {
                circles.map((item, key) => (
                    <svg key={item} height='100' width='100'>
                        <circle cx={50} cy={50} r={16} stroke='black' strokeWidth='3' fill={props.color}/>
                    </svg>
                ))
            }
        </div>
    );
}
