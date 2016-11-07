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

import _ from 'lodash';
import BackIcon from '../../partials/icons/navigation/BackIcon';
import Button from 'apsl-react-native-button';
import EyespotPageBase from '../EyespotPageBase';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import FilterBar from '../../partials/FilterBar';
import Product from '../../partials/Product';
import Map from '../../partials/Map';
import EyespotLogoNegative from '../../partials/img/eyespot-logo-negative.png';
import TabBarLayout from '../../layouts/TabBarLayout';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */
var ONE_DAY = 86400000; // milliseconds in a day
var ONE_WEEK = 604800000; // milliseconds in a week

/*
* defines the Categories class
* this code is for the two-column category component
*/

var MapPage = React.createClass({

  getInitialState() {
    return {
      historyFilter: 'All'
    }
  },

   /*
    * specifies types for properties that this component receives
    */

   propTypes: {
     products: PropTypes.array
   },

   componentWillMount() {
     var vicinity = this.props.products && this.props.products[0] && this.props.products[0].store
     && this.props.products[0].store.vicinity;
     var lastCommaInVicinity = vicinity.lastIndexOf(',');
     var city = vicinity.slice(lastCommaInVicinity+1);
     if(city.indexOf('Washington') > -1) city = 'Washington, D.C.'
     this.setState({city, locationFilter: city});
   },

   /*
    * _renderHeader(): renders the imported header component
    */

   _renderHeader() {
       let { categoryName } = this.props;
       let ampersandIdx = categoryName && categoryName.indexOf('&');

       return (
           <Header containerStyle={styles.headerContainer}>
               <BackIcon color='white' onPress={() => this.props.navigator.pop()} />
               <View style={styles.pageTitle}>
                 <Image source={EyespotLogoNegative}
                       style={styles.pageTitleLogo} />
                 <Text style={styles.pageTitleText}>{(categoryName && categoryName.length > 12 ? categoryName && categoryName.substring(0,ampersandIdx+1) + ' ...' : categoryName)}</Text>
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

   setFilter(type, filterName){
     if(type === this.state.historyFilter){
       this.setState({ historyFilter : filterName });
     }
   },


   /*
    * render(): returns JSX that declaratively specifies page UI
    */

   render() {
     var { historyFilter } = this.state;
     var filteredProducts = this.props.products;

     const filters = [
       {
         'name' : this.state.historyFilter,
         dropdown : ['All', 'Last Week', 'Today'],
       },
       {
         'name' : 'Location',
         dropdown: [this.state.city]
       },
     ]

     if(historyFilter === 'Last Week') {
       filteredProducts = _.filter(filteredProducts, (product) => (new Date()) - Date.parse(product.timestamp) <= ONE_WEEK);
     } else if (historyFilter === 'Today') {
       filteredProducts = _.filter(filteredProducts, (product) => (new Date()) - Date.parse(product.timestamp) <= ONE_DAY);
     }

     return (
       <View style={styles.container}>
         {this._renderHeader()}
         <EyespotPageBase
             keyboardShouldPersistTaps={false}
             noScroll={true}>
             <Map {...this.props} products={filteredProducts}/>
         </EyespotPageBase>
         <FilterBar filters={filters} historyFilter={this.state.historyFilter} locationFilter={this.state.locationFilter} setFilter={this.setFilter}/>
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
     bottom: height/45
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
     width: width / 3.9,
     height: height / 30,
     resizeMode: Image.resizeMode.contain
   },
   pageTitleText: {
     color: '#fff',
     fontSize: height / 42,
     fontFamily: 'BodoniSvtyTwoITCTT-Book'
   },
});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = MapPage;
