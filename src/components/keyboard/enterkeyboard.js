import React from 'react';
import './enterkeyboard.css';

import useKeyboardEvent from './usekeyboardevent';

const MAX_RESULT_LENGTH = 13;

export default function EnterKeyboard(props) {
    const [font, setFont] = React.useState('grey');
    const [result, setResult] = React.useState('?');

    const [border, setBorder] = React.useState('1px solid green');
    const [animation, setAnimation] = React.useState('blinker 5s linear infinite');

    const onDigit = (number) => {
        // console.log('EnterKeyboard.onDigit ' + number);
        if (props.lock === false) {
            // if result is ? -> some error from server and we have no task
            if (result === '?') {
                setResult(number); setFont('black'); setAnimation('none');

            } else {
                if (result.length < MAX_RESULT_LENGTH) {
                    setResult(prevResult => prevResult + number);

                } else {
                    console.log('EnterKeyboard.onDigit result.length ' + result.length);
                    setFont('red'); setAnimation('shake 0.6s'); setBorder('1px solid red');
                    setTimeout(() => {
                        setAnimation('none');
                    }, 200);
                }
            }
        }
    }

    const onOperator = (symbol) => {
        // console.log('EnterKeyboard.onOperator ' + symbol);
        if (result !== '?') {
            if (symbol === 'clear') {
                if (result.length === 1) {
                    setFont('grey'); setResult('?');
                    setAnimation('blinker 5s linear infinite');

                } else if (result.length === MAX_RESULT_LENGTH) {
                    setFont('black'); setResult(result.slice(0, -1));
                    setBorder('1px solid green');

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
        // console.log('EnterKeyboard:: open ' + props.open + ', props.lock ' + props.lock);
        /*if (props.open) {
            setResult('?'); setFont('grey');
            setAnimation('blinker 5s linear infinite');
            setBorder('1px solid green');
        }*/

        if (props.lock) {
            setAnimation('none');
            setBorder('1px solid red');
            setResult('?'); setFont('red');

        } else {
            setResult('?'); setFont('grey');
            setAnimation('blinker 5s linear infinite');
            setBorder('1px solid green');
        }

        if (props.error.length > 0) {
            console.log('EnterKeyboard:: error ' + props.error);

            setFont('red'); setBorder('1px solid red');
            setAnimation('shake 0.6s');

            setTimeout(() => {
                setResult('?'); setFont('grey');
                setBorder('1px solid green');
                setAnimation('blinker 5s linear infinite');
            }, 600);
        }

    }, [props.open, props.lock, props.error,]);

    return (
        <div className='enter_keyboard_wrapper'>
            <div className='enter_keyboard_answer' style={{'border': border}}>
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
