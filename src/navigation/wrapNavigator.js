import React, { Component } from 'react';
import NavigationService from './Navigator';

const wrapNavigator = (Navigator) => {
    class NavigatorContainer extends Component {
        static router = Navigator.router;

        setNavigator = (ref) => {
            NavigationService.setTopLevelNavigator(ref);
        };

        render() {
            return <Navigator ref={this.setNavigator} {...this.props} />;
        }
    }

    return NavigatorContainer;
};

export default wrapNavigator;