import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reqGetRestoList } from '../../actions';
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import * as Constants from '../../utils/Constants';
import * as StringKeys from '../../res/StringKeys';
import SimpleTable from './SimpleTable';


class RestaurantList extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            [Constants.KEY_SHOW_PROGRESS]: true,
            [Constants.KEY_DATA]: [],
            headerData: [{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) }, { [Constants.KEY_NAME]: this.strings(StringKeys.Description) }, { [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) }, { [Constants.KEY_NAME]: this.strings(StringKeys.Action) }]
        };
        this.getRestoList();
    }
    componentDidMount() {

    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <div className={classes.appBarSpacer} />

                {
                    (this.state.headerData !== undefined && this.state.headerData.length > 0) ?

                        <div className={classes.tableContainer}>
                            <SimpleTable data={this.state[Constants.KEY_DATA]} />
                        </div>
                        : null
                }

            </Fragment>
        )
    }
    handleResponse = (nextProps) => {
        var respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
            respObj = { disabledClickedBtn: false, [Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS] };
            this.setState(respObj)
        }
        else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
            if (nextProps[Constants.KEY_TYPE] === types.API_RESTRO_LIST) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false, [Constants.KEY_DATA]: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][Constants.KEY_RESTRO_LIST] };
                this.setState(respObj);
            }
        }
    }
    getRestoList = () => {
        var data = {
          //  [Constants.KEY_TYPE]: 'requestRestro',
          offset:0
        }
        this.props.reqGetRestoList(data, this)
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
RestaurantList.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, { reqGetRestoList })(withStyles(styles)(RestaurantList));


