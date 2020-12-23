import React, { Component } from 'react';
import './radialchart.css';

// medium.com/@ekwonyenoob/building-a-simple-radial-chart-component-with-react-js-e3a3776146bd
export default class RadialChart extends Component {
    constructor(props) {
        super(props);
        this.state = {setStrokeLength: false};
    }

    componentDidMount() {
        // For initial animation
        setTimeout(() => {this.setState({setStrokeLength: true});});
    }

    render() {
        const radius = 80;
        const circumference = 2 * 3.14 * radius;
        const strokeLength = this.state.setStrokeLength ? circumference / 100 * this.props.progress : 0;

        return (
            <div className='radial_chart'>
                <svg className='radial_svg' viewBox='0 0 180 180'>
                    <circle cx='90' cy='90' r={radius} stroke='red' strokeWidth='20' fill='none'/>

                    <circle className='radial_chart_progress' stroke='#248f24'
                            strokeWidth='21' strokeDasharray={`${strokeLength},${circumference}`}
                            strokeLinecap='round' fill='none' cx='90' cy='90' r={radius}/>
                </svg>
            </div>
        );
    }
}
