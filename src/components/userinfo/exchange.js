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

    return (
        <Typography hidden={hidden} component='div'>
            <div className='exchange_board'>
                <Grid container spacing={3} justify='center' alignItems='center' style={{textAlign:'center',fontFamily:'Grinched',fontSize:'3rem',lineHeight:'1.1'}}>
                    <Grid item xs={3} className='exchangegriditem' style={{margin:'10px'}}>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128515;</span>
                    </Grid>
                    <Grid item xs={3} className='exchangegriditem' style={{margin:'10px'}}>
                        <span role='img' aria-labelledby='jsx-a11y/accessible-emoji'>&#128169;</span>
                    </Grid>
                </Grid>

                <Grid container spacing={3} justify='center' alignItems='center' style={{textAlign:'center',fontFamily:'Grinched',fontSize:'3rem',lineHeight:'1.1'}}>
                    <Grid item xs={3} className='exchangegriditem' style={{margin:'10px'}}>
                        <font className='exchangegriditemgreen'>{passed}</font>
                    </Grid>
                    <Grid item xs={3} className='exchangegriditem' style={{margin:'10px'}}>
                        <font className='exchangegriditemred'>{failed}</font>
                    </Grid>
                </Grid>

                <Grid container spacing={3} justify='center' alignItems='center' style={{textAlign:'center',fontFamily:'Grinched',fontSize:'3rem',lineHeight:'1.1'}}>
                    <Grid item xs={3} className='exchangegriditem' style={{margin:'10px'}}>
                        <font className='exchangegriditemgreen'>{sailed}</font>
                    </Grid>
                    <Grid item xs={3} className='exchangegriditem' style={{margin:'10px'}}>
                        <font className='exchangegriditemred'>{counter}</font>
                    </Grid>
                </Grid>

                <Grid container spacing={3} justify='center' alignItems='center' style={{textAlign:'center',fontFamily:'Grinched',fontSize:'3rem',lineHeight:'1.1'}}>
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

            </div>
        </Typography>
    );
}
