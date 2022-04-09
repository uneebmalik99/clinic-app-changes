import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { exitApp, handleAndroidBackButton, MainContainer, ScrollContainer } from '../common';
import { Colors, FontName, FontSize, Images, Utils } from '../../utils';

import { Body, Button } from 'native-base';
import Navigator from '../../navigation/Navigator';
import { strings } from '../../language/Language';
// import Utils from '../../utils/Utils';
import { API_ADD_MONEY, API_PAY_MERCHANT, API_TRANSFER_MONEY } from '../../network/ApiConstants';
import { getCurrencySymbol, getItem } from '../../data/PrefUtils'
import * as constants from '../../utils/AppConstants'
import * as actions from '../../actions/CommonActions'
import { NavigationEvents } from 'react-navigation';
import { removeAndroidBackButtonHandler } from './AndroidBackHandler';
import { COMPANY_MAIL_ID } from '../../data/PrefKeys';
import { openComposer } from 'react-native-email-link';


class PaymentSuccess extends Component {
    static propTypes = {
        prop: PropTypes
    }

    constructor() {
        super();
        this.state = {
            // pickerData: null,
            currencySymbol: '',
            amount: 0.00,
            title: strings.Successfully,
            message: "",
            dateTime: "",
            id_title: "",
            id_value: '',
        };
    }

    async componentDidMount() {
        const symbol = await getCurrencySymbol();

        let receiver_name = this.props.navigation.getParam('receiver_name')
        let id_value = this.props.navigation.getParam('id_value')
        this.setState({
            currencySymbol: symbol,
            amount: this.props.navigation.getParam('amount'),
            type: this.props.navigation.getParam('type')
        }, () => {
            console.log(this.state.type)
            switch (this.state.type) {
                case constants.ADD_MONEY:
                    this.setState({
                        urlToUse: API_ADD_MONEY,
                        message: strings.msg_success_dialog_addmoney,
                        id_title: strings.TransactionID,
                        id_value: id_value
                    })
                    break;


                case constants.PAY_TO_USER:
                    this.setState({
                        urlToUse: API_TRANSFER_MONEY
                        ,
                        message: strings.formatString(strings.send_To, receiver_name),
                        id_title: strings.TransactionID,
                        id_value: id_value
                    })
                    break;

                case constants.REQEUST_FROM_USER:
                    this.setState({
                        urlToUse: API_TRANSFER_MONEY
                        ,
                        message: strings.formatString(strings.requested_to, receiver_name),
                        id_title: strings.RequestID,
                        id_value: id_value
                    })
                    break;

                case constants.SEND_TO_BANK:
                    this.setState({
                        urlToUse: API_TRANSFER_MONEY
                        ,

                        message: strings.msg_success_dialog_sendtobank,
                        id_title: strings.TransactionID,
                        id_value: id_value
                    })
                    break;

                case constants.PAY_TO_MERCHANT:
                    this.setState({
                        urlToUse: API_PAY_MERCHANT
                    })
                    break;
                case constants.MOBILE_RECHARGE:
                    this.setState({
                        urlToUse: API_TRANSFER_MONEY
                        ,

                        message: "Mobile recharge done",
                        id_title: strings.TransactionID,
                        id_value: id_value
                    })
                    break;
                case constants.MOBILE_BILL:
                    this.setState({
                        urlToUse: API_TRANSFER_MONEY
                        ,

                        message: "Mobile bill paid",
                        id_title: strings.TransactionID,
                        id_value: id_value
                    })
                    break;
                case constants.ELECTRICITY_BILL:
                    this.setState({
                        urlToUse: API_TRANSFER_MONEY
                        ,

                        message: "Electricity bill paid",
                        id_title: strings.TransactionID,
                        id_value: id_value
                    })
                    break;
            }
        })
    }

    handleBackPress = () => {

        // this.handleDoubleclickForBack()

    }
    doubleBackToExitPressedOnce = false

    handleDoubleclickForBack() {
        if (this.doubleBackToExitPressedOnce) {
            exitApp();
        } else {
            this.doubleBackToExitPressedOnce = true;
            Utils.showWarningToast('Press again to exit', 2000);
            setTimeout(() => {

                this.doubleBackToExitPressedOnce = false;

            }, 2000)
        }
    }

    navigateToHome = () => {
        Navigator.resetNavigation('Dashboard')
    }

