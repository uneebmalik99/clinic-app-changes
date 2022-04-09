import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {
  BASE_URL,
  API_ADD_MONEY,
  API_WALLET_TRANSACTIONS,
  API_INTERNATIONAL_TRANSFER,
  API_PRODUCT_CHARGES,
  API_EXCHANGE_RATE,
  API_ELECTRICITY_BILL_PAYMENT,
  API_MOBILE_BILL_PAYMENT,
  API_MOBILE_RECHARGE_PAYMENT,
  API_VENDOR_EXTRA_FIELDS_LIST,
  API_VENDOR_LIST,
  API_TRANSFER_WALLET_AGENT,
  API_TRANSFER_BANK_AGENT,
  API_CASH_OUT_AGENT,
  API_CASH_IN_AGENT,
  API_PAY_REQUEST_MONEY,
  API_REQUEST_MONEY,
  API_TRANSFER_MONEY,
  API_WITHDRAW_MONEY,
  API_GET_WALLET_BAlANCE,
  API_SCAN_QR,
  API_PAY_MERCHANT,
  API_WALLET_TRANSACTION_DETAILS,
  BASE_URL_IOS,
} from './ApiConstants';
import {
  getToken,
  setItem,
  getItem,
  clearSession,
  getLanugage,
  getLanugageName,
} from '../data/PrefUtils';
import {AlertDialog} from '../components/common';
import {store} from '../App';
import Navigator from '../navigation/Navigator';
import {IS_LOGGED_IN, CURRENT_LOCATION} from '../data/PrefKeys';
import {HOME_LOGOUT} from '../reducers/types';
import Axios from 'axios';
import {Utils} from '../utils';
import 'intl';
import 'intl/locale-data/jsonp/en';
var QueryString = require('querystring');
import {setactivetabnumber} from '../actions/CommonActions';

import {Platform} from 'react-native';
export const METHOD = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  MULTIPART: 'multipart',
  DELETE: 'delete',
  PATCH: 'patch',
};

export default async (
  endpoint,
  params,
  onSuccess,
  onFailure,
  method = METHOD.POST,
  isLogin = true,
) => {
  const connectionInfo = await NetInfo.getConnectionInfo();

  if (connectionInfo.type === 'none')
    onFailure('Please check your internet connection.');
  else {
    // console.log('---------------------------------------------2');
    let token = await getToken();

    let request = {};
    const headers = {
      'Content-Type': 'application/json',
      Authorization: {token},
    };
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const config = {
      baseURL: BASE_URL,
      headers: {
        Accept: 'application/vnd.yourapi.v1.full+json',
        authorization: token,
        timezone: timeZone,
        'User-Agent':
          'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:38.0) Gecko/20100101 Firefox/38.0',
      },
      timeout: 60000,
    };

    /*        if(!isLogin){
            config = {
                baseURL:  (Platform.OS=='ios'?BASE_URL_IOS:BASE_URL)  ,
                headers: {"Accept": "application/vnd.yourapi.v1.full+json",
                'authorization': token ,
                "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:38.0) Gecko/20100101 Firefox/38.0"},
                timeout: 60000,
            }
        }*/

    let languageCode = await getLanugageName();
    let api = endpoint + languageCode;

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
    // console.log('------------------ Params-------------------');
    // console.log(params);
    // console.log(token);
    switch (method) {
      case METHOD.POST: {
        // console.log('------------------ Params-------------------');
        var param = QueryString.encode(params);
        // Returns 'foo=bar&baz=qux&baz=quux&corge='
        request = axios.post(api, param, config);
        break;
      }
      case METHOD.MULTIPART: {
        const header = {
          baseURL: BASE_URL,
          headers: {
            Accept: 'application/vnd.yourapi.v1.full+json',
            authorization: token,
            'Content-Type': 'multipart/form-data',

            'User-Agent':
              'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:38.0) Gecko/20100101 Firefox/38.0',
          },
          timeout: 60000,
        };

        request = axios.post(api, params, header);
        break;
      }
      case METHOD.GET:
        request = axios.get(api, config);
        break;
      case METHOD.DELETE:
        request = axios.delete(api, config);
        break;
      case METHOD.PUT:
        request = axios.put(api, params, config);
        break;
      case METHOD.PATCH:
        request = axios.patch(api, params, config);
        break;
    }
    request
      .then(async (response) => {
        // console.log('------------------ Response-------------------');
        // console.log(BASE_URL + endpoint + '\n Response', response);
        if (response) {
          if (response.status == 200) {
            // console.log('------------------ STATUS-------------------');
            // console.error(response.data.status);
            if (response.data.status.toString() == 'true') {
              try {
                // console.log('------------------ SUCCESSS-------------------');
                // onSuccess(response.data.data ? response.data.data : response.data)
                onSuccess(response);
              } catch (err) {
                // console.log('Error', err);
              }
            } else {
              // console.log('------------------ FAIL`-------------------');

              if (response.data.message == 'No User Found') {
                let lang = await getLanugage();
                await clearSession();
                store.dispatch(setactivetabnumber(1));
                Navigator.resetNavigation('Home');
                setLanguage(lang);
                onFailure(
                  'This user is currently logged on to another device.',
                );
              } else {
                onFailure(response.data.message);
              }
            }
          } else if (response.status == 401) {
            AlertDialog.show({
              title: 'Session Expired',
              message: 'Session is expired. Need to re-login',
              positiveButton: {
                title: 'Relogin',
                onPress: async () => {
                  AlertDialog.hide();
                  await setItem(IS_LOGGED_IN, '0');
                  store.dispatch({
                    type: HOME_LOGOUT,
                  });
                  Navigator.resetNavigation('splash');
                },
              },
            });
            onFailure('Session expired');
          } else if (response.status == 0) {
            onFailure(
              error && typeof error === 'string'
                ? error
                : 'Please check internet connection!',
            );
          } else {
            onFailure(
              error && typeof error === 'string'
                ? error
                : 'Something went wrong',
            );
          }
        } else {
          onFailure('Something went wrong');
        }
      })
      .catch(async (error) => {
        // console.log('Error', error);

        if (error && error.response && error.response.status == 401) {
          AlertDialog.show({
            title: 'Session Expired',
            message: 'Session is expired. Need to re-login',
            positiveButton: {
              title: 'Relogin',
              onPress: async () => {
                AlertDialog.hide();
                await setItem(IS_LOGGED_IN, '0');

                store.dispatch({
                  type: HOME_LOGOUT,
                });
                Navigator.resetNavigation('splash');
              },
            },
          });
          onFailure('Session expired');
        } else onFailure('Something went wrong');
      });
  }
};
