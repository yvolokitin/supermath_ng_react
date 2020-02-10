import React from 'react';
import './operatorboard.css';

export default function OperatorBoard(props) {
    return (
        <div className="operatorboard">
            {props.more ? (<button onClick={props.onOperator}>&#62;</button>) : (null)}
            {props.equals ? (<button onClick={props.onOperator}>=</button>) : (null)}
            {props.less ? (<button onClick={props.onOperator}>&#60;</button>) : (null)}

            {props.plus ? (<button onClick={props.onOperator}>&#43;</button>) : (null)}
            {props.minus ? (<button onClick={props.onOperator}>&#45;</button>) : (null)}

            {props.mul ? (<button onClick={props.onOperator}>&#60;</button>) : (null)}
            {props.div ? (<button onClick={props.onOperator}>&#8725;</button>) : (null)}
        </div>
    );
}
