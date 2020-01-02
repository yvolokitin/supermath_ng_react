import React from 'react';
import {Dialog} from '@material-ui/core';

// import { useAlert, transitions, positions, Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic'

import {generate_2digit_task_from_array} from "./../halpers/functions";

import SMKeyBoard from "./../keyboard/keyboard";
import SMCircles from "./circles";

import './twodigitgame.css';

/*

*/
export default class TwoDigitGame extends React.Component {
    constructor(props) {
        super(props);
        this.onDigit = this.onDigit.bind(this);
        this.onOperator = this.onOperator.bind(this);
        this.onKeyboard = this.onKeyboard.bind(this);

        /*
            {'number_1': num_1, 'number_2': num_2, 'operation': task_operation, 'result': res};
            for very first run, default program is ['+', '0,10', '0,10', 1, 1]
            so, we have to initialize initial state to proper output if user will select that program
        */
        this.task = generate_2digit_task_from_array(this.props.task);
        this.state = {number_1: this.task.number_1,
                      operation: this.task.operation,
                      number_2: this.task.number_2,
                      result: '?',
                      color: 'grey',
                      circle: 'white',
                      counter: 0,
                      passed: 0,
                      failed: 0,
                      attempt: 0};
    }

    componentDidMount() {
        // console.log("componentDidMount " + this.props.task);
    }

    componentDidUpdate(prevProps) {
        // console.log("componentDidUpdate " + prevProps.task + ", this.props.task " + this.props.task + ", this.props.count " + this.props.count);
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.task !== prevProps.task) { this.set_task(); }
    }

    set_task() {
        this.task = generate_2digit_task_from_array(this.props.task);
        this.setState({number_1: this.task.number_1,
                       operation: this.task.operation,
                       number_2: this.task.number_2,
                       result: '?',
                       color: 'grey',
                       circle: 'white',
                       counter: 0,
                       passed: 0,
                       failed: 0,
                       attempt: 0});
    }

    proceed_with_next_task() {
        // console.log("proceed_with_next_task " + this.state.counter + ", " + this.props.count);
        this.task = generate_2digit_task_from_array(this.props.task);

        if (this.state.counter < this.props.count) {
            this.setState({number_1: this.task.number_1,
                           operation: this.task.operation,
                           number_2: this.task.number_2,
                           color: 'grey',
                           circle: 'white',
                           result: '?',
                           attempt: 0});
        } else {
            console.log("Game is Finished");
            this.props.onClick("finished", this.state);
            // in case of replay, we have to be able to restart game
            this.set_task();
        }
    }

    close_game() {
        this.props.onClick("interrapted");
        this.set_task();
        console.log("Game has been Interrapted !!!");
    }

    onDigit({ target }) {
        // console.log("onDigit " + target.innerText);
        this.check_response((target.innerText).toString());
    }

    onOperator({ target }) {
        const operator = target.innerText;
        console.log("TBD, onOperator " + operator);
    }

    onKeyboard({ key }) {
        // console.log("onKeyboard " + key);
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
                this.close_game();
                break;

            default:
                // console.log("nothing to check");
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
        // console.log("PASSED from " + this.state.attempt + " attempts");
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

    /*
        Warning: The tag <text> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
                            <text style={{color: 'black'}}>{this.state.counter}</text> &nbsp; &#128279; &nbsp;
                            <text style={{color: 'green'}}>{this.state.passed}</text> &nbsp; &#128515; &nbsp;
                            <text style={{color: 'red'}}>{this.state.failed}</text> &nbsp; &#128169;
    */
    render() {
        return (
            <Dialog onClose={() => this.props.onClick("onClose")} fullScreen={true} onKeyDown={this.onKeyboard} open={this.props.open}>
                <div className="wrapper">
                    <div className="header_div">
                        <div className="header_div_left" onClick={() => this.props.onClick("interrapted")}>
                            SUPERMATH
                        </div>
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
