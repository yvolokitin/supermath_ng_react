import React from 'react';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {Table, TableHead, TableRow, TableBody, TableCell, TableContainer, Paper} from '@material-ui/core';

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

                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>User Task</TableCell>
                        <TableCell align='center'>Color</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.results.map(row => (
                        <TableRow key={row.task}>
                          <TableCell component='th' scope='row'>{row.task}</TableCell>
                          <TableCell align='center'>{row.color}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

            </DialogContent>

            <DialogActions>
                <Button onClick={() => props.onClose()} color="primary" autoFocus>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
