import { Platform } from 'react-native'
import { Toast } from 'native-base';
// import { NavigationActions, StackActions } from 'react-navigation';
import moment from 'moment'
import AlertDialog from '../components/common/AlertDialog';
import RNFetchBlob from 'rn-fetch-blob';
import { strings } from '../language/Language';
import { setItem, getItem } from '../data/PrefUtils';
import { CURRENT_LOCATION ,USER,GOOGLE_LOCATION_API, COMPANY_NAME, TRACK_ID} from '../data/PrefKeys';
import Colors from './Colors';
import { Utils } from '.';
// import { fcmToken } from './Firebase';




export const loggerdata = async () => {

    let app_name = await getItem(COMPANY_NAME)
    let user = await getItem(USER)
    let user_id 
    if (!isNull(user)) {
        user = JSON.parse(user)
        user_id = user.id
    }
    let track_id = await getItem(TRACK_ID)
    if (track_id == null){
        let  channelname  = await getItem(COMPANY_NAME)
        track_id = channelname+"_app_customer_"+  +parseInt((new Date().getTime())/1000)
        await setItem(TRACK_ID, track_id)
    }
    
    return {
        "app_name":app_name+"_app_customer",
        "user_id": user_id,
        "track_id": track_id
    }
}



export const isValidEmail = (email) => {

    let reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return reg.test(email) === true && email.length <= 40;
}

export const isValidMobile = (mobile) => {

    let length = mobile.length;

    return /^\d+$/.test(mobile) && length >= 7 && length <= 15;
}

export const formatDate = (date, format = 'DD-MM-YYYY HH:mm', milis = true) => {

    const newDate = !milis ? date * 1000 : date
    return moment(newDate).format(format)
}

export const formatDate_time_first = (date, format = 'hh:mm A DD-MM-YYYY', milis = false) => {

    const newDate = !milis ? date * 1000 : date
    return moment(newDate).format(format)
}

export const formatToDateObject = (date, format = 'DD-MM-YYYY', milis = true) => {

    return new Date(date);
}


/// 2021-03-17 05:25:05

export const formatCurrentObject = (date, format = 'DD') => {

    return  moment(date).format(format);
}


export const formatWeekCurrentObject = (date, format = 'MMM') => {

    return  moment(date).format(format);
}


var days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const formatWeekObject = (date, format = 'EEEEE') => {
    return  days[new Date(date).getDay()];
}





export const currentDate = (format = 'YYYY-MM-DD') => {

    return  moment(new Date().toString()).format(format);
}


export const chooseUpdateQuestionTime = (time,format = 'HH:mm:ss') => {
    let date=new Date();
    date.setHours(parseInt(time.split(':')[0]));
    date.setMinutes(parseInt(time.split(':')[1]));
    date.setSeconds(parseInt(time.split(':')[2]));
    return  date;
}





export const progresscurrentDate = (format = 'DD-MM-YYYY') => {

    return  moment(new Date().toString()).format(format);
}




export const getUpdateQuestionDate = (date) =>{

    let parseDateValue=new Date(date);
    return  parseDateValue

}

export const germanFormatDate = (time,format = 'DD.MM.YYYY') => {
    return  moment(time).format(format);
}
//30-08-2021
export const germanParseFormatDate = (time,format = 'dd-MM-yyyy') => {

    return  moment(time,"DD-MM-YYYY").format('DD.MM.YYYY');
}




export const checkDate = (time,format = 'DD-MM-YYYY') => {

    let date=  new Date(time)

    if(moment(new Date().toString()).format(format) ==(moment(date.toString()).format(format))){
       return  true ;
    }
}



export const trackerTimer = (time,format = 'HH:mm:ss') => {
    let date=new Date();
    date.setHours(parseInt(time.split(':')[0]));
    date.setMinutes(parseInt(time.split(':')[1]));
    date.setSeconds(parseInt(time.split(':')[2]));
    date.setSeconds(date.getSeconds()-1)
    return  moment(date.toString()).format(format);
}



export const otpLeftTime = (time,format = 'mm:ss') => {
    let date=new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(time)
    return  moment(date.toString()).format(format);
}


export const currentTime = (format = 'HH:mm:ss') => {
    let date=new Date();
    console.error(date.toString());
    return  moment(date.toString()).format(format);
}
export const formatAddDaysObject = (lastDate, days, format= 'YYYY-MM-DD')=>{
    let date=new Date(lastDate);
    date.setDate(date.getDate() + days);
    return   moment(date.toString()).format(format) 
}



