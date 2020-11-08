﻿import React from 'react';
import './enterkeyboard.css';

export default function EnterKeyboard(props) {
    const [animation, setAnimation] = React.useState('blinker 5s linear infinite');
    const [font, setFont] = React.useState('grey');
    const [result, setResult] = React.useState('?');

    const onDigit = (number) => {
        console.log('EnterKeyboard.onDigit ' + number);
        // if result is ? -> some error from server and we have no task
        if (result === '?') {
            setResult(number); setFont('black');
            setAnimation('none');
        } else {
            setResult(prevResult => prevResult + number);
        }
    }

    const onOperator = (symbol) => {
        console.log('EnterKeyboard.onOperator ' + symbol);
        if (result !== '?') {
            if (symbol === 'clear') {
                if (result.length === 1) {
                    setFont('grey'); setResult('?');
                    setAnimation('blinker 5s linear infinite');
                } else {
                    setResult(result.slice(0, -1));
                }
            } else if (symbol === 'enter') {
                props.onAnswer(result);
            }
        }
    }

    React.useEffect(() => {
        if (props.open) {
            // console.log('EnterKeyboard.useEffect');
            setResult('?'); setFont('grey');
            setAnimation('blinker 5s linear infinite');
        }

    }, [props.open, ]);

    return (
        <div className='enter_keyboard_wrapper'>
            <div className='enter_keyboard_answer'>
                <font style={{'color': font, 'animation': animation}}> {result} </font>
            </div>
            <div className='enter_keyboard'>
                <button id='digit' onClick={() => onDigit('7')}>7</button>
                <button id='digit' onClick={() => onDigit('8')}>8</button>
                <button id='digit' onClick={() => onDigit('9')}>9</button>

                <button id='digit' onClick={() => onDigit('4')}>4</button>
                <button id='digit' onClick={() => onDigit('5')}>5</button>
                <button id='digit' onClick={() => onDigit('6')}>6</button>

                <button id='digit' onClick={() => onDigit('1')}>1</button>
                <button id='digit' onClick={() => onDigit('2')}>2</button>
                <button id='digit' onClick={() => onDigit('3')}>3</button>

                <button id='remove' onClick={() => onOperator('clear')}>&#60;</button>
                <button id='zero' onClick={() => onDigit('0')}>0</button>
                <button id='enter' onClick={() => onOperator('enter')}>&crarr;</button>
            </div>
        </div>
    );
}
