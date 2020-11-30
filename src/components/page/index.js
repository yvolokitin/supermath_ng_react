import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import CssBaseline from '@material-ui/core/CssBaseline';

import axios from 'axios';

import {update_counter, update_user_scores, update_language} from './../halpers/communicator';
import {update_avatar, update_usersettings } from './../halpers/communicator';
import {get_belt_color} from './../halpers/functions';

import Alert from '@material-ui/lab/Alert';

import About from './../header/about';
import Login from './../header/login';
import Forget from './../header/forget';
import Registration from './../header/registration';
import Language from './../header/language';
import Welcome from './../header/welcome';

import Trophy from './../trophy/trophy';

import Help from './../help/help';
import Account from './../userinfo/account';

import {avatars} from './../halpers/avatars';
import Body from "./../body/body";

import {FULL_SCREEN} from './../halpers/functions';

import {get_lang, set_lang} from './../halpers/localstorage';
import {set_item, get_item/*, remove_item*/} from './../halpers/localstorage';
import {get_active_user, set_active_user} from './../halpers/localstorage';

import './index.css';

import {header} from './../translations/header';

const STATUS = {
    NONE: 0,
    TROPHY: 1,
    ABOUT: 2,
    HELP: 3,
    LOGIN: 4,
    LOGOUT: 5,
    REGISTER: 6,
    WELCOME: 7,
    ACCOUNT: 8,
    FORGET: 9,
    LANG: 10,
}

export default class SuperMathPage extends React.Component {
    constructor(props) {
        super(props);

        this.onApiUpdate = this.onApiUpdate.bind(this);
        this.onApiUpdateError = this.onApiUpdateError.bind(this);

        this.onError = this.onError.bind(this);

        this.onForget = this.onForget.bind(this);
        this.onResult = this.onResult.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onWelcome = this.onWelcome.bind(this);
        this.onUserInfo = this.onUserInfo.bind(this);
        this.onLanguage = this.onLanguage.bind(this);

        this.onWidthChange = this.onWidthChange.bind(this);
        this.loadFbLoginApi = this.loadFbLoginApi.bind(this);
        this.onTrophyUpdate = this.onTrophyUpdate.bind(this);

        this.updateUserScores = this.updateUserScores.bind(this);

        var active_user = get_active_user();
        this.state = {
            width: window.innerWidth,
            screen: STATUS.NONE,

            // error from backend
            error: '',

            // get active user id and language
            id: active_user,
            lang: get_lang(active_user),

            // user level is user color belt actually, which can be following:
            // none, white, orange, green, blue, brown or black
            // none - means user did not take any test to proof any level
            level: get_item(active_user, 'level'),

            // current user information
            email: get_item(active_user, 'email'),
            name: get_item(active_user, 'name'),
            surname: get_item(active_user, 'surname'),
            cards: get_item(active_user, 'cards'),
            passed: get_item(active_user, 'passed'),
            failed: get_item(active_user, 'failed'),
            color: get_belt_color(get_item(active_user, 'level')),
            belt: get_item(active_user, 'belt'),
            avatar: get_item(active_user, 'avatar'),
            birthday: get_item(active_user, 'birthday'),
            age: get_item(active_user, 'age'),
            solved: get_item(active_user, 'solved'),
            pswdhash: get_item(active_user, 'pswdhash'),

            // refferal name and lastname to show on welcome screen
            refferal: '0000000',

            // data structure for tasks: {'task_1': 'counter_1', ... 'task_9': 'counter_9'}
            // counter_N is current task progress counter per current task level (task_L)
            tasks_progress: get_item(active_user, 'tasks_progress'),

            // data structure for tasks: {'task_1': '2,6,9,', ... 'task_9': '1,2,3,4'}
            tasks_failed: get_item(active_user, 'tasks_failed'),
        };
    }

