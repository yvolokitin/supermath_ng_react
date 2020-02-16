import React from 'react';
import axios from 'axios';
import SMRadialChart from "./../charts/smradialchart";
import './gameresults.css';

export default class GameResults extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);

        var duration = this.props.duration;
        var user_hours = 0, user_minutes = 0, user_seconds = 0;
        if (duration > (1000 * 60 * 60)) {
            user_hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
            duration = duration - user_hours*(1000 * 60 * 60);
        }
        if (duration > (1000 * 60)) {
            user_minutes = Math.floor((duration / (1000 * 60)) % 60);
            duration = duration - user_minutes*(1000 * 60);
        }
        if (duration > 1000) {
            user_seconds = Math.floor((duration / 1000) % 60);
        }
        var passed = 100 * this.props.passed / this.props.amount;
        var user_rate = '';
        if (passed > 99) { user_rate = 'Excellent';
        } else if (passed > 95) { user_rate = 'Quite Good';
        } else if (passed > 90) { user_rate = 'Good';
        } else if (passed > 80) { user_rate = 'Well';
        } else if (passed > 60) { user_rate = 'Not really Well';
        } else if (passed > 40) { user_rate = 'Quite Bad';
        } else { user_rate = 'Really Bad'; }

        this.state = {percent: passed,
                      rate: user_rate,
                      hours: user_hours,
                      minutes: user_minutes,
                      seconds: user_seconds};
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        console.log('GameResults.componentDidUpdate ' + this.props.amount + ' / ' + this.props.passed + ' / ' + this.props.failed  + '. duration ' + this.props.duration + '. length ' + this.props.results.length);
        if (this.props.results !== prevProps.results) {
            this.set_results();
        }
    }

    set_results() {
        var duration = this.props.duration;
        var user_hours = 0, user_minutes = 0, user_seconds = 0;
        if (duration > (1000 * 60 * 60)) {
            user_hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
            duration = duration - user_hours*(1000 * 60 * 60);
        }
        if (duration > (1000 * 60)) {
            user_minutes = Math.floor((duration / (1000 * 60)) % 60);
            duration = duration - user_minutes*(1000 * 60);
        }
        if (duration > 1000) {
            user_seconds = Math.floor((duration / 1000) % 60);
        }
        var passed = 100 * this.props.passed / this.props.amount;
        var user_rate = '';
        if (passed > 99) { user_rate = 'Excellent';
        } else if (passed > 95) { user_rate = 'Quite Good';
        } else if (passed > 90) { user_rate = 'Good';
        } else if (passed > 80) { user_rate = 'Well';
        } else if (passed > 60) { user_rate = 'Not really Well';
        } else if (passed > 40) { user_rate = 'Quite Bad';
        } else { user_rate = 'Really Bad'; }
        this.setState({percent: passed,
                       rate: user_rate,
                       hours: user_hours,
                       minutes: user_minutes,
                       seconds: user_seconds});
    }

    onClose(status) {
        // update user passed / failed counter in header and send to server
        var pass = parseInt(localStorage.getItem('pass')) + this.props.passed;
        var fail = parseInt(localStorage.getItem('fail')) + this.props.failed;
        localStorage.setItem('pass', pass); localStorage.setItem('fail', fail);

        // send post update and close window
        var post_data = {'user_id': localStorage.getItem('user_id'),
                         'operation': 'results',
                         'passed': this.props.passed,
                         'failed': this.props.failed};
        axios.post('http://supermath.xyz:3000/api/update', post_data)
            .then(function (response) {console.log('updateUserResults: ' + response.data.error + ', id ' + response.data.id);})
            .catch(function (error) {console.log('onUserResultsError:: error ' + error);});

        this.props.onClose(status);
    }

/*
*/
    render() {
        return (
            <div style={{height:'100%',width:'100%',}}>
                <div className='result_board'>
                    <div className='result_board_title'>
                        You time: {this.state.hours} hours, {this.state.minutes} minutes, {this.state.seconds} seconds
                    </div>
                    <div className='result_board_chart'>
                        <font style={{color:'#00cc00',}}>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span> &nbsp; {this.props.passed} &nbsp;
                        </font>
                        &nbsp; <SMRadialChart progress={this.state.percent}/> &nbsp;
                        <font style={{color:'red',}}>
                            &nbsp; {this.props.failed} &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                        </font>
                    </div>
                    <div className='result_board_body'>
                        You reach <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#9757;</span> &nbsp;
                        {this.state.rate} score <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128202;</span>
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

                <div onClick={() => this.onClose('replay')} className='result_board_button' style={{float:'left'}}>play again &nbsp; &#8635;</div>
                <div onClick={() => this.onClose('close')} className='result_board_button' style={{float:'right'}}>close &nbsp; &#10006;</div>
            </div>
        );
    }
}
