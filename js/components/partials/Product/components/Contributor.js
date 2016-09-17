/**
 * Contributor.js
 * Page header element
 *
 * @providesModule Contributor
 * @flow
 */

'use strict'; /* enables JS strict mode for any ES5 code */

/*
* imports required modules
*/

import React, { PropTypes } from 'react';
import {
 Dimensions,
 Image,
 StyleSheet,
 Text,
 TextInput,
 View,
 TouchableOpacity
} from 'react-native';

import Button from 'apsl-react-native-button';
import BlankProfile from '../../img/profile.png';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */



/*
* defines the Contributor class
* this is the code for the contributor profile and name for each product
*/


var Contributor = React.createClass({


  propTypes: {
    navigator: PropTypes.object,
    user: PropTypes.object
  },


  render() {

    const { user } = this.props;
    let username;

    if(user && user.username){
      username = user.username.toUpperCase();
    }
    else {
      username = 'user';
    }

    var ProfileImage = ( user && user.profilePicture)
      ? <Image source={{uri: user.profilePicture}} style={styles.profile}/>
    : <Image source={BlankProfile}
      style={styles.emptyProfile}/>

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {

          // HACK: must lazy load this PersonalPage component
          // because the UserProducts component rendered in the personal page
          // has this Contributor component in it

          const PersonalPage = require('../../../pages/PersonalPage');

          if (this.props.navigator && user && user.name) { // ensure navigator has been passed as prop, and ensure user has a name
            this.props.navigator.push({
              title: 'Personal Page',
              component: PersonalPage,
              passProps: {user}
            });
          }
        }} style={styles.profileContainer}>
          {ProfileImage}
        </TouchableOpacity>
        <Text style={[styles.bodoni, {fontStyle: 'italic'},{bottom: height/180}]}>spotted by</Text>
        <Text style={[styles.name, styles.bodoni, {bottom: height/180}]}>{username}</Text>
      </View>
    );
  }
});

/*
* CSS stylings
*/

const profileRadius = width/14;
const borderWidth = 4;
const innerProfileRadius = profileRadius - borderWidth;
const profileDiameter = profileRadius * 2;
const innerProfileDiameter = innerProfileRadius * 2;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    transform: [{translateY: -(profileRadius)}]
  },
  profileContainer: {
    width: profileDiameter,
    height: profileDiameter,
    borderRadius: profileRadius,
    shadowOffset: {
        width: 0,
        height: 0
    },
    shadowColor: 'black',
    shadowOpacity: .4,
    shadowRadius: 3,
    borderWidth,
    borderColor: 'white',
    marginBottom: 10

  },
 profile: {
   width: innerProfileDiameter,
   height: innerProfileDiameter,
   resizeMode: 'cover',
   borderRadius: innerProfileRadius
 },
 emptyProfile: {
   width: innerProfileDiameter,
   height: innerProfileDiameter,
   resizeMode: 'contain',
   borderRadius: innerProfileRadius,
   backgroundColor: 'black'
 },
 bodoni: {fontFamily: 'BodoniSvtyTwoITCTT-Book' },
 name: {
   color: 'red',
   fontSize: height/38
 }
});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = Contributor;
