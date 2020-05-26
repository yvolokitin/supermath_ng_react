import React, { useEffect, useState, useCallback } from 'react';

export default function Account(props) {
    const [status, setStatus] = useState('none');

    useEffect(() => {
        console.log('Account.props.open ' + props.open);

        if (props.open === true) {
            setStatus('flex');
        } else {
            setStatus('none');
        }
/*
        if (props.open === true) {
            setLoading(true);
            setTimeout(() => {
                getScores();
            }, 950);
        }
*/
    }, [props.open, props.lang, props.id]);

    return (
        <div open={props.open} style={{'display': status}} className='account_wrapper'>
            <div className='account_board'>

            </div>
        </div>
    );
}
