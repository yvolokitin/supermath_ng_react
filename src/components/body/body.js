import React from 'react';
import PropTypes from 'prop-types';

import {Tabs, Tab, Box, AppBar, Typography} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import White from "./white";
import Orange from "./orange";
import Green from "./green";
import Navi from "./navi";
import Black from "./black";

import {body} from './../translations/body';

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

function get_belt_id(color) {
    var belt_id = 0; // 0 is default white color
    if (isNaN(color)) {
        if ((color !== undefined) || (color !== null)) {
            if (color === 'orange') { belt_id = 1; }
            else if (color === 'green') { belt_id = 2; }
            else if (color === 'navi') { belt_id = 3; }
            else if (color === 'black') { belt_id = 4; }
        }
    } else {
        belt_id = parseInt(color);
    }
    return belt_id;
}

export default function Body(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(get_belt_id(props.belt));
    const handleChange = (event, newValue) => {
        setValue(newValue);
        localStorage.setItem('belt', newValue);
    };

    // const onUpdate = (event, newValue) => {
    const onUpdate = (status, passed, failed) => {
        console.log('Body.onUpdate ' + status + ': ' + passed + ', ' + failed);
        if ((status === 'close') || (status === 'replay')) {
            props.onUpdate('counter', passed, failed);
        } else if ((status === 'register')) {
            props.onUpdate('register', passed, failed);
        }
    };

    return (
        <main>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered={true}>
                        <Tab style={{color:'black',fontSize:'0.95rem',fontWeight:'bold'}} label={body[props.lang]['white']} {...a11yProps(0)} />
                        <Tab style={{color:'orange',fontSize:'0.95rem',fontWeight:'bold'}} label={body[props.lang]['orange']} {...a11yProps(1)} />
                        <Tab style={{color:'green',fontSize:'0.95rem',fontWeight:'bold'}} label={body[props.lang]['green']} {...a11yProps(2)} />
                        <Tab style={{color:'#3f51b5',fontSize:'0.95rem',fontWeight:'bold'}} label={body[props.lang]['navy']} {...a11yProps(3)} />
                        <Tab style={{color:'black',fontSize:'0.95rem',fontWeight:'bold'}} label={body[props.lang]['black']} {...a11yProps(4)} />
                    </Tabs>
                </AppBar>

                <TabPanel style={{backgroundColor:'white'}} value={value} index={0}>
                    <White onUpdate={(status, passed, failed) => onUpdate(status, passed, failed)} play={body[props.lang]['play']}
                           info={body[props.lang]['info']} lang={props.lang}/>
                </TabPanel>
                <TabPanel style={{backgroundColor:'orange'}} value={value} index={1}>
                    <Orange onUpdate={(status, passed, failed) => onUpdate(status, passed, failed)}
                            play={body[props.lang]['play']} info={body[props.lang]['info']} lang={props.lang}/>
                </TabPanel>
                <TabPanel style={{backgroundColor:'green'}} value={value} index={2}>
                    <Green onUpdate={(status, passed, failed) => onUpdate(status, passed, failed)}
                           play={body[props.lang]['play']} info={body[props.lang]['info']} lang={props.lang}/>
                </TabPanel>
                <TabPanel style={{backgroundColor:'#3f51b5',}} value={value} index={3}>
                    <Navi onUpdate={(status, passed, failed) => onUpdate(status, passed, failed)}
                          play={body[props.lang]['play']} info={body[props.lang]['info']} lang={props.lang}/>
                </TabPanel>
                <TabPanel style={{backgroundColor:'black'}} value={value} index={4}>
                    <Black onUpdate={(status, passed, failed) => onUpdate(status, passed, failed)}
                           play={body[props.lang]['play']} info={body[props.lang]['info']} lang={props.lang}/>
                </TabPanel>
            </div>
        </main>
    );
}
