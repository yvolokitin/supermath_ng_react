import React from 'react';
import { Typography, Container, Button, Grid, Card, CardActions, CardActionArea, CardContent} from '@material-ui/core';

import classes from './index.css';
import SMDialog from "./SMDialog";

const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const imgs = [
    './imgs/ru_white_1.jpg',
    './imgs/ru_white_2.jpg',
    './imgs/ru_white_3.jpg',
    './imgs/ru_white_4.jpg',
    './imgs/ru_white_5.jpg',
    './imgs/ru_white_6.jpg',
    './imgs/ru_white_7.jpg',
    './imgs/ru_white_8.jpg',
    './imgs/ru_white_9.jpg'
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
    "Typical tasks for kids in age 3 - 6 years for <b>Comparision</b> of one-digit numbers (from 0 to 9), where you can to use only more (>), less (<) and equal (=) labels and have 10 seconds timeout to solve each task",
    "Typical tasks for kids in age 3 - 6 years for <b>Addition</b> of one-digit numbers. The result of addition can be an one or two digit number, the result of subtraction is zero or a one-digit number",
    "Typical tasks for kids in age 3 - 6 years for <b>Subtraction</b> of one-digit numbers. The result of addition can be an one or two digit number, the result of subtraction is zero or a one-digit number",
    "Typical tasks for kids in age 3 - 6 years for <b>Addition</b> and <b>Subtraction</b> of one-digit numbers. The result of addition can be an one or two digit number, the result of subtraction is zero or a one-digit number",
    "Typical tasks for kids in age 3 - 6 years for <b>Understanding</b> of one of two mathematical operation: addition or subtraction. You will know both arguments (numbers), the result of an operation and have 10 seconds timeout to solve each task",
    "Typical tasks for kids in age 3 - 6 years for <b>Comparision</b> of two-digit numbers (from 0 to 9), where you can to use only more (>), less (<) and equal (=) labels and have 10 seconds timeout to solve each task",
    "Typical tasks for kids in age 3 - 6 years for <b>Addition and Subtraction of round numbers from 10 to 100 (numbers 10, 20, 30 ... 100). You have 10 seconds timeout to solve each task",
    "Typical tasks for kids in age 3 - 6 years for <b>Addition</b> and <b>Subtraction</b> of one- and two- digit numbers. TBD.",
    "Typical tasks for kids in age 3 - 6 years for <b>Addition</b> and <b>Subtraction</b> of two-digit numbers. The result of addition can be an one or two digit number, the result of subtraction is zero or a one-digit number",
];

export default class SMAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickView = this.handleClickView.bind(this);
    }

    handleClickView(desciption) {
        // alert("CLICK VIEW: " + desciption);
        new SMDialog(desciption);
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
                                        <img src={imgs[card]} alt={imgs[card]} height="140" style={{widht: '100%'}}/>
                                        <CardContent className={classes.content}>
                                            <Typography gutterBottom variant="h5" component="h2">{imgs[card]}</Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">{headers[card]}</Typography>
                                        </CardContent>
                                    </CardActionArea>    
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={(e) => this.handleClickView(desciptions[card])}>View</Button>
                                        <Button size="small" color="primary">Play</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
          </main>
        );
    }
}
