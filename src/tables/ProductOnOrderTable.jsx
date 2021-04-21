

import React, { useEffect } from 'react';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as Constants from '../utils/Constants';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as ResourcesConstants from '../../src/res/ResourcesConstants';





const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 200,
    }, gridList: {
        width: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
};



function ProductOnOrderTable(props) {

    const { classes, productList, style } = props;

    return (
        <div>
            {
                productList != undefined ? (productList.map(n => (
                    <Card style={style}>
                        <CardContent>
                            <CardActions disableSpacing style={{
                                flexDirection: 'row', width: '100%',
                            }}>
                                <CardActions style={{
                                    flexDirection: 'row', width: '100%',
                                    alignItems: 'flex-start'
                                }}>

                                    <img src={ResourcesConstants.ic_veg_icon} width="15" height="15"
                                        style={{ marginTop: 3 }} />
                                    <CardActions style={{
                                        flexDirection: 'column', width: '100%',
                                        alignItems: 'flex-start', padding: '0',

                                    }}>
                                        <Typography color="textSecondary" style={{
                                            justifyContent: 'flex-start', alignItems: 'flex-start'
                                        }}>
                                            {n[Constants.KEY_PRODUCT_DETAIL][Constants.KEY_NAME]}
                                        </Typography>
                                        {/* <Typography color="textSecondary">
                                            Starters
                                </Typography> */}
                                        <Typography color="textSecondary">
                                            {Constants.RUPEES_SIGN}  {(n[Constants.KEY_PRODUCT_DETAIL][Constants.KEY_FINAL_PRICE].toFixed(2))}
                                        </Typography>
                                    </CardActions>
                                </CardActions>

                                <CardActions disableSpacing style={{
                                    flexDirection: 'column', justifyContent: 'flex-end', width: '100%',
                                    alignItems: 'flex-end'
                                }}>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {n[Constants.KEY_QTY]} Items
                          </Typography>
                                </CardActions>

                            </CardActions>
                        </CardContent>
                    </Card>
                ))) : null
            }
        </div>
    );
}

ProductOnOrderTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductOnOrderTable);