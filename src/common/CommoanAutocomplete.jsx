/** @format */

import React from "react";
import Button from "@material-ui/core/Button";
import Basecomponent from "./BaseComponent";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import * as Colors from "../../src/res/Colors";

export default class CommoanAutocomplete extends Basecomponent {
	render() {
		const {
			type,
			required,
			fullWidth,
			variant,
			color,
			className,
			onClick,
			label,
			size,
		} = this.props;

		return (
			<Select
				required={required}
				isSearchable={true}
				inputId="react-select-single"
				placeholder={this.props.placeholder}
				styles={selectStyles}
				value={this.props.value}
				options={this.props.options}
				components={this.props.components}
				onChange={this.props.onChange}
				isClearable
				theme={(theme) => ({
					...theme,
					borderRadius: 5,
					colors: {
						...theme.colors,
						text: Colors.txt_color,
						primary25: Colors.colorPrimaryTrans,
						primary: Colors.colorPrimary,
					},
				})}>
				{/* <option value='1' disabled>Select</option>
      {
        this.props.options.onChange.map((i, j) => {
          return <option key={i} value={i}>{i}</option>
        })
      } */}
			</Select>
		);
	}
}

// TextFieldProps = {{
//   label: this.props.label,
//     InputLabelProps: {
//     htmlFor: 'react-select-single',
//       shrink: true,
//           },
//   placeholder: this.props.placeholder,
//         }}

// closeMenuOnSelect = { true}
// onMenuClose = { false}

const dot = (color = Colors.colorPrimary) => ({
	alignItems: "center",
	display: "flex",
	":before": {
		backgroundColor: color,
		borderRadius: 10,
		content: '" "',
		display: "red",
		marginRight: 8,
		height: 10,
		width: 10,
	},
});

const selectStyles = {
	menu: (base) => ({
		...base,
		zIndex: 100,
	}),
	control: (base, state) => ({
		...base,
		height: "55px",
		"min-height": "55px",
	}),
	// placeholder: styles => ({ ...styles, ...dot() }),
};

const customStyles = {
	control: (base, state) => ({
		...base,
		height: "34px",
		"min-height": "34px",
	}),
};
