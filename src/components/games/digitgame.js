import React from 'react';
import {Dialog, Slide} from '@material-ui/core';

import GameHeader from './digitgameheader';
import GameFooter from './digitgamefooter';

import GameBoard from './gameboard';
import GameResults from './gameresults';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';
import Calendar from './../calendar/calendar';

import {get_random_taks_for_test} from './../halpers/programms';
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
        this.onTestUpdate = this.onTestUpdate.bind(this);
        this.onColorUpdate = this.onColorUpdate.bind(this);
        this.onCounterUpdate = this.onCounterUpdate.bind(this);

        this.state = {
            status: DG_STATUS.GAME,
            type: props.type,
            task: props.task,
            uid: 'unknown',
            amount: props.amount,
            results: [],
            circle: 'white',
            total: 0,
            passed: 0,
            failed: 0,
            duration: 0,
            is_test: false,
        };

        // count general time to solve all tasks
        this.timer = new Date().getTime();
    }

    // {id: 11, uid: 'orangeT', logo: 'none', type: 'test', task: 'orange1,orange2,orange3,orange4,', amount: task_amount},
    // {id: 10, uid: 'orange10', logo: orange10, type: '2digits', task: '+-,11-99,1-1,1,100', amount: task_amount},
    componentDidUpdate(prevProps) {
        // console.log('DigitGame.componentDidUpdate ' + this.props.game_uid + ', prevProps.game_uid ' + prevProps.game_uid);
        // Typical usage (don't forget to compare props), otherwise you get infinitive loop
        if (this.props.game_uid !== prevProps.game_uid) {
            this.timer = new Date().getTime();

            var it_is_test = false;
            var current = {
                'type': this.props.type,
                'task': this.props.task,
                'uid': this.props.uid,
            };

            if (this.props.type === 'test')  {
                console.log('!!!!!!!!! this.props.task ' + this.props.task + ', this.props.uid ' + this.props.uid);
                current = get_random_taks_for_test(this.props.task, this.props.uid);
                it_is_test = true;
            }

            console.log('DigitGame.componentDidUpdate: type: ' + current.type + ', task ' + current.task + ', uid ' + current.uid + ', old ' + this.state.uid);
            this.setState({
                'status': DG_STATUS.GAME,
                'type': current.type,
                'task': current.task,
                'uid': current.uid,
                'amount': this.props.amount,
                'circle': 'white',
                'total': 0,
                'passed': 0,
                'failed': 0,
                'is_test': it_is_test,
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
        console.log('!!!!!!!!!!!!!!!!!!!! DigitGame.onGameClose ' + status);

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

            case 'restart':
                this.setState({
                    'status': DG_STATUS.GAME,
                    'results': [],
                    'circle': 'white',
                    'total': 0,
                    'passed': 0,
                    'failed': 0,
                });
                this.timer = new Date().getTime();
                var restart_data = {
                    'passed': 0,
                    'failed': 0,
                };
                this.props.onClose(status, restart_data);
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
                console.log('onGameClose: Wrong status received: ' + status);
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

    onTestUpdate() {
        if (this.props.type === 'test')  {
            var current = get_random_taks_for_test(this.props.task, this.state.uid);
            console.log('DigitGame.onTestUpdate: type ' + current.type + ', task ' + current.task + ', uid ' + current.uid + ', old uid ' + this.state.uid);
            this.setState({
                type: current.type,
                task: current.task,
                uid: current.uid,
            });
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
                            total={this.state.total}
                            passed={this.state.passed}
                            failed={this.state.failed}
                            results={this.state.results}
                            width={this.props.width}
                            lang={this.props.lang}/>

                        <GameBoard onClose={this.onGameClose}
                            onCounter={this.onCounterUpdate}
                            onColor={this.onColorUpdate}
                            onTest={this.onTestUpdate}
                            is_test={this.state.is_test}
                            width={this.props.width}
                            uid={this.state.uid}
                            type={this.state.type}
                            task={this.state.task}
                            amount={this.state.amount}
                            lang={this.props.lang}/>

                        <GameFooter color={this.state.circle}
                            lang={this.props.lang}/>
                    </>
                ) : (<> </>) }

                <GameResults open={this.state.status === DG_STATUS.RESULTS}
                    user_id={this.props.id}
                    passed={this.state.passed}
                    failed={this.state.failed}
                    results={this.state.results}
                    amount={this.state.amount}
                    duration={this.state.duration}
                    game_uid={this.props.game_uid}
                    belt={this.props.belt}
                    lang={this.props.lang}
                    type={this.state.type}
                    width={this.props.width}
                    onClose={this.onGameClose}/>

                { (this.state.status === DG_STATUS.PROGRESS) ? (
                    <div className='digitgamebody'>
                        <SMTitle title='' onClick={() => this.onGameClose('close', {})}/>
                        <ColorLine/>

                        <GameHeader onClick={this.onGameClose}
                            fullScreen={this.props.fullScreen}
                            total={this.state.total}
                            passed={this.state.passed}
                            failed={this.state.failed}
                            results={this.state.results}
                            width={this.props.width}
                            lang={this.props.lang}/>

                        <Calendar id={this.props.id}
                            pswdhash='' name=''
                            lang={this.props.lang}/>
                    </div>

                ) : ( <> </> )}

            </Dialog>
        );
    }
}
