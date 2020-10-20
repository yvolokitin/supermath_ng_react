import React from 'react';

import ColorLine from './../line/line';
import './digitgamefooter.css';

export default function GameFooter(props) {
    const circles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    React.useEffect(() => {
        console.log('GameFooter -> props.circles ' + props.circles);

    }, [props.circles, ]);

    return (
        <>
            {(props.is_test) ? (
                <>
                    <ColorLine margin={'0px'}/>
                    <div className='game_footer_div'>
                        {circles.map((item, key) => (
                            <svg key={item} height='100%' width='100%'>
                                {(props.circles > item) ? (
                                    <circle cx={50} cy={50} r={16} stroke='black' strokeWidth='2' fill={'green'}/>
                                ) : (
                                    <circle cx={50} cy={50} r={16} stroke='black' strokeWidth='2' fill={'white'}/>
                                )}
                            </svg>
                        ))}
                    </div>
                </>
            ) : (<> </>)}
        </>
    );
}
