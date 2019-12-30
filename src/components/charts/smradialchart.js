import React, { Component } from 'react';
import classNames from 'classnames';

import './smradialchart.css';

// https://medium.com/@ekwonyenoob/building-a-simple-radial-chart-component-with-react-js-e3a3776146bd
export default class SMRadialChart extends Component {
    constructor(props) {
        super(props);
        this.state = {setStrokeLength: false};
    }

    componentDidMount() {
        // For initial animation
        setTimeout(() => {
            this.setState({setStrokeLength: true});
        });
    }

    render() {
        const {
            className,
        } = this.props;
        
        const radius = 80;
        const circumference = 2 * 3.14 * radius;
        const strokeLength = this.state.setStrokeLength ? circumference / 100 * this.props.progress : 0;

        return (
            <div className={classNames('radial-chart', className, {'no-progress': strokeLength === 0})}>
                <svg viewBox="0 0 180 180" width="180" height="180">
                    <circle cx="90" cy="90" r={radius} stroke="red" strokeWidth="20" fill="none"/>

                    <circle className="radial-chart-progress" stroke="green"
                            strokeWidth="20" strokeDasharray={`${strokeLength},${circumference}`}
                            strokeLinecap="round" fill="none" cx="90" cy="90" r={radius}/>
                </svg>
            </div>
        );
    }
}
