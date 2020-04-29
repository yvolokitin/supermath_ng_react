import React from 'react';

import {body} from './../translations/body';

import './tabs.css';

export default function Tabs(props) {
    const [value, setValue] = React.useState(0);

    const [white, setWhite] = React.useState(0);
    const [orange, setOrange] = React.useState(0);
    const [green, setGreen] = React.useState(0);
    const [navi, setNavi] = React.useState(0);
    const [brown, setBrown] = React.useState(0);
    const [black, setBlack] = React.useState(0);

    function unSet() {
        if (value === 'white') {
            setWhite('#fbfbf8');
        } else if (value === 'orange') {
            setOrange('#fbfbf8');
        } else if (value === 'green') {
            setGreen('#fbfbf8');
        } else if (value === 'navi') {
            setNavi('#fbfbf8');
        } else if (value === 'brown') {
            setBrown('#fbfbf8');
        } else if (value === 'black') {
            setBlack('#fbfbf8');
        }
    }

    function onClick(color) {
        console.log('onClick ' + color);

        if (color === 'white') {
            setWhite('#3f51b5');
        } else if (color === 'orange') {
            setOrange('#3f51b5');
        } else if (color === 'green') {
            setGreen('#3f51b5');
        }

    };

    return (
        <div className='tabs_wrapper'>
            <div className='tabs_div_wrapper' style={{backgroundColor: white}}>
                <div className='tabs_div' onClick={() => onClick('white')}>
                    <font style={{color:'black'}}> {body[props.lang]['white']} </font>
                </div>
            </div>

            <div className='tabs_div_wrapper' style={{backgroundColor: orange}}>
                <div className='tabs_div' onClick={() => onClick('orange')}>
                    <font style={{color:'orange'}}> {body[props.lang]['orange']} </font>
                </div>
            </div>

            <div className='tabs_div_wrapper' style={{backgroundColor: green}}>
                <div className='tabs_div' onClick={() => onClick('green')}>
                    <font style={{color:'green'}}> {body[props.lang]['green']} </font>
                </div>
            </div>

            <div className='tabs_div'>
                <font style={{color:'#3f51b5'}}> {body[props.lang]['navy']} </font>
            </div>

            <div className='tabs_div'>
                <font style={{color:'brown'}}> {body[props.lang]['brown']} </font>
            </div>

            <div className='tabs_div'>
                <font style={{color:'black'}}> {body[props.lang]['black']} </font>
            </div>
        </div>
    );
}
