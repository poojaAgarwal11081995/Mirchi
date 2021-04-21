import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, ScatterChart,
    Scatter,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import Title from './TitleChart';
import * as Constants from '../../utils/Constants'
import * as Utility from '../../utils/Utility'


export default function ChartGrocery(props) {

    const [dataItems, setData] = React.useState(undefined);

    const handleData = (obj) => {
        setData(obj)
    }

    {
        if (props[Constants.KEY_DATA] != undefined && props[Constants.KEY_DATA][Constants.KEY_ADMIN_TODAY_EARNING_GRAPH] != undefined &&
            props[Constants.KEY_DATA][Constants.KEY_ADMIN_TODAY_EARNING_GRAPH].length > 0) {
            let arrayObj = props[Constants.KEY_DATA][Constants.KEY_ADMIN_TODAY_EARNING_GRAPH];
            let dataModel = [];

            for (const key in arrayObj) {
                if (arrayObj.hasOwnProperty(key)) {
                    const element = arrayObj[key];
                    console.log('time::::', Utility.getHoursOnly(element[Constants.KEY_CREATED]));
                    dataModel.push({ x: Utility.getHoursOnly(element[Constants.KEY_CREATED]), y: element[Constants.KEY_ORDER_AMOUNT] });

                }
                dataModel.push({ x: 24, y: undefined });
                if (dataItems == undefined) {
                    console.log('time::::22', JSON.stringify(dataModel));
                    handleData(dataModel);
                }

            }
        }
    }
        return (
            <React.Fragment>
                <Title>Today</Title>
                <ResponsiveContainer>
                    <ScatterChart
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                        <CartesianGrid />
                        <XAxis type="number" dataKey={"x"} name="Time" unit="" />
                        <YAxis type="number" dataKey={"y"} name="Price" unit="" >
                            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
                                {"Sales (\u20B9)"}
                            </Label>
                        </YAxis>
                        <ZAxis range={[100]} />
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                        <Legend />
                        <Scatter name="On Time" data={dataItems} fill="#8884d8" line shape="line" />
                    </ScatterChart>

                </ResponsiveContainer>
            </React.Fragment>
        );

    }
