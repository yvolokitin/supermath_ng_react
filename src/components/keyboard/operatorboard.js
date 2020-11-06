import React from 'react';
import './operatorboard.css';

export default function OperatorBoard(props) {
    return (
        <div className='operatorboard'>
            {props.more && <button className='operatorboard_button' onClick={() => props.onOperator('>')}>&#62;</button>}
            {props.equals && <button className='operatorboard_button' onClick={() => props.onOperator('=')}>=</button>}
            {props.less && <button className='operatorboard_button' onClick={() => props.onOperator('<')}>&#60;</button>}

            {props.plus && <button className='operatorboard_button' onClick={() => props.onOperator('+')}>&#43;</button>}
            {props.minus && <button className='operatorboard_button' onClick={() => props.onOperator('-')}>&#45;</button>}

            {props.mul && <button className='operatorboard_button' onClick={() => props.onOperator('x')}>&#60;</button>}
            {props.div && <button className='operatorboard_button' onClick={() => props.onOperator('/')}>&#8725;</button>}
        </div>
    );
}
