import React from 'react';
import { Dialog, Slide } from '@material-ui/core';

import KeyBoard from './../keyboard/keyboard';
import OperatorBoard from './../keyboard/operatorboard';
import LineNumbersBoard from './../keyboard/linenumbersboard';

import useKeyboardEvent from './../keyboard/usekeyboardevent';
// import useTimeoutEvent from './../keyboard/usetimeoutevent';

import GameResults from './gameresults';

import GameProgress from './gameprogress';
import GameReplay from './gamereplay';
import GameExit from './gameexit';
import GameHelp from './gamehelp';

// settings and info are temporary disabled
// development should be finished later
// import GameSettings from './gamesettings';
// import GameInfo from './gameinfo';

import ColorLine from './../line/line';

import {GREEN_CIRCLE, RED_CIRCLE, get_rate_per_percent} from './../halpers/functions';
import {get_timeout_per_test, get_radius_per_width} from './../halpers/functions';
import {get_random_task_for_test} from './../halpers/programms';
import {generate_task, align_task_format} from './../halpers/arithmetic';

import './digitgame.css';

const ALERT = {
    NONE: 0,
    EXIT: 1,
    INFO: 2,
    HELP: 3,
    SETTINGS: 4,
    PROGRESS: 5,
    REPLAY: 6,
    RESULTS: 7,
}

const footer_circles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

// timeout in milliseconds to give time for task animation
const TIMEOUT_BEFORE_TASK = 900;

const fake_task = {expr1: '', result: 'fake'};

// global timer for setTimeouts
var game_timer = 0;

