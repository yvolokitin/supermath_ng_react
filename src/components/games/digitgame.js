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
        this.onColorUpdate = this.onColorUpdate.bind(this);
        this.onCounterUpdate = this.onCounterUpdate.bind(this);

        this.state = {type: props.type,
                      task: props.task,
                      count: props.count,
                      showResults: false,
                      circle: 'white',
                      counter: 0,
                      passed: 0,
                      failed: 0};

        // array to save all user tasks
        this.tasks =[];
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.task !== prevProps.task) {
            console.log("DigitGame.componentDidUpdate " + this.props.task + ", prevProps.task" + prevProps.task);
            this.setState({type: this.props.type,
                           task: this.props.task,
                           count: this.props.count,
                           showResults: false,
                           circle: 'white',
                           counter: 0,
                           passed: 0,
                           failed: 0});
        }
    }

    onGameClose(status) {
        if (status === 'close') {
            console.log("DigitGame.Game Finished");
            this.props.onClick("finished");
        } else {
            console.log("DigitGame.Game Interrapted !!!");
            this.props.onClick("interrapted");
        }
        this.tasks = [];
    }

    /*
     * if counter === 0 -> user answered right from first time -> passed
     * if counter > 0 -> user could not properly answer from first time -> failed
    */
    onCounterUpdate(counter, task) {
        var increment;
        if (counter === 0) {
            increment = this.state.passed + 1;
            this.setState({passed: increment});
        } else {
            increment = this.state.failed + 1;
            this.setState({failed: increment});
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
                { this.state.showResults ? (null) : (<GameHeader onClick={this.onGameClose} width='49%' counter={this.state.counter} passed={this.state.passed} failed={this.state.failed}/>) }

                <div style={{height:'100%',width:'100%',border:'1px solid red'}}>
                    { this.state.showResults ? (
                            <GameResults open={this.state.show_results} user_results={this.state.user_results}
                                         passed={this.state.passed} failed={this.state.failed} counter={this.state.counter}
                                         onClick={this.onResultsClose}/>
                        ) : (
                            <GameBoard onClick={this.onGameClose} onCounter={this.onCounterUpdate} onColor={this.onColorUpdate}
                                       type={this.state.type} task={this.state.task} count={this.state.count}/>
                        )
                    }
                </div>

                { this.state.showResults ? (null) : (<GameFooter color={this.state.circle}/>) }
            </Dialog>
        );
    }
}
