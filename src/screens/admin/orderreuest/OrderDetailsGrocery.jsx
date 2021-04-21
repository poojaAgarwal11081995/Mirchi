import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { reqAddProductGrocery, reqOrderDetailsGrocery } from '../../../actions';
import BaseComponent from '../../../common/BaseComponent';
import CommonButton from '../../../common/CommonButton';
import CommonTextField from '../../../common/CommonTextField';
import * as StringKeys from '../../../res/StringKeys';
import * as Constants from '../../../utils/Constants';
import * as ResourcesConstants from '../../../res/ResourcesConstants';
import { connect } from 'react-redux';
import * as types from '../../../actions/types';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import CommonGridTextField from '../../../common/CommonGridTextField';
import * as Utility from '../../../utils/Utility';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CustomPBar from '../../../common/CustomPBar';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import * as CustomStorage from '../../../utils/CustomStorage';
import CommonLabel from '../../../common/CommonLabel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as Colors from '../../../res/Colors';
import OrderTimeTable from '../../../tables/OrderTimeTable';
import ProductOnOrderTable from '../../../tables/ProductOnOrderTable';
import UserDetailsOnOrderTable from '../../../tables/UserDetailsOnOrderTable';
import { Link } from '@material-ui/core';
import DriverDetailsOnOrderTable from '../../../tables/DriverDetailsOnOrderTable';
import UserDetailsOnOrderTableGrocery from '../../../tables/UserDetailsOnOrderTableGrocery';
import ProductOnOrderTableGrocery from '../../../tables/ProductOnOrderTableGrocery';
import OrderTimeTableGrocery from '../../../tables/OrderTimeTableGrocery';
import DriverDetailsOnOrderTableGrocery from '../../../tables/DriverDetailsOnOrderTableGrocery';


