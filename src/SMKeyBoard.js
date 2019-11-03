import React from 'react';
import {Grid, Paper, Button, Typography} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    control: {
        padding: theme.spacing(2),
    },
    button: {
        fontFamily: "Grinched",
        color: "black",
    }
}));

export default function SMKeyBoard(props) {
    const classes = useStyles();
    return (
        <Grid container justify="center" component={Paper} spacing={3} style={{ backgroundColor: 'green' }}>
            <Grid container item direction="row" justify="flex-start" alignItems="flex-start" style={{ backgroundColor: 'yellow' }}>
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>7</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>8</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>9</Typography>
                    </Button>
                </Grid>
            </Grid>

            <Grid container item direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>4</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>5</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>6</Typography>
                    </Button>
                </Grid>
            </Grid>

            <Grid container item direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>1</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>2</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>3</Typography>
                    </Button>
                </Grid>
            </Grid>
            <Grid container item direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>+</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>0</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>-</Typography>
                    </Button>
                </Grid>
            </Grid>

            <Grid container item direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>&gt;</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>=</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        <Typography variant="h3" className={classes.button}>&lt;</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
