/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { reqPartyBookingListing, reqPartyBookingDelete } from "../../actions";
import * as types from "../../actions/types";
import BaseComponent from "../../common/BaseComponent";
import * as Constants from "../../utils/Constants";
import * as StringKeys from "../../res/StringKeys";
import PartyBookingListItem from "./../../tables/PartyBookingListItem"; // Import Table listing
import * as CustomStorage from "../../utils/CustomStorage";
import * as Utility from "../../utils/Utility";
import Grid from "@material-ui/core/Grid";
import CommonButton from "../../common/CommonButton";
import CustomPBar from "../../common/CustomPBar";
import CommonDocViewer from "../../common/CommonDocViewer";
import CommonFullImageViewer from "../../common/CommonFullImageViewer";
import CommonGridTextField from "../../common/CommonGridTextField";
import DeleteItemDialog from "../../common/DeleteItemDialog";
import { goBack } from "../../utils/Utility";
import { toast, ToastContainer } from "react-toastify";
import ReportDatePicker from "../../common/ReportDatePicker";
const userData = undefined;
let TEXTFIELD_XS = 12;
let TEXTFIELD_XS_CHILD = 3;
let changeAbleDriverId = -1;

class PartyBookingList extends BaseComponent {
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
			[Constants.KEY_START_DATE]: null,
			[Constants.KEY_END_DATE]: null,
			[Constants.KEY_SEARCH]: undefined,
			viewAbleImage: "",
			isVisible: false,
			isVisibleFullImage: false,
			viewFullImage: "",

			isDeleteDialog: false,
			deleted_msg: "Do you want to Delete this Party Booking? ",
			delete_title: "Mirchi App",
			selected_item: undefined,
		};
	}
	componentDidMount() {
		this.getPartyBookingList();
	}

	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};
	handleSearchChange = (name) => (event) => {
		console.log("name", name);
		this.setState({ [name]: event.target[Constants.KEY_VALUE] });
	};

	navigateAddPage() {
		this.props.history.push({
			pathname: Constants.SCREEN_ADD_RESTAURENT,
		});
	}
	onSelectedDate = (date, key) => {
		this.setState({ [key]: date });
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
							<div class="col-sm-6">
								<Grid item xs={TEXTFIELD_XS} style={{ marginTop: 20 }}>
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{}}
										id="grocerystoreName"
										label={"Search by Name/Phone/Venue/Event Type"}
										fullWidth
										className={classes.textField}
										value={this.state[Constants.KEY_SEARCH]}
										onChange={this.handleSearchChange(Constants.KEY_SEARCH)}
										autoComplete="resname"
										variant="outlined"
										fieldStyle={classes.fieldHeight}
									/>
								</Grid>
							</div>

							<div class="col-sm ">
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
							<div class="col-sm ">
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

							<div class="col-sm-1">
								<Grid item xs={TEXTFIELD_XS} style={{ marginTop: 30 }}>
									<CommonButton
										type="submit"
										fullWidth={false}
										variant="contained"
										color="secondary"
										ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
										className={classes.submit}
										onClick={() => this.getPartySearchList()}
										label={this.strings(StringKeys.Search)}
										disabled={this.state.disabledClickedBtn}
									/>
								</Grid>
							</div>

							<div class="col-sm-1">
								<Grid item xs={TEXTFIELD_XS} style={{ marginTop: 30 }}>
									<CommonButton
										type="submit"
										fullWidth={false}
										variant="contained"
										color="secondary"
										ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
										className={classes.submit}
										onClick={() => {
											this.setState(
												() => this.handleResetData(),
												() => this.getPartySearchList(),
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
							<PartyBookingListItem
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
			this.props.reqPartyBookingDelete(data, this);

			this.setState({ isDeleteDialog: false });
		}
	};
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

	getPartyBookingList = () => {
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
		this.props.reqPartyBookingListing(data, this);
	};

	getPartySearchList = () => {
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
		this.props.reqPartyBookingListing(data, this);
	};

	deletePartyBooking(item) {
		this.setState({ selected_item: item, isDeleteDialog: true });
	}

	handleResetData() {
		this.setState({
			[Constants.KEY_START_DATE]: null,
			[Constants.KEY_END_DATE]: null,
			[Constants.KEY_SEARCH]: undefined,
		});
	}

	handleResponse = (nextProps) => {
		var respObj = null;

		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_PARTY_BOOKING_LISTING) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_PARTY_BOOKING_DELETE
			) {
				toast("Party data deleted successfully");
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
				};
				this.getPartyBookingList();
				this.setState(respObj);
				console.log("party booking", respObj);
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
PartyBookingList.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqPartyBookingDelete,
	reqPartyBookingListing,
})(withStyles(styles)(PartyBookingList));
