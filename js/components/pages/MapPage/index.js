/**
 * MapPage.js
 * Current user account and activity history
 *
 * @providesModule MapPage
 * @flow
 */


'use strict'; /* enables JS strict mode for any ES5 code */

/*
* imports required modules
*/

import React, { PropTypes, Component } from 'react';
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
import FilterBar from '../../partials/FilterBar';
import Product from '../../partials/Product';
import Map from '../../partials/Map';
import EyespotLogoNegative from '../../partials/img/eyespot-logo-negative.png';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

/*
* defines the Categories class
* this code is for the two-column category component
*/

var MapPage = React.createClass({

   /*
    * specifies types for properties that this component receives
    */

   propTypes: {
     products: PropTypes.array
   },

   /*
    * _renderHeader(): renders the imported header component
    */

   _renderHeader() {
       return (
           <Header containerStyle={styles.headerContainer}>
               <View />
               <View style={styles.pageTitle}>
                 <Image source={EyespotLogoNegative}
                                 style={styles.pageTitleLogo} />
               </View>
               <View />
           </Header>
       );
   },

   /*
    * _renderFooter(): renders the imported footer component
    */

   _renderFooter() {
     return (
         <Footer navigator={this.props.navigator}/>
     );
   },


   /*
    * render(): returns JSX that declaratively specifies page UI
    */

   render() {

     const filters = [
       {
         'name' : 'Last Month',
         dropdown : ['Last Week', 'Last Month', 'Last Year'],
       },
       {
         'name' : 'Washington DC',
         dropdown: []
       },
     ]
     return (
       <View style={styles.container}>
         {this._renderHeader()}
         <EyespotPageBase
             keyboardShouldPersistTaps={false}
             noScroll={true}>
             <Map {...this.props}/>
         </EyespotPageBase>
         <FilterBar filters={filters}/>
         {this._renderFooter()}
       </View>
     );
   }
});

/*
* CSS stylings
*/


const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   titleContainer: {
     flexDirection: 'column',
     alignItems: 'center',
     paddingBottom: 15
   },
   italic: {fontStyle: 'italic'},
   bodoni: {fontFamily: 'BodoniSvtyTwoITCTT-Book'},
   headerContainer: {
     backgroundColor: '#000',
   },
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

module.exports = MapPage;
