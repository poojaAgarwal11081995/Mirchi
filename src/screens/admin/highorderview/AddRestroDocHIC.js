/** @format */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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
import Typography from "@material-ui/core/Typography";
import CommonMultipleSelectorImg from "../../../common/CommonMultipleSelectorImg";

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

function AddRestroDocHIC(props) {
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
		<Link
			className={classes.link}
			to={Constants.SCREEN_RESTAURANT_DETAIL}></Link>;
	};

	return (
		<Grid>
			<Typography component="h6" variant="h6" style={{ marginTop: 15 }}>
				{context.strings(StringKeys.Upload_Document)}
			</Typography>

			<CommonMultipleSelectorImg
				required={true}
				disabled={false}
				xs={12}
				style={{ marginTop: TEXTFIELD_MARGINTOP }}
				id="Kitchen_Image"
				fullWidth
				className={classes.textField}
				label={context.strings(StringKeys.Kitchen_Image)}
				value={context.state[Constants.KEY_KITCHEN_IMG_NAME].toString()}
				variant="outlined"
				onChange={context.kitchanImagePress}
				clearPress={() => {
					context.handleCloseClick(
						context.state[Constants.KEY_KITCHEN_IMG] != undefined
							? context.state[Constants.KEY_KITCHEN_IMG]
							: "",
					);
				}}
			/>

			<CommonImageSelector
				required={true}
				disabled={false}
				xs={12}
				style={{ marginTop: TEXTFIELD_MARGINTOP }}
				id="shop_lic_image"
				fullWidth
				className={classes.textField}
				label={context.strings(StringKeys.Shop_Licence_Image)}
				value={context.state[Constants.KEY_SHOP_LICENCE_IMG_NAME]}
				variant="outlined"
				onChange={context.ShopLICImagePress}
				clearPress={() => {
					context.handleCloseClick(
						context.state[Constants.KEY_SHOP_LICENCE_IMG] != undefined
							? context.state[Constants.KEY_SHOP_LICENCE_IMG]
							: "",
					);
				}}
			/>

			<CommonImageSelector
				required={true}
				disabled={false}
				xs={12}
				style={{ marginTop: TEXTFIELD_MARGINTOP }}
				id="fssai_image"
				fullWidth
				className={classes.textField}
				label={context.strings(StringKeys.FSSAI_Licence_Image)}
				value={context.state[Constants.KEY_FSSAI_LICENCE_IMG_NAME]}
				variant="outlined"
				onChange={context.FssaiImagePress}
				clearPress={() => {
					context.handleCloseClick(
						context.state[Constants.KEY_FSSAI_LICENCE_IMG] != undefined
							? context.state[Constants.KEY_FSSAI_LICENCE_IMG]
							: "",
					);
				}}
			/>

			<CommonImageSelector
				required={true}
				disabled={false}
				xs={12}
				style={{ marginTop: TEXTFIELD_MARGINTOP }}
				id="fssai_image"
				fullWidth
				className={classes.textField}
				label={context.strings(StringKeys.GSTN_OR_PAN_IMAGE)}
				value={context.state[Constants.KEY_GSTN_OR_PAN_IMG_NAME]}
				variant="outlined"
				onChange={context.GSTOrPANImagePress}
				clearPress={() => {
					context.handleCloseClick(
						context.state[Constants.KEY_GSTN_OR_PAN_IMG] != undefined
							? context.state[Constants.KEY_GSTN_OR_PAN_IMG]
							: "",
					);
				}}
			/>

			<CommonImageSelector
				required={true}
				disabled={false}
				xs={12}
				style={{ marginTop: TEXTFIELD_MARGINTOP }}
				id="fssai_image"
				fullWidth
				className={classes.textField}
				label={context.strings(StringKeys.Building_Front_Image)}
				value={context.state[Constants.KEY_BUILDING_FRONT_IMG_NAME]}
				variant="outlined"
				onChange={context.buildingImagePress}
				clearPress={() => {
					context.handleCloseClick(
						context.state[Constants.KEY_BUILDING_FRONT_IMG] != undefined
							? context.state[Constants.KEY_BUILDING_FRONT_IMG]
							: "",
					);
				}}
			/>

			<CommonImageSelector
				required={true}
				disabled={false}
				xs={12}
				style={{ marginTop: TEXTFIELD_MARGINTOP }}
				id="fssai_image"
				fullWidth
				className={classes.textField}
				label={context.strings(StringKeys.Dining_Packaging_Image)}
				value={context.state[Constants.KEY_DINING_PACKAGING_IMG_NAME]}
				variant="outlined"
				onChange={context.diningImagePress}
				clearPress={() => {
					context.handleCloseClick(
						context.state[Constants.KEY_DINING_PACKAGING_IMG] != undefined
							? context.state[Constants.KEY_DINING_PACKAGING_IMG]
							: "",
					);
				}}
			/>

			<CommonImageSelector
				required={true}
				disabled={false}
				xs={12}
				style={{ marginTop: TEXTFIELD_MARGINTOP }}
				id="fssai_image"
				fullWidth
				className={classes.textField}
				label={context.strings(StringKeys.Locality_Image)}
				value={context.state[Constants.KEY_LOCALITY_IMAGE_NAME]}
				variant="outlined"
				onChange={context.localityImagePress}
				clearPress={() => {
					context.handleCloseClick(
						context.state[Constants.KEY_LOCALITY_IMAGE] != undefined
							? context.state[Constants.KEY_LOCALITY_IMAGE]
							: "",
					);
				}}
			/>
		</Grid>
	);
}

AddRestroDocHIC.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddRestroDocHIC);
