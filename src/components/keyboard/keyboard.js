import React from 'react';
import './keyboard.css';

export default function KeyBoard(props) {
    return (
        <div className='keyboard'>
            <button id='seven' onClick={() => props.onDigit('7')}>7</button>
            <button id='eight' onClick={() => props.onDigit('8')}>8</button>
            <button id='nine' onClick={() => props.onDigit('9')}>9</button>

            <button id='four' onClick={() => props.onDigit('4')}>4</button>
            <button id='five' onClick={() => props.onDigit('5')}>5</button>
            <button id='six' onClick={() => props.onDigit('6')}>6</button>

            <button id='one' onClick={() => props.onDigit('1')}>1</button>
            <button id='two' onClick={() => props.onDigit('2')}>2</button>
            <button id='three' onClick={() => props.onDigit('3')}>3</button>

            <button id='dot' onClick={() => props.onOperator('.')}>.</button>
            <button id='zero' onClick={() => props.onDigit('0')}>0</button>
            <button id='clear' onClick={() => props.onOperator('clear')}>&#60;</button>
        </div>
    );
}
