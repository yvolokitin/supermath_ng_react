import React from 'react';
import {Dialog, DialogContent, Slide} from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import ReplayIcon from '@material-ui/icons/Replay';
import CategoryIcon from '@material-ui/icons/Category';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import RadialChart from "./../charts/radialchart";
import GameProgress from "./gameprogress";

import Title from './../title/title';
import ColorLine from './../line/line';

import image_time from './../../images/time.png';
import image_brain from './../../images/brain.png';

import {gameresults} from './../translations/gameresults';
import {get_number_per_belt} from './../halpers/functions';
import {get_rnd_adio_url} from './../halpers/audio';

import image_belt_white from './../../images/belt_white.png';
import image_belt_orange from './../../images/belt_orange.png';
import image_belt_green from './../../images/belt_green.png';
import image_belt_navy from './../../images/belt_blue.png';
import image_belt_brown from './../../images/belt_brown.png';
import image_belt_black from './../../images/belt_black.png';

import './gameresults.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function GameResults(props) {
    const [progress, setProgress] = React.useState(false);
    const [title, setTitle] = React.useState('');

    const [background, setBackground] = React.useState('white');
    const [nopoints, setNopoints] = React.useState(false);
    const [game, setGame] = React.useState('');
    const [belt, setBelt] = React.useState('');
    const [font, setFont] = React.useState('');
    const [text, setText] = React.useState('');

    const [audio, setAudio] = React.useState('');

    const handleChange = (event, value) => {
        console.log('GameResults.handleChange ' + value + ', props.user_id ' + props.user_id);
        if (value === 'results') {
            setProgress(true);
        } else {
            props.onClose(value);
        }
    }

    React.useEffect(() => {
        if (props.open) {
            console.log('GameResults.useEffect -> ' + props.known);
            setAudio(get_rnd_adio_url());
            var title_to_set = gameresults[props.lang]['time'] + ' ';

            var duration = props.data.duration, hours = 0, minutes = 0, seconds = 0;
            if (duration > (1000 * 60 * 60)) {
                hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
                duration = duration - hours*(1000 * 60 * 60);
                title_to_set = title_to_set + hours + ' ' + gameresults[props.lang]['hours'] + ', ';
            }

            if (duration > (1000 * 60)) {
                minutes = Math.floor((duration / (1000 * 60)) % 60);
                duration = duration - minutes*(1000 * 60);
                title_to_set = title_to_set + minutes + ' ' + gameresults[props.lang]['minutes']+ ', ';
            }

            if (duration > 1000) {
                seconds = Math.floor((duration / 1000) % 60);
            }

            setTitle(title_to_set + seconds + ' ' + gameresults[props.lang]['seconds']);
            setGame(props.data.game_uid);

            if (props.data.game_uid.indexOf('orange') > -1) {
                setBelt(image_belt_orange); setFont('#008000'); setBackground('#ff9933');
            } else if (props.data.game_uid.indexOf('green') > -1) {
                setBelt(image_belt_green); setFont('#ffa31a'); setBackground('#009933');
            } else if (props.data.game_uid.indexOf('navy') > -1) {
                setBelt(image_belt_navy); setFont('#ffe6e6'); setBackground('#0033cc');
            } else if (props.data.game_uid.indexOf('brown') > -1) {
                setBelt(image_belt_brown); setFont('#b3d9ff'); setBackground('#b35900');
            } else if (props.data.game_uid.indexOf('black') > -1) {
                setBelt(image_belt_black); setFont('#cccccc'); setBackground('#333333');
            } else {
                setBelt(image_belt_white); setFont('black'); setBackground('#e6e6e6');
            }

            if (props.type === 'task') {
                var curr_text = gameresults[props.lang]['solved_tasks'];
                if (props.data.failed === 0) {
                    curr_text = curr_text + gameresults[props.lang]['all']
                        + props.amount + gameresults[props.lang]['x_tasks'];
                    setFont('yellow');
                } else {
                    curr_text = curr_text + props.data.passed + gameresults[props.lang]['from']
                        + props.amount + gameresults[props.lang]['x_tasks'] + '. '
                        + props.data.failed + gameresults[props.lang]['x_tasks']
                        + gameresults[props.lang]['solved_wrong'];
                    setFont('orange');
                }

                setText(curr_text);

            } else {
                if (props.data.passed > props.amount) {
                    setText(gameresults[props.lang]['test'] + ' '
                        + gameresults[props.lang]['doubled'] + props.data.passed);
                } else {
                    setText(gameresults[props.lang]['test'] + ' '
                        + gameresults[props.lang]['your_score'] + props.data.passed);
                }
            }

            // props.known=true -> user is already solved programm
            if (props.known) {
                setNopoints(true);

            // props.level is current user belt (proof with test): 
            // props.data.belt -> the color, which is user to solve at current moment
            } else if (props.data.failed === 0) {
                // in case of test -> user always score points
                if (props.data.game_uid.indexOf('T') === -1) {
                    // get number per belt
                    var crt_blt = get_number_per_belt(props.data.belt);
                    var usr_blt = get_number_per_belt(props.level);
                    if ((props.data.belt !== 'black') &&
                        (props.data.belt !== 'task') &&
                        (usr_blt >= crt_blt)) {
                            setNopoints(true);
                    }
                }
            }

        } else {
            setAudio('');
        }

    }, [props.open, props.data, props.amount, props.type, props.level, props.lang, props.known]);

    return (
        <Dialog open={props.open} fullScreen={true} TransitionComponent={Transition} transitionDuration={900}>
            <Title title={title} src={image_time} onClose={() => props.onClose('close')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <div className='result_board'>
                {(props.type === 'task') ? (
                    <div className='result_board_belt' style={{backgroundColor: '#751aff'}}>
                        <div className='result_board_belt_left' style={{'float': 'right'}}>
                            <div className='result_board_belt_left_img'>
                                <img src={image_brain} alt='Belt' onContextMenu={(e) => e.preventDefault()}/>
                            </div>
                        </div>
                        <div className='result_board_belt_right' style={{color: font, 'float': 'left'}}>
                            {text}
                        </div>
                    </div>
                ) : (
                    <>
                        {((game.indexOf('T') > -1) && (props.data.failed === 0) && (props.user_id > 0)) ? (
                            <div className='result_board_belt' style={{backgroundColor: background}} onClick={() => handleChange('', 'results')}>
                                <div className='result_board_belt_left'>
                                    <div className='result_board_belt_left_img'>
                                        <img src={belt} alt='Belt' onContextMenu={(e) => e.preventDefault()}/>
                                    </div>
                                </div>
                                <div className='result_board_belt_right' style={{color: font,}}>
                                    {text}
                                </div>
                            </div>
                        ) : (
                            <div className='result_board_chart' onClick={() => handleChange('', 'results')}>
                                <font style={{color:'#248f24',}}>
                                    <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span> &nbsp; {props.data.passed} &nbsp;
                                </font>
                                &nbsp; <RadialChart progress={props.data.percent}/> &nbsp;
                                <font style={{color:'red',}}>
                                    &nbsp; {props.data.failed} &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                                </font>
                            </div>
                        )}
                    </>
                )}

                {(props.user_id > 0) ? (
                    <div className='result_board_body'>
                        {(nopoints) ? (
                            <>
                                {gameresults[props.lang]['sorry']} &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#9996;</span>
                            </>
                        ) : (
                            <>
                                {gameresults[props.lang]['reach']} &nbsp; <font style={{color:'orange'}}> {gameresults[props.lang][props.data.rate]} </font>
                                &nbsp; {gameresults[props.lang]['score']} &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#129504;</span>
                                &nbsp; {gameresults[props.lang]['brain']} &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128138;</span>
                                &nbsp; {gameresults[props.lang]['pill']} {gameresults[props.lang]['smart']}
                                &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128170;</span> &nbsp;
                                {gameresults[props.lang]['health']} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128540;</span>
                            </>
                        )}
                    </div>
                ) : (
                    <div className='result_board_body'>
                        {gameresults[props.lang]['reach']} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#9757;</span> &nbsp;
                        <font style={{color:'orange'}}> {gameresults[props.lang][props.data.rate]} </font> &nbsp; {gameresults[props.lang]['score']}
                        &nbsp; <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128202;</span>
                        <font style={{color:'red'}}> {gameresults[props.lang]['register']} </font>
                        <font style={{color:'orange'}}> {gameresults[props.lang]['save_results']} </font>
                    </div>
                )}
            </div>

            <DialogContent scroll='body'>
                <BottomNavigation onChange={handleChange} showLabels>
                    {props.type === 'game' &&
                        <BottomNavigationAction label={gameresults[props.lang]['replay']} value='restart' icon={<ReplayIcon/>} style={{transform:'scale(1.7)'}}/>
                    }

                    {props.type === 'game' &&
                        <BottomNavigationAction label={gameresults[props.lang]['results']} value='results' icon={<CategoryIcon/>} style={{transform:'scale(1.7)'}}/>
                    }

                    <BottomNavigationAction label={gameresults[props.lang]['close']} value='close' icon={<HighlightOffIcon/>} style={{transform:'scale(1.7)'}}/>

                    {props.user_id === 0 &&
                        <BottomNavigationAction label={gameresults[props.lang]['registration']} value='register' icon={<AccountCircleIcon/>} style={{transform:'scale(1.7)'}}/>
                    }
                </BottomNavigation>
            </DialogContent>

            <audio src={audio} type='audio/mpeg' autoPlay={true}/>

            <GameProgress open={progress}
                fullScreen={props.FULL_SCREEN}
                from='results'
                lang={props.lang}
                total={props.total}
                passed={props.passed}
                failed={props.failed}
                results={props.results}
                onClose={() => setProgress(false)}/>

        </Dialog>
    );
}
