
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
 View,
 TouchableOpacity
} from 'react-native';

import Button from 'apsl-react-native-button';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

var Contributor = React.createClass({

  render() {

    const { product } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {

          // HACK: must lazy load this PersonalPage component
          // because the UserProducts component rendered in the personal page 
          // has this Contributor component in it

          const PersonalPage = require('../../../pages/personal/PersonalPage');

          if (this.props.navigator) { // ensure navigator has been passed as prop
            this.props.navigator.push({
                title: 'Personal Page',
                component: PersonalPage
              });
          }
        }} style={styles.profileContainer}>
          <Image source={require('../img/testUser.jpg')} style={styles.profile}/>
        </TouchableOpacity>
        <Text style={[styles.bodoni, {fontStyle: 'italic'}]}>spotted by</Text>
        <Text style={[styles.name, styles.bodoni]}>{product.user.username.toUpperCase()}</Text>
      </View>
    );
  }
});

/*
* CSS stylings
*/

const profileRadius = 30;
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
        height: 0,
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
   borderRadius: innerProfileRadius,
 },
 bodoni: {fontFamily: 'BodoniSvtyTwoITCTT-Book' },
 name: {
   color: 'red',
   fontSize: 25,
 }
});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = Contributor;
