/**
 * Location.js
 * Page header element
 *
 * @providesModule Location
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
 View,
 Text,
 Image,
 TouchableOpacity
} from 'react-native';

var {width} = Dimensions.get('window'); /* gets screen dimensions */

/*
* defines the Location class
*/

var Location = React.createClass({

  propTypes: {
    categoryName: PropTypes.string,
    navigator: PropTypes.object,
    onPressMapEmblem: PropTypes.func,
    product: PropTypes.object
  },

  handlePress(){
    // lazy load
    const MapPage = require('../../../pages/MapPage');
    let { categoryName, onPressMapEmblem, product } = this.props;

    this.props.navigator.push({
      title: 'MapPage',
      component: MapPage,
      passProps: {
        categoryName: categoryName,
        onPressMapEmblem: onPressMapEmblem,
        products : [this.props.product]
      }
    });
  },

  showProductsForStore() {
    var ProductFeed = require('../../../pages/ProductFeed'); // lazy load

    let { navigator, product } = this.props;

    navigator.push({
      title: 'ProductFeed',
      component: ProductFeed,
      passProps: {
        storeName: product && product.store && product.store.name
      }
    });
  },

  render() {

    const { product, products } = this.props;
    var store = product && product.store && product.store.name;
    var vicinity = product && product.store && product.store.vicinity;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.locationText} onPress={this.showProductsForStore}>
        <Text><Text style={styles.italic}>at</Text> {store} / </Text>
        <Text>{vicinity}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handlePress}>
        <Image
          style={styles.locationIcon}
          onPress={()=>{this.handlePress()}}
          source={require('../img/location.png')}/>
        </TouchableOpacity>
      </View>
    );
  }
});


/*
* CSS stylings
*/

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderColor: 'black',
    transform: [{translateY: -20}],
  },
  italic: {fontStyle: 'italic'},
  locationIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginLeft:10,
    left: width/30
  },
  locationText: {
    width: width/1.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  }

});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = Location;
