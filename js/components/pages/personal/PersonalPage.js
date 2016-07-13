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

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

/*
* defines the Categories class
* this code is for the two-column category component
*/

/*
* defines the PersonalPage class
*/

var PersonalPage = React.createClass({

   /*
    * getInitialState(): returns object with initialized component state variables
    */

   getInitialState() {
       return {

       }
   },

   /*
    * specifies types for properties that this component receives
    */

   propTypes: {

   },

   /*
    * _renderFooter(): renders the imported footer component
    */

   _renderFooter() {
     return (
         <Footer />
     )
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
   container:{
     
   },
   fixedFooterSpacer: {
     height: 60
   },
   fixedFooterWrapper: {
     position: 'absolute',
     top: height * 1.27
   },
   headerContainer: {
     backgroundColor: '#000',
     top: -10
   },
   layeredPageContainer: {
     flex: 1
   },
   pageTitle: {
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     bottom: height/200
   },
   pageTitleLogo: {
     alignSelf: 'center',
     backgroundColor: 'transparent',
     width: width/3.2,
     height: height/24,
     resizeMode: Image.resizeMode.contain
   },
   pageTitleText: {
     color: '#fff',
     fontSize: height/40,
     fontFamily: 'BodoniSvtyTwoITCTT-Book'

   },
})

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = PersonalPage;
