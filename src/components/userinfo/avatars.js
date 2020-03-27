import React from 'react';
import {Grid, Avatar} from '@material-ui/core';

export default class Avatars extends React.Component {
    constructor(props) {
        super(props);
        this.onAvatar = this.onAvatar.bind(this);
    }

    onAvatar(avatar, id) {
        console.log('onChangeAvatar ' + avatar + ', id ' + id);
        // onChangeAvatar /static/media/astronaut-icon.2a916653.png
        // we should save proper value in storage, i.e. astronaut-icon name only
        var index = avatar.indexOf('.');
        // '/static/media/' length = 14
        var value = avatar.substring(14, index);
        localStorage.setItem('avatar', value);
        // console.log('value ' + value);

        this.setState({index: id});
        this.props.onAvatar(value, id);
    }

    render() {
        return (
            <div className='avatarsboard'>
                <Grid container spacing={0}>
                {
                    this.props.avatars.map((avatar, id) => (
                        <Grid item key={id} xs={2} style={{padding:'1%',display:'flex',alignItems:'center',justifyContent:'center',}}>
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
