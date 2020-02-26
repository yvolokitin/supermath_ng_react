import React from 'react';
import {AppBar, Toolbar, Typography, Menu, Button, MenuItem} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import SMHelp from "./help";
import SMAbout from "./about";
import SMLogin from "./login";

export default class SMHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {aboutOpen: false, helpOpen: false, loginOpen: false};
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Button variant="contained" color="primary" startIcon={<HomeIcon />}>Home</Button>
                    <Button variant="contained" style={{marginLeft: '1%'}} color="primary" startIcon={<InfoOutlinedIcon />} onClick={() => this.setState({aboutOpen: true})}>About</Button>
                    <Button variant="contained" style={{marginLeft: '1%'}} color="primary" startIcon={<HelpOutlineIcon />} onClick={() => this.setState({helpOpen: true})}>Help</Button>
                    <Typography variant="h5" style={{flexGrow: 1}}></Typography>
                    <Button variant="contained" color="primary" startIcon={<PersonOutlineIcon />} onClick={() => this.setState({loginOpen: true})}>Login</Button>

                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {popupState => (
                            <React.Fragment>
                                <Button variant="contained" color="primary" {...bindTrigger(popupState)}>Language</Button>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={popupState.close}>English</MenuItem>
                                        <MenuItem onClick={popupState.close}>Russian</MenuItem>
                                        <MenuItem onClick={popupState.close}>Dutch</MenuItem>
                                    </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                </Toolbar>

                <SMHelp open={this.state.helpOpen} onClick={() => this.setState({helpOpen: false})}/>
                <SMAbout open={this.state.aboutOpen} onClick={() => this.setState({aboutOpen: false})}/>
                <SMLogin open={this.state.loginOpen} onClick={() => this.setState({loginOpen: false})}/>
            </AppBar>
    )};
}
