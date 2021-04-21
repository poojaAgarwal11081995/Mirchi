import * as ApiUrls from '../actions/ApiUrls'
import * as Constants from '../utils/Constants'
import * as CustomStorage from '../utils/CustomStorage'

var METHOD_TYPE_POST = 'post';
var METHOD_TYPE_GET = 'get';

export const callUpdateStatus = (data, dispatch, apiType, context) => {

    let apiUrl = ApiUrls.API_RESTRO_ONLINE_STATUS_CHANGE;
    const userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);

    var reqObj = {
        method: METHOD_TYPE_POST
    };
    if (userData !== undefined && userData !== null) {
        reqObj[Constants.KEY_HEADERS] = {
            'Authorization': 'Bearer ' + userData[Constants.KEY_TOKEN],
        }
    }
    if (data !== undefined && data !== null) {
        console.log('requestData: ' + JSON.stringify(data) + ' API Post: ' + apiUrl);
        const formData = getFormDataFromObject(data);
        reqObj[Constants.KEY_BODY] = formData;
    }

    fetch(apiUrl, reqObj).then(response => response.text())
        .then(res => isValidResponse(res, apiType, context)).catch(error => {
            // console.log('response=', JSON.stringify(res));
            if (context !== undefined) {
                context
            }
            else {
            }
            setTimeout(() => {
                alert(error);
            }, 200)
        })
}

export const callUpdateStatusGrocery = (data, dispatch, apiType, context) => {

    let apiUrl = ApiUrls.API_GROCERY_ONLINE_STATUS_CHANGE;
    const userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);

    var reqObj = {
        method: METHOD_TYPE_POST
    };
    if (userData !== undefined && userData !== null) {
        reqObj[Constants.KEY_HEADERS] = {
            'Authorization': 'Bearer ' + userData[Constants.KEY_TOKEN],
        }
    }
    if (data !== undefined && data !== null) {
        console.log('requestData: ' + JSON.stringify(data) + ' API Post: ' + apiUrl);
        const formData = getFormDataFromObject(data);
        reqObj[Constants.KEY_BODY] = formData;
    }

    fetch(apiUrl, reqObj).then(response => response.text())
        .then(res => isValidResponse(res, apiType, context)).catch(error => {
            // console.log('response=', JSON.stringify(res));
            if (context !== undefined) {
                context
            }
            else {
            }
            setTimeout(() => {
                alert(error);
            }, 200)
        })
}


export const isValidResponse = (responseTmp, apiType, context) => {
    console.log('apiType ' + apiType + ' response : ', responseTmp);
    var isValid = true;
    var msg = '';
    var response = JSON.parse(responseTmp);
    if (response) {
        if (response.hasOwnProperty(Constants.KEY_ERROR) && response.hasOwnProperty(Constants.KEY_MESSAGE) && response[Constants.KEY_ERROR] === true) {
            if (response[Constants.KEY_MESSAGE] !== null && response[Constants.KEY_MESSAGE] !== '')
                msg = response[Constants.KEY_MESSAGE];
        }
    }
    if (msg !== '') {
        isValid = false;
        if (context !== undefined && context.handleResponse !== undefined) {
            context.handleResponse({ [Constants.KEY_SHOW_PROGRESS]: false, type: apiType })
        }
        else {
            //  dispatch({ type: 'reload', payload: { [Constants.KEY_SHOW_PROGRESS]: false, type: apiType } });
        }
        setTimeout(() => {
            alert(msg);
        }, 200)
    }
    else {
        if (context !== undefined && context.handleResponse !== undefined) {
            context.handleResponse({ [Constants.KEY_RESPONSE]: response, type: apiType })
        }
        else {
            //dispatch({ payload: { [Constants.KEY_RESPONSE]: response, type: apiType } });
        }
    }
    return isValid;
}

export const getFormDataFromObject = (data) => {
    const formData = new FormData();
    for (var key in data) {
        if (typeof data[key] === 'object') {
            var dataValue = data[key];
            if (key === Constants.KEY_IMAGES_ARRAY || key == Constants.KEY_KITCHEN_IMG
                || key == Constants.KEY_BUILDING_FRONT_IMG
                || key == Constants.KEY_DINING_PACKAGING_IMG
                || key == Constants.KEY_LOCALITY_IMAGE) {
                for (var itemIndex in data[key]) {
                    console.log(' Key name value1 :- ', data[key][itemIndex])
                    if (data[key][itemIndex] != undefined && data[key][itemIndex][Constants.KEY_NAME] != undefined) {
                        var keyName = key + itemIndex + Constants.KEY_ARRAY_CLOSE;
                        console.log('key name :- ', keyName, ' Key name value :- ', data[key][itemIndex])
                        formData.append(key, data[key][itemIndex]);
                    }

                }
            }
            else if (key == Constants.KEY_DOCUMENTS_ARRAY) {
                for (var itemIndex in data[key]) {
                    var keyName = Constants.KEY_DOCUMENTS_ARRAY + itemIndex + Constants.KEY_ARRAY_CLOSE;
                    formData.append(keyName, data[key][itemIndex]);
                }
            }
            else if (key == Constants.KEY_IMAGE || key == Constants.KEY_AADHAR_IMAGE
                || key == Constants.KEY_PAN_IMAGE || key == Constants.KEY_LICENSE_IMAGE
                || key == Constants.VPC_IMAGE || key == Constants.RC_IMAGE
                || key == Constants.KEY_SHOP_LICENCE_IMG
                || key == Constants.KEY_FSSAI_LICENCE_IMG
                || key == Constants.KEY_GSTN_OR_PAN_IMG





            ) {
                if (dataValue != undefined && dataValue != null) {
                    formData.append(key, dataValue);
                }
            }
            else {
                if (dataValue !== null && dataValue.uri !== undefined && dataValue.uri !== null) {
                }
                else {
                    if (dataValue != null) {
                        dataValue = ((JSON.stringify(dataValue)));
                        dataValue = dataValue.replace(/\\/g, '');
                    }
                }
                if (dataValue != undefined && dataValue != null) {
                    formData.append(key, dataValue);
                }
            }
        }
        else {
            if (data[key] != undefined && data[key] != null) {
                formData.append(key, data[key]);
            }
        }
    }
    return formData;
}
