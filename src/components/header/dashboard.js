import React from 'react';
import PropTypes from 'prop-types';
import {Tab, Tabs, Container, Box, Typography, Card} from '@material-ui/core';

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
        margin: '1%',
        display: 'flex',
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tab: {
        margin: '3%',
        color: 'black',
        fontSize: '1.25rem',
        fontWeight: 'bold',
    },
    panel: {
        minWidth: 575,
        minHeight: 475,
    },
}));

/*
                <Card className={classes.card}>
                </Card>

*/
export default function Dashboard(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs onChange={handleTabChange} orientation="vertical" className={classes.tabs}
                  value={value} variant='fullWidth' indicatorColor='primary'>

                    <Tab className={classes.tab} label="Results" {...a11yProps(0)} />
                    <Tab className={classes.tab} label="Messages" {...a11yProps(1)} />
                    <Tab className={classes.tab} label="Friends" {...a11yProps(2)} />
                    <Tab className={classes.tab} label="Parents" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={value} index={0} className={classes.panel}>
                <Typography component="div" style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',textShadow:'1px 1px 2px black'}}>
                            <font style={{color:'blue'}}> YOUR </font> &nbsp; <font style={{color:'red'}}> MATH </font> &nbsp; <font style={{color:'orange'}}> POINTS: </font>
                </Typography>


                <Typography component="div" style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',textShadow:'1px 1px 2px black'}}>
                            &nbsp; <font style={{color:'green'}}> {props.pass} </font> &#128515;
                            &nbsp; <font style={{color:'red'}}> {props.fail} </font> &#128169;
                </Typography>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Typography component="div" style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',textShadow:'1px 1px 2px black'}}>
                    &nbsp;
                    <SMRadialChart progress='85'/>
                    &nbsp;
                    <SMRadialChart progress='55'/>
                </Typography>
            </TabPanel>

            <TabPanel value={value} index={2}> Friends </TabPanel>
            <TabPanel value={value} index={3}> Parents </TabPanel>
        </div>
    );
}
