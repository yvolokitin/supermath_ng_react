import React from 'react';
import {Typography} from '@material-ui/core';
import {AutoRotatingCarousel, Slide} from 'material-auto-rotating-carousel';

import {help} from './../translations/help';

import image from './../../images/help/belts.jpg';

/*
            <Slide
                media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' alt='settings'/>}
                mediaBackgroundStyle={{ backgroundColor:'green'}}
                style={{backgroundColor:'green'}}
                title='Settgins'
                subtitle='tbd...'/>

*/
export default function SMHelp(props) {
    return (
        <AutoRotatingCarousel autoplay={false} open={props.open}  onClose={() => props.onClick()} onStart={() => props.onClick()} style={{position: 'absolute'}}>
            <Slide id='common'
                media={
                    <div>
                        <Typography style={{fontFamily:'Grinched',fontVariant:'small-caps',fontSize:'2.5rem',color:'green',textShadow:'1px 1px 2px black'}}>
                            <font style={{color:'#b37700',marginRight:'7px'}}>SuperMath</font>
                            {help[props.lang]['common_title']}
                        </Typography>
                        <img src={image} style={{marginTop:'2%',marginBottom:'2%',width:'90%',border:'4px solid green',borderRadius:'5px',}} alt='kids'/>
                        <Typography style={{marginLeft:'4%',marginRight:'4%',fontFamily:'Arial',fontSize:'1.5rem',color:'green',lineHeight:'1.0',textAlign:'justify',fontWeight:'bold'}}>
                            {help[props.lang]['common_body']}
                        </Typography>
                    </div>
                }
                mediaBackgroundStyle={{backgroundColor:'orange'}}
                style = {{backgroundColor:'green'}}
                title = {help[props.lang]['common_ext_title']}
                subtitle = {help[props.lang]['common_ext_body']}/>

            <Slide id='white'
                media={
                    <div>
                        <Typography style={{fontFamily:'Grinched',fontSize:'2.5rem',color:'black'}}> {help[props.lang]['white_title']} </Typography>
                        <Typography style={{marginLeft:'4%',marginRight:'4%',fontFamily:'Arial',fontSize:'1.5rem',color:'black',lineHeight:'1.0',textAlign:'justify',fontWeight:'bold'}}>
                            {help[props.lang]['white_body']}
                        </Typography>
                    </div>
                }
                mediaBackgroundStyle={{backgroundColor:'white'}} style={{backgroundColor:'black'}}
                title={help[props.lang]['white_ext_title']} subtitle={help[props.lang]['white_ext_body']}/>

            <Slide id='orange'
                media={
                    <div>
                        <Typography style={{fontFamily:'Grinched',fontSize:'2.5rem',color:'white',textShadow:'1px 1px 2px black'}}> {help[props.lang]['orange_title']} </Typography>
                        <Typography style={{marginLeft:'4%',marginRight:'4%',fontFamily:'Arial',fontSize:'1.5rem',color:'white',lineHeight:'1.0',textAlign:'justify',fontWeight:'bold'}}>
                            {help[props.lang]['orange_body']}
                        </Typography>
                    </div>
                }
                mediaBackgroundStyle={{backgroundColor:'orange'}} style={{backgroundColor:'orange'}}
                title={help[props.lang]['orange_ext_title']} subtitle={help[props.lang]['orange_ext_body']}/>

            <Slide id='green'
                media={
                    <div>
                        <Typography style={{fontFamily:'Grinched',fontSize:'2.5rem',color:'white',textShadow:'1px 1px 2px black'}}> {help[props.lang]['green_title']} </Typography>
                        <Typography style={{marginLeft:'4%',marginRight:'4%',fontFamily:'Arial',fontSize:'1.5rem',color:'white',lineHeight:'1.0',textAlign:'justify',fontWeight:'bold'}}>
                            {help[props.lang]['green_body']}
                        </Typography>
                    </div>
                }
                mediaBackgroundStyle={{backgroundColor:'green'}} style={{backgroundColor:'green'}}
                title={help[props.lang]['green_ext_title']} subtitle={help[props.lang]['green_ext_body']}/>

            <Slide id='navi'
                media={
                    <div>
                        <Typography style={{fontFamily:'Grinched',fontSize:'2.5rem',color:'white',textShadow:'1px 1px 2px black'}}> {help[props.lang]['navi_title']} </Typography>
                        <Typography style={{marginLeft:'4%',marginRight:'4%',fontFamily:'Arial',fontSize:'1.5rem',color:'white',lineHeight:'1.0',textAlign:'justify',fontWeight:'bold'}}>
                            {help[props.lang]['navi_body']}
                        </Typography>
                    </div>
                }
                mediaBackgroundStyle={{backgroundColor:'#3f51b5'}} style={{backgroundColor:'#3f51b5'}}
                title={help[props.lang]['navi_ext_title']} subtitle={help[props.lang]['navi_ext_body']}/>

            <Slide id='black'
                media={
                    <div>
                        <Typography style={{fontFamily:'Grinched',fontSize:'2.5rem',color:'black'}}> {help[props.lang]['black_title']} </Typography>
                        <Typography style={{marginLeft:'4%',marginRight:'4%',fontFamily:'Arial',fontSize:'1.5rem',color:'black',lineHeight:'1.0',textAlign:'justify',fontWeight:'bold'}}>
                            {help[props.lang]['black_body']}
                        </Typography>
                    </div>
                }
                mediaBackgroundStyle={{backgroundColor:'white'}} style={{backgroundColor:'black'}}
                title={help[props.lang]['black_ext_title']} subtitle={help[props.lang]['black_ext_body']}/>

            <Slide
                media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' alt='youtube'/>}
                mediaBackgroundStyle={{backgroundColor:'red'}}
                style={{backgroundColor: 'red'}}
                title='Watch our SuperMath overview'
                subtitle='SuperMath helps students transition from counting or calculating the basic math facts to recalling them. Quickly recalling math facts,
                    instead of calculating them, frees up mental resources for higher-level operations. SuperMath’s timed activities encourage students to answer
                    questions as quickly as possible.'/>

            <Slide
                media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' alt='inbox'/>}
                mediaBackgroundStyle={{backgroundColor:'blue'}}
                style={{backgroundColor: 'blue'}}
                title='Sign-up, Sign-in and Enrollment'
                subtitle='If you do not have SuperMath account, you can do it easely. Just press by current link and create it in a few seconds.'/>

        </AutoRotatingCarousel>
    );
}
