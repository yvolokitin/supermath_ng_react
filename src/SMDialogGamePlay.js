import React from 'react';
import {Dialog, DialogTitle, DialogContent, Paper, Typography, Grid} from '@material-ui/core';

import SMKeyBoard from "./SMKeyBoardDiv";

export default class SMDialogGamePlay extends React.Component {
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
        const container = {
            display: 'table',
            height: '100%',
            width: '100%',
            borderRadius: '15px',
        }
        const leftHalfDiv = {
            display: 'table-cell',
            width: '50%',
            verticalAlign: 'middle',
            float: 'right',
        }
        const rightHalfDiv = {
            display: 'table-cell',
            width: '50%',
            verticalAlign: 'middle',
        }
        const numberStyle = {
        }

        return (
        <Dialog onClose={() => this.props.onClick()} fullScreen={true} open={this.props.open}>
            <DialogTitle style={{backgroundColor: '#99ccff'}}>
                <Typography component={'div'} variant="h4" style={titleStyle}>SUPERMATH</Typography>
            </DialogTitle>

            <DialogContent style={{ backgroundColor: 'orange' }}>
                <Paper>
                <section style={container}>
                    <div style={leftHalfDiv}>
                        <Typography variant="h1" style={taskNumber}>2</Typography>
                        <Typography variant="h1" style={taskNumberUnderline}>+    2</Typography>
                        <Typography variant="h1" style={taskQuestion}>?</Typography>
                    </div>
                    <div style={rightHalfDiv}>
                        <SMKeyBoard />
                    </div>
                </section>
                </Paper>

            </DialogContent>

        </Dialog>
        );
    }
}
