import React from 'react';
import {generate_task_from_string} from "./../halpers/functions";
import SMKeyBoard from "./../keyboard/keyboard";
import OperatorBoard from "./../keyboard/operatorboard";
import './gameboard.css';

export default class GameBoard extends React.Component {
    constructor(props) {
        super(props);

        this.onDigit = this.onDigit.bind(this);
        this.onOperator = this.onOperator.bind(this);
        this.onKeyboard = this.onKeyboard.bind(this);

        // current task
        // console.log('CALLED: generate_task_from_string ' + props.type + ' ' + props.task);
        this.task = generate_task_from_string(props.type, props.task);
        this.state = {task: this.task.task,
                      expression_1: this.task.expression_1,
                      expression_2: this.task.expression_2,
                      result: '?',
                      color: 'grey',
                      board: 'yellow',
                      counter: 0,
                      attempt: 0};

        // to ignore user actions during animation
        this.loading = false;
    }

    componentDidUpdate(prevProps) {
        // console.log("GameBoard.componentDidUpdate " + this.props.task);
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.task !== prevProps.task) {
            this.timer = new Date().getTime();
            this.set_task();
        }
    }

    set_task() {
        // console.log("GameBoard.set_task " + this.state.counter);
        this.task = generate_task_from_string(this.props.type, this.props.task);
        this.setState({task: this.task.task,
                       expression_1: this.task.expression_1,
                       expression_2: this.task.expression_2,
                       board: 'yellow',
                       result: '?',
                       color: 'grey',
                       attempt: 0});
        this.props.onColor('white');
        this.loading = false;
    }

    proceed_with_next_task() {
        // console.log("proceed_with_next_task:: counter: " + this.state.counter + ", amount: " + this.props.amount);
        if (this.state.counter < this.props.amount) {
            this.set_task();

        } else {
            console.log("Game is Finished");
            this.props.onClose('finished');
        }
    }

    onDigit({ target }) {
        // console.log("onDigit " + target.innerText);
        // skip any checks if in red already
        if (this.loading === false) {
            this.check_response((target.innerText).toString());
        }
    }

    onOperator({ target }) {
        // console.log("check operator response " + target.innerText);
        if (this.loading === false) {
            if (this.props.type.includes('d')) {
                var expected_result = this.task.result.toString();
                if ((expected_result.length > 1) && (this.state.result !== '?')) {
                    var new_result = this.state.result.substring(0, this.state.result.length - 1);
                    if (new_result.length === 0) {
                        this.setState({result: '?', color: 'grey'});
                    } else {
                        this.setState({result: new_result});
                    }
                } else {
                    console.log("Escaping backspace " + target.innerText);
                }
            } else {
                this.check_response(target.innerText);
            }
        }
    }

    onKeyboard({ key }) {
        console.log("onKeyboard " + key);
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
                case 'Escape':
                    console.log('onKeyboard: Escape');
                    // this.onGameClose('');
                    break;
                default:
                    // console.log("nothing to check");
                    break;
            }
        }
    }

    check_response(digit) {
        this.loading = true;
        var expected_result = this.task.result.toString();
        // console.log("check_response, digit: " + digit + ", expected_result: " + expected_result);
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
                    // console.log("val " + val + ", digit " + digit + ", position " + position);
                    if (val === digit) {
                        this.set_interim(current);
                    } else {
                        this.set_failed(current);
                    }
                }
            }
        } else {
            alert("ERROR: Unknown check_response() statement " + digit);
        }
    }

    set_failed(digit) {
        // console.log("FAILED from " + this.state.attempt + " attempts");

        // notify parent to change circles color in game footer
        this.props.onColor('red');

        if (this.state.attempt === 0) {
            // notify parent to change circles color in game footer
            this.props.onCounter(this.state.attempt + 1);
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
            this.setState({color: 'grey', board: 'yellow', animation: '', result: '?'});
            this.props.onColor('white');
            this.loading = false;
        }, 700);
    }

    set_passed(digit) {
        // console.log("PASSED from " + this.state.attempt + " attempts");
        if (this.state.attempt === 0) {
            // notify parent to change circles color in game footer
            this.props.onColor('green');
            // notify parent to change circles color in game footer
            this.props.onCounter(this.state.attempt);
            // 
            this.setState({board: 'green', color: 'yellow', result: digit, counter: this.state.counter + 1});
        } else {
            this.props.onColor('yellow');
            this.setState({board: 'green', color: 'yellow', result: digit});
        }

        // generate new task and update
        setTimeout(() => {this.proceed_with_next_task()}, 800);
    }

    set_interim(digit) {
        this.setState({color: 'black', result: digit});
        this.loading = false;
    }

