import React from 'react';
import {Grid, Typography} from '@material-ui/core';

import './exchange.css';
import {exchange} from './../translations/exchange';

export default class Exchange extends React.Component {
    constructor(props) {
        super(props);

        this.onCounterChanged = this.onCounterChanged.bind(this);
        this.onSave = this.onSave.bind(this);

        this.state = {counter: 0,
                      passed: props.passed,
                      sailed: 0,
                      failed: props.failed,
                      };
    }

    componentDidUpdate(prevProps) {
        if ((this.props.passed !== prevProps.passed) || (this.props.failed !== prevProps.failed)) {
            this.setState({pass: this.props.passed,
                           fail: this.props.failed,
                           counter: 0,
                           sailed: 0,
                          });
        }
    }

    onCounterChanged(value) {
        if (value > 0) {
            if (this.state.passed > (value*30)) {
                this.setState({'counter': (this.state.counter + 1),
                               'sailed': (this.state.sailed + 30),
                               'passed': (this.state.passed - 30),
                               'failed': (this.state.failed - 1),
                               });
            }
        } else {
            if (this.state.counter > 0) {
                this.setState({'counter': (this.state.counter - 1),
                               'sailed': (this.state.sailed - 30),
                               'passed': (this.state.passed + 30),
                               'failed': (this.state.failed + 1),
                               });
            }
        }
    }

    onSave() {
        console.log('pass values to UserInfo: ' + this.state.passed + ', ' + this.state.failed);
        if (this.state.sailed > 0) {
            this.props.onExchange(this.state.passed, this.state.failed);
        }
    }

    render() {
        return (
            <div className='exchangeboard'>
                <Typography gutterBottom style={{color:'orange',fontFamily:'Grinched',fontSize:'3.5rem',textAlign:'center',textShadow:'1px 1px 2px black',lineHeight:'0.9',}}>
                    {exchange[this.props.lang]['description']}
                </Typography>

                <Grid container spacing={3} justify='center' alignItems='center' style={{textAlign:'center',fontFamily:'Grinched',fontSize:'3rem',lineHeight:'1.1'}}>
                    <Grid item xs={3} className='exchangegriditem' style={{margin:'10px'}}> <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span> </Grid>
                    <Grid item xs={3} className='exchangegriditem' style={{margin:'10px'}}> <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span> </Grid>
                </Grid>

                <Grid container spacing={3} justify='center' alignItems='center' style={{textAlign:'center',fontFamily:'Grinched',fontSize:'3rem',lineHeight:'1.1'}}>
                    <Grid item xs={3} className='exchangegriditem' style={{margin:'10px'}}> <font className='exchangegriditemgreen'>{this.state.passed}</font> </Grid>
                    <Grid item xs={3} className='exchangegriditem' style={{margin:'10px'}}> <font className='exchangegriditemred'>{this.state.failed}</font> </Grid>
                </Grid>

                <Grid container spacing={3} justify='center' alignItems='center' style={{textAlign:'center',fontFamily:'Grinched',fontSize:'3rem',lineHeight:'1.1'}}>
                    <Grid item xs={3} className='exchangegriditem' style={{margin:'10px'}}>
                        <font className='exchangegriditemgreen'>{this.state.sailed}</font>
                    </Grid>
                    <Grid item xs={3} className='exchangegriditem' style={{margin:'10px'}}>
                        <font className='exchangegriditemred'>{this.state.counter}</font>
                    </Grid>
                </Grid>

                <Grid container spacing={3} justify='center' alignItems='center' style={{textAlign:'center',fontFamily:'Grinched',fontSize:'3rem',lineHeight:'1.1'}}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={3}>
                        <font className='exchangebuttongreen' style={{float:'left'}} onClick={(e) => this.onSave()}>
                            {exchange[this.props.lang]['save']}
                        </font>

                        <font className='exchangebutton' style={{float:'right',marginLeft:'5px'}} onClick={(e) => this.onCounterChanged(1)}>+</font>
                        <font className='exchangebutton' style={{float:'right'}} onClick={(e) => this.onCounterChanged(-1)}>-</font>
                    </Grid>
                </Grid>

            </div>
        );
    }
}
