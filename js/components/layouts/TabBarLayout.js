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

import helpers from '../helpers';
import Tabs from 'react-native-tabs';

let ContributePage = require('../pages/ContributePage');
let DiscoverPage = require('../pages/DiscoverPage');
let PersonalPage = require('../pages/PersonalPage');

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
     if(!this.props.userId) {
       let self = this;
       AsyncStorage.getItem('@MyStore:uid').then((userId) => {
         self.setState({userId})
      });
     }
   },

  /*
   * componentDidMount(): Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
   */

  componentDidMount(){

   /*
    * retrieve data from firebase data store
    */

    // must fetch data after rendering!!
    // important to put this data call in componentDidMount
    var ref = firebaseApp.database().ref();
    var dataStore = {};

    ref.on('value', (snap) => {
      dataStore = snap.val();
      /*
       * set firebase data to component's state
       */

      this.setState({
        dataStore: dataStore,
        loaded: true,
        user: dataStore && dataStore.users && dataStore.users[this.props.userId || this.state.userId]
      });
    });
   },


  	_renderContent() {
	 	   let title = this.state.selected;
       let user = this.state.user;

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
            dataStore={this.state.dataStore}
            navigator={this.props.navigator} />
        )
	    }

	    else if (title === 'personal') {
	      return (
          <PersonalPage
            dataStore={this.state.dataStore}
            navigator={this.props.navigator}
            user={user} />
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
   var { user } = this.state;

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
     <View component='personal' style={[styles.iconContainer, styles.rightIconContainer]}>
       {user && user.notifications && Object.keys(user.notifications) && Object.keys(user.notifications).length ? <View style={styles.badgeContainer}><Text style={styles.badge}>{Object.keys(user.notifications).length}</Text></View> : <Text style={styles.badge}></Text>}
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
                component: ContributePage,
                passProps: {
                  navigator: this.props.navigator
                }
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

const footerHeight = height / 13;
const iconWidth = height/32;
const iconEmblemWidth = height/16;
const iconEmblemHeight = iconEmblemWidth * 2;
const loadingTextFontSize = 12;

const styles = StyleSheet.create({
  badge: {
    width: width/22,
    height: width/21,
    fontSize: height/46,
    borderRadius: width/40,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    padding: width/110,
    right: width/50,
    bottom: height/250,
  },
  badgeContainer: {
    width: width/22,
    height: width/20,
    backgroundColor: 'red',
    borderRadius: width/40,
    backgroundColor: 'red',
    paddingLeft: width/50,
    right: width/50,
    bottom: height/300,
  },
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
   bottom: height/180
 },
 iconEmblemContainer: {
   width: iconEmblemWidth,
   height: iconEmblemHeight,
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   top: height/100
 },
 iconEmblem: {
   width: iconEmblemWidth,
   height: iconEmblemHeight,
   resizeMode: 'contain',
   position: 'absolute',
   top: -(height/25)
 },
 iconRight: {
   right: width/220
 },
 iconLeft: {
   left: width/150
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
 rightIconContainer: {
   flexDirection: 'row',
   justifyContent: 'center',
   right: width/45,
   backgroundColor: 'transparent'
 }
});

module.exports = TabBarLayout;
