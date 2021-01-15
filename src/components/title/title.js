import React from 'react';

import {Badge, Avatar} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';
import './title.css';

const useStyles = makeStyles((theme) => ({
    avatar_large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    avatar_small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
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
    button_small: {
        position: 'absolute',
        right: '0px',
        top: '0px',
        color: 'black',
    },
}));

export default function Title(props) {
    const [height, setHeight] = React.useState(true);
    const classes = useStyles();

    React.useEffect(() => {
        // console.log('TITLE:: ' + window.innerHeight);
        if (parseInt(window.innerHeight) < 450 || parseInt(window.innerWidth) < 450) {
            setHeight(false);
        }

    }, [ ]);

    return (
        <MuiDialogTitle disableTypography>
            {height ? (
                <>
                    {(props.title.length > 0) ? (
                        <>
                            <Badge color='secondary'>
                                {(props.fullScreen === true) ? (
                                    <Avatar src={props.src} alt={props.title} className={classes.avatar_small} onContextMenu={(e) => e.preventDefault()}/>
                                ) : (
                                    <Avatar src={props.src} alt={props.title} className={classes.avatar_large} onContextMenu={(e) => e.preventDefault()}/>
                                )}
                            </Badge>
                            <Badge color='secondary'>
                                <div className='title_header'> {props.title} </div>
                            </Badge>
                        </>
                    ) : (
                        <div className='title_header'> {props.title} </div>
                    )}

                    <IconButton className={classes.button} onClick={() => props.onClose()}>
                        <CloseIcon/>
                    </IconButton>
                </>
            ) : (
                <IconButton className={classes.button_small} onClick={() => props.onClose()}>
                    <CloseIcon/>
                </IconButton>
            )}
        </MuiDialogTitle>
    );
}
