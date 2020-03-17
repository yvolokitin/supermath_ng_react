import React from 'react';

import {Typography, Container, Grid, Button} from '@material-ui/core';
import {Card, CardActions, CardActionArea, CardContent, CardMedia} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import logo1 from './../../images/tasks/green_1.jpg';
import logo2 from './../../images/tasks/green_2.jpg';
import logo3 from './../../images/tasks/green_3.jpg';

import logo4 from './../../images/tasks/green_4.jpg';
import logo5 from './../../images/tasks/green_5.jpg';
import logo6 from './../../images/tasks/green_6.jpg';

import logo7 from './../../images/tasks/green_7.jpg';
import logo8 from './../../images/tasks/green_8.jpg';
import logo9 from './../../images/tasks/green_9.jpg';

import classes from './../../index.css';

import SMDialogInfo from "./info";
import DigitGame from "./../games/digitgame";

const task_amount = 30;

var desciptions = [
    'Tasks for multiplication of one-digit numbers from 0 to 5. Multiplication often denoted by the cross symbol x or by an asterisk * or dot. For example: 3 x 1 = 3, 3 x 3 = 9 or 5 x 3 = 15. In total, it is ' + task_amount + ' tasks per one exercise.',
    'Tasks for multiplication of one-digit numbers from 0 to 10 (10 is exception and is only one two digit number). Multiplication often denoted by the cross symbol x or by an asterisk * or dot. For example: 7 x 3 = 21, 5 x 6 = 30 or 8 x 8 = 64. In total, it is ' + task_amount + ' tasks per one exercise.',
    'Tasks for multiplication of one-digit numbers from 0 to 10 (10 is exception and is only one two digit number). Multiplication often denoted by the cross symbol x or by an asterisk * or dot. For example: 7 x 3 = 21, 5 x 6 = 30 or 8 x 8 = 64. In total, it is ' + task_amount + ' tasks per one exercise.',

    'Division of two numbers, where divider and result are one-digit number. Division is one of the four basic operations of arithmetic, the ways that numbers are combined to make new numbers. Several symbols are used for the division operator, like the colon (:) and the slash (/).',
    'Division of two numbers, where divider is one-digit number and result is two-digit number. The colon (:) is used as the division operator. For example, 340 : 4 = ? (result is 85) OR 195 : 5 = ? (result is 39).',
    'Multiplication and Division of three numbers, where one-digit numbers are used for Multiplication and two digit-number for dividend of Division operation. The first calculation should be always the Division even if it is not the first operation (Otherwise, solution will be quite complex). For example, 28 : 7 x 9 = ? (result is 36) OR 6 x 36 : 9 = ? (result is 24).',

    'Addition, Subtraction and Multiplication of 4 or 5 numbers. Kids have to determiny the right secuance of operatnios (Multiplication always goes before Addition and Subtraction), make correct calculation and answer. Multiplication happaned between one-digit numbers only, when Addition and Subtraction can use two-digit numbers. It can be at least one Multiplication (two in most cases).',
    'Long Addition and Subtraction of three three-digit numbers in range of 100 ... 999. The numbers are added a column and should be solved from right to left direction. For example, 623 + 116 - 316 = ? (result is 423) OR 863 - 474 + 275 = ? (result is 664).',
    'Addition and Subtraction of four numbers, where each number has different length: one-digit, two-digit, three- and four-digit. For example, 4051 + 655 + 70 + 5 = ? (result is 4781).',
];

const games = [
    {id: 1, logo: logo1, type: '2digits', task: '*,0-5,0-5,1,1', amount: task_amount, desc: desciptions[0], head: 'Multiplication two one-digit number from 0 to 5'},
    {id: 2, logo: logo2, type: '2digits', task: '*,1-10,1-10,1,1', amount: task_amount, desc: desciptions[1], head: 'Multiplication two one-digit number from 0 to 10'},
    // exclude multiplacation to ZERO (o) due to issue with many possible options, like 0x1=0, 0x2=0 etc.
    {id: 3, logo: logo3, type: '2digit_arg', task: 'd,*,1-10,1-10,1,1', amount: task_amount, desc: desciptions[2], head: 'Multiplication two one-digit number from 1 to 10'},

    {id: 4, logo: logo4, type: '2digits', task: ':,1-10,1-10,1,1', amount: task_amount, desc: desciptions[3], head: 'Division of two numbers, where divider and result are one digit'},
    {id: 5, logo: logo5, type: '2digits', task: ':,11-99,2-9,1,1', amount: task_amount, desc: desciptions[4], head: 'Division of two numbers with unknown dividend or divisor'},
    {id: 6, logo: logo6, type: '3digits', task: '*:,0-10,1', amount: task_amount, desc: desciptions[5], head: 'Multiplication and Division of three numbers'},

    {id: 7, logo: logo7, type: 'line_5numbers', task: '-*,5,0-10,1', amount: task_amount, desc: desciptions[6], head: 'Addition, Subtraction and Multiplication of 4 or 5 numbers'},
    {id: 8, logo: logo8, type: 'digit_3column', task: '+-,100-999,1', amount: task_amount, desc: desciptions[7], head: 'Addition and Subtraction of three numbers (100..999)'},
    {id: 9, logo: logo9, type: 'line_4numbers', task: '+-,1-999,1', amount: task_amount, desc: desciptions[8], head: 'Addition and Subtraction of four numbers'},
];

export default class Green extends React.Component {
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
        console.log('White.onGameOpen ' + type + ', task: ' + task + ', amount: ' + amount);
        this.setState({gameOpen: true, gameType: type, gameTerm: task, gameAmnt: amount});
    }

    onGameClose(status) {
        console.log('GREEN.onGameClose: ' + status);
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
                               belt='green'
                               onClose={this.onGameClose}/>

                </Container>
        );
    }
}
