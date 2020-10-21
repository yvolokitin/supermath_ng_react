import React from 'react';

import ColorLine from './../line/line';
import './digitgamefooter.css';

const circles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function GameFooter(props) {
    const [radius, setRadius] = React.useState(0);

    React.useEffect(() => {
        // console.log('GameFooter -> props.circles ' + props.circles);
        if (props.width > 800) {
            setRadius(25);

        } else if (props.width > 500) {
            setRadius(16);

        } else {
            setRadius(8);
        }

    }, [props.width, props.circles, ]);

    return (
        <>
            {(props.is_test) ? (
                <>
                    <ColorLine margin={'0px'}/>
                    <div className='game_footer_div'>
                        {circles.map((item, key) => (
                            <svg key={item} height='100%' width='100%'>
                                {(props.circles > item) ? (
                                    <circle cx='50%' cy='50%' r={radius} stroke='black' strokeWidth='2' fill={'green'}/>
                                ) : (
                                    <circle cx='50%' cy='50%' r={radius} stroke='black' strokeWidth='2' fill={'white'}/>
                                )}
                            </svg>
                        ))}
                    </div>
                </>
            ) : (<> </>)}
        </>
    );
}
