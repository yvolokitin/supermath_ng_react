import React from 'react';
import {generate_2digit_task_from_string} from "./../halpers/functions";
import {generate_3digit_task_from_string} from "./../halpers/functions";
import {generate_comparison_task_from_string} from "./../halpers/functions";
import SMKeyBoard from "./../keyboard/keyboard";
import './gameboard.css';

export default class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.onDigit = this.onDigit.bind(this);
        this.onKeyboard = this.onKeyboard.bind(this);
        this.onGameClose = this.onGameClose.bind(this);

        this.task = this.generate_task();
        this.state = {task: this.task.task,
                      result: '?',
                      color: 'grey',
                      circle: 'white',
                      counter: props.counter,
                      attempt: 0};

        // current task
        this.task = '';
        // array to store all user tasks
        this.results =[];
        console.log("GameBoard.constructor(props) " + props.task);
    }

    componentDidUpdate(prevProps) {
        console.log("GameBoard.componentDidUpdate " + this.props.task);
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.task !== prevProps.task) {
            this.set_task();
        }
    }

    generate_task() {
        var new_task;
        if (this.props.type === '2d') {
            new_task = generate_2digit_task_from_string(this.props.task);
        } else if (this.props.type === '3d') {
            new_task = generate_3digit_task_from_string(this.props.task);
        } else if (this.props.type === 'op') {
            new_task = generate_2digit_task_from_string(this.props.task);
        } else if (this.props.type === 'co') {
            new_task = generate_comparison_task_from_string(this.props.task);
        } else  {
            new_task = 'Error: wrong task type is used';
        }
        return new_task;
    }

    set_task() {
        console.log("GameBoard.set_task " + this.props.type);
        this.task = generate_task();
        this.setState({task: this.task.task,
                       result: '?',
                       color: 'grey',
                       circle: 'white',
                       attempt: 0});
    }

    proceed_with_next_task() {
        // save user task results
        var to_add = {number_1: this.task.number_1,
                      number_2: this.task.number_2,
                      operation: this.task.operation,
                      result: this.task.result,
                      attempt: this.task.attempt};
        this.results.push(to_add);

        // console.log("proceed_with_next_task " + this.state.counter + ", " + this.props.count);
        this.task = generate_2digit_task_from_string(this.props.task);
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
            this.setState({show_results: true,
                           user_results: this.results,
                           passed: this.state.passed,
                           failed: this.state.failed,
                           counter: this.state.counter,
                           circle: 'white'});
        }

        // console.log("this.results " + this.results.toString());
    }

    onGameClose() {
        console.log("Game has been Interrapted !!!");
        this.props.onClick("interrapted");
        this.results = [];
        this.set_task();
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
                this.onGameClose();
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
            // notify parent to change circles color in game footer
            this.props.onColorUpdate("green");
            // notify parent to change circles color in game footer
            this.props.onColorUpdate("green");
            // 
            this.setState({color: 'green',
                           circle: 'green',
                           result: digit,
                           attempt: 0,
                           counter: this.state.counter + 1});
        } else {
            this.setState({color: 'green',
                           circle: 'yellow',
                           result: digit});
        }
        // generate new task and update
        setTimeout(() => {this.proceed_with_next_task()}, 600);
    }

    set_interim(digit) {
        this.setState({color: 'black', result: digit});
    }

    /*
        Warning: The tag <text> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
                            <text style={{color: 'black'}}>{this.state.counter}</text> &nbsp; &#128279; &nbsp;
                            <text style={{color: 'green'}}>{this.state.passed}</text> &nbsp; &#128515; &nbsp;
                            <text style={{color: 'red'}}>{this.state.failed}</text> &nbsp; &#128169;

        onClose={() => this.props.onClick()} 
    */
    render() {
        return (
            <div style={{height:'100%',width:'100%',border:'1px solid black'}}>
                <div className="line_body_div_left">
                    <div className="line_gameboard">
                        <div className="line_task">{this.state.task}</div>
                        <div className="line_result" style={{color: this.state.color}}>{this.state.result}</div>
                    </div>
                </div>

                <div className="d2_body_div_right">
                    <SMKeyBoard onDigit={this.onDigit} onOperator={this.onOperator} />
                </div>
            </div>
        );
    }
}
