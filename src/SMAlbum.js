import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import SMHeader from "./SMHeader";

const useStyles = makeStyles(theme => {
  return ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%',
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  });
});

const cards = [1, 2, 3, 4, 5, 6];

export default function SMAlbum() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <SMHeader login={"Login"}/>

      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm" >
            <Typography variant="h1" align="center" color="textSecondary" style={{fontFamily: "Grinched", fontVariant: "small-caps", color: "green" }} paragraph>
              SuperMath 
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" style={{fontWeight: "bold", color: "black" }} paragraph>
              SuperMath helps kids master basic math facts. It is free web program for students, parents and teachers.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Play
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      <footer>
        <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
          <Link color="inherit" href="https://supermath.ru/">SuperMath.RU</Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      </footer>

    </React.Fragment>
  );
}