import React from 'react';
import {Dialog} from '@material-ui/core';

import GameHeader from "./digitgameheader";
import GameFooter from "./digitgamefooter";

import GameBoard from "./gameboard";
import GameResults from "./gameresults";

/*
      <DigitGame open={this.state.gameOpen}
                 type={this.state.gameType}
                 task={this.state.gameTerm}
                 count={this.state.gameAmnt}
                 onClick={this.onGameClose}/>
*/
export default class DigitGame extends React.Component {
    constructor(props) {
        super(props);

        this.onGameClose = this.onGameClose.bind(this);
        this.onResultsClose = this.onResultsClose.bind(this);
        this.onCounterUpdate = this.onCounterUpdate.bind(this);

        this.state = {showResults: false,
                      circle: 'white',
                      counter: 0,
                      passed: 0,
                      failed: 0};

        console.log("constructor:: this.state " + this.state.lineGame);

        // array to save all user tasks
        this.tasks =[];
    }

    componentDidUpdate(prevProps) {
        console.log("DigitGameWrapper.componentDidUpdate");
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.task !== prevProps.task) {
            if (this.props.open === true) {
                this.setState({lineGame: this.props.type.includes('line') ? true: false,
                               twoGame: this.props.type.includes('two') ? true: false,
                               threeGame: this.props.type.includes('three') ? true: false,
                               compGame: this.props.type.includes('comp') ? true: false,
                               operGame: this.props.type.includes('oper') ? true: false,
                               showResults: this.props.type.includes('result') ? true: false,
                               circle: 'white',
                               counter: 0,
                               passed: 0,
                               failed: 0});
            }
        }
    }

    onResultsClose(status) {
        console.log("onResultsClose:: status " + status);
        this.tasks = [];

        if (status === 'close') {
            this.props.onClick("finished");
        }
        // hide results, set counter 0 and clear history
        // this.set_task();
    }

    onGameClose() {
        console.log("Game has been Interrapted !!!");
        this.props.onClick("interrapted");
        this.tasks = [];
        this.set_task();
    }

    /*
     * if counter === 0 -> user answered right from first time -> passed
     * if counter > 0 -> user could not properly answer from first time -> failed
    */
    onCounterUpdate(counter, task) {
        if (counter === 0) {
            this.setState({passed: this.state.passed++});
        } else {
            this.setState({failed: this.state.failed++});
        }

    }

    onColorUpdate(color) {
        this.setState({circle: color});
    }

/*
*/
    render() {
        /*
            GameHeader: height: 10%  width: 100%
            Body <div>: height: 80%  width: 100%
            GameFooter: height: 10%  width: 100%
        */
        return (
            <Dialog fullScreen={true} onKeyDown={this.onKeyboard} open={this.props.open}>
                <GameHeader onClick={this.onGameClose} width='49%' counter={this.state.counter} passed={this.state.passed} failed={this.state.failed}/>

                <div style={{height:'100%',width:'100%',border:'1px solid red'}}>
                    { this.state.showResults ? (
                            <GameResults open={this.state.show_results} user_results={this.state.user_results}
                                         passed={this.state.passed} failed={this.state.failed} counter={this.state.counter}
                                         onClick={this.onResultsClose} onCounter={this.onCounterUpdate} onColor={this.onColorUpdate}/>
                        ) : (
                            <GameBoard />
                        )
                    }
                </div>

                { this.state.showResults ? (null) : (<GameFooter color={this.state.circle}/>) }
            </Dialog>
        );
    }
}
