import React from 'react';
import {Grid, Card, CardMedia} from '@material-ui/core';

import progress from './../../images/progress.png';

export default class Progress extends React.Component {
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
            <div className='progressboard'>
                <Card style={{display:'flex',flexDirection:'column'}}>
                    <CardMedia component='img' style={{boder:'3px solid black'}} alt='Vitamins!' height='540' src={progress}/>
                </Card>
            </div>
        );
    }
}
