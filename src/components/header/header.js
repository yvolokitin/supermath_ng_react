import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';

import SMHelp from './help';
import SMAbout from './about';
import SMLogin from './login';
import Registration from './registration';
import UserInformation from './userinfo';
import AlertDialog from './../alert/alert';

import './header.css';

export default class SMHeader extends React.Component {
    constructor(props) {
        super(props);

        this.onLogin = this.onLogin.bind(this);
        this.onResult = this.onResult.bind(this);

        this.onUserInfoOpen = this.onUserInfoOpen.bind(this);
        this.onUserInfoClose = this.onUserInfoClose.bind(this);

        this.state = {aboutOpen: false,
                      helpOpen: false,
                      loginOpen: false,
                      logoutOpen: false,
                      registerOpen: false,
                      userInfoOpen: false,
                      isLogin: localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : false,
                      userId: localStorage.getItem('user_id') ? localStorage.getItem('user_id') : '0',
                      userName: localStorage.getItem('name') ? localStorage.getItem('name') : 'Kobe',
                      userSurname: localStorage.getItem('surname') ? localStorage.getItem('surname') : 'Bryant',
                      userEmail: localStorage.getItem('email') ? localStorage.getItem('email') : 'Kobe.Bryant@email.com',
                      userAge: localStorage.getItem('age') ? localStorage.getItem('age') : '41',
                      userAva: localStorage.getItem('ava') ? localStorage.getItem('ava') : 'martin-berube',
                      userPass: localStorage.getItem('pass') ? localStorage.getItem('pass') : '60',
                      userFail: localStorage.getItem('fail') ? localStorage.getItem('fail') : '0',
                     };
    }

    componentDidUpdate(prevProps) {
        // console.log("SMHeader componentDidUpdate " + this.state.userPass + " " + this.state.userFail);
        // console.log("localStorage.getItem        " + localStorage.getItem('pass') + " " + localStorage.getItem('fail'));
        if ((this.state.userPass !== localStorage.getItem('pass')) ||
            (this.state.userFail !== localStorage.getItem('fail'))) {

                if ((localStorage.getItem('pass') !== null) &&
                    (localStorage.getItem('fail') !== null)) {
                        this.setState({userPass: localStorage.getItem('pass'),
                                       userFail: localStorage.getItem('fail')});
                }
        }
    }

    onUserInfoOpen() {
        this.setState({userInfoOpen: true});
    }
    onUserInfoClose() {
        this.setState({userInfoOpen: false, userAva: localStorage.getItem('ava')});
    }

    onLogin() {
        this.setState({loginOpen: true});
    }

    onResult(result, user_id, name, email, surname, age, ava, passed, failed) {
        // console.log('onResult ' + result + ', user: ' + user + ', age: ' + age+ ', pass: '  + passed + ', fail: ' + failed);
        if (result === 'successed') {
            this.setState({isLogin: true,
                           userId: user_id,
                           userName: name,
                           userEmail: email,
                           userSurname: surname,
                           userAge: age,
                           userAva: ava,
                           userPass: passed,
                           userFail: failed,
                           // close login window
                           loginOpen: false,
                           // close registration window
                           registerOpen: false});

            // use HTML5 Local Storage if browser supports it
            localStorage.setItem('isLogin', true);
            localStorage.setItem('user_id', user_id);
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('surname', surname);
            localStorage.setItem('age', age);
            localStorage.setItem('ava', ava);
            localStorage.setItem('pass', passed);
            localStorage.setItem('fail', failed);

        } else if (result === 'register') {
            this.setState({loginOpen: false, registerOpen: true});

        } else if (result === 'login') {
            this.setState({loginOpen: true, registerOpen: false});

        } else if (result === 'pswd') {
            console.log('Not implemented yet, just close');
            this.setState({loginOpen: false, isLogin: false});

        } else if (result === 'logout') {
            console.log("onLogout");
            this.setState({isLogin:false,logoutOpen:false});

            // remove all info from local storage
            localStorage.removeItem('isLogin');
            localStorage.removeItem('user_id');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('surname');
            localStorage.removeItem('age');
            localStorage.removeItem('belt');
            localStorage.removeItem('ava');
            localStorage.removeItem('pass');
            localStorage.removeItem('fail');

        } else if (result === 'close') {
            this.setState({logoutOpen: false});

        } else {
            this.setState({loginOpen: false, registerOpen: false, isLogin: false});
        }
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar style={{cursor:'pointer',fontVariant:'small-caps',textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue',}}>
                    <Typography onClick={() => window.location.reload()} style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',color:'orange'}}>SuperMath</Typography>
                    <Typography onClick={() => this.setState({aboutOpen: true})} style={{marginLeft:'1%',fontFamily:'Grinched',fontSize:'2.00rem',color:'green'}}>about</Typography>
                    <Typography onClick={() => this.setState({helpOpen: true})} style={{marginLeft:'1%',fontFamily:'Grinched',fontSize:'2.00rem',color:'green'}}>help</Typography>

                    <Typography variant="h5" style={{flexGrow:1}}></Typography>
                    { this.state.isLogin ?
                        (
                         <Typography onClick={this.onUserInfoOpen} style={{fontSize:'2.00rem',fontFamily:'Grinched',color:'orange'}}>
                            {this.state.userName} :
                            <font style={{color:'green'}}> {this.state.userPass} </font> &#128515;
                            <font style={{color:'red'}}> {this.state.userFail} </font> &#128169;
                         </Typography>
                        )
                        :
                        (
                        <Typography onClick={() => this.setState({registerOpen:true})} style={{fontSize:'2.00rem',fontFamily:'Grinched',color:'green'}}> registration </Typography>
                        )
                    }

                    { this.state.isLogin ?
                        (
                         <Typography onClick={() => this.setState({logoutOpen:true})} style={{marginLeft:'2%',color:'green',fontSize:'2.00rem',fontFamily:'Grinched'}}> logout </Typography>
                        )
                        :
                        (
                         <Typography onClick={this.onLogin} style={{marginLeft:'2%',color:'orange',fontSize:'2.00rem',fontFamily:'Grinched'}}> login </Typography>
                        )
                    }

                </Toolbar>

                <SMHelp open={this.state.helpOpen} onClick={() => this.setState({helpOpen: false})}/>
                <SMAbout open={this.state.aboutOpen} onClick={() => this.setState({aboutOpen: false})}/>
                <SMLogin open={this.state.loginOpen} onClose={this.onResult}/>

                <UserInformation open={this.state.userInfoOpen} onClick={this.onUserInfoClose}
                                 user={this.state.userName} age={this.state.userAge} ava={this.state.userAva}
                                 pass={this.state.userPass} fail={this.state.userFail}/>

                <Registration open={this.state.registerOpen} onClose={this.onResult}/>

                <AlertDialog open={this.state.logoutOpen}
                             title='Do you really want to Logout?'
                             yes='Yes, Please Do it'
                             no='No, I Wanna Stay as'
                             name={this.state.userName}
                             onClose={this.onResult}/>
            </AppBar>
    )};
}
