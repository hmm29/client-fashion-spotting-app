/**
* Product.js
* See Product info
*
* @providesModule Product
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


import Controls from './components/Controls';
import Location from './components/Location';
import Contributor from './components/Contributor';
import Comment from './components/Comment';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

var Product = React.createClass({

 /*
  * render(): returns JSX that declaratively specifies page UI
  */

  render() {

    const { product } = this.props;

    return (
      <View style={styles.product}>
        <Image source={require('./img/test.jpg')} style={styles.productImage}/>
        <View style={styles.info}>
          <Contributor product={product}/>
          <Location product={product}/>
          <Comment product={product}/>
          <Controls product={product}/>

        </View>
      </View>
    )

  }

})


/*
* CSS stylings
*/

const panelMargin = 5;
const sideMargin = 20;
const panelWidth = (width - panelMargin * 4 - sideMargin * 2)/2;
const featuredPanelWidth = panelWidth * 2 + panelMargin * 2;

const styles = StyleSheet.create({
    product: {
       flex: 1,
       flexDirection: 'column',
       alignItems: 'center',
       width : featuredPanelWidth,
       marginBottom: 50,
    },
    productImage: {
      width : featuredPanelWidth,
      height: height/2,
      resizeMode: 'cover',
      flex: 1
    },
    info:{
      width : featuredPanelWidth,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:'center',
    }
})

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = Product;
