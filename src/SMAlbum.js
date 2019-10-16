﻿import React from 'react';
import {Typography, Container, Button} from '@material-ui/core';
import {Grid, Card, CardActions, CardActionArea, CardContent, CardMedia} from '@material-ui/core';
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core';

import logo1 from './imgs/ru_white_1.jpg';
import logo2 from './imgs/ru_white_2.jpg';
import logo3 from './imgs/ru_white_3.jpg';
import logo4 from './imgs/ru_white_4.jpg';
import logo5 from './imgs/ru_white_5.jpg';
import logo6 from './imgs/ru_white_6.jpg';
import logo7 from './imgs/ru_white_7.jpg';
import logo8 from './imgs/ru_white_8.jpg';
import logo9 from './imgs/ru_white_9.jpg';

import classes from './index.css';

const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const imgs = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9];

const headers = [
    "Tasks for Comparision of one-digit numbers (from 0 to 9)",
    "Tasks for Addition of one-digit numbers (from 0 to 9)",
    "Tasks for Subtraction of one-digit numbers (from 0 to 9)",
    "Tasks for Addition and Subtraction of one-digit numbers (from 0 to 9)",
    "Tasks for Determination of one from the two mathematical operation: Addition or Subtraction",
    "Tasks for Comparision of two-digit numbers (from 0 to 9)",
    "Tasks for Addition and Subtraction of round numbers from 10 to 100 (numbers 10, 20, 30 ... 100)",
    "Tasks for Addition and Subtraction of one- and two- digit numbers",
    "Tasks for Addition and Subtraction of two- digit numbers"
];

var desciptions = [
    "Tasks for kids in age 3 - 6 years for Comparision of one-digit numbers (from 0 to 9), where you can to use only more (>), less (<) and equal (=) labels and have 10 seconds timeout to solve each task",
    "Tasks for kids in age 3 - 6 years for Addition of one-digit numbers. The result of addition can be an one or two digit number, the result of subtraction is zero or a one-digit number",
    "Tasks for kids in age 3 - 6 years for Subtraction of one-digit numbers. The result of addition can be an one or two digit number, the result of subtraction is zero or a one-digit number",
    "Tasks for kids in age 3 - 6 years for Addition and <b>Subtraction</b> of one-digit numbers. The result of addition can be an one or two digit number, the result of subtraction is zero or a one-digit number",
    "Tasks for kids in age 3 - 6 years for Understanding of one of two mathematical operation: addition or subtraction. You will know both arguments (numbers), the result of an operation and have 10 seconds timeout to solve each task",
    "Tasks for kids in age 3 - 6 years for Comparision of two-digit numbers (from 0 to 9), where you can to use only more (>), less (<) and equal (=) labels and have 10 seconds timeout to solve each task",
    "Tasks for kids in age 3 - 6 years for Addition and Subtraction of round numbers from 10 to 100 (numbers 10, 20, 30 ... 100). You have 10 seconds timeout to solve each task",
    "Tasks for kids in age 3 - 6 years for Addition and Subtraction of one- and two- digit numbers. TBD.",
    "Tasks for kids in age 3 - 6 years for Addition and Subtraction of two-digit numbers. The result of addition can be an one or two digit number, the result of subtraction is zero or a one-digit number",
];

// https://source.unsplash.com/random
// imgs[card]
// <img src={logo1} alt="QQQQ" height="140"/>
export default class SMAlbum extends React.Component {
    constructor(props) {
        super(props);

        this.state = {viewDialogOpen: false};
        this.state = {viewDialogTitleText: ""};
        this.state = {viewDialogDescriptionText: ""};
        this.state = {viewDialogImageUrl: ""};

        this.handleViewClick = this.handleViewClick.bind(this);
        this.handleViewClose = this.handleViewClose.bind(this);
    }

    handleViewClick(title, desciption, imageUrl) {
        this.setState({viewDialogOpen: true });
        this.setState({viewDialogTitleText: title});
        this.setState({viewDialogDescriptionText: desciption});
        this.setState({viewDialogImageUrl: imageUrl});
    }

    handleViewClose() {
        this.setState({ viewDialogOpen: false });
    }

    render() {
        return (
            <main>
                <Container className={classes.grid} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map(card => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Media Card task"
                                            height="140"
                                            image={imgs[card]}/>
                                        <CardContent className={classes.content}>
                                            <Typography gutterBottom variant="h5" component="h2">{imgs[card]}</Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">{headers[card]}</Typography>
                                        </CardContent>
                                    </CardActionArea>    
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={
                                                (e) => this.handleViewClick(headers[card], desciptions[card], imgs[card])
                                            }>View Task Details</Button>
                                        <Button size="small" color="primary">Play</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Dialog
                    onClose={this.state.handleViewClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.viewDialogOpen}
                    transitionDuration={500}>

                      <DialogTitle id="customized-dialog-title" onClose={this.handleViewClose}>
                        {this.state.viewDialogTitleText}
                      </DialogTitle>
                      <DialogContent dividers>
                        <Typography gutterBottom>
                            {this.state.viewDialogDescriptionText}
                        </Typography>
    
                        <Typography gutterBottom>
                          <Card style={{display: 'flex', flexDirection: 'column'}}>
                            <CardMedia component="img" alt="Media Card task" height="100%" image={this.state.viewDialogImageUrl}/>
                          </Card>
                        </Typography>

                        <Typography gutterBottom>
                            SuperMath is designed to help students transition from counting or calculating to recalling the basic arithmetic facts.
                            The timer allows SuperMath to distinguish a recalled answer from a counted or calculated answer.
                            The default three-second mastery threshold is carefully selected to be long enough to type in a recalled answer,
                            but not long enough for the student to comfortably enter a counted or calculated answer.
                            Via Settings, we have added the ability to hide/pause the timer, though student answers are still evaluated.
                            With less time pressure, students may not answer as quickly as they can, potentially resulting in lower scores
                            or slower progress than they might otherwise achieve.
                        </Typography>
                      </DialogContent>
                </Dialog>
          </main>
        );
    }
}
