import React from 'react';
import {AutoRotatingCarousel, Slide} from 'material-auto-rotating-carousel';
import {Typography} from '@material-ui/core';

import image from './../../images/help/belts.jpg';

/*
export default function SMHelp(props) {
    return (<></>
    );
}

*/
export default function SMHelp(props) {
    var text = 'The White level is designed to operate with digit numerbs from 0 to 10 and focused on basic arithmetical knowledge. The Orange is used for two digit numbers. The Green, Navy and Black';
    var desc = 'All Programs are divided in five Levels (aka belts in karate or kung fu). Each Color corresponds certain level of tasks complexity. For begginers, the White Color is provided, which darkens with the growth of skills. The Black shows that a student has reached good skills in solving of Math problems';

    return (
        <AutoRotatingCarousel
            autoplay={false}
            open={props.open}
            onClose={() => props.onClick()}
            onStart={() => props.onClick()}
            style={{position: 'absolute'}}>

            <Slide
                media={
                    <div>
                        <Typography style={{fontFamily:'Grinched',fontVariant:'small-caps',fontSize:'2.5rem',color:'green',textShadow:'1px 1px 2px black'}}>
                            <font style={{color:'#b37700'}}>SuperMath</font> programs organization and levels
                        </Typography>
                        <img src={image} style={{marginTop:'2%',marginBottom:'2%',width:'90%',border:'4px solid green',borderRadius:'5px',}} alt='kids'/>
                        <Typography style={{marginLeft:'4%',marginRight:'4%',fontFamily:'Arial',fontSize:'1.5rem',color:'green',lineHeight:'1.0',textAlign:'justify',fontWeight:'bold'}}>
                            {desc}
                        </Typography>
                    </div>
                }
                mediaBackgroundStyle={{backgroundColor:'orange'}}
                style = {{backgroundColor:'green'}}
                title = ''
                subtitle = {text}/>
            <Slide
                media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' alt='youtube'/>}
                mediaBackgroundStyle={{backgroundColor:'red'}}
                style={{backgroundColor: 'red'}}
                title='Watch our SuperMath overview video on YouTube'
                subtitle='SuperMath helps students transition from counting or calculating the basic math facts to recalling them. Quickly recalling math facts,
                    instead of calculating them, frees up mental resources for higher-level operations. SuperMath’s timed activities encourage students to answer
                    questions as quickly as possible.'/>

            <Slide
                media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' alt='inbox'/>}
                mediaBackgroundStyle={{backgroundColor:'blue'}}
                style={{backgroundColor: 'blue'}}
                title='Sign-up, Sign-in and Enrollment'
                subtitle='If you do not have SuperMath account, you can do it easely. Just press by current link and create it in a few seconds.'/>

            <Slide
                media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' alt='settings'/>}
                mediaBackgroundStyle={{ backgroundColor:'green'}}
                style={{backgroundColor:'green'}}
                title='Settgins'
                subtitle='tbd...'/>

        </AutoRotatingCarousel>
    );
}
