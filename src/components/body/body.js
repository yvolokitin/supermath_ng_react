import React from 'react';
import PropTypes from 'prop-types';

import {Tabs, Tab, Box, AppBar, Typography} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import White from "./white";
import Orange from "./orange";
import Green from "./green";
import Navi from "./navi";
import Black from "./black";

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

/*
                <AppBar position="static" color="default">
                    <Typography variant="h4" align="center" style={{fontFamily:'Grinched',fontVariant:'small-caps',color:'green'}}>
                    SuperMath 
                </Typography>
                </AppBar>

*/
export default function SMBody() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <main>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered={true}>
                        <Tab style={{color: 'black'}} label="White" {...a11yProps(0)} />
                        <Tab style={{color: 'orange'}} label="Orange" {...a11yProps(1)} />
                        <Tab style={{color: 'green'}} label="Green" {...a11yProps(2)} />
                        <Tab style={{color: 'blue'}} label="Navy" {...a11yProps(3)} />
                        <Tab style={{color: 'black'}} label="Black" {...a11yProps(4)} />
                    </Tabs>
                </AppBar>

                <TabPanel style={{backgroundColor:'white'}} value={value} index={0}> <White/> </TabPanel>
                <TabPanel style={{backgroundColor:'orange'}} value={value} index={1}> <Orange/> </TabPanel>
                <TabPanel style={{backgroundColor:'green'}} value={value} index={2}> <Green/> </TabPanel>
                <TabPanel style={{backgroundColor:'blue',}} value={value} index={3}> <Navi/> </TabPanel>
                <TabPanel style={{backgroundColor:'black'}} value={value} index={4}> <Black/> </TabPanel>
            </div>
        </main>
    );
}
