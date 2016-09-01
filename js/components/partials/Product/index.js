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

import React, { PropTypes } from 'react';
import {
 Dimensions,
 StyleSheet,
 Text,
 TextInput,
 View,
 TouchableOpacity
} from 'react-native';


import Controls from './components/Controls';
import helpers from '../../helpers';
import Image from 'react-native-image-progress';
import Location from './components/Location';
import Contributor from './components/Contributor';
import Comment from './components/Comment';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */


/*
* defines the Product class
* this is the code for each Product in the Category Feed
*/


var Product = React.createClass({

  propTypes: {
    product: PropTypes.object.isRequired,
    navigator: PropTypes.object,
    onPressMapEmblem: PropTypes.func,
    user: PropTypes.object
  },

 /*
  * render(): returns JSX that declaratively specifies page UI
  */

  render() {

    const { navigator, user, product } = this.props;

    return (
      <View style={styles.product}>
        <Image source={{uri : product && product.image && product.image.url }} style={styles.productImage}/>
        <View style={styles.info}>
          <Contributor
            user={user}
            navigator={navigator}/>
          <Location
            navigator={navigator}
            onPressMapEmblem={this.props.onPressMapEmblem}
            product={product}/>
          <Comment product={product}/>
          <Controls product={product}/>
          <Text style={styles.timestamp}>{product && product.timestamp ? helpers.getTimePassed(Date.parse(product.timestamp)) + ' ago' : '36m ago'}</Text>
        </View>
      </View>
    );

  }

});


/*
* CSS stylings
*/

const panelMargin = 5;
const sideMargin = 18;
const panelWidth = (width - panelMargin * 4 - sideMargin * 2) / 2;
const featuredPanelWidth = panelWidth * 2 + panelMargin * 2;

const styles = StyleSheet.create({
    product: {
       flex: 1,
       flexDirection: 'column',
       alignItems: 'center',
       width,
       bottom: height/28,
    },
    productImage: {
      alignSelf: 'center',
      width: featuredPanelWidth,
      height: height * 5.2 / 12,
      resizeMode: 'cover',
      flex: 1
    },
    info: {
      width: featuredPanelWidth,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    timestamp: {
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
      right: -(width/35),
      padding: 10,
      width: width/4,
      textAlign: 'right',
      fontFamily: 'Avenir-BookOblique',
      color: '#aaa'
    }
});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = Product;
