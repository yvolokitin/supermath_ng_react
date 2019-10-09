import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

function SMFooter() {
  const SMFooter_style = makeStyles(theme => ({
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

  return (
    <footer style={SMFooter_style}>
      <Typography variant="body2" color="textSecondary" align="center">
       {'Copyright © '}
        <Link color="inherit" href="https://supermath.ru/">SuperMath.RU</Link>{' '}
       {new Date().getFullYear()}
       {'.'}
     </Typography>
    </footer>
  );
}

export default SMFooter;
