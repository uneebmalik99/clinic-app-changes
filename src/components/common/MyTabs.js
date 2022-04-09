import React from 'react'
import { Keyboard } from 'react-native'
import { Tab, Tabs, ScrollableTab } from 'native-base'

const MyTabs = ({ tabs }) => {
    return (
        <Tabs renderTabBar={() => <ScrollableTab />} onChangeTab={(page) => {
            Keyboard.dismiss()

        }} tabBarUnderlineStyle={{ backgroundColor: Colors.secondaryColor }} tabBarBackgroundColor={Colors.Defaultwhite}>

            {
                tabs.map((tab) => (
                    tab != null ?
                        <Tab heading={tab.name.toUpperCase()}
                            tabStyle={{ backgroundColor: Colors.Defaultwhite, }}
                            activeTabStyle={{ backgroundColor: Colors.Defaultwhite }}
                            textStyle={{
                                color: Colors.NormalGreyColor,
                                fontFamily: FontName.regular,
                                fontSize: FontSize.fontSize17
                            }}
                            activeTextStyle={{
                                color: Colors.secondaryColor,
                                fontFamily: FontName.medium,
                                fontSize: FontSize.fontSize17
                            }}>
                            {tab.component}
                        </Tab>
                        : null
                ))
            }
        </Tabs>
    )
}

export default MyTabs
