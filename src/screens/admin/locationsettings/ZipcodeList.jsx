/** @format */

import React from "react";
import PropTypes from "prop-types";
import BaseComponent from "../../../common/BaseComponent";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import * as Constants from "../../../utils/Constants";
class ZipcodeList extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	navigate() {
		this.props.history.push({
			pathname: Constants.SCREEN_ZIP_CODE,
		});
	}
	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.appBarSpacer} />
				<p>welcome to my zipcode list</p>
				<button
					onClick={() => {
						this.navigate();
					}}>
					Add
				</button>
			</div>
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
});
ZipcodeList.PropTypes = {
	classes: PropTypes.object.isRequired,
};
const mapStateToProps = (response) => {
	return response;
};
export default connect(mapStateToProps, {})(withStyles(styles)(ZipcodeList));
