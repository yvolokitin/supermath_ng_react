import React from 'react';
import {Avatar, Dialog, Typography} from '@material-ui/core';

import SMTitle from './../dialog/title';
import UserDashboard from './userdashboard';

import logo from './../../images/Martin-Berube-People-Kid.ico';

export default class UserInformation extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);

        this.state = {tab_value: 0,
                      percentage: '',
                      name: '',
                     };
    }

    onClose() {
        console.log('onClose');
        this.props.onClick();
    }

    onLogout() {
        console.log('onLogout');
    }

    handleTabChange() {
        // 
    }

/*
    this.props.open
*/
    render() {
        return (
            <Dialog onClick={this.onClose} transitionDuration={600} maxWidth={false} scroll='body' open={true}>
                <SMTitle title='' onClick={this.onClose} style={{backgroundColor:'white'}}/>

                <div style={{widht:'100%',height:'100%',display:'flex',border: '3px dotted green',}}>
                    <div style={{margin:'1%',widht:'49%',height:'100%',float:'left',textAlign:'center',}}>
                        <Avatar style={{width:'160px',height:'160px',}}>
                            <img src={logo} alt='test'/>
                        </Avatar>

                        <Typography style={{cursor:'pointer',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'orange',textShadow:'1px 1px 2px black'}}>
                            {this.props.user}
                        </Typography>

                        <Typography style={{cursor:'pointer',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'green',textShadow:'1px 1px 2px black'}}>
                            {this.props.age} years old
                        </Typography>
                    </div>

                    <UserDashboard pass={this.props.pass} fail={this.props.fail}/>
                </div>

            </Dialog>
        );
    }
}
