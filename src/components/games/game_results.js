import React from 'react';
import {Dialog, DialogContent} from '@material-ui/core';

import SMRadialChart from "./../charts/smradialchart";
import SMTitle from "./../dialog/title";

import './game_results.css';

export default class GameResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {percent: 0,
                      rate: ''};

        this.onClose = this.onClose.bind(this);
    }

    componentDidUpdate(prevProps) {
        // console.log("componentDidUpdate " + prevProps.task + ", this.props.task " + this.props.task + ", this.props.count " + this.props.count);
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.user_results !== prevProps.user_results) {
            console.log('user_results ' + this.props.user_results.length);
            var percent_passed = 100 * this.props.passed / this.props.counter;

            if (percent_passed === 100) {
                this.setState({percent: percent_passed, rate: 'Excellent'});

            } else if (percent_passed > 95) {
                this.setState({percent: percent_passed, rate: 'Quite Good'});

            } else if (percent_passed > 90) {
                this.setState({percent: percent_passed, rate: 'Good'});

            } else if (percent_passed > 80) {
                this.setState({percent: percent_passed, rate: 'Well'});

            } else {
                this.setState({percent: percent_passed, rate: 'Not really Well'});
            }
        }
    }

    onClose() {
        var pass = parseInt(localStorage.getItem('pass')) + this.props.passed;
        var fail = parseInt(localStorage.getItem('fail')) + this.props.failed;

        localStorage.setItem('pass', pass);
        localStorage.setItem('fail', fail);

        this.props.onClick('close', pass, fail);
    }

/*
                <DialogActions>
                    <Button startIcon={<ReplayIcon/>} onClick={() => this.props.onClick('replay')} color="primary"></Button>
                    <Button startIcon={<HighlightOffIcon/>} onClick={this.onClose} color="primary">CLOSE</Button>
                </DialogActions>

fullWidth={true} maxWidth={false} 
*/
    render() {
        return (
            <Dialog open={this.props.open} transitionDuration={500} fullWidth={true} maxWidth='md' scroll="body">
                <SMTitle title='' onClick={this.onClose}/>

                <DialogContent>
                    <div className='result_board'>
                        <div className='result_board_title' style={{color:'yellow',}}> YOUR RESULTS </div>

                        <div className='result_board_chart'>
                            <font style={{color:'#00cc00',}}>
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                                &nbsp; {this.props.passed} &nbsp;
                            </font>
                            &nbsp; <SMRadialChart progress={this.state.percent}/> &nbsp;
                            <font style={{color:'red',}}>
                                &nbsp; {this.props.failed} &nbsp;
                                <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
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

                    <div onClick={() => this.props.onClick('replay')} className='result_board_button_left'>
                        play again &nbsp; &#8635;
                    </div>

                    <div onClick={this.onClose} className='result_board_button_right'>
                        close &nbsp; &#10006;
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}
