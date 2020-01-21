import React from 'react';
import PropTypes from 'prop-types';
import {Tab, Tabs, Container, Box, Typography} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import SMRadialChart from "./../charts/smradialchart";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography component="div" role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
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

const useStyles = makeStyles(theme => ({
    root: {
        margin: '2%',
        flexGrow: 1,
        height: 224,
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid black',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tab: {
        color: 'black',
        fontSize: '0.95rem',
        fontWeight: 'bold',
    },
    panel: {
        
    },
    grid: {
        margin: '0',
        paddingTop: '8px',
        paddingBottom: '8px',
        border: '1px solid red',
    }
}));

export default function UserDashboard() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs onChange={handleTabChange} orientation="vertical" centered={true} className={classes.tabs} value={value}>
                <Tab className={classes.tab} label="Dashboard" {...a11yProps(0)} />
                <Tab className={classes.tab} label="Messages" {...a11yProps(1)} />
                <Tab className={classes.tab} label="Friends" {...a11yProps(2)} />
                <Tab className={classes.tab} label="Parents" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={value} index={0} className={classes.panel}>
                <Container className={classes.grid} maxWidth="md">

                <Typography component="div" style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',textShadow:'1px 1px 2px black'}}>
                    <font style={{color:'orange'}}> RECENT </font> <font style={{color:'red'}}> MATH </font> <font style={{color:'green'}}> PROGRESS </font>
                </Typography>                    

                <Typography component="div" style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',textShadow:'1px 1px 2px black'}}>
                    <SMRadialChart progress='95'/>
                </Typography>

                </Container>
            </TabPanel>

            <TabPanel value={value} index={1}> Messages </TabPanel>
            <TabPanel value={value} index={2}> Friends </TabPanel>
            <TabPanel value={value} index={3}> Parents </TabPanel>
        </div>
    );
}
