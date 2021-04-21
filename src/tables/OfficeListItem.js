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
import DetailButton from "@material-ui/icons/RemoveRedEye";
import IconButton from "@material-ui/core/IconButton";
import * as Constants from "../utils/Constants";
import { Link } from "react-router-dom";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import * as CustomStorage from "../utils/CustomStorage";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { reqDeleteRestro } from "../actions";
import * as types from "../actions/types";
import NextIcon from "@material-ui/icons/NavigateNext";
import Tooltip from "@material-ui/core/Tooltip";
import * as StringKeys from "../res/StringKeys";
import * as Utility from "../utils/Utility";
import Dropdown from "react-drop-down";
import CommonDropDown from "../common/CommonDropDown";
import ActiveIcon from "@material-ui/icons/Check";
import InActiveIcon from "@material-ui/icons/Clear";
import MoneyIcon from "@material-ui/icons/Money";
import CommonStyle from "../res/CommonStyles.js";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

function OfficeListItem(props) {
	const { classes, dataOb, context } = props;

	const [page, setPage] = React.useState(0);
	const [modal, setModal] = useState({
		isVisible: false,
		id: null,
	});
	const { buttonLabel, className } = props;
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, dataOb.length - page * rowsPerPage);
	const [data, setData] = React.useState(props.dataOb);
	const [name_app, setappName] = React.useState([
		Constants.KEY_APP_NAME_STRING,
	]);
	const [options, setOptions] = React.useState([
		Constants.ORDER_STATUS_STR_BLOCK,
		Constants.ORDER_STATUS_STR_UNBLOCK,
	]);
	const handleClickOpen = (id) => {
		setModal({
			isVisible: true,
			id: id,
		});
	};
	const handleClose = () => {
		setModal(false);
	};

	useEffect(() => {
		// navigate_key = context.props.location[Constants.KEY_DATA];
		// alert(JSON.stringify(props.dataOb));
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

		context.updateStatus(
			data[index][Constants.KEY_UNDERSCORE_ID],
			data[index][Constants.KEY_STATUS],
		);
	}

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
							Are You Sure ,<br /> You Want To Delete This Office?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								handleClose();
								context.deleteOffice(modal.id);
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
			{/* <div> */}
			{/* <Modal
					isOpen={modal.isVisible}
					style={{
						display: "flex",
						justifyContent: "center",
						top: "20%",
						width: "300px",
						height: "260px",
					}}
					toggle={toggle}
					className={className}>
					<ModalHeader style={{ backgroundColor: "red" }}>
						<h5 style={{ color: "white" }}>{name_app}</h5>
					</ModalHeader>
					<ModalBody style={{ margin: "30px" }}>
						Are You Sure ,<br /> You Want To Delete This Office?
					</ModalBody>
					<ModalFooter>
						<Button
							className="button"
							color="danger"
							onClick={() => {
								toggle();
								context.deleteOffice(modal.id);
							}}>
							Ok
						</Button>{" "}
						<Button className="button" color="danger" onClick={toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</div> */}
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="justify" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.Office_Name)}
						</TableCell>

						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.Phone)}
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.City)}
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.Stauts)}
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
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
										{/* <TableCell align="justify" component="th" scope="row">
											{n.address}
										</TableCell> */}
										<TableCell align="center">{n.phone}</TableCell>
										<TableCell align="center">
											{n.city != undefined ? n.city.name : ""}
										</TableCell>

										{
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
										}

										<TableCell align="center">
											{[
												context.deleteOffice !== undefined && (
													<Tooltip title={context.strings(StringKeys.DELETE)}>
														<IconButton
															// onClick={() => {
															// 	context.deleteOffice(
															// 		n[Constants.KEY_UNDERSCORE_ID],
															// 	);
															// }}
															onClick={() =>
																handleClickOpen(n[Constants.KEY_UNDERSCORE_ID])
															}
															aria-label="Delete">
															{buttonLabel}
															<DeleteIcon />
														</IconButton>
													</Tooltip>
												),
												context.onOfficeEditClick != undefined && (
													<Tooltip
														title={context.strings(StringKeys.Office_Detail)}>
														<IconButton
															aria-label="Detail"
															onClick={() => {
																context.onOfficeEditClick(n);
															}}>
															<EditIcon />
														</IconButton>
													</Tooltip>
												),

												//    <Tooltip title={context.strings(StringKeys.Office_Detail)}>
												//             <IconButton aria-label="Detail" onClick={() => {
												//                 CustomStorage.setSessionDataAsObject(
												//                     Constants.KEY_RESTO_ID, n[Constants.KEY_UNDERSCORE_ID]);
												//                 context.navigate(n[Constants.KEY_UNDERSCORE_ID])
												//             }}>
												//                 <EditIcon />
												//             </IconButton></Tooltip>,

												context.onRecivePaymentClick != undefined && (
													<Tooltip
														title={context.strings(
															StringKeys.Receive_Floating_Cash,
														)}>
														<IconButton
															aria-label="Detail"
															onClick={() => context.onRecivePaymentClick(n)}>
															<MoneyIcon />
														</IconButton>
													</Tooltip>
												),

												// <IconButton aria-label="Detail" onClick={() => {
												//     context.navigateOnDetailsPage(n)
												// }}>

												//     <EditIcon />
												// </IconButton >,
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
							// ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</Paper>
	);
}

export default withStyles(styles)(OfficeListItem);
//export default connect(mapStateToProps, { reqDeleteRestro })(withStyles(styles)(SimpleTable));
