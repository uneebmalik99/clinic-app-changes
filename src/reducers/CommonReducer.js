import { CP_SET_FIELD_VALUE, COMMON_SET_USER_TYPE, COMMON_SET_IS_VIP, COMMON_SET_IS_GUEST, COMMON_SET_WALLET_ID, COMMON_SET_WALLET_BALANCE, COMMON_SET_CURRENCY, COMMON_SET_DIAL_CODE, ACTIVE_TAB_NUMBER, MAP_LAT_LUNG_ADDRESS } from "./types";

const INIT_STATE = {

    isCustomer: true,
    userType: '2',
    isVip: false,
    isGuest: false,
    customerWalletID: '',
    customerWalletBalance: 0,
    customerCurrencySymbol: '',
    selectedContactForMoneyTransfer: {},
    dialCode: '+1',
    active_tab_number: 1,
    maplatlongaddress: ''
}


// export default (state = INIT_STATE, action) => {

//     switch (action.type) {

//         case COMMON_SET_USER_TYPE:
//             return { ...state, isCustomer: action.payload === '2', userType: action.payload }

//         case COMMON_SET_IS_VIP:
//             return { ...state, isVip: action.payload.toString() === '1' }
//         case COMMON_SET_IS_GUEST:
//             return { ...state, isGuest: action.payload }

//         case COMMON_SET_WALLET_ID:
//             return { ...state, isGuest: action.payload }

//         case COMMON_SET_WALLET_BALANCE:
//             return { ...state, isGuest: action.payload }
//     }

//     return state

// }


export default (state = INIT_STATE, action) => {


    switch (action.type) {

        case COMMON_SET_CURRENCY:
            return { ...state, customerCurrencySymbol: action.payload }
        case COMMON_SET_DIAL_CODE:
            return { ...state, dialCode: action.payload }
        case CP_SET_FIELD_VALUE:
            return { ...state, [action.payload.key]: action.payload.value }
        case ACTIVE_TAB_NUMBER:
            return { ...state, active_tab_number: action.payload }
        case MAP_LAT_LUNG_ADDRESS:
            return { ...state, maplatlongaddress: action.payload }
    }

    return state
}