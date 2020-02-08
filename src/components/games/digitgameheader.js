import React from 'react';
import './digitgameheader.css';

export default function GameHeader(props) {
    // SUPERMATH<font style={{color:'blue'}}>.</font><font style={{color:'red'}}>XYZ</font>
    return (
        <div className="games_header_div">
            <div className="games_header_div_left">
                <font onClick={() => props.onClick('interrapted')}>SUPERMATH</font>
            </div>
            <div className="games_header_div_right" style={{width: props.width}}>
                <font style={{color: 'black'}}>{props.total}</font> &nbsp; &#128279; &nbsp;
                <font style={{color: 'green'}}>{props.passed}</font> &nbsp; &#128515; &nbsp;
                <font style={{color: 'red'}}>{props.failed}</font> &nbsp; &#128169;
            </div>
        </div>
    );
}