export const formatDate2 = (date, format = 'MM-DD-YYYY', milis = false) => {
    const newDate = !milis ? date * 1000 : date
    return moment(newDate).format(format)
}


export const dateObjectString = (date) => {
    return new Date(date);
}

export const roundNumber = (number) => {
    return Number((number).toFixed(2)).toString(); // 6.7
}

export const currentDateTime = () => {

    let todayDate = new Date();
    var date = todayDate.getDate(); //Current Date
    var month = todayDate.getMonth() + 1; //Current Month
    var year = todayDate.getFullYear(); //Current Year
    var hours = todayDate.getHours(); //Current Hours
    var min = todayDate.getMinutes(); //Current Minutes
    var sec = todayDate.getSeconds(); //Current Seconds

    let monthName = '';
    let timeType = 'AM';

    if (hours > 12) {
        timeType = 'PM';
    }
    switch (month) {
        case 1:
            monthName = "Jan";
            break;
        case 2:
            monthName = "Feb";
            break;
        case 3:
            monthName = "Mar";
            break;
        case 4:
            monthName = "April";
            break;
        case 5:
            monthName = "May";
            break;
        case 6:
            monthName = "Jun";
            break;
        case 7:
            monthName = "July";
            break;
        case 8:
            monthName = "Aug";
            break;
        case 9:
            monthName = "Sep";
            break;
        case 10:
            monthName = "Oct";
            break;
        case 11:
            monthName = "Nov";
            break;
        case 12:
            monthName = "Dec";
            break;

    }

    let fullDate = hours + ":" + min + " , " + date + " " + monthName + " " + year;
    // that.setState({
    //     //Setting the value of the date time
    //     date:
    //         date + '/' + monthName + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    // });

    return fullDate;
}

export const isValidPassword = (password) => {

    let length = password.length;

    return length >= 6 && length <= 20;
}

export const isEmpty = (value) => {
    return !value || value.toString().trim().length <= 0;
}
export const validtext = (value) => {

     let reg =  value.search(" ")
     console.log("regreg", reg)
    return reg === 0 ? true : false;

}

export const isNull = (object) => {
    return object == null ? true : false;
}

export const showGotoLoginDialog = (navigation) => {

    AlertDialog.show({
        title: 'Please Login', message: 'You must have to login to perform this action',
        positiveButton: {

            title: 'Login',
            onPress: () => {
                AlertDialog.hide()
                resetNavigation(navigation, 'login')
            }
        }, negativeButton: {

            title: 'Cancel',
            onPress: () => {
                AlertDialog.hide()
            }
        },
        cancelable: true
    })
}

export const showToastLoginRegister = (message, duration = 4000, type = 'success',bottom=0) => {
    let styledata =  isIos() ? {bottom:bottom,backgroundColor:Colors.TEETH_SEFIES_BG_COLOR} : {bottom:bottom,backgroundColor:Colors.TEETH_SEFIES_BG_COLOR}
    Toast.show({
        text: message.toString(),
        duration: duration,
        position: 'bottom',
        style:styledata,
        textStyle: {                                                                                                                                                                        
            textAlign: 'center',                                                                                                                                                            
        },  
        buttonStyle:{backgroundColor:Colors.TEETH_SEFIES_BG_COLOR},
        
        buttonTextStyle:{textAlign:'center',alignSelf:'center'},
        type: type
    })

}

export const showToast = (message, duration = 4000, type = 'success',bottom=90) => {
    let styledata =  isIos() ? {bottom:bottom,backgroundColor:Colors.TEETH_SEFIES_BG_COLOR} : {bottom:bottom,backgroundColor:Colors.TEETH_SEFIES_BG_COLOR}
    Toast.show({
        text: message.toString(),
        duration: 3000,
        position: 'bottom',
        textStyle: {                                                                                                                                                                        
            textAlign: 'center',                                                                                                                                                            
        },  
        style:styledata,
        buttonStyle:{backgroundColor:Colors.TEETH_SEFIES_BG_COLOR},
        buttonTextStyle:{textAlign:'center',alignSelf:'center'},
        type: type
    })

}

export const showToastRegister = (message, duration = 4000, type = 'success',bottom=60) => {
    let styledata =  isIos() ? {bottom:20,backgroundColor:Colors.TEETH_SEFIES_BG_COLOR} : {bottom:0,backgroundColor:Colors.TEETH_SEFIES_BG_COLOR}
    Toast.show({
        text: message.toString(),
        duration: 3000,
        position: 'bottom',
        textStyle: {                                                                                                                                                                        
            textAlign: 'center',                                                                                                                                                            
        },  
        buttonStyle:{backgroundColor:Colors.TEETH_SEFIES_BG_COLOR},
          style:styledata,
        buttonTextStyle:{textAlign:'center',alignSelf:'center'},
        type: type
    })

}

