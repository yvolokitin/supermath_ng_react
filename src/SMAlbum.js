import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import SMFooter from './SMFooter';
import SMHelpCarousel from './SMHelpCarousel';

const useStyles = makeStyles(theme => ({
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
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const cards = [1, 2, 3, 4, 5, 6];

export default function SMAlbum() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <IconButton color="inherit" className={classes.button}>
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit" className={classes.button}>
              <InfoOutlinedIcon />
            </IconButton>
             <IconButton color="inherit" className={classes.button}>
              <HelpOutlineIcon onClick={SMHelpCarousel.onSMCarouselClicked}/>
            </IconButton>
            <IconButton color="inherit" className={classes.button} style={{ float: "right"}}>
              <PersonOutlineIcon />
            </IconButton>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <main style={{backgroundColor: "#ffcc99"}}>
        {/* Hero unit */}
<<<<<<< HEAD
        <div className={classes.heroContent}>
          <Container maxWidth="sm" >
            <Typography variant="h4" align="center" color="textSecondary" style={{ fontFamily: "Grinched", color: "green" }} paragraph>
=======
        <div className={classes.heroContent} style={{backgroundColor: "#ffff99"}}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              SuperMath Icon
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
>>>>>>> abb314c2c00aa3bf8fadb86c69020b5d5a9587e7
              SuperMath helps kids master basic math facts. It is free web program for students, parents and teachers.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md" style={{backgroundColor: "lightgreen"}}>
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

      <SMFooter />
    </React.Fragment>
  );
}