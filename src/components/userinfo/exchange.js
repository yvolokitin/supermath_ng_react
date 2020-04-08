import React from 'react';
import {Grid, Typography, TextField} from '@material-ui/core';

import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import IndeterminateCheckBoxTwoToneIcon from '@material-ui/icons/IndeterminateCheckBoxTwoTone';

import image from './../../images/under_development.gif';

export default class Exchange extends React.Component {
    constructor(props) {
        super(props);

        this.state = {name: props.user};
    }

    render() {
        return (
            <div className='exchangeboard'>
                <Typography gutterBottom style={{margin:'3%',color:'orange',fontFamily:'Grinched',fontSize:'3.5rem',textAlign:'center',textShadow:'1px 1px 2px black',lineHeight:'0.9'}}>
                    exchange your poops
                </Typography>

                <Typography gutterBottom style={{margin:'3%',color:'orange',fontFamily:'Grinched',fontSize:'3.5rem',textAlign:'center',textShadow:'1px 1px 2px black',lineHeight:'0.9'}}>
                    &nbsp; <font style={{color:'green',}}>50</font>
                    &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                    &nbsp; <font style={{color:'orange',}}>=</font>
                    &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                    &nbsp; <font style={{color:'red',}}>1</font>
                </Typography>

                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item xs={6} sm={3}>
                        <IndeterminateCheckBoxTwoToneIcon fontSize='large'/>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <TextField disabled={true} variant='outlined'/>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <TextField disabled={true} variant='outlined'/>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <AddBoxTwoToneIcon fontSize='large'/>
                    </Grid>

                </Grid>
            </div>
        );
    }
}
