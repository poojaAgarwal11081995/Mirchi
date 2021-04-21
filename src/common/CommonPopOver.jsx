
import React from 'react';
import Button from '@material-ui/core/Button';
import Basecomponent from './BaseComponent'
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';



export default class CommonPopOver extends Basecomponent {

    render() {
        const {
            open,
            anchorEl,
            handleClose,
            id,
            classes
        } = this.props;
        console.log('classes==', JSON.stringify(this.props.classes))
        return (

            <div>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Typography className={classes.typography}>The content of the Popover.</Typography>
                </Popover>
            </div>);
    }
}