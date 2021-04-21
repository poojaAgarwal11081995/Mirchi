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
import ActiveIcon from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/IconButton";
import * as Utility from "../../../../../utils/Utility";
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
function GroceryDriverReportTable(props) {
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
						<TableCell align="left">Driver ID </TableCell>
						<TableCell align="left">Driver Name</TableCell>
						<TableCell align="left">Total Order </TableCell>
						<TableCell align="left">Action </TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data != undefined
						? data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n) => (
									<TableRow key={n._id}>
										<TableCell align="left">{n._id}</TableCell>
										<TableCell align="left">{n.driver_name}</TableCell>
										<TableCell align="left">{n.totalOrders}</TableCell>
										<TableCell align="left">
											{[
												<IconButton
													aria-label="Detail"
													onClick={() => {
														context.navigateOnDetailsPage(n);
													}}>
													<ActiveIcon />
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
		</Paper>
	);
}

GroceryDriverReportTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroceryDriverReportTable);
