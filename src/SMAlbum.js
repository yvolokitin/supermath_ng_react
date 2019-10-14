import React from 'react';
import { Typography, Container, Button, Grid, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import SMDialog from "./SMDialog";

const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const imgs = [
    './imgs/ru_white_1.jpg',
    './imgs/ru_white_2.jpg',
    './imgs/ru_white_2.jpg',
    './imgs/ru_white_2.jpg',
    './imgs/ru_white_2.jpg',
    './imgs/ru_white_2.jpg',
    './imgs/ru_white_2.jpg',
    './imgs/ru_white_2.jpg',
    './imgs/ru_white_2.jpg'
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
        const classes = {
            grid: {
              paddingTop: 8,
              paddingBottom: 8,
            },
            card: {
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            },
            media: {
                paddingTop: '56.25%',
            },
            content: {
                flexGrow: 1,
            },
        };

        return (
            <main>
                <Container className={classes.grid} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map(card => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia className={classes.media} image="https://source.unsplash.com/random" title={imgs[card]}/>
                                    <CardContent className={classes.content}>
                                        <Typography gutterBottom variant="h5" component="h2">{imgs[card]}</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">{headers[card]}</Typography>
                                    </CardContent>
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
