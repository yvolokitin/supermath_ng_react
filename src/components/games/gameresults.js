import React from 'react';
import {Dialog} from '@material-ui/core';

import './twodigitgame.css';
import SMRadialChart from "./../charts/smradialchart";

/*

*/
export default class GameResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {test_state: '',
                      temp_state: ''};
    }

    render() {
        return (
            <Dialog onClose={() => this.props.onClick("onClose")} open={this.props.open}>
                <div className="wrapper">
                    <div className="header_div">
                        <div className="header_div_left" onClick={() => this.props.onClick("interrapted")}>
                            SUPERMATH
                        </div>
                    </div>

                    <div className="body_div">
                        <SMRadialChart progress={70} color="#3c71d0"/>
                    </div>

                    <div className="footer_div">
                        Footrer
                    </div>
                </div>
            </Dialog>
        );
    }
}
