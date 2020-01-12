import React from 'react';
import './operatorboard.css';

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
