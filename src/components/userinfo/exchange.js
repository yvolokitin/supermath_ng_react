import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import './exchange.css';

export default class Exchange extends React.Component {
    constructor(props) {
        super(props);

        this.onCounterChanged = this.onCounterChanged.bind(this);

        this.state = {counter: 0,
                      passed: props.passed,
                      sailed: 0,
                      failed: props.failed,
                      text: ''};
    }

    onCounterChanged(value) {
        if (value > 0) {
            if (this.state.passed > (value*50)) {
                var message = 'You sold ' + (this.state.counter + 1).toString() + ' poops and it cost you ' + (this.state.sailed + 50).toString() + ' points';
                this.setState({'counter': (this.state.counter + 1),
                               'sailed': (this.state.sailed + 50),
                               'passed': this.state.passed - 50,
                               'failed': (this.state.failed - 1),
                               'text': message});
            }
        } else {
            if (this.state.counter > 0) {
                var message = '';
                this.setState({'counter': (this.state.counter - 1),
                               'sailed': (this.state.sailed - 50),
                               'passed': (this.state.passed + 50),
                               'failed': (this.state.failed + 1),
                               'text': message});
            }
        }
    }

    render() {
        return (
            <div className='exchangeboard'>
                <Typography gutterBottom style={{color:'orange',fontFamily:'Grinched',fontSize:'3.5rem',textAlign:'center',textShadow:'1px 1px 2px black',lineHeight:'0.9'}}>
                    exchange your poops
                </Typography>

                <Grid container spacing={1} alignItems='center' style={{textAlign:'center',fontFamily:'Grinched',fontSize:'3rem',lineHeight:'1.2'}}>
                    <Grid item xs={6} sm={3}></Grid>
                    <Grid item xs={6} sm={3}> <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span> </Grid>
                    <Grid item xs={6} sm={3}> <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span> </Grid>
                    <Grid item xs={6} sm={3}> <font className='exchangetext'> {this.state.text}</font> </Grid>

                    <Grid item xs={6} sm={3}></Grid>
                    <Grid item xs={6} sm={3}> <font style={{color:'green'}}>{this.state.passed}</font> </Grid>
                    <Grid item xs={6} sm={3}> <font style={{color:'red'}}>{this.state.failed}</font> </Grid>
                    <Grid item xs={6} sm={3}></Grid>

                    <Grid item xs={6} sm={3}></Grid>
                    <Grid item xs={6} sm={3}> <font style={{color:'green'}}>{this.state.sailed} (50 x {this.state.counter})</font> </Grid>
                    <Grid item xs={6} sm={3}> <font style={{color:'red'}}>{this.state.counter}</font> </Grid>
                    <Grid item xs={6} sm={3}></Grid>

                    <Grid item xs={6} sm={3}></Grid>
                    <Grid item xs={6} sm={3}></Grid>
                    <Grid item xs={6} sm={3}>
                        <font className='exchangebutton' onClick={(e) => this.onCounterChanged(-1)}>-</font>
                        <font className='exchangebutton' onClick={(e) => this.onCounterChanged(1)}>+</font>
                    </Grid>
                    <Grid item xs={6} sm={3}></Grid>
                </Grid>
            </div>
        );
    }
}