    render() {
        return (
            <MainContainer header={{
                hideUnderLine: true,
                title: '',
                left: {},
                right: [{ image: Images.ic_HeaderHomeIcon, onPress: () => this.navigateToHome() }]
            }}>
                <ScrollContainer>
                    <View style={{ flex: 1, backgroundColor: Colors.BackgroundMainColor }}>
                        <View style={{ backgroundColor: Colors.BackgroundMainColor }}>
                            <View style={styles.QrView}>
                                <View style={styles.declredView}>
                                    <Image source={Images.ic_PaymentSuccessImg} style={styles.SuccessImage}></Image>
                                    <Text
                                        style={styles.descriptiontitle}> {this.state.currencySymbol} {this.state.amount} </Text>
                                    <Text style={styles.successTitle}>{this.state.title}</Text>
                                    <Text style={styles.sendToTitle}>{this.state.message}</Text>
                                    <View style={styles.Lineview}></View>
                                    <Text style={styles.DateTitle}>{Utils.currentDateTime()}</Text>
                                    <Text
                                        style={styles.TransactionIdTitle}>{this.state.id_value ? this.state.id_title : null} {this.state.id_value}</Text>
                                </View>
                            </View>
                            <View style={styles.WalletBalanceView}>
                                <View style={styles.ChooseCardmainView}>
                                    <Text style={styles.ChooseCardTitle}>
                                        {strings.walletbalance}
                                    </Text>
                                    <Text style={styles.Balancetext}>
                                        {this.state.currencySymbol} {Utils.roundNumber(this.props.customerWalletBalance)}
                                    </Text>
                                </View>
                                <View style={styles.bottomSeprator}></View>

                                <Button style={styles.bottombutton}
                                    onPress={() => {
                                        this.navigateToHome();
                                    }}>
                                    <Body>
                                        <Text style={{
                                            color: Colors.Defaultwhite,
                                            fontFamily: FontName.medium,
                                            //fontWeight: 'bold',
                                            fontSize: FontSize.fontSize17
                                        }}>{strings.Home}</Text>
                                    </Body>
                                </Button>


                                <View style={styles.IssueView}>
                                    <TouchableOpacity style={styles.bottomView}
                                        onPress={async () => {
                                            let company_mail = await getItem(COMPANY_MAIL_ID)
                                            openComposer({ to: company_mail, subject: '', body: '' })
                                        }}>
                                        <View>
                                            <Text style={styles.bottomText}>
                                                {strings.Haveanissue}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <NavigationEvents
                            onDidFocus={payload => {
                                handleAndroidBackButton(this.handleBackPress)
                            }
                            }
                            onWillBlur={payload => {
                                removeAndroidBackButtonHandler()
                            }}
                        />
                    </View>
                    <View style={styles.bottomImageView}>
                        <Image source={Images.ic_BottomLogoicon} style={styles.logoImg}></Image>
                    </View>
                </ScrollContainer>

            </MainContainer>
        )
    }
}

const mapStateToProps = (state) => {

    return {

        customerWalletID: state.common.customerWalletID,
        customerWalletBalance: state.common.customerWalletBalance

    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, actions)(PaymentSuccess)

const styles = StyleSheet.create({

    QrView: {
        backgroundColor: Colors.Defaultwhite,
    },
    declredView: {
        backgroundColor: Colors.Defaultwhite,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SuccessImage: {
        marginTop: 30,
    },
    declaredtitle: {
        color: Colors.DarkGreyColor,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize17,
        marginTop: 24
    },
    descriptiontitle: {
        marginTop: 22,
        color: Colors.Defaultblack,
        fontFamily: FontName.medium,
        fontSize: FontSize.fontSize34,
    },
    successTitle: {
        marginTop: 32,
        color: Colors.Defaultblack,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize26,
    },
    sendToTitle: {
        marginTop: 12,
        color: Colors.DarkGreyColor,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize19,
    },
    Lineview: {
        width: 50,
        height: 1,
        backgroundColor: Colors.Backgroundgrey,
        marginTop: 30
    },
    DateTitle: {
        marginTop: 33,
        color: Colors.NormalGreyColor,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize14,
    },
    TransactionIdTitle: {
        color: Colors.NormalGreyColor,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize14,
        marginTop: 3,
        marginBottom: 20
    },
    WalletBalanceView: {
        marginTop: 8,
        backgroundColor: Colors.Defaultwhite,
    },
    ChooseCardmainView: {
        height: 71,
        alignItems: 'center',
        marginHorizontal: 16,
        flexDirection: 'row'
        //justifyContent:'center'
    },
    ChooseCardTitle: {
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize19,
        color: Colors.DarkGreyColor,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
        // alignSelf: 'flex-start',
        //marginVertical: 16
    },
    Balancetext: {
        fontFamily: FontName.medium,
        fontSize: FontSize.fontSize19,
        color: Colors.DarkGreyColor,
        // alignSelf: 'flex-start',
        //marginVertical: 16 
    },
    bottomSeprator: {
        height: 1,
        backgroundColor: Colors.Backgroundgrey,
        marginHorizontal: 16
    },
    bottomText: {
        color: Colors.defaultBlueColor,
        textAlign: 'center',
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize14,
        textDecorationLine: 'underline',
        textDecorationColor: Colors.defaultBlueColor,
        textDecorationStyle: 'solid'
    },
    IssueView: {
        height: 71,
        backgroundColor: Colors.Defaultwhite,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomImageView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.BackgroundMainColor
    },
    logoImg: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25
    },
    bottombutton: {
        backgroundColor: Colors.primaryColor,
        marginTop: 10,
        marginBottom: 10,
        height: 52,
        borderRadius: 4,
        marginHorizontal: 16,
        //marginLeft: 8,
        //marginRight: 8
    },
});