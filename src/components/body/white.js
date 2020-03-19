import React from 'react';

import {Typography, Container, Grid, Button} from '@material-ui/core';
import {Card, CardActions, CardActionArea, CardContent, CardMedia} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import logo1 from './../../images/tasks/white_1.jpg';
import logo2 from './../../images/tasks/white_2.jpg';
import logo3 from './../../images/tasks/white_3.jpg';

import logo4 from './../../images/tasks/white_4.jpg';
import logo5 from './../../images/tasks/white_5.jpg';
import logo6 from './../../images/tasks/white_6.jpg';

import logo7 from './../../images/tasks/white_7.jpg';
import logo8 from './../../images/tasks/white_8.jpg';
import logo9 from './../../images/tasks/white_9.jpg';

import classes from './../../index.css';

import SMDialogInfo from "./info";
import DigitGame from "./../games/digitgame";

import {white_titles, white_descriptions} from './../halpers/constants';

const task_amount = 30;
const games = [
    {id: 1, logo: logo1, type: 'linedigits', task: '0-7', amount: task_amount},
    {id: 2, logo: logo2, type: 'comp_nums', task: '<>=,0-10,1', amount: task_amount},
    {id: 3, logo: logo3, type: '2digits', task: '+,0-10,0-10,1,1', amount: task_amount},
    {id: 4, logo: logo4, type: '2digits', task: '-,0-10,0-10,1,1', amount: task_amount},
    {id: 5, logo: logo5, type: '2digits', task: '+-,0-10,0-10,1,1', amount: task_amount},
    {id: 6, logo: logo6, type: '2digit_arg', task: 'o,+-,1-10,1-10,1,1', amount: task_amount},
    {id: 7, logo: logo7, type: '3digits', task: '+-,0-10,1', amount: task_amount},
    {id: 8, logo: logo8, type: 'comp_expr', task: '<>=,+-,0-10,1', amount: task_amount},
    {id: 9, logo: logo9, type: '2digit_arg', task: 'd,+-,0-10,0-10,1,1', amount: task_amount},
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
                      gameInfo: false,
                      gameOpen: false,
                      gameType: '',
                      gameTerm: '',
                      gameAmnt: 0};
    }

    onInfoOpen(id, logo, task) {
        var title = white_titles[this.props.lang][id];
        var descr = white_descriptions[this.props.lang][id];
        this.setState({infoOpen: true,
                       infoTitle: title,
                       infoText: descr,
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
        console.log("White.onGameClose: " + status);
        // set all types of games as false
        this.setState({gameOpen: false});
        this.props.onUpdate(status);
    }

    render() {
        return (
            <Container className={classes.grid} maxWidth="md">
                <Grid container spacing={3}>
                    {games.map((game, key) => (
                        <Grid item key={game.id} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardActionArea onClick={(e) => this.onGameOpen(game.type, game.task, game.amount)}>
                                    <CardMedia component='img' alt='Game task' height='140' image={game.logo}/>
                                    <CardContent>
                                        <Typography variant='body2' color='textSecondary' component='p'>
                                            {white_titles[this.props.lang][game.id]}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>    
                                <CardActions>
                                    <Button size="small" color="primary" startIcon={<VisibilityIcon />}
                                            onClick={(e) => this.onInfoOpen(game.id, game.logo, game.task)}>View Details</Button>
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
                           belt='white'
                           onClose={this.onGameClose}/>
            </Container>
        );
    }
}
