import React from 'react';

import ColorLine from './../line/line';

import {RED_CIRCLE} from './../halpers/functions';

import './digitgamefooter.css';


export default function GameFooter(props) {

    React.useEffect(() => {
        // console.log('GameFooter -> props.circles ' + props.circles);

    }, [props.width, props.circles, ]);

    return (
        <>
            {(props.is_test) ? (
                <>
                    <ColorLine margin={'0px'}/>
                    <div className='game_footer_div' style={{height: '8%', width: '100%'}}>
                        {circles.map((item, key) => (
                            <svg key={item} height='10%' width='10%' className='game_footer_div_svg'>
                                {(props.circles === RED_CIRCLE) ? (
                                    <circle cx='50%' cy='50%' r={radius} stroke='black' strokeWidth='2' fill={'red'}/>
                                ) : (
                                    <>
                                        {(props.circles > item) ? (
                                            <circle cx='50%' cy='50%' r={radius} stroke='black' strokeWidth='2' fill={'green'}/>
                                        ) : (
                                            <circle cx='50%' cy='50%' r={radius} stroke='black' strokeWidth='2' fill={'white'}/>
                                        )}
                                    </>
                                )}
                            </svg>
                        ))}
                    </div>
                </>
            ) : (<> </>)}
        </>
    );
}
