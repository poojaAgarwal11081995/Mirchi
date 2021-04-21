/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import {
	reqChangeStatusCategoryProduct,
	reqGetCategoryProductList,
	reqDeleteCategoriesProduct,
} from "../../actions";
import * as types from "../../actions/types";
import BaseComponent from "../../common/BaseComponent";
import * as Constants from "../../utils/Constants";
import * as StringKeys from "../../res/StringKeys";
import CategoryTable from "../../tables/CategoryTable";
import * as CustomStorage from "../../utils/CustomStorage";
import * as Utility from "../../utils/Utility";
import Grid from "@material-ui/core/Grid";
import CommonButton from "../../common/CommonButton";
import CustomPBar from "../../common/CustomPBar";

let TEXTFIELD_XS = 12;
let userData = undefined;
let restroDetails = undefined;
class ProductCategoryList extends BaseComponent {
	constructor(props) {
		super(props);
		restroDetails = CustomStorage.getSessionDataAsObject(
			Constants.KEY_RESTO_DETAILS,
		);
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			[Constants.KEY_SHOW_PROGRESS]: true,
			[Constants.KEY_DATA]: [],
			headerData: [
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Description) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Created) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Action) },
			],
		};
	}
	componentDidMount() {
		this.getCatoryList();
	}
	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	navigateAddPage() {
		CustomStorage.setSessionDataAsObject(
			Constants.KEY_RESTO_DETAILS,
			restroDetails != undefined ? restroDetails : userData,
		);
		this.props.history.push({
			pathname: Utility.isAdmin()
				? Constants.SCREEN_ADD_PRODUCT_CATEGORY
				: Constants.SCREEN_ADD_PRODUCT_CATEGORY_RESTRO,
		});
	}
	navigateDetails() {
		this.props.history.push({
			pathname: Utility.isAdmin()
				? Constants.SCREEN_PRODUCT_CATEGORIES_DETAIL
				: Constants.SCREEN_PRODUCT_CATEGORIES_DETAIL_RESTRO,
			[Constants.KEY_RESTO_DETAILS]:
				restroDetails != undefined ? restroDetails : userData,
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
					<Grid item xs={TEXTFIELD_XS} style={{ marginTop: 0 }}>
						<CommonButton
							style={{ marginTop: 20 }}
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
					</Grid>

					{this.state.headerData !== undefined &&
					this.state.headerData.length > 0 ? (
						<div className={classes.tableContainer} style={{ marginTop: 20 }}>
							<CategoryTable
								handleChange={this.handleChange}
								headerData={this.state.headerData}
								context={this}
								data={this.state[Constants.KEY_DATA]}
							/>
						</div>
					) : null}
				</Fragment>
			);
	}
	handleResponse = (nextProps) => {
		toast(nextProps[Constants.KEY_MESSAGE]);
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_LIST_CATEGORY) {
				console.log(
					"handleResponse called in nextProps CategoryList Screen  Kishan : ",
					nextProps,
				);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_DELETE_CATEGORIES
			) {
				toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);

				this.getCatoryList();
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_CHANGE_STATUS_CATEGORY
			) {
				toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);

				this.getCatoryList();
			}
		}
	};
	getCatoryList = () => {
		console.log("check===", JSON.stringify(restroDetails));
		let data = {
			[Constants.KEY_USERID]: !Utility.isAdmin()
				? userData[Constants.KEY_USERID]
				: restroDetails != undefined
				? restroDetails[Constants.KEY_UNDERSCORE_ID]
				: userData[Constants.KEY_USERID],
		};
		this.props.reqGetCategoryProductList(data, this);
	};
	deleteCategories(id) {
		let role = Constants.ROLE_RESTAURANT;
		if (Utility.isAdmin()) {
			role = Constants.ROLE_SUPER_ADMIN;
		}
		var data = {
			[Constants.KEY_CATEGORY_ID]: id,
			[Constants.KEY_USERID]: !Utility.isAdmin()
				? userData[Constants.KEY_USERID]
				: restroDetails != undefined
				? restroDetails[Constants.KEY_UNDERSCORE_ID]
				: userData[Constants.KEY_USERID],
			[Constants.KEY_ROLE]: role,
		};
		this.props.reqDeleteCategoriesProduct(data, this);
	}
	updateStatus = (_id, status) => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: _id,
			[Constants.KEY_STATUS]: !status,
		};
		this.props.reqChangeStatusCategoryProduct(data, this);
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
ProductCategoryList.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqChangeStatusCategoryProduct,
	reqGetCategoryProductList,
	reqDeleteCategoriesProduct,
})(withStyles(styles)(ProductCategoryList));
