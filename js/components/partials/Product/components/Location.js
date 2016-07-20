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

import React from 'react';
import {
 Dimensions,
 StyleSheet,
 View,
 Text,
 Image
} from 'react-native';

var {width} = Dimensions.get('window'); /* gets screen dimensions */


/*
* defines the Location class
*/

var Location = React.createClass({

  handlePress(){
    console.log('here');
  },

  render() {

    const { product } = this.props;

    const store = product.store;
    const location = product.location;

    return (
      <View style={styles.container}>
        <Text><Text style={styles.italic}>at</Text> {store} /</Text>
        <Text> {location}</Text>
        <Image
          style={styles.location}
          onPress={this.handlePress}
          source={require('../img/location.png')}/>
      </View>
    );
  }
});


/*
* CSS stylings
*/

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderColor: 'black',
    transform: [{translateY: -20}]
  },
  italic: {fontStyle: 'italic'},
  location: {
    width: 15,
    height:15,
    resizeMode: 'contain',
    marginLeft:10
  }

});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = Location;
