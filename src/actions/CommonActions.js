import { CP_SET_FIELD_VALUE, COMMON_SET_USER_TYPE, COMMON_SET_IS_VIP, COMMON_SET_IS_GUEST, COMMON_SET_CURRENCY, COMMON_SET_DIAL_CODE, ACTIVE_TAB_NUMBER, MAP_LAT_LUNG_ADDRESS } from "../reducers/types";
import { setItem } from "../data/PrefUtils";
import { CURRENCY, DIAL_CODE } from "../data/PrefKeys";
import { store } from "../App";

export const setUserType = (userType) => {

    return {
        type: COMMON_SET_USER_TYPE,
        payload: userType
    }
}

export const setIsVip = (isVip) => {

    return {
        type: COMMON_SET_IS_VIP,
        payload: isVip
    }
}

export const setGuestUser = (isGuest) => {

    return {
        type: COMMON_SET_IS_GUEST,
        payload: isGuest
    }
}

export const setCurrency = (currency) => {
    setItem(CURRENCY, currency.toString())

    return {
        type: COMMON_SET_CURRENCY,
        payload: currency
    }
}
export const setDialCode = (dialCode) => {

    setItem(DIAL_CODE, dialCode.toString())
    return {
        type: COMMON_SET_DIAL_CODE,
        payload: dialCode
    }
}
export const setFieldValue = (key, value) => {
    console.log(key + "," + value);
    return {

        type: CP_SET_FIELD_VALUE,
        payload: { key, value }
    }
}
export const setactivetabnumber = (value) => {
    return {
        type: ACTIVE_TAB_NUMBER,
        payload: value
    }
}
export const setMapLatLungAddress = (value) => {
    store.dispatch({
        type: MAP_LAT_LUNG_ADDRESS,
        payload: value
    })
}