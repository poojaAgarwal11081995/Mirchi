
import React from 'react';
import Button from '@material-ui/core/Button';
import Basecomponent from './BaseComponent'
export default class CommonSwitch extends Basecomponent {

    render() {
        const { type,
            fullWidth,
            variant,
            color,
            className,
            onClick,
            label,
            size

        } = this.props;

        return (<Button
            ref={this.props.ref}
            type={type}
            fullWidth={fullWidth}
            variant={variant}
            color={color}
            size={size}
            className={className}
            onClick={onClick}
            disabled={this.props.disabled}
        >
            {label}
        </Button>);
    }
}