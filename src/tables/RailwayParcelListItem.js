/** @format */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DetailButton from "@material-ui/icons/RemoveRedEye";
import IconButton from "@material-ui/core/IconButton";

import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import MoneyIcon from "@material-ui/icons/Money";
import ListAltIcon from "@material-ui/icons/ListAlt";

import RateReviewIcon from "@material-ui/icons/RateReview";
import * as Constants from "../utils/Constants";
import { Link } from "react-router-dom";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import * as CustomStorage from "../utils/CustomStorage";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { reqRailwayParcelDelete } from "../actions";
import * as types from "../actions/types";
import NextIcon from "@material-ui/icons/NavigateNext";
import StoreIcon from "@material-ui/icons/LocalGroceryStore";
import HistoryIcon from "@material-ui/icons/History";
import Tooltip from "@material-ui/core/Tooltip";
import * as StringKeys from "../res/StringKeys";
import * as Utility from "../utils/Utility";
import Dropdown from "react-drop-down";
import CommonDropDown from "../common/CommonDropDown";
import ActiveIcon from "@material-ui/icons/Check";
import InActiveIcon from "@material-ui/icons/Clear";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CommonStyle from "../res/CommonStyles.js";

//work by Praveen singh
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AddFood from "@material-ui/icons/FastfoodRounded";

const styles = {
	root: {
		width: "100%",
		overflowX: "auto",
	},
	table: {
		minWidth: 700,
	},
};

let id = 0;
function createData(name, calories, fat, carbs, protein) {
	id += 1;
	return { id, name, calories, fat, carbs, protein };
}

