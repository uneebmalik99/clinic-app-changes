
import CommonReducer from './CommonReducer';
import LoginReducer from './LoginReducer';
import { HOME_LOGOUT } from './types';
import { combineReducers } from 'redux';
import CompleteProfileReducer from './CompleteProfileReducer';

const rootReducer = combineReducers({

    common: CommonReducer,
    login: LoginReducer,
    completeProfile: CompleteProfileReducer

});

// const rootReducer = (state, action) => {
//     if (action.type === HOME_LOGOUT) {
//         state = {}
//     }

//     return appReducer(state, action)
// }

// export default rootReducer
export default (state, action) => {

    if (action.type === HOME_LOGOUT) {
        state = undefined;
    }

    return rootReducer(state, action);
}