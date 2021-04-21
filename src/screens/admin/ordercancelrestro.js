import React, { Fragment } from 'react';
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import * as Constants from '../../utils/Constants';
import * as Utility from '../../utils/Utility';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as StringKeys from '../../res/StringKeys';
import PropTypes from 'prop-types';
class OrdercancelRestro extends BaseComponent {
    constructor(props) {
        super(props);

    }
    render() {
        const { classes } = this.props;
        return (

            <Fragment>
                <div className={classes.appBarSpacer} />
                {/* <DatePi /> */}
            </Fragment>
        )

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
    editorStyle: {
        borderColor: "red",
        borderWidth: 10,
        backgroungColor: "green"
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },

});
OrdercancelRestro.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, {})(withStyles(styles)(OrdercancelRestro));