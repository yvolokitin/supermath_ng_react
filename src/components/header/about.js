import React from 'react';
import {DialogTitle, DialogContent, DialogActions, Typography, Dialog, Card, CardMedia, Button} from '@material-ui/core';

export default function SMAbout(props) {
    return (
        <Dialog onClose={() => props.onClick()} aria-labelledby="customized-dialog-title" transitionDuration={500} open={props.open}>
            <DialogTitle onClose={() => props.onClick()} style={{color: 'green', fontFamily: 'Grinched', fontSize: '2.5rem'}}>
                About SuperMath
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom style={{color: 'orange', fontFamily: 'Grinched', fontSize: '2.0rem'}}>
                    Use SuperMath as mathematical vitamins!
                </Typography>

                <Card style={{display: 'flex', flexDirection: 'column'}}>
                    <CardMedia component="img" alt="Vitamins!" height="140" src={require('./../../images/vitamins.jpg')} title="Use SuperMath as mathematical vitamins!"/>
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
            </DialogContent>

            <DialogActions>
                  <Button onClose={() => props.onClick()} color="primary">CLOSE</Button>
            </DialogActions>
        </Dialog>
    );
}
