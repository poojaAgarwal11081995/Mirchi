import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reqListAdminEarningTimeWiseGrocery } from '../../actions';
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import * as Constants from '../../utils/Constants';
import * as StringKeys from '../../res/StringKeys';
import Grid from '@material-ui/core/Grid';
import CustomPBar from '../../common/CustomPBar';
import * as CustomStorage from '../../utils/CustomStorage'
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as Utility from '../../utils/Utility';

import * as AppColors from '../../res/Colors';

let TEXTFIELD_XS = 12;
const userData = undefined;
const earningDetails = undefined;
let changeAbleDriverId = -1;

class EarringTimeWiseAdminGrocery extends BaseComponent {
    constructor(props) {
        super(props)
        userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
        earningDetails = CustomStorage.getSessionDataAsObject(Constants.KEY_EARINING_DETAILS);

        this.state = {
            [Constants.KEY_SHOW_PROGRESS]: false,
            [Constants.KEY_DATA]: [],
            headerData: [{
                [Constants.KEY_NAME]:
                    this.strings(StringKeys.Name)
            },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Description) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Action) }],
            viewAbleImage: '',
            isVisible: false,
            isVisibleFullImage: false,
            isOpen: false,
            viewFullImage: '',
            earningDriverList: [],
            [Constants.KEY_ADMIN_EARNING_LIST]: []
        };

    }
    componentDidMount() {
        this.listDriverEarning();
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    navigateAddPage() {
        this.props.history.push({
            pathname: Constants.SCREEN_ADD_DRIVER
        });

    }

    handleClick = index => {
        var list = this.state[Constants.KEY_ADMIN_EARNING_LIST];
        list[index].isOpen = list[index].isOpen != undefined ? !list[index].isOpen : true
        this.setState({
            [Constants.KEY_ADMIN_EARNING_LIST]: list
        })

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
                    <div className={classes.appBarSpacer} style={{ paddingTop: 50, }}>

                        {/* <div key={0} className={classes.mainView}
                            style={{ backgroundColor: '#00000000' }}> */}
                        <List style={{ display: "flex" }}>
                            {this.state[Constants.KEY_ADMIN_EARNING_LIST].map((item, index) => {                             
                                let created = Utility.earningCheckTodayDate(item[Constants.KEY_CREATED]);
                                let createdWithsize = created + '(' + item[Constants.KEY_WEEK_EARINING_DAYS].length + ')';

                                return (
                                    <Grid xs={6} key={index} style={{ marginRight: 5, backgroundColor: '#00000000' }}>

                                        <ListItem style={{ backgroundColor: AppColors.colorPrimarySemiTrans }} button onClick={() => {
                                            this.handleClick(index)
                                        }
                                        }
                                        >
                                            <ListItemText
                                                style={{ color: '#FFF' }}
                                                primary={createdWithsize} />
                                            {item.isOpen ? <ExpandLess /> : <ExpandMore />}

                                        </ListItem>


                                        <Collapse in={item.isOpen != undefined ? item.isOpen : false}
                                            timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding
                                            >
                                                {item[Constants.KEY_WEEK_EARINING_DAYS].map((itemChild, index) => {

                                                    return (
                                                        <Grid key={index} style={{ backgroundColor: '#f0f2f5' }}>

                                                            <ListItem button
                                                                onClick={() => {
                                                                }}>

                                                                <Grid container
                                                                    direction="column"
                                                                >

                                                                    {Utility.isAdmin() && <Grid container
                                                                        direction="row"
                                                                        justify="space-between"
                                                                        alignItems="center"
                                                                    >
                                                                        <Grid>
                                                                            <ListItemText
                                                                                primary={"Grocery Name : "} />
                                                                        </Grid>
                                                                        <Grid>
                                                                            <ListItemText
                                                                                primary={itemChild[Constants.KEY_ORDER_DETAILS][Constants.KEY_GROCERY_DETAILS] != undefined && 
                                                                                itemChild[Constants.KEY_ORDER_DETAILS][Constants.KEY_GROCERY_DETAILS][Constants.KEY_STORE_NAME]} />
                                                                        </Grid>
                                                                    </Grid>}

                                                                    <Grid container
                                                                        direction="row"
                                                                        justify="space-between"
                                                                        alignItems="center"
                                                                    >
                                                                        <Grid>
                                                                            <ListItemText
                                                                                primary={itemChild[Constants.KEY_PRODUCT_NAME_LIST]} />
                                                                        </Grid>
                                                                        <Grid>
                                                                            <ListItemText
                                                                                primary={Constants.RUPEES_SIGN + itemChild[Constants.KEY_ORDER_AMOUNT].toFixed(2)} />
                                                                        </Grid>
                                                                        
                                                                    </Grid>
                                                                    <Grid container
                                                                        direction="row"
                                                                        justify="space-between"
                                                                        alignItems="center"
                                                                    >
                                                                    <Grid>
                                                                            <ListItemText
                                                                                primary={"Quantity :" + itemChild.order_detail.qty} />
                                                                        </Grid>
                                                                        <Grid>
                                                                    <ListItemText
                                                                        primary={Utility.getTimeIn24(itemChild[Constants.KEY_CREATED])} />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </ListItem>
                                                            <hr/>
                                                        </Grid>
                                                        
                                                    )
                                                })
                                                }




                                            </List>
                                        </Collapse>





                                    </Grid>
                                )
                            })}



                        </List>


                    </div>

                    {/* </div> */}
                </Fragment>
            )

    }

    handleResponse = (nextProps) => {
        var respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
            respObj = { [Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS] };
        }
        else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {

            if (nextProps[Constants.KEY_TYPE] == types.API_ADMIN_EARNING_PER_WEEK_GROCERY) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false, isApiCalled: true }
                if (nextProps[Constants.KEY_RESPONSE].hasOwnProperty(Constants.KEY_DATA)) {

                    respObj.list = nextProps[Constants.KEY_RESPONSE]
                    [Constants.KEY_DATA][Constants.KEY_ADMIN_EARNING_LIST];

                    respObj[Constants.KEY_ADMIN_EARNING_LIST] = nextProps[Constants.KEY_RESPONSE]
                    [Constants.KEY_DATA][Constants.KEY_ADMIN_EARNING_LIST];

                    respObj.earningList = [];
                    if (nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][Constants.KEY_WEEK_TOTAL_EARNING] != undefined) {
                        respObj.earningList.push({ price: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][Constants.KEY_WEEK_TOTAL_EARNING], name: 'Total Earnings', isSelected: false })
                        respObj.earningList.push({ price: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][Constants.KEY_WEEK_TOTAL_EARNING], name: 'Order Earnings', isSelected: false }),
                            respObj.earningList.push({ price: 0, name: 'Incentives', isSelected: false })
                    }
                }
            }
        }
        if (respObj != undefined) {
            this.setState(respObj);
        }
    }


    navigateEarringPage() {
        this.props.history.push({
            pathname: Constants.SCREEN_ORDER_LIST_GROCERY,
        });
    }


    listDriverEarning = () => {
        this.props.reqListAdminEarningTimeWiseGrocery({
            [Constants.KEY_WEEK_START_DATE]: earningDetails[Constants.KEY_WEEK_START_DATE],
            [Constants.KEY_WEEK_END_DATE]: earningDetails[Constants.KEY_WEEK_END_DATE],
        }, this)
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
    }, root: {
        backgroundColor: theme.palette.background.paper,
    },
});
EarringTimeWiseAdminGrocery.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, { reqListAdminEarningTimeWiseGrocery })(withStyles(styles)(EarringTimeWiseAdminGrocery));


