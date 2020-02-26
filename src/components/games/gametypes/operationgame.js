import React from 'react';
import {generate_2digit_task_from_string} from "./../../halpers/functions";
import SMKeyBoard from "./../../keyboard/keyboard";
import './operationgame.css';

export default class OperationGame extends React.Component {
    constructor(props) {
        super(props);
        this.onOperator = this.onOperator.bind(this);
        this.onKeyboard = this.onKeyboard.bind(this);
        this.onGameClose = this.onGameClose.bind(this);
        this.onResultsClose = this.onResultsClose.bind(this);

        this.state = {number_1: '',
                      operation: '?',
                      number_2: '',
                      result: '',
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

    componentDidUpdate(prevProps) {
        // console.log("componentDidUpdate " + prevProps.task + ", this.props.task " + this.props.task + ", this.props.count " + this.props.count);
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.task !== prevProps.task) {
            if (this.props.open === true) {
                this.set_task();
            }
        }
    }

    onOperator({ target }) {
        console.log("check operator response " + target.innerText);
        this.check_response(target.innerText);
    }

    onKeyboard({ key }) {
        // console.log("onKeyboard " + key);
        switch (key) {
            case '+':
            case '-':
                console.log("check keyboard response " + key);
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

    onResultsClose(status, passed, failed) {
        console.log("onResultsClose, status " + status);
        this.results = [];

        if (status === 'close') {
            this.props.onClick("finished");
        }

        // hide results, set counter 0 and clear history
        this.set_task();
    }

    onGameClose() {
        console.log("Game has been Interrapted !!!");
        this.props.onClick("interrapted");
        this.results = [];
        this.set_task();
    }

    check_response(operator) {
        var expected_result = this.task.operation.toString();
        if (expected_result === operator) {
            this.set_passed(operator);
        } else {
            this.set_failed(operator);
        }
    }

    set_failed(operator) {
        // console.log("FAILED from " + this.state.attempt + " attempts");
        if (this.state.attempt === 0) {
            this.setState({color: 'red',
                           operation: operator,
                           circle: 'red',
                           counter: this.state.counter + 1,
                           failed: this.state.failed + 1,
                           attempt: this.state.attempt + 1});
        } else {
            this.setState({color: 'red',
                           circle: 'red',
                           operation: operator,
                           attempt: this.state.attempt + 1});
        }

        // clear result value in 600 mili seconds
        setTimeout(() => {this.setState({color: 'grey', operation: '?'});}, 600);
    }

    set_passed(operator) {
        // console.log("PASSED from " + this.state.attempt + " attempts");
        if (this.state.attempt === 0) {
            this.setState({color: 'green',
                           circle: 'green',
                           operation: operator,
                           counter: this.state.counter + 1,
                           passed: this.state.passed + 1});
        } else {
            this.setState({color: 'green',
                           circle: 'yellow',
                           operation: operator});
        }
        // generate new task and update
        setTimeout(() => {this.proceed_with_next_task()}, 600);
    }

    set_task() {
        this.task = generate_2digit_task_from_string(this.props.task);
        this.setState({number_1: this.task.number_1,
                       operation: '?',
                       number_2: this.task.number_2,
                       result: this.task.result,
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
                      number_2: this.task.number_2,
                      operation: this.task.operation,
                      result: this.task.result,
                      attempt: this.task.attempt};
        this.results.push(to_add);

        // console.log("proceed_with_next_task " + this.state.counter + ", " + this.props.count);
        this.task = generate_2digit_task_from_string(this.props.task);
        if (this.state.counter < this.props.count) {
            this.setState({number_1: this.task.number_1,
                           operation: '?',
                           number_2: this.task.number_2,
                           result: this.task.result,
                           color: 'grey',
                           circle: 'white',
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
    }

    render() {
        return (
            <div style={{height:'100%',width:'100%'}}>
                    <div className="op_body_div">
                        <div className="op_body_div_left">
                            <div className="op_gameboard">
                                <div className="op_task">{this.state.number_1}</div>
                                <div className="op_task" style={{color: this.state.color}}>{this.state.operation}</div>
                                <div className="op_task">{this.state.number_2}</div>
                                <div className="op_task">=</div>
                                <div className="op_task">{this.state.result}</div>
                            </div>
                        </div>

                        <div className="op_body_div_right">
                            <SMKeyBoard onDigit={this.onDigit} onOperator={this.onOperator} />
                        </div>
                    </div>
            </div>
        );
    }
}
