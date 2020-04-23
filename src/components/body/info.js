import React from 'react';
import {Dialog, DialogContent, DialogActions, Typography, Card, CardMedia, Button} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import SMTitle from './../dialog/title';
import {info} from './../translations/info';

import './../header/about.css';

export default function Info(props) {
    return (
        <Dialog onClose={() => props.onClick('close')} aria-labelledby='customized-dialog-title' transitionDuration={500} open={props.open} scroll='body'>
            <SMTitle title='' onClick={() => props.onClick()}/>

            <div className='about_header_line'>
                <div className='about_lightblue_line'></div>
                <div className='about_blue_line'></div>
                <div className='about_darkgreen_line'></div>
                <div className='about_green_line'></div>
                <div className='about_lightgreen_line'></div>
                <div className='about_yellow_line'></div>
                <div className='about_orange_line'></div>
                <div className='about_lightred_line'></div>
                <div className='about_red_line'></div>
                <div className='about_violend_line'></div>
            </div>

            <DialogContent>
                <Typography style={{margin:'3%',color:'orange',fontFamily:'Grinched',fontSize:'2.5rem',textShadow:'1px 1px 2px black',lineHeight:'1.0'}}>
                    {props.title}
                </Typography>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}>
                    {props.text}
                </Typography>

                <Card style={{margin:'3%',display:'flex',flexDirection:'column'}}>
                    <CardMedia component='img' alt='Media Card task' height='100%' image={props.imgUrl}/>
                </Card>

                <Typography style={{margin:'3%',textAlign:'justify',fontWeight:'bold'}}>
                    {info[props.lang]['extra']}
                </Typography>

            </DialogContent>

            <div className='about_header_line'>
                <div className='about_lightblue_line'></div>
                <div className='about_blue_line'></div>
                <div className='about_darkgreen_line'></div>
                <div className='about_green_line'></div>
                <div className='about_lightgreen_line'></div>
                <div className='about_yellow_line'></div>
                <div className='about_orange_line'></div>
                <div className='about_lightred_line'></div>
                <div className='about_red_line'></div>
                <div className='about_violend_line'></div>
            </div>

            <DialogActions style={{margin:'3%',}}>
                <Button size='small' color='primary' startIcon={<CancelIcon />} onClick={() => props.onClick('close')}>
                    {info[props.lang]['close']}
                </Button>
            </DialogActions>

        </Dialog>
    );
}
