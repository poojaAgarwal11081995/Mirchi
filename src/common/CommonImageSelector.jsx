/** @format */

import React from "react";
import TextField from "@material-ui/core/TextField";
import Basecomponent from "./BaseComponent";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/RemoveRedEye";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export default class CommonImageSelector extends Basecomponent {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			required,
			id,
			autoComplete,
			label,
			fullWidth,
			type,
			value,
			onChange,
			variant,
			xs,
			style,
			error,
			clearPress,
			disabled,
			helperText,
			fieldStyle,
			maxLengthVal,
			classes,
			textField,
			forCheckBoxItem,
		} = this.props;
		let fileInputImage = undefined;
		return (
			<Grid
				item
				xs={xs}
				alignItems="center"
				container
				spacing={500}
				style={style}>
				<div
					xs={xs}
					style={{
						width: "100%",
						position: "relative",
						display: "inline-block",
					}}>
					<div
						onClick={() =>
							forCheckBoxItem == undefined && fileInputImage.click()
						}>
						<TextField
							required={required}
							id={id}
							label={label}
							fullWidth={fullWidth}
							type={type}
							// value={value != undefined && value != null && value != '' && value.length < 36 ? value : value.substring(0, 30) + '...'}
							value={
								value != undefined && value.length < 36
									? value
									: value.substring(0, 30) + "..."
							}
							variant={variant}
							className={textField}
							maxLength={maxLengthVal}
							autoCapitalize="words"
							inputProps={{
								autoCapitalize: "words",
							}}
						/>
					</div>
					{
						<input
							ref={(fileInput) => (fileInputImage = fileInput)}
							type="file"
							style={{ display: "none" }}
							accept=".png, .jpg, .jpeg"
							onChange={onChange}
						/>
					}

					<ListItemIcon
						style={{
							position: "absolute",
							right: 0,
							top: 15,
							width: 20,
							height: 20,
						}}
						onClick={clearPress}>
						<SearchIcon />
					</ListItemIcon>
				</div>
			</Grid>
		);
	}
}
