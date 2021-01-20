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

    const [smiles, setSmiles] = useState(parseInt(props.passed));
    const [poops, setPoops] = useState(parseInt(props.failed));
    const [jokers, setJokers] = useState(parseInt(props.cards));

    const [sliderDisabled, setSliderDisabled] = useState(false);
    const [sliderStep, setSliderStep] = useState(1);
    const [sliderMin, setSliderMin] = useState(0);
    const [sliderMax, setSliderMax] = useState(1);
    const [sliderValue, setSliderValue] = useState(0);

    useEffect(() => {
        // console.log('Progress.props.open ' + props.open);
        if (props.open) {
            setHidden(false);
            setPassed(parseInt(props.passed));
            setFailed(parseInt(props.failed));
            setCards(parseInt(props.cards));

            setSliderMin(0);

            if (props.cards > 0 && props.failed >= POOP_EXCHANGE) {
                setSelector1('cards'); setSelector2('failed');
                setSliderDisabled(false);
                setSliderStep(POOP_EXCHANGE);
                if (props.cards*POOP_EXCHANGE > props.failed) {
                    setSliderMax(parseInt(props.failed/POOP_EXCHANGE)*POOP_EXCHANGE);
                } else {
                    setSliderMax(parseInt(props.cards)*POOP_EXCHANGE);
                }

            } else if (props.failed > 0 && props.passed >= SMILE_EXCHANGE) {
                setSelector1('passed'); setSelector2('failed');
                setSliderDisabled(false);
                setSliderStep(SMILE_EXCHANGE);
                if (props.failed < parseInt(props.passed/SMILE_EXCHANGE)) {
                    setSliderMax(props.failed*SMILE_EXCHANGE);
                } else {
                    setSliderMax(parseInt(props.passed/SMILE_EXCHANGE)*SMILE_EXCHANGE);
                }

            } else if (props.cards > 0) {
                setSelector1('cards'); setSelector2('passed');
                setSliderDisabled(false);
                setSliderStep(CARD_EXCHANGE);
                setSliderMax(props.cards*CARD_EXCHANGE);

            } else {
                setSelector1(''); setSelector2('');
                setError('You have no Smiles and Cards to exchange now. Play more Games, reach more Smiles and Exchange them!');
                setSliderDisabled(true);
            }

        } else {
            setHidden(true);
        }

    }, [props.open, props.passed, props.failed, props.cards, props.lang]);

    function onSave() {
        console.log('Exchange.onSave: failed ' + failed + ', props.failed ' + props.failed);
        if (cards !== jokers || smiles !== passed || poops !== failed) {
            var data = {
                'passed': smiles,
                'failed': poops,
                'cards': jokers};
            props.onExchange('exchange', data);
            setSliderValue(0);
        }
    }

    function onExchange(operation) {
        if (selector1 !== '' && selector2 !== '') {
            if (selector1 === 'passed' && selector2 === 'failed') {
                if (operation === 'add' && smiles >= SMILE_EXCHANGE && poops > 0) {
                    setSmiles(smiles-SMILE_EXCHANGE); setPoops(poops-1);
                    setSliderValue(sliderValue+SMILE_EXCHANGE);

                } else if (operation === 'sub' && passed >= (smiles+SMILE_EXCHANGE)) {
                    setSmiles(smiles+SMILE_EXCHANGE); setPoops(poops+1);
                    setSliderValue(sliderValue-SMILE_EXCHANGE);
                }

            } else if (selector1 === 'cards' && selector2 === 'passed') {
                if (operation === 'add' && jokers > 0) {
                    setJokers(jokers-1); setSmiles(smiles+CARD_EXCHANGE);
                    setSliderValue(sliderValue+CARD_EXCHANGE);

                } else if (operation === 'sub' && cards >= (jokers+1) && (smiles-CARD_EXCHANGE) >= passed) {
                    setJokers(jokers+1); setSmiles(smiles-CARD_EXCHANGE);
                    setSliderValue(sliderValue-CARD_EXCHANGE);
                }

            } else if (selector1 === 'cards' && selector2 === 'failed') {
                if (operation === 'add' && jokers > 0 && poops >= POOP_EXCHANGE) {
                    setJokers(jokers-1); setPoops(poops-POOP_EXCHANGE);
                    setSliderValue(sliderValue+POOP_EXCHANGE);

                } else if (operation === 'sub' && cards >= (jokers+1) && failed >= (poops+1)) {
                    setJokers(jokers+1); setPoops(poops+POOP_EXCHANGE);
                    setSliderValue(sliderValue-POOP_EXCHANGE);
                }
            }
        }
    }

    function onCancel() {
        setPoops(failed); setSmiles(passed);
        setJokers(cards); setSliderValue(0);
    }

    function unSelect(type) {
        console.log('Exchange.unSelect -> ' + type);
        if (selector1 === type) {
            setSelector1('');

        } else if (selector2 === type) {
            setSelector2('');
        }

        setSliderValue(0);
        setSliderDisabled(true);
    }

    function onSelect(type) {
        console.log('Exchange.onSelect -> ' + type + ', selector1=' + selector1 + ', selector2=' + selector2);

        if (selector1 === '' || selector2 === '') {
            switch (type) {
                case 'cards':
                    if (cards > 0) {
                        if (selector1 === 'passed') {
                            setSelector1('cards'); setJokers(cards);
                            setSelector2('passed'); setSmiles(passed);
                            setSliderDisabled(false);
                            setSliderStep(CARD_EXCHANGE);
                            setSliderMax(props.cards*CARD_EXCHANGE);
                        } else if (selector2 === 'failed') {
                            setSelector1('cards'); setJokers(cards);
                            if (failed > POOP_EXCHANGE) {
                                setSliderDisabled(false);
                                setSliderStep(POOP_EXCHANGE);
                                if (props.cards*POOP_EXCHANGE > props.failed) {
                                    setSliderMax(parseInt(props.failed/POOP_EXCHANGE)*POOP_EXCHANGE);
                                } else {
                                    setSliderMax(parseInt(props.cards)*POOP_EXCHANGE);
                                }
                            } else {
                                setError('Sorry, you can\'t exchange less then 5 Poops per 1 Joker.');
                            }
                        } else {
                            setSelector1('cards'); setJokers(cards);
                        }
                    } else {
                        setError('Sorry, you have no Cards for exchange!');
                    }
                break;

                case 'passed':
                    if (selector1 === 'cards') {
                        setSelector1('cards'); setJokers(cards);
                        setSelector2('passed'); setSmiles(passed);
                        if (cards > 0) {
                            setSliderDisabled(false);
                            setSliderStep(CARD_EXCHANGE);
                            setSliderMax(props.cards*CARD_EXCHANGE);
                        }
                    } else if (selector2 === 'failed') {
                        setSelector1('passed'); setSmiles(passed);
                        setSelector2('failed'); setPoops(failed);
                        if (passed >= SMILE_EXCHANGE && failed > 0) {
                            if (failed < parseInt(props.passed/SMILE_EXCHANGE)) {
                                setSliderMax(failed*SMILE_EXCHANGE);
                            } else {
                                setSliderMax(parseInt(props.passed/SMILE_EXCHANGE)*SMILE_EXCHANGE);
                            }

                            setSliderStep(SMILE_EXCHANGE);
                            setSliderDisabled(false);
                        }
                    } else {
                        setSelector1('passed'); setSmiles(passed);
                    }

                break;

                default: // failed
                    if (failed > 0) {
                        if (selector1 === 'cards') {
                            setSelector1('cards'); setJokers(cards);
                            setSelector2('failed'); setPoops(failed);
                            if (cards > 0 && failed >= POOP_EXCHANGE) {
                                setSliderDisabled(false);
                                setSliderStep(POOP_EXCHANGE);
                                if (props.cards*POOP_EXCHANGE > props.failed) {
                                    setSliderMax(parseInt(props.failed/POOP_EXCHANGE)*POOP_EXCHANGE);
                                } else {
                                    setSliderMax(parseInt(props.cards)*POOP_EXCHANGE);
                                }
                            }
                        } else if (selector1 === 'passed' || selector2 === 'passed') {
                            setSelector1('passed'); setSmiles(passed);
                            setSelector2('failed'); setPoops(failed);
                            if (passed >= SMILE_EXCHANGE) {
                                if (failed < parseInt(props.passed/SMILE_EXCHANGE)) {
                                    setSliderMax(failed*SMILE_EXCHANGE);
                                } else {
                                    setSliderMax(parseInt(props.passed/SMILE_EXCHANGE)*SMILE_EXCHANGE);
                                }

                                setSliderMax(parseInt(props.passed/SMILE_EXCHANGE));
                                setSliderDisabled(false);
                            }
                        } else {
                            setSelector2('failed'); setPoops(failed);
                        }
                    } else {
                        setError('Sorry, you have no Poops for exchange!');
                    }
                break;
            }

        } else {
            console.log('selector1.length ' + selector1.length + ', selector2.length ' + selector2.length);
            setError('Only two elements can be selected same time. Please, unselect Smile, Joker or Poop.');
        }
    }

    function onSliderChange(event, value) {
/*
        // works wrong
        if (selector1 === 'cards' || selector2 === 'failed') {
            setSliderValue(value);
            setPoops(failed-value);
            setJokers(cards-value/POOP_EXCHANGE);

        } else if (selector1 === 'cards' || selector2 === 'passed') {
            setSliderValue(value);
            setSmiles(passed+value);
            setJokers(cards-value/SMILE_EXCHANGE);

        } else if (selector1 === 'passed' || selector2 === 'failed') {
            console.log('onSliderChange: ' + value);
            setSliderValue(value);
            setSmiles(passed-value*SMILE_EXCHANGE);
            setPoops(failed-value);
        }
*/
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
                                    src={icon_smile} alt='Smile'/>
                            ) : (
                                <img className='exchange_board_line_item_img'
                                    onContextMenu={(e) => e.preventDefault()}
                                    onClick={() => onSelect('passed')}
                                    src={icon_smile} alt='Smile'/>
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
                        <div className='exchange_board_line_signs' onClick={() => onExchange('sub')}>
                            {(selector1 === 'cards') && <font style={{color:'orange'}}> {jokers} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127183;</span></font>}
                            {(selector1 === 'passed') && <font style={{color:'green'}}> {smiles} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span></font>}
                        </div>
                        <div className='exchange_board_line_slider'>
                            <Slider defaultValue={0}
                                value={sliderValue}
                                color='primary'
                                valueLabelDisplay='on'
                                onChange={onSliderChange}
                                disabled={sliderDisabled}
                                step={sliderStep} min={sliderMin} max={sliderMax}/>
                        </div>
                        <div className='exchange_board_line_signs' onClick={() => onExchange('add')}>
                            {(selector2 === 'passed') && <font style={{color:'green'}}> {smiles} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span></font>}
                            {(selector2 === 'failed') && <font style={{color:'red'}}> {poops} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span></font>}
                        </div>
                    </div>

                    <div className='exchange_board_line'>
                        <font style={{color: 'red'}} onClick={() => onCancel()}>{exchange[props.lang]['cancel']}</font>
                        <font style={{color: 'green'}} onClick={() => onSave()}>{exchange[props.lang]['save']}</font>
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
