import axios from 'axios'
import NetInfo from '@react-native-community/netinfo'
import { BASE_URL, API_ADD_MONEY, API_WALLET_TRANSACTIONS, API_INTERNATIONAL_TRANSFER, API_PRODUCT_CHARGES, API_EXCHANGE_RATE, API_ELECTRICITY_BILL_PAYMENT, API_MOBILE_BILL_PAYMENT, API_MOBILE_RECHARGE_PAYMENT, API_VENDOR_EXTRA_FIELDS_LIST, API_VENDOR_LIST, API_TRANSFER_WALLET_AGENT, API_TRANSFER_BANK_AGENT, API_CASH_OUT_AGENT, API_CASH_IN_AGENT, API_PAY_REQUEST_MONEY, API_REQUEST_MONEY, API_TRANSFER_MONEY, API_WITHDRAW_MONEY, API_GET_WALLET_BAlANCE, API_SCAN_QR, API_PAY_MERCHANT, API_WALLET_TRANSACTION_DETAILS, BASE_URL_IOS, BASE_URL_TWILIO } from './ApiConstants';
import { getToken, setItem, getItem, clearSession, getLanugage, getLanugageName } from '../data/PrefUtils';
import { AlertDialog } from '../components/common';
import { store } from '../App'
import Navigator from '../navigation/Navigator';
import { IS_LOGGED_IN, CURRENT_LOCATION } from '../data/PrefKeys';
import { HOME_LOGOUT } from '../reducers/types';
import Axios from 'axios';
import { Utils } from '../utils';
var QueryString = require('querystring');
import { setactivetabnumber } from '../actions/CommonActions';

import { Platform } from 'react-native'
export const METHOD = {

    POST: "post",

}

export default async ( params, onSuccess, onFailure, method = METHOD.POST,  ) => {

    const connectionInfo = await NetInfo.getConnectionInfo()

    if (connectionInfo.type === 'none')
        onFailure('Please check your internet connection.')
    else {
        console.log('---------------------------------------------2')

        let request = {}
     
        const config = {
            baseURL:  BASE_URL_TWILIO  ,
            timeout: 60000, 
        }

        var param = QueryString.encode(params);
                // Returns 'foo=bar&baz=qux&baz=quux&corge='
                request = axios.post("videocall", param, config)
              
        request.then(async (response) => {
            console.log('------------------ SUUCUCCCCE-------------------')
            if (response) {
                if (response.status == 200) {
                    console.log('------------------ STATUS-------------------')
                    onSuccess(response.data.token);
                   
                } 
            } else {

                onFailure('Something went wrong')
            }
        }).catch(async (error) => {

            console.log('------------------ FAILLLLL-------------------')

            console.log('FAILEDDD', error);

          
        })
    }

}

