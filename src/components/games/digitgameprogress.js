import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/*
                    <div className='games_header_div_right'>
                    </div>
*/
export default function GameProgress(props) {
    // this.results.push({'task': format, 'color': color});
    // total={props.total} passed={props.passed} failed={props.failed} results={props.results}

    return (
        <Dialog onClose={() => props.onClose()} open={props.open}>
            <DialogTitle>{"Looking for your results?"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <font style={{color: 'black'}}>{props.total}</font> &nbsp; &#128279; &nbsp;
                    <font style={{color: 'green'}}>{props.passed}</font> &nbsp; &#128515; &nbsp;
                    <font style={{color: 'red'}}>{props.failed}</font> &nbsp; &#128169;
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => props.onClose()} color="primary" autoFocus>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
