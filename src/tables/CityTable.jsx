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
import * as Constants from "../utils/Constants";
import CommonSwitch from "../common/CommonSwitch";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DetailButton from "@material-ui/icons/NavigateNext";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import ActiveIcon from "@material-ui/icons/Check";
import InActiveIcon from "@material-ui/icons/Clear";
import ListIcon from "@material-ui/icons/List";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import * as CustomStorage from "../utils/CustomStorage";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
// deleteCity
// dataOb
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

function CityTable(props) {
	const {
		classes,
		dataOb,
		// data = props.data == undefined ? [] : props.data,
		headerData,
		context,
	} = props;
	const [page, setPage] = React.useState(0);
	const [data, setData] = React.useState(props.dataOb);
	const [modal, setModal] = React.useState({
		id: "",
		isVisiable: false,
	});
	const handleClickOpen = (id) => {
		// alert(id);
		setModal({
			id: id,
			isVisiable: true,
		});
	};
	const handleClose = () => {
		setModal(false);
	};
	React.useEffect(() => {
		setData(props.dataOb);
		setPage(0);
	}, [props.dataOb]);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}
	const getTimeFormat = (isoTime) => {
		var DateAM = isoTime;
		var isoDateTime = new Date(DateAM);
		var localDateTime =
			isoDateTime.toLocaleDateString() +
			" " +
			isoDateTime.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			});

		return localDateTime;
	};

	const deleteEditRow = (data) => {
		// alert(JSON.stringify(data))
	};
	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	return (
		<Paper className={classes.root}>
			<div>
				<Dialog
					open={modal.isVisiable}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description">
					<DialogTitle id="alert-dialog-title">Br Food and Grocery</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure, <br />
							you want to delete this Region
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button
							onClick={() => {
								// alert(modal.id);
								context.deleteCity(modal.id);
								handleClose();
							}}
							color="primary"
							autoFocus>
							ok
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			<Table className={classes.table}>
				<TableHead>
					<TableRow key={"header_row"}>
						{headerData.map((headerObj, index) => (
							<TableCell align={index == 0 ? "left" : "center"}>
								{headerObj[Constants.KEY_NAME]}
							</TableCell>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
					{/* {data.map((dataObj, index) => ( */}
					{data != undefined &&
						data.length > 0 &&
						data
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((dataObj, index) => (
								<TableRow key={dataObj[Constants.KEY_UNDERSCORE_ID]}>
									<TableCell align="left">
										{dataObj[Constants.KEY_LABEL]}
									</TableCell>
									<TableCell align="center">
										{dataObj[Constants.KEY_STATE][Constants.KEY_NAME] !=
										undefined
											? dataObj[Constants.KEY_STATE][Constants.KEY_NAME]
											: ""}
									</TableCell>
									<TableCell align="center">
										{dataObj[Constants.KEY_COUNTRY][Constants.KEY_NAME] !=
										undefined
											? dataObj[Constants.KEY_COUNTRY][Constants.KEY_NAME]
											: ""}
									</TableCell>

									<TableCell align="center">
										{
											<IconButton
												onClick={() => {
													context.updateStatus(
														dataObj[Constants.KEY_UNDERSCORE_ID],
														dataObj[Constants.KEY_STATUS],
													);
												}}
												aria-label="Check">
												{dataObj[Constants.KEY_STATUS] === true ? (
													<ActiveIcon />
												) : (
													<InActiveIcon />
												)}
											</IconButton>
										}
									</TableCell>
									<TableCell align="center">
										{getTimeFormat(dataObj[Constants.KEY_CREATED])}
									</TableCell>
									{/* <TableCell align="center">
										{dataObj[Constants.KEY_CREATED].slice(11, 19)}
									</TableCell> */}

									<TableCell align="center">
										{[
											// <IconButton
											// 	onClick={() => {
											// 		// context.deleteCity(dataObj[Constants.KEY_UNDERSCORE_ID])
											// 		// context.deleteCity(dataObj)
											// 		handleClickOpen(dataObj[Constants.KEY_UNDERSCORE_ID]);
											// 	}}
											// 	aria-label="Delete">
											// 	<DeleteIcon />
											// </IconButton>,

											<Link
												className={classes.link}
												to={Constants.SCREEN_EDIT_CITY}>
												<IconButton
													aria-label="Detail"
													onClick={() => {
														CustomStorage.setSessionDataAsObject(
															Constants.KEY_CITY_DETAILS,
															dataObj,
														);
													}}>
													<DetailButton />
												</IconButton>
											</Link>,
										]}
									</TableCell>
								</TableRow>
							))}
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

CityTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CityTable);
