import React from 'react';
import {Grid, Avatar} from '@material-ui/core';

export default class Avatars extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='settingsboard'>
                <Grid container spacing={0}>
                {
                    this.props.avatars.map((avatar, id) => (
                        <Grid item key={id} xs={2} style={{padding:'1%',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid grey'}}>
                            <Avatar src={avatar} alt='avatar' onClick={(e) => this.onAvatar(avatar, id)} 
                                    style={{width:'140px',height:'140px',cursor:'pointer',border:'1px solid grey'}}/>
                        </Grid>
                    ))
                }
                </Grid>
            </div>
        );
    }
}
