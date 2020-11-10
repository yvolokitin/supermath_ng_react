import React from 'react';
import {Dialog, Button, DialogActions} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';

import {game} from './../translations/game';

import Title from './../title/title';
import ColorLine from './../line/line';

import './gameimage.css';

export default function GameImage(props) {
    return (
        <Dialog open={props.open} scroll='body' fullWidth={true} maxWidth='md' fullScreen={props.fullScreen}>
            <Title title='' onClose={() => props.onClose('')} fullScreen={props.fullScreen}/>

            <div className='gameimage_zoomed'>
                <img src={props.image} alt='Zoomed!'/>
            </div>

            <ColorLine/>
            <DialogActions>
                <Button size='small' color='primary' startIcon={<CancelIcon />}
                    onClick={() => props.onClose('')}> {game[props.lang]['close']} </Button>
            </DialogActions>

        </Dialog>
    );
}
