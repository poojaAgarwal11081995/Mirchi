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
import * as StringKeys from "../res/StringKeys";
import * as Utility from "../utils/Utility";
import MoneyIcon from "@material-ui/icons/Money";
import Tooltip from "@material-ui/core/Tooltip";

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

function FLCashDriverTableGrocery(props) {
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
		//  alert(rowsPerPage)
	}

	const deleteEditRow = (data) => {
		alert(JSON.stringify(data));
	};
	const goDetails = (data) => {
		<Link className={classes.link} to={Constants.SCREEN_GROCERY_DETAIL}></Link>;
	};

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="justify">Name</TableCell>
						<TableCell align="center">Phone</TableCell>
						{/* <TableCell align="center">Email</TableCell> */}
						{/* <TableCell align="center">City</TableCell> */}
						{/* <TableCell align="center">Created At</TableCell> */}
						<TableCell align="center">Pay Amount</TableCell>
						{/* <TableCell align="center">Doc Verified</TableCell> */}
						<TableCell align="center">Action</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{data != undefined
						? data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n) => (
									<TableRow key={n._id}>
										<TableCell align="justify" component="th" scope="row">
											{n[Constants.KEY_DRIVER_DETAILS][Constants.KEY_NAME]}
										</TableCell>
										<TableCell align="center">
											{" "}
											{n[Constants.KEY_DRIVER_DETAILS][Constants.KEY_PHONE]}
										</TableCell>
										{/* <TableCell align="center">{n.email}</TableCell> */}
										{/* <TableCell align="center">
											{n[Constants.KEY_DRIVER_DETAILS][Constants.KEY_CITY][
												Constants.KEY_NAME
											] != undefined
												? n[Constants.KEY_DRIVER_DETAILS][Constants.KEY_CITY][
														Constants.KEY_NAME
												  ]
												: ""}
										</TableCell> */}
										{/* <TableCell align="center">{n.createdAt != undefined ? Utility.convertStrDateFormat(n.createdAt,
                                Constants.DATE_FORMAT_COMING_FROM_SERVER, Constants.DATE_FORMAT_SHOW) : ''}</TableCell> */}
										{
											<TableCell align="center" component="th" scope="row">
												{n[Constants.KEY_TOTAL_AMOUNT].toFixed(2)}
											</TableCell>
										}

										{
											// (<TableCell align="center">{
											//     (<IconButton onClick={() => {
											//     }} aria-label="Check">
											//         {n[Constants.KEY_AADHAR_STATUS] == Constants.DRIVER_STATUS_APPROVED_DOC &&
											//             n[Constants.KEY_RC_STATUS] == Constants.DRIVER_STATUS_APPROVED_DOC &&
											//             n[Constants.KEY_LICENSE_STATUS] == Constants.DRIVER_STATUS_APPROVED_DOC &&
											//             n[Constants.KEY_PAN_STATUS] == Constants.DRIVER_STATUS_APPROVED_DOC
											//             ? <ActiveIcon /> : <InActiveIcon />}
											//     </IconButton>)
											// }
											// </TableCell>)
										}
										<TableCell align="center">
											{[
												// context.onRecivePaymentClick != undefined &&

												<Tooltip
													color="secondary"
													title={context.strings(
														StringKeys.Receive_Floating_Cash,
													)}>
													<IconButton
														aria-label="Detail"
														button
														onClick={() => context.onReceivePaymentClick(n)}>
														<MoneyIcon />
													</IconButton>
												</Tooltip>,

												// onClick={() => {
												//     CustomStorage.setSessionDataAsObject(
												//         Constants.KEY_COUPON_DETAILS, n);
												//     context.navigateAddPage();

												// <IconButton onClick={() => {
												//     context.deleteDriver(n[Constants.KEY_UNDERSCORE_ID])
												// }} aria-label="Delete">
												//     <DeleteIcon />
												// </IconButton>,

												// <IconButton aria-label="Detail" onClick={() => {
												//     context.navigateOnDetailsPage(n[Constants.KEY_UNDERSCORE_ID])
												// }}>
												//     <EditIcon />
												// </IconButton>

												// <IconButton aria-label="Detail" onClick={() => {
												//     context.viewImage(n, index)
												// }}>
												//     <DetailButton />
												//</IconButton>
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

FLCashDriverTableGrocery.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FLCashDriverTableGrocery);
