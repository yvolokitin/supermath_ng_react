import React from 'react';
import './imagecontainer.css';

const ImageContainer = props => {
    const aspectRatio = (props.height / props.width) * 100;
    return (
        <div className='imagecontainer' style={{ paddingBottom: `${aspectRatio}%` }}/>
    );
};
