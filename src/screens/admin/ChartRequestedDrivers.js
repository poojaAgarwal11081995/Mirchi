/* eslint-disable no-script-url */

import React from 'react';
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './TitleChart';
import * as Constants from '../../utils/Constants';
import * as Utility from '../../utils/Utility';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function ChartRequestedDrivers(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Requested Drivers</Title>
            <Typography component="p" variant="h4">
                {props[Constants.KEY_DATA] != undefined ? props[Constants.KEY_DATA][Constants.KEY_REQ_DRIVER_COUNT] : '0'}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                {"on " + Utility.currentDate()}
      </Typography>
            <div>
                <Link to={Constants.SCREEN_DASHBOARD_REQUESTED} color="primary" href="javascript:;">
                    View Requested Drivers
        </Link>
            </div>
        </React.Fragment>
    );
}
