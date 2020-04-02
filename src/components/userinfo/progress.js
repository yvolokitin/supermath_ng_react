﻿import React from 'react';
import {Card, CardMedia} from '@material-ui/core';

import image from './../../images/under_development.gif';

export default class Progress extends React.Component {
    constructor(props) {
        super(props);

        this.state = {name: props.user};
    }

    render() {
        return (
            <div className='progressboard'>
                <Card style={{display:'flex',flexDirection:'column'}}>
                    <CardMedia component='img' style={{boder:'3px solid black'}} alt='Progress' height='540' src={image}/>
                </Card>
            </div>
        );
    }
}