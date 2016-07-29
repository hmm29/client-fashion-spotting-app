/**
 * Controls.js
 * Page header element
 *
 * @providesModule Controls
 * @flow
 */

'use strict'; /* enables JS strict mode for any ES5 code */

/*
* imports required modules
*/

import React from 'react';
import {
 AsyncStorage,
 Dimensions,
 StyleSheet,
 View,
 Image,
 Text,
 TouchableOpacity
} from 'react-native';

const firebaseApp = require('../../../firebase');

function getNumLikes(likes){
  var likeKeys = Object.keys(likes);
  let ret = 0;
  likeKeys.map(function(key){
    if(likes[key]){
      ret += 1;
    }
  })
  return ret

}


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
  likedByUser(userId){
    if(this.props.product.likes[userId]){
      return true
    }
    else{
      return false
    }
  },
  addLike(userId, productId){
    console.log(`products/${productId}/likes/${userId}`)
    firebaseApp.database().ref(`products/${productId}/likes/${userId}`).set(true);
  },
  removeLike(userId, productId){
    firebaseApp.database().ref(`products/${productId}/likes/${userId}`).set(false);
  },
  handlePress(){
    var self = this;
    const productId = this.props.product['.key'];

    AsyncStorage.getItem('@MyStore:uid').then(function(userId){
      if(self.likedByUser(userId)){
        console.log('remove like')
        self.removeLike(userId, productId);
      }
      else{
        console.log('add like')
        self.addLike(userId, productId);
      }
    })
  },

  render() {

    let { product } = this.props;
    let likes = product.likes;
    let numLikes = getNumLikes(likes);

    return (
      <View style={styles.control}>
        <TouchableOpacity onPress={this.handlePress}>
          <Image source={require('../img/like.png')} style={styles.icon}/>
        </TouchableOpacity>
        <Text style={styles.bodoni}>{numLikes}</Text>
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

/*
* defines the Controls class
* this is the code for the likes, share, and more buttons for each product
*/


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
    padding: 10
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
    marginRight: 10
  },
  bodoni: {
    color: 'gray',
    marginLeft: 5,
    fontFamily: 'BodoniSvtyTwoITCTT-Book'
  }
});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = Controls;