/*
                <div className="line_body_div_left">
                    <div className="line_gameboard" style={{backgroundColor: this.state.board, animation: this.state.animation}}>
                        { this.props.type.includes('d') ? (<div className="line_task">{this.state.task}</div>) : (null) }
                        { this.props.type.includes('d') ? (<div className="line_result" style={{color: this.state.color}}>{this.state.result}</div>) : (null) }

                        { this.props.type.includes('co') ? (<div className="line_expression">{this.state.expression_1}</div>) : (null) }
                        { this.props.type.includes('co') ? (<div className="line_result" style={{color: this.state.color}}><font>{this.state.result}</font></div>) : (null) }
                        { this.props.type.includes('co') ? (<div className="line_expression">{this.state.expression_2}</div>) : (null) }

                        { this.props.type.includes('op') ? (<div className="line_result"><font>{this.state.expression_1}</font></div>) : (null) }
                        { this.props.type.includes('op') ? (<div className="line_result" style={{color: this.state.color}}><font>{this.state.result}</font></div>) : (null) }
                        { this.props.type.includes('op') ? (<div className="line_expression">{this.state.expression_2}</div>) : (null) }
                    </div>
                </div>

                <div className="line_body_div_right">
                    { this.props.type.includes('d') ? (<SMKeyBoard onDigit={this.onDigit} onOperator={this.onOperator} />) : (null) }
                    { this.props.type.includes('co') ? (<OperatorBoard onOperator={this.onOperator} more={true} less={true} equals={true} plus={false} minus={false} mul={false} div={false}/>) : (null) }
                    { this.props.type.includes('op') ? (<OperatorBoard onOperator={this.onOperator} more={false} less={false} equals={false} plus={true} minus={true} mul={false} div={false}/>) : (null) }
                </div>
*/
    render() {
        return (
            <div onKeyDown={this.onKeyboard} className="gameboard_wrapper">
                {this.props.type.includes('d') ? (
                    <>
                      <div className="line_body_div_left">
                        <div className="line_gameboard" style={{backgroundColor: this.state.board, animation: this.state.animation}}>
                            <div className="line_task">{this.state.task}</div>
                            <div className="line_result" style={{color: this.state.color}}>{this.state.result}</div>
                        </div>
                      </div>
                      <div className="line_body_div_right">
                          <SMKeyBoard onDigit={this.onDigit} onOperator={this.onOperator} />
                      </div>
                    </>
                ):(
                    <>
                      <div className='line_body_div_up'>
                        <div className="line_gameboard" style={{backgroundColor: this.state.board, animation: this.state.animation}}>
                          { this.props.type.includes('co') ? (<div className="line_expression">{this.state.expression_1}</div>) : (null) }
                          { this.props.type.includes('co') ? (<div className="line_result" style={{color: this.state.color}}><font>{this.state.result}</font></div>) : (null) }
                          { this.props.type.includes('co') ? (<div className="line_expression">{this.state.expression_2}</div>) : (null) }

                          { this.props.type.includes('op') ? (<div className="line_result"><font>{this.state.expression_1}</font></div>) : (null) }
                          { this.props.type.includes('op') ? (<div className="line_result" style={{color: this.state.color}}><font>{this.state.result}</font></div>) : (null) }
                          { this.props.type.includes('op') ? (<div className="line_expression">{this.state.expression_2}</div>) : (null) }
                        </div>
                      </div>

                      <div className="line_body_div_right">
                        { this.props.type.includes('co') ? (<OperatorBoard onOperator={this.onOperator} more={true} less={true} equals={true} plus={false} minus={false} mul={false} div={false}/>) : (null) }
                        { this.props.type.includes('op') ? (<OperatorBoard onOperator={this.onOperator} more={false} less={false} equals={false} plus={true} minus={true} mul={false} div={false}/>) : (null) }
                      </div>
                    </>
                )}
            </div>
        );
    }
}
