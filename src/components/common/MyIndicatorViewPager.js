import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

export default class MyIndicatorViewPager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0
        };
    }

    render() {
        return (

            <View style={this.props.containerStyle} >
                <ViewPager style={this.props.containerStyle} onPageSelected={(e) => {

                    this.setState({
                        page: e.nativeEvent.position
                    });

                    if (this.props.onPageSelected)
                        this.props.onPageSelected(e.nativeEvent)

                }}   >
                    {this.props.children}
                </ViewPager>
                {this.props.showDots && this.props.children.length > 0 ? <View style={{ flex: 1, flexDirection: 'row', alignSelf: "center", position: "absolute", bottom: 20, justifyContent: 'center', alignItems: 'center', alignContent: 'space-between' }}>
                    {
                        this.props.children.map((v, index) => (
                            <View style={this.state.page == index ? this.props.selectedCircleStyle : this.props.CircleStyle}></View>

                        ))
                    }
                </View> : null}
            </ View>

        );
    }
}
