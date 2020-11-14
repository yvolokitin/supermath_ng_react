import React from 'react';
import './enterkeyboard.css';

import useKeyboardEvent from './usekeyboardevent';

const MAX_RESULT_LENGTH = 13;

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

        } else if (result.length < MAX_RESULT_LENGTH) {
            setResult(prevResult => prevResult + number);
        }
    }

    const onOperator = (symbol) => {
        // console.log('EnterKeyboard.onOperator ' + symbol);
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

    useKeyboardEvent((key) => {
        // console.log('EnterKeyboard.useKeyboardEvent ' + key);
        switch (key) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                onDigit(key);
                break;

            case 'Backspace':
                onOperator('clear');
                break;

            case 'Enter':
                onOperator('enter');
                break;

            default:
                // console.log('nothing to check for ' + key);
                break;
        }
    });

    React.useEffect(() => {
        console.log('EnterKeyboard:: React.useEffect ' + props.open);
        if (props.open) {
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
