import React from 'react';

/*
    tbd: somehow via array in Reactjs
    const circles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
*/
export default function SMCircles(props) {
    return (
        <>
            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="1" fill={props.color} />
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="1" fill={props.color} />
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="1" fill={props.color} />
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="1" fill={props.color} />
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="1" fill={props.color} />
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="1" fill={props.color} />
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="1" fill={props.color} />
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="1" fill={props.color} />
            </svg>

            <svg height="100" width="100">
                <circle cx={50} cy={50} r={16} stroke="black" strokeWidth="1" fill={props.color} />
            </svg>

        </>
    );
}
