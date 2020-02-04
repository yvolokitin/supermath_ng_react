import React from 'react';
import './operatorboard.css';

/*
export default class OperatorBoard extends React.Component {
    render() {
        return (
            <div className="operatorboard">
                <button id="more" onClick={this.props.onOperator}>&#62;</button>
                <button id="equals" onClick={this.props.onOperator}>=</button>
                <button id="less" onClick={this.props.onOperator}>&#60;</button>
            </div>
        );
    }
}
*/
export default function OperatorBoard(props) {
    return (
        <div className="operatorboard">
            {props.more ? (<button id="more" onClick={props.onOperator}>&#62;</button>) : (null)}
            {props.equals ? (<button id="equals" onClick={props.onOperator}>=</button>) : (null)}
            {props.less ? (<button id="less" onClick={props.onOperator}>&#60;</button>) : (null)}

            {props.plus ? (<button id="plus" onClick={props.onOperator}>&#43;</button>) : (null)}
            {props.minus ? (<button id="minus" onClick={props.onOperator}>&#8722;</button>) : (null)}

            {props.mul ? (<button id="mul" onClick={props.onOperator}>&#60;</button>) : (null)}
            {props.div ? (<button id="div" onClick={props.onOperator}>&#8725;</button>) : (null)}
        </div>
    );
}
