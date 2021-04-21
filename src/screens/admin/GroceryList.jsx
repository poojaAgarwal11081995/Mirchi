/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
	reqRegionList,
	reqCountryList,
	reqStateList,
	reqCityList,
	reqGroceryDocStatusChange,
	reqChangeStatusGrocery,
	reqGetGroceryList,
	reqDeleteGrocery,
} from "../../actions";
import * as types from "../../actions/types";
import BaseComponent from "../../common/BaseComponent";
import * as Constants from "../../utils/Constants";
import * as StringKeys from "../../res/StringKeys";
import RestoListItem from "../../tables/RestoListItem";
import * as CustomStorage from "../../utils/CustomStorage";
import * as Utility from "../../utils/Utility";
import Grid from "@material-ui/core/Grid";
import CommonButton from "../../common/CommonButton";
import CustomPBar from "../../common/CustomPBar";
import CommonDocViewer from "../../common/CommonDocViewer";
import CommonFullImageViewer from "../../common/CommonFullImageViewer";
import CommonGridTextField from "../../common/CommonGridTextField";
import CommoanAutocomplete from "../../common/CommoanAutocomplete";
import makeAnimated from "react-select/animated";
import DeleteItemDialog from "../../common/DeleteItemDialog";
import GroceryStoreListItem from "../../tables/GroceryStoreListItem";
import { toast } from "react-toastify";
const animatedComponents = makeAnimated();

const userData = undefined;
let TEXTFIELD_XS = 12;
let TEXTFIELD_XS_CHILD = 3;
let changeAbleDriverId = -1;

