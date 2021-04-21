/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import {
	reqChangeStatusCategoryProductGrocery,
	reqGetCategoryListGrocery,
	reqDeleteCategoriesGrocery,
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
import DeleteItemDialog from "../../common/DeleteItemDialog";
import CommonGridTextField from "../../common/CommonGridTextField";

let TEXTFIELD_XS = 12;
let userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
class CategoryListGrocery extends BaseComponent {
	constructor(props) {
		super(props);
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);

		this.state = {
			[Constants.KEY_SHOW_PROGRESS]: true,
			[Constants.KEY_DATA]: [],
			headerData: [
				{ [Constants.KEY_NAME]: this.strings("Category Name") },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Description) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Created) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Action) },
			],
			isDeleteDialog: false,
			deleted_msg: this.strings(StringKeys.Delete_Restro_Category_Msg),
			delete_title: this.strings(StringKeys.Dialog_Title),
			selected_item: undefined,
		};
		this.getCatoryList();
	}
	componentDidMount() {}
	handleChange = (name) => (event) => {
		console.log("gavsghdcvahjv", event.target);

		this.setState({ [name]: event.target.checked });
	};

	handleSearchChange = (name) => (event) => {
		console.log("sagfdcahbs", event.target);

		this.setState({ [name]: event.target.value });
	};

	navigateAddPage() {
		this.props.history.push({
			pathname: Constants.SCREEN_ADD_CATEGORY_GROCERY,
		});
	}

	navigateDetails() {
		this.props.history.push({
			pathname: Constants.SCREEN_CATEGORIES_DETAIL_ADMIN_GROCERY,
		});
	}
	handleReeset() {
		this.setState({
			[Constants.KEY_SEARCH]: "",
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

					<div class="justify-content-start">
						<div class="row">
							<div class="col-sm-8 ">
								<Grid style={{ marginTop: 20 }}>
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: 20 }}
										id="restaurantName"
										label={this.strings(StringKeys.Search_By_Category)}
										fullWidth
										className={classes.textField}
										value={this.state[Constants.KEY_SEARCH]}
										onChange={this.handleSearchChange(Constants.KEY_SEARCH)}
										autoComplete="resname"
										variant="outlined"
										fieldStyle={classes.fieldHeight}
										onEnterKey={() => this.getCatoryList()}
									/>
								</Grid>
							</div>

							<div class="col-sm-2" style={{ marginTop: 30 }}>
								<CommonButton
									type="search"
									fullWidth={true}
									variant="contained"
									color="secondary"
									ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
									className={classes.submit}
									onClick={() => {
										this.getCatoryList();
									}}
									label={this.strings(StringKeys.Search)}
									disabled={this.state.disabledClickedBtn}
								/>
							</div>
							<div class="col-sm-2" style={{ marginTop: 30 }}>
								<CommonButton
									type="search"
									fullWidth={true}
									variant="contained"
									color="secondary"
									ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
									className={classes.submit}
									onClick={() => {
										this.setState(
											() => this.handleReeset(),
											() => this.getCatoryList(),
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
						<div className={classes.tableContainer} style={{ marginTop: 20 }}>
							<CategoryTable
								handleChange={this.handleChange}
								headerData={this.state.headerData}
								context={this}
								data={this.state[Constants.KEY_DATA]}
							/>
						</div>
					) : null}

					<DeleteItemDialog
						showYesNo={this.state.isDeleteDialog}
						secondBtnClick={this.cancelBtnClick}
						// title={this.state.delete_title}
						title={this.strings(StringKeys.APP_NAME_STRING)}
						content={this.state.deleted_msg}
						firstBtnName={this.strings(StringKeys.Okay)}
						secondBtnName={this.strings(StringKeys.Cancel)}
						firstBtnClick={this.okayBtnClick}
					/>
				</Fragment>
			);
	}

	okayBtnClick = () => {
		if (
			this.state.selected_item != undefined &&
			this.state.selected_item != ""
		) {
			let role = Constants.ROLE_GROCERY;
			if (Utility.isAdmin()) {
				role = Constants.ROLE_SUPER_ADMIN;
			}
			var data = {
				[Constants.KEY_CATEGORY_ID]: this.state.selected_item[
					Constants.KEY_UNDERSCORE_ID
				],
				[Constants.KEY_USERID]: userData[Constants.KEY_USERID],
				[Constants.KEY_ROLE]: role,
			};
			this.props.reqDeleteCategoriesGrocery(data, this);

			this.setState({ isDeleteDialog: false });
		}
	};
	cancelBtnClick = () => {
		this.setState({ isDeleteDialog: false });
	};

	handleResponse = (nextProps) => {
		console.log("handleResponse+++++++++++++++++", nextProps);
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_LIST_GROCERY_CATEGORY) {
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
				nextProps[Constants.KEY_TYPE] === types.API_DELETE_CATEGORIES_GROCERY
			) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				this.getCatoryList();
			} else if (
				nextProps[Constants.KEY_TYPE] ===
				types.API_CHANGE_STATUS_CATEGORY_GROCERY
			) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				this.getCatoryList();
			}
		}
	};
	getCatoryList = () => {
		let data = {
			[Constants.KEY_USERID]: userData[Constants.KEY_USERID],
		};
		if (this.state[Constants.KEY_SEARCH] !== undefined)
			data[Constants.KEY_SEARCH] = Utility.removeWhiteSpace(
				this.state[Constants.KEY_SEARCH],
			);

		this.props.reqGetCategoryListGrocery(data, this);
	};
	deleteCategories(item) {
		this.setState({ selected_item: item, isDeleteDialog: true });
	}
	updateStatus = (_id, status) => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: _id,
			[Constants.KEY_STATUS]: !status,
		};
		this.props.reqChangeStatusCategoryProductGrocery(data, this);
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
CategoryListGrocery.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqChangeStatusCategoryProductGrocery,
	reqGetCategoryListGrocery,
	reqDeleteCategoriesGrocery,
})(withStyles(styles)(CategoryListGrocery));
