import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, Slide} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import Title from './../title/title';
import ColorLine from './../line/line';

import {footer} from './../translations/footer';

import image_share from './../../images/share.png';
import image_bonus from './../../images/bonus_200.jpg';

import { makeStyles } from '@material-ui/core/styles';
import './share.css';

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: 'TeleGrotesk',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function Share(props) {
    const [code, setCode] = React.useState('');

    const classes = useStyles();

    React.useEffect(() => {
        if (props.user_id > 0) {
            if (props.user_id.toString().length === 1) {
                setCode('000000' + props.user_id.toString());

            } else if (props.user_id.toString().length === 2) {
                setCode('00000' + props.user_id.toString());

            } else if (props.user_id.toString().length === 3) {
                setCode('0000' + props.user_id.toString());

            } else {
                setCode(props.user_id.toString());
            }
        }

    }, [props.user_id, ]);
    
    return (
        <Dialog open={props.open} onClose={() => props.onClose()}
            fullScreen={props.fullScreen} fullWidth={true} maxWidth='md' scroll='body'
            TransitionComponent={Transition} transitionDuration={900}>

            <Title title={footer[props.lang]['share_title']} src={image_share} onClose={() => props.onClose('')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <DialogTitle className={classes.title}> {footer[props.lang]['share_question']} </DialogTitle>

            {(props.user_id > 0) ? (
                <DialogContent>
                    <DialogContentText style={{textAlign: 'justify'}}> {footer[props.lang]['share_text']} {props.text} </DialogContentText>

                    <Typography align='center'>
                        <img className='share_image' src={image_bonus} alt='Bonus 200' onContextMenu={(e) => e.preventDefault()}/>
                    </Typography>

                    <div className='share_bonus_code'>
                        <font>{code}</font>
                    </div>
                </DialogContent>
            ) : (
                <DialogContent>
                </DialogContent>
            )}

            <ColorLine/>

            <DialogActions>
                <Button onClick={() => props.onClose('')} color='primary' startIcon={<CancelIcon/>}> {footer[props.lang]['close']} </Button>
            </DialogActions>

        </Dialog>
    );
}
