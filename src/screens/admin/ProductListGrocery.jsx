/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
	reqGetCategoryProductListGrocery,
	reqChangeStatusProductGrocery,
	reqGetProductListGrocery,
	reqDeleteProductItemGrocery,
	reqGetCategoryListGrocery,
} from "../../actions";
import * as types from "../../actions/types";
import BaseComponent from "../../common/BaseComponent";
import * as Constants from "../../utils/Constants";
import * as StringKeys from "../../res/StringKeys";
import SimpleTable from "./SimpleTable";
import ProductItemTable from "../../tables/ProductItemTable";
import * as CustomStorage from "../../utils/CustomStorage";
import * as Utility from "../../utils/Utility";
import CustomPBar from "../../common/CustomPBar";
import CommonButton from "../../common/CommonButton";
import Grid from "@material-ui/core/Grid";

import CommonGridTextField from "../../common/CommonGridTextField";
import CommoanAutocomplete from "../../common/CommoanAutocomplete";
import makeAnimated from "react-select/animated";
import ProductItemTableGrocery from "../../tables/ProductItemTableGrocery";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let toastStyle = { background: "#F62C3A", text: "#FFFFFF" };

const animatedComponents = makeAnimated();

const userData = undefined;

let groceryDetails = undefined;
let TEXTFIELD_XS = 12;
let addButtonIsVisible = false;

