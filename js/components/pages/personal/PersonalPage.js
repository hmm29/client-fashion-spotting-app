/**
 * PersonalPage.js
 * Current user account and activity history
 *
 * @providesModule PersonalPage
 * @flow
 */


'use strict'; /* enables JS strict mode for any ES5 code */

/*
* imports required modules
*/

import React, { Component } from 'react';
import {
 Dimensions,
 Image,
 StyleSheet,
 Text,
 TextInput,
 View,
 TouchableOpacity
} from 'react-native';

import Button from 'apsl-react-native-button';
import EyespotPageBase from '../EyespotPageBase';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import SearchBar from '../../partials/SearchBar';
import Product from '../../partials/Product';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

/*
* defines the Categories class
* this code is for the two-column category component
*/


var Title = React.createClass({

  render() {
    const { user } = this.props;

    return (
      <View style={styles.titleContainer}>
        <Text style={[styles.italic, styles.bodoni]}>by</Text>
        <Text style={[styles.username, styles.bodoni]}>{user.username.toUpperCase()}</Text>
      </View>
    );
  }

});

var ProfileContainer = React.createClass({

  render() {
    const { user } = this.props;

    return (
      <View>
        <Image
          source={require('./img/profilePicture.jpg')}
          style={styles.profileImage} />
      </View>
    );
  }

});


var UserProducts = React.createClass({

  render() {
    const { user } = this.props;

    return (
      <View>
        {user.products.map((product, i) => {
          return (
            <Product key={i} product={product}/>
          );
        })}
      </View>
    );
  }

});


/*
* defines the PersonalPage class
*/

const user = {
  username: 'lovelycarrie',
  products: [
    {
      'name': 'none',
      'imgUrl': './test.jpg',
      likes: 42,
      store: 'Adidas',
      location: 'Beverely Center',
      comment: 'I\'ve found this pair of cute beauties at Adidas Beverly Center. It\'s super comfy and looks amazing!',
      user: {username: 'lovelycarrie'}
    }
  ]
};

var PersonalPage = React.createClass({

   /*
    * specifies types for properties that this component receives
    */

   propTypes: {},

   /*
    * _renderFooter(): renders the imported footer component
    */

   _renderFooter() {
     return (
         <Footer />
     );
   },

   /*
    * _renderHeader(): renders the imported header component
    */

   _renderHeader() {
       return (
           <Header containerStyle={styles.headerContainer}>
               <View />
               <View style={styles.pageTitle}>
                 <Image source={require('./img/eyespot-logo-negative.png')}
                                 style={styles.pageTitleLogo} />
               </View>
               <View />
           </Header>
       );
   },

   /*
    * render(): returns JSX that declaratively specifies page UI
    */

   render() {
     return (
       <View style={styles.layeredPageContainer}>
         {this._renderHeader()}
         <EyespotPageBase
             keyboardShouldPersistTaps={false}
             noScroll={false}>
             <View style={styles.container}>
               <Title user={user}/>
               <ProfileContainer user={user}/>
               <View style={styles.myContributions}>
                 <Text style={styles.bodoni}>
                   <Text style={styles.italic}>My</Text> CONTRIBUTIONS
                 </Text>
              </View>
               <UserProducts user={user}/>
             </View>
         </EyespotPageBase>
         <View style={styles.fixedFooterSpacer} />
         <View style={styles.fixedFooterWrapper}>
           {this._renderFooter()}
         </View>
       </View>
     );
   }
});

/*
* CSS stylings
*/

const styles = StyleSheet.create({
   container: {
     flexDirection: 'column',
     alignItems: 'center',
   },
   titleContainer: {
     flexDirection: 'column',
     alignItems: 'center',
     paddingBottom: 15
   },
   italic: {fontStyle: 'italic'},
   bodoni: {fontFamily: 'BodoniSvtyTwoITCTT-Book'},
   username: {fontSize: 30 },
   profileImage: {
     width,
     height: height / 3,
     resizeMode: 'cover'
   },
   myContributions: {
     width,
     padding: 20,
   },
   fixedFooterSpacer: {height: 60},
   fixedFooterWrapper: {
     position: 'absolute',
     top: height * 1.27
   },
   headerContainer: {
     backgroundColor: '#000',
     top: -10
   },
   layeredPageContainer: {flex: 1},
   pageTitle: {
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     bottom: height / 200
   },
   pageTitleLogo: {
     alignSelf: 'center',
     backgroundColor: 'transparent',
     width: width / 3.2,
     height: height / 24,
     resizeMode: Image.resizeMode.contain
   },
   pageTitleText: {
     color: '#fff',
     fontSize: height / 40,
     fontFamily: 'BodoniSvtyTwoITCTT-Book'

   },
});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = PersonalPage;
