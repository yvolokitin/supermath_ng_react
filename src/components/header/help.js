import React from 'react';
import {Typography} from '@material-ui/core';
import {AutoRotatingCarousel, Slide} from 'material-auto-rotating-carousel';

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
                            All Programs are divided in five Levels (aka belts in karate or kung fu). Each Color corresponds certain level of tasks
                            complexity. For begginers, the White Color is provided, which darkens with the growth of skills. The Black shows that a
                            student has reached good skills in solving of Math problems
                        </Typography>
                    </div>
                }
                mediaBackgroundStyle={{backgroundColor:'orange'}}
                style = {{backgroundColor:'green'}}
                title = 'Tasks and Colors organization'
                subtitle = 'You can easely follow your own organizational things and ideas. It is not really mandatory to follow all programms one by one from each color. The main idea in the color organization is just get you some initial basic logical structure, which will help you in perception of tasks.'/>

            <Slide
                id='white'
                media={
                    <div>
                        <Typography style={{fontFamily:'Grinched',fontSize:'2.5rem',color:'black'}}>
                            White Level
                        </Typography>
                        <Typography style={{marginLeft:'4%',marginRight:'4%',fontFamily:'Arial',fontSize:'1.5rem',color:'black',lineHeight:'1.0',textAlign:'justify',fontWeight:'bold'}}>
                            The White level is designed to operate with one-digit numbers in range from 0 to 10 (where 10 is the only one two-digit number exception).
                            The main focus of current level is two basic arithmetic operations: Addition and Subtruction. It starts from the numbers understanding
                            (determination of right secuance and order) and Comparision operations with continuation on Addition and Subtruction.
                            The last programs give kids more challange and drive smart thinking for them.
                        </Typography>
                    </div>
                }
                mediaBackgroundStyle={{backgroundColor:'white'}}
                style = {{backgroundColor:'black'}}
                title = 'Tasks structure'
                subtitle = 'Determination of one digit number from sequance. Comparision of one-digit numbers. Addition of one-digit numbers. Subtraction of one-digit numbers. Addition and Subtraction of two one-digit numbers. Mathematical operation (Addition or Subtraction) determination. Addition and Subtraction of three one-digit numbers. Comparison of two expressions for one digit numbers. Addition and Subtraction of two one-digit numbers with unknown argument.'/>

            <Slide
                id='orange'
                media={
                    <div>
                        <Typography style={{fontFamily:'Grinched',fontSize:'2.5rem',color:'white',textShadow:'1px 1px 2px black'}}>
                            Orange Level
                        </Typography>
                        <Typography style={{marginLeft:'4%',marginRight:'4%',fontFamily:'Arial',fontSize:'1.5rem',color:'white',lineHeight:'1.0',textAlign:'justify',fontWeight:'bold'}}>
                            The Orange level is used for two-digit numbers in range from 10 to 100. The hungred is only one exception of three digit number
                        </Typography>

                        <Typography style={{marginLeft:'4%',marginRight:'4%',fontFamily:'Arial',fontSize:'1.5rem',color:'white',lineHeight:'1.0',textAlign:'justify',fontWeight:'bold'}}>
                            The Orange level is operates with Addition and Substruction. Where the addition of two whole numbers is the total amount of those values combined.
                            And Subtraction is the operation of removing objects from a collection. The result of a subtraction is called a difference.
                        </Typography>
                    </div>
                }
                mediaBackgroundStyle={{backgroundColor:'orange'}}
                style = {{backgroundColor:'orange'}}
                title = 'Tasks structure'
                subtitle = 'Tasks for determination of two digit number from sequance. Comparision of two-digit numbers. Addition and Subtraction of two and one-digit numbers. Addition and Subtraction of round numbers. Addition and Subtraction of round and one-digit numbers. Addition and Subtraction of one-digit and two-digit numbers. Addition and Subtraction of two two-digit numbers.'/>

            <Slide
                id='green'
                media={
                    <div>
                        <Typography style={{fontFamily:'Grinched',fontSize:'2.5rem',color:'white',textShadow:'1px 1px 2px black'}}>
                            Green Level
                        </Typography>
                        <Typography style={{marginLeft:'4%',marginRight:'4%',fontFamily:'Arial',fontSize:'1.5rem',color:'white',lineHeight:'1.0',textAlign:'justify',fontWeight:'bold'}}>
                            The Green level is introduced tasks for Multiplication of one digit numbers and more advanced associated operations.
                        </Typography>
                        <Typography style={{marginLeft:'4%',marginRight:'4%',marginTop:'4%',fontFamily:'Arial',fontSize:'1.5rem',color:'white',lineHeight:'1.0',textAlign:'justify',fontWeight:'bold'}}>
                            Multiplication (often denoted by the cross symbol 'x') is one of the four elementary mathematical operations of arithmetic,
                            with the others being addition, subtraction and division. The multiplication of whole numbers may be thought as a repeated
                            addition; that is, the multiplication of two numbers is equivalent to adding as many copies of one of them,
                            the multiplicand, as the value of the other one, the multiplier.
                        </Typography>
                    </div>
                }
                mediaBackgroundStyle={{backgroundColor:'green'}}
                style = {{backgroundColor:'green'}}
                title = '' subtitle = ''/>

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
