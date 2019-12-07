import React from 'react';
import {Dialog} from '@material-ui/core';

import {generate_rnd_task} from "./../halpers/functions";

import SMKeyBoard from "./../keyboard/keyboard";
import SMCircles from "./circles";

import './simplegame.css';

export default class SMSimpleGame extends React.Component {
    constructor(props) {
        super(props);
        this.onDigit = this.onDigit.bind(this);
        this.onOperator = this.onOperator.bind(this);

        generate_rnd_task('+', '0,9');
        // console.log(task);
    }

    onDigit({ target }) {
        // const digit = target.innerText;
    }

    onOperator({ target }) {
        // const operator = target.innerText;
    }

    /*
            <Dialog onClose={() => this.props.onClick()} fullScreen={true} open={this.props.open}>

        https://about.phamvanlam.com/calculator/
    */
    render() {
        return (
            <Dialog onClose={() => this.props.onClick()} fullScreen={true} open={true}>
                <div className="wrapper">
                    <div className="header_div">
                        <div className="header_div_left">SUPERMATH</div>
                        <div className="header_div_right">smile</div>
                    </div>

                    <div className="body_div">
                        <div className="body_div_left">
                            <div className="gameboard">
                                <div className="gameplay">
                                    <div className="mo_task">2</div>
                                    <div className="mo_task">+ 2</div>
                                    <div className="black_line"> </div>
                                    <div className="mo_task">4</div>
                                </div>

                                <div className="gamehalper">
                                </div>
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
