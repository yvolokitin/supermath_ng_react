import React from 'react';
import {AutoRotatingCarousel, Slide} from 'material-auto-rotating-carousel';
import {red, blue, green} from 'material-ui/colors';

export default function SMHelp(props) {
    return (
        <AutoRotatingCarousel
            autoplay={false}
            open={props.open}
            onClose={() => props.onClick()}
            onStart={() => props.onClick()}
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
    );
}
