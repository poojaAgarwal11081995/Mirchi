import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import Basecomponent from './BaseComponent'


import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';



// const styles = theme => ({
//     root: {
//         padding: 20,
//     },
//     dialogPaper: {
//         minHeight: '30vh',
//         minWidth: '30%',
//     }

// });

//class CategoryDialog extends Basecomponent {
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CategoryDialog(props) {

    //   render() {
    const {
        title,
        content,
        firstBtnName,
        secondBtnName,
        firstBtnClick,
        secondBtnClick,
        //classes,
        list,

    } = props;
    const classes = useStyles();
    const [checked, setChecked] = React.useState(props.valueId);
   
    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);   
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        console.log("selected update", newChecked);
        
    };


    return (
        <div>
            <Dialog
                open={props.showYesNo}
                onClose={secondBtnClick}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>


                    <List dense className={classes.root}>
                        {list != undefined && list.map(value => {
                            const labelId = `checkbox-list-secondary-label-${value.id}`;
                            return (
                                <ListItem key={value.id} button>

                                    <ListItemText id={labelId} primary={value.label} />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            edge="end"
                                            onChange={() => handleToggle(value._id)}
                                            checked={checked.indexOf(value._id) !== -1}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>

                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={firstBtnClick} color="primary">
                        {firstBtnName}
                    </Button> */}
                    <Button onClick={() => secondBtnClick(checked)} color="primary" autoFocus>
                        {secondBtnName}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
    //}
}



// CategoryDialog.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

//export default (withStyles(styles)(CategoryDialog));

