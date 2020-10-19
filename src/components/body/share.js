import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import {BottomNavigation, BottomNavigationAction, Button, Typography, Slide} from '@material-ui/core';

import InfoIcon from '@material-ui/icons/Info';
import CancelIcon from '@material-ui/icons/Cancel';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

import Title from './../title/title';
import ColorLine from './../line/line';

import {footer} from './../translations/footer';

import image_share from './../../images/share.png';
import image_bonus_200 from './../../images/bonus_200.jpg';
import image_bonus_100 from './../../images/bonus_100.jpg';

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

            } else if (props.user_id.toString().length === 4) {
                setCode('000' + props.user_id.toString());

            } else if (props.user_id.toString().length === 5) {
                setCode('00' + props.user_id.toString());

            } else if (props.user_id.toString().length === 6) {
                setCode('0' + props.user_id.toString());

            } else {
                setCode(props.user_id.toString());
            }
        } else {
                setCode('0000000');
        }

    }, [props.user_id, ]);
    
    const handleChange = (event, option) => {
        console.log('Share.handleChange ' + option);
        props.onClose(option, code);
    }

    return (
        <Dialog open={props.open} onClose={() => props.onClose()}
            fullScreen={props.fullScreen} fullWidth={true} maxWidth='md' scroll='body'
            TransitionComponent={Transition} transitionDuration={900}>

            <Title title={footer[props.lang]['share_title']} src={image_share} onClose={() => props.onClose('')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            {(props.user_id > 0) ? (
                <DialogTitle className={classes.title}> {footer[props.lang]['share_question']} </DialogTitle>
            ) : (
                <DialogTitle className={classes.title}> {footer[props.lang]['share_question_reg']} </DialogTitle>
            )}

            {(props.user_id > 0) ? (
                <DialogContent>
                    <DialogContentText style={{textAlign: 'justify'}}> {footer[props.lang]['share_text']} {props.text} </DialogContentText>

                    <Typography align='center'>
                        <img className='share_image' src={image_bonus_200} alt='Bonus 200' onContextMenu={(e) => e.preventDefault()}/>
                    </Typography>

                    <div className='share_bonus_code'>
                        <font>{code}</font>
                    </div>
                </DialogContent>
            ) : (
                <DialogContent>
                    <DialogContentText style={{textAlign: 'justify'}}> {footer[props.lang]['share_text_reg']} {props.text} </DialogContentText>

                    <Typography align='center'>
                        <img className='share_image' src={image_bonus_100} alt='Bonus 100' onContextMenu={(e) => e.preventDefault()}/>
                    </Typography>

                    <div className='share_bonus_code'>
                        <font>{code}</font>
                    </div>
                </DialogContent>
            )}

            <DialogContent scroll='body'>
                <BottomNavigation onChange={handleChange} showLabels>
                    <BottomNavigationAction label={footer[props.lang]['contacts']} value='contacts' icon={<PermPhoneMsgIcon/>}/>
                    <BottomNavigationAction label={footer[props.lang]['about']} value='about' icon={<InfoIcon/>}/>
                    <BottomNavigationAction label={footer[props.lang]['help']} value='help' icon={<ContactSupportIcon/>}/>

                    {(props.user_id < 1) ? (
                        <BottomNavigationAction label={footer[props.lang]['register']} value='register' icon={<AccountCircleIcon/>}/>
                    ) : ( null )}

                </BottomNavigation>
            </DialogContent>

            <ColorLine/>

            <DialogActions>
                <Button onClick={() => props.onClose('')} color='primary' startIcon={<CancelIcon/>}> {footer[props.lang]['close']} </Button>
            </DialogActions>

        </Dialog>
    );
}
