import React, {Component} from 'react'
import {ScrollView, View} from 'react-native'

export class ScrollContainer extends Component {
    render() {
        return (

            // this.props.scrollEnabled ?
            <ScrollView 
                        bounces={false} showsVerticalScrollIndicator={false}
                        contentContainerStyle={{flexGrow: 1}}
                        keyboardShouldPersistTaps={'handled'}>
                <View style={{flex: 1}}>
                    {this.props.children}
                </View>
            </ScrollView>
            // : <View style={{ flex: 1 }}>
            //     {this.props.children}
            // </View>


        )
    }
}

export default ScrollContainer
