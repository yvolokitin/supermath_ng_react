import React from 'react';
import {Dialog, DialogContent, DialogActions, Typography, Button} from '@material-ui/core';

import ReplayIcon from '@material-ui/icons/Replay';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './twodigitgame.css';
import SMRadialChart from "./../charts/smradialchart";
import SMTitle from "./../dialog/title";

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

        this.props.onClick('close');
    }

    render() {
        return (
            <Dialog open={this.props.open} transitionDuration={500} fullWidth={true} maxWidth={false}>
                <SMTitle title='' onClick={this.onClose}/>

                <Typography style={{color: 'green',fontSize:'3.0rem',fontFamily:'Grinched',textAlign:'center',textShadow:'2px 2px black'}}>
                    YOUR RESULTS
                </Typography>

                <DialogContent>
                    <div style={{display:'flex',margin:'5%',alignItems:'center',justifyContent:'center'}}>
                        <font style={{margin: '20px', color: 'green', fontFamily: 'Grinched', fontSize: '7.0rem'}}>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                            {this.props.passed}
                        </font>
                        <SMRadialChart progress={this.state.percent}/>
                        <font style={{margin: '20px', color: 'red', fontFamily: 'Grinched', fontSize: '7.0rem'}}>
                            {this.props.failed}
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                        </font>
                    </div>

                    <Typography gutterBottom style={{color:'black',fontSize:'3.0rem',fontFamily:'Grinched',textAlign:'center',lineHeight:'0.9'}}>
                        You reach <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#9757;</span> {this.state.rate} score <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128202;</span>
                    </Typography>

                    <Typography gutterBottom style={{color:'black',fontSize:'3.0rem',fontFamily:'Grinched',textAlign:'center',lineHeight:'0.9'}}>
                        and your <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128173;</span> brain take extra <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128138;</span> pillows
                    </Typography>

                    <Typography gutterBottom style={{color:'black',fontSize:'3.0rem',fontFamily:'Grinched',textAlign:'center',lineHeight:'0.9'}}>
                        to became more <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128171;</span> smart,
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128170;</span>
                        strong and <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128540;</span> health
                    </Typography>

                </DialogContent>

                <DialogActions>
                    <Button startIcon={<ReplayIcon/>} onClick={() => this.props.onClick('replay')} color="primary">PLAY AGAIN</Button>
                    <Button startIcon={<HighlightOffIcon/>} onClick={this.onClose} color="primary">CLOSE</Button>
                </DialogActions>
            </Dialog>
        );
    }
}
