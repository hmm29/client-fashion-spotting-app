/**
 * TabBarLayout.js
 * Tab bar interface using footer
 *
 * @providesModule TabBarLayout
 * @flow
 */

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
 View
} from 'react-native';

import ContributePage from '../pages/contribute/ContributePage';
import DiscoverPage from '../pages/discover/DiscoverPage';
import PersonalPage from '../pages/personal/PersonalPage';
import Tabs from 'react-native-tabs';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */
const iconOffset = 40;

function activeArrowOffset(selectedTitle){
  var activeLeft = 0;

  switch (selectedTitle){
    case "DiscoverPage":
      activeLeft = width/3 - iconWidth - iconWidth/2 - iconOffset;
      break;
    case "ContributePage":
      activeLeft = width/2 - iconWidth/2;
      break;
    case "PersonalPage":
      activeLeft = width*2/3 + iconWidth - iconWidth/2 + iconOffset;
      break;
    default:
     activeLeft = width/3 - iconWidth - iconWidth/2 - iconOffset;
      break;
  }
  return activeLeft
}

var TabBarLayout = React.createClass({
	getInitialState() {
		return {
			selected: <DiscoverPage navigator={this.props.navigator} />, // be sure to pass navigator
			selectedTitle: 'DiscoverPage'
		}
	},

	render() {



   var activeStyle = {};
   activeStyle.left = activeArrowOffset(this.state.selectedTitle);

   /*
    * active arrow, appears under active page
    */

   var Active =
   <View style={[styles.activeContainer, activeStyle]}>
     <Image source={require('../partials/img/active.png')} style={[styles.activeIcon]}/>
   </View>

   /*
    * left icon, goes to discover page
    * be sure to pass navigator to component for routing
    */

    var LeftIcon =
    <View title='DiscoverPage' component={<DiscoverPage navigator={this.props.navigator} />} style={styles.iconContainer}>
       <Image source={require('../partials/img/browse.png')} style={[styles.icon, styles.iconLeft]}/>
    </View>

   /*
    * middle icon - eyespot emblem, goes to contribute page
    */

    var EmblemIcon =
     <View title='ContributePage' component={<ContributePage navigator={this.props.navigator} />} style={styles.iconContainer}>
       <View style={styles.iconEmblemContainer}>
         <Image source={require('../partials/img/emblem.png')} style={styles.iconEmblem}/>
       </View>
     </View>;

   /*
    * right icon - profile icon, goes to personal profile
    * be sure to pass navigator to component for routing
    */

    var RightIcon =
     <View title='PersonalPage' component={<PersonalPage navigator={this.props.navigator} />} style={styles.iconContainer}>
       <Image source={require('../partials/img/profile.png')} style={[styles.icon, styles.iconRight]}/>
     </View>;

     return (
			<View style={styles.container}>
		        {this.state.selected}
        		<Tabs selected={this.state.selected} style={styles.footer}
		          selectedStyle={{}} onSelect={(el) => {
		          	el.props.component && this.setState({selected: el.props.component, selectedTitle: el.props.title});
		          }}
		          pressOpacity={1}>
			        {LeftIcon}
		          {EmblemIcon}
		          {RightIcon}
		        </Tabs>

            {Active}
        </View>
		);
  }
});

const footerHeight = 60;
const iconWidth = height/28;
const iconEmblemWidth = height/18;
const iconEmblemHeight = iconEmblemWidth * 2;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	    backgroundColor: '#F5FCFF',
	},
  footer: {
    position: 'absolute',
    bottom:0,
    width,
    height: footerHeight,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: 'black',
 },
 footerText: {
   color: '#fff',
   fontSize: 22,
   fontFamily: 'AvenirNextCondensed-Regular'
 },
 iconContainer: {
   flex:1,
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   width: iconWidth,
 },
 icon: {
   width: iconWidth,
   height: iconWidth,
   resizeMode: 'contain',
 },
 iconEmblemContainer: {
   width: iconEmblemWidth,
   height: iconEmblemHeight,
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
 },
 iconEmblem: {
   width: iconEmblemWidth,
   height: iconEmblemHeight,
   resizeMode: 'contain',
   position: 'absolute',
   top: -(height/25)
 },
 activeContainer:{
    position: 'absolute',
    bottom: 0,
    left:0,
    width: iconWidth,
 },
 activeIcon: {
   width: iconWidth,
   height: iconWidth/2,
   resizeMode: 'contain',
 },
});

module.exports = TabBarLayout;
