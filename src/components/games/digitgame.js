import React from 'react';
import {Dialog} from '@material-ui/core';

import GameHeader from "./digitgameheader";
import GameFooter from "./digitgamefooter";

import LineGame from "./gametypes/linegame";
import TwoDigitGame from "./gametypes/twodigitgame";
import ThreeDigitGame from "./gametypes/threedigitgame";
import ComparisonGame from "./gametypes/comparisongame";
import OperationGame from "./gametypes/operationgame";

import GameResults from "./gameresults/gameresults";

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

        this.state = {lineGame: props.type.includes('line') ? true: false,
                      twoGame: props.type.includes('two') ? true: false,
                      threeGame: props.type.includes('three') ? true: false,
                      compGame: props.type.includes('comp') ? true: false,
                      operGame: props.type.includes('oper') ? true: false,
                      showResults: props.type.includes('result') ? true: false,
                      circle: 'white',
                      counter: 0,
                      passed: 0,
                      failed: 0};

        console.log("constructor:: this.state " + this.state.lineGame);

        // array to save all user tasks
        this.results =[];
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
        this.results = [];

        if (status === 'close') {
            this.props.onClick("finished");
        }

        // hide results, set counter 0 and clear history
        this.set_task();
    }

    onGameClose() {
        console.log("Game has been Interrapted !!!");
        this.props.onClick("interrapted");
        this.results = [];
        this.set_task();
    }

    render() {
        return (
            <Dialog fullScreen={true} onKeyDown={this.onKeyboard} open={this.props.open}>
                <div style={{height:'100%',width:'100%'}}>
                    <GameHeader onClick={this.onGameClose} width='40%' counter={this.state.counter} passed={this.state.passed} failed={this.state.failed}/>

                    { this.state.lineGame ? (<LineGame />) : (null) }

                    { this.state.twoGame ? (<TwoDigitGame />) : (null) }

                    { this.state.threeGame ? (<ThreeDigitGame />) : (null) }

                    { this.state.compGame ? (<ComparisonGame />) : (null) }

                    { this.state.operGame ? (<OperationGame />) : (null) }

                    { this.state.showResults ? (
                        <GameResults open={this.state.show_results} user_results={this.state.user_results}
                                     passed={this.state.passed} failed={this.state.failed} counter={this.state.counter}
                                     onClick={this.onResultsClose}/>
                        ) : (null)
                    }

                    { this.state.showResults ? (null) : (<GameFooter color={this.state.circle}/>) }
                </div>

                
            </Dialog>
        );
    }
}
