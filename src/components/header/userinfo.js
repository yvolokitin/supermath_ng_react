import React from 'react';
import {Avatar, Dialog, Typography, Box, Tab, Tabs} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import './userinfo.css';
import SMTitle from "./../dialog/title";

import logo from './../../images/Martin-Berube-People-Kid.ico';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

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
    
*/
    render() {
        return (
            <Dialog onClick={this.onClose} transitionDuration={600} fullWidth={true} maxWidth={false} scroll='body' open={this.props.open}>
                <SMTitle title="User Information" onClick={this.onClose} style={{backgroundColor:'white'}}/>

                <div style={{border:'3px dotted black',widht:'100%',height:'100%'}}>

                    <div style={{marginLeft:'2%',widht:'49%',height:'100%',float:'left',border:'1px solid red',}}>
                        <div style={{widht:'20%',height:'100%'}}>
                            <Avatar style={{margin:'2%',width:'160px',height:'160px',}}>
                                <img src={logo} alt='test'/>
                            </Avatar>
                        </div>

                        <div style={{border:'1px solid blue',widht:'320px',height:'160px',float:'left',}}>
                            User name: {this.state.name}
                        </div>
                    </div>

                    <div style={{border:'1px solid green',widht:'50%',height:'100%',float:'right',}}>
                        tests
                    </div>

                </div>

    <div>
      <Tabs orientation="vertical" variant="scrollable" value={this.state.tab_value} onChange={this.handleTabChange} aria-label="Vertical tabs example" style={{borderRight:'1px solid ${theme.palette.divider}'}}>
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={this.state.tab_value} index={0}> Dashboard </TabPanel>
      <TabPanel value={this.state.tab_value} index={1}> Courses </TabPanel>
      <TabPanel value={this.state.tab_value} index={2}> Friends </TabPanel>
      <TabPanel value={this.state.tab_value} index={3}> Parents </TabPanel>
    </div>



            </Dialog>
        );
    }
}
