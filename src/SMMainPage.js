import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import SMHeader from "./SMHeader";
import SMSection from "./SMSection";
import SMAlbum from "./SMAlbum";
import SMFooter from "./SMFooter";

/*
    SuperMath Page Layout Elements
    <SMMainPage>
        <SMHeader> - defines a header for a document with container for navigation links
            - Home
            - Information
            - Help
            - Login (Login button name can be changed via parameter in SMHeader.props)
            TBD: language selector, login selector (Profile, Logout etc.)

        <SMSection> - defines an independent self-contained article with SuperMath Logo
            text is passed as argument

        <SMAlbum> - defines a main section with playing cards in page

        <SMFooter> - defines a footer with Copyright
            test is passed as argument
*/
export default function SMMainPage() {
  return (
    <React.Fragment>
      <CssBaseline />
      <SMHeader login={"Login"}/>
      <SMSection text={"SuperMath helps kids master basic math facts"}/>
      <SMAlbum />
      <SMFooter text={"SuperMath.RU"}/>
    </React.Fragment>
  );
}
