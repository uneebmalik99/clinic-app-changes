
import { StyleSheet } from 'react-native'
import { Colors, FontName } from '../../../utils';

export default styles = StyleSheet.create({
    mainContainer: {
        backgroundColor:Colors.LIGH_PINK,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    txtTitle: {
        marginTop: 51,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: FontName.simibold,
        fontSize: 22,
        color: Colors.PureBlack,
    },
    txtSubTitle: {
        marginTop: 14,
        fontFamily: FontName.simibold,
        fontSize: 22,
        color: Colors.PureBlack,
    },
    txtNoRecord: {
        marginTop: 14,
        fontFamily: FontName.simibold,
        fontSize: 16,
        color: Colors.PureBlack,
    },
    txtDateView: {
        fontFamily: FontName.simibold,
        fontSize: 20,
        color: Colors.PureBlack
    },
    txtMonthYearView: {
        fontFamily: FontName.light,
        fontSize: 13,
        color: Colors.PureBlack
    },
    txtGoalLabel: {
        fontFamily: FontName.regular,
        fontSize: 15,
        color: Colors.PureBlack,
    },
    txtTimeLabel: {
        fontFamily: FontName.medium,
        fontSize: 15,
        marginStart:20,
        color: Colors.PureBlack
    },
    progressBar: {
        marginStart:20,
        flexDirection: 'row',
        height:20,
        width:'80%',
        backgroundColor:Colors.progressTintColor,
        borderRadius:20/2
    }

})