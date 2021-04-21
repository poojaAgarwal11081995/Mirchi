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
import * as Constants from "../../utils/Constants";
import { Link } from "react-router-dom";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import * as CustomStorage from "../../utils/CustomStorage";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { reqDeleteRestro } from "../../actions";
import * as types from "../../actions/types";
import NextIcon from "@material-ui/icons/NavigateNext";
import Tooltip from "@material-ui/core/Tooltip";
import * as StringKeys from "../../res/StringKeys";

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

function SimpleTable(props) {
	const { classes, data, context } = props;

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	function handleChangePage(event, newPage) {
		setPage(newPage);
		setPage(0);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	const deleteEditRow = (data) => {
		//  alert(JSON.stringify(data))
	};
	const goDetails = (data) => {
		<Link
			className={classes.link}
			to={Constants.SCREEN_RESTAURANT_DETAIL}></Link>;
	};

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="justify"> Restaurant Name</TableCell>
						<TableCell align="center">Phone</TableCell>
						<TableCell align="center">City</TableCell>
						<TableCell align="center">Status</TableCell>
						<TableCell align="center">Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data != undefined
						? data.map((n) => (
								<TableRow key={n.id}>
									<TableCell align="justify" component="th" scope="row">
										{n.name}
									</TableCell>
									<TableCell align="center">{n.phone}</TableCell>
									<TableCell align="center">
										{n.city != undefined ? n.city.name : ""}
									</TableCell>
									<TableCell align="center">{n.status + ""}</TableCell>
									<TableCell align="center">
										{[
											<Tooltip title={context.strings(StringKeys.DELETE)}>
												<IconButton
													onClick={() => {
														context.deleteRestro(
															n[Constants.KEY_UNDERSCORE_ID],
														);
													}}
													aria-label="Delete">
													<DeleteIcon />
												</IconButton>
											</Tooltip>,
											<Tooltip
												title={context.strings(StringKeys.RESTO_DETAILS)}>
												<IconButton
													aria-label="Detail"
													onClick={() => {
														CustomStorage.setSessionDataAsObject(
															Constants.KEY_RESTO_ID,
															n[Constants.KEY_UNDERSCORE_ID],
														);
														context.navigate(n[Constants.KEY_UNDERSCORE_ID]);
													}}>
													<DetailButton />
												</IconButton>
											</Tooltip>,
											<Tooltip
												title={context.strings(StringKeys.Check_Request)}>
												<IconButton
													aria-label="CheckOrders"
													onClick={() => {
														context.navigateOrdersPage(
															n[Constants.KEY_UNDERSCORE_ID],
														);
													}}>
													<NextIcon />
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
							// ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</Paper>
	);

	function handleResponse(nextProps) {
		var respObj = null;
		alert("sdsd");
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_RESTRO_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_RESTRO_LIST
						],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_DELETE_RESTRO) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				context.getRestoList();
			}
		}
	}

	function deleteRestro(id) {
		alert(JSON.stringify(props));
		var data = {
			[Constants.KEY_UNDERSCORE_ID]: id,
		};
		//this.props.reqDeleteRestro(data, this)
	}
}

SimpleTable.propTypes = {
	classes: PropTypes.object.isRequired,
};
function mapStateToProps({ response }) {
	return response;
}
export default withStyles(styles)(SimpleTable);
//export default connect(mapStateToProps, { reqDeleteRestro })(withStyles(styles)(SimpleTable));
