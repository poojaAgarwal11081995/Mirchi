/** @format */

import React from "react";
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
import * as Constants from "../utils/Constants";
import { Link } from "react-router-dom";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import ActiveIcon from "@material-ui/icons/Check";
import InActiveIcon from "@material-ui/icons/Clear";
import * as StringKeys from "../../src/res/StringKeys";
import * as Utility from "../utils/Utility";
import Tooltip from "@material-ui/core/Tooltip";
import VerifiedUserTwoToneIcon from "@material-ui/icons/VerifiedUserTwoTone";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as CustomStorage from "../utils/CustomStorage";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import StoreIcon from "@material-ui/icons/LocalGroceryStore";
import HistoryIcon from "@material-ui/icons/History";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

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

function DriverIssueTable(props) {
	const { classes, data, context } = props;

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const [selectedItem, setSelectedItem] = React.useState(null);

	const open = Boolean(anchorEl);

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
		//  alert(rowsPerPage)
	}

	function handleClick(event, itm) {
		setAnchorEl(event.currentTarget);

		setSelectedItem(itm);
	}

	const options = [
		// Constants.CHECK_ORDERS,
		// Constants.RATING_REVIEW,
		Constants.ORDER_HISTORY,
	];

	function handleClose(option, pos) {
		setAnchorEl(null);
		if (option != undefined) {
			let n = selectedItem;

			console.log("dhjgfjsdjkaskj::::", n);

			// if (option == Constants.CHECK_ORDERS) {
			//     CustomStorage.setSessionDataAsObject(
			//         Constants.KEY_RESTO_ID, n[Constants.KEY_UNDERSCORE_ID]);
			//     context.navigateOrdersPage(n[Constants.KEY_UNDERSCORE_ID])

			// } else if (option == Constants.RATING_REVIEW) {
			//     CustomStorage.setSessionDataAsObject(
			//         Constants.KEY_RESTO_ID, n[Constants.KEY_UNDERSCORE_ID]);
			//     context.navigateRating(n[Constants.KEY_UNDERSCORE_ID])
			// } else
			// if (option == Constants.ORDER_HISTORY) {
			//     // CustomStorage.setSessionDataAsObject(
			//     //     Constants.KEY_RESTO_ID, n[Constants.KEY_UNDERSCORE_ID]);
			//     if (context.navigateOrderList != undefined)
			//         context.navigateOrderList(n[Constants.KEY_UNDERSCORE_ID])
			// }

			if (option == Constants.ORDER_HISTORY) {
				CustomStorage.setSessionDataAsObject(Constants.KEY_DRIVER_DETAILS, n);
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_RETSRO_DETAILS,
					undefined,
				);

				CustomStorage.setSessionDataAsObject(
					Constants.KEY_USER_DETAILS,
					undefined,
				);

				context.navigateOrderList(n);
			}
		}
	}

	const ITEM_HEIGHT = 48;

	const deleteEditRow = (data) => {
		alert(JSON.stringify(data));
	};
	const goDetails = (data) => {
		<Link
			className={classes.link}
			to={Constants.SCREEN_RESTAURANT_DETAIL}></Link>;
	};

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="justify">Name</TableCell>
						<TableCell align="center">Phone</TableCell>
						{/* <TableCell align="center">Email</TableCell> */}
						<TableCell align="center">City</TableCell>
						<TableCell align="center">Created At</TableCell>
						<TableCell align="center">Status</TableCell>
						<TableCell align="center">Doc Verified</TableCell>
						<TableCell align="center">Action</TableCell>
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
										{/* <TableCell align="center">{n.email}</TableCell> */}
										<TableCell align="center">
											{n.city != undefined ? n.city.name : ""}
										</TableCell>
										<TableCell align="center">
											{n.createdAt != undefined
												? Utility.convertStrDateFormat(
														n.createdAt,
														Constants.DATE_FORMAT_COMING_FROM_SERVER,
														Constants.DATE_FORMAT_SHOW,
												  )
												: ""}
										</TableCell>
										{
											<TableCell align="center">
												{
													<IconButton
														onClick={() => {
															context.updateStatus(
																n[Constants.KEY_UNDERSCORE_ID],
																n[Constants.KEY_STATUS],
															);
														}}
														aria-label="Check">
														{n[Constants.KEY_STATUS] === true ? (
															<ActiveIcon />
														) : (
															<InActiveIcon />
														)}
													</IconButton>
												}
											</TableCell>
										}

										{
											<TableCell align="center">
												{
													<IconButton onClick={() => {}} aria-label="Check">
														{n[Constants.KEY_AADHAR_STATUS] ==
															Constants.DRIVER_STATUS_APPROVED_DOC &&
														n[Constants.KEY_RC_STATUS] ==
															Constants.DRIVER_STATUS_APPROVED_DOC &&
														n[Constants.KEY_LICENSE_STATUS] ==
															Constants.DRIVER_STATUS_APPROVED_DOC &&
														n[Constants.KEY_PAN_STATUS] ==
															Constants.DRIVER_STATUS_APPROVED_DOC ? (
															<ActiveIcon />
														) : (
															<InActiveIcon />
														)}
													</IconButton>
												}
											</TableCell>
										}
										<TableCell align="center">
											{[
												<IconButton
													onClick={() => {
														context.deleteDriver(
															n[Constants.KEY_UNDERSCORE_ID],
														);
													}}
													aria-label="Delete">
													<DeleteIcon />
												</IconButton>,

												<IconButton
													aria-label="Detail"
													onClick={() => {
														context.navigateOnDetailsPage(
															n[Constants.KEY_UNDERSCORE_ID],
														);
													}}>
													<EditIcon />
												</IconButton>,

												<Tooltip
													title={context.strings(StringKeys.Verified_Document)}>
													<IconButton
														aria-label="Detail"
														onClick={() => {
															context.viewImage(n, index);
														}}>
														<VerifiedUserRoundedIcon />
													</IconButton>
												</Tooltip>,

												<IconButton
													aria-label="more"
													aria-controls="long-menu"
													aria-haspopup="true"
													onClick={(event) => {
														handleClick(event, n);
													}}>
													<MoreVertIcon />
												</IconButton>,
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
						maxHeight: ITEM_HEIGHT * 4.5,
						width: 200,
						marginTop: 50,
					},
				}}>
				{options.map((option, pos) => (
					<MenuItem
						key={option}
						onClick={() => {
							handleClose(option, pos);
						}}>
						<ListItemIcon>
							{/* {pos == 0 ? <StoreIcon />
                                : pos == 1 ? <InboxIcon /> :  */}
							<HistoryIcon />
						</ListItemIcon>
						<ListItemText primary={option} />
					</MenuItem>
				))}
			</Menu>
		</Paper>
	);
}

DriverIssueTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DriverIssueTable);
