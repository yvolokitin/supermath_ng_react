﻿import React from 'react';
import {Grid, Card, CardMedia} from '@material-ui/core';

import friends from './../../images/friends.jpg';

export default class Friends extends React.Component {
    constructor(props) {
        super(props);

        this.state = {name: props.user};
    }

    /*
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={6} style={{padding:'3%'}}> </Grid>
                </Grid>
    */
    render() {
        return (
            <div className='friendsboard'>
                <Card style={{display:'flex',flexDirection:'column'}}>
                    <CardMedia component='img' style={{boder:'3px solid black'}} alt='Vitamins!' height='540' src={friends}/>
                </Card>
            </div>
        );
    }
}
