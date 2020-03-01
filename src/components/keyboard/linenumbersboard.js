import React from 'react';
import './linenumbersboard.css';

export default function LineNumbersBoard(props) {
    return (
        <div className='linekeyboard'>
            <button id='zero' onClick={props.onDigit}>0</button>
            <button id='one' onClick={props.onDigit}>1</button>
            <button id='two' onClick={props.onDigit}>2</button>
            <button id='three' onClick={props.onDigit}>3</button>
            <button id='four' onClick={props.onDigit}>4</button>
            <button id='five' onClick={props.onDigit}>5</button>
            <button id='six' onClick={props.onDigit}>6</button>
            <button id='seven' onClick={props.onDigit}>7</button>
            <button id='eight' onClick={props.onDigit}>8</button>
            <button id='nine' onClick={props.onDigit}>9</button>
        </div>
    );
}
