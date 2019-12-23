import React from 'react';
import {Dialog} from '@material-ui/core';

import {generate_2digit_task} from "./../halpers/functions";

import SMKeyBoard from "./../keyboard/keyboard";
import SMCircles from "./circles";

import './twodigitgame.css';

/*

*/
export default class TwoDigitGame extends React.Component {
    constructor(props) {
        super(props);

        console.log("TwoDigitGame constructor called: " + props.task);
        this.argv = {'o': props.task[0], 'r1': props.task[1], 'r2': props.task[2], 'f1': props.task[3], 'f2': props.task[4],};

        this.onDigit = this.onDigit.bind(this);
        this.onOperator = this.onOperator.bind(this);
        this.onKeyboard = this.onKeyboard.bind(this);

        /*
            {'number_1': num_1, 'number_2': num_2, 'operation': task_operation, 'result': res};
        */
        this.task = generate_2digit_task(this.argv.o, this.argv.r1, this.argv.r2, this.argv.f1, this.argv.f2);
        this.user_enter = '';
        this.state = {number_1: this.task.number_1,
                      operation: this.task.operation,
                      number_2: this.task.number_2,
                      result: '?',
                      color: 'grey',
                      decoration: '',
                      circle: 'white',
                      counter: 0,
                      passed: 0,
                      failed: 0,
                      attempt: 0};
    }

    onDigit({ target }) {
        console.log("onDigit " + target.innerText);
        this.check_response((target.innerText).toString());
    }

    onOperator({ target }) {
        const operator = target.innerText;
        console.log("TBD, onOperator " + operator);
    }

    onKeyboard({ key }) {
        console.log("onKeyboard " + key);
        var digit = '';
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

            case '+':
            case '-':
            case '=':
            case '>':
            case '<':
                console.log("TBD: check operator response");
                break;

            case 'Escape':
                console.log("Escaping from Game");
                this.props.onClick();
                break;

            default:
                console.log("nothing to check");
                break;
        }
    }

    check_response(digit) {
        var expected_result = this.task.result.toString();
        if (expected_result.length === 1) {
            if (digit === expected_result) {
                this.set_passed(digit);
            } else {
                this.set_failed(digit);
            }

        } else if (expected_result.length === 2) {
            if (this.state.result === '?') {
                if (expected_result.charAt(0).toString() === digit) {
                    this.set_interim(digit);
                } else {
                    this.set_failed(digit);
                }
            } else if (this.state.result.length === 1) {
                var current = this.state.result + digit;
                if (current === expected_result) {
                    this.set_passed(current);
                } else {
                    this.set_failed(current);
                }
            }

        } else if (this.task.result.toString().length === 3) {
            console.log("tbd...not implemented yet.");
        }
    }

    set_failed(digit) {
        console.log("FAILED from " + this.state.attempt + " attempts");
        if (this.state.attempt === 0) {
            this.setState({color: 'red',
                           result: digit,
                           circle: 'red',
                           counter: this.state.counter + 1,
                           failed: this.state.failed + 1,
                           attempt: this.state.attempt + 1});
        } else {
            this.setState({color: 'red',
                           circle: 'red',
                           result: digit,
                           attempt: this.state.attempt + 1});
        }
        // clear result value in 1.5 seconds
        setTimeout(() => {this.setState({color: 'grey', result: '?'});}, 600);
    }

    set_passed(digit) {
        console.log("PASSED from " + this.state.attempt + " attempts");
        if (this.state.attempt === 0) {
            this.setState({color: 'green',
                           circle: 'green',
                           result: digit,
                           counter: this.state.counter + 1,
                           passed: this.state.passed + 1});
        } else {
            this.setState({color: 'green',
                           circle: 'yellow',
                           result: digit});
        }
        // generate new task and update
        setTimeout(() => {this.proceed_with_next_task()}, 600);
    }

    set_interim(digit) {
        this.setState({color: 'black',
                       result: digit});
    }

    proceed_with_next_task() {
        console.log("proceed_with_next_task " + this.props.task);
        this.task = generate_2digit_task(this.argv.o, this.argv.r1, this.argv.r2, this.argv.f1, this.argv.f2);
        this.setState({number_1: this.task.number_1,
                       operation: this.task.operation,
                       number_2: this.task.number_2,
                       color: 'grey',
                       circle: 'white',
                       result: '?',
                       attempt: 0});
    }

    /*
        <Dialog onClose={() => this.props.onClick()} fullScreen={true} open={this.props.open}>
        https://about.phamvanlam.com/calculator/

        Warning: The tag <text> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
                            <text style={{color: 'black'}}>{this.state.counter}</text> &nbsp; &#128279; &nbsp;
                            <text style={{color: 'green'}}>{this.state.passed}</text> &nbsp; &#128515; &nbsp;
                            <text style={{color: 'red'}}>{this.state.failed}</text> &nbsp; &#128169;
    */
    render() {
        return (
            <Dialog onClose={() => this.props.onClick()} fullScreen={true} onKeyDown={this.onKeyboard} open={this.props.open}>
                <div className="wrapper">
                    <div className="header_div">
                        <div className="header_div_left">SUPERMATH</div>
                        <div className="header_div_right">
                            <font style={{color: 'black'}}>{this.state.counter}</font> &nbsp; &#128279; &nbsp;
                            <font style={{color: 'green'}}>{this.state.passed}</font> &nbsp; &#128515; &nbsp;
                            <font style={{color: 'red'}}>{this.state.failed}</font> &nbsp; &#128169;
                        </div>
                    </div>

                    <div className="body_div">
                        <div className="body_div_left">
                            <div className="gameboard">
                                <div className="gameplay">
                                    <div className="mo_task">{this.state.number_1}</div>
                                    <div className="mo_task">{this.state.operation}   {this.state.number_2}</div>
                                    <div className="black_line"> </div>
                                    <div className="mo_result" style={{color: this.state.color}}>{this.state.result}</div>
                                </div>
                            </div>
                        </div>

                        <div className="body_div_right">
                            <SMKeyBoard onDigit={this.onDigit} onOperator={this.onOperator} />
                        </div>
                    </div>

                    <div className="footer_div">
                        <SMCircles color={this.state.circle}/>
                    </div>
                </div>
            </Dialog>
        );
    }
}
