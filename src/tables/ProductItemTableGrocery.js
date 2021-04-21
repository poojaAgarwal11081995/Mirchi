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
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

let groceryDetails = undefined;
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

// const data = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

function ProductItemTableGrocery(props) {
	const { classes, data, context } = props;
	const [name_app] = React.useState([Constants.KEY_APP_NAME_STRING]);
	const [modal, setModal] = React.useState({
		isVisible: false,
		Product: "",
	});
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
		groceryDetails = CustomStorage.getSessionDataAsObject(
			Constants.KEY_PRODUCT_PAGE_TYPE,
			0,
		);
	});

	const handleClickOpen = (Product) => {
		// alert(JSON.stringify(Product));
		setModal({
			isVisible: true,
			Product: Product,
		});
	};
	const handleClose = () => {
		setModal(false);
	};

	return (
		<Paper className={classes.root}>
			<div>
				<Dialog
					open={modal.isVisible}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description">
					<DialogTitle id="alert-dialog-title">{name_app}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are You Sure ,<br /> You Want To Delete This Product?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								handleClose();
								context.deleteProduct(modal.Product);
							}}
							color="primary"
							autoFocus>
							Ok
						</Button>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="justify"> Product Name</TableCell>
						<TableCell align="justify"> Categories</TableCell>
						<TableCell align="center">Price</TableCell>
						<TableCell align="center">Final Price</TableCell>
						<TableCell align="center">Status</TableCell>
						<TableCell align="center">Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data != undefined
						? data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n) => {
									// console.log("dsjfjkbekgf", n[Constants.KEY_PRODUCT_CATEGORIES][0]);
									// console.log("dedxdfjgmldsmf;lg;ldsfg;;", n[Constants.KEY_PRODUCT_CATEGORIES][0].label);

									return (
										<TableRow key={n.id}>
											<TableCell align="justify" component="th" scope="row">
												{n.name}
											</TableCell>
											<TableCell align="justify">
												{n[Constants.KEY_PRODUCT_CATEGORIES].length > 0
													? n[Constants.KEY_PRODUCT_CATEGORIES][0].label
													: ""}
											</TableCell>
											<TableCell align="center">{n.price.toFixed(2)}</TableCell>
											<TableCell align="center">
												{n.final_price.toFixed(2)}
											</TableCell>
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

											<TableCell align="center">
												{[
													<IconButton
														onClick={() => {
															// context.deleteProduct(n)
															handleClickOpen(n);
														}}
														aria-label="Delete">
														<DeleteIcon />
													</IconButton>,
													<Link
														className={classes.link}
														to={
															Utility.isAdmin()
																? Constants.SCREEN_PRODUCT_GROCERY_DETAILS_ADMIN
																: Constants.SCREEN_PRODUCT_DETAILS_GROCERY
														}>
														<IconButton
															aria-label="Detail"
															onClick={() => {
																CustomStorage.setSessionDataAsObject(
																	Constants.KEY_PRODUCT_DETAILS,
																	n,
																);
															}}>
															<DetailButton />
														</IconButton>
													</Link>,
												]}
											</TableCell>
										</TableRow>
									);
								})
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
							// ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</Paper>
	);
}

ProductItemTableGrocery.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductItemTableGrocery);
