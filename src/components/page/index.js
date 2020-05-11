import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import axios from 'axios';

import {update_counter, update_passfail, update_language,
        update_avatar, update_usersettings, } from './../halpers/communicator';

import Help from './../header/help';
import About from './../header/about';
import Login from './../header/login';
import Forget from './../header/forget';
import Registration from './../header/registration';
import Language from './../header/language';
import Welcome from './../header/welcome';

import UserInformation from './../userinfo/userinfo';
import AlertDialog from './../alert/alert';

import Tabs from "./../body/tabs";

import './index.css';

import {header} from './../translations/header';

export default class SuperMathPage extends React.Component {
    constructor(props) {
        super(props);

        // language detector
        const getNavigatorLanguage = () => (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
        var language = localStorage.getItem('lang');
        if (language === null) {
            language = getNavigatorLanguage();
            if (language.includes('ru')) { language = 'ru'; }
            else if (language.includes('nl')) { language = 'nl'; }
            else if (language.includes('de')) { language = 'de'; }
            else if (language.includes('es')) { language = 'es'; }
            else if (language.includes('it')) { language = 'it'; }
            else if (language.includes('fr')) { language = 'fr'; }
            else { language = 'en'; }
        }

        this.onApiUpdate = this.onApiUpdate.bind(this);
        this.onApiUpdateError = this.onApiUpdateError.bind(this);

        this.onResult = this.onResult.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onWelcome = this.onWelcome.bind(this);
        this.onUserInfo = this.onUserInfo.bind(this);
        this.onLanguage = this.onLanguage.bind(this);

        this.onWidthChange = this.onWidthChange.bind(this);

        this.state = {width: window.innerWidth,
                      aboutOpen: false,
                      helpOpen: false,
                      loginOpen: false,
                      logoutOpen: false,
                      forgetOpen: false,
                      userInfoOpen: false,
                      langSelector: false,
                      welcomeOpen: false,
                      registerOpen: false,
                      // current user information
                      lang: language,
                      belt: localStorage.getItem('belt') ? localStorage.getItem('belt') : 'white',
                      pass: localStorage.getItem('pass') ? localStorage.getItem('pass') : '0',
                      fail: localStorage.getItem('fail') ? localStorage.getItem('fail') : '0',
                      id: localStorage.getItem('user_id') ? parseInt(localStorage.getItem('user_id')) : 0,
                      name: localStorage.getItem('name') ? localStorage.getItem('name') : '',
                      surname: localStorage.getItem('surname') ? localStorage.getItem('surname') : '',
                      avatar: localStorage.getItem('avatar') ? localStorage.getItem('avatar') : 'martin-berube',
                      email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
                      age: localStorage.getItem('age') ? localStorage.getItem('age') : '',
                     };
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWidthChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWidthChange);
    }

    componentDidUpdate(prevProps) {
        // console.log('Header.componentDidUpdate');
    }

    onWidthChange() {
        // console.log('window.innerWidth ' + window.innerWidth);
        this.setState({width: window.innerWidth});
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
        console.log('Header.onUserInfo ' + property + ': ' + value + ', ' + asset);
        var pswdhash = localStorage.getItem('pswdhash');

        if (property === 'close') {
            this.setState({userInfoOpen: false});

        // counter: user game results from task
        } else if (property === 'counter') {
            if ((this.state.id > 0) && (pswdhash !== null)) {
                this.setState({pass: (parseInt(this.state.pass) + parseInt(value.passed)),
                               fail: (parseInt(this.state.fail) + parseInt(value.failed))});
                // updateCounter(id, pswdhash, data)
                update_counter(this.state.id, pswdhash, value);
            }

        // passfail: user exchange poops vs smiles
        } else if (property === 'passfail') {
            this.setState({pass: value, fail: asset});
            if ((this.state.id > 0) && (pswdhash !== null)) {
                // updatePassFail(id, pswdhash, belt, passed, failed)
                update_passfail(this.state.id, pswdhash, this.state.belt, value, asset);
            }

        } else if (property === 'avatar') {
            this.setState({avatar: value, userInfoOpen: false});
            if ((this.state.id > 0) && (pswdhash !== null)) {
                update_avatar(this.state.id, pswdhash, value);
            }

        } else {
            if (property === 'name') {
                this.setState({'name': value});
            } else if (property === 'surname') {
                this.setState({'surname': value});
            } else if (property === 'email') {
                this.setState({'email': value});
            } else if (property === 'pswd') {
                // for new pswd we have to generate new hash
                // pswd = request.json.get('pswd')
                // newhash = request.json.get('newhash')
                this.setState({'pswd': value});
            }

            if ((this.state.id > 0) && (pswdhash !== null)) {
                update_usersettings(this.state.id, pswdhash, property, value);
            }
        }
    }

    onLanguage(language) {
        this.setState({langSelector: false, lang: language});
        localStorage.setItem('lang', language);
        if (this.state.id > 0) {
            // update_language(id, language)
            update_language(this.state.id, language);
        }
    }

