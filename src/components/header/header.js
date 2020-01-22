import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';

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
                      isLogin: localStorage.getItem('isLogin'),
                      userName: localStorage.getItem('user'),
                      userAge: localStorage.getItem('age'),
                      userPass: localStorage.getItem('pass'),
                      userFail: localStorage.getItem('fail'),
                     };

        this.onLoginResult = this.onLoginResult.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidUpdate(prevProps) {
        // console.log("SMHeader componentDidUpdate " + this.state.userPass + " " + this.state.userFail);
        // console.log("localStorage.getItem        " + localStorage.getItem('pass') + " " + localStorage.getItem('fail'));
        if ((this.state.userPass !== localStorage.getItem('pass')) ||
            (this.state.userFail !== localStorage.getItem('fail'))) {

                if ((localStorage.getItem('pass') !== null) &&
                    (localStorage.getItem('fail') !== null)) {
                        this.setState({userPass: localStorage.getItem('pass'),
                                       userFail: localStorage.getItem('fail'),
                                      });
                }
        }
    }


    onLoginResult(result, user, age, passed, failed) {
        console.log('onLoginResult ' + result + ', user: ' + user + ', age: ' + age + ', pass: '  + passed + ', fail: ' + failed);
        if (result === 'successed') {
            this.setState({loginOpen: false,
                           isLogin: true,
                           userName: user,
                           userAge: age,
                           userPass: passed,
                           userFail: failed,
                          });

            // use HTML5 Local Storage if browser supports it
            localStorage.setItem('isLogin', true);
            localStorage.setItem('user', user);
            localStorage.setItem('age', age);
            localStorage.setItem('pass', passed);
            localStorage.setItem('fail', failed);

        } else {
            this.setState({loginOpen: false,
                           isLogin: false,
                          });
        }
    }

    onLogout() {
        console.log("onLogout");
        this.setState({isLogin:false});

        // remove all info from local storage
        localStorage.removeItem('isLogin');
        localStorage.removeItem('user');
        localStorage.removeItem('age');
        localStorage.removeItem('pass');
        localStorage.removeItem('fail');
    }
/*
    <Button variant="contained" color="primary" startIcon={<PersonOutlineIcon />} onClick={() => this.setState({loginOpen: true})}>Login</Button>
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
                         <Typography onClick={() => this.setState({userInfoOpen: true})} style={{marginRight:'1%',cursor:'pointer',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'orange',textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue'}}>
                            {this.state.userName} :
                            <font style={{color:'green'}}> {this.state.userPass} </font> &#128515;
                            <font style={{color:'red'}}> {this.state.userFail} </font> &#128169;
                         </Typography>
                        )
                        :
                        (
                        <Typography onClick={() => this.setState({loginOpen: true})} style={{marginRight:'2%',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'orange',cursor:'pointer',textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue'}}>login</Typography>
                        )
                    }

                    { this.state.isLogin ?
                        (
                         <Typography onClick={this.onLogout} style={{marginLeft:'3%',cursor:'pointer',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'green',textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue'}}>
                            logout
                         </Typography>
                        )
                        :
                        (null)
                    }
                </Toolbar>

                <SMHelp open={this.state.helpOpen} onClick={() => this.setState({helpOpen: false})}/>
                <SMAbout open={this.state.aboutOpen} onClick={() => this.setState({aboutOpen: false})}/>
                <SMLogin open={this.state.loginOpen} onClick={this.onLoginResult}/>

                <UserInformation open={this.state.userInfoOpen} onClick={() => this.setState({userInfoOpen: false})}
                                 user={this.state.userName} age={this.state.userAge} pass={this.state.userPass} fail={this.state.userFail}/>

            </AppBar>
    )};
}
