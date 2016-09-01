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

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

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
  componentWillMount() {
    var self = this;
    AsyncStorage.getItem('@MyStore:uid').then(function(userId){
      self.setState({userId});
    });

  },
  likedByUser(userId){
    if(this.props.product.likes[userId]){
      return true
    }
    else{
      return false
    }
  },
  addLike(userId, productId){
    firebaseApp.database().ref(`products/${productId}/likes/${userId}`).set(true);
    this.createNotification(userId);
  },
  removeLike(userId, productId){
    firebaseApp.database().ref(`products/${productId}/likes/${userId}`).set(false);
  },
  createNotification(userId){

    const productId = this.props.product['.key'];
    const productUserId = this.props.product.userId;
    const time = new Date().getTime();
    console.log(`users/${productUserId}/notifications/${time}`);
    firebaseApp.database().ref(`users/${productUserId}/notifications/${time}`).set({
      userId: userId,
      date: time,
      type: "like",
      productId : productId
    });
  },

  getImageSource() {
      let { product } = this.props;

      if(this.state && this.state.userId && product && product.likes && product.likes && product.likes[this.state.userId]) {
        return require('../img/like-active.png')
      } else {
        return require('../img/like.png');
      }
  },

  getNumLikesColor() {
    let { product } = this.props;

    if(this.state && this.state.userId && product && product.likes && product.likes && product.likes[this.state.userId]) {
      return {color: 'red'}
    }
  },

  handlePress(){
    var self = this;
    const productId = this.props.product['.key'];

    if(!(self.state && self.state.userId)) {
      AsyncStorage.getItem('@MyStore:uid').then(function(userId){
        self.setState({userId});
      });
    }

    let userId = self.state.userId;

    if(self.likedByUser(userId)){
      self.removeLike(userId, productId);
    }
    else{
      self.addLike(userId, productId);
    }
  },

  render() {

    let { product } = this.props;
    let likes = product.likes;
    let numLikes = getNumLikes(likes);

    return (
      <View style={styles.control}>
        <TouchableOpacity onPress={this.handlePress}>
          <Image source={this.getImageSource()} style={styles.icon}/>
        </TouchableOpacity>
        <Text style={[styles.bodoni, this.getNumLikesColor()]}>{numLikes}</Text>
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
    left: -(width/40),
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
    marginRight: width/25
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
