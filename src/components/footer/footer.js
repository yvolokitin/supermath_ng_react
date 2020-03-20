import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import AlertDialog from './../alert/alert';

import {footer} from './../halpers/footer';

export default function SMFooter(props) {
    const [value, setValue] = React.useState(false);

    var alert_text = footer[props.lang]['questions'];
    return (
        <footer>
            <Typography variant='body2' color='textSecondary' align='center'>
                {'Copyright © '}
                    <Link color='inherit' href='http://supermath.xyz'>{props.text}</Link>{' '} {new Date().getFullYear()}
                {'.'}

                &nbsp; &nbsp; <font style={{cursor: 'pointer'}} onClick={() => setValue(true)}>Contacts</font>
            </Typography>

            <AlertDialog open={value}
                         title='Contacts us'
                         text={alert_text}
                         yes='' no=''
                         onClose={() => setValue(false)}/>
        </footer>
    );
}
