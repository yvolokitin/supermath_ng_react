import React from 'react';
import {Dialog} from '@material-ui/core';

import {generate_rnd_task} from "./../halpers/functions";

import SMKeyBoard from "./../keyboard/keyboard";
import SMCircles from "./circles";

import './simplegame.css';

export default class SMSimpleGame extends React.Component {
    constructor(props) {
        super(props);
        this.onDigit = this.onDigit.bind(this);
        this.onOperator = this.onOperator.bind(this);

        /*
            {'number_1': num_1, 'number_2': num_2, 'operation': task_operation, 'result': res};
        */
        this.task = generate_rnd_task('+', '0,9');
        this.user_enter = '';
        this.state = {result: '?',
                      success: false};
    }

    onDigit({ target }) {
        const digit = (target.innerText).toString();
        console.log("onDigit " + digit + ", this.task.result " + this.task.result);
        // check_response(digit.toString());

        var expected_result = this.task.result.toString();
        if (expected_result.length === 1) {
            if (digit === expected_result) {
                this.setState({result: digit});
            } else {
                this.setState({result: 'WRONG, ' + digit});
            }

        } else if (expected_result.length === 2) {
            if (this.state.result === '?') {
                if (expected_result.charAt(0).toString() === digit) {
                    this.setState({result: digit});
                } else {
                    this.setState({result: 'WRONG, ' + digit});
                }
            } else if (this.state.result.length === 1) {
                var current = this.state.result + digit;
                if (current === expected_result) {
                    this.setState({result: current});
                } else {
                    this.setState({result: 'WRONG, ' + current});
                }
            }

        } else if (this.task.result.toString().length === 3) {
            console.log("tbd...");
        }
    }

    onOperator({ target }) {
        const operator = target.innerText;
        console.log("onOperator " + operator);
        // tbd...
    }

    /*
        <Dialog onClose={() => this.props.onClick()} fullScreen={true} open={this.props.open}>
        https://about.phamvanlam.com/calculator/
    */
    render() {
        return (
            <Dialog onClose={() => this.props.onClick()} fullScreen={true} open={true}>
                <div className="wrapper">
                    <div className="header_div">
                        <div className="header_div_left">SUPERMATH</div>
                        <div className="header_div_right">smile</div>
                    </div>

                    <div className="body_div">
                        <div className="body_div_left">
                            <div className="gameboard">
                                <div className="gameplay">
                                    <div className="mo_task">{this.task.number_1}</div>
                                    <div className="mo_task">{this.task.operation}   {this.task.number_2}</div>
                                    <div className="black_line"> </div>
                                    <div className="mo_result">{this.state.result}</div>
                                </div>

                                <div className="gamehalper">
                                </div>
                            </div>
                        </div>

                        <div className="body_div_right">
                            <SMKeyBoard onDigit={this.onDigit} onOperator={this.onOperator}/>
                        </div>
                    </div>

                    <div className="footer_div">
                        <SMCircles />
                    </div>
                </div>
            </Dialog>
        );
    }
}
