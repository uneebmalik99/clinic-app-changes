import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_TOKEN, USER, IS_LOGGED_IN, UNSUCCESSFUL,  QUESTION, NOTIFICATION_SETTING, KEY_LANGUAGES} from './PrefKeys';
import { store } from '../App';
import { setFieldValue } from '../actions/CommonActions';


export const setItem = async (key, value) => {

    await AsyncStorage.setItem(key, value)

}


export let getItem = async (key) => {
    let value = await AsyncStorage.getItem(key)
    return value;

}



export const setNotificationEnable = async()=>{
    await AsyncStorage.setItem(NOTIFICATION_SETTING,'1');
}




export const setLanguage = async(lang)=>{
    await AsyncStorage.setItem(KEY_LANGUAGES,lang);


}

export const  getLanugage = async () => {

    const notification = await AsyncStorage.getItem(KEY_LANGUAGES)
    if(notification){
        return notification;
    }else{
        return "en"
    }

}

export const  getLanugageName = async () => {

    const notification = await AsyncStorage.getItem(KEY_LANGUAGES)
    if(notification){
        if(notification == 'de'){
            return "german"
        }
        else if(notification == 'it'){
            return "italian"
        }
        else if(notification == 'fr'){
            return "french"
        }
        else if(notification == 'nl'){
            return "dutch"
        }
        else if(notification == 'es'){
            return "spanish"
        }else{
          
            return "english"
        }
    }else{
        return "english"
    }

}

export const  getStarterKitUrl = async () => {

    const notification = await AsyncStorage.getItem(KEY_LANGUAGES)
    // if(notification){
    //     if(notification == 'de'){
    //         return "https://www.smileunion.de/"
    //     }
    //     else if(notification == 'fr'){
    //         return "https://www.smileunion.fr/"
    //     }
    //     else if(notification == 'nl'){
    //         return "https://www.smileunion.nl/"
    //     }
    //     else if(notification == 'es'){
    //         return "https://www.smileunion.es/"
    //     }else{
    //         return "https://www.smileunion.eu/"
    //     }
    // }else{
    //     return "https://www.smileunion.eu/"
    // }

// By Uneeb

    if(notification){
        if(notification == 'de'){
            return "https://www.smileunion.de/"
        }
        else if(notification == 'fr'){
            return "https://www.smileunion.fr/"
        }
        else if(notification == 'nl'){
            return "https://www.smileunion.nl/"
        }
        else if(notification == 'it'){
            return "http://smile-union.it/"
        }
        else if(notification == 'es'){
            return "https://smileunion.es/"
        }else{
            return "https://www.smileunion.co.uk/"
        }
    }else{
        return "https://www.smileunion.co.uk/"
    }



}

export const  getNotificationValue = async () => {

    const notification = await AsyncStorage.getItem(NOTIFICATION_SETTING)

    return notification;

}


export const setNotificationDisable = async()=>{
    await AsyncStorage.setItem(NOTIFICATION_SETTING,'');
}



export const setToken = async (value) => {

    await AsyncStorage.setItem(API_TOKEN, value)

}


export const getToken = async () => {

    const token = await AsyncStorage.getItem(API_TOKEN)

    return token;

}


export const setUser = async (value) => {

    
    await AsyncStorage.setItem(USER, value)

}


export const getUser = async () => {

    const user = await AsyncStorage.getItem(USER)

    return user;

}

export const getQRCode = async () => {
    let user = await AsyncStorage.getItem(USER);

    user = JSON.parse(user);

    let qrCode = '';
    if (user != null && user.qr_code != null && user.qr_code.qr_code_string != null) {
        console.log("user :- " + user)
        qrCode = user.qr_code.qr_code_string;
    }
    return qrCode;
}


export const getCurrencySymbol = () => {

    return store.getState().common.customerCurrencySymbol
}

export const getCurrentDialCode = () => {
    return store.getState().common.dialCode;
}

export const clearSession = async () => {

    await AsyncStorage.setItem(IS_LOGGED_IN, UNSUCCESSFUL)
    
    await AsyncStorage.setItem(USER, '')
    await AsyncStorage.clear()


  
}