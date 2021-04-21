/** @format */

import React from "react";
import TextField from "@material-ui/core/TextField";
import Basecomponent from "./BaseComponent";
import Grid from "@material-ui/core/Grid";

export default class CommonGridTextField extends Basecomponent {
	render() {
		const {
			required,
			disabled,
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
			editable,
			helperText,
			fieldStyle,
			maxLengthVal,
		} = this.props;

		return (
			<Grid item xs={xs} alignItems="center" style={style}>
				<TextField
					disabled={disabled}
					required={required}
					id={id}
					label={label}
					fullWidth={fullWidth}
					autoComplete={autoComplete}
					type={type}
					value={value}
					onChange={onChange}
					variant={variant}
					helperText={helperText}
					error={error}
					autoCapitalize="words"
					maxLength="2"
					multiLine={false}
					inputProps={{
						maxLength: maxLengthVal,
						autoCapitalize: "words",
						style: { fontSize: 13 },
					}}
					onKeyPress={(ev) => {
						console.log(`Pressed keyCode ${ev.key}`);
						if (ev.key === "Enter") {
							this.props.onEnterKey();
							ev.preventDefault();
						}
					}}
				/>
			</Grid>
		);
	}
}
