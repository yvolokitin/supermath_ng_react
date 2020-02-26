import React from 'react';
import {Avatar, Dialog, Typography} from '@material-ui/core';

import SMTitle from './../dialog/title';
// import Dashboard from './dashboard';

import ava1 from './../../images/avatars/astronaut-icon.png';
import ava2 from './../../images/avatars/confederate-soldier-icon.png';
import ava3 from './../../images/avatars/construction-worker-icon.png';
import ava4 from './../../images/avatars/doctor-icon.png';
import ava5 from './../../images/avatars/cowboy-icon.png';
import ava6 from './../../images/avatars/chef-icon.png';

import ava7 from './../../images/avatars/artist-icon.png';
import ava8 from './../../images/avatars/boy-icon.png';
import ava9 from './../../images/avatars/chief-icon.png';
import ava10 from './../../images/avatars/clown-icon.png';
import ava11 from './../../images/avatars/grandma-icon.png';
import ava12 from './../../images/avatars/lumberjack-icon.png';

import ava13 from './../../images/avatars/martin-berube.ico';
import ava14 from './../../images/avatars/pirate-icon.png';
import ava15 from './../../images/avatars/policeman-icon.png';
import ava16 from './../../images/avatars/princess-icon.png';
import ava17 from './../../images/avatars/prisoner-icon.png';
import ava18 from './../../images/avatars/queen-icon.png';

var arr = [ava1,ava2,ava3,ava4,ava5,ava6,ava7,ava8,ava9,ava10,ava11,ava12,ava13,ava14,ava15,ava16,ava17,ava18];
var avatar = ava13;

export default class UserInformation extends React.Component {
    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);

        for (var i=0; i< arr.length; i++) {
            if (arr[i].includes(this.props.ava)) {
                avatar = arr[i];
                break;
            }
        }

        this.state = {name: this.props.user, ava: avatar};
    }

    componentDidUpdate(prevProps) {
        if (this.props.ava !== prevProps.ava) {
            for (var i=0; i< arr.length; i++) {
                if (arr[i].includes(this.props.ava)) {
                    this.setState({ava: arr[i]});
                    break;
                }
            }
        }
    }

    onClose() {
        console.log('onClose');
        // send post update with new avater picture
        this.props.onClick();
    }

    onChangeAvatar(newAvatar) {
        this.setState({ava: newAvatar});

        // onChangeAvatar /static/media/astronaut-icon.2a916653.png
        // we should save proper value in storage, i.e. astronaut-icon name only
        var index = newAvatar.indexOf('.');
        // '/static/media/' length = 14
        var value = newAvatar.substring(14, index);
        localStorage.setItem('ava', value);
    }
/*
    now I have no time for good Tabs dashboard, like this one:
    <Dashboard pass={this.props.pass} fail={this.props.fail}/>
*/
    render() {
        return (
            <Dialog transitionDuration={600} fullWidth={true} maxWidth='md' open={this.props.open}>
                <SMTitle title='' onClick={this.onClose} style={{display:'flex',backgroundColor:'white'}}/>

                <div style={{margin:'2%',maxWidth:'100%',backgroundColor:'yellow',border:'1px solid grey',boxShadow:'10px 10px grey',}}>
                    <div style={{margin:'2%',width:'25%',height:'100%',float:'left',display:'flex',alignItems:'center',justifyContent:'center',}}>
                        <Avatar style={{width:'200px',height:'200px',}}>
                            <img src={this.state.ava} alt='User Avatar'/>
                        </Avatar>
                    </div>
                    <div style={{padding:'4%',width:'30%',height:'100%',float:'left',textAlign:'left',}}>
                        <Typography style={{width:'100%',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'blue',textShadow:'2px 2px 2px black'}}>
                            <font style={{color:'orange'}}> NAME: </font> {this.props.user}
                        </Typography>
                        <Typography style={{width:'100%',fontSize:'2.00rem',fontFamily:'Grinched',fontVariant:'small-caps',color:'blue',textShadow:'2px 2px 2px black'}}>
                            <font style={{color:'orange'}}> AGE: </font> {this.props.age} years old
                        </Typography>
                    </div>

                    <div style={{padding:'4%',width:'40%',height:'100%',float:'left',textAlign:'left',}}>
                        <Typography component="div" style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',textShadow:'2px 2px 2px black'}}>
                            <font style={{color:'orange'}}> YOUR </font> &nbsp; <font style={{color:'orange'}}> MATH </font> &nbsp; <font style={{color:'orange'}}> POINTS: </font>
                        </Typography>
                        <Typography component="div" style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',textShadow:'2px 2px 2px black'}}>
                            &nbsp; <font style={{color:'green'}}> {this.props.pass} </font> &#128515;
                            &nbsp; <font style={{color:'red'}}> {this.props.fail} </font> &#128169;
                        </Typography>
                    </div>
                </div>

                <div style={{margin:'1%',maxWidth:'100%',display:'flex',alignItems:'center',justifyContent:'center',}}>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer',':hover':{border:'3px solid black'},}}>
                        <img onClick={() => this.onChangeAvatar(ava1)} src={ava1} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava2)} src={ava2} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava3)} src={ava3} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava4)} src={ava4} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava5)} src={ava5} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava6)} src={ava6} alt='test'/>
                    </Avatar>
                </div>

                <div style={{margin:'1%',maxWidth:'100%',display:'flex',alignItems:'center',justifyContent:'center',}}>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava7)} src={ava7} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava8)} src={ava8} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava9)} src={ava9} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava10)} src={ava10} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava11)} src={ava11} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava12)} src={ava12} alt='test'/>
                    </Avatar>
                </div>

                <div style={{margin:'1%',maxWidth:'100%',display:'flex',alignItems:'center',justifyContent:'center',}}>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava13)} src={ava13} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava14)} src={ava14} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava15)} src={ava15} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava16)} src={ava16} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava17)} src={ava17} alt='test'/>
                    </Avatar>
                    <Avatar style={{margin:'2%',width:'120px',height:'120px',cursor:'pointer'}}>
                        <img onClick={() => this.onChangeAvatar(ava18)} src={ava18} alt='test'/>
                    </Avatar>
                </div>

            </Dialog>
        );
    }
}
