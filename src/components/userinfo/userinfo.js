﻿import React from 'react';
import PropTypes from 'prop-types';

import {AppBar, Tabs, Tab, Box, Avatar, Dialog, Typography} from '@material-ui/core';

import SMTitle from './../dialog/title';
import Avatars from './avatars';

import {userinfo} from './../halpers/userinfo';
import './userinfo.css';

import ava1 from './../../images/avatars/astronaut-icon.png';
import ava2 from './../../images/avatars/confederate-soldier-icon.png';
import ava3 from './../../images/avatars/construction-worker-icon.png';
import ava4 from './../../images/avatars/doctor-icon.png';
import ava5 from './../../images/avatars/cowboy-icon.png';
import ava6 from './../../images/avatars/chef-icon.png';

import ava7 from './../../images/avatars/artist-icon.png';
import ava8 from './../../images/avatars/boy-icon.png';
import ava9 from './../../images/avatars/chief-icon.png';
import ava10 from './../../images/avatars/clown-icon.png';
import ava11 from './../../images/avatars/grandma-icon.png';
import ava12 from './../../images/avatars/lumberjack-icon.png';

import ava13 from './../../images/avatars/martin-berube.ico';
import ava14 from './../../images/avatars/pirate-icon.png';
import ava15 from './../../images/avatars/policeman-icon.png';
import ava16 from './../../images/avatars/princess-icon.png';
import ava17 from './../../images/avatars/prisoner-icon.png';
import ava18 from './../../images/avatars/queen-icon.png';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography component='div' role='tabpanel' hidden={value !== index}
                    id={`tabpanel-${index}`} aria-labelledby={`scrollable-auto-tab-${index}`}
                    {...other}> {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

export default class UserInformation extends React.Component {
    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
        this.onAvatarUpdate = this.onAvatarUpdate.bind(this);

        var avatars = [ava1,ava2,ava3,ava4,ava5,ava6,ava7,ava8,ava9,ava10,ava11,ava12,ava13,ava14,ava15,ava16,ava17,ava18];
        var index = 13;
        for (var i=0; i<avatars.length; i++) {
            if (avatars[i].includes(this.props.avatar)) {
                index = i;
                break;
            }
        }

        this.state = {tab: 0,
                      index: index,
                      avatars: avatars,
                      name: props.user};

        console.log('avatars.length: ' + avatars.length);
    }
/*
    componentDidUpdate(prevProps) {
        if (this.props.avatar !== prevProps.avatar) {
            for (var i=0; i< this.avatars.length; i++) {
                if (this.state.avatars[i].includes(this.props.avatar)) {
                    this.setState({index: i});
                    break;
                }
            }
        }
    }
*/
    onClose() {
        console.log('onClose');
        // send post update with new avater picture
        this.props.onUpdate();
    }

    onAvatarUpdate(avatar, index) {
        console.log('onUpdate ' + index);
        this.setState({index: index});
    }

    onTabChange(value) {
        console.log('onTabChange: ' + value);
    }

    render() {
        return (
            <Dialog open={this.props.open} fullScreen={true} transitionDuration={600}>
                <SMTitle title='' onClick={this.onClose} style={{display:'flex',backgroundColor:'white'}}/>

                <div className='userinfoboard'>
                    <div className='userinfoboard_name_age'>
                        <div className='userinfoboard_name_age_na'>
                            {this.props.user}, {this.props.age} {userinfo[this.props.lang]['years']}
                        </div>
                        <div className='userinfoboard_name_age_na'>
                            &nbsp; <font style={{color:'green'}}> {this.props.pass} </font> &#128515;
                            &nbsp; <font style={{color:'red'}}> {this.props.fail} </font> &#128169;
                        </div>
                    </div>
                    <div className='userinfoboard_avatar_div'>
                        <Avatar style={{width:'180px',height:'180px',}} src={this.state.avatars[this.state.index]} alt='avatar'/>
                    </div>
                </div>

                <AppBar position='static' color='transparent' style={{marginLeft:'2%',width:'96%',border:'1px solid grey',boxShadow:'10px 10px grey',backgroundColor:'yellow'}}>
                    <Tabs value={this.state.tab} onChange={this.onTabChange} indicatorColor='primary' textColor='primary' centered={true}>
                        <Tab style={{color:'green',fontSize:'0.95rem',fontWeight:'bold'}} label={userinfo[this.props.lang]['avatar']} {...a11yProps(0)}/>
                        <Tab style={{color:'green',fontSize:'0.95rem',fontWeight:'bold'}} label={userinfo[this.props.lang]['exchange']} {...a11yProps(1)}/>
                        <Tab style={{color:'green',fontSize:'0.95rem',fontWeight:'bold'}} label={userinfo[this.props.lang]['settings']} {...a11yProps(2)}/>
                        <Tab style={{color:'green',fontSize:'0.95rem',fontWeight:'bold'}} label={userinfo[this.props.lang]['progress']} {...a11yProps(3)}/>
                        <Tab style={{color:'green',fontSize:'0.95rem',fontWeight:'bold'}} label={userinfo[this.props.lang]['friends']} {...a11yProps(4)}/>
                    </Tabs>
                </AppBar>

                <TabPanel value={this.state.tab} index={0}>
                    <Avatars avatars={this.state.avatars} index={this.state.index} onAvatarUpdate={this.onAvatarUpdate}/>
                </TabPanel>

                <TabPanel value={this.state.tab} index={1}> Settings </TabPanel>
                <TabPanel value={this.state.tab} index={2}> Exchange </TabPanel>
                <TabPanel value={this.state.tab} index={3}> Progress </TabPanel>
                <TabPanel value={this.state.tab} index={4}> Settings </TabPanel>

            </Dialog>
        );
    }
}
