/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { reqRailwayParcelListing, reqRailwayParcelDelete } from "../../actions";
import * as types from "../../actions/types";
import BaseComponent from "../../common/BaseComponent";
import * as Constants from "../../utils/Constants";
import * as Utility from "../../utils/Utility";
import * as StringKeys from "../../res/StringKeys";
import RailwayParcelListItem from "./../../tables/RailwayParcelListItem"; // Import Table listing
import * as CustomStorage from "../../utils/CustomStorage";
import Grid from "@material-ui/core/Grid";
import CommonButton from "../../common/CommonButton";
import CustomPBar from "../../common/CustomPBar";
import CommonDocViewer from "../../common/CommonDocViewer";
import CommonFullImageViewer from "../../common/CommonFullImageViewer";
import CommonGridTextField from "../../common/CommonGridTextField";
import ReportDatePicker from "../../common/ReportDatePicker";
import makeAnimated from "react-select/animated";
import DeleteItemDialog from "../../common/DeleteItemDialog";

const userData = undefined;
let TEXTFIELD_XS = 12;
let TEXTFIELD_XS_CHILD = 3;
let changeAbleDriverId = -1;

class RailwayParcelList extends BaseComponent {
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
			[Constants.KEY_START_DATE]: null,
			[Constants.KEY_END_DATE]: null,
			[Constants.KEY_SEARCH]: undefined,

