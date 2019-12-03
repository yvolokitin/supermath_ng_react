import React from 'react';
import {Dialog, DialogTitle, DialogContent, Paper, Typography} from '@material-ui/core';

import SMKeyBoard from "./../keyboard/keyboard";

export default class SMSimpleGame extends React.Component {
    constructor(props) {
        super(props);
        this.onDigit = this.onDigit.bind(this);
        this.onOperator = this.onOperator.bind(this);
    }

    onDigit({ target }) {
        const digit = target.innerText;
    }

    onOperator({ target }) {
        const operator = target.innerText;
    }

    render() {
        const titleStyle = {
            fontFamily: "Grinched",
            color: "green",
        };
        const taskNumber = {
            fontFamily: "Grinched",
            color: "black",
            textAlign: 'right',
        };
        const taskNumberUnderline = {
            fontFamily: "Grinched",
            textDecoration: 'underline',
            color: "black",
            textAlign: 'right',
        };
        const taskQuestion = {
            fontFamily: "Grinched",
            color: "light grey",
            textAlign: 'right',
        };
        const paperStyle = {
            height: '100%',
            backgroundColor: 'white',
        };

        const wrapper = {
            width: '100%',
            height: '100%',
        };
        const topDiv = {
            padding: '20px',
            width: '100%',
        };
        const leftHalfDiv = {
            width: '49%',
            height: '100%',
            float: 'left',
            border: '3px solid green',
        }
        const rightHalfDiv = {
            width: '49%',
            height: '100%',
            float: 'right',
            border: '3px solid red',

            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        }

        /*
            this.props.open
            https://about.phamvanlam.com/calculator/
        */
/*
        return (
        <Dialog onClose={() => this.props.onClick()} fullScreen={true} open={'true'}>
            <DialogTitle style={{backgroundColor: '#99ccff'}}>
                <Typography component={'div'} variant="h4" style={titleStyle}>SUPERMATH</Typography>
            </DialogTitle>

            <DialogContent style={{ backgroundColor: 'orange' }}>
                <Paper>
                    <div style={leftHalfDiv}>
                        <Typography variant="h1" style={taskNumber}>2</Typography>
                        <Typography variant="h1" style={taskNumberUnderline}>+    2</Typography>
                        <Typography variant="h1" style={taskQuestion}>?</Typography>
                    </div>
                    <div style={rightHalfDiv}>
                        <SMKeyBoard onDigit={this.onDigit} onOperator={this.onOperator}/>
                    </div>
                </Paper>

                <Paper>

                </Paper>

            </DialogContent>

        </Dialog>
        );
*/
        return (
            <Dialog onClose={() => this.props.onClick()} fullScreen={true} open={'true'}>
                <div style={wrapper}>
                    <div style={topDiv}>
                        <Typography component={'div'} variant="h4" style={titleStyle}>SUPERMATH</Typography>
                    </div>

                    <div style={leftHalfDiv}>
                        TBD...2+2=4
                    </div>

                    <div style={rightHalfDiv}>
                        <SMKeyBoard onDigit={this.onDigit} onOperator={this.onOperator}/>
                    </div>
                </div>
            </Dialog>
        );
    }
}
