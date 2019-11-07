import React from 'react';
import {Button, Typography} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    grid: {
        display: 'table',
        borderSpacing: '5px',
        float: 'right',
    },
    row: {
        display: 'table-row',
    },
    cell: {
        display: 'table-cell',
        borderStyle: 'solid',
    },
    button: {
        fontFamily: "Grinched",
        color: "black",
    }
}));

/*
                
*/
export default function SMKeyBoard(props) {
    const classes = useStyles();
    return (
        <div className={classes.grid}>
            <div className={classes.row}>
                <div className={classes.cell}>
                    <Button>
                        <Typography variant="h3" className={classes.button}>7</Typography>
                    </Button>
                </div>
                <div className={classes.cell}>
                    <Button>
                        <Typography variant="h3" className={classes.button}>8</Typography>
                    </Button>
                </div>
                <div className={classes.cell}>
                    <Button>
                        <Typography variant="h3" className={classes.button}>9</Typography>
                    </Button>
                </div>
            </div>

            <div className={classes.row}>
                <div className={classes.cell}>
                    <Button>
                        <Typography variant="h3" className={classes.button}>4</Typography>
                    </Button>
                </div>
                <div className={classes.cell}>
                    <Button>
                        <Typography variant="h3" className={classes.button}>5</Typography>
                    </Button>
                </div>
                <div className={classes.cell}>
                    <Button>
                        <Typography variant="h3" className={classes.button}>6</Typography>
                    </Button>
                </div>
            </div>

            <div className={classes.row}>
                <div className={classes.cell}>
                    <Button>
                        <Typography variant="h3" className={classes.button}>1</Typography>
                    </Button>
                </div>
                <div className={classes.cell}>
                    <Button>
                        <Typography variant="h3" className={classes.button}>2</Typography>
                    </Button>
                </div>
                <div className={classes.cell}>
                    <Button>
                        <Typography variant="h3" className={classes.button}>3</Typography>
                    </Button>
                </div>
            </div>

            <div className={classes.row}>
                <div className={classes.cell}>
                    <Button>
                        <Typography variant="h3" className={classes.button}>+</Typography>
                    </Button>
                </div>
                <div className={classes.cell}>
                    <Button>
                        <Typography variant="h3" className={classes.button}>0</Typography>
                    </Button>
                </div>
                <div className={classes.cell}>
                    <Button>
                        <Typography variant="h3" className={classes.button}>-</Typography>
                    </Button>
                </div>
            </div>

        </div>
    );
}
