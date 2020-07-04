import React from 'react';

import {Dialog, DialogTitle, DialogActions, DialogContent, Button} from '@material-ui/core';
import {Table, TableRow, TableBody, TableCell, TableContainer, Paper} from '@material-ui/core';

import './digitgameprogress.css';

export default function GameProgress(props) {
    return (
        <Dialog open={props.open} onClose={() => props.onClose()}>
            <DialogTitle>
                <font className='digitgameprogress_title' style={{color:'black'}}>
                    {props.results.length} &nbsp; &#128279; &nbsp;
                </font>
                <font className='digitgameprogress_title' style={{color:'green'}}>
                    {props.passed} &nbsp; &#128515; &nbsp;
                </font>
                <font className='digitgameprogress_title' style={{color:'red'}}>
                    {props.failed} &nbsp; &#128169; &nbsp;
                </font>
                <font style={{color:'white'}}>&nbsp; &nbsp; 01234556789 &nbsp; &nbsp; </font>
            </DialogTitle>

            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {props.results.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell align='center' component='th' scope='row'
                                               style={{backgroundColor: row.color}}>
                                                    <font className='digitgameprogress_table'>{row.task}</font>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => props.onClose()} className='digitgameprogress_close' color='primary' autoFocus>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
