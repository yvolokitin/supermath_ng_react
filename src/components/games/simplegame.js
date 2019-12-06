import React from 'react';
import {Dialog, DialogTitle, DialogContent, Paper, Typography} from '@material-ui/core';

import SMKeyBoard from "./../keyboard/keyboard";
import SMCircles from "./circles";

import './simplegame.css';

export default class SMSimpleGame extends React.Component {
    constructor(props) {
        super(props);
        this.onDigit = this.onDigit.bind(this);
        this.onOperator = this.onOperator.bind(this);
    }

    onDigit({ target }) {
        const digit = target.innerText;
    }

    onOperator({ target }) {
        const operator = target.innerText;
    }

    /*
        https://about.phamvanlam.com/calculator/
    */
    render() {
        return (
            <Dialog onClose={() => this.props.onClick()} fullScreen={true} open={'true'}>
                <div className="wrapper">
                    <div className="header_div">
                        <div className="header_div_left">SUPERMATH</div>
                        <div className="header_div_right">smile</div>
                    </div>

                    <div className="body_div">
                        <div className="body_div_left">
                            <div className="gameplay">
                                TBD...2+2=4
                            </div>
                        </div>

                        <div className="body_div_right">
                            <SMKeyBoard onDigit={this.onDigit} onOperator={this.onOperator}/>
                        </div>
                    </div>

                    <div className="footer_div">
                        <SMCircles />
                    </div>
                </div>
            </Dialog>
        );
    }
}
