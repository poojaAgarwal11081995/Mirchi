import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chart from './Chart';
import Deposits from './ChartDeposits';
import ChartOrders from './ChartOrders';
import ChartOrdersGrocery from './ChartOrdersGrocery';
import *as ApiUrls from '../../actions/ApiUrls';
import *as Constants from '../../utils/Constants';
import *as Utility from '../../utils/Utility';
import ChartRequestedDrivers from './ChartRequestedDrivers';
import ChartRequestedRestro from './ChartRequestedRestro';
import ChartRequestedGrocery from './ChartRequestedGrocery';
import ChartRequestedGroceryDrivers from './ChartRequestedGroceryDrivers';
import ChartGrocery from './ChartGrocery';
import ChartDepositsGrocery from './ChartDepositsGrocery';

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://material-ui.com/">
//                 Your Website
//       </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    fixedHeightRequested: {
        height: 160,
    },
}));


var METHOD_TYPE_POST = 'post';
var METHOD_TYPE_GET = 'get';

export default function DashboardRecentAdmin(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [data, setData] = React.useState(undefined);
    const [dataGrocery, setDataGrocery] = React.useState(undefined);
    const resp = { key: undefined }
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    

    const handleData = (obj) => {
        if (data == undefined) {
            setData(obj)
        
        }else if (obj != undefined && (data[Constants.KEY_REQ_RETSRO_COUNT] != obj[Constants.KEY_REQ_RETSRO_COUNT])) {
            setData(obj)
        }
    };

    const handleDataGrocery = async (obj) => {
      
        if (dataGrocery == undefined) {
           
            setDataGrocery(obj)
        }else if (obj != undefined && (dataGrocery[Constants.KEY_REQ_GROCERY_COUNT] != obj[Constants.KEY_REQ_GROCERY_COUNT])) {
            setDataGrocery(obj)
        }
    };
    

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaperRequest = clsx(classes.paper, classes.fixedHeightRequested);

    {

        console.log('requestData11: ', props)

        var dataReq = {
            [Constants.KEY_OFFSET]: 0
        }
        var reqObj = {
            method: METHOD_TYPE_POST
        };
        const formData = Utility.getFormDataFromObject(dataReq);
        reqObj[Constants.KEY_BODY] = formData;
        console.log('requestDataRestro: ' + JSON.stringify(reqObj) + ' API Post: ' + ApiUrls.API_REQ_RESTRO_COUNT);
        fetch(ApiUrls.API_REQ_RESTRO_COUNT, reqObj).then(response => response.text())
            .then(res => {
                var response = JSON.parse(res);
                if (response) {
                    if (response.hasOwnProperty(Constants.KEY_ERROR) && response.hasOwnProperty(Constants.KEY_MESSAGE) && 
                    response[Constants.KEY_ERROR] === true) {
                    } else {
                        if (response != undefined && response[Constants.KEY_DATA] != undefined) {
                            console.log('response :  ' + JSON.stringify(response));
                            handleData(response[Constants.KEY_DATA]);
                        }

                    }

                }

            })
    }

    {

        console.log('requestDataGrocery: ', props)

        var dataReq = {
            [Constants.KEY_OFFSET]: 0
        }
        var reqObj = {
            method: METHOD_TYPE_POST
        };
        const formData = Utility.getFormDataFromObjectGrocery(dataReq);
        reqObj[Constants.KEY_BODY] = formData;
        console.log('requestDataGrocery===========>>>>.: ' + JSON.stringify(reqObj) + ' API Post: ' + ApiUrls.API_REQ_GROCERY_COUNT);
        fetch(ApiUrls.API_REQ_GROCERY_COUNT, reqObj).then(response => response.text())
            .then(res => {
                var response = JSON.parse(res);
                if (response) {
                    console.log('res',response);
                    
                    if (response.hasOwnProperty(Constants.KEY_ERROR) && response.hasOwnProperty(Constants.KEY_MESSAGE) && response[Constants.KEY_ERROR] === true) {

                    } else {
                        if (response != undefined && response[Constants.KEY_DATA] != undefined) {
                            console.log('response >>>>>>>>>>>>>>>>>>>>>>>>>>:  ' + JSON.stringify(response));
                            handleDataGrocery(response[Constants.KEY_DATA]);
                        }

                    }

                }  

            })
    }


    return (
        <div className={classes.root}>
            <CssBaseline />
            <main >
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={fixedHeightPaperRequest}>

                                <ChartRequestedRestro
                                    data={data} />
                            </Paper>
                        </Grid>
                        
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={fixedHeightPaperRequest}>
                                <ChartRequestedDrivers
                                    data={data}
                                />
                            </Paper>
                        </Grid>
                        
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <Chart
                                    data={data} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Deposits
                                    data={data}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <ChartOrders
                                    data={data}
                                    props={props}
                                />
                            </Paper>
                        </Grid>

                        {/*grocery part*/}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={fixedHeightPaperRequest}>
                                <ChartRequestedGrocery
                                    data={dataGrocery} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={fixedHeightPaperRequest}>
                                <ChartRequestedGroceryDrivers
                                    data={dataGrocery}
                                />
                            </Paper>
                        </Grid>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <ChartGrocery
                                    data={dataGrocery} />
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <ChartDepositsGrocery
                                    data={dataGrocery}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <ChartOrdersGrocery
                                    data={dataGrocery}
                                    props={props}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                {/* <Copyright /> */}
            </main>
        </div>
    );
}
