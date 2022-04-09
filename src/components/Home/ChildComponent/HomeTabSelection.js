import React, {Component} from 'react';

import {connect} from 'react-redux';
import Navigator from '../../../navigation/Navigator';
import {strings} from '../../../language/Language';

import {store} from '../../../App';

// import {NavigationEvents} from 'react-navigation';
import CommonStyles from '../../common/CommonStyles';
import {getItem} from '../../../data/PrefUtils';
import {
  FIRST_SELFIES_UPLOAD_STATUS,
  IS_LOGGED_IN,
  QUESTION_STATUS,
} from '../../../data/PrefKeys';
import {setactivetabnumber} from '../../../actions/CommonActions';
import {View} from 'native-base';
class HomeTabSelection extends Component {
  state = {
    routes: [],
    title: strings.GetYourStarterKit,
  };
  componentDidMount() {
    this.checkToRedirectScreen();
  }

  async checkToRedirectScreen() {
    let logged = await getItem(IS_LOGGED_IN);
    let FIRSTSELFIES = await getItem(FIRST_SELFIES_UPLOAD_STATUS);
    // alert(FIRSTSELFIES)
    console.log('SUCUCESS');
    if (logged == 1 && FIRSTSELFIES == '0') {
      /// First Time Login  & Selfies not uploading...
      console.error('SUCCEsS');
      store.dispatch(setactivetabnumber(5));
      Navigator.navigate('Home');
    } else if (logged == 1) {
      let QUESTION = await getItem(QUESTION_STATUS);
      let FIRSTSELFIES = await getItem(FIRST_SELFIES_UPLOAD_STATUS);
      if (FIRSTSELFIES == '0') {
        //  TeethSelfies
        store.dispatch(setactivetabnumber(5));
        Navigator.navigate('Home');
      } else if (QUESTION == '0' || QUESTION == '2') {
        //aligner
        store.dispatch(setactivetabnumber(7));
        Navigator.navigate('Home');
      } else if (FIRSTSELFIES == '1' && QUESTION == '1') {
        console.error('FIRSTSELFIES');
        store.dispatch(setactivetabnumber(5));
        Navigator.navigate('Home');
      }
    } else {
      store.dispatch(setactivetabnumber(8));
      Navigator.navigate('Home');
    }
  }

  render() {
    return (
      <View style={CommonStyles.flex1style}>
        {/* <NavigationEvents
          onDidFocus={async () => {
            await this.componentDidMount();
          }}
        /> */}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTabSelection);
