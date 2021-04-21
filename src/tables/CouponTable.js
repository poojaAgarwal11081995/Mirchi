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
import * as Constants from "../utils/Constants";
import { Link } from "react-router-dom";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import * as CustomStorage from "../utils/CustomStorage";
import * as StringKeys from "../res/StringKeys";
import ActiveIcon from "@material-ui/icons/Check";
import InActiveIcon from "@material-ui/icons/Clear";
import * as Utility from "../utils/Utility";

let restoDetails = undefined;
let userData = undefined;
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

function CouponTable(props) {
	const { classes, data, context } = props;
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	useEffect(() => {
		//  alert(JSON.stringify(data))
		restoDetails = CustomStorage.getSessionDataAsObject(
			Constants.KEY_PRODUCT_PAGE_TYPE,
			0,
		);
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	});

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="justify">
							{context.strings(StringKeys.Coupon_Code)}
						</TableCell>
						<TableCell align="center">
							{context.strings(StringKeys.Discount_In_Percentage)}
						</TableCell>
						{/* <TableCell align="center">{context.strings(StringKeys.Max_Discount_Amount)}</TableCell>
                        <TableCell align="center">{context.strings(StringKeys.Minimum_Discount_Amount)}</TableCell> */}
						<TableCell align="center">
							{context.strings(StringKeys.Valid_From)}
						</TableCell>
						<TableCell align="center">
							{context.strings(StringKeys.Valid_To)}
						</TableCell>
						<TableCell align="center">
							{context.strings(StringKeys.Stauts)}
						</TableCell>
						<TableCell align="center">
							{context.strings(StringKeys.Action)}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data != undefined
						? data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n) => (
									<TableRow key={n.id}>
										<TableCell align="justify" component="th" scope="row">
											{n[Constants.KEY_COUPON_CODE]}
										</TableCell>
										<TableCell align="center">
											{n[Constants.KEY_COUPON_DISCOUNT_IN_PERCENT]}
										</TableCell>
										{/* <TableCell align="center">{n[Constants.KEY_COUPON_MAX_DISCOUNT_AMOUNT] + ''}</TableCell>
                            <TableCell align="center">{n[Constants.KEY_COUPON_MIN_DISCOUNT_AMOUNT] + ''}</TableCell> */}
										<TableCell align="center">
											{n[Constants.KEY_VALID_FROM] + ""}
										</TableCell>
										<TableCell align="center">
											{n[Constants.KEY_VALID_TO] + ""}
										</TableCell>

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

										{userData[Constants.KEY_ROLE] ==
										n[Constants.KEY_CREATED_BY_USER_TYPE] ? (
											<TableCell align="center">
												{[
													<IconButton
														aria-label="Detail"
														onClick={() => {
															CustomStorage.setSessionDataAsObject(
																Constants.KEY_COUPON_DETAILS,
																n,
															);
															context.navigateAddPage();
														}}>
														<DetailButton />
													</IconButton>,
													// <IconButton onClick={() => {
													//     context.deleteCoupon(n)
													// }} aria-label="Delete">
													//     <DeleteIcon />
													// </IconButton>
												]}
											</TableCell>
										) : (
											<TableCell align="center">
												{[
													<IconButton
														aria-label="Detail"
														onClick={() => {
															CustomStorage.setSessionDataAsObject(
																Constants.KEY_COUPON_DETAILS,
																n,
															);
															context.navigateAddPage();
														}}>
														<DetailButton />
													</IconButton>,
												]}
											</TableCell>
										)}
									</TableRow>
								))
						: null}
				</TableBody>

				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							colSpan={12}
							count={data != undefined && data != null ? data.length : 0}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: { "aria-label": "Rows per page" },
								native: true,
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							// ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</Paper>
	);
}

CouponTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CouponTable);
