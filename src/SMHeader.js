import React from 'react';
import {Typography, AppBar, Button, Toolbar, Dialog, DialogContent, DialogActions, DialogTitle, Card, CardMedia} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import {red, blue, green} from 'material-ui/colors';

export default class SMHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {infoOpen: false, helpOpen: false};

        this.handleInfoOpen = this.handleInfoOpen.bind(this);
        this.handleInfoClose = this.handleInfoClose.bind(this);

        this.handleHelpOpen = this.handleHelpOpen.bind(this);
        this.handleHelpClose = this.handleHelpClose.bind(this);
    }

    handleInfoOpen(e) {
        this.setState({ infoOpen: true });
    }

    handleInfoClose() {
        this.setState({ infoOpen: false });
    }

    handleHelpOpen(e) {
        this.setState({ helpOpen: true });
    }

    handleHelpClose() {
        this.setState({ helpOpen: false });
    }

    render() {
        return (
          <AppBar position="relative">
            <Toolbar>
              <Typography align="right">
                <Button variant="contained" color="primary" startIcon={<HomeIcon />}>Home</Button>
              </Typography>

              <Typography align="right">
                <Button variant="contained" color="primary" startIcon={<InfoOutlinedIcon />} onClick={(e) => this.handleInfoOpen(e)}>Info</Button>
              </Typography>

              <Typography align="right">
                <Button variant="contained" color="primary" startIcon={<HelpOutlineIcon />} onClick={(e) => this.handleHelpOpen(e)}>Help</Button>
              </Typography>

              <Typography align="right">
                <Button variant="contained" color="primary" startIcon={<PersonOutlineIcon />}>Login</Button>
              </Typography>
            </Toolbar>

            <Dialog onClose={this.handleInfoClose} aria-labelledby="customized-dialog-title" open={this.state.infoOpen}>
              <DialogTitle id="customized-dialog-title" onClose={this.handleInfoClose}>SuperMath Information</DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <b>Use SuperMath as mathematical vitamins!</b>
                    </Typography>

                    <Card style={{display: 'flex', flexDirection: 'column'}}>
                        <CardMedia
                            component="img"
                            alt="Use SuperMath as mathematical vitamins!"
                            height="140"
                            src={require('./imgs/vitamins.jpg')}
                            title="Use SuperMath as mathematical vitamins!"/>
                    </Card>

                    <Typography gutterBottom>
                        Offer the child to regularly solve the examples in SuperMath
                        only once a day, for five minutes, and you will notice how much faster and more accurately he will
                        operate on the numbers. The speed and accuracy of the calculations - these are the bricks that lay
                        the foundation of your childs mathematical education.
                    </Typography>

                    <Typography gutterBottom>
                        In one day, I just personally asked myself - How can I contribute to improve a small part of the world.
                        Im father of two wonderful sons and due to a lot of work responsibility, in some days I could not get so much attantion to them, specially in Mathematics.
                        We could not image our current life now without Mobile phone and Internet and we have it because of Math.
                        When I developed that Math portal for kids I had vary clear goal - help kids with Math! :-)
                    </Typography>

                    <Typography gutterBottom>
                    </Typography>
                </DialogContent>

                <DialogActions>
                  <Button onClick={this.handleInfoClose} color="primary">CLOSE</Button>
                </DialogActions>

            </Dialog>

            <AutoRotatingCarousel
                autoplay={false}
                open={this.state.helpOpen}
                onClose={this.handleHelpClose}
                onStart={this.handleHelpClose}
                style={{position: 'absolute'}}>

                <Slide
                  media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' alt='youtube'/>}
                  mediaBackgroundStyle={{ backgroundColor: red[400] }}
                  style={{ backgroundColor: red[600] }}
                  title='Watch our SuperMath overview video on YouTube'
                  subtitle='SuperMath helps students transition from counting or calculating the basic math facts to recalling them. Quickly recalling math facts,
                    instead of calculating them, frees up mental resources for higher-level operations. SuperMath’s timed activities encourage students to answer
                    questions as quickly as possible.'/>

                <Slide
                  media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' alt='inbox'/>}
                  mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                  style={{ backgroundColor: blue[600] }}
                  title='Sign-up, Sign-in and Enrollment'
                  subtitle='If you do not have SuperMath account, you can do it easely. Just press by current link and create it in a few seconds.'/>

                <Slide
                  media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' alt='settings'/>}
                  mediaBackgroundStyle={{ backgroundColor: green[400] }}
                  style={{ backgroundColor: green[600] }}
                  title='Settgins'
                  subtitle='tbd...'/>
            </AutoRotatingCarousel>

          </AppBar>
        )
    };
}