class ProductListGrocery extends BaseComponent {
	constructor(props) {
		super(props);
		addButtonIsVisible =
			Utility.isAdmin() &&
			CustomStorage.getSessionDataAsObject(Constants.KEY_GROCERY_DETAILS);
		groceryDetails = Utility.isAdmin()
			? CustomStorage.getSessionDataAsObject(Constants.KEY_GROCERY_DETAILS)
			: CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA)[
					Constants.KEY_GROCERY_DETAILS
			  ];
		this.state = {
			[Constants.KEY_SEARCH]: "",
			[Constants.KEY_SHOW_PROGRESS]: true,
			[Constants.KEY_DATA]: [],
			headerData: [
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Description) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Action) },
			],

			[Constants.KEY_CATEGORIES]:
				groceryDetails[Constants.KEY_CATEGORIES] != undefined
					? groceryDetails[Constants.KEY_CATEGORIES]
					: [],
			categoriesId: [],

			selectedCatOption: "",
		};
	}
	componentDidMount() {
		// this.getProductList();
		this.getProductCatoryList();
		this.getProductList();
	}
	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	handleSearchChange = (name) => (event) => {
		this.setState({ [name]: event.target[Constants.KEY_VALUE] });
	};

	navigateAddPage() {
		this.props.history.push({
			pathname: Utility.isAdmin()
				? Constants.SCREEN_ADD_PRODUCT_GROCERY_ADMIN
				: Constants.SCREEN_ADD_PRODUCT_GROCERY,
		});
	}

	handleSelectedCat = (selectedOption, isDeleted) => {
		console.log("sdfbkjsdbngkvfjn", selectedOption);

		this.setState({
			selectedCatOption: selectedOption,
		});
	};
	handleResetData = () => {
		this.setState({
			[Constants.KEY_SEARCH]: "",
			selectedCatOption: "",
		});
	};

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

					{(!Utility.isAdmin() ||
						(addButtonIsVisible != undefined && addButtonIsVisible != "")) && (
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
					)}
					<CommonGridTextField
						required
						xs={TEXTFIELD_XS}
						style={{ marginTop: 20 }}
						id="restaurantName"
						label={this.strings("Search by Product Name")}
						fullWidth
						className={classes.textField}
						value={this.state[Constants.KEY_SEARCH]}
						onChange={this.handleSearchChange(Constants.KEY_SEARCH)}
						autoComplete="resname"
						variant="outlined"
						fieldStyle={classes.fieldHeight}
						onEnterKey={() => this.getProductList()}
					/>
					<div class="justify-content-start">
						<div class="row">
							<div class="col-sm ">
								<Grid style={{ marginTop: 20 }}>
									<CommoanAutocomplete
										value={this.state.selectedCatOption}
										options={this.state[Constants.KEY_CATEGORIES]}
										components={animatedComponents}
										onChange={this.handleSelectedCat}
										placeholder={this.strings(StringKeys.Select_Product_Type)}
									/>
								</Grid>
							</div>

							<div class="col-sm" style={{ marginTop: 30 }}>
								<CommonButton
									type="search"
									fullWidth={true}
									variant="contained"
									color="secondary"
									ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
									className={classes.submit}
									onClick={() => {
										this.getProductList();
									}}
									label={this.strings(StringKeys.Search)}
									disabled={this.state.disabledClickedBtn}
								/>
							</div>
							<div class="col-sm" style={{ marginTop: 30 }}>
								<CommonButton
									type="search"
									fullWidth={true}
									variant="contained"
									color="secondary"
									ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
									className={classes.submit}
									onClick={() => {
										this.setState(
											() => this.handleResetData(),
											() => this.getProductList(),
										);
									}}
									label={this.strings(StringKeys.Reset)}
									disabled={this.state.disabledClickedBtn}
								/>
							</div>
						</div>
					</div>
					{this.state.headerData !== undefined &&
					this.state.headerData.length > 0 ? (
						<div style={{ marginTop: 15 }} className={classes.tableContainer}>
							<ProductItemTableGrocery
								data={this.state[Constants.KEY_DATA]}
								context={this}
							/>
						</div>
					) : null}
				</Fragment>
			);
	}
	handleResponse = (nextProps) => {
		var respObj = null;
		console.log("data==" + JSON.stringify(nextProps));
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (
				nextProps[Constants.KEY_TYPE] === types.API_GET_PRODUCT_LIST_GROCERY
			) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_PRODUCT_LIST
						],
				};
				this.setState(respObj);
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_DELETE_PRODUCT_GROCERY
			) {
				toast(
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE],
					toastStyle,
				);
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				// this.setState(respObj);
				// this.getProductList();

				// if (groceryDetails != undefined && groceryDetails != null) {

				// } else {
				// 	toast(
				// 		nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE],
				// 		toastStyle,
				// 	);
				// }

				setTimeout(() => {
					this.setState(respObj);
					this.getProductList();
					// this.goBack();
				}, Constants.TIME_OUT_TOAST);
			} else if (
				nextProps[Constants.KEY_TYPE] ===
				types.API_CHANGE_STATUS_PRODUCT_GROCERY
			) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };

				// this.setState(respObj);
				// this.getProductList();

				// if (groceryDetails != undefined && groceryDetails != null) {
				// 	toast(
				// 		nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE],
				// 		toastStyle,
				// 	);
				// } else {
				// 	toast(
				// 		nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE],
				// 		toastStyle,
				// 	);
				// }

				setTimeout(() => {
					this.setState(respObj);
					this.getProductList();
					// this.goBack();
				}, Constants.TIME_OUT_TOAST);
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_LIST_GROCERY_CATEGORY
			) {
				// alert('data kd ' + JSON.stringify(nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]));

				var respObjTmp = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_CATEGORIES]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				console.log("res ", respObjTmp);
				this.setState(respObjTmp);
			}
		}
	};
	getProductList = () => {
		var data = {
			[Constants.KEY_GROCERY_ID]: groceryDetails._id,
		};

		// if (
		// 	this.state[Constants.KEY_SEARCH] != undefined &&
		// 	this.state[Constants.KEY_SEARCH] != null &&
		// 	this.state[Constants.KEY_SEARCH] != ""
		// ) {
		// 	data[Constants.KEY_SEARCH] = this.state[Constants.KEY_SEARCH];
		// }
		if (
			this.state[Constants.KEY_SEARCH] != undefined &&
			this.state[Constants.KEY_SEARCH] != null &&
			this.state[Constants.KEY_SEARCH] != ""
		) {
			data[Constants.KEY_SEARCH] = this.state[Constants.KEY_SEARCH];
		}
		if (
			this.state.selectedCatOption != undefined &&
			this.state.selectedCatOption != null &&
			this.state.selectedCatOption != ""
		) {
			data[Constants.KEY_PRODUCT_CATE_ID] = this.state.selectedCatOption._id;
		}

		this.props.reqGetProductListGrocery(data, this);
	};

	deleteProduct = (productItem) => {
		console.log("jyotish date", productItem);

		var data = {
			[Constants.KEY_UNDERSCORE_ID]: productItem._id,
		};
		this.props.reqDeleteProductItemGrocery(data, this);
	};

	updateStatus = (_id, status) => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: _id,
			[Constants.KEY_STATUS]: !status,
		};
		this.props.reqChangeStatusProductGrocery(data, this);
	};

	getProductCatoryList = () => {
		let data = {
			[Constants.KEY_USERID]: groceryDetails[Constants.KEY_UNDERSCORE_ID],
		};
		this.props.reqGetCategoryProductListGrocery(data, this);
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
ProductListGrocery.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqGetCategoryProductListGrocery,
	reqChangeStatusProductGrocery,
	reqGetProductListGrocery,
	reqDeleteProductItemGrocery,
	reqGetCategoryListGrocery,
})(withStyles(styles)(ProductListGrocery));
