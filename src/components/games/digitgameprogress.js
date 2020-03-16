import React from 'react';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {Table, TableHead, TableRow, TableBody, TableCell, TableContainer, Paper} from '@material-ui/core';

export default function GameProgress(props) {
    // this.results.push({'task': format, 'color': color});
    // total={props.total} passed={props.passed} failed={props.failed} results={props.results}

    return (
        <Dialog onClose={() => props.onClose()} open={props.open}>
            <DialogTitle>
                    <font style={{color: 'black'}}>{props.total}</font> &nbsp; &#128279; &nbsp;
                    <font style={{color: 'green'}}>{props.passed}</font> &nbsp; &#128515; &nbsp;
                    <font style={{color: 'red'}}>{props.failed}</font> &nbsp; &#128169; &nbsp;

                    <font style={{color: 'black'}}>{props.results.length}</font> &nbsp; &#128279; &nbsp;
            </DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      {props.results.map(row => (
                        <TableRow key={row.task}>
                          <TableCell align='center' component='th' scope='row' style={{backgroundColor: row.color}}>{row.task}</TableCell>
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