export const showBottomToast = (message, duration = 4000, type = 'success',bottom=90) => {
    let styledata =  isIos() ? {bottom:60,backgroundColor:Colors.TEETH_SEFIES_BG_COLOR} : {bottom:bottom,backgroundColor:Colors.TEETH_SEFIES_BG_COLOR}
    Toast.show({
        text: message.toString(),
        duration: 3000,
        position: 'bottom',
        textStyle: {                                                                                                                                                                        
            textAlign: 'center',                                                                                                                                                            
        },  
        style:styledata,
        buttonStyle:{backgroundColor:Colors.TEETH_SEFIES_BG_COLOR},
        buttonTextStyle:{textAlign:'center',alignSelf:'center'},
        type: type
    })

}


export const showWarningToast = (message, duration = 4000, bottom=90) => {

    showToast(message, duration, 'warning',bottom);

}

export const showDangerToast = (message, duration = 4000, bottom=90) => {

    showToast(message, duration, 'danger',bottom);

}


export const showDangerToastLoginRegister = (message, duration = 4000, bottom=0) => {
    showToast(message, duration, 'danger',0);
}


export const getDeviceType = () => {

    return isIos() ? 'I' : "A";
}

export const handleApiError = (error) => {

    showDangerToast(isEmpty(error) ? 'Something went wrong' : error.toString())
}

// export const resetNavigation = (navigation, resetTo) => {

//     const resetAction = StackActions.reset({
//         index: 0,
//         actions: [NavigationActions.navigate({ routeName: resetTo })],
//     });
//     navigation.dispatch(resetAction);

// }

export const isIos = () => {
    return Platform.OS === 'ios'
}


export const maskNumber = (number) => {

    if (number) {
        return number.toString().split('').map((value, index) => {
            return index > 1 && index < 6 ? "•" : value
        }).join('')
    }
    return ''
}


export const maskaccnumber = (number) => {

    if (number) {
        console.log(number.toString().length)  

        return number.toString().split('').map((value, index) => {
            return index > -1 && index < number.toString().length - 4 ? "•" : value
        }).join('')
    }
    return ''
}

export const getStatusName = (status) => {

    switch (status) {

        case 1:
            return "Pending"
        case 2:
            return "Approved"
        case 3:
            return "Success"
        case 4:
            return "Failed"
    }
}

export const getStatusColor = (status) => {

    switch (status) {

        case 1:
            return Colors.StatusYellowColor
        case 2:
            return Colors.DarkGreyColor
        case 3:
            return Colors.defaultGreenColor
        case 4:
            return Colors.DarkBlueColor
    }
}

//format 
//         "keys","values"
//         "app_name","DigiPay"
//         "Invite","INVITE"
//         "continue","CONTINUE"
//
//Must be in this format
export const csvToJSON = (tsv) => {

    var lines = tsv.split("\n");
    var headers = lines[0].split(",");
    var obj = {};
    for (var i = 1; i < lines.length; i++) {
        var currentline = lines[i].split(",");
        obj[currentline[0].trim()] = currentline[1];
    }

    return obj; //JSON
}

export const downloadFile = (uri, fileName, callback) => {


    let path = RNFetchBlob.fs.dirs.DownloadDir + "/" + fileName


    RNFetchBlob
        .config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache: true,
            path: path,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: false,
                mediaScannable: false,
                title: fileName,
                description: "Csv File",
                indicator: true,
                path: path

            }

        })
        .fetch('GET', uri, {
            //some headers ..
        })
        .progress({ interval: 100 }, (received, total) => {
            console.log('progress', received / total)
        })
        .then(async (res) => {
            // the temp file path
            console.log('The file saved to ', res.path())
            // RNFetchBlob.android.actionViewIntent(res.path(), 'application/pdf')

            const data = await RNFetchBlob.fs.readFile(res.path())
            console.log('CSV DATA', data)
            if (callback)
                callback(csvToJSON(data))

        }).catch((error) => {
            console.log('file error', error)

        })
}



export const showClearCartDialog = (navigation) => {

    AlertDialog.show({
        title: 'Are you sure you want to clear the cart?',
        positiveButton: {

            title: 'Confirm',
            onPress: () => {
                AlertDialog.hide()
            }
        }, negativeButton: {

            title: 'Cancel',
            onPress: () => {
                AlertDialog.hide()
            }
        },
        cancelable: true
    })
}