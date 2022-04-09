// // Navigator.js

// import { NavigationActions, StackActions } from 'react-navigation';

// let _navigator;

// function setTopLevelNavigator(navigatorRef) {
//     _navigator = navigatorRef;
// }

// function navigate(routeName, params = {}, key) {
//     const navigator = _navigator.props.navigation

//     if (!navigator) {
//         return;
//     }

//     const payload = {
//         key,
//         params,
//         routeName,
//         type: NavigationActions.NAVIGATE,
//     };

//     navigator.dispatch(NavigationActions.navigate(payload));
// }



// function resetNavigation(resetTo) {
//     const navigator = _navigator.props.navigation

//     const resetAction = StackActions.reset({
//         index: 0,
        
//         actions: [NavigationActions.navigate({ routeName: resetTo })],
//     });
//     navigator.dispatch(resetAction);

// }

// function goBack() {
//     const navigator = _navigator.props.navigation
//     if (!navigator) {
//         return;
//     }
//     navigator.dispatch(NavigationActions.back());
// }

// // add other navigation functions that you need and export them

// function push(routeName, params = {}, key) {
//     const navigator = _navigator.props.navigation
//     if (!navigator) {
//         return;
//     }
//     const payload = {
//         key,
//         params,
//         routeName,
//         type: StackActions.PUSH,
//     };
//     navigator.dispatch(StackActions.push(payload));
// }
// function getCurrentRoute() {
//     const nav = _navigator.props.navigation.state
//     if (Array.isArray(nav.routes) && nav.routes.length > 0) {
//         return nav.routes[nav.index].routeName
//     } else {
//         return nav.routeName
//     }
// }

// export default {
//     goBack,
//     navigate,
//     push,
//     setTopLevelNavigator,
//     resetNavigation,
//     getCurrentRoute
// };


