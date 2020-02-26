import React from 'react';
import {DialogContent, DialogActions, Typography, Dialog, Card, CardMedia, Button} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';

import SMTitle from "./../dialog/title";
import vitamins from './../../images/vitamins.jpg';

/*
                    <font style={{color:'red'}}>Use</font>&nbsp; &nbsp;
                    <font style={{color:'green'}}>SuperMath</font>&nbsp; &nbsp;
                    <font style={{color:'orange'}}>as</font>&nbsp; &nbsp;
                    <font style={{color:'blue'}}>mathematical</font>&nbsp; &nbsp;
                    <font style={{color:'green'}}>Vitamins</font> &nbsp; <font style={{color:'red'}}>!</font>

*/
export default function SMAbout(props) {
    return (
        <Dialog onClose={() => props.onClick()} aria-labelledby="customized-dialog-title" transitionDuration={500} open={props.open} scroll="body">
            <SMTitle title='' onClick={() => props.onClick()}/>

            <DialogContent>
                <Typography gutterBottom style={{margin:'3%',color:'orange',fontFamily:'Grinched',fontSize:'3.5rem',textAlign:'center',textShadow:'1px 1px 2px black',lineHeight:'0.9'}}>
                    Use <font style={{color:'green'}}>SuperMath</font> as mathematical vitamins!
                </Typography>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}>
                    SuperMath is designed to help students transition from counting or calculating to recalling the basic arithmetic facts.
                </Typography>


                <Card style={{margin:'5%',display:'flex',flexDirection:'column',fontWeight:'bold'}}>
                    <CardMedia component="img" style={{boder:'3px solid black'}} alt="Vitamins!" height="140" src={vitamins}/>
                </Card>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}>
                    Offer the child to regularly solve the examples in SuperMath
                    only once a day, for five minutes, and you will notice how much faster and more accurately he will
                    operate on the numbers. The speed and accuracy of the calculations - these are the bricks that lay
                    the foundation of your childs mathematical education.
                </Typography>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}>
                    In one day, I just personally asked myself - How can I contribute to improve a small part of the world.
                    Im father of two wonderful sons and due to a lot of work responsibility, in some days I could not get so much attantion to them, specially in Mathematics.
                    We could not image our current life now without Mobile phone and Internet and we have it because of Math.
                    When I developed that Math portal for kids I had vary clear goal - help kids with Math!
                </Typography>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}>
                    Thanks, Yura.
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button size="small" color="primary" startIcon={<CancelIcon />}
                        onClick={() => props.onClick()}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
