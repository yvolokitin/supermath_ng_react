import React, { useState, useEffect } from 'react';
import { Dialog, Slide } from '@material-ui/core';

import KeyBoard from './../keyboard/keyboard';
import OperatorBoard from './../keyboard/operatorboard';
import LineNumbersBoard from './../keyboard/linenumbersboard';

import GameProgress from './gameprogress';
import GameSettings from './gamesettings';
import GameReplay from './gamereplay';
import GameExit from './gameexit';
import GameInfo from './gameinfo';
import GameHelp from './gamehelp';

import {GREEN_CIRCLE, RED_CIRCLE} from './../halpers/functions';

import {generate_task} from './../halpers/arithmetic';

import './gameboard.css';
import './digitgameheader.css';

import {FULL_SCREEN} from './../halpers/functions';

const ALERT = {
    NONE: 0,
    EXIT: 1,
    INFO: 2,
    HELP: 3,
    SETTINGS: 4,
    PROGRESS: 5,
    REPLAY: 6,
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function GameBoard(props) {
    // const [task, setTask] = useState(generate_task(props.type, props.task));
    const [task, setTask] = useState(() => {
        const initialTask = generate_task(props.type, props.task)
        return initialTask;
    });

    const [result, setResult] = useState('?');
    const [color, setColor] = useState('grey');
    const [board, setBoard] = useState('yellow');
    const [counter, setCounter] = useState(0);
    const [attempt, setAttempt] = useState(0);
    const [circles, setCircles] = useState(0);
    const [animation, setAnimation] = useState('');
    const [size, setSize] = useState('1rem');
    const [timer, setTimer] = useState(0);

    const [total, setTotal] = useState(0);
    const [passed, setPassed] = useState(0);
    const [failed, setFailed] = useState(0);

    const [openAlert, setOpenAlert] = React.useState(ALERT.NONE);

    const onAlertDialog = (status) => {
        console.log('GameHeader.onAlertDialog -> ' + status);
        switch (status) {
            case 'close':
                setOpenAlert(ALERT.NONE);
                props.onClick('interrapted');
                break;
            case 'exit':
                setOpenAlert(ALERT.EXIT);
                break;
            case 'info':
                setOpenAlert(ALERT.INFO);
                break;
            case 'help':
                setOpenAlert(ALERT.HELP);
                break;
            case 'settings':
                setOpenAlert(ALERT.SETTINGS);
                break;
            case 'progress':
                setOpenAlert(ALERT.PROGRESS);
                break;
            case 'replay':
                setOpenAlert(ALERT.REPLAY);
                break;
            case 'restart':
                setOpenAlert(ALERT.NONE);
                props.onClick('restart');
                break;
            default:
                setOpenAlert(ALERT.NONE);
                break;
        }
    }

    useEffect(() => {
        console.log('GameBoard.useEffect -> !!!!!!!!!!! ' );

        if (props.is_test) {
            timer = setTimeout(() => proceed_with_timeout(), 1500);
        }

        // keyboard events listener
        window.addEventListener('keydown', onKeyboard);

        setTimer(new Date().getTime());
        set_task();
    });

    function onClose() {
        window.removeEventListener('keydown', this.onKeyboard);

        if (props.is_test) {
            clearTimeout(timer);
            props.onCircles(0);
        }
    }

    function set_task() {
        console.log('GameBoard.set_task -> ' + counter);
        setTask(generate_task(props.type, props.task));
        setResult('?'); setColor('grey'); setBoard('yellow');
        setCounter(0); setAttempt(0);

        if (props.is_test) {
            timer = setTimeout(() => {
                setCircles(0); proceed_with_timeout();
            }, 1500);
        }
    }

    function proceed_with_timeout() {
        if (circles < 10) {
            setCircles(prevCircles => prevCircles + 1);
            timer = setTimeout(() => proceed_with_timeout(), 1500);
        } else {
            set_failed('?');
        }
    }

    function proceed_with_next_task() {
        // console.log('proceed_with_next_task:: counter: ' + this.state.counter + ', amount: ' + props.amount);
        if (this.state.counter < props.amount) {
            if (props.is_test === false) {
                set_task();
            } else {
                props.onTest();
            }

        } else {
            console.log('Game is Finished');
            props.onClose('finished');
        }
    }

    function onDigit(digit_number) {
        // console.log('onDigit ' + target.innerText);
        // skip any checks if in red already
        check_response(digit_number);
    }

    function onOperator(symbol) {
        // console.log('check operator response ' + target.innerText);
        if (props.type.includes('_fr')) {
            check_response(symbol);

        } else if (props.type.includes('digit')) {
                var expected_result = task.result.toString();
                if ((expected_result.length > 1) && (result !== '?')) {
                    var new_result = result.substring(0, result.length - 1);
                    if (new_result.length === 0) {
                        setResult('?'); setColor('grey');
                    } else {
                        setResult(new_result);
                    }

                // white, level 6:
                // {id: 6, logo: logo6, type: '2digit_arg', task: 'o,+-,1-10,1-10,1,1', amount: task_amount},
                } else if ((props.type === '2digit_arg') && (props.task.includes('o'))) {
                    check_response(symbol);

                } else {
                    console.log('Escaping backspace ' + symbol);
                }

        } else {
            check_response(symbol);
        }
    }

    function onKeyboard({ key }) {
        console.log('onKeyboard ' + key);
        // skip any checks if in red already
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
                    check_response(key);
                    break;

                case '.':
                case ',':
                    if (props.type.includes('_fr')) {
                        check_response('.');
                    }
                    break;

                case '+':
                case '-':
                case 'x':
                case '*':
                case '/':
                case ':':
                    // white, level 6:
                    // {id: 6, logo: logo6, type: '2digit_arg', task: 'o,+-,1-10,1-10,1,1', amount: task_amount},
                    if ((props.type === '2digit_arg') && (props.task.includes('o'))) {
                        check_response(key);

                    } else if (props.type.includes('_signed') && key === '-') {
                        check_response(key);
                    }
                    break;

                case '>':
                case 'ArrowRight':
                    if (props.type === 'comp_expr' || props.type === 'comp_nums') {
                        check_response('>');
                    }
                    break;

                case '<':
                case 'ArrowLeft':
                    if (props.type === 'comp_expr' || props.type === 'comp_nums') {
                        check_response('<');
                    }
                    break;

                case '=':
                case 'ArrowUp':
                case 'ArrowDown':
                    if (props.type === 'comp_expr' || props.type === 'comp_nums') {
                        check_response('=');
                    }
                    break;

                case 'Escape':
                    console.log('onKeyboard: Escape');
                    // this.onGameClose('');
                    break;

                default:
                    // console.log('nothing to check for ' + key);
                    break;
        }
    }

    function check_response(digit) {
        var expected_result = task.result.toString();
        // console.log('check_response, digit: ' + digit + ', expected_result: ' + expected_result);
        if (expected_result.length === 1) {
            if (digit === expected_result) {
                set_passed(digit);
            } else {
                set_failed(digit);
            }

        } else if (expected_result.length > 1) {
            if (result === '?') {
                if (expected_result.charAt(0).toString() === digit) {
                    set_interim(digit);
                } else {
                    set_failed(digit);
                }
            } else {
                var current = this.state.result + digit;
                if (current === expected_result) {
                    set_passed(current);
                } else if (current.length === expected_result.length) {
                    set_failed(current);
                } else {
                    var position = this.state.result.length;
                    var val = expected_result.charAt(position).toString();
                    // console.log('val ' + val + ', digit ' + digit + ', position ' + position);
                    if (val === digit) {
                        set_interim(current);
                    } else {
                        set_failed(current);
                    }
                }
            }
        } else {
            alert('GameBoard.check_response: wrong check_response() statement ' + digit + ', expected_result: ' + expected_result);
            console.log('GameBoard.check_response: wrong check_response() statement ' + digit + ', expected_result: ' + expected_result);
        }
    }

    function set_failed(digit) {
        // console.log('FAILED.set_failed -> attempt: ' + this.state.attempt + ', digit ' + digit);
        if (props.is_test) {
            setCircles(RED_CIRCLE);
            // remove timer to stop counting
            clearTimeout(timer);
        }

        setColor('yellow'); setBoard('red');
        setResult(digit); setAnimation('shake 0.8s');
        setAttempt(prevAttempt => prevAttempt + 1);

        if (attempt === 0) {
            setCounter(prevCounter => prevCounter + 1);
            setFailed(prevFailed => prevFailed + 1);

            props.onCounter(attempt, task);
        }

        // clear result value in 1.5 seconds
        setTimeout(() => {
            setResult('?');
            setAnimation('');
        }, 700);
    }

    function set_passed(digit) {
        // console.log('PASSED, attempts: ' + this.state.attempt + ', timer: ' + this.state.timer);
        if (props.is_test) {
            props.onCircles(GREEN_CIRCLE);
            clearTimeout(timer);
        }

        if (attempt === 0) {
            // notify parent to update counters
            if (props.is_test && timer === 10) {
                props.onCounter(timer, task);
            } else {
                props.onCounter(attempt, task);
            }

            setCounter(prevCounter => prevCounter + 1);
        }

        setColor('yellow'); setResult(digit);
        setAnimation('smooth_yellow_to_green 0.8');

        setTimeout(() => {
            props.onCircles(0);
            proceed_with_next_task();
        }, 800);
    }

    function set_interim(digit) {
        setColor('black');
        setResult(digit);
    }

    return (
        <Dialog open={props.open} fullScreen={true} TransitionComponent={Transition} transitionDuration={900}>
            <div className="games_header_div">
                <div className='games_header_div_left'>
                    <font onClick={() => onAlertDialog('exit')}>SUPERMATH</font>
                </div>
                <div className='games_header_div_right' onClick={() => onAlertDialog('progress')}>
                    <font style={{color: 'black'}}>
                        {total} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128279;</span>
                    </font>
                    <font style={{color: 'green'}}>
                        {passed} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                    </font>
                    <font style={{color: 'red'}}>
                        {failed} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                    </font>
                </div>
            </div>

            <div className='gameboard_wrapper'>
                {props.type.includes('digit') ? (
                    <>
                      <div className='line_body_div_left'>
                        <div className='line_gameboard' style={{backgroundColor: board, 'animation': animation}}>
                            {((props.type.indexOf('2digit_arg') !== -1) && ('argument' in this.state.task)) ? (
                              <>
                                {this.state.task.argument.includes('1') ? (
                                    <div className='line_result' style={{color: color}}>{result}</div>
                                ) : (
                                    <div className='line_result'>{task.num1}</div>
                                )}

                                {this.state.task.argument.includes('o') ? (
                                    <div className='line_result' style={{color: color}}>{result}</div>
                                ) : (
                                    <div className='line_result'>{task.operation}</div>
                                )}

                                {this.state.task.argument.includes('2') ? (
                                    <div className='line_result' style={{color: color}}>{result}</div>
                                ) : (
                                    <div className='line_result'>{task.num2}</div>
                                )}
                                <div className='line_result'>=</div>
                                <div className='line_result'>{task.outcome}</div>
                              </>
                            ) : ( null )}

                            {((props.type.indexOf('_2column') !== -1) &&
                                ('num1' in task) && ('num2' in task) && ('operation' in task)) ? (
                                  <div style={{height:'90%',width:'90%'}}>
                                    <div style={{height:'25%',width:'80%'}}></div>
                                    <div className='column_number'>{task.num1}</div>
                                    <div className='column_number'>{task.operation} {task.num2}</div>
                                    <div className='column_black_line'> </div>
                                    <div className='column_result' style={{color: color}}>{result}</div>
                                  </div>
                            ) : ( null )}

                            {((props.type.indexOf('_3column') !== -1) &&
                                ('num1' in task) && ('num2' in task) && ('num3' in task)) ? (
                                  <div style={{height:'90%',width:'90%'}}>
                                    <div style={{height:'25%',width:'80%'}}></div>
                                    <div className='column_number'>{task.num1}</div>
                                    <div className='column_number'>{task.operation1}   {task.num2}</div>
                                    <div className='column_number'>{task.operation2}   {task.num3}</div>
                                    <div className='column_black_line'> </div>
                                    <div className='column_result' style={{color: color}}>{result}</div>
                                  </div>
                            ) : ( null )}

                            {props.type.includes('digits') ? (
                              <>
                                <div className='line_task'>{task.expr1}</div>
                                {(this.state.task.result.toString().length < 3) ? (
                                    <div className='line_result' style={{color: color}}>{result}</div>
                                  ) : ( <></> )}

                                {(this.state.task.result.toString().length === 3) ? (
                                    <div className='line_3result' style={{color: color}}>{result}</div>
                                  ) : ( null )}

                                {(this.state.task.result.toString().length === 4) ? (
                                    <div className='line_4result' style={{color: color}}>{result}</div>
                                  ) : ( null )}

                                {(this.state.task.result.toString().length > 4) ? (
                                    <div className='line_5result' style={{color: color}}>{result}</div>
                                  ) : ( null )}
                              </>
                            ) : ( null )}
                        </div>
                      </div>
                      <div className='line_body_div_right'>
                          {props.task.includes('o,') ? (
                            <OperatorBoard onOperator={() => onOperator} plus={true} minus={true}/>
                          ) : (
                            <KeyBoard onDigit={() => onDigit()} onOperator={this.onOperator}/>
                          )}
                      </div>
                    </>
                ):( null ) }

                {props.type.includes('comp_') ? (
                    <>
                      <div className='line_body_div_up'>
                        {(props.type.includes('comp_nums')) ? (
                            <div className='line_gameboard' style={{backgroundColor: board, animation: animation}}>
                                <div className='line_result'>{task.expr1}</div>
                                <div className='line_result' style={{color: color}}><font>{result}</font></div>
                                <div className='line_result'>{task.expr2}</div>
                            </div>
                        ) : ( null )}

                        {(props.type.includes('comp_expr')) ? (
                            <div className='line_gameboard line_gameboard_comp' style={{backgroundColor: board, animation: animation}}>
                                <div className='line_expression'>{task.expr1}</div>
                                <div className='line_result' style={{color: color}}><font>{result}</font></div>
                                <div className='line_expression'>{task.expr2}</div>
                            </div>
                        ) : ( null )}
                      </div>

                      <div className='line_body_div_bottom'>
                          <OperatorBoard onOperator={onOperator} more={true} less={true} equals={true}/>
                      </div>
                    </>
                ):( null ) }

                {props.type.includes('line_') ? (
                    <>
                        <div className='line_body_div_up'>
                            <div className='line_gameboard' style={{backgroundColor: this.state.board, animation: this.state.animation}}>
                                { props.type.includes('line_compnums') ? (<div className='line_result'>{this.state.task.expr1}</div>):(null)}
                                { props.type.includes('line_compnums') ? (<div className='line_result' style={{color: this.state.color}}><font>{this.state.result}</font></div>):(null)}
                                { props.type.includes('line_compnums') ? (<div className='line_result'>{this.state.task.expr2}</div>):(null)}

                                { props.type.includes('line_compexpr') ? (<div className='line_expression'>{this.state.task.expr1}</div>):(null)}
                                { props.type.includes('line_compexpr') ? (<div className='line_result' style={{color: this.state.color}}><font>{this.state.result}</font></div>):(null)}
                                { props.type.includes('line_compexpr') ? (<div className='line_expression'>{this.state.task.expr2}</div>):(null)}

                                { props.type.includes('numbers') ? (
                                    <div className='line_gameboard_numbers'>
                                        <div className='line_task'>{task.expr1}</div>

                                        {(task.result.toString().length < 3) ? (
                                            <div className='line_result' style={{'color': color}}>{result}</div>
                                          ) : ( null )}

                                        {(task.result.toString().length === 3) ? (
                                            <div className='line_3result' style={{'color': color}}>{result}</div>
                                        ) : ( null )}

                                        {(task.result.toString().length === 4) ? (
                                            <div className='line_4result' style={{'color': color}}>{result}</div>
                                        ) : ( null )}

                                        {(task.result.toString().length > 4) ? (
                                            <div className='line_5result' style={{'color': color}}>{result}</div>
                                        ) : ( null )}
                                    </div>
                                ) : ( <> </>)}
                            </div>
                        </div>
                        <div className='line_body_div_bottom'>
                            {props.type.includes('line_comp') ? (
                                <OperatorBoard onOperator={onOperator}
                                    more={true} less={true} equals={true}/>
                            ) : (
                                <LineNumbersBoard onDigit={onDigit}
                                    onOperator={onOperator}
                                    floats={props.type.includes('_fr')}
                                    minus={props.type.includes('_signed')}/>
                            )}
                        </div>
                    </>
                ) : ( <> </>)}
            </div>

            <GameExit open={openAlert === ALERT.EXIT}
                fullScreen={props.width<FULL_SCREEN}
                type='game'
                lang={props.lang}
                onClose={onAlertDialog}/>

            <GameInfo open={openAlert === ALERT.INFO}
                description={props.description}
                fullScreen={props.width<FULL_SCREEN}
                type='game'
                lang={props.lang}
                onClose={onAlertDialog}/>

            <GameHelp open={openAlert === ALERT.HELP}
                description={props.description}
                fullScreen={props.width<FULL_SCREEN}
                type='game'
                lang={props.lang}
                onClose={onAlertDialog}/>

            <GameSettings open={openAlert === ALERT.SETTINGS}
                fullScreen={props.width<FULL_SCREEN}
                lang={props.lang}
                onClose={onAlertDialog}/>

            <GameProgress open={openAlert === ALERT.PROGRESS}
                fullScreen={props.width<FULL_SCREEN}
                from='game'
                lang={props.lang}
                total={props.total}
                passed={props.passed}
                failed={props.failed}
                results={props.results}
                onClose={onAlertDialog}/>

            <GameReplay open={openAlert === ALERT.REPLAY}
                description={props.description}
                fullScreen={props.width<FULL_SCREEN}
                type='game'
                lang={props.lang}
                onClose={onAlertDialog}/>

        </Dialog>
    );
}
