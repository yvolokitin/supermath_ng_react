import React from 'react';
import './digitgameheader.css';

/*
    Warning: The tag <text> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
        <text style={{color: 'black'}}>{this.state.counter}</text> &nbsp; &#128279; &nbsp;
        <text style={{color: 'green'}}>{this.state.passed}</text> &nbsp; &#128515; &nbsp;
        <text style={{color: 'red'}}>{this.state.failed}</text> &nbsp; &#128169;
*/
export default function GameHeader(props) {
    // SUPERMATH<font style={{color:'blue'}}>.</font><font style={{color:'red'}}>XYZ</font>
    return (
        <div className="games_header_div">
            <div className="games_header_div_left">
                <font onClick={() => props.onClick('interrapted')}>SUPERMATH</font>
            </div>
            <div className="games_header_div_right">
                <font style={{color: 'black'}}>{props.total}</font> &nbsp; &#128279; &nbsp;
                <font style={{color: 'green'}}>{props.passed}</font> &nbsp; &#128515; &nbsp;
                <font style={{color: 'red'}}>{props.failed}</font> &nbsp; &#128169;
            </div>
        </div>
    );
}
