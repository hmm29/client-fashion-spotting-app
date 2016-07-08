/**
* Footer.js
* Page footer element
*
* @providesModule Footer
* @flow
*/


'use strict';

import React, { Component } from 'react';
import {
 Dimensions,
 StyleSheet,
 Image,
 Text,
 View
 } from 'react-native';

var {height, width} = Dimensions.get('window');
const iconOffset = 40;


var Footer = React.createClass({

 render() {

  //  var active = this.props.active;
   var active = 0; // HACK: temporary

   /*
    * calculate position (margin) for active arrow
    * position based on offset of icons
    */

   var activeMargin = width/3 * active;
   if(active == 0){
     activeMargin -= iconOffset/2;
   }
   else if(active == 2){
     activeMargin += iconOffset/2;
   }

   var activePadding = {marginLeft: activeMargin};

   /*
    * left icon, goes to discover page
    */

    var LeftIcon =
     <View style={styles.iconContainer}>
       <Image source={require('./img/browse.png')} style={[styles.icon, styles.iconLeft]}/>
     </View>

   /*
    * middle icon - eyespot emblem, goes to contribute page
    */

    var EmblemIcon =
     <View style={styles.iconContainer}>
       <View style={styles.iconEmblemContainer}>
         <Image source={require('./img/emblem.png')} style={styles.iconEmblem}/>
       </View>
     </View>

   /*
    * right icon - profile icon, goes to personal profile
    */

    var RightIcon =
     <View style={styles.iconContainer}>
       <Image source={require('./img/profile.png')} style={[styles.icon, styles.iconRight]}/>
     </View>

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
    )
  }
});

const footerHeight = 60;
const iconWidth = 22;
const iconEmblemWidth = 40;
const iconEmblemHeight = iconEmblemWidth * 2;


var styles = StyleSheet.create({
 footerContainer: {
   width: width,
   height: footerHeight,
   position: 'absolute',
   bottom: 200,
 },
 footer: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor:'black',
   width: width,
   height: footerHeight,

 },
 footerText: {
   color: '#fff',
   fontSize: 22,
   fontFamily: 'AvenirNextCondensed-Regular'
 },
 iconContainer:{
   flex:1,
   flexDirection: 'row',
   justifyContent: 'center',
 },
 icon:{
   width:iconWidth,
   height:iconWidth,
   resizeMode:'contain'
 },
 iconLeft:{
   marginRight: iconOffset
 },
 iconRight:{
   marginLeft: iconOffset
 },
 iconEmblemContainer: {
   width:iconEmblemWidth,
   height:iconEmblemHeight,
  //  backgroundColor: 'green'
 },
 iconEmblem:{
   width:iconEmblemWidth,
   height:iconEmblemHeight,
   resizeMode:'contain',
   position: 'absolute',
   top: -30
 },
 activeContainer: {
   width: width/3,
   flexDirection: 'row',
   justifyContent: 'center',
 },
 activeIconContainer:{
 },
 activeIcon:{
   width:28,
   height:28,
   resizeMode:'contain',
   transform: [{translateY: -18}]
 }
});

module.exports = Footer;
