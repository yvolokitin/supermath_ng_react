import React from 'react';

import {Dialog, DialogTitle, DialogActions, DialogContent, Button} from '@material-ui/core';
import {Table, TableRow, TableBody, TableCell, TableContainer, Paper} from '@material-ui/core';

export default function GameProgress(props) {
    return (
        <Dialog onClose={() => props.onClose()} open={props.open}>
            <DialogTitle>
                <font style={{padding: '5px', margin: '5px', color: 'black', border: '1px solid black', borderRadius: '5px'}}>
                    {props.results.length} &nbsp; &#128279; &nbsp;
                </font>
                <font style={{padding: '5px', margin: '5px', color: 'green', border: '1px solid green', borderRadius: '5px'}}>
                    {props.passed} &nbsp; &#128515; &nbsp;
                </font>
                <font style={{padding: '5px', margin: '5px', color: 'red', border: '1px solid red', borderRadius: '5px'}}>
                    {props.failed} &nbsp; &#128169; &nbsp;
                </font>
                <font style={{color: 'white'}}>&nbsp; &nbsp; 01234556789 &nbsp; &nbsp; </font>
            </DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {props.results.map((row, index) => (
                                <TableRow key={index}>
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
