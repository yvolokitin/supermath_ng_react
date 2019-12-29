import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './smradialchart.css';

const DEFAULT_COLOR = '#040404';

// https://medium.com/@ekwonyenoob/building-a-simple-radial-chart-component-with-react-js-e3a3776146bd
export default class SMRadialChart extends Component {
    state = {}
    componentDidMount() {
        // For initial animation
        setTimeout(() => {
            this.setState({ setStrokeLength: true });
        });
    }

    render() {
        const { setStrokeLength } = this.state;
        const {
            className,
            radius,
            progress,
            strokeWidth,
            dimension,
            color
        } = this.props;
        
        const circleRadius = Math.min(radius, 85);
        const circumference = 2 * 3.14 * circleRadius;
        const strokeLength = setStrokeLength ? circumference / 100 * progress : 0;

        return (
           <div className={classNames('radial-chart', className, {'no-progress': strokeLength === 0})}>
               <svg viewBox="0 0 180 180" width={dimension} height={dimension}>
                   <circle
                       className="radial-chart-total"
                       stroke={color}
                       strokeWidth={strokeWidth}
                       fill="none"
                       cx="90"
                       cy="90"
                       r={circleRadius}
                   />
                   <circle
                       className="radial-chart-progress"
                       stroke={color}
                       strokeWidth={strokeWidth}
                       strokeDasharray={`${strokeLength},${circumference}`}
                       strokeLinecap="round"
                       fill="none"
                       cx="90"
                       cy="90"
                       r={circleRadius}
                   />
               </svg>
           </div>
        );
    }
}

SMRadialChart.defaultProps = {
    radius: 80,
    progress: 100,
    strokeWidth: 10,
    dimension: 180,
    color: DEFAULT_COLOR
};

SMRadialChart.propTypes = {
    className: PropTypes.string,
    radius: PropTypes.number,
    strokeWidth: PropTypes.number,
    color: PropTypes.string,
    progress: PropTypes.number,
    dimension: PropTypes.number
};
