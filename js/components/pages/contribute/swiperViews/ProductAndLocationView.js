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
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>ARE YOU HERE?</Text>
				</View>

				<View style={styles.section}>
				<Text style={styles.sectionTitle}>IF NOT, SEARCH FOR THE STORE</Text>

				</View>

				<View style={styles.section}>
				<Text style={styles.sectionTitle}>SPOTTED WHAT:</Text>

				</View>
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
	section: {
		width: width/1.3,
		marginVertical: height/45,
		flexDirection: 'column',
		alignItems: 'flex-start'
	},
	sectionTitle: {

	},
	text: {
		fontFamily: 'Avenir-Roman',
		marginBottom: height/45
	},
});

module.exports = ProductAndLocationView;