import React from 'react';

import SMHeader from "./SMHeader";
import SMSection from "./SMSection";
import SMAlbum from "./SMAlbum";
import SMFooter from "./SMFooter";

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
