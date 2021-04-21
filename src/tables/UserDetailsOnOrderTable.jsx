import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as Constants from '../utils/Constants';
import CommonSwitch from '../common/CommonSwitch';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DetailButton from '@material-ui/icons/NavigateNext';

import { Link } from 'react-router-dom';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import * as CustomStorage from '../utils/CustomStorage';
import * as StringKeys from '../res/StringKeys';

import ActiveIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import InActiveIcon from '@material-ui/icons/Clear';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import * as ResourcesConstants from '../res/ResourcesConstants';





const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 200,
    }, gridList: {
        width: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
};

let id = 0;


function UserDetailsOnOrderTable(props) {

    const { classes, data, context, userDetails, style, orderDetails, restroDetails } = props;

    function navigateOnMap() {

        context.props.history.push({
            pathname: Constants.SCREEN_TRACK_ORDER_IN_ADMIN
        });

    }

    return (
        <div>
            {
                <CardContent>
                    <Typography color="textSecondary" style={{ padding: 0 }} >
                        User Details
                        </Typography>
                    <CardActions disableSpacing style={{
                        flexDirection: 'row', width: '100%', padding: 0,
                        marginLeft: -3
                    }}>
                        <Grid item xs={3}>
                            <Typography color="textSecondary" style={{
                                justifyContent: 'flex-start', alignItems: 'flex-start', padding: 3
                            }}>
                                Restro Name: {restroDetails[Constants.KEY_NAME]}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography color="textSecondary" style={{
                                justifyContent: 'flex-start', alignItems: 'flex-start'
                            }}>
                                Name: {userDetails[Constants.KEY_NAME]}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography color="textSecondary">
                                Phone: {userDetails[Constants.KEY_PHONE]}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography color="textSecondary">
                                Email:  {userDetails[Constants.KEY_EMAIL]}
                            </Typography>
                        </Grid>
                        {
                            orderDetails[Constants.KEY_STATUS] == Constants.ORDER_STATUS_PICKED_UP &&
                            <Grid item xs={1}>

                                <Typography onClick={() => {
                                    navigateOnMap();
                                }} color="textSecondary" style={{
                                    backgroundColor: 'red', color:
                                        '#fff', textAlign: 'center', borderRadius: 10
                                }}>
                                    TrackOrder
                            </Typography>
                            </Grid>
                        }
                    </CardActions>
                </CardContent>

            }
        </div>
    );
}

UserDetailsOnOrderTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserDetailsOnOrderTable);