import React, { useEffect, useState } from 'react';
import { Dialog, Slide } from '@material-ui/core';

import SMTitle from './../dialog/title';
import ColorLine from './../line/line';

import {userinfo} from './../translations/userinfo';
import './account.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function AccountTab(props) {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        console.log('AccountTab.useEffect ' + props.id + ': ' + props.selected);

    }, [props.id, props.name, props.selected]);

    return (
        <div className='account_tab' onClick={() => props.onClick(props.id)}>
            {(props.selected) ? (
                <font style={{color: 'black', transform: 'scale(1.1)'}}> {props.name} </font>
            ) : (
                <font style={{color: 'green'}}> {props.name} </font>
            )}
        </div>
    );
}

export default function Account(props) {
    const [current, setCurrent] = useState(1);
    const tabs = [
        {id: 1, name: userinfo[props.lang]['avatar']},
        {id: 2, name: userinfo[props.lang]['exchange']},
        {id: 3, name: userinfo[props.lang]['settings']},
        {id: 4, name: userinfo[props.lang]['progress']},
        {id: 5, name: userinfo[props.lang]['friends']},
    ];

    useEffect(() => {

    }, [props.open, props.lang, props.id]);

    function onTabChange(id) {
        console.log('Account.onTabChange ' + id);


    }

    return (
        <Dialog open={props.open} fullScreen={true} TransitionComponent={Transition} transitionDuration={800}>
            <SMTitle title='' onClick={() => props.onUpdate('close')}/>

            <ColorLine/>

            <div className='account_board_wrapper'>
                <div className='account_board'>
                </div>

                <div className='account_tabs'>
                    {tabs.map(
                        (tab) => <AccountTab key={tab.name}
                                    id={tab.id}
                                    name={tab.name}
                                    selected={current === tab.id}
                                    onClick={onTabChange}/>
                        )
                    }
                </div>
            </div>

        </Dialog>
    );
}
