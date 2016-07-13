/**
* ProductPage.js
* See Product info
*
* @providesModule ProductPage
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
import SearchBar from '../../partials/SearchBar';
import Product from './components/Product';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */


/*
* defines the Products class
* this is the code for the two-column category component
*/


// HACK: replace with real data
const products = [
      {
       'name' : 'none',
       'imgUrl' : './test.jpg',
       likes: 42,
       store: "Adidas",
       location: "Beverely Center",
       comment: "I've found this pair of cute beauties at Adidas Beverly Center. It's super comfy and looks amazing!",
       user: {
        username: 'lovelycarrie'
      }
    }
    ]

var Products = React.createClass({

 /*
  * render(): returns JSX that declaratively specifies page UI
  */

 render(){

   const { products } = this.props;

   return (
     <View style ={styles.products}>
       {products.map((product, i) => {

       /*
        * return Product component for each product
        */

        return (
          <Product key={i} product={product}/>
        )

       })}

     </View>
   )
 }
})

/*
* defines the ProductPage class
*/

var ProductPage = React.createClass({

   /*
    * specifies types for properties that this component receives
    */

   propTypes: {
     products: PropTypes.array
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
                 <View>
                   <Products products={products}/>
                  </View>
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
    container: {
    },
    products:{
      flexDirection:'column',
      justifyContent:'flex-start',
      paddingHorizontal: sideMargin,
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
    fixedFooterSpacer: {
      height: 60
    },
    fixedFooterWrapper: {
      position: 'absolute',
      top: height * 1.27
    },


})

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = ProductPage;
