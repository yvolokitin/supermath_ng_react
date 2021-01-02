import React, { useEffect, useState } from 'react';
import {Typography, Slider} from '@material-ui/core';

import './exchange.css';
import {exchange} from './../translations/exchange';

const POOP_EXCHANGE = 5;

export default function Exchange(props) {
    const [selector1, setSelector1] = useState('');
    const [selector2, setSelector2] = useState('');

    const [hidden, setHidden] = useState(true);

    const [passed, setPassed] = useState(parseInt(props.passed));
    const [failed, setFailed] = useState(parseInt(props.failed));
    const [cards, setCards] = useState(parseInt(props.cards));

    useEffect(() => {
        // console.log('Progress.props.open ' + props.open);
        if (props.open) {
            setHidden(false);
            setPassed(parseInt(props.passed));
            setFailed(parseInt(props.failed));
            setCards(parseInt(props.cards));
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

    function onSelect(type) {
        // selector1.length=0 -> nothing selected before
        if (selector1.length === 0) {
            setSelector1(type);

        } else {
            if (selector1) {

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
                        <div className='exchange_board_line_item' onClick={() => onSelect('smile')}>
                            <span className='font_rate' role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                        </div>

                        <div className='exchange_board_line_item' onClick={() => onSelect('card')}>
                            <span className='font_rate' role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127183;</span>
                        </div>

                        <div className='exchange_board_line_item' onClick={() => onSelect('poop')}>
                            <span className='font_rate' role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                        </div>
                    </div>

                    <div className='exchange_board_line'>
                    </div>

                    <div className='exchange_board_line'>
                        <Slider defaultValue={0}
                            aria-labelledby="discrete-slider-small-steps"
                            step={1}
                            marks
                            min={0}
                            max={10}
                            valueLabelDisplay="auto"/>
                    </div>

                    <div className='exchange_board_line'>
                        <font className='font_oper' onClick={() => onSave()}>
                            {exchange[props.lang]['save']}
                        </font>
                    </div>

                </div>
            </div>
        </Typography>
    );
}