function RailwayParcelListItems(props) {
	const { classes, dataOb, context } = props;

	const [page, setPage] = React.useState(0);
	const [selectedItem, setSelectedItem] = React.useState(null);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, dataOb.length - page * rowsPerPage);
	const [data, setData] = React.useState(props.dataOb);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	function handleClick(event, selectedItem) {
		setAnchorEl(event.currentTarget);

		setSelectedItem(selectedItem);
	}

	const options = [
		Constants.CHECK_ORDERS,
		// Constants.RATING_REVIEW,
		Constants.ORDER_HISTORY,
		Constants.EARNING_RESTRO,
		Constants.PRODUCT_LIST,
		Constants.PRODUCT_CATE_TYPE,
	];

	function handleClose(option, pos) {
		setAnchorEl(null);
		if (option != undefined) {
			let n = selectedItem;
			if (option == Constants.CHECK_ORDERS) {
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_RESTO_ID,
					n[Constants.KEY_UNDERSCORE_ID],
				);
				context.navigateOrdersPage(n[Constants.KEY_UNDERSCORE_ID]);
			}

			// rating & review option start //
			// else if (option == Constants.RATING_REVIEW) {
			//     CustomStorage.setSessionDataAsObject(
			//         Constants.KEY_RESTO_ID, n[Constants.KEY_UNDERSCORE_ID]);
			//     // context.navigateRating(n[Constants.KEY_UNDERSCORE_ID])
			//     context.props.history.push({
			//         pathname: Utility.isAdmin ? Constants.SCREEN_RATING_AND_REVIEW_ADMIN :
			//             Constants.SCREEN_RATING_AND_REVIEW_RESTAURANT,
			//         [Constants.KEY_RETSRO_DETAILS]: n[Constants.KEY_UNDERSCORE_ID]
			//     });
			// }

			// rating & review option end //
			else if (option == Constants.ORDER_HISTORY) {
				CustomStorage.setSessionDataAsObject(Constants.KEY_RETSRO_DETAILS, n);
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_DRIVER_DETAILS,
					undefined,
				);
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_USER_DETAILS,
					undefined,
				);
				context.navigateOrderList(n);
			} else if (option == Constants.PRODUCT_CATE_TYPE) {
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_RETSRO_DETAILS,
					undefined,
				);
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_DRIVER_DETAILS,
					undefined,
				);
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_USER_DETAILS,
					undefined,
				);

				CustomStorage.setSessionDataAsObject(Constants.KEY_RESTO_DETAILS, n);

				context.props.history.push({
					pathname: Utility.isAdmin
						? Constants.SCREEN_PRODUCT_CATEGORY_LIST
						: Constants.SCREEN_PRODUCT_CATEGORY_LIST_RESTRO,
					[Constants.KEY_RESTO_DETAILS]: n,
				});
			} else if (option == Constants.PRODUCT_LIST) {
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_RETSRO_DETAILS,
					undefined,
				);
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_DRIVER_DETAILS,
					undefined,
				);
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_USER_DETAILS,
					undefined,
				);

				CustomStorage.setSessionDataAsObject(Constants.KEY_RESTO_DETAILS, n);
				context.props.history.push({
					pathname: Utility.isAdmin
						? Constants.SCREEN_PRODUCT_LIST
						: Constants.SCREEN_PRODUCT_LIST_RETSRO,
					[Constants.KEY_RESTO_DETAILS]: n,
				});
			} else if (option == Constants.EARNING_RESTRO) {
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_RETSRO_DETAILS,
					undefined,
				);
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_DRIVER_DETAILS,
					undefined,
				);
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_USER_DETAILS,
					undefined,
				);

				CustomStorage.setSessionDataAsObject(Constants.KEY_RESTO_DETAILS, n);
				context.props.history.push({
					pathname: Utility.isAdmin()
						? Constants.SCREEN_RESTAURENT_EARNING_IN_ADMIN
						: Constants.SCREEN_RESTAURENT_EARNING,
					[Constants.KEY_RESTO_DETAILS]: n,
				});
			}
		}
	}

	useEffect(() => {
		// navigate_key = context.props.location[Constants.KEY_DATA];

		setData(props.dataOb);
		setPage(0);
	}, [props.dataOb]);

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	function handleChangeValue(e, index) {
		let STATUS = Utility.getRestroStatusKey(e);
		let req = {
			[Constants.KEY_UNDERSCORE_ID]: data[index][Constants.KEY_UNDERSCORE_ID],
			[Constants.KEY_STATUS]: STATUS,
		};
		// alert(JSON.stringify(e))
		context.updateStatus(
			data[index][Constants.KEY_UNDERSCORE_ID],
			data[index][Constants.KEY_STATUS],
		);
	}

	const deleteEditRow = (data) => {
		//  alert(JSON.stringify(data))
	};
	const goDetails = (data) => {
		<Link
			className={classes.link}
			to={Constants.SCREEN_RESTAURANT_DETAIL}></Link>;
	};
	const ITEM_HEIGHT = 48;

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="justify">
							{/* {context.strings(StringKeys.Restaurant_Name)} */}
							Customer name
						</TableCell>
						<TableCell align="center">
							{context.strings(StringKeys.Phone)}
						</TableCell>
						<TableCell align="center">
							{/* {context.strings(StringKeys.City)} */}
							Station Name
						</TableCell>
						<TableCell align="center">Train Number</TableCell>
						<TableCell align="center">Seat Number</TableCell>
						<TableCell align="center">Payment Mode</TableCell>

						<TableCell align="center">Order Date</TableCell>
						{/* <TableCell align="center" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.Stauts)}
						</TableCell> */}
						{/* <TableCell align="center" style={CommonStyle.tableRowHeader}>Doc Verified</TableCell> */}
						<TableCell align="center">
							{context.strings(StringKeys.Action)}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data != undefined
						? data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n, index) => (
									<TableRow key={n.id}>
										<TableCell align="justify" component="th" scope="row">
											{n.name}
										</TableCell>

										<TableCell align="center">{n.phone}</TableCell>

										<TableCell align="center">
											{n.station_name != undefined ? n.station_name : ""}
										</TableCell>
										{/* new */}
										<TableCell align="center">{n.train_number}</TableCell>
										<TableCell align="center">{n.seat_number}</TableCell>
										<TableCell align="center">{n.payment_mode}</TableCell>

										<TableCell align="center">
											{n.arrival_date_time != undefined
												? Utility.convertStrDateFormat(
														n.arrival_date_time,
														Constants.DATE_FORMAT_COMING_FROM_SERVER,
														Constants.DATE_FORMAT_SHOW,
												  )
												: ""}
										</TableCell>

										{/* {
											<TableCell align="center">
												{
													<IconButton
														onClick={() => {
															context.updateStatus(
																n[Constants.KEY_UNDERSCORE_ID],
																n[Constants.KEY_IS_ACTIVE],
															);
														}}
														aria-label="Check">
														{n[Constants.KEY_IS_ACTIVE] === true ? (
															<ActiveIcon />
														) : (
															<InActiveIcon />
														)}
													</IconButton>
												}
											</TableCell>
										} */}

										{/* {
                                    (<TableCell align="center">{
                                        (<IconButton onClick={() => {

                                        }} aria-label="Check">
                                            {n[Constants.KEY_SHOP_LICENCE_STATUS] == Constants.DRIVER_STATUS_APPROVED_DOC &&
                                                n[Constants.KEY_FSSAI_STATUS] == Constants.DRIVER_STATUS_APPROVED_DOC &&
                                                n[Constants.KEY_GSTN_OR_PAN_STATUS] == Constants.DRIVER_STATUS_APPROVED_DOC

                                                ? <ActiveIcon /> : <InActiveIcon />}
                                        </IconButton>)
                                    }
                                    </TableCell>)
                                } */}

										<TableCell align="center">
											{[
												<Tooltip title={context.strings(StringKeys.DELETE)}>
													<IconButton
														onClick={() => {
															context.deleteRailawayParcel(n);
														}}
														aria-label="Delete">
														<DeleteIcon />
													</IconButton>
												</Tooltip>,

												// <Tooltip title={context.strings(StringKeys.ViewAndEdit)}>
												//     <IconButton aria-label="Detail" onClick={() => {
												//         CustomStorage.setSessionDataAsObject(
												//             Constants.KEY_RESTO_ID, n[Constants.KEY_UNDERSCORE_ID]);
												//         context.navigate(n[Constants.KEY_UNDERSCORE_ID])
												//     }}>
												//         <EditIcon />
												//     </IconButton>
												// </Tooltip>,

												// <Tooltip title={context.strings(StringKeys.View_Doc)}>
												//     <IconButton aria-label="Detail" onClick={() => {
												//         CustomStorage.setSessionDataAsObject(
												//             Constants.KEY_RESTO_ID, n[Constants.KEY_UNDERSCORE_ID]);
												//         context.viewImage(n, index)
												//     }}>
												//         <DetailButton />
												//     </IconButton>
												// </Tooltip>,

												// <IconButton
												//     aria-label="more"
												//     aria-controls="long-menu"
												//     aria-haspopup="true"
												//     onClick={(event) => { handleClick(event, n) }}
												// >
												//     <MoreVertIcon />
												// </IconButton>
											]}
										</TableCell>
									</TableRow>
								))
						: null}
				</TableBody>

				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							colSpan={12}
							count={data.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: { "aria-label": "Rows per page" },
								native: true,
							}}
							style={{ color: "red" }}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</TableRow>
				</TableFooter>
			</Table>

			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 6.5,
						width: 280,
						marginTop: 20,
					},
				}}>
				{options.map((option, pos) => (
					<MenuItem
						key={option}
						onClick={() => {
							handleClose(option, pos);
						}}>
						<ListItemIcon>
							{pos == 0 ? (
								<PlaylistAddCheckIcon />
							) : pos == 1 ? (
								<RateReviewIcon />
							) : pos == 2 ? (
								<HistoryIcon />
							) : pos == 3 ? (
								<MoneyIcon />
							) : pos == 4 ? (
								<ListAltIcon />
							) : pos == 5 ? (
								<AddFood />
							) : (
								<RateReviewIcon />
							)}
						</ListItemIcon>
						<ListItemText primary={option} />
					</MenuItem>
				))}
			</Menu>
		</Paper>
	);

	function handleResponse(nextProps) {
		var respObj = null;
		//alert('sdsd')
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_RESTRO_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_DELETE_RESTRO) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				context.getRestoList();
				//context.getRailwayParcelList();
			}
		}
	}

	function deleteRailawayParcel(id) {
		//	alert(JSON.stringify(props));
		var data = {
			[Constants.KEY_UNDERSCORE_ID]: id,
		};
		//this.props.reqDeleteRestro(data, this)
	}
}

RailwayParcelListItems.propTypes = {
	classes: PropTypes.object.isRequired,
};
function mapStateToProps({ response }) {
	return response;
}
export default withStyles(styles)(RailwayParcelListItems);
//export default connect(mapStateToProps, { reqDeleteRestro })(withStyles(styles)(SimpleTable));
