/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
	reqUserList,
	reqRegionList,
	reqCountryList,
	reqStateList,
	reqCityList,
	reqChangeUserStatus,
	reqDeleteUser,
} from "../../actions";
import * as types from "../../actions/types";
import BaseComponent from "../../common/BaseComponent";
import * as Constants from "../../utils/Constants";
import * as Utility from "../../utils/Utility";
import * as StringKeys from "../../res/StringKeys";
import AddUserTable from "../../tables/AddUserTable";
import Grid from "@material-ui/core/Grid";
import CommonButton from "../../common/CommonButton";
import CustomPBar from "../../common/CustomPBar";
import CommonGridTextField from "../../common/CommonGridTextField";
import CommoanAutocomplete from "../../common/CommoanAutocomplete";
import makeAnimated from "react-select/animated";
import DeleteItemDialog from "../../common/DeleteItemDialog";
const animatedComponents = makeAnimated();

const userData = undefined;
let TEXTFIELD_XS = 12;
class UserList extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			[Constants.KEY_SHOW_PROGRESS]: false,
			[Constants.KEY_SEARCH]: "",
			[Constants.KEY_DATA]: [],
			headerData: [
				{
					[Constants.KEY_NAME]: this.strings(StringKeys.Name),
				},
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Description) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Action) },
			],
			viewAbleImage: "",
			isVisible: false,
			selectedCountry: "",
			selectedState: "",
			selectedCity: "",
			selectedRegion: "",
			isDeleteDialog: false,
			deleted_msg: this.strings(StringKeys.Delete_User_Msg),
			delete_title: this.strings(StringKeys.Dialog_Title),
			selected_item: undefined,
		};
	}
	componentDidMount() {
		this.getUserList();
		this.getCountryList();
	}

	handleSearchChange = (name) => (event) => {
		this.setState({ [name]: event.target[Constants.KEY_VALUE] });
	};

	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	navigateAddPage() {
		this.props.history.push({
			pathname: Constants.SCREEN_ADD_USER,
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

	viewImage = (image) => {
		this.setState({
			isVisible: !this.state.isVisible,
			viewAbleImage: image,
		});
	};

	closeDilaog = () => {
		this.setState({ isVisible: !this.state.isVisible });
	};
	handleResetdata = () => {
		this.setState({
			[Constants.KEY_SEARCH]: "",
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

					<Grid item xs={TEXTFIELD_XS} style={{ marginTop: 0 }}>
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

					<div class="justify-content-start">
						<div class="row">
							<div class="col-sm-10 ">
								<CommonGridTextField
									required
									xs={TEXTFIELD_XS}
									style={{ marginTop: 20 }}
									id="restaurantName"
									label={this.strings(StringKeys.Search_By_User_Name)}
									fullWidth
									className={classes.textField}
									value={this.state[Constants.KEY_SEARCH]}
									onChange={this.handleSearchChange(Constants.KEY_SEARCH)}
									autoComplete="resname"
									variant="outlined"
									fieldStyle={classes.fieldHeight}
									onEnterKey={() => this.getUserList()}
								/>
							</div>

							<div class="col-sm-1 ">
								<Grid xs={TEXTFIELD_XS} style={{ marginTop: 30 }}>
									<CommonButton
										type="search"
										fullWidth={false}
										variant="contained"
										color="secondary"
										ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
										className={classes.submit}
										onClick={() => {
											this.getUserList();
										}}
										label={this.strings(StringKeys.Search)}
										disabled={this.state.disabledClickedBtn}
									/>
								</Grid>
							</div>
							<div class="col-sm-1 ">
								<Grid xs={TEXTFIELD_XS} style={{ marginTop: 30 }}>
									<CommonButton
										type="search"
										fullWidth={false}
										variant="contained"
										color="secondary"
										ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
										className={classes.submit}
										onClick={() => {
											this.setState(
												() => this.handleResetdata(),
												() => this.getUserList(),
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
							<AddUserTable
								data={this.state[Constants.KEY_DATA]}
								context={this}
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
			var data = {
				[Constants.KEY_UNDERSCORE_ID]: this.state.selected_item[
					Constants.KEY_UNDERSCORE_ID
				],
			};
			this.props.reqDeleteUser(data, this);
			this.setState({ isDeleteDialog: false });
		}
	};
	cancelBtnClick = () => {
		this.setState({ isDeleteDialog: false });
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
		console.log("nextProps ::::: ", nextProps);

		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		}

		if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			console.log("handleResponse UserDetails", nextProps["response"]);
			if (nextProps[Constants.KEY_TYPE] === types.API_USER_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_USER_LIST
						],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_DELETE_USER) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				this.getUserList();
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_CHANGE_USER_STATUS
			) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				this.getUserList();
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
				this.setState(respObj);
			}
		}
	};

	getUserList = () => {
		console.log("serchData", this.state[Constants.KEY_SEARCH]);
		var data = {
			offset: 0,
		};

		if (this.state[Constants.KEY_SEARCH] !== undefined)
			data[Constants.KEY_SEARCH] = Utility.removeWhiteSpace(
				this.state[Constants.KEY_SEARCH],
			);
		// if (this.state[Constants.KEY_COUNTRY_ID] !== undefined)
		//     data[Constants.KEY_COUNTRY_ID] = this.state[Constants.KEY_COUNTRY_ID];

		// if (this.state[Constants.KEY_STATE_ID] !== undefined)
		//     data[Constants.KEY_STATE_ID] = this.state[Constants.KEY_STATE_ID];

		// if (this.state[Constants.KEY_CITY_ID] !== undefined)
		//     data[Constants.KEY_CITY_ID] = this.state[Constants.KEY_CITY_ID];

		// if (this.state[Constants.KEY_REGION_ID] !== undefined)
		//     data[Constants.KEY_REGION_ID] = this.state[Constants.KEY_REGION_ID];

		this.props.reqUserList(data, this);
	};

	// deleteDriver(id) {
	//     var data = {
	//         [Constants.KEY_UNDERSCORE_ID]: id
	//     }
	//     this.props.reqDeleteDriver(data, this)
	// }

	deleteUser(item) {
		this.setState({ selected_item: item, isDeleteDialog: true });
	}

	updateStatus = (_id, status) => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: _id,
			[Constants.KEY_IS_ACTIVE]: !status,
		};
		this.props.reqChangeUserStatus(data, this);
	};

	navigateOnDetailsPage(data) {
		this.props.history.push({
			pathname: Constants.SCREEN_ADD_USER,
			[Constants.KEY_USER_DATA]: data,
		});
	}

	navigateOrderList() {
		this.props.history.push({
			pathname: Constants.SCREEN_ORDER_LIST,
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
UserList.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqUserList,
	reqRegionList,
	reqCountryList,
	reqStateList,
	reqCityList,
	reqChangeUserStatus,
	reqDeleteUser,
})(withStyles(styles)(UserList));
