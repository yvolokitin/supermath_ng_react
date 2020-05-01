import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import AlertDialog from './../alert/alert';

import {footer} from './../translations/footer';

export default function Footer(props) {
    const [value, setValue] = React.useState(false);

    return (
        <footer>
            <Typography variant='body2' color='textSecondary' align='center'>
                {'Copyright © '}
                    <Link color='inherit' href='http://supermath.xyz'>{props.text}</Link>{' '} {new Date().getFullYear()}
                {'.'}

                &nbsp; &nbsp; <font style={{cursor: 'pointer'}} onClick={() => setValue(true)}>{footer[props.lang]['contacts']}</font>
            </Typography>

            <AlertDialog open={value}
                         title={footer[props.lang]['title']}
                         text={footer[props.lang]['questions']}
                         yes={footer[props.lang]['close']}
                         no=''
                         onClose={() => setValue(false)}/>
        </footer>
    );
}
