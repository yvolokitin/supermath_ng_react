import React from 'react';
import {Avatar, Dialog, Typography, Card, CardActionArea, CardContent} from '@material-ui/core';

import SMTitle from './../dialog/title';
// import Dashboard from './dashboard';

import logo from './../../images/Martin-Berube-People-Kid.ico';

export default class UserInformation extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);

        this.state = {tab_value: 0,
                      percentage: '',
                      name: '',
                     };
    }

    onClose() {
        console.log('onClose');
        this.props.onClick();
    }

    onLogout() {
        console.log('onLogout');
    }

    handleTabChange() {
        // 
    }

/*
    this.props.open
    now I have no time for good Tabs dashboard, like this one:
    <Dashboard pass={this.props.pass} fail={this.props.fail}/>


                <div style={{minWidth: 575,minHeight: 475,widht:'100%',height:'100%',display:'flex'}}>
                    <div style={{margin:'1%',widht:'49%',height:'100%',float:'left',textAlign:'center',}}>
                        <Avatar style={{width:'160px',height:'160px',}}>
                            <img src={logo} alt='test'/>
                        </Avatar>

                        <Typography style={{cursor:'pointer',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'orange',textShadow:'1px 1px 2px black'}}>
                            {this.props.user}
                        </Typography>

                        <Typography style={{cursor:'pointer',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'green',textShadow:'1px 1px 2px black'}}>
                            {this.props.age} years old
                        </Typography>
                    </div>

                <Typography component="div" style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',textShadow:'1px 1px 2px black'}}>
                            <font style={{color:'blue'}}> YOUR </font> &nbsp; <font style={{color:'red'}}> MATH </font> &nbsp; <font style={{color:'orange'}}> POINTS: </font>
                </Typography>


                <Typography component="div" style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',textShadow:'1px 1px 2px black'}}>
                            &nbsp; <font style={{color:'green'}}> {this.props.pass} </font> &#128515;
                            &nbsp; <font style={{color:'red'}}> {this.props.fail} </font> &#128169;
                </Typography>

                </div>


                <Card style={{margin:'1%',maxWidth:'215px',float:'left',}}>
                    <CardContent style={{textAlign:'center'}}>
                        <Avatar style={{width:'180px',height:'180px',}}>
                            <img src={logo} alt='test'/>
                        </Avatar>

                        <Typography style={{fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'orange',textShadow:'1px 1px 2px black'}}>
                            {this.props.user}
                        </Typography>

                        <Typography style={{cursor:'pointer',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'green',textShadow:'1px 1px 2px black'}}>
                            {this.props.age} years old
                        </Typography>
                        </CardContent>
                </Card>
*/
    render() {
        return (
            <Dialog onClick={this.onClose} transitionDuration={600} fullWidth={true} maxWidth='xl' open={true}>
                <SMTitle title='' onClick={this.onClose} style={{display:'flex',backgroundColor:'white'}}/>

                <div style={{margin:'1%',maxWidth:'100%',maxHeight:'100%',}}>
                    <div style={{width:'20%',height:'100%',float:'left',display:'flex',alignItems:'center',justifyContent:'center',}}>
                        <Avatar style={{width:'180px',height:'180px',}}>
                            <img src={logo} alt='test'/>
                        </Avatar>

                        <Typography style={{width:'100%',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'orange',textShadow:'1px 1px 2px black'}}>
                            {this.props.user}
                        </Typography>
                        <Typography style={{width:'100%',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'green',textShadow:'1px 1px 2px black'}}>
                            {this.props.age} years old
                        </Typography>
                    </div>
                    <div style={{width:'20%',height:'100%',float:'left',textAlign:'center',alignItems:'center',justifyContent:'center',}}>
                        <Typography style={{width:'100%',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'orange',textShadow:'1px 1px 2px black'}}>
                            {this.props.user}
                        </Typography>
                        <Typography style={{width:'100%',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'green',textShadow:'1px 1px 2px black'}}>
                            {this.props.age} years old
                        </Typography>
                    </div>

                    <div style={{width:'20%',height:'100%',float:'left',}}>
                        <Typography component="div" style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',textShadow:'1px 1px 2px black'}}>
                            <font style={{color:'blue'}}> YOUR </font> &nbsp; <font style={{color:'red'}}> MATH </font> &nbsp; <font style={{color:'orange'}}> POINTS: </font>
                        </Typography>
                    </div>
                </div>

            </Dialog>
        );
    }
}
