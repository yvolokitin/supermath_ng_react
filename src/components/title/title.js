import React from 'react';

import {Typography, Badge, Avatar} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';
import './title.css';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    title: {
        marginLeft: '13px',
        fontSize: '24px',
        fontFamily: 'TeleGrotesk',
    },
    button: {
        position: 'absolute',
        right: '1%',
        top: '1%',
        color: 'grey',
    },
}));

export default function Title(props) {
    const classes = useStyles();

    return (
        <MuiDialogTitle disableTypography>
            {(props.title.length > 0) ? (
                <>
                <Badge color='secondary'>
                    <Avatar src={props.src} alt={props.title} className={classes.avatar} onContextMenu={(e) => e.preventDefault()}/>
                </Badge>
                <Badge color='secondary'>
                    <Typography className='title_header'> {props.title} </Typography>
                </Badge>
                </>
            ) : (
                <Typography className={classes.title} style={{margin: '20px'}}> {props.title} </Typography>
            )}
            
            <IconButton aria-label='close' onClick={() => props.onClose()} className={classes.button}>
                <CloseIcon/>
            </IconButton>

        </MuiDialogTitle>
    );
}