    onResult(result, user_id, name, language, email, age, surname, avatar, passed, failed, belt) {
        // console.log('Header.onResult ' + result + ', ' + user_id + ', ' + name +  ', ' + language + ', ' + email + ', ' + surname);
        if (result === 'successed') {
            console.log('Header.onResult ' + passed + ', ' + failed + ', age: ' + age + ', avatar: '  + avatar + ', belt: ' + belt);

            var welcomeScreen = false;
            if (this.state.registerOpen === true) {
                welcomeScreen = true;
            }

            this.setState({
                'id': parseInt(user_id),
                'name': name,
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
                 welcomeOpen: welcomeScreen
            });

            // use HTML5 Local Storage if browser supports it
            localStorage.setItem('user_id', user_id);
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('surname', surname);
            localStorage.setItem('age', age);
            localStorage.setItem('avatar', avatar);
            localStorage.setItem('pass', passed);
            localStorage.setItem('fail', failed);

        } else if (result === 'register') {
            this.setState({
                registerOpen: true,
                loginOpen: false,
            });

        } else if (result === 'login') {
            this.setState({
                loginOpen: true,
                registerOpen: false,
                forgetOpen: false
            });

        } else if (result === 'forget') {
            // console.log('Not implemented yet, just close');
            this.setState({
                forgetOpen: true,
                loginOpen: false
            });

        } else if (result === 'logout') {
            console.log("onLogout");
            this.setState({
                logoutOpen: false,
                id: 0,
            });

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

        } else {
            this.setState({
                loginOpen: false,
                forgetOpen: false,
                welcomeOpen: false,
                logoutOpen: false,
                registerOpen: false,
            });
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

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>

                <div className='header_div'>
                    <div className='header_div_left'>
                        <div className='div_supermath_long' onClick={this.onRefresh}> SuperMath </div>
                        <div className='div_supermath_short' onClick={this.onRefresh} > sm </div>
                        <div className='div_about' onClick={() => this.setState({aboutOpen: true})}> {header[this.state.lang]['about']} </div>
                        <div className='div_help' onClick={() => this.setState({helpOpen: true})}> {header[this.state.lang]['help']} </div>

                        { (this.state.id > 0) ? (
                            <div className='div_supermath_short' style={{color:'green'}} onClick={() => this.setState({logoutOpen:true})}>
                                {header[this.state.lang]['logout']}
                            </div>
                        ) : (
                            <div className='div_supermath_short' style={{color:'green'}} onClick={() => this.setState({loginOpen: true})}>
                                {header[this.state.lang]['login']}
                            </div>
                        )}

                        <div className='div_supermath_short' style={{color:'green'}} onClick={() => this.setState({langSelector:true})}>
                            {header[this.state.lang]['lang']}
                        </div>
                    </div>
                    <div className='header_div_right'>
                        { (this.state.id > 0) ? (
                            <>
                                <font onClick={() => this.setState({userInfoOpen: true})} className='font_userinfo'> {this.state.name} : </font>
                                <font onClick={() => this.setState({userInfoOpen: true})} className='font_userinfo' style={{color:'green'}}>
                                    {this.state.pass} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                                </font> 
                                <font onClick={() => this.setState({userInfoOpen: true})} className='font_userinfo_last' style={{color:'red'}}>
                                    {this.state.fail} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                                </font> 
                                <font onClick={() => this.setState({logoutOpen:true})} className='div_login'>{header[this.state.lang]['logout']}</font>
                            </>
                        ) : (
                            <>
                                <div className='div_register' onClick={() => this.setState({registerOpen: true})}>
                                    {header[this.state.lang]['register']}
                                </div>
                                <div className='div_login' onClick={() => this.setState({loginOpen: true})}>
                                    {header[this.state.lang]['login']}
                                </div>
                            </>
                        )}

                        <div className='div_lang' onClick={() => this.setState({langSelector:true})}> {header[this.state.lang]['lang']} </div>
                    </div>
                </div>

                <Tabs onUpdate={this.onUserInfo} id={this.state.id} fullScreen={this.state.width<581} lang={this.state.lang}/>

                <Help open={this.state.helpOpen} onClick={() => this.setState({helpOpen: false})}
                      fullScreen={this.state.width<581} lang={this.state.lang}/>
                <About open={this.state.aboutOpen} onClick={() => this.setState({aboutOpen: false})}
                       fullScreen={this.state.width<581} lang={this.state.lang}/>

                <Login open={this.state.loginOpen} onClose={this.onResult}
                       fullScreen={this.state.width<581} lang={this.state.lang}/>
                <Forget open={this.state.forgetOpen} onClose={() => this.setState({forgetOpen: false})}
                        fullScreen={this.state.width<581} lang={this.state.lang}/>

                <UserInformation open={this.state.userInfoOpen} onUpdate={this.onUserInfo}
                                 id={this.state.id} email={this.state.email}
                                 name={this.state.name} surname={this.state.surname}
                                 age={this.state.age} avatar={this.state.avatar}
                                 pass={this.state.pass} fail={this.state.fail}
                                 lang={this.state.lang}/>

                <Registration open={this.state.registerOpen}
                              onClose={this.onResult}
                              fullScreen={this.state.width<800}
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

            </React.Fragment>
        )
    };
}
