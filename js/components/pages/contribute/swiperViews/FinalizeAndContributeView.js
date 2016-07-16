/**
 * FinalizeAndContributeView.js
 * Third page in Contribute swiper
 *
 * @providesModule FinalizeAndContributeView
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

var FinalizeAndContributeView = React.createClass({
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>FINALIZE AND CONTRIBUTE</Text>
			</View>
		);
	}

});

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center', 
		height, 
		width,
	},
	text: {
		fontFamily: 'Avenir-Roman',
	}
});

module.exports = FinalizeAndContributeView;