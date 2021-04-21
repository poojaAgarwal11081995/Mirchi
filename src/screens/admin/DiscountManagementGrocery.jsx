import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reqChangeStatusCouponGrocery, reqDiscountListGrocery, reqDeleteCouponGrocery } from '../../actions';
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import * as Constants from '../../utils/Constants';
import * as StringKeys from '../../res/StringKeys';
import * as CustomStorage from '../../utils/CustomStorage';
import * as Utility from '../../utils/Utility'
import CustomPBar from '../../common/CustomPBar';
import CommonButton from '../../common/CommonButton';
import Grid from '@material-ui/core/Grid';
import CouponTable from '../../tables/CouponTable';
import DiscountTable from '../../tables/DiscountTable';

let userDetails = undefined;
let TEXTFIELD_XS = 12;
class DiscountManagementGrocery extends BaseComponent {
    constructor(props) {
        super(props)
        userDetails = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);

        this.state = {
            [Constants.KEY_SHOW_PROGRESS]: false,
            [Constants.KEY_DATA]: [],
            headerData: [{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) }, { [Constants.KEY_NAME]: this.strings(StringKeys.Description) }, { [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) }, { [Constants.KEY_NAME]: this.strings(StringKeys.Action) }]
        };


    }
    componentDidMount() {
        this.getCouponList();
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    navigateAddPage() {
        this.props.history.push({
            pathname: Constants.SCREEN_ADD_DISCOUNT_GROCERY
        });
    }

    render() {
        const { classes } = this.props;
        if (this.state[Constants.KEY_SHOW_PROGRESS] == true) {
            return (
                <div className={classes.mainView}>
                    <CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]} />
                </div>
            )
        } else
            return (
                <Fragment>
                    <div className={classes.appBarSpacer} />

                    {<Grid item xs={TEXTFIELD_XS} style={{ marginTop: 0, }}>
                        <CommonButton
                            style={{ marginTop: 20, }}
                            type="submit"
                            fullWidth={false}
                            variant="contained"
                            color="secondary"
                            ref={btnAddCate => this.btnAddCate = btnAddCate}
                            className={classes.submit}
                            onClick={() => {
                                CustomStorage.setSessionDataAsObject(
                                    Constants.KEY_COUPON_DETAILS, null);
                                this.navigateAddPage()
                            }}
                            label={this.strings(StringKeys.Add_New)}
                            disabled={this.state.disabledClickedBtn}
                        />
                    </Grid>}

                    {
                        (this.state.headerData !== undefined && this.state.headerData.length > 0) ?

                            <div style={{ marginTop: 15 }} className={classes.tableContainer}>
                                <DiscountTable data={this.state[Constants.KEY_DATA]}
                                    context={this}
                                />
                            </div>
                            : null
                    }

                </Fragment>
            )
    }
    handleResponse = (nextProps) => {
        var respObj = null;
        console.log('data==' + JSON.stringify(nextProps));
        if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
            respObj = { disabledClickedBtn: false, [Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS] };
            this.setState(respObj)
        }
        else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
            if (nextProps[Constants.KEY_TYPE] === types.API_DISCOUNT_LIST_GROCERY) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false, [Constants.KEY_DATA]: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA] };
                this.setState(respObj);
            } else if (nextProps[Constants.KEY_TYPE] === types.API_DELETECOUPONCODE_GROCERY) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
                this.setState(respObj);
                this.getCouponList();
            } else if (nextProps[Constants.KEY_TYPE] === types.API_CHANGECOUPONCODESTATUS_GROCERY) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
                this.setState(respObj);
                this.getCouponList();
            }
        }
    }
    getCouponList = () => {
        var data = {
            [Constants.KEY_USERID]: userDetails != null ? userDetails[Constants.KEY_USERID] : 0,
            [Constants.KEY_ROLE]: userDetails != null ? userDetails[Constants.KEY_ROLE] : ""
        }
        this.props.reqDiscountListGrocery(data, this)
    }

    deleteCoupon = (couponItem) => {

        var data = {
            [Constants.KEY_UNDERSCORE_ID]: couponItem[Constants.KEY_UNDERSCORE_ID]
        }
        this.props.reqDeleteCouponGrocery(data, this)
    }
    updateStatus = (_id, status) => {
        let data = {
            [Constants.KEY_UNDERSCORE_ID]: _id,
            [Constants.KEY_IS_ACTIVE]: !status,
            [Constants.KEY_USERID]: userDetails[Constants.KEY_USERID],
            [Constants.KEY_ROLE]: userDetails[Constants.KEY_ROLE]
        }
        this.props.reqChangeStatusCouponGrocery(data, this)
    }
}

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
});
DiscountManagementGrocery.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, { reqChangeStatusCouponGrocery, reqDiscountListGrocery, reqDeleteCouponGrocery })(withStyles(styles)(DiscountManagementGrocery));


