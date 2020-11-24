import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import Title from './../title/title';
import ColorLine from './../line/line';

import image from './../../images/trophy.jpeg';

import {POOP_COST} from './../halpers/functions';
import {trophy} from './../translations/trophy';

import './throw.css';

export default function Throw(props) {
    return (
        <Dialog open={props.open} fullScreen={props.fullScreen} onClose={() => props.onThrow('close')}>
            <Title title={trophy[props.lang]['top10']} src={image} onClose={() => props.onThrow('close')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <DialogTitle> {trophy[props.lang]['title']} </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {trophy[props.lang]['have']}
                    <b> {props.passed} </b>
                    {trophy[props.lang]['points']}
                    {trophy[props.lang]['costs']}
                    <b> {POOP_COST} </b>
                    {trophy[props.lang]['question']}
                    <b> {props.name} </b>
                    ?
                </DialogContentText>
            </DialogContent>

            <ColorLine/>

            <DialogActions>
                <Button onClick={() => props.onThrow('throw')} color="primary" autoFocus>
                    {trophy[props.lang]['yes']}
                </Button>
                <Button onClick={() => props.onThrow('close')} color="primary">
                    {trophy[props.lang]['no']}
                </Button>
            </DialogActions>

        </Dialog>
    );
}
