
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Basecomponent from './BaseComponent'
import Grid from '@material-ui/core/Grid';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export default class CommonMultipleSelectorImg extends Basecomponent {

    constructor(props) {
        super(props)
    }

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
            disabled,
            helperText, fieldStyle,
            maxLengthVal,
            classes,
            textField
        } = this.props;
        let fileInputImage = undefined;
        {
            console.log('path ', value);

        }
        return (
            <Grid item xs={xs} alignItems="center"
                container spacing={500}
                style={style}
            >
                <div xs={xs} style={{
                    width: '100%', position: 'relative',
                    display: 'inline-block',
                }} >
                    <div onClick={() => fileInputImage.click()} >
                        <TextField

                            required={required}
                            id={id}
                            label={label}
                            fullWidth={fullWidth}
                            type={type}
                            value={value != undefined && value != '' ? (!Array.isArray(value) ?
                                value.length < 36 ? value : value.substring(0, 30) + '...' :
                                (value[0] != undefined && value[0].length < 36 ?
                                    value[0] : value[0].substring(0, 30) + '...')) : ''
                            }
                            variant={variant}
                            className={textField}
                            autoCapitalize='words'
                            inputProps={{
                                autoCapitalize: 'words'
                            }}
                        />
                    </div>
                    <input
                        ref={fileInput => fileInputImage = fileInput}
                        type="file"
                        multiple="multiple"
                        style={{ display: 'none', }}
                        accept=".png, .jpg, .jpeg"
                        onChange={onChange}
                    />

                    <ListItemIcon style={{ position: 'absolute', right: 0, top: 15, width: 20, height: 20 }}
                        onClick={clearPress}
                    >
                        <RemoveRedEye
                        />
                    </ListItemIcon>
                </div>

            </Grid>
        );
    }
}