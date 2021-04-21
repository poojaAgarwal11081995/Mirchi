import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reqGetIssueCreatedDriverList } from '../../actions';
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
import ChatApp from './ChatApp';

let TEXTFIELD_XS = 12;


let changeAbleDriverId = -1;

class Support extends BaseComponent {
    constructor(props) {
        super(props)

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
            [Constants.KEY_DRIVER_LIST]: [],
            launcher: false,


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
        var list = this.state[Constants.KEY_DRIVER_LIST];
        list[index].isOpen = list[index].isOpen != undefined ? !list[index].isOpen : true
        this.setState({
            [Constants.KEY_DRIVER_LIST]: list
        })

    }


    // click = (itemChild) => {

    //     console.log("sahgdvfhas", itemChild);

    //     alert(JSON.stringify(itemChild[Constants.KEY_TITLE]));
    // }

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
                            {this.state[Constants.KEY_DRIVER_LIST].map((item, index) => {

                                let name = item[Constants.KEY_DRIVER_DETAILS][0][Constants.KEY_NAME];

                                return (
                                    <Grid xs={6} key={index} style={{ marginRight: 5, backgroundColor: '#00000000' }}>

                                        <ListItem style={{ backgroundColor: AppColors.colorPrimarySemiTrans }} button onClick={() => {
                                            this.handleClick(index)
                                        }}
                                        >
                                            <ListItemText
                                                style={{ color: '#FFF' }}
                                                primary={name} />
                                            {item.isOpen ? <ExpandLess /> : <ExpandMore />}

                                        </ListItem>

                                        <Collapse in={item.isOpen != undefined ? item.isOpen : false}
                                            timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding
                                            >
                                                {item[Constants.KEY_ISSUE_LIST].map((itemChild, index) => {

                                                    return (
                                                        <Grid key={index} style={{ backgroundColor: '#f0f2f5' }}>

                                                            <ListItem button
                                                                onClick={() => {

                                                                    alert(JSON.stringify(itemChild[Constants.KEY_TITLE]))

                                                                    // this.click(itemChild);

                                                                    console.log('ghjgdeewe', item)

                                                                    this.setState({
                                                                        handleQuickButtonClicked: true
                                                                    })
                                                                }}>

                                                                <Grid container
                                                                    direction="column"
                                                                >
                                                                    <Grid container
                                                                        direction="row"
                                                                        justify="space-between"
                                                                        alignItems="center"
                                                                    >
                                                                        <Grid>
                                                                            <ListItemText
                                                                                primary={itemChild[Constants.KEY_TITLE]} />
                                                                        </Grid>
                                                                        <Grid>
                                                                            <ListItemText
                                                                                primary={Utility.convertStrDateFormat(itemChild[Constants.KEY_CREATED],
                                                                                    Constants.DATE_FORMAT_COMING_FROM_SERVER, Constants.DATE_FORMAT_SHOW)} />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <ListItemText
                                                                        primary={(itemChild[Constants.KEY_ISSUE_DSCR])} />
                                                                </Grid>
                                                            </ListItem>

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
                    <ChatApp />
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

            if (nextProps[Constants.KEY_TYPE] == types.API_GET_ISSUE_CREATED_DRIVER_LIST) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false, isApiCalled: true }
                if (nextProps[Constants.KEY_RESPONSE].hasOwnProperty(Constants.KEY_DATA)) {
                    respObj[Constants.KEY_DRIVER_LIST] = nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA];

                }
            }
        }
        if (respObj != undefined) {
            this.setState(respObj);
        }
    }


    navigateEarringPage() {
        this.props.history.push({
            pathname: Constants.SCREEN_ORDER_LIST,
        });
    }


    listDriverEarning = () => {
        this.props.reqGetIssueCreatedDriverList({
            [Constants.KEY_OFFSET]: 0,

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
Support.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, { reqGetIssueCreatedDriverList })(withStyles(styles)(Support));


