import React from 'react';
import axios from 'axios';
import SMRadialChart from "./../charts/smradialchart";
import './gameresults.css';

export default class GameResults extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.state = {percent: 0, rate: ''};
        // console.log('GameResults.constructor: ' + this.props.amount + ' / ' + this.props.passed + ' / ' + this.props.failed + '. props.results.length ' + this.props.results.length);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.results !== prevProps.results) {
            console.log('componentDidUpdate ' + this.props.amount + ' / ' + this.props.passed + ' / ' + this.props.failed + '. props.results.length ' + this.props.results.length);
            var passed = 100 * this.props.passed / this.props.amount;

            if (passed > 99) {
                this.setState({percent: passed, rate: 'Excellent'});
            } else if (passed > 95) {
                this.setState({percent: passed, rate: 'Quite Good'});
            } else if (passed > 90) {
                this.setState({percent: passed, rate: 'Good'});
            } else if (passed > 80) {
                this.setState({percent: passed, rate: 'Well'});
            } else if (passed > 60) {
                this.setState({percent: passed, rate: 'Not really Well'});
            } else if (passed > 40) {
                this.setState({percent: passed, rate: 'Quite Bad'});
            } else {
                this.setState({percent: passed, rate: 'Really Bad'});
            }
        }
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
                    <div className='result_board_title'> YOUR SCORES </div>
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
