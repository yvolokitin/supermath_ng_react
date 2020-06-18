import React, { useEffect, useState } from 'react';
import {Typography} from '@material-ui/core';

import './exchange.css';
import {exchange} from './../translations/exchange';

export default function Exchange(props) {
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
            if (value < 0) { // -1
                if ((cards > 0) && (failed > 10)) {
                    setCards(cards-1);
                    setFailed(failed-10);
                }

            } else { // +1
                if (((failed+10) <= props.failed) && ((cards+1) <= props.cards)) {
                    setCards(cards+1);
                    setFailed(failed+10);
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

    /*
    */
    return (
        <Typography hidden={hidden} component='div'>
            <div className='exchange_board_wrapper'>
                <div className='exchange_board'>

                    <div className='exchange_board_line'>
                        <div className='exchange_board_line_col'>
                            <font style={{color: 'green'}}> {props.passed} </font>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                        </div>

                        <div className='exchange_board_line_col'>
                            <font style={{color: 'orange'}}> {props.cards} </font>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127183;</span>
                        </div>

                        <div className='exchange_board_line_col'>
                            <font style={{color: 'brown'}}> {props.failed} </font>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                        </div>
                    </div>

                    <div className='exchange_board_line_operation'>
                        <div className='exchange_board_line_col' style={{border: 'none'}}>
                            <font className='font_rate' style={{color: 'green'}}> 30 </font>
                            <span className='font_rate' role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                            <font className='font_rate' style={{color: 'orange'}}> = </font>
                            <font className='font_rate' style={{color: 'brown'}}> 1 </font>
                            <span className='font_rate' role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                        </div>

                        <div className='exchange_board_line_col' style={{border: 'none'}}>
                            <font className='font_rate' style={{color: 'orange'}}> 1 </font>
                            <span className='font_rate' role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127183;</span>
                            <font className='font_rate' style={{color: 'orange'}}> = </font>
                            <font className='font_rate' style={{color: 'brown'}}> 10 </font>
                            <span className='font_rate' role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                        </div>

                        <div className='exchange_board_line_col' style={{border: 'none'}}>
                        </div>
                    </div>

                    <div className='exchange_board_line'>
                        <div className='exchange_board_line_col'>
                            <font className='font_oper' onClick={() => updateCounter('passed', 30)}> + </font>
                            <font className='font_oper' onClick={() => updateCounter('passed', -30)}> - </font>
                        </div>
                        <div className='exchange_board_line_col'>
                            <font className='font_oper' onClick={() => updateCounter('cards', 1)}> + </font>
                            <font className='font_oper' onClick={() => updateCounter('cards', -1)}> - </font>
                        </div>
                        <div className='exchange_board_line_col'> </div>
                    </div>

                    <div className='exchange_board_line'>
                        <div className='exchange_board_line_col'>
                            <font style={{color: 'green'}}> {passed} </font>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                        </div>

                        <div className='exchange_board_line_col'>
                            <font style={{color: 'orange'}}> {cards} </font>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127183;</span>
                        </div>

                        <div className='exchange_board_line_col'>
                            <font style={{color: 'brown'}}> {failed} </font>
                            <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                        </div>
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