class GroceryList extends BaseComponent {
	constructor(props) {
		super(props);
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			[Constants.KEY_SHOW_PROGRESS]: true,
			[Constants.KEY_DATA]: [],
			headerData: [
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Description) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Action) },
			],
			viewAbleImage: "",
			isVisible: false,
			isVisibleFullImage: false,
			viewFullImage: "",
			[Constants.KEY_SEARCH]: undefined,
			[Constants.KEY_COUNTRY_ID]: undefined,
			[Constants.KEY_STATE_ID]: undefined,
			[Constants.KEY_CITY_ID]: undefined,
			[Constants.KEY_REGION_ID]: undefined,
			selectedCountry: "",
			selectedState: "",
			selectedCity: "",
			selectedRegion: "",
			isDeleteDialog: false,
			deleted_msg: "Do you want to Delete this restaurant? ",
			delete_title: "Mirchi App",
			selected_item: undefined,
		};
		this.getGroceryList();
	}
	componentDidMount() {
		this.getCountryList();
		// this.getGroceryList();
	}
	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};
	handleSearchChange = (name) => (event) => {
		this.setState({ [name]: event.target[Constants.KEY_VALUE] });
	};

	navigateAddPage() {
		this.props.history.push({
			pathname: Constants.SCREEN_ADD_GROCERY_STORE,
		});
	}

	allLoFieldClear(number) {
		if (number == 4) {
			let obj = {
				selectedCountry: "",
				selectedState: "",
				selectedCity: "",
				selectedRegion: "",
				[Constants.KEY_COUNTRY_ID]: undefined,
				[Constants.KEY_STATE_ID]: undefined,
				[Constants.KEY_CITY_ID]: undefined,
				[Constants.KEY_STATE_LIST_DATA]: [],
				[Constants.KEY_CITY_LIST_DATA]: [],
			};
			this.setState(obj);
		} else if (number == 3) {
			this.setState({
				selectedState: "",
				selectedCity: "",
				selectedRegion: "",
				[Constants.KEY_REGION_ID]: undefined,
				[Constants.KEY_CITY_ID]: undefined,
				[Constants.KEY_STATE_ID]: undefined,
				[Constants.KEY_CITY_LIST_DATA]: [],
				[Constants.KEY_REGION_LIST_DATA]: [],
			});
		} else if (number == 2) {
			this.setState({
				selectedCity: "",
				selectedRegion: "",
				[Constants.KEY_CITY_ID]: undefined,
				[Constants.KEY_REGION_ID]: undefined,
				[Constants.KEY_REGION_LIST_DATA]: [],
			});
		}
	}

	handleChangeCountry = (selectedOption, isDeleted) => {
		if (isDeleted.action == "clear") {
			this.allLoFieldClear(4);
		} else {
			this.getStateList(selectedOption);
		}
	};

	handleChangeState = (selectedOption, isDeleted) => {
		if (isDeleted.action == "clear") {
			this.allLoFieldClear(3);
		} else {
			this.getCityList(selectedOption);
		}
	};

	handleChangeCity = (selectedOption, isDeleted) => {
		if (isDeleted.action == "clear") {
			this.allLoFieldClear(2);
		} else {
			this.setState({
				selectedCity: selectedOption,
				[Constants.KEY_CITY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
			});
			this.getRegionList(selectedOption);
		}
	};

	handleChangeRegion = (selectedOption, isDeleted) => {
		if (isDeleted.action == "clear") {
			this.setState({
				selectedRegion: "",
				[Constants.KEY_REGION_ID]: undefined,
			});
		} else {
			this.setState({
				selectedRegion: selectedOption,
				[Constants.KEY_REGION_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
			});
		}
	};
	handleReset = () => {
		this.setState({
			[Constants.KEY_SEARCH]: "",
			[Constants.KEY_COUNTRY_ID]: undefined,
			[Constants.KEY_STATE_ID]: undefined,
			[Constants.KEY_CITY_ID]: undefined,
			[Constants.KEY_REGION_ID]: undefined,
			selectedCountry: "",
			selectedState: "",
			selectedCity: "",
			selectedRegion: "",
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

					<Grid
						item
						xs={TEXTFIELD_XS}
						style={{ marginTop: 0, display: "flex", float: "right" }}>
						<CommonButton
							style={{ marginTop: 0 }}
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
					<Grid item xs={TEXTFIELD_XS} style={{ marginTop: 0 }}>
						<CommonButton
							style={{ marginTop: 0 }}
							type="submit"
							variant="contained"
							color="secondary"
							className={classes.submit}
							onClick={this.goBackdashboard}
							label={"Back"}
						/>
					</Grid>
					<br />
					<br />
					<br />

					<div class="justify-content-start">
						<div class="row">
							<div class="col-sm-12 ">
								<Grid>
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: 20 }}
										id="grocerystoreName"
										label={this.strings(StringKeys.Search_Grocery_Name)}
										fullWidth
										className={classes.textField}
										value={this.state[Constants.KEY_SEARCH]}
										onChange={this.handleSearchChange(Constants.KEY_SEARCH)}
										autoComplete="resname"
										variant="outlined"
										fieldStyle={classes.fieldHeight}
										onEnterKey={() => this.getGroceryList()}
									/>
								</Grid>
							</div>
							<div className="col-sm">
								<Grid style={{ marginTop: 20 }}>
									<CommoanAutocomplete
										value={this.state.selectedCountry}
										options={this.state[Constants.KEY_COUNTRY_LIST_DATA]}
										components={animatedComponents}
										onChange={this.handleChangeCountry}
										placeholder={this.strings(StringKeys.Select_Country)}
									/>
								</Grid>
							</div>

							<div class="col-sm ">
								<Grid style={{ marginTop: 20 }}>
									<CommoanAutocomplete
										value={this.state.selectedState}
										options={this.state[Constants.KEY_STATE_LIST_DATA]}
										components={animatedComponents}
										onChange={this.handleChangeState}
										placeholder={this.strings(StringKeys.Select_State)}
									/>
								</Grid>
							</div>
							<div class="col-sm ">
								<Grid style={{ marginTop: 20 }}>
									<CommoanAutocomplete
										value={this.state.selectedCity}
										options={this.state[Constants.KEY_CITY_LIST_DATA]}
										components={animatedComponents}
										onChange={this.handleChangeCity}
										placeholder={this.strings(StringKeys.Select_City)}
									/>
								</Grid>
							</div>
							<div class="col-sm ">
								<Grid style={{ marginTop: 20 }}>
									<CommoanAutocomplete
										value={this.state.selectedRegion}
										options={this.state[Constants.KEY_REGION_LIST_DATA]}
										components={animatedComponents}
										onChange={this.handleChangeRegion}
										placeholder={this.strings(StringKeys.Select_Region)}
									/>
								</Grid>
							</div>
							<div class="col-sm" style={{ marginTop: 30 }}>
								<Grid>
									<CommonButton
										type="search"
										fullWidth={true}
										variant="contained"
										color="secondary"
										ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
										className={classes.submit}
										onClick={() => {
											this.getGroceryList();
										}}
										label={this.strings(StringKeys.Search)}
										disabled={this.state.disabledClickedBtn}
									/>
								</Grid>
							</div>
							<div class="col-sm" style={{ marginTop: 30 }}>
								<Grid>
									<CommonButton
										type="search"
										fullWidth={true}
										variant="contained"
										color="secondary"
										ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
										className={classes.submit}
										onClick={() => {
											this.setState(
												() => this.handleReset(),
												() => this.getGroceryList(),
											);
										}}
										label={this.strings(StringKeys.Reset)}
										disabled={this.state.disabledClickedBtn}
									/>
								</Grid>
							</div>
						</div>
					</div>

					{this.state.headerData !== undefined &&
					this.state.headerData.length > 0 ? (
						<div className={classes.tableContainer} style={{ marginTop: 20 }}>
							<GroceryStoreListItem
								dataOb={this.state[Constants.KEY_DATA]}
								context={this}
							/>
						</div>
					) : null}

					<CommonDocViewer
						showYesNo={this.state.isVisible}
						secondBtnClick={this.closeDilaog}
						title="View Doc"
						firstBtnName="Dismiss"
						context={this}
						secondBtnName="Cancel"
						data={this.state.viewAbleImage}
						firstBtnClick={this.closeDilaog}
					/>
					<CommonFullImageViewer
						showYesNo={this.state.isVisibleFullImage}
						secondBtnClick={this.closeDilaogFullImage}
						title="Full Image"
						firstBtnName="Dismiss"
						context={this}
						secondBtnName="Cancel"
						image={this.state.viewFullImage}
						firstBtnClick={this.closeDilaogFullImage}
					/>

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
			var data = {
				[Constants.KEY_UNDERSCORE_ID]: this.state.selected_item[
					Constants.KEY_UNDERSCORE_ID
				],
			};
			// alert(JSON.stringify(data));
			this.props.reqDeleteGrocery(data, this);
			this.setState({ isDeleteDialog: false });
		}
	};
	cancelBtnClick = () => {
		this.setState({ isDeleteDialog: false });
	};

	viewImage = (image, index, isThis) => {
		changeAbleDriverId = index;
		console.log("click=", JSON.stringify(image));
		let data = [
			{
				[Constants.KEY_UNDERSCORE_ID]: image[Constants.KEY_UNDERSCORE_ID],
				[Constants.KEY_NAME]: this.strings(StringKeys.Shop_Licence_Image),
				[Constants.KEY_STATUS]: image[Constants.KEY_SHOP_LICENCE_STATUS],
				[Constants.KEY_IMAGE]: image[Constants.KEY_SHOP_LICENCE_IMG],
				[Constants.KEY_KEY]: Constants.KEY_SHOP_LICENCE_STATUS,
			},
			{
				[Constants.KEY_UNDERSCORE_ID]: image[Constants.KEY_UNDERSCORE_ID],
				[Constants.KEY_NAME]: this.strings(StringKeys.GSTN_OR_PAN_IMAGE),
				[Constants.KEY_STATUS]: image[Constants.KEY_GSTN_OR_PAN_STATUS],
				[Constants.KEY_IMAGE]: image[Constants.KEY_GSTN_OR_PAN_IMG],
				[Constants.KEY_KEY]: Constants.KEY_GSTN_OR_PAN_STATUS,
			},
		];

		console.log("data=", JSON.stringify(data));
		if (isThis != undefined) {
			this.setState({
				viewAbleImage: data,
			});
		} else {
			this.setState({
				isVisible: !this.state.isVisible,
				viewAbleImage: data,
			});
		}
	};

	viewFullImage = (image) => {
		this.setState({
			isVisibleFullImage: !this.state.isVisibleFullImage,
			viewFullImage: image,
		});
	};

	closeDilaog = () => {
		this.setState({ isVisible: !this.state.isVisible });
	};
	closeDilaogFullImage = () => {
		this.setState({ isVisibleFullImage: !this.state.isVisibleFullImage });
	};

	getCountryList = () => {
		let data = {
			[Constants.KEY_USERID]:
				userData != undefined ? userData[Constants.KEY_USERID] : "0",
		};
		this.props.reqCountryList(data, this);
	};
	getStateList = (selectedOption) => {
		this.setState({
			[Constants.KEY_STATE_LIST_DATA]: [],
			[Constants.KEY_CITY_LIST_DATA]: [],
			selectedState: "",
			selectedCity: "",
			selectedRegion: "",
			selectedCountry: selectedOption,
			[Constants.KEY_COUNTRY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		});
		let data = {
			[Constants.KEY_COUNTRY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		};
		this.props.reqStateList(data, this);
	};

	getCityList = (selectedOption) => {
		this.setState({
			[Constants.KEY_CITY_LIST_DATA]: [],
			selectedCity: "",
			selectedState: selectedOption,
			selectedRegion: "",
			[Constants.KEY_STATE_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		});
		let data = {
			[Constants.KEY_COUNTRY_ID]: selectedOption[Constants.KEY_COUNTRY_ID],
			[Constants.KEY_STATE_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		};
		this.props.reqCityList(data, this);
	};

	getRegionList = (selectedOption) => {
		this.setState({
			[Constants.KEY_REGION_LIST_DATA]: [],
			selectedRegion: "",
			selectedCity: selectedOption,
			[Constants.KEY_CITY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		});
		let data = {
			[Constants.KEY_COUNTRY_ID]: this.state.selectedState[
				Constants.KEY_COUNTRY_ID
			],
			[Constants.KEY_STATE_ID]: this.state.selectedState[
				Constants.KEY_UNDERSCORE_ID
			],
			[Constants.KEY_CITY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		};
		this.props.reqRegionList(data, this);
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
			if (nextProps[Constants.KEY_TYPE] === types.API_GROCERY_LIST) {
				if (
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA] != undefined
				) {
					respObj = {
						[Constants.KEY_SHOW_PROGRESS]: false,
						[Constants.KEY_DATA]:
							nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
								Constants.KEY_GROCERY_LIST
							],
					};

					this.setState(respObj, () => {
						if (changeAbleDriverId >= 0) {
							console.log("index ", changeAbleDriverId + "");
							let obj = this.state[Constants.KEY_DATA][changeAbleDriverId];
							console.log(
								"index ",
								"after filter ",
								JSON.stringify(obj),
								"form server ",
								JSON.stringify(this.state[Constants.KEY_DATA]),
							);
							this.viewImage(obj, changeAbleDriverId, "check");
						}
					});
				} else {
					toast("No list found");
				}
			} else if (nextProps[Constants.KEY_TYPE] === types.API_DELETE_GROCERY) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				this.getGroceryList();
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_CHANGE_STATUS_GROCERY
			) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				this.getGroceryList();
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_GROCERY_DOC_STATUS_CHANGE
			) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				this.getGroceryList();
			} else if (nextProps[Constants.KEY_TYPE] === types.API_COUNTRY_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_COUNTRY_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_STATE_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_STATE_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_CITY_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_CITY_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_LOCALITY_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_REGION_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				// alert(JSON.stringify(respObj));
				this.setState(respObj);
			}
		}
	};
	getGroceryList = () => {
		console.log("serchData", this.state[Constants.KEY_SEARCH]);

		var data = {
			offset: 0,
		};
		if (this.state[Constants.KEY_SEARCH] !== undefined)
			data[Constants.KEY_SEARCH] = Utility.removeWhiteSpace(
				this.state[Constants.KEY_SEARCH],
			);
		if (this.state[Constants.KEY_COUNTRY_ID] !== undefined)
			data[Constants.KEY_COUNTRY_ID] = this.state[Constants.KEY_COUNTRY_ID];

		if (this.state[Constants.KEY_STATE_ID] !== undefined)
			data[Constants.KEY_STATE_ID] = this.state[Constants.KEY_STATE_ID];

		if (this.state[Constants.KEY_CITY_ID] !== undefined)
			data[Constants.KEY_CITY_ID] = this.state[Constants.KEY_CITY_ID];

		if (this.state[Constants.KEY_REGION_ID] !== undefined)
			data[Constants.KEY_REGION_ID] = this.state[Constants.KEY_REGION_ID];

		this.props.reqGetGroceryList(data, this);
	};

	deleteGrocery(item) {
		// alert(JSON.stringify(item));
		this.setState({ selected_item: item, isDeleteDialog: true });
	}

	updateStatus = (_id, status) => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: _id,
			[Constants.KEY_USERID]: userData[Constants.KEY_USERID],
			[Constants.KEY_IS_ACTIVE]: !status,
		};
		this.props.reqChangeStatusGrocery(data, this);
	};

	updateDocStatus = (dataObj, status) => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: dataObj[Constants.KEY_UNDERSCORE_ID],
			[dataObj[Constants.KEY_KEY]]: status,
		};
		this.props.reqGroceryDocStatusChange(data, this);
	};

	navigate(id) {
		this.props.history.push({
			pathname: Constants.SCREEN_GROCERY_DETAIL,
			[Constants.KEY_GROCERY_ID]: id,
		});
	}

	navigateOrdersPage() {
		this.props.history.push({
			pathname: Constants.SCREEN_SCREEN_CHECK_REQUEST_GROCERY,
		});
	}
	navigateRating() {
		this.props.history.push({
			pathname: Constants.SCREEN_RATING_AND_REVIEW_ADMIN,
		});
	}

	navigateOrderList() {
		this.props.history.push({
			pathname: Constants.SCREEN_ORDER_LIST_GROCERY,
			// pathname: Constants.SCREEN_ORDER_LIST,
		});
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
GroceryList.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqRegionList,
	reqCountryList,
	reqStateList,
	reqCityList,
	reqGroceryDocStatusChange,
	reqChangeStatusGrocery,
	reqGetGroceryList,
	reqDeleteGrocery,
})(withStyles(styles)(GroceryList));
