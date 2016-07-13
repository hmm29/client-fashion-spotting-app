
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

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

var Location = React.createClass({
  render() {

    const { product } = this.props;

    const store = product.store;
    const location = product.location;

    return (
      <View style={styles.container}>
        <Text><Text style={styles.italic}>at</Text> {store} /</Text>
        <Text> {location}</Text>
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
    transform: [{translateY: -20}],
  },
  italic: {fontStyle: 'italic'},

});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = Location;
