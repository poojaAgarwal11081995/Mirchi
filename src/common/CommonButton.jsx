/** @format */

import React from "react";
import Button from "@material-ui/core/Button";
import Basecomponent from "./BaseComponent";
export default class CommonButton extends Basecomponent {
	render() {
		const {
			type,
			fullWidth,
			variant,
			color,
			className,
			onClick,
			label,
			style,
			size,
		} = this.props;

		return (
			<Button
				ref={this.props.ref}
				type={type}
				fullWidth={fullWidth}
				variant={variant}
				color={color}
				style={style}
				size={size}
				className={className}
				onClick={onClick}
				disabled={this.props.disabled}>
				{label}
			</Button>
		);
	}
}
