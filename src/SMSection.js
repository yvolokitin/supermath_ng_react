import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

export default function SMSection(props) {
    const sectionStyles = makeStyles(theme => ({
        sectionContent: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6),
        },
    }));

    const classes = sectionStyles();
    return (
        <div className={classes.sectionContent}>
          <Container maxWidth="sm" >
            <Typography variant="h1" align="center" style={{fontFamily: "Grinched", fontVariant: "small-caps", color: "green" }} paragraph>
              SuperMath 
            </Typography>
            <Typography variant="h4" align="center" style={{fontFamily: "Grinched", fontVariant: "small-caps", fontWeight: "bold", color: "grey" }} paragraph>
              free web app, which helps kids, parents and teachers master basic math facts
            </Typography>
          </Container>
        </div>
    );
}
