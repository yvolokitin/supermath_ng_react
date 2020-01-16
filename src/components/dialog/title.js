import React from 'react';

import {Typography} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import './title.css';

export default class SMTitle extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        // console.log('SMTitle:: onClose');
        this.props.onClick();
    }

    render() {
        return (
            <MuiDialogTitle disableTypography>
                <Typography variant="h6">
                    {this.props.title}
                </Typography>
                <IconButton aria-label="close" style={{position:'absolute',right:'1%',top:'1%',color:'grey'}} onClick={this.onClose}>
                    <CloseIcon/>
                </IconButton>
            </MuiDialogTitle>
        );
    }
}
