﻿import React from 'react';

import {Typography, Container, Grid, Button} from '@material-ui/core';
import {Card, CardActions, CardActionArea, CardContent, CardMedia} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import logo1 from './../../images/tasks/task_1.jpg';
import logo2 from './../../images/tasks/task_2.jpg';
import logo3 from './../../images/tasks/task_3.jpg';

import logo4 from './../../images/tasks/task_4.jpg';
import logo5 from './../../images/tasks/task_5.jpg';
import logo12 from './../../images/tasks/task_12.jpg';

import logo7 from './../../images/tasks/task_7.jpg';
import logo6 from './../../images/tasks/task_6.jpg';
import logo13 from './../../images/tasks/task_13.jpg';

import classes from './../../index.css';

import SMDialogInfo from "./info";
import TwoDigitGame from "./../games/twodigitgame";
import ThreeDigitGame from "./../games/threedigitgame";
import ComparisonGame from "./../games/comparisongame";
import OperationGame from "./../games/operationgame";

const task_amount = 1;

var desciptions = [
    "Tasks for Comparision of one-digit numbers (from 0 to 9), where kids can use only three operations: more (>), less (<) and equal (=). There are two one digit numbers displayed with questionmark in between.",
    "Tasks for Addition of one-digit numbers. Kids have to add two simple one digit numbers, where the result of addition can be an one (example, 2+2=4) or two digit number (9+9=18)",
    "Tasks for Subtraction of one-digit numbers. The result of subtraction can be is zero (example, 3-3=0) or a one-digit number (example, 8-4=5)",

    "Tasks for Addition and Subtraction of two one-digit numbers. The result of addition can be an one or two digit number, the result of subtraction is zero or a one-digit number",
    "Tasks for Math operation determination: Addition (+) or Subtraction (-). Kids have two one digit numbers and result of operation with that numbers. Based on operation result, they have to understand what it was: Addition (+) or Subtraction (-)",
    "Tasks for Addition and Subtraction of three one-digit numbers. The result of addition can be an one (example, 1+1+1=3) or two digit number (example, 7+8+9=24), the result of subtraction can be zero (example, 9-5-4=0) or a one-digit number (example, 8-1-1=6)",

    "Tasks for Addition and Subtraction of one and two -digit numbers. This is basic level, where one digit number is in range of 1...9 and two digit number is in range of 10...20. The result of Addition can be only two digit number (example, 1+10=11) and Substruction can be zero or one digit number",
    "Tasks for Addition and Subtraction of round tens numbers from 10 to 100, in other words 10, 20, 30, 40, 50, 60, 70, 80, 90 and 100. Kids have to Add or Sub two tens number. Results can be zero (example, 40-40=0), two digit number (example, 20-30=50 or 80-70=10) or three digit number (90+90=180)",
    "Tasks for Addition and Subtraction of one digit numbers and round tens numbers from 10 to 100 (numbers 10, 20, 30 ... 100). ",
];

const games = [
    {id: 1, logo: logo1, type: 'co', task: '<>=,0-10,1', amount: task_amount, desc: desciptions[0], head: 'Tasks for simple Comparision of one-digit numbers (from 0 to 10)'},
    {id: 2, logo: logo2, type: '2d', task: '+,0-10,0-10,1,1', amount: task_amount, desc: desciptions[1], head: 'Tasks for Addition of one-digit numbers (from 0 to 10)'},
    {id: 3, logo: logo3, type: '2d', task: '-,0-10,0-10,1,1', amount: task_amount, desc: desciptions[2], head: 'Tasks for Subtraction of one-digit numbers (from 0 to 10)'},

    {id: 4, logo: logo4, type: '2d', task: '+-,0-10,0-10,1,1', amount: task_amount, desc: desciptions[3], head: 'Tasks for Addition and Subtraction of TWO one-digit numbers (from 0 to 10)'},
    {id: 5, logo: logo5, type: 'op', task: '+-,1-10,0-10,1,1', amount: task_amount, desc: desciptions[4], head: 'Tasks for Math operation (Addition or Subtraction) determination'},
    {id: 6, logo: logo12, type: '3d', task: '+-,0-10,1', amount: task_amount, desc: desciptions[5], head: 'Tasks for Addition and Subtraction of THREE one-digit numbers'},

    {id: 7, logo: logo7, type: '2d', task: '+-,1-9,10-20,1,1', amount: task_amount, desc: desciptions[6], head: 'Tasks for Addition and Subtraction of one- and two- digit numbers'},
    {id: 8, logo: logo6, type: '2d', task: '+-,0-10,0-10,10,10', amount: task_amount, desc: desciptions[7], head: 'Tasks for of round tens from 10 to 100 (i.e. numbers like 10, 20, ... 100)'},
    {id: 9, logo: logo13, type: '2d', task: '+-,0-10,0-10,10,1', amount: task_amount, desc: desciptions[8], head: 'Tasks for Addition and Subtraction of one- digit numbers and tens'},
];

