/** @format */

import React, { Fragment } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import BaseComponent from "../../../../common/BaseComponent";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Grid from "@material-ui/core/Grid";
import CommonButton from "../../../../common/CommonButton";
import * as types from "../../../../actions/types";
import * as Constants from "../../../../utils/Constants";
let TEXTFIELD_XS = 12;
class CMStable extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			editorState: EditorState.createEmpty(),
			modal: false,
			valueState: "",
		};
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};
	handleResponse = (nextProps) => {
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_ORDER_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]: "",
				};
				this.setState(respObj);
			}
		}
	};

	onEditorStateChange = (editorState) => {
		const contentState = editorState.getCurrentContent();
		const contentStateValue = convertToRaw(contentState).blocks[0].text;
		console.log("content state", contentStateValue);
		this.setState({
			editorState,
			valueState: contentStateValue,
		});
	};
	onEditorStateChange = (editorState) => {
		const contentState = editorState.getCurrentContent();
		const contentStateValue = convertToRaw(contentState).blocks[0].text;
		console.log("content state", contentStateValue);
		this.saveEditorContent(contentStateValue);
		this.setState({
			editorState,
			valueState: contentStateValue,
		});
	};

	render() {
		const { editorState, modal, valueState } = this.state;
		const { classes } = this.props;

		return (
			<Fragment>
				<div div className={classes.appBarSpacer} />
				<div>
					<Editor
						editorState={editorState}
						wrapperClassName="demo-wrapper"
						editorClassName="demo-editor"
						onEditorStateChange={this.onEditorStateChange}
					/>
					<table id="customers">
						<tr>
							<th style={{ width: "80%" }}>privacy and policy</th>

							<th style={{ width: "20%" }}>Save</th>
						</tr>
						<tr>
							<td style={{ width: "80%" }}>{valueState}</td>
							<td style={{ width: "20%" }}>
								<Grid
									item
									xs={1}
									container
									alignItems={"center"}
									justify={"center"}
									direction={"column"}>
									<CommonButton
										type="submit"
										fullWidth={false}
										variant="contained"
										style={{ marginTop: 15 }}
										color="secondary"
										ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
										className={classes.submit}
										onClick={this.toggle}
										label={this.strings("Save")}
										disabled={this.state.disabledClickedBtn}
									/>
								</Grid>
							</td>
						</tr>
					</table>
				</div>
			</Fragment>
		);
	}
}

const styles = (theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
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
		backgroungColor: "green",
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
});
CMStable.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {})(withStyles(styles)(CMStable));
