import React from 'react';
import axios from 'axios';

import SMRadialChart from "./../charts/smradialchart";
import GameProgress from "./digitgameprogress";

import './gameresults.css';

export default class GameResults extends React.Component {
    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
        this.onUpdateResults = this.onUpdateResults.bind(this);
        this.onUpdateResultsError = this.onUpdateResultsError.bind(this);

        this.state = {result: this.calculate(),
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

        var rate = 'Really Bad', passed = 100 * this.props.passed / this.props.amount;
        if (passed > 99) { rate = 'Excellent';
        } else if (passed > 95) { rate = 'Quite Good';
        } else if (passed > 90) { rate = 'Good';
        } else if (passed > 80) { rate = 'Well';
        } else if (passed > 60) { rate = 'Not really Well';
        } else if (passed > 40) { rate = 'Quite Bad'; }

        return {'percent': passed, 'rate': rate, 'hours': hours, 'minutes': minutes, 'seconds': seconds}
    }

    set_results() {
        this.setState({result: this.calculate()});
    }

    onClose(status) {
        console.log('GameResults.onClose: ' + this.props.belt);

        // send post update if user login and close window
        if (localStorage.getItem('user_id') !== null) {
            // update user passed / failed counter in header and send to server
            var pass = parseInt(localStorage.getItem('pass')) + this.props.passed;
            var fail = parseInt(localStorage.getItem('fail')) + this.props.failed;
            localStorage.setItem('pass', pass); localStorage.setItem('fail', fail);

            var post_data = {'user_id': localStorage.getItem('user_id'),
                             'hash': localStorage.getItem('pswdhash'),
                             'operation': 'results',
                             'passed': this.props.passed,
                             'failed': this.props.failed,
                             'duration': this.props.duration,
                             'percent': this.state.result.percent,
                             'rate': this.state.result.rate,
                             'belt': this.props.belt,
                             'task': this.props.belt,
                            };
            axios.post('http://supermath.xyz:3000/api/update', post_data)
                .then(this.onUpdateResults)
                .catch(this.onUpdateResultsError);
        } else {
            console.log('GameResults.onClose: do not sent results');
        }

        this.props.onClose(status);
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

/*
*/
    render() {
        return (
            <div style={{height:'100%',width:'100%',}}>
                <div className='result_board'>
                    <div className='result_board_title'>
                        You time: {this.state.result.hours} hours, {this.state.result.minutes} minutes, {this.state.result.seconds} seconds
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
                        You reach <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#9757;</span> &nbsp;
                        {this.state.result.rate} score <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128202;</span>
                    </div>
                    <div className='result_board_body'>
                        and your brain take extra
                    </div>
                    <div className='result_board_body'>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128138;</span> pill to became more
                    </div>
                    <div className='result_board_body'>
                        smart, strong <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128170;</span>
                        and health <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128540;</span>
                    </div>
                </div>

                <div onClick={(e) => this.setState({userResults:true})} className='result_board_button' style={{float:'left',marginLeft: '5%'}}>show details</div>
                <div onClick={() => this.onClose('replay')} className='result_board_button' style={{float:'right',marginRight:'4%'}}>play again &nbsp; &#8635;</div>
                <div onClick={() => this.onClose('close')} className='result_board_button' style={{float:'right',marginRight:'1%'}}>close &nbsp; &#10006;</div>

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
