﻿import React from 'react';
import axios from 'axios';

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
        // if task is interrapted, we would like to send failed resulst as punishment
        } else if (status === 'interrapted') {
            console.log('Game interraption with ' + this.state.failed);
            this.props.onClose(status);
            if ((localStorage.getItem('user_id') !== null) && (this.state.failed > 0)) {
                // update user failed counter in header and send to server
                var fail = parseInt(localStorage.getItem('fail')) + parseInt(this.state.failed);
                localStorage.setItem('fail', fail);
                var post_data = {'user_id': localStorage.getItem('user_id'),
                                 'hash': localStorage.getItem('pswdhash'),
                                 'operation': 'results',
                                 'passed': 0,
                                 'failed': this.state.failed,
                                 'duration': (new Date().getTime() - this.timer),
                                 'percent': 0,
                                 'rate': 'Quite Bad',
                                 'belt': this.props.belt,
                                 'task': this.state.type};
                axios.post('http://supermath.xyz:3000/api/update', post_data);
            } else {
                console.log('DigitGame.status: ' + status + ', do not sent results');
            }

            this.setState({results: [], circle: 'white',
                           total: 0, passed: 0, failed: 0});
            this.results = [];

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
        var format = '', color = counter ? 'red' : 'green';
        if (this.state.type === '2digits') {format = user_task.expr1 + user_task.result;}
        else if (this.state.type === '2digits_fr') {format = user_task.expr1 + user_task.result;}
        else if (this.state.type === '3digits') {format = user_task.expr1 + user_task.result;}
        else if (this.state.type === '2digit_arg') {
            format = user_task.expr1 + user_task.result;
            if (user_task.argument.includes('1')) {format = '?';} else {format = user_task.num1;}
            if (user_task.argument.includes('o')) {format = format + ' ? ';} else {format = format + ' ' + user_task.operation + ' ';}
            if (user_task.argument.includes('2')) {format = format + '? = ' + user_task.outcome;} else {format = format + user_task.num2 + ' = ' + user_task.outcome;}

        } else if (this.state.type === 'digit_2column') { format = user_task.num1 + user_task.operation + user_task.num2 + '=' + user_task.result }
        else if (this.state.type === 'digit_3column') { format = user_task.num1 + ' ' + user_task.operation1 + ' ' + user_task.num2 + ' ' + user_task.operation2 + ' ' + user_task.num3 + ' = ' + user_task.result }
        else if (this.state.type === 'linedigits') { format = user_task.expr1 + user_task.result; }
        else if (this.state.type === 'comp_nums') { format = user_task.expr1 + user_task.result + user_task.expr2; }
        else if (this.state.type === 'comp_expr') {format = user_task.expr1 + user_task.result + user_task.expr2; }

        console.log('format ' + format + ', user_task.expr1: ' + user_task.expr1);
        this.results.push({'task': format, 'color': color});

        if (counter === 0) {
            this.setState({total: this.state.total + 1,
                           passed: this.state.passed + 1,
                           results: this.results});
        } else {
            this.setState({total: this.state.total + 1,
                           failed: this.state.failed + 1,
                           results: this.results});
        }
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
                { this.state.showResults ? (null) : (<GameHeader onClick={this.onGameClose} lang={this.props.lang} total={this.state.total} passed={this.state.passed} failed={this.state.failed} results={this.state.results}/>) }

                <div className='digitgamebody'>
                    { this.state.showResults ? (
                            <GameResults open={this.state.showResults} passed={this.state.passed} failed={this.state.failed}
                                         results={this.state.results} amount={this.state.amount} duration={this.state.duration}
                                         belt={this.props.belt} lang={this.props.lang} onClose={this.onGameClose}/>
                        ) : (
                            <GameBoard onClose={this.onGameClose} onCounter={this.onCounterUpdate} onColor={this.onColorUpdate}
                                       type={this.state.type} task={this.state.task} amount={this.state.amount} lang={this.props.lang}/>
                        )
                    }
                </div>

                { this.state.showResults ? (null) : (<GameFooter color={this.state.circle} lang={this.props.lang}/>) }
            </Dialog>
        );
    }
}
