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
 Alert,
 AsyncStorage,
 Dimensions,
 NativeModules,
 StyleSheet,
 View,
 Image,
 Text,
 TouchableOpacity
} from 'react-native';

var { KDSocialShare } = NativeModules;

const firebaseApp = require('../../../firebase');

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

const FBSDK = require('react-native-fbsdk');
const {
  ShareDialog,
} = FBSDK;

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


var ShareContent = React.createClass({
  shareLinkWithShareDialog() {

    // Build up a shareable link.
    const shareLinkContent = {
      /**
       * The type of content to be shared is link.
       */
      contentType: 'link',

      /**
       * URL for the content being shared.
       */
      contentUrl: "https://eyes.pt/",

      /**
       * The Description of the link.
       * If not specified, this field is automatically populated by information scraped
       * from the contentURL,  typically the title of the page.
       */
      contentDescription: "// Spotted with Eyespot app. Download yours for free!",

      /**
       * The title to display for this link.
       */
      // contentTitle?: string,

      /**
       * The URL of a picture to attach to this comment.
       */
      imageUrl: this.props.product && this.props.product.image && this.props.product.image.url,

      /**
       * The predefine quote to attacth to this comment.
       * If specified, the quote text will render with custom styling on top of the link.
       */
      // quote?: string,
    };

    // Share the link using the share dialog.
      ShareDialog.canShow(shareLinkContent).then(
        function(canShow) {
          if (canShow) {
            return ShareDialog.show(shareLinkContent);
          }
        }
      ).then(
        function(result) {
          if (result.isCancelled) {
            console.log('Share cancelled');
          } else {
            if(result.postId) console.log('Share success with postId: '
              + result.postId);
          }
        },
        function(error) {
          Alert.alert('Share Error', 'There was an issue. Please try again.');
          console.log('Share fail with error: ' + error);
        }
      );
  },

  render() {
    return (
      <TouchableOpacity onPress={() => this.shareLinkWithShareDialog()} style={styles.control}>
        <Image source={require('../img/share.png')} style={styles.icon}/>
      </TouchableOpacity>
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
    var userRef = firebaseApp.database().ref(`users/${userId}`);

    firebaseApp.database().ref(`products/${productId}/likes/${userId}`).set(true);
    this.createNotification(userId);
    userRef.once('value', (snap) => {
      if(snap.val() && snap.val().likeCount){
        userRef.update({likeCount: snap.val().likeCount + 1})
      } else {
        userRef.update({likeCount: 1})
      }
    });
  },

  removeLike(userId, productId){
    var userRef = firebaseApp.database().ref(`users/${userId}`);

    firebaseApp.database().ref(`products/${productId}/likes/${userId}`).set(false);
    userRef.once('value', (snap) => {
      if(snap.val() && snap.val().likeCount > 0){
        userRef.update({likeCount: snap.val().likeCount - 1})
      } else {
        userRef.update({likeCount: 0})
      }
    });
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
      productId : productId || ''
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
      <TouchableOpacity onPress={() => {
        this.props.handleModalVisible(true);
      }} style={styles.control}>
        <Image source={require('../img/more.png')} style={styles.icon}/>
      </TouchableOpacity>
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
        <ShareContent product={product}/>
        <More handleModalVisible={this.props.handleModalVisible}/>
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
