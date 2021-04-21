
import React from 'react';
import Button from '@material-ui/core/Button';
import Basecomponent from './BaseComponent'
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';



export default class CommonLabelBtn extends Basecomponent {

    render() {
        const { type,
            fullWidth,
            variant,
            color,
            className,
            onClick,
            label,
            style,
            size,
            xs,
            iconLeft,
            header,
            id,
            classes,
            classType,
            value
        } = this.props;

        return (
            <Grid item xs={xs} alignItems="center"
                style={style}

            >
                {/* <Button 
                    ref={this.props.ref}
                    type={type}
                    fullWidth={fullWidth}
                    variant={variant}
                    color={color}
                    style={[style]}
                    textAlign={'left'}
                    size={size}
                    className={className}
                    onClick={onClick}
                    disabled={this.props.disabled}
                >
                    {iconLeft}
                    {label}
                </Button> */}

                <button
                    type={type}
                    class={classType}
                    onClick={onClick}
                    style={style}
                    id={id}
                    fullWidth
                    header={header}
                    className={className}
                    value={value}
                    variant={variant}
                >
                    {iconLeft}{label}

                </button>

            </Grid >
        );
    }
}