export default class White extends React.Component {
    constructor(props) {
        super(props);

        this.onInfoOpen = this.onInfoOpen.bind(this);
        this.onInfoClose = this.onInfoClose.bind(this);

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
                      taskTerms: '',
                      taskAmount: 0};
    }

    onInfoOpen(head, desc, logo, task) {
        this.setState({infoOpen: true,
                       infoTitle: head,
                       infoText: desc,
                       infoIURL: logo,
                       // taskTerms: task,
                    });
    }

    onInfoClose(type, task_id) {
        // console.log('onInfoClose ' + type + ', task_id: ' + task_id);
        this.setState({infoOpen: false});
        if (type === 'play') {
            this.onGameOpen(task_id);
        }
    }

    onGameOpen(type, task, amount) {
        console.log('onGameOpen ' + type + ', task: ' + task + ', amount: ' + amount);
        if (type === '2d') {
            this.setState({game2DOpen: true, taskTerms: task, taskAmount: amount});
        } else if (type === '3d') {
            this.setState({game3DOpen: true, taskTerms: task, taskAmount: amount});
        } else if (type === 'co') {
            this.setState({gameCoOpen: true, taskTerms: task, taskAmount: amount});
        } else if (type === 'op') {
            this.setState({gameOpOpen: true, taskTerms: task, taskAmount: amount});
        }
    }

    onGameClose(status) {
        console.log("White:: onGameClose: " + status);
        // set all types of games as false
        this.setState({game2DOpen: false,
                       game3DOpen: false,
                       gameCoOpen: false,
                       gameOpOpen: false});

        if (status === 'finished') {
            this.props.onUpdate(status);
        }
    }

    render() {
        return (
                <Container className={classes.grid} maxWidth="md">
                    <Grid container spacing={3}>
                        {games.map((game, key) => (
                            <Grid item key={game.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardActionArea onClick={(e) => this.onGameOpen(game.type, game.task, game.amount)}>
                                        <CardMedia component="img" alt="Game task" height="140" image={game.logo}/>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">{game.head}</Typography>
                                        </CardContent>
                                    </CardActionArea>    
                                    <CardActions>
                                        <Button size="small" color="primary" startIcon={<VisibilityIcon />}
                                                onClick={(e) => this.onInfoOpen(game.head, game.desc, game.logo, game.task)}>View Details</Button>
                                        <Button size="small" color="primary" startIcon={<PlayCircleFilledWhiteIcon />}
                                                onClick={(e) => this.onGameOpen(game.type, game.task, game.amount)}>Play</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <SMDialogInfo open={this.state.infoOpen}
                                  title={this.state.infoTitle}
                                  text={this.state.infoText}
                                  imgUrl={this.state.infoIURL}
                                  task={this.state.taskTerms}
                                  onClick={this.onInfoClose}/>

                    <TwoDigitGame open={this.state.game2DOpen}
                                  task={this.state.taskTerms}
                                  count={this.state.taskAmount}
                                  onClick={this.onGameClose}/>

                    <ThreeDigitGame open={this.state.game3DOpen}
                                    task={this.state.taskTerms}
                                    count={this.state.taskAmount}
                                    onClick={this.onGameClose}/>

                    <ComparisonGame open={this.state.gameCoOpen}
                                    task={this.state.taskTerms}
                                    count={this.state.taskAmount}
                                    onClick={this.onGameClose}/>

                    <OperationGame open={this.state.gameOpOpen}
                                   task={this.state.taskTerms}
                                   count={this.state.taskAmount}
                                   onClick={this.onGameClose}/>

                </Container>
        );
    }
}
