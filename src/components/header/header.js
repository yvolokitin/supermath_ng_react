import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';

import axios from 'axios';

import SMHelp from './help';
import SMAbout from './about';

import Login from './login';
import Forget from './forget';
import Registration from './registration';
import Language from './language';

import UserInformation from './../userinfo/userinfo';
import AlertDialog from './../alert/alert';

import './header.css';
import {header} from './../halpers/header';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.onForget = this.onForget.bind(this);
        this.onResult = this.onResult.bind(this);
        this.onUserInfo = this.onUserInfo.bind(this);
        this.onLanguage = this.onLanguage.bind(this);

        this.state = {aboutOpen: false,
                      helpOpen: false,
                      loginOpen: false,
                      logoutOpen: false,
                      forgetOpen: false,
                      registerOpen: false,
                      userInfoOpen: true, // false,
                      langSelector: false,

                      isLogin: localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : false,

                      // current user information
                      lang: props.lang,
                      id: localStorage.getItem('user_id') ? localStorage.getItem('user_id') : '0',
                      name: localStorage.getItem('name') ? localStorage.getItem('name') : 'Kobe',
                      surname: localStorage.getItem('surname') ? localStorage.getItem('surname') : '',
                      avatar: localStorage.getItem('avatar') ? localStorage.getItem('avatar') : 'martin-berube',
                      email: localStorage.getItem('email') ? localStorage.getItem('email') : 'Kobe.Bryant@email.com',
                      age: localStorage.getItem('age') ? localStorage.getItem('age') : '41',
                      pass: localStorage.getItem('pass') ? localStorage.getItem('pass') : '60',
                      fail: localStorage.getItem('fail') ? localStorage.getItem('fail') : '0',
                     };
    }

    componentDidUpdate(prevProps) {
        // console.log("SMHeader componentDidUpdate " + this.state.pass + " " + this.state.fail);
        // console.log("localStorage.getItem        " + localStorage.getItem('pass') + " " + localStorage.getItem('fail'));
        if ((this.state.pass !== localStorage.getItem('pass')) ||
            (this.state.fail !== localStorage.getItem('fail'))) {

                if ((localStorage.getItem('pass') !== null) &&
                    (localStorage.getItem('fail') !== null)) {
                        this.setState({pass: localStorage.getItem('pass'),
                                       fail: localStorage.getItem('fail')});
                }
        }
    }

    onUserInfo(property, value) {
        console.log('SMHeader.onUserInfo ' + property + ': ' + value);
        if (property === 'close') {
            this.setState({userInfoOpen: false});

        } else {
            this.setState({userInfoOpen: false, avatar: localStorage.getItem('avatar')});
            // need to update use avatar and other changed values
            if (this.state.id !== 0) {
                // update user failed counter in header and send to server
                var post_data = {'user_id': this.state.id,
                                 'hash': localStorage.getItem('pswdhash'),
                                 'operation': property,
                                  property: value};
                    axios.post('http://supermath.xyz:3000/api/update', post_data);
            }
        }
    }

    onLanguage(language) {
        if (language !== undefined) {
            // console.log('SMHeader.onLanguage: ' + language);
            this.setState({langSelector: false, lang: language});
            this.props.onUpdate(language);
        } else {
            this.setState({langSelector: false});
        }
    }

    onForget() {
        this.setState({forgetOpen: true});
    }

    onResult(result, user_id, name, language, email, surname, age, avatar, passed, failed) {
        // console.log('onResult ' + result + ', user: ' + user + ', age: ' + age+ ', pass: '  + passed + ', fail: ' + failed);
        if (result === 'successed') {
            this.setState({isLogin: true,
                           id: user_id,
                           'name': name,
                           'lang': language,
                           'email': email,
                           'surname': surname,
                           'age': age,
                           'avatar': avatar,
                           'pass': passed,
                           'fail': failed,
                           // close login window
                           loginOpen: false,
                           // close registration window
                           registerOpen: false});

            // use HTML5 Local Storage if browser supports it
            localStorage.setItem('isLogin', true);
            localStorage.setItem('user_id', user_id);
            localStorage.setItem('name', name);
            localStorage.setItem('land', language);
            localStorage.setItem('email', email);
            localStorage.setItem('surname', surname);
            localStorage.setItem('age', age);
            localStorage.setItem('avatar', avatar);
            localStorage.setItem('pass', passed);
            localStorage.setItem('fail', failed);

        } else if (result === 'register') {
            this.setState({loginOpen: false, registerOpen: true});

        } else if (result === 'login') {
            this.setState({loginOpen: true, forgetOpen: false, registerOpen: false});

        } else if (result === 'forget') {
            // console.log('Not implemented yet, just close');
            this.setState({loginOpen: false, forgetOpen: true, isLogin: false});

        } else if (result === 'logout') {
            console.log("onLogout");
            this.setState({isLogin:false,logoutOpen:false});

            // remove all info from local storage
            localStorage.removeItem('isLogin');
            localStorage.removeItem('user_id');
            localStorage.removeItem('name');
            localStorage.removeItem('pswdhash');
            // keep language setting
            // localStorage.removeItem('lang');
            localStorage.removeItem('email');
            localStorage.removeItem('surname');
            localStorage.removeItem('age');
            localStorage.removeItem('belt');
            localStorage.removeItem('avatar');
            localStorage.removeItem('pass');
            localStorage.removeItem('fail');

        } else if (result === 'close') {
            this.setState({logoutOpen: false});

        } else {
            this.setState({loginOpen: false, forgetOpen: false, registerOpen: false, isLogin: false});
        }
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar style={{cursor:'pointer',fontVariant:'small-caps',textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue',}}>
                    <Typography onClick={() => window.location.reload()} style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',color:'orange'}}>SuperMath</Typography>
                    <Typography onClick={() => this.setState({aboutOpen: true})} style={{marginLeft:'1%',fontFamily:'Grinched',fontSize:'2.00rem',color:'green'}}>
                        {header[this.state.lang]['about']}
                    </Typography>
                    <Typography onClick={() => this.setState({helpOpen: true})} style={{marginLeft:'1%',fontFamily:'Grinched',fontSize:'2.00rem',color:'green'}}>
                        {header[this.state.lang]['help']}
                    </Typography>

                    <Typography variant="h5" style={{flexGrow:1}}></Typography>
                    { this.state.isLogin ?
                        (
                         <Typography onClick={() => this.setState({userInfoOpen: true})} style={{fontSize:'2.00rem',fontFamily:'Grinched',color:'orange'}}>
                            {this.state.name} :
                            <font style={{color:'green'}}> {this.state.pass} </font> &#128515;
                            <font style={{color:'red'}}> {this.state.fail} </font> &#128169;
                         </Typography>
                        )
                        :
                        (
                         <Typography onClick={() => this.setState({registerOpen:true})} style={{fontSize:'2.00rem',fontFamily:'Grinched',color:'green'}}>
                            {header[this.state.lang]['register']}
                         </Typography>
                        )
                    }

                    { this.state.isLogin ?
                        (
                         <Typography onClick={() => this.setState({logoutOpen:true})} style={{marginLeft:'2%',color:'green',fontSize:'2.00rem',fontFamily:'Grinched'}}>
                            {header[this.state.lang]['logout']}
                         </Typography>
                        )
                        :
                        (
                         <Typography onClick={() => this.setState({loginOpen: true})} style={{marginLeft:'2%',color:'orange',fontSize:'2.00rem',fontFamily:'Grinched'}}>
                            {header[this.state.lang]['login']}
                         </Typography>
                        )
                    }

                    <Typography onClick={() => this.setState({langSelector:true})} style={{marginLeft:'1%',fontSize:'2.00rem',fontFamily:'Grinched',color:'green'}}>
                        {header[this.state.lang]['lang']}
                    </Typography>
                </Toolbar>

                <SMHelp open={this.state.helpOpen} onClick={() => this.setState({helpOpen: false})} lang={this.state.lang}/>
                <SMAbout open={this.state.aboutOpen} onClick={() => this.setState({aboutOpen: false})} lang={this.state.lang}/>

                <Login open={this.state.loginOpen} onClose={this.onResult} lang={this.state.lang}/>
                <Forget open={this.state.forgetOpen} onClose={this.onResult} lang={this.state.lang}/>

                <UserInformation open={this.state.userInfoOpen} onUpdate={this.onUserInfo}
                                 id={this.state.id} email={this.state.email}
                                 name={this.state.name} surname={this.state.surname}
                                 age={this.state.age} avatar={this.state.avatar}
                                 pass={this.state.pass} fail={this.state.fail}
                                 lang={this.state.lang}/>

                <Registration open={this.state.registerOpen} onClose={this.onResult} lang={this.state.lang}/>

                <Language open={this.state.langSelector} onClose={this.onLanguage} lang={this.state.lang}/>

                <AlertDialog open={this.state.logoutOpen}
                             title={header[this.state.lang]['logout_title']}
                             yes={header[this.state.lang]['logout_yes']}
                             no={header[this.state.lang]['logout_no']}
                             name={this.state.name}
                             onClose={this.onResult}/>
            </AppBar>
    )};
}
