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
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import EditIcon from "@material-ui/icons/Edit";
import NextIcon from "@material-ui/icons/NavigateNext";
import DetailButton from "@material-ui/icons/RemoveRedEye";
import IconButton from "@material-ui/core/IconButton";
import * as Constants from "../../../utils/Constants";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

import * as Utility from "../../../utils/Utility";
import Rating from "@material-ui/lab/Rating";
import Tooltip from "@material-ui/core/Tooltip";
import Dropdown from "react-drop-down";
import * as StringKeys from "../../../res/StringKeys";
import CommonDropDown from "../../../common/CommonDropDown";
import * as CustomStorage from "../../../utils/CustomStorage";

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
function ReviewItemsGrocery(props) {
	const { classes, dataOb, context, check } = props;

	const [page, setPage] = React.useState(0);
	const [data, setData] = React.useState(props.dataOb);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	const [anchorEl, setAnchorEl] = React.useState(null);
	// const options = ['Stats', 'angular2'];
	const [options, setOptions] = React.useState([
		Constants.ORDER_STATUS_STR_PENDING,
		Constants.ORDER_STATUS_STR_ACCEPTED,
		Constants.ORDER_STATUS_STR_PREPARING,
		Constants.ORDER_STATUS_STR_ASSIGN_DELIVERY,
		Constants.ORDER_STATUS_STR_CANCEL_BY_RESTAURANT,
		Constants.ORDER_STATUS_STR_CANCEL_BY_CUSTOMER,
		Constants.ORDER_STATUS_STR_DELIVER,
	]);
	const [value, setValue] = React.useState(options[1]);

	function handleChangeValue(e, index) {
		let STATUS = Utility.getStatusKeyGrocery(e);
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
		// CustomStorage.setSessionDataAsObject(
		//     Constants.PROPS_ORDER_ITEM, item);

		// context.props.history.push({
		//     pathname: Utility.isAdmin() ? Constants.SCREEN_ORDER_DETAILS : Constants.SCREEN_ORDER_DETAILS_RESTRO,
		//     [Constants.PROPS_ORDER_ITEM]: item
		// });

		context.props.history.push({
			pathname: Constants.SCREEN_VIEW_REVIEW_GROCERY,
			param: item,
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
						<TableCell align="center">Order Number</TableCell>
						<TableCell align="justify">Given By</TableCell>
						<TableCell align="justify">Given For</TableCell>
						<TableCell align="justify">Grocery Store Name</TableCell>
						<TableCell align="center">Total Price</TableCell>
						<TableCell align="center">Rating</TableCell>
						{/* <TableCell align="center">Status</TableCell> */}
						<TableCell align="center">Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data != undefined
						? data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n) => (
									<TableRow key={n._id}>
										<TableCell align="center">
											{n[Constants.KEY_ORDER_DETAILS] != undefined &&
												n[Constants.KEY_ORDER_DETAILS][
													Constants.KEY_ORDER_NUMBER
												]}
										</TableCell>
										<TableCell align="justify">
											{n[Constants.KEY_RATING_FROM] == Constants.RATING_FOR_USER
												? n[Constants.KEY_USER_DETAILS] != undefined
													? n[Constants.KEY_USER_DETAILS][Constants.KEY_NAME] +
													  Constants.RATING_C
													: Constants.RATING_NOT
												: n[Constants.KEY_RATING_FROM] ==
												  Constants.RATING_FOR_DRIVER
												? n[Constants.KEY_DRIVER_DETAILS] != undefined
													? n[Constants.KEY_DRIVER_DETAILS][
															Constants.KEY_NAME
													  ] + Constants.RATING_D
													: Constants.RATING_NOT
												: n[Constants.KEY_RATING_FROM] ==
												  Constants.RATING_FOR_GROCERY
												? n[Constants.KEY_GROCERY_DETAILS] != undefined
													? n[Constants.KEY_GROCERY_DETAILS][
															Constants.KEY_NAME
													  ] + Constants.RATING_R
													: Constants.RATING_NOT
												: ""}
										</TableCell>
										<TableCell align="justify">
											{/* {n["driver_detail"]["name"]} */}
											{n[Constants.KEY_RATING_FOR] == Constants.RATING_FOR_USER
												? n[Constants.KEY_USER_DETAILS] != undefined
													? n[Constants.KEY_USER_DETAILS][Constants.KEY_NAME] +
													  Constants.RATING_C
													: Constants.RATING_NOT
												: n[Constants.KEY_RATING_FOR] ==
												  Constants.RATING_FOR_DRIVER
												? n[Constants.KEY_DRIVER_DETAILS] != undefined
													? n[Constants.KEY_DRIVER_DETAILS][
															Constants.KEY_NAME
													  ] + Constants.RATING_D
													: Constants.RATING_NOT
												: n[Constants.KEY_RATING_FOR] ==
												  Constants.RATING_FOR_GROCERY
												? n[Constants.KEY_GROCERY_DETAILS] != undefined
													? n[Constants.KEY_GROCERY_DETAILS][
															Constants.KEY_STORE_NAME
													  ] + Constants.RATING_G
													: Constants.RATING_NOT
												: " "}
										</TableCell>
										<TableCell align="justify">
											{n[Constants.KEY_GROCERY_DETAILS] != undefined
												? n[Constants.KEY_GROCERY_DETAILS][
														Constants.KEY_STORE_NAME
												  ]
												: ""}
										</TableCell>
										<TableCell align="center">
											{n[Constants.KEY_ORDER_DETAILS] != undefined
												? n[Constants.KEY_ORDER_DETAILS].total_price.toFixed(2)
												: 0}
										</TableCell>
										<TableCell align="center">
											{[
												<Rating
													name="disabled"
													value={n[Constants.KEY_RATING]}
													disabled
												/>,
											]}
										</TableCell>

										{/* <TableCell align="center">{Utility.getStatusValue(n[Constants.KEY_ORDER_DETAILS] != undefined && n[Constants.KEY_ORDER_DETAILS][Constants.KEY_STATUS]) + ''}</TableCell> */}

										<TableCell align="center">
											{[
												<Tooltip
													title={context.strings(StringKeys.RatingAndReview)}>
													<IconButton
														aria-label="CheckOrders"
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
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</Paper>
	);
}

ReviewItemsGrocery.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewItemsGrocery);
