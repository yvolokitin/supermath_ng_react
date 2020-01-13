import React from 'react';
import './game_footer.css';

export default function GameFooter(props) {
    return (
        <div className="game_footer_div">
            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="3" fill="red"/>
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="3" fill="green"/>
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="3" fill="yellow"/>
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="3" fill="gray"/>
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="3" fill="blue"/>
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="3" fill="orange"/>
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="3" fill="black"/>
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="3" fill="pink"/>
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="3" fill="violet"/>
            </svg>
        </div>
    );
}
