
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Basecomponent from './BaseComponent'
export default class CommonTextField extends Basecomponent {

    render() {
        const { required,
            id,
            autoComplete,
            label,
            fullWidth,
            className,
            type,
            value,
            onChange,
            margin,
            variant,
            autoFocus
          
        } = this.props;

        return (<TextField
            required={required}
            id={id}

            label={label}
            fullWidth={fullWidth}
            autoComplete={autoComplete}
            className={className}
            type={type}
            value={value}
            margin={margin}
            onChange={onChange}
            variant={variant}
            autoFocus={autoFocus}
          
            

        />);
    }
}