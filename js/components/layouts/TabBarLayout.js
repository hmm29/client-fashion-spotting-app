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
 ActivityIndicator,
 AsyncStorage,
 Dimensions,
 Image,
 StyleSheet,
 Text,
 TextInput,
 View
} from 'react-native';

import ContributePage from '../pages/ContributePage';
import DiscoverPage from '../pages/DiscoverPage';
import helpers from '../helpers';
import PersonalPage from '../pages/PersonalPage';
import Tabs from 'react-native-tabs';

const firebaseApp = require('../firebase');

function addKeyToProducts(dataStore){
  var product_keys = Object.keys(dataStore.products);
  var products = dataStore.products;
  product_keys.map(function(key){
    products[key]['.key'] = key;
  })
  return products
}

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */
const iconOffset = 40;

function activeArrowOffset(title){
  var activeLeft = 0;

  switch (title){
    case "discover":
      activeLeft = width/3 - iconWidth - iconWidth/2 - iconOffset;
      break;
    case "contribute":
      activeLeft = width/2 - iconWidth/2;
      break;
    case "personal":
      activeLeft = width*2/3 + iconWidth - iconWidth/2 + iconOffset;
      break;
    default:
     activeLeft = width/3 - iconWidth - iconWidth/2 - iconOffset;
      break;
  }
  return activeLeft;
}

var TabBarLayout = React.createClass({
	getInitialState() {
		return {
			selected: 'discover',
      loaded: false,
      users: "",
      dataStore: ""

		}
	},

  /*
   * componentWillMount(): Invoked once, before the initial rendering occurs.
   */

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

  /*
   * componentDidMount(): Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
   */

  componentDidMount(){

   /*
    * retrieve data from firebase data store
    */

    var ref = firebaseApp.database().ref();
    var dataStore = {};

    ref.on('value', (snap) => {
      dataStore = snap.val();
      /*
       * set firebase data to component's state
       */

      this.setState({
        dataStore: dataStore,
        loaded: true
      })
    });

   },


  	_renderContent() {
	 	   let title = this.state.selected;

      if(!this.state.loaded){
        return (
          <View style={styles.centering}>
            <ActivityIndicator animating={true} size='large' style={{padding: 5}} />
            <Text>Loading...</Text>
          </View>
        )
      }

	    if (title === 'discover') {
        return (
          <DiscoverPage
            navigator={this.props.navigator} />
        )
	    }

	    else if (title === 'personal') {
	      return (
          <PersonalPage
            dataStore={this.state.dataStore}
            navigator={this.props.navigator}
            user={this.state.user} />
        )
	    }

      // make Contribute page push onto route stack, instead of appear in tab layout
      // or else footer blocks the next button

	    // else if (title === 'contribute') {
	    // 	return <ContributePage navigator={this.props.navigator} />;
	    // }

	    else {
	     	return <View />;
	    }
  	},

	render() {

   /*
    * position active arrow
    */

   var activeStyle = {};
   activeStyle.left = activeArrowOffset(this.state.selected);

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
    <View component='discover' style={styles.iconContainer}>
       <Image source={require('../partials/img/browse.png')} style={[styles.icon, styles.iconLeft]}/>
    </View>

   /*
    * middle icon - eyespot emblem, goes to contribute page
    */

    var EmblemIcon =
     <View component='contribute' style={styles.iconContainer}>
       <View style={styles.iconEmblemContainer}>
         <Image source={require('../partials/img/emblem.png')} style={styles.iconEmblem}/>
       </View>
     </View>;

   /*
    * right icon - profile icon, goes to personal profile
    * be sure to pass navigator to component for routing
    */

    var RightIcon =
     <View component='personal' style={styles.iconContainer}>
       <Image source={require('../partials/img/profile.png')} style={[styles.icon, styles.iconRight]}/>
     </View>;

     return (
			<View style={styles.container}>
	        {this._renderContent()}
      		<Tabs selected={this.state.selected} style={styles.footer}
	          selectedStyle={{}} onSelect={(el) => {
              if(!el.props.component) return;

              // push route for ContributePage
              if(el.props.component === 'contribute') this.props.navigator.push({
                title: 'ContributePage',
                component: ContributePage
              })
	          	else this.setState({selected: el.props.component});
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
const loadingTextFontSize = 12;

const styles = StyleSheet.create({
  centering: {
    alignSelf: 'center',
    top: height/2.5
  },
	container: {
		flex: 1,
    backgroundColor: 'white',
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
 loadingContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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
