import React from 'react';
import {Slide, DialogContent, DialogActions, Typography, Dialog, Card, CardMedia, Button} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';
import vitamins from './../../images/vitamins.jpg';
import {about} from './../translations/about';

import './about.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='right' ref={ref} {...props} />;
});

export default function About(props) {
    return (
        <Dialog open={props.open}
            onClose={() => props.onClose()}
            fullScreen={props.fullScreen}
            TransitionComponent={Transition}
            transitionDuration={800}>

            <SMTitle title='' onClick={() => props.onClose()}/>
            <ColorLine/>

            <div className='about_title'>
                {about[props.lang]['use']} <font style={{color:'green'}}>SuperMath</font> {about[props.lang]['vitamins']}
            </div>

            <DialogContent>
                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}> {about[props.lang]['designed']} </Typography>
                <Card style={{margin:'5%',display:'flex',flexDirection:'column'}}>
                    <CardMedia component='img' style={{boder:'3px solid black'}} alt='Vitamins!' height='140' src={vitamins}/>
                </Card>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}> {about[props.lang]['offer']} </Typography>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}> {about[props.lang]['nonprofit']} </Typography>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}> {about[props.lang]['colors']} </Typography>
            </DialogContent>

            <ColorLine/>

            <DialogActions>
                <Button size='small' color='primary' startIcon={<CancelIcon />}
                        onClick={() => props.onClose()}> {about[props.lang]['close']} </Button>
            </DialogActions>
        </Dialog>
    );
}
