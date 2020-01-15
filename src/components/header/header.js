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
import UserInformation from "./userinfo";

import './header.css';

export default class SMHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {aboutOpen: false,
                      helpOpen: false,
                      loginOpen: false,
                      userInfoOpen: false,
                      isLogin: false,
                      userName: 'Sergey',
                      userPass: 745,
                      userFail: 13,};
    }

/*
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

                    <Typography style={{fontSize:'2.00rem',marginRight:'1%',fontFamily:'Grinched',fontVariant:'small-caps',color:'green',textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue'}}>About</Typography>
                    <Typography style={{fontSize:'2.00rem',marginRight:'1%',fontFamily:'Grinched',fontVariant:'small-caps',color:'red',textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue'}}>Help</Typography>

                    <Button variant="contained" color="primary" startIcon={<HomeIcon />}>Home</Button>
                    <Button variant="contained" style={{marginLeft: '1%'}} color="primary" startIcon={<InfoOutlinedIcon />} onClick={() => this.setState({aboutOpen: true})}>About</Button>
                    <Button variant="contained" style={{marginLeft: '1%'}} color="primary" startIcon={<HelpOutlineIcon />} onClick={() => this.setState({helpOpen: true})}>Help</Button>
*/
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography style={{fontSize:'2.00rem',marginLeft:'1%',fontFamily:'Grinched',fontVariant:'small-caps',color:'orange',textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue'}}>SuperMath</Typography>
                    <Typography onClick={() => this.setState({aboutOpen: true})} style={{fontSize:'2.00rem',marginLeft:'2%',fontFamily:'Grinched',fontVariant:'small-caps',color:'green',cursor:'pointer',textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue'}}>about</Typography>
                    <Typography onClick={() => this.setState({helpOpen: true})} style={{fontSize:'2.00rem',marginLeft:'2%',fontFamily:'Grinched',fontVariant:'small-caps',color:'green',cursor:'pointer',textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue'}}>help</Typography>

                    <Typography variant="h5" style={{flexGrow: 1}}></Typography>

                    { this.state.isLogin ?
                        (
                        <Button variant="contained" color="primary" startIcon={<PersonOutlineIcon />} onClick={() => this.setState({loginOpen: true})}>Login</Button>
                        )
                        :
                        (
                        <Typography onClick={() => this.setState({userInfoOpen: true})} style={{marginRight:'1%',cursor:'pointer',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'orange',textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue'}}>
                            {this.state.userName}: <font style={{color: 'green'}}>{this.state.userPass}</font> &#128515; <font style={{color: 'red'}}>{this.state.userFail}</font> &#128169;
                         </Typography>
                        )
                    }

                </Toolbar>

                <SMHelp open={this.state.helpOpen} onClick={() => this.setState({helpOpen: false})}/>
                <SMAbout open={this.state.aboutOpen} onClick={() => this.setState({aboutOpen: false})}/>
                <SMLogin open={this.state.loginOpen} onClick={() => this.setState({loginOpen: false})}/>

                <UserInformation open={this.state.userInfoOpen} onClick={() => this.setState({userInfoOpen: false})}/>

            </AppBar>
    )};
}
