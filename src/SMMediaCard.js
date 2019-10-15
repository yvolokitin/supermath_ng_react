import React from 'react';
import { CardMedia } from '@material-ui/core';

export default function SMMediaCard(props) {
    const imageUrl = (props.image_url).toString();
    return (
        <CardMedia
            component="img"
            alt="Media Card task"
            height="140"
            image={imageUrl}/>
    );
}
