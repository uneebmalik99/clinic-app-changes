import React, { Component } from 'react'
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View,SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AlertDialog, MainContainer, ScrollContainer } from '../../common';
import { Colors, FontName, FontSize, Images, Utils } from '../../../utils';
import Navigator from '../../../navigation/Navigator';

import { getItem, setItem, getCurrentDialCode, clearSession } from '../../../data/PrefUtils'
import { strings } from '../../../language/Language';
import * as constants from '../../../utils/AppConstants';

// import { NavigationEvents,  } from 'react-navigation';
import CommonStyles from '../../common/CommonStyles';

class Sidemenu extends Component {
    static propTypes = {
        prop: PropTypes
    };


    constructor() {
        super();
        this.state = {
            loading: constants.FALSE,
        
        
            is_log_in: '0',
        
            routes:[
                {
                    type: 1,
                    title: strings.contactUs,
                    route: 'Home'
                }
                
                ,
            ]
        };
    }

    //  Sidemenu list View
    _rendermenuListItem = ({ item }) => {
   
        
        return (
                <TouchableOpacity style={styles.menuIcon} onPress={async () => {
                    Navigator.push("DoctorChat")
                    this.props.navigation.closeDrawer();
                }} activeOpacity={0.5}>
                   
                   <View style={{  borderBottomColor: Colors.LightBlack,
        borderBottomWidth: 1,
        marginHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                   <Image source={item.img} style={{ height: 20, width: 20, resizeMode: 'contain', }}></Image>
                    <Text style={{
 textTransform:'capitalize',
 marginStart:10,
 flex:1,
 marginTop:10,
 marginBottom:10,
 fontSize:13,
marginEnd:10,
 fontFamily:FontName.simibold,
 color:Colors.PureBlack,

                    }} >{item.title}</Text>

<Image source={Images.arrow} style={{
                            height: 20, width: 20, resizeMode: 'center', transform: [{ rotate: '270deg' }],
                        }}  ></Image>
                </View>

                </TouchableOpacity>
        );
    };
 

    async componentDidMount() {
    }





    render() {
        return (


      <>
                <ScrollContainer >
                    <View style={{ ...CommonStyles.flex1style, }}>
                        <View style={{ ...CommonStyles.flex1style }}>
                            <View style={CommonStyles.flex1style}>
                                <View style={styles.MenuItemListView}>
                                    < FlatList
                                        data={ 
                                            this.state.routes}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={(item) => this._rendermenuListItem(item)}
                                        keyExtractor={(item, index) => "key" + index}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollContainer>
                
                 {/* <NavigationEvents
                    onDidFocus={payload => {

                    }
                    }
                    onWillBlur={payload => {

                    }}
                /> */}


</>
        )
    }
}

const mapStateToProps = (state) => {

    return {

        firstName: state.completeProfile.firstName,
        lastName: state.completeProfile.lastName,
        dob: state.completeProfile.dob,
        email: state.completeProfile.email,
        customerWalletID: state.common.customerWalletID,
        customerWalletBalance: state.common.customerWalletBalance
    }
};

export default connect(mapStateToProps)(Sidemenu)


const styles = StyleSheet.create({

    flatlistview: {

        borderBottomColor: Colors.borderBottomColor,
        marginHorizontal: 20
    },
    listImage: {
        height: 40,
        width: 40,
        //marginTop: 12,
        marginLeft: 16
    },
    kycDoneImage: {
        height: 25,
        width: 25,
        borderRadius: 30,
        left: 43,
        top: 48,
        position: 'absolute',


    },
    termandprivacytext: {
        textDecorationLine: 'underline',
        fontSize: 15, color: Colors.textColor,
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
    titleView: {
        flexDirection: 'column',
        marginLeft: 16,
        flex: 1,
        justifyContent: 'center',
    },
    textUsername: {
        fontSize: FontSize.fontSize19,
        color: Colors.Defaultwhite,
    },
    topView: {
        flexDirection: 'row',
        backgroundColor: Colors.DarkGreyColor,
        alignItems: 'center'
    },
    Username: {
        fontSize: FontSize.fontSize14,
        color: Colors.Defaultwhite,
        opacity: 80,
        marginTop: 8
    },

    // MenuListView: {
    //     height: 56,
    //     flexDirection: 'row'
    // },
    // txtmenuitem:
    // {
    //     fontSize: 16,
    //     color: Colors.DarkGreyColor,
    //     justifyContent: 'center'
    // },

    MenuItemListView: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    menuIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        //backgroundColor:'green',
        height: 64,
    },
    TextStyleView: {
        flexDirection: 'row',
        marginHorizontal: 16,
        width: '80%'
    },
    TextStyle: {
        color: Colors.DarkGreyColor,
        fontSize: FontSize.fontSize20,
        //alignItems: 'center',
        textAlign: 'left',
        marginLeft: -30,
        width: '60%'
    },
    ImageIconStyle: {
        alignItems: 'center',
    },

    InviteView: {
        backgroundColor: 'rgba(255, 238, 127, 0.10)',
        flexDirection: 'row',
        alignItems: 'center',
        //opacity: 0.50
    },
    InviteUnderView: {
        marginTop: 18,
        marginLeft: 16,
        flex: 1,
        paddingBottom: 20
    },
    textRefer: {
        color: Colors.Defaultblack,
        fontSize: FontSize.fontSize19,
    },
    textReferDescription: {
        color: Colors.NormalGreyColor,
        fontSize: FontSize.fontSize14,
        marginTop: 8
    },
    NextImageView: {
        marginRight: 16,
    },
});