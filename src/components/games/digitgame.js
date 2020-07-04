import React from 'react';
import {Dialog, Slide} from '@material-ui/core';

import GameHeader from "./digitgameheader";
import GameFooter from "./digitgamefooter";

import GameBoard from "./gameboard";
import GameResults from "./gameresults";

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';
import Calendar from './../calendar/calendar';

import './digitgame.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

const DG_STATUS = {
    NONE: 0,
    GAME: 1,
    RESULTS: 2,
    PROGRESS: 3,
}

export default class DigitGame extends React.Component {
    constructor(props) {
        super(props);

        this.onGameClose = this.onGameClose.bind(this);
        this.onColorUpdate = this.onColorUpdate.bind(this);
        this.onCounterUpdate = this.onCounterUpdate.bind(this);

        this.state = {
            status: DG_STATUS.GAME,
            type: props.type,
            task: props.task,
            amount: props.amount,
            results: [],
            circle: 'white',
            total: 0,
            passed: 0,
            failed: 0,
            duration: 0,
        };

        // count general time to solve all tasks
        this.timer = new Date().getTime();
    }

    componentDidUpdate(prevProps) {
        // console.log("DigitGame.componentDidUpdate " + this.props.task + ", prevProps.task" + prevProps.task);
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.task !== prevProps.task) {
            this.timer = new Date().getTime();
            this.setState({
                'status': DG_STATUS.GAME,
                'type': this.props.type,
                'task': this.props.task,
                'amount': this.props.amount,
                'circle': 'white',
                'total': 0,
                'passed': 0,
                'failed': 0,
            });
        }
    }

    /*
    // possible solution to block user, when calculator is used
    componentDidMount() {
        window.addEventListener('focus', function() {
            console.log('focus ' +  document.hidden);
        });

        document.addEventListener('visibilitychange', function() {
            console.log('visibilitychange ' +  document.hidden);
        });
    }

    componentWillUnmount() {
        document.addEventListener('visibilitychange');
    }
    */

    // closed, pass, fail passed only when game is closed
    onGameClose(status, data) {
        console.log('DigitGame.onGameClose ' + status);

        // game was unexpecdetly closed by user during play
        switch (status) {
            case 'finished':
                this.setState({
                    'status': DG_STATUS.RESULTS,
                    'duration': (new Date().getTime() - this.timer)});
                break;

            case 'progress':
                this.setState({'status': DG_STATUS.PROGRESS});
                this.props.onClose(status, data);
                break;

            case 'register':
            case 'replay':
            case 'close':
                // game was properly closed after showing results
                // and user decided to exit/replay/register
                this.setState({
                    'status': DG_STATUS.GAME,
                    'results': [],
                    'circle': 'white',
                    'total': 0,
                    'passed': 0,
                    'failed': 0,
                });
                this.timer = new Date().getTime();
                this.props.onClose(status, data);
                break;

            case 'interrapted':
                console.log('Game interraption with ' + this.state.failed + ' fails');
                var user_data = {
                    'operation': 'results',
                    'game_uid': this.props.game_uid,
                    'passed': 0,
                    'failed': this.state.failed,
                    'duration': (new Date().getTime() - this.timer),
                    'percent': 0,
                    'rate': 'really_bad',
                    'belt': this.props.belt,
                    'task': this.state.type,
                };

                this.setState({
                    'status': DG_STATUS.GAME,
                    results: [],
                    circle: 'white',
                    total: 0,
                    passed: 0,
                    failed: 0
                });

                this.timer = new Date().getTime();
                this.props.onClose('close', user_data);
                break;

            default:
                console.log("onGameClose: Wrong status received: " + status);
                break;
        }
    }

    /**
     * if counter === 0 -> user answered right from first time -> passed
     * if counter > 0 -> user could not properly answer from first time -> failed
     */
    onCounterUpdate(counter, user_task) {
        // console.log('onCounterUpdate ' + counter + ', task: ' + user_task);
        var format = '', color = counter ? 'red' : 'green';
        switch (this.state.type) {
            case '2digits':
            case '3digits':
            case '2digits_fr':
            case 'linedigits':
                format = user_task.expr1 + user_task.result;
                break;

            case '2digit_arg':
                format = user_task.expr1 + user_task.result;
                if (user_task.argument.includes('1')) {
                    format = '?';
                } else {
                    format = user_task.num1;
                }

                if (user_task.argument.includes('o')) {
                    format = format + ' ? ';
                } else {
                    format = format + ' ' + user_task.operation + ' ';
                }

                if (user_task.argument.includes('2')) {
                    format = format + '? = ' + user_task.outcome;
                } else {
                    format = format + user_task.num2 + ' = ' + user_task.outcome;
                }
                break;

            case 'digit_2column':
                format = user_task.num1 + user_task.operation + user_task.num2 + '=' + user_task.result;
                break;

            case 'digit_3column':
                format = user_task.num1 + ' ' + user_task.operation1 + ' ' + user_task.num2 + ' ' + user_task.operation2 + ' ' + user_task.num3 + ' = ' + user_task.result;
                break;

            case 'comp_nums':
            case 'comp_expr':
                format = user_task.expr1 + user_task.result + user_task.expr2;
                break;

            default:
                console.log('unknown format of ' + this.state.type + ', use default representation');
                format = user_task.expr1 + user_task.result;
                break;
        }

        // console.log('format ' + format);
        var value = {'task': format, 'color': color};
        if (counter === 0) {
            this.setState(prevState => ({
                total: prevState.total + 1,
                passed: prevState.passed + 1,
                results: [...prevState.results, value],
            }))

        } else {
            this.setState(prevState => ({
                total: prevState.total + 1,
                failed: prevState.failed + 1,
                results: [...prevState.results, value],
            }))
        }
    }

    onColorUpdate(color) {
        this.setState({circle: color});
    }

    /**
     * GameHeader: height: 10%  width: 100%
     * Body <div>: height: 80%  width: 100%
     * GameFooter: height: 10%  width: 100%
    */
    render() {
        return (
            <Dialog open={this.props.open} fullScreen={true} TransitionComponent={Transition} transitionDuration={900}>
                { (this.state.status === DG_STATUS.GAME) ? (
                    <>
                        <GameHeader onClick={this.onGameClose}
                            fullScreen={this.props.fullScreen}
                            lang={this.props.lang}
                            total={this.state.total}
                            passed={this.state.passed}
                            failed={this.state.failed}
                            results={this.state.results}/>

                        <GameBoard onClose={this.onGameClose}
                            onCounter={this.onCounterUpdate}
                            onColor={this.onColorUpdate}
                            type={this.state.type}
                            task={this.state.task}
                            amount={this.state.amount}
                            lang={this.props.lang}/>

                        <GameFooter color={this.state.circle}
                            lang={this.props.lang}/>
                    </>
                ) : (<> </>) }


                { (this.state.status === DG_STATUS.RESULTS) ? (
                    <GameResults id={this.props.id}
                        passed={this.state.passed}
                        failed={this.state.failed}
                        results={this.state.results}
                        amount={this.state.amount}
                        duration={this.state.duration}
                        game_uid={this.props.game_uid}
                        belt={this.props.belt}
                        lang={this.props.lang}
                        type={this.state.type}
                        onClose={this.onGameClose}/>
                ) : ( <> </> )}

                { (this.state.status === DG_STATUS.PROGRESS) ? (
                    <div className='digitgamebody'>
                        <SMTitle title='' onClick={() => this.onGameClose('close', {})}/>
                        <ColorLine/>

                        <GameHeader onClick={this.onGameClose}
                            fullScreen={this.props.fullScreen}
                            lang={this.props.lang}
                            total={this.state.total}
                            passed={this.state.passed}
                            failed={this.state.failed}
                            results={this.state.results}/>

                        <Calendar id={this.props.id}
                            pswdhash='' name=''
                            lang={this.props.lang}/>
                    </div>

                ) : ( <> </> )}

            </Dialog>
        );
    }
}
