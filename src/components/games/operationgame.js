import React from 'react';
import {Dialog} from '@material-ui/core';

import {generate_2digit_task_from_string} from "./../halpers/functions";

import SMCircles from "./circles";

import GameHeader from "./game_header";
import GameResults from "./game_results";

import './operationgame.css';

export default class OperationGame extends React.Component {
    constructor(props) {
        super(props);
        // this.onOperator = this.onOperator.bind(this);
        // this.onKeyboard = this.onKeyboard.bind(this);
        // this.onGameClose = this.onGameClose.bind(this);
        // this.onResultsClose = this.onResultsClose.bind(this);

        this.state = {number_1: '',
                      operation: '',
                      number_2: '',
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

    onGameClose() {
        console.log("Game has been Interrapted !!!");
        this.props.onClick("interrapted");
        this.results = [];
        // this.set_task();
    }

    check_response(operator) {
        var expected_result = this.task.operation.toString();
        if (expected_result === operator) {
            // this.set_passed(operator);
        } else {
            // this.set_failed(operator);
        }
    }

    render() {
        return (
            <Dialog fullScreen={true} onKeyDown={this.onKeyboard} open={this.props.open}>
                <div style={{height:'100%',width:'100%'}}>
                    <GameHeader onClick={this.onGameClose} type='operation' counter={this.state.counter} passed={this.state.passed} failed={this.state.failed}/>

                    <div className="op_footer_div">
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
