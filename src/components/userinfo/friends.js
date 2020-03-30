import React from 'react';
import {Card, CardMedia} from '@material-ui/core';

import image from './../../images/under_development.gif';

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
                    <CardMedia component='img' style={{boder:'3px solid black'}} alt='Vitamins!' height='540' src={image}/>
                </Card>
            </div>
        );
    }
}
