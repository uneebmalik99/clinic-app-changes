// import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { connect } from 'react-redux'
// import { MainContainer } from '../common';
// import { Images, Colors } from '../../utils';
// import { strings } from '../../language/Language';
// import { BASE_URL, API_CMS_PAGES } from '../../network/ApiConstants';
// import { COMPANY_ID } from '../../utils/AppConstants';
// // ...
// class CustomTab extends Component {
//   state = {
//     src: []
//   }
//   render() {

//     const customTabs1 = this.props.navigation.getParam("customTabs")
//     // const customTabs1=this.props.customTabs
//     console.log("=====" + customTabs1);
//     if (customTabs1 === 1) {
//       return (
//         <MainContainer header={{ titleColor: Colors.Defaultblack, title: strings.TermsConditions, hideUnderLine: true, light: false, left: { image: Images.ic_BackBlackIcon, onPress: () => this.props.navigation.goBack() } }}>
//           <WebView source={{ uri:  BASE_URL + API_CMS_PAGES +  '?company_id=' + COMPANY_ID +  "&page_name=1" }} />
//         </MainContainer>
//       );
//     }
//     if (customTabs1 === 2) {
//       return (
//         <MainContainer header={{ titleColor: Colors.Defaultblack, title: strings.PrivacyPolicies, hideUnderLine: true, light: false, left: { image: Images.ic_BackBlackIcon, onPress: () => this.props.navigation.goBack() } }}>
//           <WebView source={{ uri:  BASE_URL + API_CMS_PAGES +  '?company_id=' + COMPANY_ID +  "&page_name=2" }} />
//         </MainContainer>
//       );
//     }
//     if (customTabs1 === 3) {
//       return (
//         <MainContainer header={{ titleColor: Colors.Defaultblack, title: strings.AboutUs, hideUnderLine: true, light: false, left: { image: Images.ic_BackBlackIcon, onPress: () => this.props.navigation.goBack() } }}>
//           <WebView source={{ uri: BASE_URL + API_CMS_PAGES +  '?company_id=' + COMPANY_ID +  "&page_name=3" }} />
//         </MainContainer>
//       );
//     }

//   }
// }

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(CustomTab)
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux'
import { MainContainer } from '../common';
import { Images } from '../../utils';
import English from '../../language/English';
import ApiService, { METHOD } from '../../network/ApiService';
// ...
class CustomTab extends Component {
  state = {
    title: "",
    content: "<html>Loading..</html>"
  }

  getPageName = () => {
    const customTabs1 = this.props.navigation.getParam("customTabs")

    if (customTabs1 === 1) {
      return "terms_of_use"
    }
    else if (customTabs1 === 2) {
      return "privacy_policy"
    }
    else if (customTabs1 === 3) {
      return "about_us"
    }
    return "terms_of_use"
  }

  componentDidMount = () => {

    const endpoint = "base/cms"
    ApiService(endpoint, { page_name: this.getPageName() }, (response) => {

      const { page_title, page_content } = response.data.data.cmsPage
      this.setState({
        title: page_title,
        content: page_content
      })

    }, (error) => {

      this.setState({
        title: "Error",
        content: "<html>Something went wrong..</html>"
      })
    }, METHOD.GET)
  }

  render() {


    return (
      <MainContainer header={{ titleColor: Colors.Defaultblack, title: this.state.title, hideUnderLine: true, light: false, left: { image: Images.ic_BackBlackIcon, onPress: () => this.props.navigation.goBack() } }}>
      
        <WebView ht source={{ html: this.state.content }} />
      </MainContainer>
    );



  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTab)