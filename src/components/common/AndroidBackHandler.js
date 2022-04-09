// packages
import { BackHandler } from 'react-native';
/**
 * Attaches an event listener that handles the android-only hardware
 * back button
 * @param  {Function} callback The function to call on click
 */
let backHandler = {}
const handleAndroidBackButton = callback => {
    backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        callback();
        return true;
    });
};
/**
 * Removes the event listener in order not to add a new one
 * every time the view component re-mounts
 */
const removeAndroidBackButtonHandler = () => {
    if (backHandler)
        backHandler.remove()
    BackHandler.removeEventListener('hardwareBackPress', () => { });
}

const exitApp = () => {

    BackHandler.exitApp()
}

export { handleAndroidBackButton, removeAndroidBackButtonHandler, exitApp };