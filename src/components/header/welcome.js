import React from 'react';
import {Dialog, DialogActions, DialogContent, Button, AppBar, Toolbar, Typography} from '@material-ui/core';
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';

import InfoIcon from '@material-ui/icons/Info';
import CancelIcon from '@material-ui/icons/Cancel';
import LanguageIcon from '@material-ui/icons/Language';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
// import MessageIcon from '@material-ui/icons/Message';

import Title from './../title/title';
import ColorLine from './../line/line';

import image_title from './../../images/welcome.jpg';
import image_avatars from './../../images/welcome/avatars.jpg';

import './welcome.css';

import {welcome} from './../translations/welcome';

export default function Welcome(props) {
    const handleChange = (event, value) => {
        console.log('Welcome.handleChange ' + value);
        props.onClose(value);
    }

    return (
        <Dialog open={props.open} onClose={() => props.onClose('close')}
            fullScreen={props.fullScreen} scroll='body' transitionDuration={500}>

            <Title title={welcome[props.lang]['welcome']} src={image_title} onClose={() => props.onClose('close')} fullScreen={props.fullScreen}/>
            <ColorLine margin={'0px'}/>

            <div className='welcome_title'> SUPERMATH.XYZ </div>

            <div className='welcome_content'>
                <h3> {props.name} {props.surname}, {welcome[props.lang]['title']}</h3>
                <p> {welcome[props.lang]['message']} </p>
            </div>

            <div onClick={() => props.onClose('userinfo')} className='welcome_content'>
                <AppBar position="static">
                    <Toolbar style={{textShadow:'1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue',cursor:'pointer'}}>
                        <Typography style={{fontFamily:'Grinched',fontSize:'2.00rem',fontVariant:'small-caps',color:'orange'}}></Typography>
                        <Typography variant="h5" style={{flexGrow:1}}></Typography>
                        <Typography style={{fontSize:'2.0rem',fontFamily:'Grinched',color:'orange'}}>
                            {props.name}:
                             <font style={{color:'green'}}> {props.passed} </font> &#128515;
                             <font style={{color:'red'}}> {props.failed} </font> &#128169;
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>

            {(props.refferal.length > 0) ? (
                <div className='welcome_content' style={{marginTop:'4%'}}>
                    {welcome[props.lang]['thanks']} <b> {props.refferal} </b> {welcome[props.lang]['extra']}
                </div>
            ) : (
                <div className='welcome_content' style={{marginTop:'4%'}}>
                    {welcome[props.lang]['text']}
                </div>
            )}

            <div onClick={() => props.onClose('userinfo')} className='welcome_content' style={{marginTop:'2%',cursor:'pointer'}}>
                <img src={image_avatars} alt='avatars' style={{width:'100%',padding:'1%',border:'1px solid grey'}}/>
            </div>

            <DialogContent scroll='body'>
                <BottomNavigation onChange={handleChange} showLabels>
                    <BottomNavigationAction label={welcome[props.lang]['profile']} value='userinfo' icon={<AccountCircleIcon/>}/>
                    <BottomNavigationAction label={welcome[props.lang]['about']} value='about' icon={<InfoIcon/>}/>
                    <BottomNavigationAction label={welcome[props.lang]['help']} value='help' icon={<ContactSupportIcon/>}/>
                    <BottomNavigationAction label={welcome[props.lang]['language']} value='language' icon={<LanguageIcon/>}/>
                </BottomNavigation>
            </DialogContent>

            <ColorLine/>
            <DialogActions>
                <Button size="small" color="primary" startIcon={<CancelIcon/>} style={{marginTop:'2%'}} onClick={() => props.onClose('close')}>
                    {welcome[props.lang]['close']}
                </Button>
           </DialogActions>

        </Dialog>
    );
}
