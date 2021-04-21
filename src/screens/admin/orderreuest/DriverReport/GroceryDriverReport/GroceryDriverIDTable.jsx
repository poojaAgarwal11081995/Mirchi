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
import * as Constants from "../../../../../utils/Constants";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

import * as Utility from "../../../../../utils/Utility";
import Tooltip from "@material-ui/core/Tooltip";
import Dropdown from "react-drop-down";
import * as StringKeys from "../../../../../res/StringKeys";
import CommonDropDown from "../../../../../common/CommonDropDown";
import * as CustomStorage from "../../../../../utils/CustomStorage";

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
function GroceryDriverIdTable(props) {
	const { classes, dataOb, context, check } = props;

	const [page, setPage] = React.useState(0);
	const [data, setData] = React.useState(props.dataOb);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	const [anchorEl, setAnchorEl] = React.useState(null);
	//alert(JSON.stringify(data));

	function handleChangeValue(e, index) {
		let STATUS = Utility.getStatusKey(e);
		if (STATUS == Constants.ORDER_STATUS_STR_SELECT) return;

		let req = {
			[Constants.KEY_UNDERSCORE_ID]: data[index]._id,
			[Constants.KEY_STATUS]: STATUS,
		};
		context.changeStatusOrder(req);
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}
	function handleSecounds(sec) {
		var given_seconds = sec;
		var hours = Math.floor(given_seconds / 3600);
		var minutes = Math.floor((given_seconds - hours * 3600) / 60);
		var seconds = given_seconds - hours * 3600 - minutes * 60;

		var timeString =
			hours.toString().padStart(2, "0") +
			":" +
			minutes.toString().padStart(2, "0") +
			":" +
			seconds.toString().padStart(2, "0");
		return timeString;
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

	const deleiverDate = (picked, delever) => {
		var date = picked - delever;
		// alert(date);
		var d = new Date(date);
		var ds = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
		return ds;
	};
	const dateReceive = (date) => {
		var d_date = date;
		var R_date = new Date(d_date);
		var P_date = R_date.toLocaleDateString();
		return P_date;
	};

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="left">Date</TableCell>
						<TableCell align="left">Customer Name </TableCell>
						<TableCell align="left">Customer ID </TableCell>
						<TableCell align="left">Order Number </TableCell>
						<TableCell align="left">Delivery Time </TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data != undefined
						? data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n) => (
									<TableRow key={n._id}>
										<TableCell align="left">
											{dateReceive(n.createdAt)}
										</TableCell>
										<TableCell align="left">{n.username}</TableCell>

										<TableCell align="left">{n._id}</TableCell>
										<TableCell align="left">{n.order_number}</TableCell>
										<TableCell align="left">
											{/* {n.order_date_delivered} */}

											{deleiverDate(
												n.order_date_picked_up,
												n.order_date_delivered,
											)}
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
		</Paper>
	);
}

GroceryDriverIdTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroceryDriverIdTable);
