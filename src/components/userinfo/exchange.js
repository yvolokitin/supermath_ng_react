import React, { useEffect, useState } from 'react';
import {Grid, Typography} from '@material-ui/core';

import './exchange.css';
import {exchange} from './../translations/exchange';

export default function Exchange(props) {
    const [hidden, setHidden] = useState(true);

    const [counter, setCounter] = useState(0);
    const [sailed, setSailed] = useState(0);

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

    function onCounterChanged(value) {
        if (failed > 0) {
            if (value > 0) {
                if (passed > (value*30)) {
                    setCounter(counter + 1);
                    setSailed(sailed + 30);
                    setPassed(passed - 30);
                    setFailed(failed - 1);
                }
            } else {
                if (counter > 0) {
                    setCounter(counter - 1);
                    setPassed(passed + 30);
                    setFailed(failed + 1);
                    setSailed(sailed - 30);
                }
            }
        }
    }

    function onSave() {
        console.log('Exchange.onSave: passed ' + passed + ', failed ' + failed + ', counter ' + counter + ', sailed ' + sailed);
        /*if (sailed > 0) {
            props.onExchange(passed, failed);
        }*/
    }

    /*
                <Grid container spacing={3} justify='center' alignItems='center' className='exchange_board_grid_container'>
                    <Grid item xs={3} className='exchange_board_grid'>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                    </Grid>
                    <Grid item xs={3} className='exchange_board_grid'>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                    </Grid>
                </Grid>

                <Grid container spacing={3} justify='center' alignItems='center' className='exchange_board_grid_container'>
                    <Grid item xs={3} className='exchange_board_grid'>
                        <font className='exchangegriditemgreen'>{passed}</font>
                    </Grid>
                    <Grid item xs={3} className='exchange_board_grid'>
                        <font className='exchangegriditemred'>{failed}</font>
                    </Grid>
                </Grid>

                <Grid container spacing={3} justify='center' alignItems='center' className='exchange_board_grid_container'>
                    <Grid item xs={3} className='exchange_board_grid'>
                        <font className='exchangegriditemgreen'>{sailed}</font>
                    </Grid>
                    <Grid item xs={3} className='exchange_board_grid'>
                        <font className='exchangegriditemred'>{counter}</font>
                    </Grid>
                </Grid>

                <Grid container spacing={3} justify='center' alignItems='center' className='exchange_board_grid_container'>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={3}>
                        <font className='exchangebuttongreen' style={{float:'left'}} onClick={() => onSave()}>
                            {exchange[props.lang]['save']}
                        </font>

                        <font className='exchangebutton' style={{float:'right',marginLeft:'5px'}} onClick={() => onCounterChanged(1)}>+</font>
                        <font className='exchangebutton' style={{float:'right'}} onClick={() => onCounterChanged(-1)}>-</font>
                    </Grid>
                </Grid>
    */
    return (
        <Typography hidden={hidden} component='div'>
            <div className='exchange_board_wrapper'>
                <div className='exchange_board'>

                    <div className='exchange_board_line'>
                        <div className='exchange_board_line_col'>
                            {passed} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                        </div>

                        <div className='exchange_board_line_col'>
                            {cards} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#127183;</span>
                        </div>

                        <div className='exchange_board_line_col'>
                            {failed} <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                        </div>
                    </div>

                    <div className='exchange_board_line'>
                        <div className='exchange_board_line_col'>
                            + -
                        </div>

                        <div className='exchange_board_line_col'>
                            + -
                        </div>

                    </div>

                    <div className='exchange_board_line'>
                    </div>
                </div>
            </div>
        </Typography>
    );
}
