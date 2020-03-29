import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from "./components/header/header";
import SMBody from "./components/body/body";
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

        <SMBody> - defines a main section with:
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

        this.state = {userUpdate: false, userLng: language};
        this.onUpdate = this.onUpdate.bind(this);

        // console.log('SuperMathPage.constructor language ' + language);
    }

    onUpdate(language) {
        if ((language !== undefined) && (language !== null)) {
            // console.log('SuperMathPage.onUpdate language: ' + language);
            this.setState({userLng: language});
            localStorage.setItem('lang', language);
        }
    }

    // (e) => this.onInfoOpen(game.id, game.desc, game.logo, game.task)
    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Header onUpdate={(event) => this.onUpdate(event)} info={this.state.userUpdate} lang={this.state.userLng}/>
                <SMBody onUpdate={() => this.setState({userUpdate: true})} lang={this.state.userLng}/>
                <SMFooter text={"SuperMath"} lang={this.state.userLng}/>
            </React.Fragment>
        );
    }
}
