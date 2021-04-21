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
import NextIcon from "@material-ui/icons/ListAltOutlined";
import AddProductIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import * as Constants from "../utils/Constants";
import { Link } from "react-router-dom";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import * as CustomStorage from "../utils/CustomStorage";
import * as StringKeys from "../../src/res/StringKeys";
import Tooltip from "@material-ui/core/Tooltip";
import CommonStyle from "../res/CommonStyles.js";
import * as Utility from "../utils/Utility";

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

// const data = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

function ChooseRestoItemTable(props) {
	const { classes, data, context, headerData } = props;

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
		// restoDetails = CustomStorage.getSessionDataAsObject(Constants.KEY_PRODUCT_PAGE_TYPE, 0);
		navigate_key = context.props.location[Constants.KEY_DATA];
		// alert(JSON.stringify(headerData))
	});

	const deleteEditRow = (data) => {
		alert(JSON.stringify(data));
	};

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow key={"header_row"}>
						<TableCell align="justify" style={CommonStyle.tableRowHeader}>
							{" "}
							{context.strings(StringKeys.Restaurant_Name)}
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.Phone)}
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.City)}
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.State)}
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.Country)}
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
								.map((n) => (
									<TableRow key={n.id}>
										<TableCell align="justify" component="th" scope="row">
											{n.name}
										</TableCell>
										<TableCell align="center">{n.phone}</TableCell>
										<TableCell align="center">
											{n.city != undefined ? n.city.name : ""}
										</TableCell>
										<TableCell align="center">
											{(n.state != undefined ? n.state.name : "") + ""}
										</TableCell>
										<TableCell align="center">
											{(n.country != undefined ? n.country.name : "") + ""}
										</TableCell>

										<TableCell align="center">
											{[
												// <Link className={classes.link}
												//     to={Constants.SCREEN_ADD_PRODUCT}
												// >
												//     <Tooltip title={context.strings(StringKeys.Add_Product)}>
												//         <IconButton aria-label
												//             ="Detail" onClick={() => {
												//                 CustomStorage.setSessionDataAsObject(
												//                     Constants.KEY_RESTO_DETAILS, n);
												//             }
												//             }>
												//             {<AddProductIcon />}

												//         </IconButton>
												//     </Tooltip>

												// </Link>,
												<Tooltip
													title={context.strings(StringKeys.Product_Types)}>
													<IconButton
														aria-label="Detail"
														onClick={() => {
															CustomStorage.setSessionDataAsObject(
																Constants.KEY_RESTO_DETAILS,
																n,
															);
															context.props.history.push({
																pathname: Utility.isAdmin
																	? Constants.SCREEN_PRODUCT_CATEGORY_LIST
																	: Constants.SCREEN_PRODUCT_CATEGORY_LIST_RESTRO,
																[Constants.KEY_RESTO_DETAILS]: n,
															});
														}}>
														{<AddProductIcon />}
													</IconButton>
												</Tooltip>,

												// <Link className={classes.link}
												//     to={Constants.SCREEN_PRODUCT_LIST}
												// >
												<Tooltip
													title={context.strings(StringKeys.Product_List)}>
													<IconButton
														aria-label="Detail"
														onClick={() => {
															CustomStorage.setSessionDataAsObject(
																Constants.KEY_RESTO_DETAILS,
																n,
															);

															context.props.history.push({
																pathname: Utility.isAdmin
																	? Constants.SCREEN_PRODUCT_LIST
																	: Constants.SCREEN_PRODUCT_LIST_RETSRO,
																[Constants.KEY_RESTO_DETAILS]: n,
															});
														}}>
														{<NextIcon />}
													</IconButton>
												</Tooltip>,
												// </Link>
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

ChooseRestoItemTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChooseRestoItemTable);
