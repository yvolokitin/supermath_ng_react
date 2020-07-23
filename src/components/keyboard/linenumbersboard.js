import React from 'react';
import './linenumbersboard.css';

export default function LineNumbersBoard(props) {
    return (
        <div className='linekeyboard'>
            <button onClick={() => props.onDigit('0')}>0</button>
            <button onClick={() => props.onDigit('1')}>1</button>
            <button onClick={() => props.onDigit('2')}>2</button>
            <button onClick={() => props.onDigit('3')}>3</button>
            <button onClick={() => props.onDigit('4')}>4</button>
            <button onClick={() => props.onDigit('5')}>5</button>
            <button onClick={() => props.onDigit('6')}>6</button>
            <button onClick={() => props.onDigit('7')}>7</button>
            <button onClick={() => props.onDigit('8')}>8</button>
            <button onClick={() => props.onDigit('9')}>9</button>

            {(props.floats) ? (
                <button onClick={() => props.onOperator('.')}>.</button>
            ) : ( <> </> )}

            {(props.minus) ? (
                <button onClick={() => props.onOperator('-')}>-</button>
            ) : ( <> </> )}
        </div>
    );
}
