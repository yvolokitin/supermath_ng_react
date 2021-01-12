import React, { useEffect, useState } from 'react';
import {Typography, Slider, Snackbar} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import './exchange.css';
import {exchange} from './../translations/exchange';

import icon_smile from './../../images/icons/icon_smile.jpg';
import icon_poop from './../../images/icons/icon_poop.jpg';
import icon_card from './../../images/icons/icon_card.jpg';

const ERROR_MESSAGE_TIMEOUT = 25000;
const SMILE_EXCHANGE = 30;
const CARD_EXCHANGE = 100;
const POOP_EXCHANGE = 5;

export default function Exchange(props) {
    const [selector1, setSelector1] = useState('');
    const [selector2, setSelector2] = useState('');

    const [hidden, setHidden] = useState(true);
    const [error, setError] = useState('');

    const [passed, setPassed] = useState(parseInt(props.passed));
    const [failed, setFailed] = useState(parseInt(props.failed));
    const [cards, setCards] = useState(parseInt(props.cards));

    const [sliderDisabled, setSliderDisabled] = useState(false);
    const [sliderStep, setSliderStep] = useState(1);
    const [sliderMin, setSliderMin] = useState(0);
    const [sliderMax, setSliderMax] = useState(10);

    useEffect(() => {
        // console.log('Progress.props.open ' + props.open);
        if (props.open) {
            setHidden(false);
            setPassed(parseInt(props.passed));
            setFailed(parseInt(props.failed));
            setCards(parseInt(props.cards));

            if (props.cards > 0 && props.failed >= POOP_EXCHANGE) {
                setSelector1('cards'); setSelector2('failed');
                setSliderDisabled(false);
                setSliderStep(POOP_EXCHANGE);
                setSliderMin(1); setSliderMax(props.failed/POOP_EXCHANGE);

            } else if (props.failed > 0 && props.passed >= SMILE_EXCHANGE) {
                setSelector1('passed'); setSelector2('failed');
                setSliderDisabled(false);
                setSliderStep(SMILE_EXCHANGE);
                setSliderMin(0); setSliderMax(parseInt(props.passed/SMILE_EXCHANGE));

            } else if (props.cards > 0) {
                setSelector1('cards'); setSelector2('passed');
                setSliderDisabled(false);
                setSliderStep(CARD_EXCHANGE);
                setSliderMin(CARD_EXCHANGE); setSliderMax(props.cards*CARD_EXCHANGE);

            } else {
                setSelector1(''); setSelector2('');
                setError('You have no Smiles or Cards to exchange now. Play more Games, reach more Smiles and Exchange them!');
                setSliderDisabled(true);
            }

        } else {
            setHidden(true);
        }

    }, [props.open, props.passed, props.failed, props.cards, props.lang]);

    function updateCounter(type, value) {
        console.log('updateCounter -> type ' + type + ', value ' + value);
        if (type === 'passed') {
            if (value < 0) { // -30
                if ((passed > 30) && (failed > 0)) {
                    setPassed(passed-30);
                    setFailed(failed-1);
                }

            } else { // +30
                if (((failed+1) <= props.failed) && ((passed+30) <= props.passed)) {
                    setPassed(passed+30);
                    setFailed(failed+1);
                }
            }

        } else if (type === 'cards') {
            console.log('CARD !!!');
            if (value < 0) { // -1
                if ((cards > 0) && (failed > (POOP_EXCHANGE-1))) {
                    setCards(cards-1);
                    setFailed(failed-POOP_EXCHANGE);
                }

            } else { // +1
                if (((failed+POOP_EXCHANGE) <= props.failed) && ((cards+1) <= props.cards)) {
                    setCards(cards+1);
                    setFailed(failed+POOP_EXCHANGE);
                }
            }
        }
    }

    function onSave() {
        console.log('Exchange.onSave: failed ' + failed + ', props.failed ' + props.failed);
        if (parseInt(failed) !== parseInt(props.failed)) {
            var data = {
                'passed': passed,
                'failed': failed,
                'cards': cards};
            props.onExchange('exchange', data);
        }
    }

    function unSelect(type) {
        console.log('Exchange.unSelect -> ' + type);
        if (selector1 === type) {
            setSelector1('');
        } else if (selector2 === type) {
            setSelector2('');
        }
    }

    function onSelect(type) {
        console.log('Exchange.onSelect -> ' + type + ', selector1 ' + selector1 + ', selector2 ' + selector2);

        if (type === 'cards') {
            if (cards > 0) {
                if (selector1 === '') {
                    setSelector1('cards');

                } else if (selector1 !== '' && selector2 === '') {
                    // cards are always first
                    setSelector2(selector1); setSelector1('cards');

                } else {
                    setError('Please, unselect Smiles or Poops!');
                }

            } else {
                setError('Sorry, you have no Cards for exchange!');
            }

        } else if (type === 'failed') {
            if (failed > 0) {
                if (selector2 === '') {
                    setSelector2('failed');

                } else if (selector2 !== '' && selector1 === '') {
                    // poops are always second
                    setSelector1(selector2); setSelector2('failed');

                } else {
                    setError('Please, unselect Smiles or Cards!');
                }

            } else {
                setError('Sorry, you have no Poops for exchange!');
            }

        } else if (type === 'passed') {
            if (selector1 === '' || selector2 === '') {
                if (selector1 === 'cards' || selector2 === 'cards') {
                    setSelector1('cards'); setSelector2('passed');

                } else if (selector1 === 'failed' || selector2 === 'failed') {
                    setSelector1('passed'); setSelector2('failed');
                }

            } else {
                setError('Please, unselect Cards or Poops!');
            }
        }
    }

    /*
    */
    return (
        <Typography hidden={hidden} component='div'>
            <div className='exchange_board_wrapper'>
                <div className='exchange_board'>
                    <div className='exchange_board_line'>
                        <div className='exchange_board_line_item'>
                            {(selector1 === 'passed' || selector2 === 'passed') ? (
                                <img className='exchange_board_line_item_img_selected'
                                    onContextMenu={(e) => e.preventDefault()}
                                    onClick={() => unSelect('passed')}
                                    src={icon_smile} alt={props.name}/>
                            ) : (
                                <img className='exchange_board_line_item_img'
                                    onContextMenu={(e) => e.preventDefault()}
                                    onClick={() => onSelect('passed')}
                                    src={icon_smile} alt={props.name}/>
                            )}
                        </div>

                        <div className='exchange_board_line_item'>
                            {(selector1 === 'cards' || selector2 === 'cards') ? (
                                <img className='exchange_board_line_item_img_selected'
                                    onContextMenu={(e) => e.preventDefault()}
                                    onClick={() => unSelect('cards')}
                                    src={icon_card} alt={props.name}/>
                            ) : (
                                <img className='exchange_board_line_item_img'
                                    onContextMenu={(e) => e.preventDefault()}
                                    onClick={() => onSelect('cards')}
                                    src={icon_card} alt={props.name}/>
                            )}
                        </div>

                        <div className='exchange_board_line_item'>
                            {(selector1 === 'failed' || selector2 === 'failed') ? (
                                <img className='exchange_board_line_item_img_selected'
                                    onContextMenu={(e) => e.preventDefault()}
                                    onClick={() => unSelect('failed')}
                                    src={icon_poop} alt={props.name}/>
                            ) : (
                                <img className='exchange_board_line_item_img'
                                    onContextMenu={(e) => e.preventDefault()}
                                    onClick={() => onSelect('failed')}
                                    src={icon_poop} alt={props.name}/>
                            )}
                        </div>
                    </div>

                    <div className='exchange_board_line'>
                        <div className='exchange_board_line_signs'>
                            &#45;
                        </div>
                        <div className='exchange_board_line_slider'>
                            <Slider defaultValue={0}
                                color='primary'
                                aria-labelledby='discrete-slider-small-steps'
                                valueLabelDisplay='on'
                                disabled={sliderDisabled}
                                step={sliderStep} min={sliderMin} max={sliderMax}/>
                        </div>
                        <div className='exchange_board_line_signs'>
                            &#43;
                        </div>
                    </div>

                    <div className='exchange_board_line'>
                        <font className='font_oper' onClick={() => onSave()}>
                            {exchange[props.lang]['save']}
                        </font>
                    </div>

                </div>
            </div>

            <Snackbar open={error.length !== 0} autoHideDuration={ERROR_MESSAGE_TIMEOUT} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
                <Alert onClose={() => setError('')} severity='error'>
                    {error}
                </Alert>
            </Snackbar>
        </Typography>
    );
}
