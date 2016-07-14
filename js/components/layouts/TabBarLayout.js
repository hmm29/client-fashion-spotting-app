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

import DiscoverPage from '../pages/discover/DiscoverPage';
import PersonalPage from '../pages/personal/PersonalPage';
import Tabs from 'react-native-tabs';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */
const iconOffset = 40;

var TabBarLayout = React.createClass({
	getInitialState() {
		return {
			selected: <DiscoverPage />
		}
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
     <View component={<DiscoverPage />} onPress={this.onPressLeft} style={styles.iconContainer}>
       <Image source={require('../partials/img/browse.png')} style={[styles.icon, styles.iconLeft]}/>
     </View>;

   /*
    * middle icon - eyespot emblem, goes to contribute page
    */

    var EmblemIcon =
     <View component={null} style={styles.iconContainer}>
       <View style={styles.iconEmblemContainer}>
         <Image source={require('../partials/img/emblem.png')} style={styles.iconEmblem}/>
       </View>
     </View>;

   /*
    * right icon - profile icon, goes to personal profile
    */

    var RightIcon =
     <View component={<PersonalPage />} style={styles.iconContainer}>
       <Image source={require('../partials/img/profile.png')} style={[styles.icon, styles.iconRight]}/>
     </View>;

     return (
			<View style={styles.container}> 
		        {this.state.selected}
		       	 <View style={styles.fixedFooterSpacer} />
	        		<Tabs selected={this.state.selected} style={[styles.fixedFooterWrapper, styles.footer, styles.footerContainer]}
			          selectedStyle={{}} onSelect={(el) => {
			          	el.props.component && this.setState({selected: el.props.component});
			          }}
			          pressOpacity={1}>
				      {LeftIcon}
			          {EmblemIcon}
			          {RightIcon}
			        </Tabs>

	        </View>
		);
  }
});

const footerHeight = 60;
const iconWidth = height/25;
const iconEmblemWidth = height/15;
const iconEmblemHeight = iconEmblemWidth * 2;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	    backgroundColor: '#F5FCFF',
	},
	fixedFooterSpacer: {height: 40},
    fixedFooterWrapper: {
      position: 'absolute',
      top: height * .9
    },
	footerContainer: {
	   width,
	   height: footerHeight,
	   position: 'absolute',
	 },
	 footer: {
	   flexDirection: 'row',
	   justifyContent: 'center',
	   alignItems: 'center',
	   backgroundColor: 'black',
	   width,
	   height: footerHeight,
	 },
	 footerText: {
	   color: '#fff',
	   fontSize: 22,
	   fontFamily: 'AvenirNextCondensed-Regular'
	 },
	 iconContainer: {
	   flex: 1,
	   flexDirection: 'row',
	   justifyContent: 'center',
	   alignItems: 'center'
	 },
	 icon: {
	   width: iconWidth,
	   height: iconWidth,
	   resizeMode: 'contain',
	   bottom: height/100, // fix: find better way to use flexbox to align
	 },
	 iconLeft: {marginRight: iconOffset},
	 iconRight: {marginLeft: iconOffset},
	 iconEmblemContainer: {
	   width: iconEmblemWidth,
	   height: iconEmblemHeight,
	  //  backgroundColor: 'green'
	 },
	 iconEmblem: {
	   width: iconEmblemWidth,
	   height: iconEmblemHeight,
	   resizeMode: 'contain',
	   position: 'absolute',
	   top: -(height/25)
	 },
	 activeContainer: {
	   width: width / 3,
	   flexDirection: 'row',
	   justifyContent: 'center',
	 },
	 activeIconContainer: {},
	 activeIcon: {
	   width: 28,
	   height: 28,
	   resizeMode: 'contain',
	   transform: [{translateY: -18}]
	 }
});

module.exports = TabBarLayout;
