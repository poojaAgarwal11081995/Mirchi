import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reqOfficeStatusChange, reqOfficeList, reqDeleteOffice } from '../../actions';
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import * as Constants from '../../utils/Constants';
import * as StringKeys from '../../res/StringKeys';
import SimpleTable from './SimpleTable';
import OfficeListItem from '../../tables/OfficeListItem';
import * as CustomStorage from '../../utils/CustomStorage'
import Grid from '@material-ui/core/Grid';
import CommonButton from '../../common/CommonButton';
import CustomPBar from '../../common/CustomPBar';

const userData = undefined;
let TEXTFIELD_XS = 12;
class FloatingCash extends BaseComponent {
    constructor(props) {
        super(props)
        userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
        this.state = {
            [Constants.KEY_SHOW_PROGRESS]: false,
            [Constants.KEY_DATA]: undefined,
            headerData: [{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) }, { [Constants.KEY_NAME]: this.strings(StringKeys.Description) }, { [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) }, { [Constants.KEY_NAME]: this.strings(StringKeys.Action) }]
        };
        this.getOfficeList();
    }
    componentDidMount() {
     
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    navigateAddPage() {
        this.props.history.push({
            pathname: Constants.API_ADD_OFFICE
        });

    }

    render() {
        const { classes } = this.props;
        if (this.state[Constants.KEY_DATA] !== undefined)
            return (
                <Fragment>
                    <div className={classes.appBarSpacer} />

                    <Grid item xs={TEXTFIELD_XS} style={{ marginTop: 0, }}>
                        <CommonButton
                            style={{ marginTop: 20, }}
                            type="submit"
                            fullWidth={false}
                            variant="contained"
                            color="secondary"
                            ref={btnAddCate => this.btnAddCate = btnAddCate}
                            className={classes.submit}
                            onClick={() => {
                                this.navigateAddPage()
                            }}
                            label={this.strings(StringKeys.Add_New)}
                            disabled={this.state.disabledClickedBtn}
                        />
                    </Grid>

                    {
                        (this.state.headerData !== undefined && this.state.headerData.length > 0) ?

                            <div className={classes.tableContainer} style={{ marginTop: 20, }}>
                                <OfficeListItem dataOb={this.state[Constants.KEY_DATA]}
                                    context={this} isEdite={true} />
                            </div>
                            : null
                    }

                </Fragment>
            )
        else if (this.state[Constants.KEY_SHOW_PROGRESS] === true) {
            return (
                <div>
                    <CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]} />
                </div>
            )
        }
        else {
            return (
                <div className={classes.mainView}>

                </div>
            )
        }
    }

    onOfficeDetailClick = (officeItem) => {
        CustomStorage.setSessionDataAsObject(
            Constants.KEY_RESTO_ID, officeItem[Constants.KEY_UNDERSCORE_ID]);
        this.props.navigate(officeItem[Constants.KEY_UNDERSCORE_ID])
    }
    handleResponse = (nextProps) => {
        var respObj = null;
        console.log("response jyotish", nextProps);

        if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
            respObj = { disabledClickedBtn: false, [Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS] };
            this.setState(respObj)
        }
        else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
            if (nextProps[Constants.KEY_TYPE] === types.API_OFFICE_LIST) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false, [Constants.KEY_DATA]: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][Constants.KEY_OFFICE_LIST] };
                this.setState(respObj);
            }
            else if (nextProps[Constants.KEY_TYPE] === types.API_DELETE_OFFICE) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
                this.setState(respObj);
                this.getOfficeList();
            }
            else if (nextProps[Constants.KEY_TYPE] === types.API_OFFICE_STATUS_CHANGE) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
                this.setState(respObj);
                this.getOfficeList();
            }
        }
    }
    getOfficeList = () => {
        var data = {
            offset: 0
        }
        this.props.reqOfficeList(data, this)
    }

    deleteRestro(id) {

        var data = {
            [Constants.KEY_UNDERSCORE_ID]: id
        }
        this.props.reqDeleteOffice(data, this)
    }

    updateStatus = (_id, status) => {
        let data = {
            [Constants.KEY_UNDERSCORE_ID]: _id,
            [Constants.KEY_IS_ACTIVE]: !status
        }
        // alert(JSON.stringify(data))
        this.props.reqOfficeStatusChange(data, this)
    }

    navigate(id) {
        this.props.history.push({
            pathname: Constants.API_EDIT_OFFICE,
            [Constants.KEY_UNDERSCORE_ID]: id
        });
    }


    navigateOrdersPage() {
        this.props.history.push({
            pathname: Constants.SCREEN_SCREEN_CHECK_REQUEST,
        });
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
    mainView: {

        display: 'flex',
        height: '100vh',
        width: '100vw'
    }

});
FloatingCash.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, { reqOfficeStatusChange, reqOfficeList, reqDeleteOffice })(withStyles(styles)(FloatingCash));


