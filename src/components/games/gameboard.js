import React from 'react';
import {generate_task_from_string} from "./../halpers/functions";
import SMKeyBoard from "./../keyboard/keyboard";
import './gameboard.css';

export default class GameBoard extends React.Component {
    constructor(props) {
        super(props);

        this.onDigit = this.onDigit.bind(this);
        this.onKeyboard = this.onKeyboard.bind(this);

        // current task
        console.log('CALLED: generate_task_from_string');
        this.task = generate_task_from_string(props.type, props.task);
        this.state = {task: this.task.task,
                      result: '?',
                      color: 'grey',
                      counter: 0,
                      attempt: 0};
    }

    componentDidUpdate(prevProps) {
        // console.log("GameBoard.componentDidUpdate " + this.props.task);
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.task !== prevProps.task) {
            this.set_task();
        }
    }

    set_task() {
        console.log("GameBoard.set_task " + this.props.type);
        this.task = generate_task_from_string(this.props.type, this.props.task);
        this.setState({task: this.task.task,
                       result: '?',
                       color: 'grey',
                       counter: this.state.counter + 1,
                       attempt: 0});
        this.props.onColor('white');
    }

    proceed_with_next_task() {
        console.log("proceed_with_next_task " + this.state.counter + ", " + this.props.amount);
        if (this.state.counter < this.props.amount) {
            this.set_task();

        } else {
            console.log("Game is Finished");
            this.props.onClose('finished');
        }
    }

    onDigit({ target }) {
        // console.log("onDigit " + target.innerText);
        this.check_response((target.innerText).toString());
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
            case 'Escape':
                console.log('onKeyboard: Escape');
                // this.onGameClose('');
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

        // notify parent to change circles color in game footer
        this.props.onColor('red');

        if (this.state.attempt === 0) {
            // notify parent to change circles color in game footer
            this.props.onCounter(this.state.attempt + 1);
            this.setState({color: 'red',
                           result: digit,
                           counter: this.state.counter + 1,
                           failed: this.state.failed + 1,
                           attempt: this.state.attempt + 1});
        } else {
            this.setState({color: 'red',
                           result: digit,
                           attempt: this.state.attempt + 1});
        }

        // clear result value in 1.5 seconds
        setTimeout(() => {this.setState({color: 'grey', result: '?'});this.props.onColor('white');}, 700);
    }

    set_passed(digit) {
        // console.log("PASSED from " + this.state.attempt + " attempts");
        if (this.state.attempt === 0) {
            // notify parent to change circles color in game footer
            this.props.onColor('green');
            // notify parent to change circles color in game footer
            this.props.onCounter(this.state.attempt);
            // 
            this.setState({color: 'green',
                           result: digit,
                           attempt: 0,
                           counter: this.state.counter + 1});
        } else {
            this.props.onColor('yellow');
            this.setState({color: 'green', result: digit});
        }

        // generate new task and update
        setTimeout(() => {this.proceed_with_next_task()}, 700);
    }

    set_interim(digit) {
        this.setState({color: 'black', result: digit});
    }

    /*
        Warning: The tag <text> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
                            <text style={{color: 'black'}}>{this.state.counter}</text> &nbsp; &#128279; &nbsp;
                            <text style={{color: 'green'}}>{this.state.passed}</text> &nbsp; &#128515; &nbsp;
                            <text style={{color: 'red'}}>{this.state.failed}</text> &nbsp; &#128169;
    */
    render() {
        return (
            <div style={{height:'100%',width:'100%',}}>
                <div className="line_body_div_left">
                    <div className="line_gameboard">
                        <div className="line_task">{this.state.task}</div>
                        <div className="line_result" style={{color: this.state.color}}>{this.state.result}</div>
                    </div>
                </div>

                <div className="line_body_div_right">
                    <SMKeyBoard onDigit={this.onDigit} onOperator={this.onOperator} />
                </div>
            </div>
        );
    }
}
