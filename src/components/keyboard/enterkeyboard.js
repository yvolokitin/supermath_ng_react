import React from 'react';
import './enterkeyboard.css';

/*
*/
export default function EnterKeyboard(props) {
    return (
        <div className='enter_keyboard'>
            <button id='digit' onClick={() => props.onDigit('7')}>7</button>
            <button id='digit' onClick={() => props.onDigit('8')}>8</button>
            <button id='digit' onClick={() => props.onDigit('9')}>9</button>

            <button id='digit' onClick={() => props.onDigit('4')}>4</button>
            <button id='digit' onClick={() => props.onDigit('5')}>5</button>
            <button id='digit' onClick={() => props.onDigit('6')}>6</button>

            <button id='digit' onClick={() => props.onDigit('1')}>1</button>
            <button id='digit' onClick={() => props.onDigit('2')}>2</button>
            <button id='digit' onClick={() => props.onDigit('3')}>3</button>

            <button id='remove' onClick={() => props.onOperator('clear')}>&#60;</button>
            <button id='zero' onClick={() => props.onDigit('0')}>0</button>
            <button id='enter' onClick={() => props.onOperator('enter')}>&crarr;</button>
        </div>
    );
}
