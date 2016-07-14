/**
 * ContributePage.js
 * Post about spotted items
 *
 * @providesModule ContributePage
 * @flow
 */

'use strict'; /* enables JS strict mode for any ES5 code */

/* 
 * import modules 
 */

import React, { Component } from 'react'; 
import {
  Dimensions,
  StyleSheet,
  Text, 
  TextInput,
  View
} from 'react-native';

import BackIcon from '../../partials/icons/navigation/BackIcon';
import EyespotPageBase from '../EyespotPageBase';
import Header from '../../partials/Header';
import Swiper from 'react-native-swiper';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

/* 
 * defines the ContributePage class 
 */

var ContributePage = React.createClass({
    /* 
     * getInitialState(): returns object with initialized component state variables
     */

    getInitialState() {
        return {
            emailAddressText: '',
            nameText: '',
            nicknameText: '',
            passwordText: '',
        }
    },

   /*
    * _renderHeader(): renders the imported header component
    */

   _renderHeader() {
       return (
           <Header containerStyle={styles.headerContainer}>
           	 <BackIcon color='#444' onPress={() => this.props.navigator.pop()} />
	         <Text style={styles.pageTitleText}>CONTRIBUTE</Text>
             <View />
           </Header>
       );
   },

    /* 
     * render(): returns JSX that declaratively specifies page UI 
     */

	render() {
		return (
			<View style={styles.layeredPageContainer}>
           {this._renderHeader()}
           <EyespotPageBase
               keyboardShouldPersistTaps={false}
               noScroll={false}>
               <View style={styles.container}>
                 
               </View>
           </EyespotPageBase>
         </View>		
        );
	}
});

/*
 * CSS stylings
 */

const styles = StyleSheet.create({
	headerContainer: {
      backgroundColor: '#000',
      top: -10
    },
    layeredPageContainer: {flex: 1},
	pageTitleText: {
      color: '#fff',
      fontSize: height / 40,
      fontFamily: 'BodoniSvtyTwoITCTT-Book'
    }
});

module.exports = ContributePage;



