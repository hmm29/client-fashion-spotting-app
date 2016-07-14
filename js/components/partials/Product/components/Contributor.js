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

import React from 'react';
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
        <View style={styles.profileContainer}>
          <Image source={require('../img/testUser.jpg')} style={styles.profile}/>
        </View>
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
 bodoni: {fontFamily: 'BodoniSvtyTwoITCTT-Book' },
 name: {
   color: 'red',
   fontSize: 25
 }
});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = Contributor;
