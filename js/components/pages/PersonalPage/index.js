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

import React, { PropTypes, Component } from 'react';
import {
 AsyncStorage,
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
import FilterBar from '../../partials/FilterBar';
import Product from '../../partials/Product';
import EyespotNegativeLogo from '../../partials/img/eyespot-logo-negative.png';

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
          source={{ uri : user.profilePicture }}
          style={styles.profilePicture} />
      </View>
    );
  }

});


var UserProducts = React.createClass({

  render() {
    const { user, dataStore } = this.props;

    if(!user.products){
      return null
    }


    return (
      <View>
        {Object.keys(user.products).map((key, i) => {


         /*
          * return Product component for each product
          */
          const product_id = user.products[key];

          const product = dataStore.products[product_id];
          if(!product){
            return null
          }

          return (
            <Product key={i} product={product} user={product.user}/>
          );
        })}
      </View>
    );
  }

});


/*
* defines the PersonalPage class
*/

var PersonalPage = React.createClass({

   /*
    * specifies types for properties that this component receives
    */

   getInitialState(){

      return {
        user : "",
        userId : ""
      }
   },


   propTypes: {
     dataStore: PropTypes.object,
   },

   componentDidMount(){
     var self = this;
     AsyncStorage.getItem('@MyStore:uid').then((userId) => {
       self.setState({ userId : userId });
     })


   },

   /*
    * _renderHeader(): renders the imported header component
    */

   _renderHeader() {
       return (
           <Header containerStyle={styles.headerContainer}>
               <View />
               <View style={styles.pageTitle}>
                 <Image source={EyespotNegativeLogo}
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

     const { dataStore } = this.props;

     var user = this.props.dataStore.users[this.state.userId];
     console.log(user);
     console.log(dataStore)
     if(!user){
       return null
     }

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
               <UserProducts user={user} dataStore={dataStore}/>
             </View>
         </EyespotPageBase>
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
     alignItems: 'center'
   },
   titleContainer: {
     flexDirection: 'column',
     alignItems: 'center',
     paddingBottom: 15
   },
   italic: {fontStyle: 'italic'},
   bodoni: {fontFamily: 'BodoniSvtyTwoITCTT-Book'},
   username: {fontSize: 30 },
   profilePicture: {
     width,
     height: height / 3,
     resizeMode: 'cover'
   },
   myContributions: {
     width,
     padding: 20
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

   }
});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = PersonalPage;
