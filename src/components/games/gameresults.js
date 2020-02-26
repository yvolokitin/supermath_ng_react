import React from 'react';
import axios from 'axios';

import {Snackbar, Table, TableBody, TableCell, TableRow} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import SMRadialChart from "./../charts/smradialchart";

import './gameresults.css';

export default class GameResults extends React.Component {
    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
        this.onResults = this.onResults.bind(this);

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

    onResults() {

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

                <div onClick={() => this.onClose('replay')} className='result_board_button' style={{float:'left'}}>play again &nbsp; &#8635;</div>
                <div onClick={() => this.onClose('close')} className='result_board_button' style={{float:'right'}}>close &nbsp; &#10006;</div>

                <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} onClose={(e) => this.setState({userResults:false})} open={this.state.userResults}>
                    <Alert onClose={(e) => this.setState({userResults:false})} icon={false} variant='filled' severity='info'>
                        <Table>
                            <TableBody>
                                {this.props.results.map((task, key) => (
                                    <TableRow key={key} style={{backgroundColor: 'orange', border: '2px solid black'}}>
                                        <TableCell component='th' scope='row' style={{color: task.color}}> {task.task} </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Alert>
                </Snackbar>

            </div>
        );
    }
}
