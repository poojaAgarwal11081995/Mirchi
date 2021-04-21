/* eslint-disable no-script-url */

import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './TitleChart';
import *as Constants from '../../utils/Constants';
import *as Utility from '../../utils/Utility';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function ChartDepositsGrocery(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Today Earning</Title>
            <Typography component="p" variant="h4">
            {props[Constants.KEY_DATA] != undefined && props[Constants.KEY_DATA][Constants.KEY_ADMIN_TODAY_EARNING] != undefined
                && props[Constants.KEY_DATA][Constants.KEY_ADMIN_TODAY_EARNING].length > 0 ? (Constants.RUPEES_SIGN) + props[Constants.KEY_DATA][Constants.KEY_ADMIN_TODAY_EARNING][0][Constants.KEY_TOTAL_PRICE].toFixed(2) : (Constants.RUPEES_SIGN) + '0'}
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
            {"on " + Utility.currentDate()}
        </Typography>
        <div>
        <Link to={Utility.isAdmin() ? Constants.SCREEN_ADMIN_EARNING_GROCERY : Constants.SCREEN_GROCERY_EARNING} color="primary" href="javascript:;">
                    {Utility.isAdmin() ? "View Admin Earning" : "View Grocery Earning"}
                </Link>
           
        </div>
        </React.Fragment>
    );
}
