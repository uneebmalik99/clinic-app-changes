import { StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated';
import { Colors, FontName } from '../../../utils';


export default styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.LIGH_PINK,
        flex: 1,
    },
    txtTitle: {
        marginTop: 22,
        textAlign: 'center',
        flex: 1,
        fontSize: 22,
        fontFamily: FontName.regular,
        color: Colors.PureBlack,
    },
    profileRound: {
        width: 82, height: 82, padding: 4, borderRadius: 82 / 2,
        borderWidth: 2,
        borderColor: Colors.PINK
    },
    editProfileStyle: {
        borderWidth: 1, borderColor: Colors.PINK, alignSelf: 'center', borderRadius: 0, marginTop: 21, backgroundColor: Colors.LIGH_PINK
    }
});