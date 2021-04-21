/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BaseComponent from "../../common/BaseComponent";
class ProfitMode extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.appBarSpacer} />
				<div>welcome to Admin profit page</div>
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
ProfitMode.propTypes = {
	classes: PropTypes.object.isRequired,
};
function mapStateToProps(response) {
	return response;
}
export default connect(mapStateToProps)(withStyles(styles)(ProfitMode));
