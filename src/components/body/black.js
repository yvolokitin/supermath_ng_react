import React from 'react';

import {Typography, Container, Grid, Button} from '@material-ui/core';
import {Card, CardActions, CardActionArea, CardContent, CardMedia} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import logo from './../../images/tasks/task_na.jpg';

import classes from './../../index.css';

import SMDialogInfo from "./info";

// cards.length = 9
const cards = [0, 1, 2, 3, 4, 5];
const images = [logo, logo, logo, logo, logo, logo];
var tasks = [
    [],
    [],
    [],
    [],
    [],
    [],
];
const headers = [
    "Sorry, task is still under implemenatation",
    "Sorry, task is still under implemenatation",
    "Sorry, task is still under implemenatation",
    "Sorry, task is still under implemenatation",
    "Sorry, task is still under implemenatation",
    "Sorry, task is still under implemenatation",
];

var desciptions = [
    "We are sorry, due to task is still under implemenatation, we could not tell you more details",
    "We are sorry, due to task is still under implemenatation, we could not tell you more details",
    "We are sorry, due to task is still under implemenatation, we could not tell you more details",
    "We are sorry, due to task is still under implemenatation, we could not tell you more details",
    "We are sorry, due to task is still under implemenatation, we could not tell you more details",
    "We are sorry, due to task is still under implemenatation, we could not tell you more details",
];

export default class Black extends React.Component {
    constructor(props) {
        super(props);
        this.state = {infoOpen: false,
                      viewDialogTitleText: '',
                      viewDialogDescriptionText: '',
                      viewDialogImageUrl: '',
                      gameOpen: false,
                      gameInfo: false,
                      taskNumber: 0};
        this.onInfoOpen = this.onInfoOpen.bind(this);

        this.onGameOpen = this.onGameOpen.bind(this);
        this.onGameClose = this.onGameClose.bind(this);
    }

    onInfoOpen(card_id) {
        this.setState({infoOpen: true,
                       infoTitle: headers[card_id],
                       infoText: desciptions[card_id],
                       infoIURL: images[card_id]});
    }

    onGameOpen(task_id) {
        // should be removed later
        this.onInfoOpen(task_id);
/*
        this.setState({gameOpen: true,
                       taskNumber: task_id});
*/
    }

    onGameClose() {
        console.log("onGameClose called");
        this.setState({gameOpen: false});
    }

    render() {
        return (
                <Container className={classes.grid} maxWidth="md">
                    <Grid container spacing={3}>
                        {cards.map(card => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardActionArea onClick={(e) => this.onGameOpen(card)}>
                                        <CardMedia component="img" alt="Media Card task" height="140" image={images[card]}/>
                                        <CardContent className={classes.content}>
                                            <Typography variant="body2" color="textSecondary" component="p">{headers[card]}</Typography>
                                        </CardContent>
                                    </CardActionArea>    
                                    <CardActions>
                                        <Button size="small" color="primary" startIcon={<VisibilityIcon />}
                                                onClick={(e) => this.onInfoOpen(card)}>View Details</Button>
                                        <Button size="small" color="primary" startIcon={<PlayCircleFilledWhiteIcon />}
                                                onClick={(e) => this.onGameOpen(card)}>Play</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <SMDialogInfo open={this.state.infoOpen}
                                  title={this.state.infoTitle}
                                  text={this.state.infoText}
                                  imgUrl={this.state.infoIURL}
                                  onClick={() => this.setState({infoOpen: false})}/>
                </Container>
        );
    }
}
