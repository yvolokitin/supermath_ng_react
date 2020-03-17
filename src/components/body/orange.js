import React from 'react';

import {Typography, Container, Grid, Button} from '@material-ui/core';
import {Card, CardActions, CardActionArea, CardContent, CardMedia} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import logo1 from './../../images/tasks/orange_1.jpg';
import logo2 from './../../images/tasks/orange_2.jpg';
import logo3 from './../../images/tasks/orange_3.jpg';

import logo4 from './../../images/tasks/orange_4.jpg';
import logo5 from './../../images/tasks/orange_5.jpg';
import logo6 from './../../images/tasks/orange_6.jpg';

import logo7 from './../../images/tasks/orange_7.jpg';
import logo8 from './../../images/tasks/orange_8.jpg';
import logo9 from './../../images/tasks/orange_9.jpg';

import classes from './../../index.css';

import SMDialogInfo from "./info";
import DigitGame from "./../games/digitgame";

const task_amount = 30;

var desciptions = [
    'Tasks for two-digit numbers (from 10 to 99) sequences, where kids have three consecutive numbers (for example: 1, 2, 3) and have to understand the next (fourth - 4). The last number displayed with questionmark. Number sequences can be ascending (example, 31-32-33-?) and descending (example, 82-81-80-?).',
    'Tasks for Comparision of two two-digit numbers (from 10 to 99), where kids can use only three operations: more (>), less (<) and equal (=). There are two two-digit numbers, which are displayed with questionmark in between (For example, 88 ? 74 OR 23 ? 34 OR 55 ? 55).',
    'Tasks for Addition and Subtraction of one-digit (o..10) and two-digit (10..20) numbers. This is basic level, where the one-digit number is in range of 1...9 and two-digit number is in range of 10...20. For example, 18 - 1 = ? (result is 17) OR 17 + 9 = ? (result is 26).',

    'Tasks for Addition and Subtraction of round tens numbers from 10 to 100, in other words 10, 20, 30, 40, 50, 60, 70, 80, 90 and 100. Kids have to Add or Sub two tens number. The Result can be Zero (for example, 40 - 40 = 0), two digit number (for example, 20 + 30 = 50 or 80 - 70 = 10) or three digit number (90 + 90 = 180).',
    'Tasks for Addition and Subtraction of one-digit number and tens numbers from 10 to 100 (10, 20, 30, 40, 50, 60, 70, 80, 90 and 100). Kids have to Add or Sub two numbers. For example, 70 - 4 = ? (result is 66) OR 3 + 40 = ? (result is 34).',
    'Tasks for Addition and Subtraction of one- and two- digit numbers.',

    'Tasks for Addition and Subtraction of two two-digit numbers, where numbers are in range from 10 to 100 (100 is the only three digit number, which is exception). The results pf operation can be Zero, one-, two- and three-digit number. For example, 85 - 51 = ? (result is 34) OR 88 + 24 = ? (result is 122).',
    'Tasks for Long Addition and Subtraction of round numbers - Hundreds and Tens. Two numbers should be resulted in column and each number may contain Hundreds and Tens. For example, 420 + 950 = ? (result is 1370) OR 390 - 20 = ? (result is 370).',
    'Tasks for Long Addition and Subtraction of two- and three-digit numbers. The numbers are added a column and should be solved from right to left direction. 862 + 96 = ? (result is 958) OR 280 - 41 = ? (result is 239).',
];

const games = [
    {id: 1, logo: logo1, type: 'linedigits', task: '10-97', amount: task_amount, desc: desciptions[0], head: 'Tasks for determination of two digit number from sequance'},
    {id: 2, logo: logo2, type: 'comp_nums', task: '<>=,10-99,1', amount: task_amount, desc: desciptions[1], head: 'Comparision of two-digit numbers (from 10 to 100)'},
    {id: 3, logo: logo3, type: '2digits', task: '+-,0-10,10-20,1,1', amount: task_amount, desc: desciptions[2], head: 'Addition and Subtraction of two (10..20) and one-digit numbers'},

    {id: 4, logo: logo4, type: '2digits', task: '+-,0-10,0-10,10,10', amount: task_amount, desc: desciptions[3], head: 'Addition and Subtraction of round numbers (10, 20, ... 100)'},
    {id: 5, logo: logo5, type: '2digits', task: '+-,1-10,1-10,10,1', amount: task_amount, desc: desciptions[4], head: 'Addition and Subtraction of round and one-digit numbers (0..10)'},
    {id: 6, logo: logo6, type: '2digits', task: '+-,0-10,10-100,1,1', amount: task_amount, desc: desciptions[5], head: 'Addition and Subtraction of one-digit and two-digit numbers'},

    {id: 7, logo: logo7, type: '2digits', task: '+-,10-100,10-100,1,1', amount: task_amount, desc: desciptions[6], head: 'Addition and Subtraction of two two-digit numbers'},
    {id: 8, logo: logo8, type: 'digit_2column', task: '+-,1-99,1-99,10,10', amount: task_amount, desc: desciptions[7], head: 'Long Addition and Subtraction of round numbers'},
    {id: 9, logo: logo9, type: 'digit_2column', task: '+-,10-100,100-999,1,1', amount: task_amount, desc: desciptions[8], head: 'Long Addition and Subtraction of two- and three- digit numbers'},
];

export default class Orange extends React.Component {
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
                      gameInfo: false,
                      gameOpen: false,
                      gameType: '',
                      gameTerm: '',
                      gameAmnt: 0};
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
        console.log('Orange.onGameOpen ' + type + ', task: ' + task + ', amount: ' + amount);
        this.setState({gameOpen: true, gameType: type, gameTerm: task, gameAmnt: amount});
    }

    onGameClose(status) {
        console.log("Orange.onGameClose: " + status);
        // set all types of games as false
        this.setState({gameOpen: false});
        if (status === 'close') {
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

                    <DigitGame open={this.state.gameOpen}
                               type={this.state.gameType}
                               task={this.state.gameTerm}
                               amount={this.state.gameAmnt}
                               belt='orange'
                               onClose={this.onGameClose}/>

                </Container>
        );
    }
}
