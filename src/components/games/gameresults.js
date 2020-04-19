import React from 'react';
import axios from 'axios';

import SMRadialChart from "./../charts/smradialchart";
import GameProgress from "./digitgameprogress";

import './gameresults.css';
import {gameresults} from './../translations/gameresults';

export default class GameResults extends React.Component {
    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
        this.onUpdateResults = this.onUpdateResults.bind(this);
        this.onUpdateResultsError = this.onUpdateResultsError.bind(this);

        
        this.state = {id: localStorage.getItem('user_id') ? parseInt(localStorage.getItem('user_id')) : 0,
                      result: this.calculate(),
                      userResults: false};
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        console.log('GameResults.componentDidUpdate ' + this.props.amount + ' / ' + this.props.passed + ' / ' + this.props.failed  + '. duration ' + this.props.duration + '. length ' + this.props.results.length);
        if (this.props.results !== prevProps.results) {
            this.set_results();
        }
    }

    calculate() {
        var duration = this.props.duration;
        var hours = 0, minutes = 0, seconds = 0;
        if (duration > (1000 * 60 * 60)) {
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
            duration = duration - hours*(1000 * 60 * 60);
        }
        if (duration > (1000 * 60)) {
            minutes = Math.floor((duration / (1000 * 60)) % 60);
            duration = duration - minutes*(1000 * 60);
        }
        if (duration > 1000) {
            seconds = Math.floor((duration / 1000) % 60);
        }

        var rate = gameresults[this.props.lang]['really_bad'];
        var passed = 100 * this.props.passed / this.props.amount;

        if (passed > 99) { rate = gameresults[this.props.lang]['excellent'];
        } else if (passed > 95) { rate = gameresults[this.props.lang]['quite_good'];
        } else if (passed > 90) { rate = gameresults[this.props.lang]['good'];
        } else if (passed > 80) { rate = gameresults[this.props.lang]['well'];
        } else if (passed > 60) { rate = gameresults[this.props.lang]['not_well'];
        } else if (passed > 40) { rate = gameresults[this.props.lang]['quite_bad'];}

        return {'percent': passed, 'rate': rate, 'hours': hours, 'minutes': minutes, 'seconds': seconds}
    }

    set_results() {
        this.setState({id: localStorage.getItem('user_id') ? parseInt(localStorage.getItem('user_id')) : 0,
                       result: this.calculate()});
    }

    onClose(status) {
        console.log('GameResults.onClose: ' + this.props.belt);

        var passed = this.props.passed;
        if (localStorage.getItem('pass') !== null) {
            passed = this.props.passed + parseInt(localStorage.getItem('pass'));
        }

        var failed = this.props.failed;
        if (localStorage.getItem('fail') !== null) {
            failed = this.props.failed + parseInt(localStorage.getItem('fail'));
        }

        // send post update if user login and close window
        if (localStorage.getItem('user_id') !== null) {
            // update user passed / failed counter in header and send to server
            localStorage.setItem('pass', passed);
            localStorage.setItem('fail', failed);

            var post_data = {'user_id': localStorage.getItem('user_id'),
                             'pswdhash': localStorage.getItem('pswdhash'),
                             'operation': 'results',
                             'passed': this.props.passed,
                             'failed': this.props.failed,
                             'duration': this.props.duration,
                             'percent': this.state.result.percent,
                             'rate': this.state.result.rate,
                             'belt': this.props.belt,
                             'task': this.props.type,
                            };
            axios.post('http://supermath.xyz:3000/api/update', post_data)
                .then(this.onUpdateResults)
                .catch(this.onUpdateResultsError);
        } else {
            console.log('GameResults.onClose: do not sent results');
        }

        // on close and on replay -> updated passed/failed counters
        this.props.onClose(status, passed, failed);
    }

    onUpdateResults(response) {
        console.log('onUpdateResults: ' + response.data.error + ', id ' + response.data.id);
        if ('data' in response) {
            if ('error' in response.data) {
                console.log('onUpdateResults: received error from server ' + response.data.error);
            } else if ('id' in response.data) {
                console.log('onUpdateResults: results synced for ' + response.data.id);
            } else {
                console.log('onUpdateResults: no error and id in data message from server');
            }
        } else {
            console.log('onUpdateResults: received no data in response from server');
        }
    }

    onUpdateResultsError(error) {
        console.log('onUserResultsError:: error ' + error);
    }

    render() {
        return (
            <div style={{height:'100%',width:'100%',}}>
                <div className='result_board'>
                    <div className='result_board_title'>
                        {gameresults[this.props.lang]['time']} {this.state.result.hours} {gameresults[this.props.lang]['hours']},
                        &nbsp; {this.state.result.minutes} {gameresults[this.props.lang]['minutes']},
                        &nbsp; {this.state.result.seconds} {gameresults[this.props.lang]['seconds']}
                    </div>

                    <div className='result_board_chart' onClick={(e) => this.setState({userResults:true})}>
                        <font style={{color:'#00cc00',}}>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span> &nbsp; {this.props.passed} &nbsp;
                        </font>
                        &nbsp; <SMRadialChart progress={this.state.result.percent}/> &nbsp;
                        <font style={{color:'red',}}>
                            &nbsp; {this.props.failed} &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                        </font>
                    </div>

                    <div className='result_board_body'>
                        {gameresults[this.props.lang]['reach']} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#9757;</span> &nbsp;
                        <font style={{color:'red'}}>{this.state.result.rate}</font> {gameresults[this.props.lang]['score']}
                        &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128202;</span>
                    </div>

                    { (this.state.id > 0) ?
                      (
                        <>
                          <div className='result_board_body'>
                            {gameresults[this.props.lang]['brain']}
                          </div>
                          <div className='result_board_body'>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128138;</span> {gameresults[this.props.lang]['pill']}
                          </div>
                          <div className='result_board_body'>
                            {gameresults[this.props.lang]['smart']} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128170;</span>
                            {gameresults[this.props.lang]['health']} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128540;</span>
                          </div>
                        </>
                      ) : (
                          <div className='result_board_body'>
                            {gameresults[this.props.lang]['register']}
                          </div>
                      )
                    }

                </div>

                <div onClick={(e) => this.setState({userResults:true})} className='result_board_button' style={{float:'left',marginLeft: '5%'}}>
                    {gameresults[this.props.lang]['show']}
                </div>
                <div onClick={() => this.onClose('replay')} className='result_board_button' style={{float:'right',marginRight:'4%'}}>
                    {gameresults[this.props.lang]['play']} &nbsp; &#8635;
                </div>
                <div onClick={() => this.onClose('close')} className='result_board_button' style={{float:'right',marginRight:'1%'}}>
                    {gameresults[this.props.lang]['close']} &nbsp; &#10006;
                </div>

                <GameProgress open={this.state.userResults}
                              total={this.props.total}
                              passed={this.props.passed}
                              failed={this.props.failed}
                              results={this.props.results}
                              onClose={(e) => this.setState({userResults:false})}/>
            </div>
        );
    }
}
