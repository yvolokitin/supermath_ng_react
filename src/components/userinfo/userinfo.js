import React from 'react';
import PropTypes from 'prop-types';

import {AppBar, Tabs, Tab, Box, Avatar, Dialog, Typography} from '@material-ui/core';

import SMTitle from './../dialog/title';

import Avatars from './avatars';
import Settings from './settings';
import Exchange from './exchange';
import Friends from './friends';
import Progress from './progress';

import {userinfo} from './../translations/userinfo';
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

import ava13 from './../../images/avatars/martin-berube.png';
import ava14 from './../../images/avatars/pirate-icon.png';
import ava15 from './../../images/avatars/policeman-icon.png';
import ava16 from './../../images/avatars/princess-icon.png';
import ava17 from './../../images/avatars/prisoner-icon.png';
import ava18 from './../../images/avatars/queen-icon.png';

import ava19 from './../../images/avatars/dentist-icon.png';
import ava20 from './../../images/avatars/baby-icon.png';
import ava21 from './../../images/avatars/soldier-icon.png';
import ava22 from './../../images/avatars/prince-icon.png';
import ava23 from './../../images/avatars/lady-icon.png';
import ava24 from './../../images/avatars/mom-icon.png';

import ava25 from './../../images/avatars/Indian-icon.png';
import ava26 from './../../images/avatars/Irish-icon.png';
import ava27 from './../../images/avatars/king-icon.png';
import ava28 from './../../images/avatars/waiter-icon.png';
import ava29 from './../../images/avatars/woman-icon.png';
import ava30 from './../../images/avatars/firefighter-icon.png';

var avatars = [[ava1, 'astronaut'], [ava2, 'confederate'], [ava3, 'worker'],
               [ava4, 'doctor'], [ava5, 'cowboy'], [ava6, 'chef'],
               [ava7, 'artist'], [ava8, 'boy'], [ava9, 'chief'],
               [ava10, 'clown'], [ava11, 'grandma'], [ava12, 'lumberjack'],
               [ava13, 'martin'], [ava14, 'pirate'], [ava15, 'policeman'],
               [ava16, 'princess'], [ava17, 'prisoner'], [ava18, 'queen'],
               [ava19, 'dentist'], [ava20, 'baby'], [ava21, 'solder'],
               [ava22, 'prince'], [ava23, 'lady'], [ava24, 'mom'],
               [ava25, 'Indian'], [ava26, 'Irish'], [ava27, 'king'],
               [ava28, 'waiter'], [ava29, 'woman'], [ava30, 'firefighter']];

