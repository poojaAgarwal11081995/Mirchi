/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { reqGroceryDriverReportFromIdAdmin } from "../../../../../actions";
import * as types from "../../../../../actions/types";
import BaseComponent from "../../../../../common/BaseComponent";
import * as Constants from "../../../../../utils/Constants";
import * as StringKeys from "../../../../../res/StringKeys";
import * as CustomStorage from "../../../../../utils/CustomStorage";
import Grid from "@material-ui/core/Grid";
import CommonButton from "../../../../../common/CommonButton";
import makeAnimated from "react-select/animated";
import ReportDatePicker from "../../../../../common/ReportDatePicker";
import GroceryDriverIdTable from "./GroceryDriverIDTable";
import CommonGridTextField from "../../../../../common/CommonGridTextField";
const animatedComponents = makeAnimated();

let userData = undefined;
class GroceryDriverIdComponent extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			[Constants.KEY_SHOW_PROGRESS]: true,
			_id: this.props.location[Constants.KEY_DATA]["_id"],
			[Constants.KEY_DATA]: [],
			headerData: [
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Order_id) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Discount_Coupen) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Discount_per) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Discount_Amount) },
			],
			viewAbleImage: "",
			[Constants.KEY_END_DATE]: null,
			[Constants.KEY_START_DATE]: null,
			isVisible: false,
			isVisibleFullImage: false,
			viewFullImage: "",
			[Constants.KEY_SEARCH]: undefined,
			[Constants.KEY_SEARCH_ORDER]: undefined,
			selectedOption: undefined,
		};
	}
	componentDidMount() {
		this.getDiscountList();
	}

	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};
	handleSearchChange = (name) => (event) => {
		this.setState({ [name]: event.target[Constants.KEY_VALUE] });
	};
	handleChangeStatus = (selectedOptionm, isDeleted) => {
		this.setState({ selectedOption: selectedOptionm });
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<div className={classes.appBarSpacer} />

				<div class="justify-content-start">
					<div class="row"></div>
				</div>

				{this.state.headerData !== undefined &&
				this.state.headerData.length > 0 ? (
					<div className={classes.tableContainer} style={{ marginTop: 20 }}>
						<GroceryDriverIdTable
							dataOb={this.state[Constants.KEY_DATA]}
							context={this}
						/>
					</div>
				) : null}
			</Fragment>
		);
	}
	onSelectedDate = (date, key) => {
		this.setState({ [key]: date });
	};

	getDiscountList = () => {
		var data = {
			delivery_man_id: this.state["_id"],
		};

		this.props.reqGroceryDriverReportFromIdAdmin(data, this);
	};

	handleResponse = (nextProps) => {
		var respObj = null;
		console.log("nextProps", nextProps);
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (
				nextProps[Constants.KEY_TYPE] ===
				types.API_URL_RESTAURANT_DRIVER_REPORT_ID
			) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_DATA
						],
				};
				this.setState(respObj);
			}
		}
	};
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
GroceryDriverIdComponent.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}

export default connect(mapStateToProps, { reqGroceryDriverReportFromIdAdmin })(
	withStyles(styles)(GroceryDriverIdComponent),
);