let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 0;
let orderDetials = undefined;
class OrderDetailsGrocery extends BaseComponent {
    constructor(props) {
        super(props)
        orderDetials = CustomStorage
            .getSessionDataAsObject(Constants.PROPS_ORDER_ITEM);
        this.state = {
            [Constants.KEY_IMAGE]: null,
            [Constants.KEY_STORE_NAME]: '',
            [Constants.KEY_STOCK_AVAIBILITY]: '',
            [Constants.KEY_PRICE]: '',
            [Constants.KEY_DISCOUNT]: '',
            [Constants.KEY_FINAL_PRICE]: '',
            [Constants.KEY_DESCRIPTION]: '',
            errorText: 'Empty field',
            iserror: false,
            [Constants.KEY_SHOW_PROGRESS]: false,
            [Constants.KEY_DATA]: [],
            [Constants.KEY_IMAGE_UPLOAD]: null,
            [Constants.KEY_ORDER_DETAILS]: undefined,
            [Constants.KEY_PRODUCT_LIST]: undefined,
            [Constants.KEY_USER_DETAILS]: undefined,
            [Constants.KEY_DRIVER_DETAILS]: undefined,
            [Constants.KEY_GROCERY_DETAILS]: undefined,


        };

    }
    componentDidMount() {
        this.getOrderDetails();

    }
    ImagePress = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        this.setState({ [Constants.KEY_IMAGE_UPLOAD]: file });
        reader.onloadend = () => {
            this.setState({ [[Constants.KEY_IMAGE]]: reader.result });
        };
        reader.readAsDataURL(file);
    }

    handleChange = input => e => {
        console.log('input', input)
        console.log('value', e.target.value)
        this.setState({
            [input]: e.target.value
        })
    }

    onChange(event) {
        if (event.target.value.length > 0) {
            this.setState({ errorText: '' })
        } else {
            this.setState({ errorText: 'Invalid format: ###-###-####' })
        }
    }

    TransitionDown(props) {

        return <Slide {...props} direction="down" />;
    }
    handleClick = (Transition) => {
        this.setState({
            iserror: true,
            errorText: Transition
        });
    };


    handleClose = () => {
        this.setState({ iserror: false });
    };
    handleExited = () => {

        // this.processQueue();
    };

    render() {
        const { classes } = this.props;
        const { image, name, stock_availability, price, discount, final_price,
            errorText, iserror, description
        } = this.state;

        {
            console.log('Order details :::');

        }

        return (
            <Fragment>
                <div>
                    <div className={classes.appBarSpacer} />

                    <Card className={classes.card}>

                        {this.state[Constants.KEY_ORDER_DETAILS] != undefined && <CardContent >
                            <CardActions disableSpacing style={{
                                flexDirection: 'row', justifyContent: 'space-between', width: '100%'
                            }}>
                                <Typography variant="h5" component="h2"
                                    className={classes.titlegreen} >
                                    {'#' + this.state[Constants.KEY_ORDER_DETAILS][Constants.KEY_ORDER_NUMBER]}
                                </Typography>

                                <Grid item xs={1} style={{ marginRight: 210, }}>
                                    <Typography
                                        style={{
                                            backgroundColor: 'green', color:
                                                '#fff', textAlign: 'center', borderRadius: 20,
                                        }}
                                    >
                                        {Utility.getStatusValue(this.state[Constants.KEY_ORDER_DETAILS][Constants.KEY_STATUS])}
                                    </Typography>

                                </Grid>


                            </CardActions>

                            {/* <CardActions className={classes.titlegreen} disableSpacing style={{
                                flexDirection: 'row', justifyContent: 'space-between', width: '100%'
                            }}>
                                <Typography className={classes.pos} color="textSecondary">
                                    {this.strings(StringKeys.Restaurant_Name)}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {
                                        this.state[Constants.KEY_GROCERY_DETAILS][Constants.KEY_NAME]
                                    }
                                </Typography>
                            </CardActions> */}

                            <CardActions disableSpacing style={{
                                flexDirection: 'row', justifyContent: 'space-between', width: '100%'
                            }}>
                                <Typography className={classes.pos} color="textSecondary">
                                    {this.state[Constants.KEY_PRODUCT_LIST].length} Items for {this.state[Constants.KEY_ORDER_DETAILS][Constants.KEY_TOTAL_PRICE]}
                                </Typography>
                                <Grid item xs={1} style={{ marginRight: 210 }} >
                                    <Typography className={classes.pos} color="textSecondary">
                                        {Utility.convertUTCMiliSToLocalDateFormat(this.state[Constants.KEY_ORDER_DETAILS][Constants.KEY_CREATED], Constants.DATE_FORMAT_SHOW)
                                        }
                                    </Typography>
                                </Grid>
                            </CardActions>

                            {/* <div class="justify-content-start" >
                                <div class="row">
                                    <div class="col-sm ">
                                        <Grid style={{ marginTop: 20, }}>
                                            <Typography className={classes.titlegreen}  >
                                                {this.strings(StringKeys.Restaurant_Name)}
                                            </Typography>
                                        </Grid>
                                    </div>
                                    <div class="col-sm ">
                                        <Grid style={{ marginTop: 20, }}>
                                            <Typography className={classes.titlegreen}>
                                                {
                                                    this.state[Constants.KEY_GROCERY_DETAILS][Constants.KEY_NAME]
                                                }
                                            </Typography>
                                        </Grid>
                                    </div>
                                </div>
                            </div> */}

                            <OrderTimeTableGrocery
                                classes={classes}
                                context={this}
                                data={this.state[Constants.KEY_ORDER_DETAILS]}
                            />
                            <UserDetailsOnOrderTableGrocery
                                style={{ marginTop: 20 }}
                                classes={classes}
                                context={this}
                                groceryDetails={this.state[Constants.KEY_GROCERY_DETAILS]}
                                orderDetails={this.state[Constants.KEY_ORDER_DETAILS]}
                                userDetails={this.state[Constants.KEY_USER_DETAILS]}
                            />
                            {
                                // this.state[Constants.KEY_DRIVER_DETAILS] != undefined &&
                                // this.state[Constants.KEY_DRIVER_DETAILS] != null &&
                                // this.state[Constants.KEY_DRIVER_DETAILS] != '' &&
                                // this.state[Constants.KEY_DRIVER_DETAILS][Constants.KEY_NAME] != undefined &&
                                <DriverDetailsOnOrderTableGrocery
                                    style={{ marginTop: 20 }}
                                    classes={classes}
                                    context={this}
                                    orderDetails={this.state[Constants.KEY_ORDER_DETAILS]}
                                    userDetails={this.state[Constants.KEY_DRIVER_DETAILS]}
                                    groceryDetails={this.state[Constants.KEY_GROCERY_DETAILS]}
                                    
                                />
                            }

                        </CardContent>}

                    </Card>
                    {this.state[Constants.KEY_PRODUCT_LIST] != undefined &&
                        <ProductOnOrderTableGrocery
                            style={{ marginTop: 20 }}
                            classes={classes}
                            context={this}
                            productList={this.state[Constants.KEY_PRODUCT_LIST]}
                        />
                    }




                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.iserror}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        onExited={this.handleExited}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{errorText}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]
                        }
                    />

                    <CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]} />


                </div>

            </Fragment >
        )
    }



    checkVaidation = event => {
        event.preventDefault();
        if (Utility.checkVaidationAddProduct(this.state, this)) {
            this.addProductReq();
        }
    }



    getOrderDetails = (_id) => {
        var data = {
            [Constants.KEY_UNDERSCORE_ID]: orderDetials[Constants.KEY_UNDERSCORE_ID]
        }
        this.props.reqOrderDetailsGrocery(data, this)
    }


    handleResponse = (nextProps) => {
        var respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
            respObj = { disabledClickedBtn: false, [Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS] };
            this.setState(respObj)
        }
        else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
            if (nextProps[Constants.KEY_TYPE] === types.API_ADD_PRODUCT_GROCERY) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false, disabledClickedBtn: false };
                this.setState(respObj);
                this.goBack();
            } else if (nextProps[Constants.KEY_TYPE] === types.API_GROCERY_LIST) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false, [Constants.KEY_DATA]: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][Constants.KEY_GROCERY_LIST] };
                this.setState(respObj);
            } else if (nextProps[Constants.KEY_TYPE] === types.API_ORDER_DETAILS_GROCERY) {
                let data = nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA];
                let userDetails = data[Constants.KEY_USER_DETAILS];
                let groceryDetails = data[Constants.KEY_GROCERY_DETAILS];
                let productList = data[Constants.KEY_PRODUCT_LIST];
                let driverDetails = data[Constants.KEY_DRIVER_DETAILS];
                respObj = {
                    [Constants.KEY_SHOW_PROGRESS]: false,
                    [Constants.KEY_ORDER_DETAILS]: data,
                    [Constants.KEY_USER_DETAILS]: userDetails,
                    [Constants.KEY_DRIVER_DETAILS]: driverDetails,
                    [Constants.KEY_GROCERY_DETAILS]: groceryDetails,
                    [Constants.KEY_PRODUCT_LIST]: productList,
                };
                this.setState(respObj);
            }
        }

    }

}

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
    bigAvatar: {
        margin: 10,
        width: 100,
        height: 100,
    },
    fieldHeight: {
        height: 50,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    editFildSpace: {
        margin: 1000,
    },

    root: {
        flexGrow: 1,
        height: 250,
    },
    lebelStyle: {

    }
    ,
    input: {
        display: 'flex',
        padding: 0,
        height: 'auto',
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ?
                theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    singleValue: {
        fontSize: 16,
    },
    zind: {
        zIndex: 0,
        position: "absolute"
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        bottom: 6,
        fontSize: 16,
    }, card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    titlegreen: {
        fontSize: 20,
        color: Colors.colorGreen
    },
    pos: {
        marginBottom: 12,
    },


});
OrderDetailsGrocery.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
    return response;
}

export default connect(mapStateToProps, { reqOrderDetailsGrocery, reqAddProductGrocery })(withStyles(styles)(OrderDetailsGrocery));