function getIndex(name) {
    for (var i = 0; i < avatars.length; i++) {
        if (avatars[i][1] === name) {
            return i;
        }
    }
    return 13;
}

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
        this.onSettings = this.onSettings.bind(this);
        this.onExchange = this.onExchange.bind(this);
        this.onTabChange = this.onTabChange.bind(this);

        this.index = getIndex(props.avatar);
        this.state = {
            'tab': 0,
            'index': this.index,
            'avatar': avatars[this.index][1],
            'name': props.name,
            'surname': props.surname,
            'email': props.email,
            'birthday': props.birthday,
        };
    }

    componentDidUpdate(prevProps) {
        // if ID, EMAIL, NAME do not match -> user changed
        // use three params id localdata corrapted
        if ((this.props.id !== prevProps.id) &&
            (this.props.email !== prevProps.email) &&
            (this.props.name !== prevProps.name)) {

            this.index = getIndex(this.props.avatar);
            this.setState({
                'tab': 0,
                'index': this.index,
                'avatar': avatars[this.index][1],
                'name': this.props.name,
                'surname': this.props.surname,
                'email': this.props.email,
                'birthday': this.props.birthday,
            });
        }
    }

    onSettings(property, value) {
        // console.log('UserInformation.onSettings: ' + property + ', value ' + value);
        if (property === 'name') {this.setState({name: value});}
        else if (property === 'surname') {this.setState({surname: value});}
        else if (property === 'email') {this.setState({email: value});}
        else if (property === 'pswd') {this.setState({pswd: value});}
        this.props.onUpdate(property, value);
    }

    onExchange(passed, failed) {
        console.log('UserInformation.onExchange: ' + passed + ',  ' + failed);
        this.props.onUpdate('passfail', passed, failed);
    }

    onTabChange(event, value) {
        // console.log('UserInformation.onTabChange: ' + value);
        this.setState({tab: value});
    }

    onClose() {
        console.log('UserInformation.onClose ' + this.state.avatar);
        if (this.state.avatar !== this.props.avatar) {
            this.props.onUpdate('avatar', this.state.avatar);
        } else {
            this.props.onUpdate('close');
        }
    }

    render() {
        return (
            <Dialog open={this.props.open} fullScreen={true} transitionDuration={600}>
                <SMTitle title='' onClick={() => this.onClose()} style={{display:'flex',backgroundColor:'white'}}/>

                <div className='userinfoboard'>
                    <div className='userinfoboard_name_age'>
                        <div className='userinfoboard_name_age_na'>
                            {this.state.name} {this.state.surname}, {this.props.age} {userinfo[this.props.lang]['years']}
                        </div>
                        <div className='userinfoboard_name_age_na'>
                            &nbsp; <font style={{color:'green'}}> {this.props.passed} </font> &#128515;
                            &nbsp; <font style={{color:'red'}}> {this.props.failed} </font> &#128169;
                        </div>
                    </div>
                    <div className='userinfoboard_avatar_div'>
                        <Avatar style={{width:'180px',height:'180px',}} src={avatars[this.state.index][0]} alt='avatar'/>
                    </div>
                </div>

                <AppBar position='static' color='transparent' style={{marginLeft:'2%',width:'96%',border:'1px solid grey',boxShadow:'10px 10px grey',backgroundColor:'yellow'}}>
                    <Tabs value={this.state.tab} onChange={this.onTabChange} indicatorColor='primary' textColor='primary' centered={true}>
                        <Tab style={{color:'green',fontSize:'0.95rem',fontWeight:'bold'}} label={userinfo[this.props.lang]['avatar']} {...a11yProps(0)}/>
                        <Tab style={{color:'green',fontSize:'0.95rem',fontWeight:'bold'}} label={userinfo[this.props.lang]['settings']} {...a11yProps(1)}/>
                        <Tab style={{color:'green',fontSize:'0.95rem',fontWeight:'bold'}} label={userinfo[this.props.lang]['exchange']} {...a11yProps(2)}/>
                        <Tab style={{color:'green',fontSize:'0.95rem',fontWeight:'bold'}} label={userinfo[this.props.lang]['progress']} {...a11yProps(3)}/>
                        <Tab style={{color:'green',fontSize:'0.95rem',fontWeight:'bold'}} label={userinfo[this.props.lang]['friends']} {...a11yProps(4)}/>
                    </Tabs>
                </AppBar>

                <TabPanel value={this.state.tab} index={0}>
                    <Avatars avatars={avatars} avatar={this.state.avatar} onAvatar={(index) => this.setState({'index': index, 'avatar': avatars[index][1]})}/>
                </TabPanel>

                <TabPanel value={this.state.tab} index={1}>
                    <Settings id={this.props.id} name={this.props.name} surname={this.props.surname}
                        email={this.props.email} age={this.props.age} birthday={this.props.birthday}
                        lang={this.props.lang} onSettings={this.onSettings}/>
                </TabPanel>

                <TabPanel value={this.state.tab} index={2}>
                    <Exchange lang={this.props.lang} passed={this.props.passed}
                        failed={this.props.failed} onExchange={this.onExchange}/>
                </TabPanel>

                <TabPanel value={this.state.tab} index={3}>
                    <Progress lang={this.props.lang}/>
                </TabPanel>

                <TabPanel value={this.state.tab} index={4}>
                    <Friends lang={this.props.lang}/>
                </TabPanel>
            </Dialog>
        );
    }
}
