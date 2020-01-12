import React from 'react';
import {Dialog} from '@material-ui/core';

import {generate_comparison_task_from_string} from "./../halpers/functions";
import SMCircles from "./circles";
import OperatorBoard from "./../keyboard/operatorboard";
import GameResults from "./game_results";
import GameHeader from "./game_header";

import './comparisongame.css';

export default class СomparisonGame extends React.Component {
    constructor(props) {
        super(props);
        this.onOperator = this.onOperator.bind(this);
        this.onKeyboard = this.onKeyboard.bind(this);
        this.onGameClose = this.onGameClose.bind(this);
        this.onResultsClose = this.onResultsClose.bind(this);

        this.state = {expression_1: '',
                      expression_2: '',
                      comparison: '',
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
        this.task = generate_comparison_task_from_string(this.props.task);
        this.setState({expression_1: this.task.expression_1,
                       expression_2: this.task.expression_2,
                       comparison: this.task.comparison,
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
        var to_add = {expression_1: this.task.expression_1,
                      expression_2: this.task.expression_2,
                      comparison: this.task.comparison,
                      result: this.task.result,
                      attempt: this.task.attempt};
        this.results.push(to_add);

        // console.log("proceed_with_next_task " + this.state.counter + ", " + this.props.count);
        this.task = generate_comparison_task_from_string(this.props.task);
        if (this.state.counter < this.props.count) {
            this.setState({expression_1: this.task.expression_1,
                           expression_2: this.task.expression_2,
                           comparison: this.task.comparison,
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

    onOperator({ target }) {
        console.log("check operator response " + target.innerText);
        this.check_response(target.innerText);
    }

    onKeyboard({ key }) {
        // console.log("onKeyboard " + key);
        switch (key) {
            case '+':
            case '-':
            case '=':
            case '>':
            case '<':
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
                           result: operator,
                           circle: 'red',
                           counter: this.state.counter + 1,
                           failed: this.state.failed + 1,
                           attempt: this.state.attempt + 1});
        } else {
            this.setState({color: 'red',
                           circle: 'red',
                           result: operator,
                           attempt: this.state.attempt + 1});
        }

        // clear result value in 600 mili seconds
        setTimeout(() => {this.setState({color: 'grey', result: '?'});}, 600);
    }

    set_passed(operator) {
        // console.log("PASSED from " + this.state.attempt + " attempts");
        if (this.state.attempt === 0) {
            this.setState({color: 'green',
                           circle: 'green',
                           result: operator,
                           counter: this.state.counter + 1,
                           passed: this.state.passed + 1});
        } else {
            this.setState({color: 'green',
                           circle: 'yellow',
                           result: operator});
        }
        // generate new task and update
        setTimeout(() => {this.proceed_with_next_task()}, 600);
    }

    onGameClose() {
        console.log("Game has been Interrapted !!!");
        this.props.onClick("interrapted");
        this.results = [];
        this.set_task();
    }

    render() {
        return (
            <Dialog fullScreen={true} onKeyDown={this.onKeyboard} open={this.props.open}>
                <div style={{height:'100%',width:'100%'}}>
                    <GameHeader onClick={this.onGameClose} type='comparision' counter={this.state.counter} passed={this.state.passed} failed={this.state.failed}/>

                    <div className="co_body_div_board">
                        <div className="co_expression">{this.state.expression_1}</div>
                        <div className="co_result" style={{color: this.state.color}}>{this.state.result}</div>
                        <div className="co_expression">{this.state.expression_2}</div>
                    </div>

                    <div className="co_body_div_operator">
                        <OperatorBoard onOperator={this.onOperator} />
                    </div>

                    <div className="co_footer_div">
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