export default function DigitGame(props) {
    const [circles, setCircles] = React.useState(0);
    const circlesRef = React.useRef(circles);
    circlesRef.current = circles;

    const [task, setTask] = React.useState(fake_task);

    const [conditions, setConditions] = React.useState('');
    const [type, setType] = React.useState('');

    const [result, setResult] = React.useState('?');

    const [resultData, setResultData] = React.useState({});
    const [results, setResults] = React.useState([]);

    const [boardanimation, setAnimation] = React.useState('');
    const [board, setBoard] = React.useState('yellow');
    const [color, setColor] = React.useState('grey');

    // this is important for setTimeout construction and dependancies
    const [counter, setCounter] = React.useState(0);

    const [attempt, setAttempt] = React.useState(0);
    const [passed, setPassed] = React.useState(0);
    const [failed, setFailed] = React.useState(0);

    const [radius, setRadius] = React.useState(get_radius_per_width());

    const [duration, setDuration] = React.useState(new Date().getTime());
    const [testTimeout, setTestTimeout] = React.useState(get_timeout_per_test(props.belt));

    const [openAlert, setOpenAlert] = React.useState(ALERT.NONE);

    useKeyboardEvent((key) => {
        // ignore any keyboard events when sub menus are opened
        if (openAlert !== ALERT.NONE) {
            return;
        }

        // console.log('DigitGame.useKeyboardEvent ' + key);
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
                if (type.indexOf('_fr') > -1) {
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
                if ((type === '2digit_arg') && (conditions.includes('o'))) {
                    check_response(key);
                } else if (type.includes('_signed') && key === '-') {
                    check_response(key);
                }
                break;

            case '>':
            case 'ArrowRight':
                if (type === 'comp_expr' || type === 'comp_nums') {
                    check_response('>');
                }
                break;

            case '<':
            case 'ArrowLeft':
                if (type === 'comp_expr' || type === 'comp_nums') {
                    check_response('<');
                }
                break;

            case '=':
            case 'ArrowUp':
            case 'ArrowDown':
                if (type === 'comp_expr' || type === 'comp_nums') {
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
    });

    // function set_failed(digit) {
    const set_failed = React.useCallback((digit) => {
        console.log('FAILED.set_failed -> digit: ' + digit + ', attempt ' + attempt);

        if (props.type === 'test') {
            setCircles(RED_CIRCLE);
            clearTimeout(game_timer);
        }

        setResult(digit); setAnimation('shake 0.8s');
        setColor('yellow'); setBoard('red');

        if (attempt === 0) {
            // setCounter(prevCounter => prevCounter + 1);
            setAttempt(prevAttempt => prevAttempt + 1);
            setFailed(prevFailed => prevFailed + 1);
        }

        // clear result value in 0.7 seconds
        setTimeout(() => {
            setResult('?');
            setAnimation('');
        }, 700);

    }, [props.type, attempt, ])

    React.useEffect(() => {
        if (props.open) {
            console.log('DigitGame.useEffect -> counter ' + counter);

            // counter=1: initialization
            if (counter === 0) {
                setBoard('yellow'); setColor('grey');
                setResult('?'); setAnimation('');
                setAttempt(0); setCircles(0);
                setPassed(0); setFailed(0);
                setResults([]); setDuration(new Date().getTime());
                setRadius(get_radius_per_width());

                if (props.type === 'test') {
                    // return {'type': games[i].type, 'task': games[i].task, 'uid': rnd_task};
                    var new_task_type_uid = get_random_task_for_test(props.conditions, props.game_uid);
                    var test_task = generate_task(new_task_type_uid.type, new_task_type_uid.task)
                    setType(new_task_type_uid.type); setConditions(new_task_type_uid.task);
                    setTask(test_task);

                } else {
                    setTask(generate_task(props.type, props.conditions));
                    setType(props.type); setConditions(props.conditions);
                }

                setCounter(prevCounter => prevCounter + 1);
            }

            if (props.type === 'test' && openAlert === ALERT.NONE) {
                console.log('DigitGame.useEffect -> circles ' + circles);

                var test_timeout = get_timeout_per_test(props.belt);
                setTestTimeout(test_timeout);

                if (circlesRef.current < 9) {
                    const game_timer = setTimeout(() => {
                        setCircles(prevCircles => prevCircles + 1);

                    }, test_timeout);
                    return () => clearTimeout(game_timer);

                } else if (circlesRef.current !== GREEN_CIRCLE && circlesRef.current !==  RED_CIRCLE) {
                    set_failed('?');
                }
            }
        }

    }, [props.open, props.belt, props.type, props.conditions, props.game_uid, counter, circles, set_failed, openAlert]);

    function set_passed(digit) {
        console.log('PASSED, digit ' + digit + ', attempts ' + attempt + ', game_timer ' + game_timer);

        setResult(digit); setAnimation('smooth_yellow_to_green 0.8s');
        setColor('yellow'); setBoard('green');

        if (props.type === 'test') {
            setCircles(GREEN_CIRCLE);
            clearTimeout(game_timer);
        }

        if (attempt === 0) {
            // setCounter(prevCounter => prevCounter + 1);
            setPassed(prevPassed => prevPassed + 1);
        }

        // export function align_task_format(user_task, type, counter) {
        var result_to_add = align_task_format(task, type, attempt);
        // return {'task': format, 'color': color};
        // console.log('result_to_add ' + result_to_add.task + ', ' + result_to_add.color);
        setResults([...results, result_to_add]);

        setTimeout(() => {
            proceed_with_next_task();
            setCircles(0);
        }, TIMEOUT_BEFORE_TASK);
    }

    function proceed_with_next_task() {
        console.log('DigitGame.proceed_with_next_task -> testTimeout ' + testTimeout);

        if (counter < props.amount) {
            setBoard('yellow'); setColor('grey'); 
            setResult('?'); setAttempt(0);
            setAnimation('');

            if (props.type === 'test') {
                // return {'type': games[i].type, 'task': games[i].task, 'uid': rnd_task};
                var new_task_type_uid = get_random_task_for_test(props.conditions, props.game_uid);
                // console.log('new_task_type_uid ' + new_task_type_uid.type + ', ' + new_task_type_uid.uid);
                setType(new_task_type_uid.type); setConditions(new_task_type_uid.task);
                setTask(generate_task(new_task_type_uid.type, new_task_type_uid.task));
                setCircles(0);

                // game_timer = setTimeout(() => {proceed_with_timeout();}, testTimeout);

            } else {
                setTask(generate_task(type, conditions));
            }

            setCounter(prevCounter => prevCounter + 1);

        } else {
            console.log('Game is Finished');
            onDialog('finished');
        }
    }

    function onDialog(status) {
        // console.log('DigitGame.onDialog -> ' + status);
        switch (status) {
            // when game is finished -> trigger results board
            case 'finished':
                if (props.type === 'test') {
                    clearTimeout(game_timer);
                }
 
                var percent = 100 * passed / props.amount;
                var result_data = {
                    'operation': 'results',
                    'game_uid': props.game_uid,
                    'passed': passed,
                    'failed': failed,
                    'duration': (new Date().getTime() - duration),
                    'rate': get_rate_per_percent(percent),
                    'percent': percent,
                    'belt': props.belt,
                    'task': props.type,
                };

                props.onClose('finished', result_data);
                // setCircles(0); setCounter(0);
                setResultData(result_data);
                setOpenAlert(ALERT.RESULTS);
                break;

            // close game -> game interraption
            case 'close':
                if (props.type === 'test') {
                    clearTimeout(game_timer);
                }
                setOpenAlert(ALERT.NONE);
                setCounter(0); setCircles(0);
                props.onClose('close');
                break;

            case 'register':
                if (props.type === 'test') {
                    clearTimeout(game_timer);
                }
                setOpenAlert(ALERT.NONE);
                setCounter(0); setCircles(0);
                props.onClose('register', '0000000');
                break;

            // reply menu -> show reply menu dialog
            case 'replay':
                setOpenAlert(ALERT.REPLAY);
                if (props.type === 'test') {
                    clearTimeout(game_timer);
                }
                break;

            // restart is action item from reply menu call
            // game will be restarted from scratch
            case 'restart':
                setCounter(0); setCircles(0);
                setOpenAlert(ALERT.NONE);
                break;

            // show progress results in addition menu dialog
            case 'progress':
                setOpenAlert(ALERT.PROGRESS);
                if (props.type === 'test') {
                    clearTimeout(game_timer);
                }
                break;

            case 'exit':
                setOpenAlert(ALERT.EXIT);
                if (props.type === 'test') {
                    clearTimeout(game_timer);
                }
                break;

            case 'help':
                setOpenAlert(ALERT.HELP);
                if (props.type === 'test') {
                    clearTimeout(game_timer);
                }
                break;

            default:
                setOpenAlert(ALERT.NONE);
                break;
        }
    }

    function onDigit(digit_number) {
        // console.log('onDigit ' + target.innerText);
        // skip any checks if in red already
        check_response(digit_number);
    }

    function onOperator(symbol) {
        // console.log('check operator response ' + target.innerText);
        if (type.includes('_fr')) {
            check_response(symbol);

        } else if (type.includes('digit')) {
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
                } else if ((type === '2digit_arg') && (conditions.includes('o'))) {
                    check_response(symbol);

                } else {
                    console.log('Escaping backspace ' + symbol);
                }

        } else {
            check_response(symbol);
        }
    }

    function check_response(digit) {
        // console.log('check_response, digit: ' + digit);

        // to prevent false error, when switch between solved and new task
        if (boardanimation.indexOf('smooth_yellow_to_green') > -1) {
            // result.length > task.result.toString()) {
                console.log('escaping check_response request ' + digit);
            return;
        }

        var expected_result = task.result.toString();
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
                var current = result + digit;
                if (current === expected_result) {
                    set_passed(current);

                } else if (current.length === expected_result.length) {
                    set_failed(current);

                } else if (current.length > expected_result.length) {
                    // digit is used specially to prevent too wide/big numbers
                    set_failed(digit);

                } else {
                    var position = result.length;
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
            alert('DigitGame.check_response: wrong check_response() statement ' + digit + ', expected_result: ' + expected_result);
            console.log('DigitGame.check_response: wrong check_response() statement ' + digit + ', expected_result: ' + expected_result);
        }
    }

    function set_interim(digit) {
        // console.log('set_interim ' + digit);
        setColor('black');
        setResult(digit);
    }

    return (
        <Dialog open={props.open} fullScreen={true} TransitionComponent={Transition} transitionDuration={900}>
            <div className="games_header_div">
                <div className='games_header_div_left'>
                    <font onClick={() => onDialog('exit')}>SUPERMATH</font>
                </div>
                <div className='games_header_div_right' onClick={() => onDialog('progress')}>
                    <font style={{color: 'black'}}>
                        {counter} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128279;</span>
                    </font>
                    <font style={{color: 'green'}}>
                        {passed} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                    </font>
                    <font style={{color: 'red'}}>
                        {failed} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                    </font>
                </div>
            </div>

            {type.indexOf('digit') > -1 &&
                <div className='gameboard_wrapper'>
                    <div className='line_body_div_left'>
                        <div className='line_gameboard' style={{backgroundColor: board, animation: boardanimation}}>
                            {type.indexOf('2digit_arg') > -1 && ('argument' in task) &&
                                <>
                                    {task.argument.indexOf('1') > -1 ? (
                                        <div className='line_result' style={{color: color}}>{result}</div>
                                    ) : (
                                        <div className='line_result'>{task.num1}</div>
                                    )}

                                    {task.argument.indexOf('o') > -1 ? (
                                        <div className='line_result' style={{color: color}}>{result}</div>
                                    ) : (
                                        <div className='line_result'>{task.operation}</div>
                                    )}

                                    {task.argument.indexOf('2') > -1 ? (
                                        <div className='line_result' style={{color: color}}>{result}</div>
                                    ) : (
                                        <div className='line_result'>{task.num2}</div>
                                    )}
                                    <div className='line_result'>=</div>
                                    <div className='line_result'>{task.outcome}</div>
                                </>
                            }

                            {type.indexOf('_2column') > -1 && ('num1' in task) && ('num2' in task) && ('operation' in task) &&
                                <div style={{height:'90%', width:'90%'}}>
                                    <div style={{height:'25%', width:'80%'}}></div>
                                    <div className='column_number'>{task.num1}</div>
                                    <div className='column_number'>{task.operation} {task.num2}</div>
                                    <div className='column_black_line'> </div>
                                    <div className='column_result' style={{color: color}}>{result}</div>
                                </div>
                            }

                            {type.indexOf('_3column') > -1 && ('num1' in task) && ('num2' in task) && ('num3' in task) &&
                                <div style={{height:'90%',width:'90%'}}>
                                    <div style={{height:'25%',width:'80%'}}></div>
                                    <div className='column_number'>{task.num1}</div>
                                    <div className='column_number'>{task.operation1}   {task.num2}</div>
                                    <div className='column_number'>{task.operation2}   {task.num3}</div>
                                    <div className='column_black_line'> </div>
                                    <div className='column_result' style={{color: color}}>{result}</div>
                                </div>
                            }

                            {type.indexOf('digits') > -1 &&
                                <>
                                    <div className='line_task'>{task.expr1}</div>
                                    {task.result.toString().length < 3 &&
                                        <div className='line_result' style={{color: color}}>{result}</div>
                                    }

                                    {task.result.toString().length === 3 &&
                                        <div className='line_3result' style={{color: color}}>{result}</div>
                                    }

                                    {task.result.toString().length === 4 &&
                                        <div className='line_4result' style={{color: color}}>{result}</div>
                                    }

                                    {task.result.toString().length > 4 &&
                                        <div className='line_5result' style={{color: color}}>{result}</div>
                                    }
                                </>
                            }
                        </div>
                    </div>

                    <div className='line_body_div_right'>
                        {conditions.indexOf('o,') > -1 ? (
                            <OperatorBoard onOperator={onOperator} plus={true} minus={true}/>
                        ) : (
                            <KeyBoard onDigit={onDigit} onOperator={onOperator}/>
                        )}
                    </div>
                </div>
            }

            {type.indexOf('comp_') > -1 &&
                <div className='gameboard_wrapper'>
                    <div className='line_body_div_up'>
                        {type.indexOf('comp_nums') > -1 &&
                            <div className='line_gameboard' style={{backgroundColor: board, animation: boardanimation}}>
                                <div className='line_result'>{task.expr1}</div>
                                <div className='line_result' style={{color: color}}><font>{result}</font></div>
                                <div className='line_result'>{task.expr2}</div>
                            </div>
                        }

                        {type.indexOf('comp_expr') > -1 &&
                            <div className='line_gameboard line_gameboard_comp' style={{backgroundColor: board, animation: boardanimation}}>
                                <div className='line_expression'>{task.expr1}</div>
                                <div className='line_result' style={{color: color}}><font>{result}</font></div>
                                <div className='line_expression'>{task.expr2}</div>
                            </div>
                        }
                    </div>
                    <div className='line_body_div_bottom'>
                        <OperatorBoard onOperator={onOperator} more={true} less={true} equals={true}/>
                    </div>
                </div>
            }

            {type.indexOf('line_') > -1 &&
                <div className='gameboard_wrapper'>
                    <div className='line_body_div_up'>
                        <div className='line_gameboard' style={{backgroundColor: board, animation: boardanimation}}>
                            {type.indexOf('line_compnums') > -1 && <div className='line_result'>{task.expr1}</div>}
                            {type.indexOf('line_compnums') > -1 && <div className='line_result' style={{color: color}}><font>{result}</font></div>}
                            {type.indexOf('line_compnums') > -1 && <div className='line_result'>{task.expr2}</div>}

                            {type.indexOf('line_compexpr') > -1 && <div className='line_expression'>{task.expr1}</div>}
                            {type.indexOf('line_compexpr') > -1 && <div className='line_result' style={{'color': color}}><font>{result}</font></div>}
                            {type.indexOf('line_compexpr') > -1 && <div className='line_expression'>{task.expr2}</div>}

                            {type.indexOf('numbers') > -1 &&
                                <div className='line_gameboard_numbers'>
                                    <div className='line_task'>{task.expr1}</div>

                                    {task.result.toString().length < 3 && <div className='line_result' style={{'color': color}}>{result}</div>}
                                    {task.result.toString().length === 3 && <div className='line_3result' style={{'color': color}}>{result}</div>}
                                    {task.result.toString().length === 4 && <div className='line_4result' style={{'color': color}}>{result}</div>}
                                    {task.result.toString().length > 4 && <div className='line_5result' style={{'color': color}}>{result}</div>}
                                </div>
                            }
                        </div>
                    </div>
                    <div className='line_body_div_bottom'>
                        {type.indexOf('line_comp') > -1 ? (
                            <OperatorBoard onOperator={onOperator} more={true} less={true} equals={true}/>
                        ) : (
                            <LineNumbersBoard onDigit={onDigit} onOperator={onOperator}
                                floats={type.includes('_fr')} minus={type.includes('_signed')}/>
                        )}
                    </div>
                </div>
            }

            {props.type === 'test' &&
                <>
                    <ColorLine margin={'0px'}/>
                    <div className='game_footer_div' style={{height: '8%', width: '100%'}}>
                        {footer_circles.map((item, key) => (
                            <svg key={item} height='10%' width='10%' className='game_footer_div_svg'>
                                {circles === RED_CIRCLE ? (
                                    <circle cx='50%' cy='50%' r={radius} stroke='black' strokeWidth='2' fill={'red'} style={{animation: boardanimation}}/>
                                ) : (
                                  <>
                                    {circles === GREEN_CIRCLE ? (
                                        <circle cx='50%' cy='50%' r={radius} stroke='black' strokeWidth='2' fill={'green'} style={{animation: boardanimation}}/>
                                    ) : (
                                        <>
                                            {(circles > item) ? (
                                                <circle cx='50%' cy='50%' r={radius} stroke='black' strokeWidth='2' fill={'green'} style={{animation: boardanimation}}/>
                                            ) : (
                                                <circle cx='50%' cy='50%' r={radius} stroke='black' strokeWidth='2' fill={'white'}/>
                                            )}
                                        </>
                                    )}
                                  </>
                                )}
                            </svg>
                        ))}
                    </div>
                </>
            }

            <GameExit open={openAlert === ALERT.EXIT}
                fullScreen={props.fullScreen}
                type='game'
                lang={props.lang}
                onClose={onDialog}/>

            <GameHelp open={openAlert === ALERT.HELP}
                fullScreen={props.fullScreen}
                description={props.description}
                type='game'
                lang={props.lang}
                onClose={onDialog}/>

            <GameProgress open={openAlert === ALERT.PROGRESS}
                fullScreen={props.fullScreen}
                from='game'
                lang={props.lang}
                total={counter}
                passed={passed}
                failed={failed}
                results={results}
                onClose={onDialog}/>

            <GameReplay open={openAlert === ALERT.REPLAY}
                fullScreen={props.fullScreen}
                description={props.description}
                type='game'
                lang={props.lang}
                onClose={onDialog}/>

            <GameResults open={openAlert === ALERT.RESULTS}
                fullScreen={props.fullScreen}
                user_id={props.user_id}
                lang={props.lang}
                results={results}
                data={resultData}
                onClose={onDialog}/>

        </Dialog>
    );
}

            // settings and info are temporary disabled
            // development should be finished later
/*
            <GameInfo open={openAlert === ALERT.INFO}
                description={props.description}
                fullScreen={props.fullScreen}
                type='game'
                lang={props.lang}
                onClose={onDialog}/>

            <GameSettings open={openAlert === ALERT.SETTINGS}
                fullScreen={props.fullScreen}
                lang={props.lang}
                onClose={onDialog}/>

*/