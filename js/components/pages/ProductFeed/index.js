/**
* ProductFeed.js
* See Product info
*
* @providesModule ProductFeed
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
import FilterBar from '../../partials/FilterBar';
import Product from '../../partials/Product';
import EyespotNegativeLogo from '../../partials/img/eyespot-logo-negative.png';

import firebaseApp from '../../firebase';


var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

/*
* defines the ProductFeed class
* this is the code for the feed of products after tapping a panel
*/


function addKeyToProducts(allProducts){
  var product_keys = Object.keys(allProducts);
  var products = allProducts;
  product_keys.map(function(key){
    products[key]['.key'] = key;
  })
  return products
}


var Products = React.createClass({

  getInitialState(){
    return {
      dataStore: ""
    }
  },

  propTypes: {
    navigator: PropTypes.object,
    categoryKey: PropTypes.string,
  },

  componentDidMount(){
    var products = {};
    var ref = firebaseApp.database().ref();
    ref.on('value', (snap) => {
      if(snap.val()){
        this.setState({
          dataStore : snap.val(),
        })
      }
    });
  },

  filterProductsByCategory(){
    var dataStore = this.state.dataStore;
    if(!dataStore){ return null };

    const categories = dataStore.category || {};
    var productKeys = categories[this.props.categoryKey] ?
      Object.values(categories[this.props.categoryKey]) : [];

    var allProducts = addKeyToProducts(dataStore.products);
    var filteredProducts = productKeys.map((productKey) => {
      return allProducts[productKey];
    })

    return filteredProducts

  },


 /*
  * render(): returns JSX that declaratively specifies page UI
  */

 render() {

   var { categoryKey, navigator } = this.props;

   var filteredProducts = this.filterProductsByCategory();
   if(!filteredProducts){ return null }


   return (
     <View style ={styles.products}>
       {filteredProducts.map((product, i) => {

       /*
        * return Product component for each product
        */

        const user = this.state.dataStore.users[product.userId];


        return (
          <Product
            key={i}
            navigator={navigator}
            product={product}
            user={user}/>
        );
      },this)}

     </View>
   );
 }
});



/*
* defines the ProductFeed class
*/

var ProductFeed = React.createClass({

   /*
    * specifies types for properties that this component receives
    */

   propTypes: {
     navigator: PropTypes.object,
     categoryName: PropTypes.string
   },

   getInitialState(){
     return {
     }
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
             <Image source={EyespotNegativeLogo}
                   style={styles.pageTitleLogo} />
             <Text style={styles.pageTitleText}>{this.props.categoryName.toUpperCase()}</Text>
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
               navigator={this.props.navigator}
               categoryKey={this.props.categoryKey}
               />
           </View>
         </EyespotPageBase>
       </View>
     );
   }
});

/*
* CSS stylings
*/

const sideMargin = 20;


const styles = StyleSheet.create({
    container: {
    },
    products: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingHorizontal: sideMargin,
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

module.exports = ProductFeed;
