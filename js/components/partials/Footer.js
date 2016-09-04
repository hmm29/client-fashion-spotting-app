/**
* Footer.js
* Page footer element
*
* @providesModule Footer
* @flow
*/

import React, { PropTypes } from 'react';
import {
 AsyncStorage,
 Dimensions,
 StyleSheet,
 Image,
 Text,
 TouchableOpacity,
 View
 } from 'react-native';

 import firebaseApp from '../firebase';
 import helpers from '../helpers';

var {width} = Dimensions.get('window');
const iconOffset = 40;

var Footer = React.createClass({

  propTypes: {
    navigator: PropTypes.object
  },

  componentWillMount() {
    var self = this;

    AsyncStorage.getItem('@MyStore:uid')
    .then((userId) => {
      var ref = firebaseApp.database().ref();
      ref.on('value', (snap) => {
          const users = snap.val() && snap.val().users;
          self.setState({
            user : users[userId],
          });
      });
    })
  },

  onPressLeft() {
    this.props.navigator.popToTop();
  },

  onPressMiddle() {
    const ContributePage = require('../pages/ContributePage');

    this.props.navigator.replace({
      title: 'ContributePage',
      component: ContributePage,
    });
  },

  onPressRight() {
    const PersonalPage = require('../pages/PersonalPage');

    this.props.navigator.push({
      title: 'PersonalPage',
      component: PersonalPage,
      passProps: {
        user: this.state.user
      }
    });
  },

 render() {

  //  var active = this.props.active;
   var active = 0; // HACK: temporary

   /*
    * calculate position (margin) for active arrow
    * position based on offset of icons
    */

   var activeMargin = width / 3 * active;
   if (active == 0) {
     activeMargin -= iconOffset / 2;
   }
   else if (active == 2) {
     activeMargin += iconOffset / 2;
   }

   var activePadding = {marginLeft: activeMargin};

   /*
    * left icon, goes to discover page
    */

    var LeftIcon =
     <TouchableOpacity onPress={this.onPressLeft} style={styles.iconContainer}>
       <Image source={require('./img/browse.png')} style={[styles.icon, styles.iconLeft]}/>
     </TouchableOpacity>;

   /*
    * middle icon - eyespot emblem, goes to contribute page
    */

    var EmblemIcon =
     <TouchableOpacity onPress={this.onPressMiddle} style={styles.iconContainer}>
       <View style={styles.iconEmblemContainer}>
         <Image source={require('./img/emblem.png')} style={styles.iconEmblem}/>
       </View>
     </TouchableOpacity>;

   /*
    * right icon - profile icon, goes to personal profile
    */

    var RightIcon =
     <TouchableOpacity onPress={this.onPressRight} style={styles.iconContainer}>
       <Image source={require('./img/profile.png')} style={[styles.icon, styles.iconRight]}/>
     </TouchableOpacity>;

    return (
      <View style={[styles.footerContainer]}>
        <View style={styles.footer}>
          {LeftIcon}
          {EmblemIcon}
          {RightIcon}
        </View>

        {/* Active Arrow*/}
        <View style={[styles.activeContainer, activePadding]}>
          <View style={styles.activeIconContainer}>
            <Image source={require('./img/active.png')} style={styles.activeIcon}/>
          </View>
        </View>
      </View>
    );
  }
});

const footerHeight = 60;
const iconWidth = 22;
const iconEmblemWidth = 40;
const iconEmblemHeight = iconEmblemWidth * 2;


var styles = StyleSheet.create({
 footerContainer: {
   width,
   height: footerHeight,
 },
 footer: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'black',
   width,
   height: footerHeight
 },
 footerText: {
   color: '#fff',
   fontSize: 22,
   fontFamily: 'AvenirNextCondensed-Regular'
 },
 iconContainer: {
   flex: 1,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
 },
 icon: {
   width: iconWidth,
   height: iconWidth,
   resizeMode: 'contain',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
 },
 iconLeft: {marginRight: iconOffset},
 iconRight: {marginLeft: iconOffset},
 iconEmblemContainer: {
   width: iconEmblemWidth,
   height: iconEmblemHeight
 },
 iconEmblem: {
   width: iconEmblemWidth,
   height: iconEmblemHeight,
   resizeMode: 'contain',
   position: 'absolute',
   top: -30
 },
 activeContainer: {
   width: width / 3,
   flexDirection: 'row',
   justifyContent: 'center'
 },
 activeIconContainer: {},
 activeIcon: {
   width: 28,
   height: 28,
   resizeMode: 'contain',
   transform: [{translateY: -18}]
 }
});

module.exports = Footer;
