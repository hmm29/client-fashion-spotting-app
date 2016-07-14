/**
 * ProductAndLocationView.js
 * Second page in Contribute swiper
 *
 * @providesModule ProductAndLocationView
 * @flow
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

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

var ProductAndLocationView = React.createClass({
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>PRODUCT AND LOCATION</Text>
			</View>
		);
	}

});

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center', 
		height, 
		width,
	},
	text: {
		bottom: 100,
		fontFamily: 'Avenir-Roman',
	}
});

module.exports = ProductAndLocationView;