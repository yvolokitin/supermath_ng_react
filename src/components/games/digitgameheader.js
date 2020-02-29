import React from 'react';
import './digitgameheader.css';

import AlertDialog from './../alert/alert';

/*
*/
export default function GameHeader(props) {
    const [value, setValue] = React.useState(false);

    const onAlertDialog = (status) => {
        if (status === 'logout') {
            props.onClick('interrapted');
        }
        setValue(false);
    }

    return (
        <div className="games_header_div">
            <div className='games_header_div_left'>
                <font onClick={() => setValue(true)}>SUPERMATH</font>
            </div>
            <div className='games_header_div_right'>
                <font style={{color: 'black'}}>{props.total}</font> &nbsp; &#128279; &nbsp;
                <font style={{color: 'green'}}>{props.passed}</font> &nbsp; &#128515; &nbsp;
                <font style={{color: 'red'}}>{props.failed}</font> &nbsp; &#128169;
            </div>

            <AlertDialog open={value}
                         title='Do you really want to Exit from the game?'
                         text='You will lose your Passed scores data if you Exit! We are strongly recommend you to finish current Math tasks'
                         yes='Exit'
                         no='Let Me Continue'
                         onClose={onAlertDialog}/>
        </div>
    );
}
