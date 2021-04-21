/** @format */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BaseComponent from "../../../common/BaseComponent";
import { connect } from "react-redux";
class AddZip extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.appBarSpacer}></div>
				<div>hello </div>
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

AddZip.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps(response) {
	return response;
}
export default connect(mapStateToProps)(withStyles(styles)(AddZip));
