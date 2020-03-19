import React from 'react';
import {DialogContent, DialogActions, Typography, Dialog, Card, CardMedia, Button} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';

import SMTitle from "./../dialog/title";
import vitamins from './../../images/vitamins.jpg';
import {about} from './../halpers/about';

/*
                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}>
                    In one day, I just personally asked myself - How can I contribute to improve a small part of the world.
                    Im father of two wonderful kids and due to a lot of work responsibility, in some days I could not get so much attantion to them, specially in Mathematics.
                    We could not image our current life now without Mobile phone and Internet and we have it because of Math.
                    When I developed that Math portal for kids I had vary clear goal - help kids with Math!
                </Typography>
*/
export default function SMAbout(props) {
    return (
        <Dialog onClose={() => props.onClick()} aria-labelledby="customized-dialog-title" transitionDuration={500} open={props.open} scroll="body">
            <SMTitle title='' onClick={() => props.onClick()}/>

            <DialogContent>
                <Typography gutterBottom style={{margin:'3%',color:'orange',fontFamily:'Grinched',fontSize:'3.5rem',textAlign:'center',textShadow:'1px 1px 2px black',lineHeight:'0.9'}}>
                    {about[props.lang]['use']} <font style={{color:'green'}}>SuperMath</font> {about[props.lang]['vitamins']}
                </Typography>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}> {about[props.lang]['designed']} </Typography>
                <Card style={{margin:'5%',display:'flex',flexDirection:'column'}}>
                    <CardMedia component='img' style={{boder:'3px solid black'}} alt='Vitamins!' height='140' src={vitamins}/>
                </Card>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}> {about[props.lang]['offer']} </Typography>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}> {about[props.lang]['nonprofit']} </Typography>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}> {about[props.lang]['colors']} </Typography>
            </DialogContent>

            <DialogActions>
                <Button size="small" color="primary" startIcon={<CancelIcon />}
                        onClick={() => props.onClick()}> {about[props.lang]['close']} </Button>
            </DialogActions>
        </Dialog>
    );
}
