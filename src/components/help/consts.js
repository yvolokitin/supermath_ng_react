import { withStyles } from '@material-ui/core/styles';

import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';

export const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        width: '100%',
        boxShadow: '1px 1px 3px 0px grey',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {
    },
}) (MuiExpansionPanel);

export const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
             margin: '12px 0',
        },
    },
    expanded: {

    },
}) (MuiExpansionPanelSummary);

export const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        textAlign: 'justify',
    },
})) (MuiExpansionPanelDetails);