    /**
     * The method FB.getLoginStatus can no longer be called from http pages.
     * https://developers.facebook.com/blog/post/2018/06/08/enforce-https-facebook-login/
     */
    loadFbLoginApi() {
        // facebook api
        window.fbAsyncInit = function() {
            window.FB.init({appId: '245721866654291',
                cookie: true,
                xfbml: true,
                version:'v7.0'
            });
            window.FB.AppEvents.logPageView();

            window.FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    console.log('FB.getLoginStatus ' + response.authResponse.accessToken);
                } else {
                    console.log('FB.getLoginStatus ' + response);
                    console.log('FB.getLoginStatus ' + response.status);
                }
            });
        };

        // Load the required FB SDK asynchronously
        (function(d, s, id) {
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement(s); js.id = id;
             js.src = "https://connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
        } (document, 'script', 'facebook-jssdk'));
    }

    componentDidMount() {
        // console.log('Page.Header -> this.state.belt ' + this.state.belt + ', get_item ' + get_item(0, 'belt'));
        if ((this.state.id > 0) && (this.state.pswdhash.length > 0)) {
            console.log('Page.Header -> refreshing ' + this.state.belt);
            var post_data = {
                'user_id': this.state.id,
                'pswdhash': this.state.pswdhash,
                'refresh': false};
            axios.post('https://supermath.xyz:3000/api/refresh', post_data)
                 .then(this.onApiUpdate)
                 .catch(this.onApiUpdateError);
        }

        window.addEventListener('resize', this.onWidthChange);
        // this.loadFbLoginApi();
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

    onError(message) {
        this.setState({error: message});
    }

    onTrophyUpdate(user_id, pswdhash) {
        if ((this.state.id > 0) && (this.state.pswdhash.length > 0)) {
            // console.log('onTrophyUpdate. refreshing ' + this.state.id + ', pswdhash: ' + this.state.pswdhash);
            var post_data = {
                'user_id': this.state.id,
                'pswdhash': this.state.pswdhash,
                'refresh': false};
            axios.post('https://supermath.xyz:3000/api/refresh', post_data)
                 .then(this.onApiUpdate)
                 .catch(this.onApiUpdateError);
        }
    }

    onRefresh(event) {
        event.preventDefault();

        console.log('Header.onRefresh ' + this.state.id + ', pswdhash: ' + this.state.pswdhash);
        if ((this.state.id > 0) && (this.state.pswdhash !== '')) {
            var post_data = {
                'user_id': this.state.id,
                'pswdhash': this.state.pswdhash,
                'refresh': true,
            };
            axios.post('https://supermath.xyz:3000/api/refresh', post_data)
                 .then(this.onApiUpdate)
                 .catch(this.onApiUpdateError);

        } else { // else user is logouted -> page reload
            window.location.reload();
        }
    }

    onWelcome(property) {
        if (property === 'userinfo') {
            this.setState({screen: STATUS.ACCOUNT});

        } else if (property === 'about') {
            this.setState({screen: STATUS.ABOUT});

        } else if (property === 'help') {
            this.setState({screen: STATUS.HELP});

        } else if (property === 'language') {
            this.setState({screen: STATUS.LANG});

        } else {
            this.setState({screen: STATUS.NONE});
        }
    }

    onForget(property) {
        if (property === 'login') {
            this.setState({screen: STATUS.LOGIN});
        } else {
            this.setState({screen: STATUS.NONE});
        }
    }

    updateUserScores(data) {
        if ((this.state.id > 0) && (this.state.pswdhash.length > 0)) {
            var new_passed = parseInt(this.state.passed);
            var new_failed = parseInt(this.state.failed);
            var new_cards = parseInt(this.state.cards);
            var new_solved = this.state.solved;
            var new_level = this.state.level;

            if (data.failed === 0 && data.passed > 0) {
                // T === test / exam for belt
                if (data.game_uid.indexOf('task_') > -1) {
                    console.log('***********************************');
                    console.table(data);

                } else if (data.game_uid.indexOf('T') > -1) {
                    new_passed = new_passed + parseInt(data.passed);
                    // we have to unlock all locked programs
                    var levels = this.state.solved.split(',');
                    switch (data.game_uid) {
                        case 'blackT':
                            // black test for belt always gets a card and unlock all programms
                            new_cards = new_cards + 1; new_level = 'black';
                            new_solved = ''; // unlock all programms
                            break;
                        case 'brownT':
                            if (new_level !== 'black' && new_level !== 'brown') {
                                new_cards = new_cards + 1; new_level = 'brown';
                            }
                            new_solved = '';
                            break;
                        case 'navyT':
                            if (new_level !== 'black' && new_level !== 'brown' && new_level !== 'navy') {
                                new_cards = new_cards + 1; new_level = 'navy';
                                new_solved = ''; // solved will be updated below
                                for (var nl = 0; nl < levels.length; nl++) {
                                    if (levels[nl].includes('brown')) {
                                        new_solved = new_solved + levels[nl] + ',';
                                    }
                                }
                            }
                            break;
                        case 'greenT':
                            if (new_level !== 'black' && new_level !== 'brown' && new_level !== 'navy' && new_level !== 'green') {
                                new_cards = new_cards + 1; new_level = 'green';
                                new_solved = ''; // solved will be updated below
                                for (var gl = 0; gl < levels.length; gl++) {
                                    if (levels[gl].includes('brown') || levels[gl].includes('navy')) {
                                        new_solved = new_solved + levels[gl] + ',';
                                    }
                                }
                            }
                            break;
                        case 'orangeT':
                            if (new_level !== 'black' && new_level !== 'brown' &&
                                new_level !== 'navy' && new_level !== 'green' &&
                                new_level !== 'orange') {
                                    new_cards = new_cards + 1; new_level = 'orange';
                                    new_solved = ''; // solved will be updated below
                                    for (var ol = 0; ol < levels.length; ol++) {
                                        if (levels[ol].includes('brown') || levels[ol].includes('navy') || levels[ol].includes('green')) {
                                            new_solved = new_solved + levels[ol] + ',';
                                        }
                                    }
                            }
                            break;
                        default: // whiteT
                            if (new_level !== 'black' && new_level !== 'brown' &&
                                new_level !== 'navy' && new_level !== 'green' &&
                                new_level !== 'orange') {
                                    new_cards = new_cards + 1; new_level = 'white';
                                    new_solved = ''; // solved will be updated below
                                    for (var wd = 0; wd < levels.length; wd++) {
                                        if (levels[wd].length > 2) { // , has length === 1
                                            if (levels[wd].includes('white') === false) {
                                                new_solved = new_solved + levels[wd] + ',';
                                            }
                                        }
                                    }
                            }
                            break;
                    }

                    this.setState({
                        color: get_belt_color(new_level),
                        passed: new_passed,
                        solved: new_solved,
                        level: new_level,
                        cards: new_cards,
                    });

                } else {
                    switch (this.state.level) {
                        case 'black':
                        case 'brown':
                            if (data.game_uid.includes('black')) {
                                new_passed = new_passed + parseInt(data.passed);
                                new_cards = new_cards + 1;
                            }
                            break;
                        case 'navy':
                            if (data.game_uid.includes('black') ||
                                data.game_uid.includes('brown')) {
                                    new_passed = new_passed + parseInt(data.passed);
                                    new_solved = new_solved + data.game_uid + ',';
                                    new_cards = new_cards + 1;
                            }
                            break;
                        case 'green':
                            if (data.game_uid.includes('black') ||
                                data.game_uid.includes('brown') ||
                                data.game_uid.includes('navy')) {
                                    new_passed = new_passed + parseInt(data.passed);
                                    new_solved = new_solved + data.game_uid + ',';
                                    new_cards = new_cards + 1;
                            }
                            break;
                        case 'orange':
                            if (data.game_uid.includes('black') ||
                                data.game_uid.includes('brown') ||
                                data.game_uid.includes('navy') ||
                                data.game_uid.includes('green')) {
                                    new_passed = new_passed + parseInt(data.passed);
                                    new_solved = new_solved + data.game_uid + ',';
                                    new_cards = new_cards + 1;
                            }
                            break;
                        case 'white':
                            if (data.game_uid.includes('white') === false) {
                                new_passed = new_passed + parseInt(data.passed);
                                new_solved = new_solved + data.game_uid + ',';
                                new_cards = new_cards + 1;
                            }
                            break;
                        default: // level is none
                            new_passed = new_passed + parseInt(data.passed);
                            new_solved = new_solved + data.game_uid + ',';
                            new_cards = new_cards + 1;
                            break;
                        }

                        this.setState({
                            passed: new_passed,
                            solved: new_solved,
                            cards: new_cards,
                        });
                    }
            }
        } else {
            new_passed = new_passed + parseInt(data.passed);
            new_failed = new_failed + parseInt(data.failed);
            this.setState({
                passed: new_passed,
                failed: new_failed,
            });
        }

        update_counter(this.state.id, this.state.pswdhash, data, new_passed, new_failed);
    }

    /**
     * Update on User Property
     */
    onUserInfo(property, value, asset='n/a') {
        // console.log('Header.onUserInfo ' + property + ': ' + value + ', ' + asset);
        switch (property) {
            case 'close':
                this.setState({screen: STATUS.NONE});
                break;

            case 'logout':
                this.setState({screen: STATUS.NONE, id: 0, solved: '', refferal: '0000000',});
                // remove_item('user_id');
                set_active_user(0);
                break;

            case 'hashlogin':
                set_active_user(value);
                // value is user.id
                this.setState({
                    screen: STATUS.NONE,
                    id: value,
                    email: get_item(value, 'email'),
                    name: get_item(value, 'name'),
                    surname: get_item(value, 'surname'),
                    passed: get_item(value, 'passed'),
                    failed: get_item(value, 'failed'),
                    level: get_item(value, 'level'),
                    color: get_belt_color(get_item(value, 'level')),
                    cards: get_item(value, 'cards'),
                    belt: get_item(value, 'belt'),
                    avatar: get_item(value, 'avatar'),
                    birthday: get_item(value, 'birthday'),
                    age: get_item(value, 'age'),
                    solved: get_item(value, 'solved'),
                    pswdhash: get_item(value, 'pswdhash'),
                    lang: get_item(value, 'lang'),
                });
                var post = {
                    'user_id': value,
                    'pswdhash': get_item(value, 'pswdhash'),
                    'refresh': false,
                };
                axios.post('https://supermath.xyz:3000/api/refresh', post)
                     .then(this.onApiUpdate)
                     .catch(this.onApiUpdateError);

                break;

            // counter: user game results from task completion
            case 'counter':
                this.updateUserScores(value);
                break;

            // from Account - Avatar Tab
            case 'avatar':
                this.setState({avatar: value, screen: STATUS.NONE});
                if ((this.state.id > 0) && (this.state.pswdhash !== null)) {
                    update_avatar(this.state.id, this.state.pswdhash, value);
                }
                break;

            // if unregistered user pressed register button from game results OR <Body ...>
            case 'register':
                this.setState({screen: STATUS.REGISTER,
                    refferal: value});
                break;

            // update from Account - Settgins Tab
            case 'name':
                this.setState({'name': value});
                if ((this.state.id > 0) && (this.state.pswdhash !== null)) {
                    update_usersettings(this.state.id, this.state.pswdhash, property, value);
                }
                break;

            case 'surname':
                this.setState({'surname': value});
                if ((this.state.id > 0) && (this.state.pswdhash !== null)) {
                    update_usersettings(this.state.id, this.state.pswdhash, property, value);
                }
                break;

            case 'email':
                this.setState({'email': value});
                if ((this.state.id > 0) && (this.state.pswdhash !== null)) {
                    update_usersettings(this.state.id, this.state.pswdhash, property, value);
                }
                break;

            case 'birthday':
                // age calculation based on server response value
                // 'birthday': 'Tue, 28 Jan 2014 06:13:13 GMT' -> need to convert in years
                var ageDifMs = Date.now() - new Date(value).getTime();
                var ageDate = new Date(ageDifMs);
                var age = Math.abs(ageDate.getUTCFullYear() - 1970);
                this.setState({'birthday': value, 'age': age});
                if ((this.state.id > 0) && (this.state.pswdhash !== null)) {
                    update_usersettings(this.state.id, this.state.pswdhash, property, value);
                }
                break;

            case 'pswdhash':
                console.log('TBD: Excaping pswdhash');
                break;

            // passfail: user exchange poops vs smiles
            case 'exchange':
                console.log('TBD: Excaping EXCHANGE ' + value.passed + ', ' + value.failed + ', ' + value.cards);
                if ((this.state.id > 0) && (this.state.pswdhash !== null)) {
                    this.setState({
                        'passed': value.passed,
                        'failed': value.failed,
                        'cards': value.cards,
                    });

                    update_user_scores(this.state.id, this.state.pswdhash, this.state.belt, value);
                }
                break;

            // <Body ... onUpdate={this.onUserInfo}/>
            case 'about':
                this.setState({screen: STATUS.ABOUT});
                break;

            // <Body ... onUpdate={this.onUserInfo}/>
            case 'help':
                this.setState({screen: STATUS.HELP});
                break;

            default:
                console.log('WARNING: Header.onUserInfo received unknown property \'' + property + '\'');
                break;
        }
    }

    onLanguage(status, language) {
        console.log('Header.onLanguage ' + status + ', language ' + language + ', this.state.lang ' + this.state.lang);
        // status can be only: STATUS.NONE, STATUS.NONE
        if (this.state.lang !== language) {
            this.setState({screen: status, lang: language});
            set_lang(this.state.id, language);
            if (this.state.id > 0) {
                update_language(this.state.id, this.state.pswdhash, language);
            }
        } else {
            this.setState({screen: status});
        }
    }

    /**
     * onResult shown autorization status
     * 
     * @param {String} result successed or switch to other screens
     * @param {Object} data user data (id, name, email etc.)
     */
    onResult(result, data) {
        if (result === 'successed') {
            console.log('Header.onResult ' + data.passed + ', ' + data.failed + ', level: ' + data.level);

            // to show all received user data
            // for (var pname in data) { console.log(pname, data[pname]); }

            // age calculation based on server response value
            // 'birthday': 'Tue, 28 Jan 2014 06:13:13 GMT' -> need to convert in years
            var birthday = new Date(data.birthday);
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs);
            var age = Math.abs(ageDate.getUTCFullYear() - 1970);

            var current_screen = this.state.screen;
            if (current_screen === STATUS.REGISTER) {
                current_screen = STATUS.WELCOME;

            } else if (current_screen === STATUS.TROPHY) {
                current_screen = STATUS.TROPHY;

            } else {
                current_screen = STATUS.NONE;
            }

            this.setState({
                'screen': current_screen,
                'avatar': (data.avatar.length > 0) ? data.avatar : avatars[12]['name'],
                'pswdhash': get_item(data.id, 'pswdhash'),
                'color': get_belt_color(data.level),
                'id': parseInt(data.id),
                'name': data.name,
                'lang': data.lang,
                'email': data.email,
                'surname': data.surname,
                'birthday': data.birthday,
                'cards': data.cards,
                'passed': data.passed,
                'failed': data.failed,
                'level': data.level,
                'belt': data.belt,
                'solved': data.solved,
                'age': age,
                'refferal': data.refferal,
            });

            set_active_user(data.id);
            // use HTML5 Local Storage if browser supports it
            set_item(data.id, 'name', data.name);
            set_item(data.id, 'email', data.email);
            set_item(data.id, 'surname', data.surname);
            set_item(data.id, 'birthday', data.birthday);
            set_item(data.id, 'avatar', data.avatar);
            set_item(data.id, 'passed', data.passed);
            set_item(data.id, 'failed', data.failed);
            set_item(data.id, 'level', data.level);
            set_item(data.id, 'cards', data.cards);
            set_item(data.id, 'lang', data.lang);
            set_item(data.id, 'belt', data.belt);
            set_item(data.id, 'solved', data.solved);
            set_item(data.id, 'age', age);

        } else if (result === 'register') {
            this.setState({screen: STATUS.REGISTER});

        } else if (result === 'login') {
            this.setState({screen: STATUS.LOGIN});

        } else if (result === 'forget') {
            this.setState({screen: STATUS.FORGET});

        } else {
            this.setState({screen: STATUS.NONE});
        }
    }

    onApiUpdate(response) {
        // console.log('Header.onApiUpdate ' + response.data[1].name);
        if ('data' in response) {
            if ('error' in response.data) {
                console.log('ERROR Header.onApiUpdate received ' + response.data.error);

            } else if (('id' in response.data) && ('name' in response.data) &&
                ('lang' in response.data) && ('birthday' in response.data) &&
                ('surname' in response.data) && ('email' in response.data) &&
                ('passed' in response.data) && ('failed' in response.data) &&
                ('cards' in response.data) && ('creation' in response.data) &&
                ('solved' in response.data) && ('subscr' in response.data) &&
                ('avatar' in response.data) && ('belt' in response.data)) {

                    console.log('Header.onApiUpdate: successed, ' + response.data.id);
                    console.table(response.data);
                    this.onResult('successed', response.data);

                    // refreshing page if received from server (usually, it forced by user)
                    if ('refresh' in response.data) {
                        console.log('Refresh called: window.location.reload()');
                        window.location.reload();
                    }

            } else {
                console.log('ERROR: Header.onApiUpdate no error and id in data message from server');
            }
        } else {
            console.log('ERROR: Header.onApiUpdate some data is missed in server response');
        }
    }

    onApiUpdateError(error) {
        console.log('Header.onApiUpdateError -> error ' + error);
        this.onError('Server returned ' + error);

        // refreshing page
        // window.location.reload();
    }

    /*
        <font onClick={() => this.setState({screen: STATUS.LOGOUT})} className='div_login'>{header[this.state.lang]['logout']}</font>
    */
    render() {
        return (
            <React.Fragment>
                <CssBaseline/>

                <div className='header_div'>
                    <div className='header_div_left'>
                        <div className='div_supermath_long' onClick={this.onRefresh}> SuperMath </div>
                        <div className='div_supermath_short' onClick={this.onRefresh} > sm </div>
                        <div className='div_about' onClick={() => this.setState({screen: STATUS.ABOUT})}>
                            {header[this.state.lang]['about']}
                        </div>
                        <div className='div_help' onClick={() => this.setState({screen: STATUS.HELP})}>
                            {header[this.state.lang]['help']}
                        </div>

                        <div className='div_trophy' onClick={() => this.setState({screen: STATUS.TROPHY})}>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127942;</span>
                        </div>
                    </div>

                    { (this.state.id > 0) ? (
                        <div className='header_div_right'>
                            <font className='font_userinfo' onClick={() => this.setState({screen: STATUS.ACCOUNT})} style={{color: this.state.color}}>
                                {this.state.name}:
                            </font>
                            <font onClick={() => this.setState({screen: STATUS.ACCOUNT})} className='font_userinfo' style={{color:'green'}}>
                                {this.state.passed} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                            </font> 
                            <font onClick={() => this.setState({screen: STATUS.ACCOUNT})} className='font_userinfo' style={{color:'red'}}>
                                {this.state.failed} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                            </font> 
                            <font onClick={() => this.setState({screen: STATUS.ACCOUNT})} className='font_userinfo' style={{color:'green'}}>
                                {this.state.cards} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127183;</span>
                            </font> 

                            <div className='div_lang' onClick={() => this.setState({screen: STATUS.LANG})}> {header[this.state.lang]['lang']} </div>
                        </div>
                    ) : (
                        <div className='header_div_right'>
                            <div className='div_register' onClick={() => this.setState({screen: STATUS.REGISTER})}>
                                {header[this.state.lang]['register']}
                            </div>
                            <div className='div_login' onClick={() => this.setState({screen: STATUS.LOGIN})}>
                                {header[this.state.lang]['login']}
                            </div>
                            <div className='div_lang' onClick={() => this.setState({screen: STATUS.LANG})}> {header[this.state.lang]['lang']} </div>
                        </div>
                    )}
                </div>

                <Body id={this.state.id}
                    belt={this.state.belt}
                    lang={this.state.lang}
                    name={this.state.name}
                    email={this.state.email}
                    level={this.state.level}
                    solved={this.state.solved}
                    width={this.state.width}
                    tasks_failed={this.state.tasks_failed}
                    tasks_progress={this.state.tasks_progress}
                    onUpdate={this.onUserInfo}/>

                <Trophy open={this.state.screen === STATUS.TROPHY}
                    onClose={() => this.setState({screen: STATUS.NONE})}
                    onTrophyUpdate={this.onTrophyUpdate}
                    fullScreen={this.state.width<FULL_SCREEN}
                    pswdhash={this.state.pswdhash}
                    failed={this.state.failed}
                    passed={this.state.passed}
                    cards={this.state.cards}
                    name={this.state.name}
                    lang={this.state.lang}
                    id={this.state.id}/>

                <Help open={this.state.screen === STATUS.HELP}
                    onClose={() => this.setState({screen: STATUS.NONE})}
                    fullScreen={this.state.width<FULL_SCREEN}
                    id={this.state.id} lang={this.state.lang}/>

                <About open={this.state.screen === STATUS.ABOUT}
                    onClose={() => this.setState({screen: STATUS.NONE})}
                    title={header[this.state.lang]['about']}
                    fullScreen={this.state.width<FULL_SCREEN}
                    lang={this.state.lang}/>

                <Login open={this.state.screen === STATUS.LOGIN}
                    title={header[this.state.lang]['login']}
                    fullScreen={this.state.width<FULL_SCREEN}
                    onClose={this.onResult}
                    lang={this.state.lang}/>

                <Forget open={this.state.screen === STATUS.FORGET}
                    fullScreen={this.state.width<FULL_SCREEN}
                    onClose={this.onForget}
                    lang={this.state.lang}/>

                <Account open={this.state.screen === STATUS.ACCOUNT}
                    onUpdate={this.onUserInfo} width={this.state.width}
                    id={this.state.id} email={this.state.email}
                    name={this.state.name} surname={this.state.surname}
                    age={this.state.age} birthday={this.state.birthday} 
                    avatar={this.state.avatar} cards={this.state.cards}
                    passed={this.state.passed} failed={this.state.failed}
                    pswdhash={this.state.pswdhash} lang={this.state.lang}
                    belt_color={this.state.color} level={this.state.level}/>

                <Registration open={this.state.screen === STATUS.REGISTER}
                    title={header[this.state.lang]['register']}
                    fullScreen={this.state.width<FULL_SCREEN}
                    refferal={this.state.refferal}
                    passed={this.props.passed}
                    failed={this.props.failed}
                    onClose={this.onResult}
                    lang={this.state.lang}/>

                <Language open={this.state.screen === STATUS.LANG}
                    fullScreen={this.state.width<FULL_SCREEN}
                    onUpdate={this.onLanguage}
                    width={this.state.width}
                    lang={this.state.lang}/>

                <Welcome open={this.state.screen === STATUS.WELCOME}
                    fullScreen={this.state.width<FULL_SCREEN}
                    refferal={this.state.refferal}
                    surname={this.state.surname}
                    passed={this.state.passed}
                    failed={this.state.failed}
                    onClose={this.onWelcome}
                    lang={this.state.lang}
                    name={this.state.name}/>

                <Snackbar open={this.state.error.length !== 0} onClose={() => this.onError('')} autoHideDuration={25000} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
                    <Alert onClose={() => this.onError('')} severity='error'>
                        {header[this.state.lang]['error']} {this.state.error}
                    </Alert>
                </Snackbar>

            </React.Fragment>
        )
    };
}
