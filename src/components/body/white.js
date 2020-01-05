import React from 'react';

import {Typography, Container, Grid, Button} from '@material-ui/core';
import {Card, CardActions, CardActionArea, CardContent, CardMedia} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import logo2 from './../../images/tasks/task_2.jpg';
import logo3 from './../../images/tasks/task_3.jpg';
import logo4 from './../../images/tasks/task_4.jpg';

import logo6 from './../../images/tasks/task_6.jpg';
import logo7 from './../../images/tasks/task_7.jpg';
import logo8 from './../../images/tasks/task_8.jpg';

import logo9 from './../../images/tasks/task_9.jpg';
import logo10 from './../../images/tasks/task_10.jpg';
import logo11 from './../../images/tasks/task_11.jpg';

import classes from './../../index.css';

import SMDialogInfo from "./info";
import TwoDigitGame from "./../games/twodigitgame";

// cards.length = 9
const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const images = [
    logo2,
    logo3,
    logo4,

    logo6,
    logo7,
    logo8,

    logo9,
    logo10,
    logo11,
];

var tasks = [
    ['+', '0,10', '0,10', 1, 1],
    ['-', '0,10', '0,10', 1, 1],
    ['+-', '0,10', '0,10', 1, 1],

    ['+-', '0,10', '0,10', 10, 10],
    ['+-', '0,10', '10,20', 1, 1],
    ['+-', '0,10', '10,100', 1, 1],

    ['+-', '0,100', '0,10', 10, 10],
    ['+-', '10,100', '10,100', 1, 1],
    ['*', '0,10', '0,10', 1, 1],
];
/*
const titles = [
    "One-digit Numbers Addition",
    "One-digit Numbers Subtraction",
    "One-digit Addition & Subtraction",

    "Addition and Subtraction of tens/rounds",
    "One- & Two- digit Addition & Subtraction (basic)",
    "One- & Two- digit Addition & Subtraction (advanced)",

    "Tens and Hungred Add & Sub",
    "Two-digit Addition & Subtraction",
    "One-digit Multiplication",
];
*/
const headers = [
    "Tasks for Addition of one-digit numbers (from 0 to 10)",
    "Tasks for Subtraction of one-digit numbers (from 0 to 10)",
    "Tasks for Addition and Subtraction of one-digit numbers (from 0 to 10)",

    "Tasks for Addition and Subtraction of round tens from 10 to 100 (i.e. numbers like 10, 20, ... 100)",
    "Tasks for Addition and Subtraction of one- and two- digit numbers, Basic level",
    "Tasks for Addition and Subtraction of two- and two- digit numbers, Adnanced level",

    "Addition and Subtraction of hunred and tens",
    "Tasks for Addition and Subtraction of two-digit numbers",
    "Tasks for Multiplcation of one-digit numbers (from 0 to 10)",
];

var desciptions = [
    // "Tasks for kids in age 3 - 6 years for Comparision of one-digit numbers (from 0 to 9), where you can to use only more (>), less (<) and equal (=) labels and have 10 seconds timeout to solve each task",
    "Tasks for kids in age 3 - 6 years for Addition of one-digit numbers. The result of addition can be an one or two digit number, the result of subtraction is zero or a one-digit number",
    "Tasks for kids in age 3 - 6 years for Subtraction of one-digit numbers. The result of addition can be an one or two digit number, the result of subtraction is zero or a one-digit number",
    "Tasks for kids in age 3 - 6 years for Addition and Subtraction of one-digit numbers. The result of addition can be an one or two digit number, the result of subtraction is zero or a one-digit number",
    // "Tasks for kids in age 3 - 6 years for Understanding of one of two mathematical operation: addition or subtraction. You will know both arguments (numbers), the result of an operation and have 10 seconds timeout to solve each task",
    // "Tasks for kids in age 3 - 6 years for Comparision of two-digit numbers (from 0 to 9), where you can to use only more (>), less (<) and equal (=) labels and have 10 seconds timeout to solve each task",

    "Tasks for kids in age 3 - 6 years for Addition and Subtraction of round tens numbers from 10 to 100 (numbers 10, 20, 30 ... 100). You have 10 seconds timeout to solve each task.",
    "Tasks for kids in age 3 - 6 years for Addition and Subtraction of one- and two- digit numbers. Basic level, where one number is in range 0..10 and second one is in 10..20.",
    "Tasks for kids in age 3 - 6 years for Addition and Subtraction of two-digit numbers. Advamced level, where one number is in range 0..10 and second one is in 10..100. The result of addition can be an two (for example 9+13=22) or three digit number (for example 9+99=108), the result of subtraction is two or one digit number or zero",

    "Tasks for kids in age 3 - 6 years for Addition and Subtraction of round hundred and tens numbers from 10 to 100 (numbers 10, 20, 30 ... 100, 110 .... 1000). You have 10 seconds timeout to solve each task",
    "Tasks for kids in age 3 - 6 years for Addition and Subtraction of two-digit numbers. Each number is a random number in range from 10 to 100. The result of addition can be an two or three digit number, the result of subtraction is two or one digit number or zero",
    "Tasks for kids in age 3 - 6 years for Multiplication of one-digit numbers. ",
];

export default class White extends React.Component {
    constructor(props) {
        super(props);
        this.state = {infoOpen: false,
                      viewDialogTitleText: '',
                      viewDialogDescriptionText: '',
                      viewDialogImageUrl: '',
                      gameOpen: false,
                      gameInfo: false,
                      gameRslt: false,
                      percent: 0,
                      passed: 0,
                      failed: 0,
                      taskNumber: 0};
        this.onInfoOpen = this.onInfoOpen.bind(this);

        this.onGameOpen = this.onGameOpen.bind(this);
        this.onGameClose = this.onGameClose.bind(this);

        this.onResultsClose = this.onResultsClose.bind(this);
    }

    onInfoOpen(card_id) {
        this.setState({infoOpen: true,
                       infoTitle: headers[card_id],
                       infoText: desciptions[card_id],
                       infoIURL: images[card_id]});
    }

    onGameOpen(task_id) {
        this.setState({gameOpen: true,
                       taskNumber: task_id});
    }

    onGameClose(status, details) {
        console.log("onGameClose:: " + status);
        if (status === "finished") {
            var percent_passed = 100 * details.passed / details.counter;
            this.setState({gameOpen: false,
                           gameRslt: true,
                           passed: details.passed,
                           failed: details.failed,
                           percent: percent_passed});
        } else {
            this.setState({gameOpen: false,
                           gameRslt: false});
        }
    }

    onResultsClose(status) {
        if (status === 'close') {
            this.setState({gameRslt: false});

        } else if (status === 'replay') {
            this.setState({gameRslt: false,
                           gameOpen: true});

        } else {
            console.log("onResultsClose called");
        }
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

                    <TwoDigitGame open={this.state.gameOpen}
                                  task={tasks[this.state.taskNumber]}
                                  count={50}
                                  onClick={this.onGameClose}/>

                </Container>
        );
    }
}
