﻿import React from 'react';
import {Dialog} from '@material-ui/core';

import GameHeader from "./digitgameheader";
import GameFooter from "./digitgamefooter";

import GameBoard from "./gameboard";
import GameResults from "./gameresults";

import './digitgame.css';

export default class DigitGame extends React.Component {
    constructor(props) {
        super(props);

        this.onGameClose = this.onGameClose.bind(this);
        this.onColorUpdate = this.onColorUpdate.bind(this);
        this.onCounterUpdate = this.onCounterUpdate.bind(this);

        this.state = {type: props.type,
                      task: props.task,
                      amount: props.amount,
                      showResults: false,
                      results: [],
                      circle: 'white',
                      total: 0,
                      passed: 0,
                      failed: 0,
                      duration: 0};

        // all user task results
        this.results = [];

        // count general time to solve all tasks
        this.timer = new Date().getTime();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.task !== prevProps.task) {
            console.log("DigitGame.componentDidUpdate " + this.props.task + ", prevProps.task" + prevProps.task);
            this.timer = new Date().getTime();
            this.setState({type: this.props.type,
                           task: this.props.task,
                           amount: this.props.amount,
                           showResults: false,
                           circle: 'white',
                           total: 0,
                           passed: 0,
                           failed: 0});
        }
    }

    onGameClose(status) {
        console.log("DigitGame.onGameClose " + status);
        // game was unexpecdetly closed by user during play
        if (status === 'finished') {
            this.setState({showResults: true, results: this.results,
                           duration: (new Date().getTime() - this.timer)});

        // game was properly closed after showing results
        } else if (status === 'close') {
            this.props.onClose(status);
            this.setState({showResults: false,
                           results: [],
                           circle: 'white',
                           total: 0,
                           passed: 0,
                           failed: 0});
            this.results = [];

        // game was properly finished, when all tasks are solved
        } else if (status === 'interrapted') {
            this.results = [];
            this.setState({results: [],
                           circle: 'white',
                           total: 0,
                           passed: 0,
                           failed: 0});
            this.props.onClose('interrapted');

        // game was re-newed, tbd
        } else if (status === 'replay') {
            this.results = [];
            this.setState({showResults: false,
                           results: [],
                           circle: 'white',
                           total: 0,
                           passed: 0,
                           failed: 0});

        } else {
            console.log("onGameClose: Wrong status received: " + status);
        }
    }

    /*
     * if counter === 0 -> user answered right from first time -> passed
     * if counter > 0 -> user could not properly answer from first time -> failed
     */
    onCounterUpdate(counter, user_task) {
        // console.log('onCounterUpdate ' + counter + ', task: ' + user_task);
        if (counter === 0) {
            this.setState({total: this.state.total + 1, passed: this.state.passed + 1});
        } else {
            this.setState({total: this.state.total + 1, failed: this.state.failed + 1});
        }

        var format = '', color = counter ? 'red' : 'green';

        if (this.state.type === '2digits') {format = user_task.expr1 + user_task.result;}
        else if (this.state.type === '3digits') {format = user_task.expr1 + user_task.result;}
        else if (this.state.type === '2digit_arg') { format = user_task.expr1 + user_task.result; }
        else if (this.state.type === 'digit_2column') { format = user_task.num1 + user_task.operation + user_task.num2 + '=' + user_task.result }
        else if (this.state.type === 'linedigits') { format = user_task.expr1 + user_task.result; }
        else if (this.state.type === 'comp_nums') { format = user_task.expr1 + user_task.result + user_task.expr2; }
        else if (this.state.type === 'comp_expr') {format = user_task.expr1 + user_task.result + user_task.expr2; }

        this.results.push({'task': format, 'color': color});
    }

    onColorUpdate(color) {
        this.setState({circle: color});
    }

/*
*/
    render() {
        /*
            GameHeader: height: 10%  width: 100%
            Body <div>: height: 80%  width: 100%
            GameFooter: height: 10%  width: 100%
        */
        return (
            <Dialog fullScreen={true} transitionDuration={500} open={this.props.open}>
                { this.state.showResults ? (null) : (<GameHeader onClick={this.onGameClose} total={this.state.total} passed={this.state.passed} failed={this.state.failed}/>) }

                <div className='digitgamebody'>
                    { this.state.showResults ? (
                            <GameResults open={this.state.showResults} passed={this.state.passed} failed={this.state.failed}
                                         results={this.state.results} amount={this.state.amount} duration={this.state.duration}
                                         belt={this.props.belt} onClose={this.onGameClose}/>
                        ) : (
                            <GameBoard onClose={this.onGameClose} onCounter={this.onCounterUpdate} onColor={this.onColorUpdate}
                                       type={this.state.type} task={this.state.task} amount={this.state.amount}/>
                        )
                    }
                </div>

                { this.state.showResults ? (null) : (<GameFooter color={this.state.circle}/>) }
            </Dialog>
        );
    }
}
