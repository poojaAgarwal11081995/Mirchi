
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Basecomponent from './BaseComponent'
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Clear';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export default class CommonInputTxtLocation extends Basecomponent {

    render() {
        const { required,
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
            helperText, fieldStyle,
            maxLengthVal
        } = this.props;

        return (
            <Grid item xs={xs} alignItems="center"
                container spacing={500}
            >
                <div xs={xs} style={{ width: '100%', position: 'relative', display: 'inline-block' }}>


                    <TextField
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
                        autoCapitalize='words'
                        inputProps={{
                            maxLength: maxLengthVal,
                            autoCapitalize: 'words'
                        }}
                    />

                    <ListItemIcon style={{ position: 'absolute', right: 0, top: 15, width: 20, height: 20 }}
                        onClick={clearPress}
                    >
                        <SearchIcon
                        />
                    </ListItemIcon>
                </div>

            </Grid>
        );
    }
}