import React from 'react';
import axios from 'axios';

import Help from './help';
import About from './about';

import Login from './login';
import Forget from './forget';
import Registration from './registration';
import Language from './language';
import Welcome from './welcome';

import UserInformation from './../userinfo/userinfo';
import AlertDialog from './../alert/alert';

import './header.css';
import {header} from './../translations/header';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.onApiUpdate = this.onApiUpdate.bind(this);
        this.onApiUpdateError = this.onApiUpdateError.bind(this);

        this.onForget = this.onForget.bind(this);
        this.onResult = this.onResult.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onWelcome = this.onWelcome.bind(this);
        this.onUserInfo = this.onUserInfo.bind(this);
        this.onLanguage = this.onLanguage.bind(this);

        this.updateSize = this.updateSize.bind(this);

        this.state = {width: window.innerWidth,
                      aboutOpen: false,
                      helpOpen: false,
                      loginOpen: false,
                      logoutOpen: false,
                      forgetOpen: false,
                      userInfoOpen: false,
                      langSelector: false,
                      welcomeOpen: false,
                      registerOpen: props.register,
                      // current user information
                      lang: props.lang,
                      belt: props.belt,
                      pass: props.passed,
                      fail: props.failed,
                      id: localStorage.getItem('user_id') ? parseInt(localStorage.getItem('user_id')) : 0,
                      name: localStorage.getItem('name') ? localStorage.getItem('name') : '',
                      // subname is used when name.length > 10 characters
                      subname: localStorage.getItem('name') ? localStorage.getItem('name').slice(0, 9) : '',
                      surname: localStorage.getItem('surname') ? localStorage.getItem('surname') : '',
                      avatar: localStorage.getItem('avatar') ? localStorage.getItem('avatar') : 'martin-berube',
                      email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
                      age: localStorage.getItem('age') ? localStorage.getItem('age') : '',
                     };

        window.addEventListener('resize', this.updateSize);
    }

    updateSize() {
        // console.log('window.innerWidth ' + window.innerWidth);
        this.setState({width: window.innerWidth});
    }

    componentDidUpdate(prevProps) {
        console.log('Header.componentDidUpdate, this.props.register ' + this.props.register + ', prevProps.register: ' + prevProps.register);
        if (this.props.register !== prevProps.register) {
            console.log('Header.componentDidUpdate ' + this.props.register + ', passed: ' + this.props.passed + ',failed: ' + this.props.failed);
            if ((parseInt(this.props.passed) > 0) || (parseInt(this.props.failed) > 0)) {
                this.setState({registerOpen: this.props.register, pass: this.props.passed, fail: this.props.failed});
            } else {
                this.setState({registerOpen: this.props.register});
            }

        } else if ((this.props.passed !== prevProps.passed) || (this.props.failed !== prevProps.failed)) {
            console.log('Header.componentDidUpdate ' + this.props.passed + '. ' + this.props.failed);
            // check if user login -> update counters
            if (this.state.id > 0) {
                this.setState({pass: this.props.passed, fail: this.props.failed});
            }
        } else {
            console.log('Header.componentDidUpdate, no updates');
        }
    }

    onRefresh(event) {
        event.preventDefault();

        var pswdhash = localStorage.getItem('pswdhash');
        console.log('Header.onRefresh ' + this.state.id + ', pswdhash: ' + pswdhash);
        if ((this.state.id > 0) && (pswdhash !== null)) {
            var post_data = {'user_id': this.state.id, 'pswdhash': pswdhash};
            axios.post('http://supermath.xyz:3000/api/refresh', post_data)
                .then(this.onApiUpdate)
                .catch(this.onApiUpdateError);

        } else { // else user is logouted -> page reload
            window.location.reload();
            // this.setState({loginOpen:true});
        }
    }

    onWelcome(property) {
        if (property === 'userinfo') {
            this.setState({userInfoOpen: true, welcomeOpen: false});
        } else {
            this.setState({welcomeOpen: false});
        }
    }

    onUserInfo(property, value, asset='na') {
        var pswdhash = localStorage.getItem('pswdhash');

        if (property === 'close') {
            this.setState({userInfoOpen: false});

        } else if (property === 'passfail') {
            console.log('Header.onUserInfo ' + value + ', ' + asset + ', ' + localStorage.getItem('belt'));
            this.setState({pass: value, fail: asset});
            localStorage.setItem('pass', value);
            localStorage.setItem('fail', asset);

            if ((this.state.id > 0) && (pswdhash !== null)) {
                var passkey = parseInt(this.state.id) * value;
                var passbin = (passkey >>> 0).toString(2); // xor
                var failkey = parseInt(this.state.id) * asset;
                var failbin = (failkey >>> 0).toString(2);
                console.log('Binary ' + passkey + ': ' + passbin + ', ' + failkey + ': ' + failbin);
                var post = {'user_id': this.state.id,
                            'pswdhash': pswdhash,
                            'passed': passbin,
                            'failed': failbin,
                            'belt': localStorage.getItem('belt')};
                // update user failed counter in header and send to server
                axios.post('http://supermath.xyz:3000/api/counter', post)
                    .then(this.onApiUpdate)
                    .catch(this.onApiUpdateError);
            }

        } else {
            // console.log('SMHeader.onUserInfo ' + property + ': ' + value);
            var post_data = {'user_id': this.state.id,
                             'operation': property,
                             'pswdhash': pswdhash};
            if (property === 'name') {
                this.setState({name: value, subname: value.slice(0, 9)});
                post_data['name'] = value;
            } else if (property === 'surname') {
                this.setState({surname: value});
                post_data['surname'] = value;
            } else if (property === 'email') {
                this.setState({email: value});
                post_data['email'] = value;
            } else if (property === 'pswd') {
                // for new pswd we have to generate new hash
                // pswd = request.json.get('pswd')
                // newhash = request.json.get('newhash')
                this.setState({pswd: value});
                post_data['pswd'] = value;
            } else if (property === 'avatar') {
                this.setState({avatar: value});
                post_data['avatar'] = value;
            }

            // this.setState({userInfoOpen: false, avatar: localStorage.getItem('avatar')});
            // need to update use avatar and other changed values
            if ((this.state.id > 0) && (pswdhash !== null)) {
                // update user failed counter in header and send to server
                axios.post('http://supermath.xyz:3000/api/update', post_data)
                    .then(this.onApiUpdate)
                    .catch(this.onApiUpdateError);
            }
        }
    }

    onLanguage(language) {
        if (language !== undefined) {
            console.log('Header.onLanguage: ' + language);
            localStorage.setItem('land', language);
            this.setState({langSelector: false, lang: language});
            console.log('pswdhash: ' + localStorage.getItem('pswdhash'));
            if (this.state.id > 0) {
                // update user failed counter in header and send to server
                var post_data = {'user_id': this.state.id,
                                 'pswdhash': localStorage.getItem('pswdhash'),
                                 'operation': 'lang',
                                 'lang': language};
                axios.post('http://supermath.xyz:3000/api/update', post_data)
                    .then(this.onApiUpdate)
                    .catch(this.onApiUpdateError);
            } else {
                console.log('Language.onSave: do not sent language change to ' + language);
            }

            this.props.onUpdate('language', language, this.state.belt);

        } else {
            this.setState({langSelector: false});
        }
    }

    onResult(result, user_id, name, language, email, age, surname, avatar, passed, failed, belt) {
        // console.log('Header.onResult ' + result + ', ' + user_id + ', ' + name +  ', ' + language + ', ' + email + ', ' + surname);
        console.log('Header.onResult ' + passed + ', ' + failed + ', age: ' + age + ', avatar: '  + avatar + ', belt: ' + belt);
        if (result === 'successed') {
            var welcomeScreen = false;
            if (this.state.registerOpen === true) {
                this.props.onUpdate('unregister');
                welcomeScreen = true;
            }

            this.setState({'id': parseInt(user_id),
                           'name': name,
                           'subname': name.slice(0, 9),
                           'lang': language,
                           'email': email,
                           'surname': surname,
                           'age': age,
                           'avatar': avatar,
                           'belt': belt,
                           'pass': passed,
                           'fail': failed,
                            // close login window
                            loginOpen: false,
                            // close registration window
                            welcomeOpen: welcomeScreen});

            // use HTML5 Local Storage if browser supports it
            localStorage.setItem('user_id', user_id);
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('surname', surname);
            localStorage.setItem('age', age);
            localStorage.setItem('avatar', avatar);
            localStorage.setItem('pass', passed);
            localStorage.setItem('fail', failed);

            // need to notify body and footer on updated language and belt color
            // supermathpage.js will call localStorage.setItem
            this.props.onUpdate('language', language, belt);

        } else if (result === 'register') {
            this.setState({loginOpen: false});
            this.props.onUpdate('register');

        } else if (result === 'login') {
            this.setState({loginOpen: true, forgetOpen: false});
            if (this.state.registerOpen === true) {
                this.props.onUpdate('unregister');
            }

        } else if (result === 'forget') {
            // console.log('Not implemented yet, just close');
            this.setState({loginOpen: false, forgetOpen: true});

        } else if (result === 'logout') {
            console.log("onLogout");
            this.setState({id: 0, logoutOpen:false});

            // remove all info from local storage
            localStorage.removeItem('user_id');
            localStorage.removeItem('name');
            localStorage.removeItem('pswd');
            localStorage.removeItem('pswdhash');
            localStorage.removeItem('email');
            localStorage.removeItem('surname');
            localStorage.removeItem('age');
            localStorage.removeItem('avatar');
            localStorage.removeItem('pass');
            localStorage.removeItem('fail');

            // keep language and belt properties
            // localStorage.removeItem('lang');
            // localStorage.removeItem('belt');

        } else if (result === 'close') {
            this.setState({logoutOpen: false});

        } else {
            if (this.state.registerOpen === true) {
                this.props.onUpdate('unregister');
            } else {
                this.setState({loginOpen: false, forgetOpen: false, welcomeOpen: false});
            }
        }
    }

    onApiUpdate(response) {
        if ('data' in response) {
            if ('error' in response.data) {
                console.log('ERROR Header.onApiUpdate received ' + response.data.error);

            } else if ('id' in response.data) {
                console.log('Header.onApiUpdate: successed, ' + response.data.id);
                if (('name' in response.data) && ('lang' in response.data) &&
                    ('age' in response.data) && ('surname' in response.data) &&
                    ('email' in response.data) && ('creation' in response.data) &&
                    ('pass' in response.data) && ('fail' in response.data) &&
                    ('avatar' in response.data) && ('belt' in response.data)) {
                        var birthday = new Date(response.data.age);
                        var ageDifMs = Date.now() - birthday.getTime();
                        var ageDate = new Date(ageDifMs);
                        var age = Math.abs(ageDate.getUTCFullYear() - 1970);

                        this.onResult('successed', response.data.id, response.data.name, response.data.lang, response.data.email, age,
                                       response.data.surname, response.data.avatar, response.data.pass, response.data.fail, response.data.belt);
                }

                // refreshing page if received from server (usually, it forced by user)
                if ('refresh' in response.data) {
                    console.log('!!!! window.location.reload()');
                    window.location.reload();
                }
            } else {
                console.log('ERROR: Header.onApiUpdate no error and id in data message from server');
            }
        } else {
            console.log('ERROR: Header.onApiUpdate received no data in response from server');
        }
    }

    onApiUpdateError(error) {
        console.log('Header.onApiUpdateError -> error ' + error);
        // refreshing page
        window.location.reload();
    }

    onForget() {
        this.setState({forgetOpen: true});
    }

    render() {
        return (
            <div className='header_div'>
                { (this.state.width > 580) ? (
                  <>
                    <div className='header_div_left'>
                        { (this.state.width > 860) ? (
                            <font onClick={this.onRefresh} className='font_supermath'> SuperMath </font>
                          ) : (
                            <font onClick={this.onRefresh} className='font_supermath'> SM </font>
                        )}
                        <font onClick={() => this.setState({aboutOpen: true})} className='font_about'> {header[this.state.lang]['about']} </font>
                        <font onClick={() => this.setState({helpOpen: true})} className='font_help'> {header[this.state.lang]['help']} </font>
                    </div>

                    <div className='header_div_right'>
                        { (this.state.id > 0) ? (
                            <>
                              { (this.state.name.length < 10) ? (
                                    <font onClick={() => this.setState({userInfoOpen: true})} className='font_userinfo'>
                                        {this.state.name} :
                                    </font>
                                ) : (
                                    <font onClick={() => this.setState({userInfoOpen: true})} className='font_userinfo'>
                                        {this.state.subname} :
                                    </font>
                              ) }
                              <font onClick={() => this.setState({userInfoOpen: true})} className='font_userinfo' style={{color:'green'}}>
                                {this.state.pass} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                              </font> 
                              <font onClick={() => this.setState({userInfoOpen: true})} className='font_userinfo_last' style={{color:'red'}}>
                                {this.state.fail} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                              </font> 
                              <font onClick={() => this.setState({logoutOpen:true})} className='font_login'>{header[this.state.lang]['logout']}</font>
                            </>
                           ) : (
                            <>
                              <font onClick={() => this.props.onUpdate('register')} className='font_register'> {header[this.state.lang]['register']} </font>
                              <font onClick={() => this.setState({loginOpen: true})} className='font_login'> {header[this.state.lang]['login']} </font>
                            </>
                           )
                        }

                        <font onClick={() => this.setState({langSelector:true})} className='font_lang'> {header[this.state.lang]['lang']} </font>

                    </div>
                  </>
                  ) : ( null )
                }

                { (this.state.width < 581) ? (
                  <>
                    <div className='header_div_left'>
                        { (this.state.width > 500) ? (
                            <font onClick={this.onRefresh} className='font_supermath'> SuperMath </font>
                          ) : (
                            <font onClick={this.onRefresh} className='font_supermath'> sm </font>
                        )}
                        <font onClick={() => this.setState({aboutOpen: true})} className='font_about'> {header[this.state.lang]['about']} </font>
                        <font onClick={() => this.setState({helpOpen: true})} className='font_help'> {header[this.state.lang]['help']} </font>
                        { (this.state.id > 0) ? (
                              <font onClick={() => this.setState({logoutOpen:true})} className='font_login'>{header[this.state.lang]['logout']}</font>
                          ) : (
                              <font onClick={() => this.setState({loginOpen: true})} className='font_login'> {header[this.state.lang]['login']} </font>
                        )}

                        <font onClick={() => this.setState({langSelector:true})} className='font_lang'> {header[this.state.lang]['lang']} </font>
                    </div>

                    <div className='header_div_right'>
                        { (this.state.id > 0) ? (
                            <>
                              { (this.state.name.length < 10) ? (
                                    <font onClick={() => this.setState({userInfoOpen: true})} className='font_userinfo'>
                                        {this.state.name} :
                                    </font>
                                ) : (
                                    <font onClick={() => this.setState({userInfoOpen: true})} className='font_userinfo'>
                                        {this.state.subname} :
                                    </font>
                              ) }
                              <font onClick={() => this.setState({userInfoOpen: true})} className='font_userinfo' style={{color:'green'}}>
                                {this.state.pass} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                              </font> 
                              <font onClick={() => this.setState({userInfoOpen: true})} className='font_userinfo_last' style={{color:'red'}}>
                                {this.state.fail} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                              </font> 
                            </>
                           ) : (
                              <font onClick={() => this.props.onUpdate('register')} className='font_register' style={{color:'orange'}}>
                                {header[this.state.lang]['register']}
                              </font>
                           )
                        }
                    </div>
                  </>
                  ) : ( null )
                }

                <Help open={this.state.helpOpen} fullScreen={this.state.width<581} onClick={() => this.setState({helpOpen: false})} lang={this.state.lang}/>
                <About open={this.state.aboutOpen} fullScreen={this.state.width<581} onClick={() => this.setState({aboutOpen: false})} lang={this.state.lang}/>

                <Login open={this.state.loginOpen} fullScreen={this.state.width<581} onClose={this.onResult} lang={this.state.lang}/>
                <Forget open={this.state.forgetOpen} fullScreen={this.state.width<581} onClose={this.onResult} lang={this.state.lang}/>

                <UserInformation open={this.state.userInfoOpen} onUpdate={this.onUserInfo}
                                 id={this.state.id} email={this.state.email}
                                 name={this.state.name} surname={this.state.surname}
                                 age={this.state.age} avatar={this.state.avatar}
                                 pass={this.state.pass} fail={this.state.fail}
                                 lang={this.state.lang}/>

                <Registration open={this.state.registerOpen}
                              fullScreen={this.state.width<581}
                              onClose={this.onResult}
                              lang={this.state.lang}
                              passed={this.props.passed}
                              failed={this.props.failed}/>

                <Language open={this.state.langSelector}
                          fullScreen={this.state.width<581} 
                          onClose={this.onLanguage}
                          lang={this.state.lang}/>

                <Welcome open={this.state.welcomeOpen}
                         fullScreen={this.state.width<581} 
                         lang={this.state.lang}
                         name={this.state.name}
                         surname={this.state.surname}
                         passed={this.state.pass}
                         failed={this.state.fail}
                         onClose={this.onWelcome}/>

                <AlertDialog open={this.state.logoutOpen}
                             fullScreen={this.state.width<581} 
                             title={header[this.state.lang]['logout_title']}
                             yes={header[this.state.lang]['logout_yes']}
                             no={header[this.state.lang]['logout_no']}
                             name={this.state.name}
                             onClose={this.onResult}/>
            </div>
        )
    };
}
