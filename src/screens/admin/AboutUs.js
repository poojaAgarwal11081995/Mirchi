
import React, { useState, Fragment } from 'react';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import BaseComponent from '../../common/BaseComponent';
import * as StringKeys from '../../res/StringKeys';
import CommonButton from '../../common/CommonButton';








class AboutUs extends BaseComponent {

    //const [about, setAbout] = useState('')
    state = {
        about: ''
    }
    // handleClick() {
    //     alert("About us");
    // }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <div className={classes.appBarSpacer} />

                <Editor
                    editorStyle={editorStyle}
                    editorState={this.state.about}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={(txt) => this.setState({ about: txt })}
                />
                <CommonButton
                    styles={{ marginTop: "20px" }}
                    type="submit"
                    fullWidth={false}
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    // onClick={this.checkVaidation}
                    // onClick={this.handleClick}
                    label={this.strings(StringKeys.Save)}

                />


            </Fragment>
        )
    }

}


const editorStyle = {
    border: " 1px solid black",
    padding: "7px",
    borderRadius: " 2px",
    height: "300px",
    width: " 100%",

};



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
AboutUs.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, {})(withStyles(styles)(AboutUs));
