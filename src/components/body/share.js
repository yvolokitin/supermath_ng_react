import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, Slide} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import Title from './../title/title';
import ColorLine from './../line/line';

import {share} from './../translations/share';

import image from './../../images/share.png';

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

            <Title title={share[props.lang]['share']} src={image} onClose={() => props.onClose('')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <DialogTitle className={classes.title}> {share[props.lang]['share_question']} </DialogTitle>

            <DialogContent>
                <DialogContentText style={{textAlign: 'justify'}}> {share[props.lang]['share_text']} {props.text} </DialogContentText>
            </DialogContent>

            <Typography style={{textAlign: 'justify', width: '100%',}}>
                {code}
            </Typography>

            <ColorLine/>

            <DialogActions>
                <Button onClick={() => props.onClose('')} color='primary' startIcon={<CancelIcon/>}> {share[props.lang]['close']} </Button>
            </DialogActions>

        </Dialog>
    );
}
