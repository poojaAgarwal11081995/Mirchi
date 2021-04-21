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
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
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
function OnePageReportTable(props) {
	console.log("props:::::::::::::::::::::", props);

	const { classes, headerData, headerValue } = props;
	const [page, setPage] = React.useState(0);
	const [data, setData] = React.useState(props.headerValue);
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

	useEffect(() => {});

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow key={"header_row"}>
						{Object.keys(headerData).map((key, index) => (
							<TableCell align={index == 0 ? "center" : "center"}>
								{headerData[key]}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{headerValue
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((keyValue, indexMain) => (
							<TableRow>
								{Object.keys(headerValue[indexMain]).map((key) => (
									<TableCell align={indexMain == 0 ? "center" : "center"}>
										{headerValue[indexMain][key]}
									</TableCell>
								))}
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
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</Paper>
	);
}

OnePageReportTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OnePageReportTable);
