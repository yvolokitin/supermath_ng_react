import React from 'react';
import {Dialog} from '@material-ui/core';

import {generate_3digit_task_from_string} from "./../halpers/functions";

import SMCircles from "./circles";
import SMKeyBoard from "./../keyboard/keyboard";

import GameHeader from "./game_header";
import GameResults from "./game_results";

import './threedigitgame.css';

/*

*/
export default class ThreeDigitGame extends React.Component {
    constructor(props) {
        super(props);
        this.onDigit = this.onDigit.bind(this);
        this.onKeyboard = this.onKeyboard.bind(this);
        this.onGameClose = this.onGameClose.bind(this);
        this.onResultsClose = this.onResultsClose.bind(this);

        this.state = {number_1: '1',
                      operation_1: '+',
                      number_2: '1',
                      operation_2: '+',
                      number_3: '1',
                      result: '?',
                      color: 'grey',
                      circle: 'white',
                      counter: 0,
                      passed: 0,
                      failed: 0,
                      attempt: 0,
                      show_results: false,
                      user_results: []};

        // array to store all user tasks
        this.results =[];
    }

    componentDidMount() {
        // console.log("componentDidMount " + this.props.task);
    }

    componentDidUpdate(prevProps) {
        // console.log("componentDidUpdate " + prevProps.task + ", this.props.task " + this.props.task + ", this.props.count " + this.props.count);
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.task !== prevProps.task) {
            if (this.props.open === true) {
                this.set_task();
            }
        }
    }

    onResultsClose(status) {
        console.log("onResultsClose, status " + status);
        this.results = [];

        if (status === 'close') {
            this.props.onClick("finished", this.state);
        }

        // in case of replay, we have to be able to restart game
        this.set_task();
    }

    set_task() {
        this.task = generate_3digit_task_from_string(this.props.task);
        this.setState({number_1: this.task.number_1,
                       operation_1: this.task.operation_1,
                       number_2: this.task.number_2,
                       operation_2: this.task.operation_2,
                       number_3: this.task.number_3,
                       result: '?',
                       color: 'grey',
                       circle: 'white',
                       counter: 0,
                       passed: 0,
                       failed: 0,
                       attempt: 0,
                       show_results: false,
                       user_results: []});
    }

    proceed_with_next_task() {
        // save user task results
        var to_add = {number_1: this.task.number_1,
                      operation_1: this.task.operation_1,
                      number_2: this.task.number_2,
                      operation_2: this.task.operation_2,
                      number_3: this.task.number_3,
                      result: this.task.result,
                      attempt: this.task.attempt};
        this.results.push(to_add);

        console.log("proceed_with_next_task " + this.props.task);
        this.task = generate_3digit_task_from_string(this.props.task);
        if (this.state.counter < this.props.count) {
            this.setState({number_1: this.task.number_1,
                           operation_1: this.task.operation_1,
                           number_2: this.task.number_2,
                           operation_2: this.task.operation_2,
                           number_3: this.task.number_3,
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
                           counter: this.state.counter});
        }
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
        
    */
    render() {
        return (
            <Dialog onClose={() => this.props.onClick()} fullScreen={true} onKeyDown={this.onKeyboard} open={this.props.open}>
                <div style={{height:'100%',width:'100%'}}>
                    <GameHeader onClick={this.onGameClose} width='35%' counter={this.state.counter} passed={this.state.passed} failed={this.state.failed}/>

                    <div className="d3_body_div">
                        <div className="d3_body_div_left">
                            <div className="d3_gameboard">
                                <div className="d3_task">{this.state.number_1}</div>
                                <div className="d3_task">{this.state.operation_1}</div>
                                <div className="d3_task">{this.state.number_2}</div>
                                <div className="d3_task">{this.state.operation_2}</div>
                                <div className="d3_task">{this.state.number_3}</div>
                                <div className="d3_task">=</div>
                                <div className="d3_task" style={{color: this.state.color}}>{this.state.result}</div>
                            </div>
                        </div>

                        <div className="d3_body_div_right">
                            <SMKeyBoard onDigit={this.onDigit} onOperator={this.onOperator} />
                        </div>
                    </div>

                    <div className="d3_footer_div">
                        <SMCircles color={this.state.circle}/>
                    </div>
                </div>

                <GameResults open={this.state.show_results} user_results={this.state.user_results}
                             passed={this.state.passed} failed={this.state.failed} counter={this.state.counter}
                             onClick={this.onResultsClose}/>
            </Dialog>
        );
    }
}
