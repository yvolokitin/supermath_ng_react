import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function SMFooter(props) {
    return (
        <footer>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                    <Link color="inherit" href="https://supermath.ru/">{props.text}</Link>{' '} {new Date().getFullYear()}
                {'.'}
            </Typography>
        </footer>
    );
}
