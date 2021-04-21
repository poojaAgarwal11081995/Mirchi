/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import {
	reqChangeStatusCountry,
	reqCountryList,
	reqDeleteCountry,
} from "../../../actions";
import * as types from "../../../actions/types";
import BaseComponent from "../../../common/BaseComponent";
import * as Constants from "../../../utils/Constants";
import * as StringKeys from "../../../res/StringKeys";
import * as CustomStorage from "../../../utils/CustomStorage";
import CountryTable from "../../../tables/CountryTable";
import CommonButton from "../../../common/CommonButton";
import CustomPBar from "../../../common/CustomPBar";
import DeleteItemDialog from "../../../common/DeleteItemDialog";

const userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);

class CountryList extends BaseComponent {
	constructor(props) {
		super(props);
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			[Constants.KEY_SHOW_PROGRESS]: true,
			[Constants.KEY_DATA]: [],
			headerData: [
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Country_Code) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Dial_Code) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },

				{ [Constants.KEY_NAME]: this.strings("Created") },
				{ [Constants.KEY_NAME]: this.strings("Enable") },

				{ [Constants.KEY_NAME]: this.strings(StringKeys.Action) },
			],

			isDeleteDialog: false,
			deleted_msg: this.strings(StringKeys.Delete_Country_Msg),
			delete_title: this.strings(StringKeys.Dialog_Title),
			selected_item: undefined,
		};
	}
	componentDidMount() {
		this.getCountryList();
	}
	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};
	deleteCountry = (id) => {
		var data = {
			[Constants.KEY_UNDERSCORE_ID]: id,
		};
		this.props.reqDeleteCountry(data, this);
	};
	navigate() {
		this.props.history.push({
			pathname: Constants.SCREEN_STATE_LIST,
		});
	}
	navigateAddPage() {
		this.props.history.push({
			pathname: Constants.SCREEN_ADD_COUNTRY,
		});
	}

	render() {
		const { classes } = this.props;

		if (this.state[Constants.KEY_SHOW_PROGRESS] == true) {
			return (
				<div className={classes.mainView}>
					<CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]} />
				</div>
			);
		} else
			return (
				<Fragment>
					<div className={classes.appBarSpacer} />
					<CommonButton
						type="submit"
						fullWidth={false}
						variant="contained"
						color="secondary"
						ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
						className={classes.submit}
						onClick={() => {
							this.navigateAddPage();
						}}
						label={this.strings(StringKeys.Add_New)}
						disabled={this.state.disabledClickedBtn}
					/>

					{this.state.headerData !== undefined &&
					this.state.headerData.length > 0 ? (
						<div className={classes.tableContainer}>
							<CountryTable
								handleChange={this.handleChange}
								headerData={this.state.headerData}
								// data={this.state[Constants.KEY_DATA]}
								dataOb={this.state[Constants.KEY_DATA]}
								context={this}
							/>
						</div>
					) : null}

					{/* <DeleteItemDialog
						showYesNo={this.state.isDeleteDialog}
						secondBtnClick={this.cancelBtnClick}
						// title={this.state.delete_title}
						title={this.strings(StringKeys.APP_NAME_STRING)}
						content={this.state.deleted_msg}
						firstBtnName={this.strings(StringKeys.Okay)}
						secondBtnName={this.strings(StringKeys.Cancel)}
						firstBtnClick={this.okayBtnClick}
					/> */}
				</Fragment>
			);
	}

	// okayBtnClick = () => {
	// 	if (
	// 		this.state.selected_item != undefined &&
	// 		this.state.selected_item != ""
	// 	) {
	// 		var data = {
	// 			[Constants.KEY_UNDERSCORE_ID]: this.state.selected_item[
	// 				Constants.KEY_UNDERSCORE_ID
	// 			],
	// 		};
	// 		this.props.reqDeleteCountry(data, this);
	// 		this.setState({ isDeleteDialog: false });
	// 	}
	// };
	// cancelBtnClick = () => {
	// 	this.setState({ isDeleteDialog: false });
	// };

	handleResponse = (nextProps) => {
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_COUNTRY_LIST) {
				// alert(
				// 	JSON.stringify(nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]),
				// );
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_DELETE_COUNTRY) {
				toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					// [Constants.KEY_DATA]:
					// 	nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
				this.getCountryList();
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_CHANGE_STATUS_COUNTRY
			) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				this.getCountryList();
			}
		}
	};
	getCountryList = () => {
		let data = {
			[Constants.KEY_USERID]: userData[Constants.KEY_USERID],
		};

		this.props.reqCountryList(data, this);
	};

	deleteCountry(item) {
		this.setState({ selected_item: item, isDeleteDialog: true });
	}

	updateStatus = (_id, status) => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: _id,
			[Constants.KEY_STATUS]: !status,
		};
		this.props.reqChangeStatusCountry(data, this);
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
	submit: {
		marginBottom: theme.spacing.unit * 3,
	},
});
CountryList.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqChangeStatusCountry,
	reqCountryList,
	reqDeleteCountry,
})(withStyles(styles)(CountryList));
