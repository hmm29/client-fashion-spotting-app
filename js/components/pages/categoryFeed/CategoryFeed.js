/**
* CategoryFeed.js
* See Product info
*
* @providesModule CategoryFeed
* @flow
*/

'use strict'; /* enables JS strict mode for any ES5 code */

/*
* imports required modules
*/

import React, { PropTypes } from 'react';
import {
 Dimensions,
 Image,
 StyleSheet,
 View,
 Text,
} from 'react-native';

import BackIcon from '../../partials/icons/navigation/BackIcon';
import Button from 'apsl-react-native-button';
import EyespotPageBase from '../EyespotPageBase';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import SearchBar from '../../partials/SearchBar';
import Product from '../../partials/Product';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

/*
* defines the CategoryFeed class
* this is the code for the feed of products after tapping a panel
*/

var Products = React.createClass({

  propTypes: {
    products: PropTypes.array,
    navigator: PropTypes.object,
    dataStore: PropTypes.object
  },

 /*
  * render(): returns JSX that declaratively specifies page UI
  */

 render() {

   const { navigator, products, dataStore } = this.props;


   return (
     <View style ={styles.products}>
       {products.map((product, i) => {

       /*
        * return Product component for each product
        */

        const user = dataStore.users[product.user.id];

        return (
          <Product
            key={i}
            navigator={navigator}
            product={product}
            user={user}/>
        );
       })}

     </View>
   );
 }
});

/*
* defines the CategoryFeed class
*/

var CategoryFeed = React.createClass({

   /*
    * specifies types for properties that this component receives
    */

   propTypes: {
     products: PropTypes.array,
     navigator: PropTypes.object,
     dataStore: PropTypes.object
   },

   /*
    * _renderFooter(): renders the imported footer component
    */

   _renderFooter() {
     return (
         <Footer navigator={this.props.navigator} />
     );
   },

   /*
    * _renderHeader(): renders the imported header component
    */

   _renderHeader() {
       return (
         <Header containerStyle={styles.headerContainer}>
           <BackIcon color='white' onPress={() => this.props.navigator.pop()} />
           <View style={styles.pageTitle}>
             <Image source={require('./img/eyespot-logo-negative.png')}
                             style={styles.pageTitleLogo} />
                           <Text style={styles.pageTitleText}>Shoes</Text>
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
             <Products
               {...this.props}/>
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

const sideMargin = 20;


// FIXME: put header and footer styles in seperate file
const styles = StyleSheet.create({
    container: {},
    products: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingHorizontal: sideMargin
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
    fixedFooterSpacer: {height: 60},
    fixedFooterWrapper: {
      position: 'absolute',
      top: height * 1.27
    }

});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = CategoryFeed;
