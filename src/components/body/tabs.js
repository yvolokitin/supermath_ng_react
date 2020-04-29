import React from 'react';

import {body} from './../translations/body';

import './tabs.css';

export default function Tabs(props) {
    const [value, setValue] = React.useState(0);

    const [white, setWhite] = React.useState(0);
    const [orange, setOrange] = React.useState(0);
    const [green, setGreen] = React.useState(0);
    const [navy, setNavy] = React.useState(0);
    const [brown, setBrown] = React.useState(0);
    const [black, setBlack] = React.useState(0);

    function unset(color) {
        if (value === 'white') {
            setWhite('#fbfbf8');
        } else if (value === 'orange') {
            setOrange('#fbfbf8');
        } else if (value === 'green') {
            setGreen('#fbfbf8');
        } else if (value === 'navy') {
            setNavy('#fbfbf8');
        } else if (value === 'brown') {
            setBrown('#fbfbf8');
        } else if (value === 'black') {
            setBlack('#fbfbf8');
        }

        setValue(color);
    }

    function onClick(color) {
        console.log('onClick ' + color);

        if (color === 'white') {
            setWhite('#3f51b5');
        } else if (color === 'orange') {
            setOrange('#3f51b5');
        } else if (color === 'green') {
            setGreen('#3f51b5');
        } else if (color === 'navy') {
            setNavy('#3f51b5');
        } else if (color === 'brown') {
            setBrown('#3f51b5');
        } else if (color === 'black') {
            setBlack('#3f51b5');
        }

        unset(color);
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

            <div className='tabs_div_wrapper' style={{backgroundColor: navy}}>
                <div className='tabs_div' onClick={() => onClick('navy')}>
                    <font style={{color:'#3f51b5'}}> {body[props.lang]['navy']} </font>
                </div>
            </div>

            <div className='tabs_div_wrapper' style={{backgroundColor: brown}}>
                <div className='tabs_div' onClick={() => onClick('brown')}>
                    <font style={{color:'brown'}}> {body[props.lang]['brown']} </font>
                </div>
            </div>

            <div className='tabs_div_wrapper' style={{backgroundColor: black}}>
                <div className='tabs_div' onClick={() => onClick('black')}>
                    <font style={{color:'black'}}> {body[props.lang]['black']} </font>
                </div>
            </div>
        </div>
    );
}
