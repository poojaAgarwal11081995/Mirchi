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
import NextIcon from "@material-ui/icons/NavigateNext";
import DetailButton from "@material-ui/icons/RemoveRedEye";
import IconButton from "@material-ui/core/IconButton";
import * as Constants from "../../../utils/Constants";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import EyeIcon from "@material-ui/icons/RemoveRedEye";

import * as Utility from "../../../utils/Utility";
import Tooltip from "@material-ui/core/Tooltip";
import Dropdown from "react-drop-down";
import * as StringKeys from "../../../res/StringKeys";
import CommonDropDown from "../../../common/CommonDropDown";
import * as CustomStorage from "../../../utils/CustomStorage";
import CommonStyle from "../../../res/CommonStyles.js";

let restoDetails = undefined;
let navigate_key = undefined;
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
function OrderRow(props) {
	const { classes, dataOb, context, check } = props;

	const [page, setPage] = React.useState(0);
	const [data, setData] = React.useState(props.dataOb);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
	const [anchorEl, setAnchorEl] = React.useState(null);
	function handleChangeValue(e, index) {
		let STATUS = Utility.getStatusKey(e);
		if (STATUS == Constants.ORDER_STATUS_STR_SELECT) return;
		let req = {
			[Constants.KEY_UNDERSCORE_ID]: data[index]._id,
			[Constants.KEY_STATUS]: STATUS,
		};
		context.changeStatusOrder(req);
	}

	function setDataValue(e) {
		setData({ data: e });
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	useEffect(() => {
		navigate_key = context.props.location[Constants.KEY_DATA];

		setData(props.dataOb);
		setPage(0);
	}, [props.dataOb]);

	function navigateOrderDetails(item) {
		CustomStorage.setSessionDataAsObject(Constants.PROPS_ORDER_ITEM, item);

		context.props.history.push({
			pathname: Utility.isAdmin()
				? Constants.SCREEN_ORDER_DETAILS
				: Constants.SCREEN_ORDER_DETAILS_RESTRO,
			[Constants.PROPS_ORDER_ITEM]: item,
		});
	}

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}
	const open = Boolean(anchorEl);

	const id = open ? "common-popover" : undefined;

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="justify" style={CommonStyle.tableRowHeader}>
							Phone(Customer)
						</TableCell>
						<TableCell align="justify" style={CommonStyle.tableRowHeader}>
							Phone(Driver)
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							Total Price
						</TableCell>
						{/* <TableCell align="center" style={CommonStyle.tableRowHeader}>Order Id</TableCell> */}
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							Order Number
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							Created At
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							Status
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							Action
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data != undefined
						? data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n, index) => (
									<TableRow key={n._id}>
										<TableCell align="justify">
											{n.user_detail != undefined ? n.user_detail.phone : ""}
										</TableCell>
										<TableCell align="justify">
											{n.driver_detail != undefined
												? n.driver_detail.phone
												: ""}
										</TableCell>
										<TableCell align="center">
											{n.total_price.toFixed(2)}
										</TableCell>
										{/* <TableCell align="center">{n._id}</TableCell> */}
										<TableCell align="center">
											{n[Constants.KEY_ORDER_NUMBER]}
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
										<TableCell align="center">
											{Utility.getStatusValue(n.status) + ""}
										</TableCell>
										<TableCell align="center">
											{[
												<Tooltip
													title={context.strings(StringKeys.Order_detail)}>
													<IconButton
														aria-label="Order Detail"
														onClick={() => {
															navigateOrderDetails(n);
														}}>
														<EyeIcon />
													</IconButton>
												</Tooltip>,
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
		</Paper>
	);
}

OrderRow.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderRow);