			isDeleteDialog: false,
			deleted_msg: "Do you want to Delete this Railway Parcel? ",
			delete_title: "Mirchi App",
			selected_item: undefined,
		};
	}
	componentDidMount() {
		this.getRailwayParcelList();
	}

	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};
	handleSearchChange = (name) => (event) => {
		this.setState({ [name]: event.target[Constants.KEY_VALUE] });
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
					<br />

					<div class="justify-content-start">
						<div class="row">
							<div class="col-sm-12">
								<Grid item xs={TEXTFIELD_XS} style={{ marginTop: 20 }}>
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{}}
										id="grocerystoreName"
										label={"Search by Customer Name/Phone Number/train number"}
										fullWidth
										className={classes.textField}
										value={this.state[Constants.KEY_SEARCH]}
										onChange={this.handleSearchChange(Constants.KEY_SEARCH)}
										autoComplete="resname"
										variant="outlined"
										fieldStyle={classes.fieldHeight}
										onEnterKey={() => this.getRestoList()}
									/>
								</Grid>
							</div>

							<div class="col-sm-4 ">
								<Grid style={{ marginTop: 20 }}>
									<ReportDatePicker
										palceHolder={"From Date"}
										id={"datetimepicker_start"}
										value={this.state[Constants.KEY_START_DATE]}
										defaultDate={this.state[Constants.KEY_START_DATE]}
										onSelectedDate={(date) =>
											this.onSelectedDate(date, [Constants.KEY_START_DATE])
										}
									/>
								</Grid>
							</div>
							<div class="col-sm-4 ">
								<Grid style={{ marginTop: 20 }}>
									<ReportDatePicker
										palceHolder={"To Date"}
										id={"datetimepicker_end"}
										value={this.state[Constants.KEY_END_DATE]}
										defaultDate={this.state[Constants.KEY_END_DATE]}
										onSelectedDate={(date) =>
											this.onSelectedDate(date, [Constants.KEY_END_DATE])
										}
									/>
								</Grid>
							</div>

							<div class="col-sm-2">
								<Grid item xs={TEXTFIELD_XS} style={{ marginTop: 30 }}>
									<CommonButton
										type="submit"
										style={{ width: "150px" }}
										fullWidth={false}
										variant="contained"
										color="secondary"
										className={classes.submit}
										onClick={() => this.getRestoList()}
										label={this.strings(StringKeys.Search)}
									/>
								</Grid>
							</div>

							<div class="col-sm-2">
								<Grid item xs={TEXTFIELD_XS} style={{ marginTop: 30 }}>
									<CommonButton
										type="submit"
										fullWidth={false}
										style={{ width: "150px" }}
										variant="contained"
										color="secondary"
										ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
										className={classes.submit}
										onClick={() => {
											this.setState(
												() => this.handleResetData(),
												() => this.getRestoList(),
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
							<RailwayParcelListItem
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
			//console.log("this.state.selected_item ", this.state.selected_item);
			var data = {
				[Constants.KEY_UNDERSCORE_ID]: this.state.selected_item[
					Constants.KEY_UNDERSCORE_ID
				],
			};
			//console.log(data, "deleted ID");
			// document.write(JSON.stringify(data));
			this.props.reqRailwayParcelDelete(data, this);

			this.setState({ isDeleteDialog: false });
		}
	};
	getRestoList = () => {
		console.log("serchData", this.state[Constants.KEY_SEARCH]);

		var data = {
			offset: 0,
		};

		if (this.state[Constants.KEY_SEARCH] !== undefined)
			data[Constants.KEY_SEARCH] = Utility.removeWhiteSpace(
				this.state[Constants.KEY_SEARCH],
			);
		if (
			this.state[Constants.KEY_START_DATE] != undefined &&
			this.state[Constants.KEY_START_DATE] != null
		) {
			data[Constants.KEY_START_DATE] = this.state[Constants.KEY_START_DATE];
			console.log(this.state[Constants.KEY_START_DATE]);
		}
		if (
			this.state[Constants.KEY_END_DATE] != undefined &&
			this.state[Constants.KEY_END_DATE] != null
		) {
			data[Constants.KEY_END_DATE] = this.state[Constants.KEY_END_DATE];
		}

		this.props.reqRailwayParcelListing(data, this);
	};

	handleResetData() {
		this.setState({
			[Constants.KEY_START_DATE]: null,
			[Constants.KEY_END_DATE]: null,
			[Constants.KEY_SEARCH]: undefined,
		});
	}

	cancelBtnClick = () => {
		this.setState({ isDeleteDialog: false });
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

	getRailwayParcelList = () => {
		let data = {
			[Constants.KEY_USERID]:
				userData != undefined ? userData[Constants.KEY_USERID] : "0",
		};
		if (
			this.state[Constants.KEY_START_DATE] != undefined &&
			this.state[Constants.KEY_START_DATE] != null
		) {
			data[Constants.KEY_START_DATE] = this.state[Constants.KEY_START_DATE];
			console.log(this.state[Constants.KEY_START_DATE]);
		}
		if (
			this.state[Constants.KEY_END_DATE] != undefined &&
			this.state[Constants.KEY_END_DATE] != null
		) {
			data[Constants.KEY_END_DATE] = this.state[Constants.KEY_END_DATE];
		}

		//console.log("resp before".data);
		this.props.reqRailwayParcelListing(data, this);
	};

	handleResponse = (nextProps) => {
		console.log("response", nextProps[Constants.KEY_RESPONSE]);
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_RALWAY_PARCEL_LISTING) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_RALWAY_PARCEL_DELETE
			) {
				//alert("Deleted");
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
				};

				this.getRailwayParcelList();
				this.setState(respObj);
			}
		}
	};

	deleteRailawayParcel(item) {
		this.setState({ selected_item: item, isDeleteDialog: true });
	}

	updateStatus = (_id, status) => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: _id,
			[Constants.KEY_USERID]: userData[Constants.KEY_USERID],
			[Constants.KEY_IS_ACTIVE]: !status,
		};
		this.props.reqChangeStatusRestro(data, this);
	};

	updateDocStatus = (dataObj, status) => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: dataObj[Constants.KEY_UNDERSCORE_ID],
			[dataObj[Constants.KEY_KEY]]: status,
		};
		this.props.reqRestroDocStatusChange(data, this);
	};

	navigate(id) {
		this.props.history.push({
			pathname: Constants.SCREEN_RESTAURANT_DETAIL,
			[Constants.KEY_RESTO_ID]: id,
		});
	}

	navigateOrdersPage() {
		this.props.history.push({
			pathname: Constants.SCREEN_SCREEN_CHECK_REQUEST,
		});
	}
	navigateRating() {
		this.props.history.push({
			pathname: Constants.SCREEN_RATING_AND_REVIEW_ADMIN,
		});
	}

	navigateOrderList() {
		this.props.history.push({
			pathname: Constants.SCREEN_ORDER_LIST,
		});
	}

	onSelectedDate = (date, key) => {
		this.setState({ [key]: date });
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
RailwayParcelList.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	console.log("api response", response);
	return response;
}
export default connect(mapStateToProps, {
	reqRailwayParcelDelete,
	reqRailwayParcelListing,
})(withStyles(styles)(RailwayParcelList));
