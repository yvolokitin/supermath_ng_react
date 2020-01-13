import React from 'react';
import './keyboard.css';

/*
                <button id="dot" onClick={this.props.onDecimal}>.</button>
                <button id="clear" onClick={this.props.onClear}>Clear</button>

                <button id="more" onClick={this.props.onOperator}>&#62;</button>
                <button id="equals" onClick={this.props.onOperator}>=</button>
                <button id="less" onClick={this.props.onOperator}>&#60;</button>
*/
// export default function SMKeyBoard(props) {
export default class SMKeyBoard extends React.Component {
    render() {
        return (
            <div className="keyboard">
                <button id="seven" onClick={this.props.onDigit}>7</button>
                <button id="eight" onClick={this.props.onDigit}>8</button>
                <button id="nine" onClick={this.props.onDigit}>9</button>

                <button id="four" onClick={this.props.onDigit}>4</button>
                <button id="five" onClick={this.props.onDigit}>5</button>
                <button id="six" onClick={this.props.onDigit}>6</button>

                <button id="one" onClick={this.props.onDigit}>1</button>
                <button id="two" onClick={this.props.onDigit}>2</button>
                <button id="three" onClick={this.props.onDigit}>3</button>

                <button id="subtract" onClick={this.props.onOperator}>-</button>
                <button id="zero" onClick={this.props.onDigit}>0</button>
                <button id="add" onClick={this.props.onOperator}>+</button>
            </div>
        );
    }
}
