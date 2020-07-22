import React from 'react';
import {generate_task} from './../halpers/arithmetic';
import KeyBoard from './../keyboard/keyboard';
import OperatorBoard from './../keyboard/operatorboard';
import LineNumbersBoard from './../keyboard/linenumbersboard';
import './gameboard.css';

export default class GameBoard extends React.Component {
    constructor(props) {
        super(props);

        this.onDigit = this.onDigit.bind(this);
        this.onOperator = this.onOperator.bind(this);
        this.onKeyboard = this.onKeyboard.bind(this);

        this.state = {task: generate_task(props.type, props.task),
                      result: '?',
                      color: 'grey',
                      board: 'yellow',
                      counter: 0,
                      attempt: 0};
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyboard);

        // to ignore user actions during animation
        this.loading = false;
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyboard);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.uid !== prevProps.uid) {
            console.log('GameBoard.componentDidUpdate type ' + this.props.type + ', task: ' + this.props.task);
            this.timer = new Date().getTime();
            this.set_task();
        }
    }

    set_task() {
        console.log('GameBoard.set_task ' + this.state.counter);
        this.setState({task: generate_task(this.props.type, this.props.task),
                       result: '?',
                       board: 'yellow',
                       animation: 'none',
                       color: 'grey',
                       attempt: 0}, () => {
                            this.props.onColor('white');
                            this.loading = false;
        });
    }

    proceed_with_next_task() {
        // console.log('proceed_with_next_task:: counter: ' + this.state.counter + ', amount: ' + this.props.amount);
        if (this.state.counter < this.props.amount) {
            if (this.props.is_test === false) {
                this.set_task();
            } else {
                this.props.onTest();
            }

        } else {
            console.log('Game is Finished');
            this.props.onClose('finished');
        }
    }

    onDigit(digit_number) {
        // console.log('onDigit ' + target.innerText);
        // skip any checks if in red already
        if (this.loading === false) {
            this.check_response(digit_number);
        }
    }

    onOperator(symbol) {
        // console.log('check operator response ' + target.innerText);
        if (this.loading === false) {
            if (this.props.type.includes('_fr')) {
                this.check_response(symbol);

            } else if (this.props.type.includes('digit')) {
                var expected_result = this.state.task.result.toString();
                if ((expected_result.length > 1) && (this.state.result !== '?')) {
                    var new_result = this.state.result.substring(0, this.state.result.length - 1);
                    if (new_result.length === 0) {
                        this.setState({result: '?', color: 'grey'});
                    } else {
                        this.setState({result: new_result});
                    }

                // white, level 6:
                // {id: 6, logo: logo6, type: '2digit_arg', task: 'o,+-,1-10,1-10,1,1', amount: task_amount},
                } else if ((this.props.type === '2digit_arg') && (this.props.task.includes('o'))) {
                    this.check_response(symbol);

                } else {
                    console.log('Escaping backspace ' + symbol);
                }
            } else {
                this.check_response(symbol);
            }
        }
    }

    onKeyboard({ key }) {
        // console.log('onKeyboard ' + key + ', this.loading ' + this.loading);
        // skip any checks if in red already
        if (this.loading === false) {
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
                    this.check_response(key);
                    break;

                case '.':
                case ',':
                    if (this.props.type.includes('_fr')) {
                        this.check_response('.');
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
                    if ((this.props.type === '2digit_arg') && (this.props.task.includes('o'))) {
                        this.check_response(key);

                    } else if (this.props.type.includes('_signed') && key === '-') {
                        this.check_response(key);
                    }
                    break;

                case '>':
                case 'ArrowRight':
                    if (this.props.type === 'comp_expr') {
                        this.check_response('>');
                    }
                    break;

                case '<':
                case 'ArrowLeft':
                    if (this.props.type === 'comp_expr') {
                        this.check_response('<');
                    }
                    break;

                case '=':
                case 'ArrowUp':
                case 'ArrowDown':
                    if (this.props.type === 'comp_expr') {
                        this.check_response('=');
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
    }

    check_response(digit) {
        this.loading = true;
        var expected_result = this.state.task.result.toString();
        // console.log('check_response, digit: ' + digit + ', expected_result: ' + expected_result);
        if (expected_result.length === 1) {
            if (digit === expected_result) {
                this.set_passed(digit);
            } else {
                this.set_failed(digit);
            }

        } else if (expected_result.length > 1) {
            if (this.state.result === '?') {
                if (expected_result.charAt(0).toString() === digit) {
                    this.set_interim(digit);
                } else {
                    this.set_failed(digit);
                }
            } else {
                var current = this.state.result + digit;
                if (current === expected_result) {
                    this.set_passed(current);
                } else if (current.length === expected_result.length) {
                    this.set_failed(current);
                } else {
                    var position = this.state.result.length;
                    var val = expected_result.charAt(position).toString();
                    // console.log('val ' + val + ', digit ' + digit + ', position ' + position);
                    if (val === digit) {
                        this.set_interim(current);
                    } else {
                        this.set_failed(current);
                    }
                }
            }
        } else {
            alert('GameBoard.check_response: wrong check_response() statement ' + digit + ', expected_result: ' + expected_result);
            console.log('GameBoard.check_response: wrong check_response() statement ' + digit + ', expected_result: ' + expected_result);
        }
    }

    set_failed(digit) {
        // console.log('set_failed from ' + this.state.attempt + ' attempts');
        // console.log('set_failed ' + digit + ', expected: ' + this.state.task.result.toString());
        // notify parent to change circles color in game footer
        this.props.onColor('red');

        if (this.state.attempt === 0) {
            // notify parent to change circles color in game footer
            this.props.onCounter(this.state.attempt + 1, this.state.task);
            this.setState({color: 'yellow',
                           board: 'red',
                           animation: 'shake 0.8s',
                           result: digit,
                           counter: this.state.counter + 1,
                           failed: this.state.failed + 1,
                           attempt: this.state.attempt + 1});
        } else {
            this.setState({color: 'yellow',
                           board: 'red',
                           animation: 'shake 0.6s',
                           result: digit,
                           attempt: this.state.attempt + 1});
        }

        // clear result value in 1.5 seconds
        setTimeout(() => {
            this.setState({
                color: 'grey',
                board: 'yellow',
                animation: '', result: '?'},
                    () => {
                        this.props.onColor('white');
                        this.loading = false;
            });
        }, 700);
    }

    set_passed(digit) {
        // console.log('PASSED from ' + this.state.attempt + ' attempts');
        if (this.state.attempt === 0) {
            // notify parent to change circles color in game footer
            this.props.onColor('green');
            // notify parent to update counters
            this.props.onCounter(this.state.attempt, this.state.task);
            this.setState({
                color: 'yellow',
                result: digit,
                counter: this.state.counter + 1,
                animation: 'smooth_yellow_to_green 0.8s',
            });
        } else {
            this.props.onColor('yellow');
            this.setState({
                color: 'yellow',
                result: digit,
                animation: 'smooth_yellow_to_green 0.8s',
            });
        }

        setTimeout(() => {this.proceed_with_next_task()}, 800);
    }

    set_interim(digit) {
        this.setState({
            color: 'black',
            result: digit
        });
        this.loading = false;
    }

    /*
            <div onKeyDown={this.onKeyboard} className='gameboard_wrapper'>
    */
    render() {
        return (
            <div className='gameboard_wrapper'>
                {this.props.type.includes('digit') ? (
                    <>
                      <div className='line_body_div_left'>
                        <div className='line_gameboard' style={{backgroundColor: this.state.board, animation: this.state.animation}}>
                            {((this.props.type.indexOf('2digit_arg') !== -1) && ('argument' in this.state.task)) ? (
                              <>
                                {this.state.task.argument.includes('1') ? (
                                    <div className='line_result' style={{color: this.state.color}}>{this.state.result}</div>
                                ) : (
                                    <div className='line_result'>{this.state.task.num1}</div>
                                )}

                                {this.state.task.argument.includes('o') ? (
                                    <div className='line_result' style={{color: this.state.color}}>{this.state.result}</div>
                                ) : (
                                    <div className='line_result'>{this.state.task.operation}</div>
                                )}

                                {this.state.task.argument.includes('2') ? (
                                    <div className='line_result' style={{color: this.state.color}}>{this.state.result}</div>
                                ) : (
                                    <div className='line_result'>{this.state.task.num2}</div>
                                )}
                                <div className='line_result'>=</div>
                                <div className='line_result'>{this.state.task.outcome}</div>
                              </>
                            ) : ( null )}

                            {((this.props.type.indexOf('_2column') !== -1) &&
                                ('num1' in this.state.task) &&
                                ('num2' in this.state.task) &&
                                ('operation' in this.state.task)) ? (
                                  <div style={{height:'90%',width:'90%'}}>
                                    <div style={{height:'25%',width:'80%'}}></div>
                                    <div className='column_number'>{this.state.task.num1}</div>
                                    <div className='column_number'>{this.state.task.operation}   {this.state.task.num2}</div>
                                    <div className='column_black_line'> </div>
                                    <div className='column_result' style={{color: this.state.color}}>{this.state.result}</div>
                                  </div>
                            ) : ( null )}

                            {((this.props.type.indexOf('_3column') !== -1) &&
                                ('num1' in this.state.task) &&
                                ('num2' in this.state.task) &&
                                ('num3' in this.state.task)) ? (
                                  <div style={{height:'90%',width:'90%'}}>
                                    <div style={{height:'25%',width:'80%'}}></div>
                                    <div className='column_number'>{this.state.task.num1}</div>
                                    <div className='column_number'>{this.state.task.operation1}   {this.state.task.num2}</div>
                                    <div className='column_number'>{this.state.task.operation2}   {this.state.task.num3}</div>
                                    <div className='column_black_line'> </div>
                                    <div className='column_result' style={{color: this.state.color}}>{this.state.result}</div>
                                  </div>
                            ) : ( null )}

                            {this.props.type.includes('digits') ? (
                              <>
                                <div className='line_task'>{this.state.task.expr1}</div>
                                {(this.state.task.result.toString().length < 3) ? (
                                    <div className='line_result' style={{color: this.state.color}}>{this.state.result}</div>
                                  ) : ( null )}

                                {(this.state.task.result.toString().length === 3) ? (
                                    <div className='line_3result' style={{color: this.state.color}}>{this.state.result}</div>
                                  ) : ( null )}

                                {(this.state.task.result.toString().length === 4) ? (
                                    <div className='line_4result' style={{color: this.state.color}}>{this.state.result}</div>
                                  ) : ( null )}

                                {(this.state.task.result.toString().length > 4) ? (
                                    <div className='line_5result' style={{color: this.state.color}}>{this.state.result}</div>
                                  ) : ( null )}
                              </>
                            ) : ( null )}
                        </div>
                      </div>
                      <div className='line_body_div_right'>
                          {this.props.task.includes('o,') ? (
                            <OperatorBoard onOperator={this.onOperator} plus={true} minus={true}/>
                          ) : (
                            <KeyBoard onDigit={this.onDigit} onOperator={this.onOperator}/>
                          )}
                      </div>
                    </>
                ):( null ) }

                {this.props.type.includes('comp_') ? (
                    <>
                      <div className='line_body_div_up'>
                        <div className='line_gameboard' style={{backgroundColor: this.state.board, animation: this.state.animation}}>
                          { this.props.type.includes('comp_nums') ? (<div className='line_result'>{this.state.task.expr1}</div>) : (null) }
                          { this.props.type.includes('comp_nums') ? (<div className='line_result' style={{color: this.state.color}}><font>{this.state.result}</font></div>) : (null) }
                          { this.props.type.includes('comp_nums') ? (<div className='line_result'>{this.state.task.expr2}</div>) : (null) }

                          { this.props.type.includes('comp_expr') ? (<div className='line_expression'>{this.state.task.expr1}</div>) : (null) }
                          { this.props.type.includes('comp_expr') ? (<div className='line_result' style={{color: this.state.color}}><font>{this.state.result}</font></div>) : (null) }
                          { this.props.type.includes('comp_expr') ? (<div className='line_expression'>{this.state.task.expr2}</div>) : (null) }
                        </div>
                      </div>

                      <div className='line_body_div_bottom'>
                          <OperatorBoard onOperator={this.onOperator} more={true} less={true} equals={true}/>
                      </div>
                    </>
                ):( null ) }

                {this.props.type.includes('line_') ? (
                    <>
                      <div className='line_body_div_up'>
                        <div className='line_gameboard' style={{backgroundColor: this.state.board, animation: this.state.animation}}>
                          { this.props.type.includes('line_compnums') ? (<div className='line_result'>{this.state.task.expr1}</div>):(null)}
                          { this.props.type.includes('line_compnums') ? (<div className='line_result' style={{color: this.state.color}}><font>{this.state.result}</font></div>):(null)}
                          { this.props.type.includes('line_compnums') ? (<div className='line_result'>{this.state.task.expr2}</div>):(null)}

                          { this.props.type.includes('line_compexpr') ? (<div className='line_expression'>{this.state.task.expr1}</div>):(null)}
                          { this.props.type.includes('line_compexpr') ? (<div className='line_result' style={{color: this.state.color}}><font>{this.state.result}</font></div>):(null)}
                          { this.props.type.includes('line_compexpr') ? (<div className='line_expression'>{this.state.task.expr2}</div>):(null)}

                          { this.props.type.includes('numbers') ? (<div className='line_task'>{this.state.task.expr1}</div>):(null)}
                          { this.props.type.includes('numbers') ? (
                            <>
                                {(this.state.task.result.toString().length < 3) ? (
                                    <div className='line_result' style={{color: this.state.color}}>{this.state.result}</div>
                                  ) : ( null )}

                                {(this.state.task.result.toString().length === 3) ? (
                                    <div className='line_3result' style={{color: this.state.color}}>{this.state.result}</div>
                                  ) : ( null )}

                                {(this.state.task.result.toString().length === 4) ? (
                                    <div className='line_4result' style={{color: this.state.color}}>{this.state.result}</div>
                                  ) : ( null )}

                                {(this.state.task.result.toString().length > 4) ? (
                                    <div className='line_5result' style={{color: this.state.color}}>{this.state.result}</div>
                                  ) : ( null )}
                            </>
                            ):(null)}
                        </div>
                      </div>

                      <div className='line_body_div_bottom'>
                          { this.props.type.includes('line_comp') ? (
                              <OperatorBoard onOperator={this.onOperator} more={true} less={true} equals={true}/>
                            ):(
                              <LineNumbersBoard
                                onDigit={this.onDigit}
                                onOperator={this.onOperator}
                                floats={this.props.type.includes('_fr')}
                                minus={this.props.type.includes('_signed')}
                                />
                            )
                          }
                      </div>
                    </>
                ):( null ) }


            </div>
        );
    }
}
