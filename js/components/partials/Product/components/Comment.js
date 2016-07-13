

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

var Comments = React.createClass({
  render() {
    const { product } = this.props;

    const comment = product.comment;
    return (
      <View style={styles.container}>
        <Image source={require('../img/quotes.png')} style={styles.icon}/>
        <Text style={styles.commentText}>{comment}</Text>
      </View>
    );
  }
});


/*
* CSS stylings
*/

const panelMargin = 5;
const sideMargin = 20;
const panelWidth = (width - panelMargin * 4 - sideMargin * 2) / 2;
const featuredPanelWidth = panelWidth * 2 + panelMargin * 2;

const styles = StyleSheet.create({
  container: {
    transform: [{translateY: -20}],
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  commentText: {
    textAlign: 'center',
    lineHeight: 20
  }
});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = Comments;
