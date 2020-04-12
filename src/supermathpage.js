import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from "./components/header/header";
import Body from "./components/body/body";
import SMFooter from "./components/footer/footer";

/*
    SuperMath Page Layout Elements
    <SMMainPage>
        <Header> - defines a header for a document with container for navigation links:
                - Home
                - About
                - Help
                - Login (TBD, need to add Profile, Logout etc.)
                - Language selector

        <Body> - defines a main section with:
            - main SuperMath Logo exactly under navigation bar
            - playing cards/games on the page

        <SMFooter> - defines a footer with Copyright

        render() {
          return (
            <React.Fragment>
              <ChildA />
              <ChildB />
              <ChildC />
            </React.Fragment>
          );}
*/
export default class SuperMathPage extends React.Component {
    constructor(props) {
        super(props);

        this.onUpdate = this.onUpdate.bind(this);

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

        this.state = {'language': language,
                      'passed': localStorage.getItem('pass') ? localStorage.getItem('pass') : '0',
                      'failed': localStorage.getItem('fail') ? localStorage.getItem('fail') : '0',
                      'belt': localStorage.getItem('belt') ? localStorage.getItem('belt') : 'white',};

        console.log('SuperMathPage.constructor language ' + language + ', belt ' + localStorage.getItem('belt'));
    }

    // status, passed, failed
    // 'language', language, belt
    onUpdate(property, value, asset) {
        console.log('SuperMathPage.onUpdate ' + property + ': ' + value + ', ' + asset);

        if (property === 'language') {
            console.log('SuperMathPage LANG ' + value + ', BELT: ' + asset);
            this.setState({'language': value, 'belt': asset});
            localStorage.setItem('lang', value);
            localStorage.setItem('belt', asset);

        } else if (property === 'counter') {
            this.setState({'passed': value, 'failed': asset});
        }
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>

                <Header onUpdate={this.onUpdate}
                        lang={this.state.language}
                        passed={this.state.passed}
                        failed={this.state.failed}/>

                <Body onUpdate={this.onUpdate}
                      belt = {this.state.belt}
                      lang={this.state.language}/>

                <SMFooter text={"SuperMath"}
                          lang={this.state.language}/>

            </React.Fragment>
        );
    }
}
