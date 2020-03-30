import React from 'react';

import {Typography, Container, Grid, Button} from '@material-ui/core';
import {Card, CardActions, CardActionArea, CardContent, CardMedia} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import logo1 from './../../images/tasks/navi_1.jpg';
import logo2 from './../../images/tasks/navi_2.jpg';
import logo3 from './../../images/tasks/navi_3.jpg';

import logo4 from './../../images/tasks/navi_4.jpg';
import logo5 from './../../images/tasks/navi_5.jpg';
import logo6 from './../../images/tasks/navi_6.jpg';

import logo7 from './../../images/tasks/navi_7.jpg';
import logo8 from './../../images/tasks/navi_8.jpg';
import logo9 from './../../images/tasks/navi_9.jpg';

import classes from './../../index.css';

import Info from './info';
import DigitGame from './../games/digitgame';

import {navi_titles, navi_descriptions} from './../halpers/navi';

const task_amount = 30;
const games = [
    {id: 1, logo: logo1, type: 'digit_3column', task: '+-,100-999,1', amount: task_amount},
    {id: 2, logo: logo2, type: 'digit_2column', task: '*,10-999,10-999,1,1', amount: task_amount},
    {id: 3, logo: logo3, type: 'none', task: '', amount: task_amount},
    {id: 4, logo: logo4, type: 'none', task: '', amount: task_amount},
    {id: 5, logo: logo5, type: 'none', task: '', amount: task_amount},
    {id: 6, logo: logo6, type: 'none', task: '', amount: task_amount},
    {id: 7, logo: logo7, type: 'none', task: '', amount: task_amount},
    {id: 8, logo: logo8, type: 'none', task: '', amount: task_amount},
    {id: 9, logo: logo9, type: 'none', task: '', amount: task_amount},
];

export default class Navi extends React.Component {
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
        this.setState({infoOpen: true,
                       infoTitle: navi_titles[this.props.lang][id],
                       infoText: navi_descriptions[this.props.lang][id],
                       infoIURL: logo,
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
        console.log('NAVI.onGameClose: ' + status);
        // set all types of games as false
        this.setState({gameOpen: false});
        if (status === 'close') {
            this.props.onUpdate(status);
        }
    }

    render() {
        return (
            <Container className={classes.grid} maxWidth='md'>
                <Grid container spacing={3}>
                    {games.map((game, key) => (
                        <Grid item key={game.id} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardActionArea onClick={(e) => this.onGameOpen(game.type, game.task, game.amount)}>
                                    <CardMedia component='img' alt='Game task' height='140' image={game.logo}/>
                                    <CardContent>
                                        <Typography variant='body2' color='textSecondary' component='p'>
                                            {navi_titles[this.props.lang][game.id]}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>    
                                <CardActions>
                                    <Button size='small' color='primary' startIcon={<VisibilityIcon/>}
                                            onClick={(e) => this.onInfoOpen(game.id, game.logo, game.task)}>
                                                {this.props.info}
                                    </Button>
                                    <Button size='small' color='primary' startIcon={<PlayCircleFilledWhiteIcon/>}
                                            onClick={(e) => this.onGameOpen(game.type, game.task, game.amount)}>
                                                {this.props.play}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Info open={this.state.infoOpen}
                      title={this.state.infoTitle}
                      text={this.state.infoText}
                      imgUrl={this.state.infoIURL}
                      task={this.state.taskTerms}
                      lang={this.props.lang}
                      onClick={this.onInfoClose}/>

                <DigitGame open={this.state.gameOpen}
                           type={this.state.gameType}
                           task={this.state.gameTerm}
                           amount={this.state.gameAmnt}
                           lang={this.props.lang}
                           belt='navi'
                           onClose={this.onGameClose}/>
            </Container>
        );
    }
}
