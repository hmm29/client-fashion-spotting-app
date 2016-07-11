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


var Likes = React.createClass({

  render() {
    <View>
      <Image source={require('./img/like.png')}/>
      <Text>{number}</Text>
    </View>
  }

})

var Share = React.createClass({

  render() {
    var number = "13";
    return(
      <View>
        <Image source={require('./img/share.png')}/>
        <Text>{number}</Text>
      </View>
    )
  }

})


var More = React.createClass({
  render() {
    return (
      <View>
        <Image source={require('./img/more.png')}/>
      </View>
    )
  }
})

var ProductControls = React.createClass({
  render() {
    return (
      <View>
        <Text>spotted by</Text>
        <Text>spotted by</Text>
        <Image source={require('./img/testUser.jpg')}/>
      </View>
    )
  }
})

var ProductLocation = React.createClass({

   render() {
     const location = {
       'shop' : "Addidas",
       'location' : "Barclay's Center",
     }
     return (
       <View>
         <Text>spotted by</Text>
         <Text>spotted by</Text>
         <Image source={require('./img/testUser.jpg')}/>
       </View>
     )
   }

})

var ContributorProfile = React.createClass({

  render() {
    const user = {
        'username' : "LOVELYCARE",
    }

    return (
      <View>
        <Text>spotted by</Text>
        <Text>spotted by</Text>
        <Image source={require('./img/testUser.jpg')} style={styles.profile}/>
      </View>
    )
  }
})

var Product = React.createClass({

 /*
  * render(): returns JSX that declaratively specifies page UI
  */

  render() {

    return (
      <View style={styles.product}>
        <Image source={require('./img/test.jpg')} style={styles.productImage}/>
        <ContributorProfile/>
        <ProductLocation/>
        <ProductControls/>
      </View>
    )

  }

})

/*
* defines the Products class
* this is the code for the two-column category component
*/

var Products = React.createClass({

 /*
  * getInitialState(): returns object with initialized component state variables
  */

 getInitialState() {
   return {
     products : [
       {
         'name' : 'ALL',
         'imgUrl' : './test.jpg'
       }
     ]
   }
 },

 /*
  * render(): returns JSX that declaratively specifies page UI
  */

 render(){
   return (
     <View style ={styles.products}>
       {this.state.products.map(function(product, i){

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
                     <Products/>
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

const panelMargin = 5;
const sideMargin = 20;
const panelWidth = (width - panelMargin * 4 - sideMargin * 2)/2;
const featuredPanelWidth = panelWidth * 2 + panelMargin * 2;




const styles = StyleSheet.create({
    container: {
    },
    products:{
        flexDirection:'column',
        padding: sideMargin,
        backgroundColor:'blue',
    },
    product: {
       backgroundColor: 'red',
       flex: 1,
       flexDirection: 'column',
       alignItems: 'center',

    },
    productImage: {
        width : featuredPanelWidth,
        height: featuredPanelWidth,
        resizeMode: 'contain'
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
   panel: {
       width: panelWidth,
       height: panelWidth,
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'center',
       margin: panelMargin
   },
   panelImage: {
       width: panelWidth,
       height: panelWidth,
       position: 'absolute',
       top: 0
   },
   panelText: {
       fontSize: 20,
       backgroundColor: 'transparent',
       color: 'white'
   },
   textContainer: {
       paddingVertical: 5,
       paddingHorizontal: 15,
       borderWidth: 2,
       borderColor: 'white'
   }
})

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = ProductPage;
