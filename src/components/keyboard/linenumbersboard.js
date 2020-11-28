import React from 'react';
import './linenumbersboard.css';

export default function LineNumbersBoard(props) {
    return (
        <div className='line_keyboard'>
            <div className='line_keyboard_left'>
                {(props.floats || props.minus) ? (
                    <button className='line_keyboard_button' onClick={() => props.onOperator('.')}>.</button>
                ) : ( <> </> )}

                <button className='line_keyboard_button' onClick={() => props.onDigit('0')}>0</button>
                <button className='line_keyboard_button' onClick={() => props.onDigit('1')}>1</button>
                <button className='line_keyboard_button' onClick={() => props.onDigit('2')}>2</button>
                <button className='line_keyboard_button' onClick={() => props.onDigit('3')}>3</button>
                <button className='line_keyboard_button' onClick={() => props.onDigit('4')}>4</button>
            </div>

            <div className='line_keyboard_right'>
                <button className='line_keyboard_button' onClick={() => props.onDigit('5')}>5</button>
                <button className='line_keyboard_button' onClick={() => props.onDigit('6')}>6</button>
                <button className='line_keyboard_button' onClick={() => props.onDigit('7')}>7</button>
                <button className='line_keyboard_button' onClick={() => props.onDigit('8')}>8</button>
                <button className='line_keyboard_button' onClick={() => props.onDigit('9')}>9</button>
    
                {(props.floats || props.minus) ? (
                    <button className='line_keyboard_button' onClick={() => props.onOperator('-')}>-</button>
                ) : ( <> </> )}
            </div>
        </div>
    );
}
