import React from 'react';

import {Typography, Container, Grid, Button} from '@material-ui/core';
import {Card, CardActions, CardActionArea, CardContent, CardMedia} from '@material-ui/core';

import logo1 from './../../images/ru_white_1.jpg';
import logo2 from './../../images/ru_white_2.jpg';
import logo3 from './../../images/ru_white_3.jpg';
import logo4 from './../../images/ru_white_4.jpg';
import logo5 from './../../images/ru_white_5.jpg';
import logo6 from './../../images/ru_white_6.jpg';
import logo7 from './../../images/ru_white_7.jpg';
import logo8 from './../../images/ru_white_8.jpg';
import logo9 from './../../images/ru_white_9.jpg';

import classes from './../../index.css';

import SMDialogInfo from "./info";
import SMSimpleGame from "./../games/simplegame";

const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const images = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9];

const titles = [
    "One-digit Comparision",
    "One-digit Addition",
    "One-digit Subtraction",
    "One-digit Addition & Subtraction",
    "Determination operation",
    "Two-digit Comparision",
    "Addition and Subtraction rounds",
    "One- & Two- digit Addition & Subtraction",
    "Two- digit Addition & Subtraction"
];

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
export default class SMBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {infoOpen: false,
                      viewDialogTitleText: "",
                      viewDialogDescriptionText: "",
                      viewDialogImageUrl: "",
                      gameOpen: false,
                      gameInfo: false};
        this.handleInfoOpen = this.handleInfoOpen.bind(this);
        this.handleGameOpen = this.handleGameOpen.bind(this);
    }
    handleInfoOpen(card_id) {
        this.setState({infoOpen: true });
        this.setState({infoTitle: headers[card_id]});
        this.setState({infoText: desciptions[card_id]});
        this.setState({infoIURL: images[card_id]});
    }
    handleGameOpen(card_id) {
        this.setState({gameOpen: true});
    }

    render() {
        const section = {
            width: '100%',
            marginTop: '2%',
            backgroundColor: 'white',
            fontFamily: "Grinched",
            fontVariant: "small-caps",
            color: "green",
        }

        return (
            <main>
                <Typography variant="h1" align="center" style={section} paragraph>
                    SuperMath 
                </Typography>

                <Container className={classes.grid} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map(card => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardActionArea onClick={(e) => this.handleGameOpen(card)}>
                                        <CardMedia component="img" alt="Media Card task" height="140" image={images[card]}/>
                                        <CardContent className={classes.content}>
                                            <Typography gutterBottom variant="h5" component="h2">{titles[card]}</Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">{headers[card]}</Typography>
                                        </CardContent>
                                    </CardActionArea>    
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={(e) => this.handleInfoOpen(card)}>View Task Details</Button>
                                        <Button size="small" color="primary" onClick={(e) => this.handleGameOpen(card)}>Play</Button>
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

                    <SMSimpleGame open={this.state.gameOpen}
                                  onClick={() => this.setState({gameOpen: false})}/>
                </Container>
          </main>
        );
    }
}
