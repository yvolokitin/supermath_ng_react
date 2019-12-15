﻿import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import SMHeader from "./components/header/header";
import SMBody from "./components/body/body";
import SMFooter from "./components/footer/footer";

/*
    SuperMath Page Layout Elements
    <SMMainPage>
        <SMHeader> - defines a header for a document with container for navigation links:
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
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <SMHeader />
                <SMBody />
                <SMFooter text={"SuperMath.RU"}/>
            </React.Fragment>
        );}
}
