
import React from 'react';
import Button from '@material-ui/core/Button';
import Basecomponent from './BaseComponent'
import * as Colors from '../res/Colors';

export default class CommonLabel extends Basecomponent {

    render() {
        const { type,
            fullWidth,
            variant,
            color,
            className,
            onClick,
            label,
            style,
            size

        } = this.props;

        return (
            <label variant="outlined" for="test"
                style={divStyle} onClick={() => onClick} >Test</label>
        );
    }

}
const divStyle = {
    color: Colors.colorGreen,
    fontSize: '20px',
    borderWidth: 2,
    borderColor: Colors.colorGreen,
    fontFamily: 'Times New Roman',
    paddingLeft: 0,
    paddingRight: 0,
    padding: 15,
    variant: 'outlined',
    textShadowColor: Colors.colorGreen,
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 50,
    border: '1px solid green',
    borderRightColor: 'green',
    borderRadius: 20,
    textRadius: 52,
    borderRadius: 52,
    borderRadiusInputTopLeft: 52,
    borderRadiusInputTopRight: 52,
    borderRadiusInputBottomLeft: 0,
    borderRadiusInputBottomRight: 0,
    borderLeftWidth: 100,
    borderTopWidth: 100,
};