import React from 'react';
import {Container} from '@material-ui/core';

export default class Orange extends React.Component {
    constructor(props) {
        super(props);

        this.onInfoOpen = this.onInfoOpen.bind(this);
        this.onGameOpen = this.onGameOpen.bind(this);
        this.onGameClose = this.onGameClose.bind(this);

        // taskNumber is -1 due to first program initialization
        this.state = {infoOpen: false,
                      viewDialogTitleText: '',
                      viewDialogDescriptionText: '',
                      viewDialogImageUrl: '',
                      game2DOpen: false,
                      game3DOpen: false,
                      gameCoOpen: false,
                      gameOpOpen: false,
                      gameInfo: false,
                      taskNumber: -1};
    }

    render() {
        return (
                <Container />
        );
    }
}
