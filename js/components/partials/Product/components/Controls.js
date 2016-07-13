

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

var Share = React.createClass({
  render() {
    return (
      <View style={styles.control}>
        <Image source={require('../img/share.png')} style={styles.icon}/>
      </View>
    );
  }
});


var Likes = React.createClass({
  render() {

    const { product } = this.props;
    const likes = product.likes;


    return (
      <View style={styles.control}>
        <Image source={require('../img/like.png')} style={styles.icon}/>
        <Text style={styles.bodoni}>{likes}</Text>
      </View>
    );
  }
});


var More = React.createClass({
  render() {
    return (
      <View style={styles.control}>
        <Image source={require('../img/more.png')} style={styles.icon}/>
      </View>
    );
  }
});

var Controls = React.createClass({
  render() {
    const { product } = this.props;
    return (
      <View style={styles.container}>
        <Likes product={product}/>
        <Share/>
        <More/>
      </View>
    );
  }
});


/*
* CSS stylings
*/

const controlWidth = 20;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
  },
  icon: {
    width: controlWidth,
    height: controlWidth,
    resizeMode: 'contain'
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  bodoni: {
    color: 'gray',
    marginLeft: 5,
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
  }
});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = Controls;
