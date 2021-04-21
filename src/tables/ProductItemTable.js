/** @format */

import React, { useState, useEffect } from "react";
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
import * as StringKeys from "../../src/res/StringKeys";
import ActiveIcon from "@material-ui/icons/Check";
import { toast, ToastContainer } from "react-toastify";
import InActiveIcon from "@material-ui/icons/Clear";
import * as Utility from "../utils/Utility";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

let restoDetails = undefined;
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

function ProductItemTable(props) {
	const { classes, data, context } = props;
	const [page, setPage] = React.useState(0);
	const [modal, setModal] = useState({
		isVisible: false,
		Product: "",
	});
	const { buttonLabel, className } = props;
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
	const [name_app] = React.useState([Constants.KEY_APP_NAME_STRING]);
	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	useEffect(() => {
		restoDetails = CustomStorage.getSessionDataAsObject(
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

				{/* <Modal
					isOpen={modal.isVisible}
					style={{
						display: "flex",
						justifyContent: "center",
						top: "20%",
						width: "300px",
						height: "290px",
					}}
					toggle={toggle}
					className={className}>
					<ModalHeader style={{ backgroundColor: "red" }}>
						<h5 style={{ color: "#fff" }}> {name_app}</h5>
					</ModalHeader>
					<ModalBody style={{ margin: "30px" }}>
						Are You Sure ,<br /> You Want To Delete This Product
					</ModalBody>
					<ModalFooter>
						<Button
							className="button"
							color="danger"
							onClick={() => {
								toggle();
								context.deleteProduct(modal.product);
							}}>
							Ok
						</Button>{" "}
						<Button className="button" color="danger" onClick={toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal> */}
			</div>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="justify"> Product Name</TableCell>
						<TableCell align="justify"> Categories</TableCell>

						<TableCell align="center">Price</TableCell>
						<TableCell align="center">Cooking Time</TableCell>
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
											<TableCell align="center">{n.price}</TableCell>
											<TableCell align="center">
												{n[Constants.KEY_COOKING_TIME] + ""}
											</TableCell>
											<TableCell align="center">
												{n.final_price.toFixed(2) + ""}
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
														// onClick={() => {
														// 	context.deleteProduct(n);
														// }}
														onClick={() => {
															handleClickOpen(n);
														}}
														aria-label="Delete">
														{buttonLabel}
														<DeleteIcon />
													</IconButton>,
													<Link
														className={classes.link}
														to={
															Utility.isAdmin()
																? Constants.SCREEN_PRODUCT_DETAILS
																: Constants.SCREEN_PRODUCT_DETAILS_RESTRO
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

ProductItemTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductItemTable);
