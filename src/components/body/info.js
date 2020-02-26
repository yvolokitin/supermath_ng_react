import React from 'react';
import {Dialog, DialogContent, DialogActions, Typography, Card, CardMedia, Button} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
// import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import SMTitle from "./../dialog/title";

/*
                <Button size="small" color="primary" startIcon={<PlayCircleFilledWhiteIcon />}
                        onClick={() => props.onClick('play', props.taskId)}>Play</Button>
*/
export default function SMDialogInfo(props) {
    return (
        <Dialog onClose={() => props.onClick('close')} aria-labelledby='customized-dialog-title' transitionDuration={500} open={props.open} scroll="body">
            <SMTitle title='' onClick={() => props.onClick()}/>

            <DialogContent>
                <Typography style={{margin:'3%',color:'orange',fontFamily:'Grinched',fontSize:'2.5rem',textShadow:'1px 1px 2px black',lineHeight:'1.0'}}>{props.title}</Typography>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}>{props.text}</Typography>

                <Card style={{margin:'4%',display:'flex',flexDirection:'column'}}>
                    <CardMedia component="img" alt="Media Card task" height="100%" image={props.imgUrl}/>
                </Card>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}>
                    SuperMath helps students transition from counting or calculating the basic math
                    facts to recalling them. Quickly recalling math facts, instead of calculating them,
                    frees up mental resources for higher-level operations. SuperMath’s timed activities
                    encourage students to answer questions as quickly as possible.
                </Typography>

            </DialogContent>

            <DialogActions style={{margin:'3%',}}>
                <Button size="small" color="primary" startIcon={<CancelIcon />}
                        onClick={() => props.onClick('close')}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
