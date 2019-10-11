import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const sectionStyles = makeStyles(theme => {
  return ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
  });
});

export default function SMSection(props) {
    const classes = sectionStyles();

    return (
        <div className={classes.heroContent}>
          <Container maxWidth="sm" >
            <Typography variant="h1" align="center" style={{fontFamily: "Grinched", fontVariant: "small-caps", color: "green" }} paragraph>
              SuperMath 
            </Typography>
            <Typography variant="h5" align="center" style={{fontWeight: "bold", color: "red" }} paragraph>
              {props.text}
            </Typography>
          </Container>
        </div>
    );
}
