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

var TabBarLayout = React.createClass({
	getInitialState() {
		return {
			selected: 'discover'
		}
	},

	_renderContent() {
	 	let title = this.state.selected;

	    if (title === 'discover') {
	      return <DiscoverPage navigator={this.state.navigator} />;
	    }

	    else if (title === 'personal') {
	      return <PersonalPage navigator={this.state.navigator} />;
	    }

	    else {
	      return <View />;
	    }
  };

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
	    * active arrow, appears under active page
	    */

	    var activeArrow = 
	     <View style={[styles.activeContainer, activePadding]}>
	          <View style={[styles.activeIconContainer, {marginRight: iconOffset/2}]}>
	            <Image source={require('../partials/img/active.png')} style={styles.activeIcon}/>
	          </View>
	        </View>;

	   /*
	    * left icon, goes to discover page
	    * be sure to pass navigator to component for routing
	    */

	    var LeftIcon =
	    <View title='DiscoverPage' component={<DiscoverPage navigator={this.props.navigator} />} style={styles.iconContainer}>
	       <Image source={require('../partials/img/browse.png')} style={[styles.icon, styles.iconLeft]}/>
	     {activeArrow}
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
	       <View style={[{marginLeft: iconOffset/2, width: 28, height: 28}]} />
	     </View>;

	     return (
				<View style={styles.container}> 
			        {this._renderContent()}
			       	 <View style={styles.fixedFooterSpacer} />
		        		<Tabs selected={this.state.selected} style={[styles.fixedFooterWrapper, styles.footer, styles.footerContainer]}
				          selectedStyle={{}} onSelect={(el) => {
				          	el.props.component && this.setState({selected: el.props.component, selectedTitle: el.props.title});
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
const iconWidth = height/28;
const iconEmblemWidth = height/18;
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
	   flexDirection: 'column',
	   justifyContent: 'center',
	   alignItems: 'center',
	 },
	 icon: {
	   width: iconWidth,
	   height: iconWidth,
	   resizeMode: 'contain',
	   top: height/100, // fix: find better way to use flexbox to align
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
	   flexDirection: 'row',
	   justifyContent: 'center',
	 },
	 activeIconContainer: {
	 },
	 activeIcon: {
	   width: 28,
	   height: 28,
	   resizeMode: 'contain',
	   transform: [{translateY: 3}]
	 }
});

module.exports = TabBarLayout;
