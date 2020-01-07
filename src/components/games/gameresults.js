import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button} from '@material-ui/core';

import ReplayIcon from '@material-ui/icons/Replay';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './twodigitgame.css';
import SMRadialChart from "./../charts/smradialchart";

export default class GameResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {percent: 0};
    }

    componentDidMount() {
        // console.log("componentDidMount " + this.props.task);
    }

    componentDidUpdate(prevProps) {
        // console.log("componentDidUpdate " + prevProps.task + ", this.props.task " + this.props.task + ", this.props.count " + this.props.count);
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.user_results !== prevProps.user_results) {
            console.log('user_results ' + this.props.user_results.length);
            var percent_passed = 100 * this.props.passed / this.props.counter;
            this.setState({percent: percent_passed});
        }
    }

    render() {
        return (
            <Dialog onClose={() => this.props.onClick('close')} open={this.props.open} transitionDuration={500} fullWidth={true} maxWidth={false}>
                <DialogTitle>
                    <Typography style={{color: '#0000cc', fontFamily: 'Grinched', fontSize: '3.0rem', textAlign:'center'}}>
                        SUPERMATH
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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

                    <Typography gutterBottom style={{color: 'black', fontFamily: 'Grinched', fontSize: '3.0rem', textAlign: 'center'}}>
                        You reach <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#9757;</span> good score <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128202;</span>
                    </Typography>

                    <Typography gutterBottom style={{color: 'black', fontFamily: 'Grinched', fontSize: '3.0rem', textAlign: 'center'}}>
                        and your <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128173;</span> brain take extra <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128138;</span> pillows
                    </Typography>

                    <Typography gutterBottom style={{color: 'black', fontFamily: 'Grinched', fontSize: '3.0rem', textAlign: 'center'}}>
                        to became more <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128171;</span> smart,
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128170;</span>
                        strong and <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128540;</span> health
                    </Typography>

                </DialogContent>

                <DialogActions>
                    <Button startIcon={<ReplayIcon/>} onClick={() => this.props.onClick('replay')} color="primary">PLAY AGAIN</Button>
                    <Button startIcon={<HighlightOffIcon/>} onClick={() => this.props.onClick('close')} color="primary">CLOSE</Button>
                </DialogActions>
            </Dialog>
        );
    }
}
