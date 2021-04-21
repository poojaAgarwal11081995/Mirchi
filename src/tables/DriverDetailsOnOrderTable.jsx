import React, {Component } from 'react';
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
import { reqOrderCompleted } from '../actions/';
import { connect } from 'react-redux';
import * as types from '../actions/types';
import { get } from 'lodash'




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
class DriverDetailsOnOrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            [Constants.KEY_UNDERSCORE_ID]: get(this.props.orderDetails,[Constants.KEY_UNDERSCORE_ID],''),
            [Constants.KEY_DELIVERY_MAN_ID]: get(this.props.orderDetails,[Constants.KEY_DELIVERY_MAN_ID],''),
            [Constants.KEY_STATUS]: get(this.props.orderDetails,[Constants.KEY_STATUS],''),
            [Constants.KEY_PAYMENT_MODE]: get(this.props.orderDetails,[Constants.KEY_PAYMENT_MODE],''),
            [Constants.KEY_CASH]: get(this.props.orderDetails,'total_price','')
         }
    }


    
 orderCompleted = () => {
    var data ={
    [Constants.KEY_STATUS]: "OD",
    [Constants.KEY_UNDERSCORE_ID]: this.state[Constants.KEY_UNDERSCORE_ID],
            [Constants.KEY_DELIVERY_MAN_ID]: this.state[Constants.KEY_DELIVERY_MAN_ID],
            [Constants.KEY_PAYMENT_MODE]: this.state[Constants.KEY_PAYMENT_MODE],
            [Constants.KEY_CASH]: this.state[Constants.KEY_CASH]
    }
        this.props.reqOrderCompleted(data,this)
    }

   

    handleResponse = async (nextProps) => {
        var respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
            respObj = { disabledClickedBtn: false, [Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS] };
            this.setState(respObj)
        }
        else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
            if (nextProps[Constants.KEY_TYPE] === types.API_ORDER_COMPLETED) {
               await this.props.context.getOrderDetails()
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false, disabledClickedBtn: false,[Constants.KEY_STATUS]: "OD" };
                this.setState(respObj);
            }
        }

    }
    render() { 
        
    const { classes, data, context, userDetails, style, orderDetails } = this.props;

    return (
        <div>
            {
                <CardContent>
                    <Typography color="textSecondary">
                        Driver Details
                        </Typography>
                    <CardActions disableSpacing style={{
                        flexDirection: 'row', width: '100%', padding: 0,
                        marginLeft: -3
                    }}>
                        <Grid item xs={3}>
                            <Typography color="textSecondary" style={{
                                justifyContent: 'flex-start', alignItems: 'flex-start', padding: 3
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
                            <Grid item xs={2}>
                                <Typography onClick={() => {
                                     this.orderCompleted();
                                }} color="textSecondary" style={{
                                    backgroundColor: 'red', color:
                                        '#fff', textAlign: 'center', borderRadius: 10,cursor:'pointer'
                                }}>
                                    Order Complete
                            </Typography>
                            </Grid>
                        }
                    </CardActions>
                </CardContent>

            }
        </div>
    );
}
}

DriverDetailsOnOrderTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, { reqOrderCompleted })(withStyles(styles)(DriverDetailsOnOrderTable));