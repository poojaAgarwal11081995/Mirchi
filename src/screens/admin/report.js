import React, { useState, Fragment } from 'react';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import BaseComponent from '../../common/BaseComponent';
import * as StringKeys from '../../res/StringKeys';
import CommonButton from '../../common/CommonButton';
class Report extends BaseComponent {
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
Report.propTypes = {
    classes: PropTypes.object.isRequired,
};

const DatePi = () => {
    const [date, setDate] = useState("")
    return (

        <DatePicker selected={date} onChange={e => setDate(e)} dateFormat="dd/mm/yyyy" />

    )
}
function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, {})(withStyles(styles)(Report));
