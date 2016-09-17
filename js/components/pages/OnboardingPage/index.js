/**
 * OnboardingPage.js
 * Onboarding sequence for new users
 *
 * @providesModule OnboardingPage
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
   TouchableOpacity,
   View
 } from 'react-native';

 import EyespotPageBase from '../EyespotPageBase';
 import LoginPage from '../LoginPage';
 import Swiper from 'react-native-swiper';

 var NUMBER_OF_SWIPER_VIEWS = 4;
 var SWIPER_REF = 'OnboardingPageSwiper'
 var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

 /*
  * defines the OnboardingPage class
  */

 var OnboardingPage = React.createClass({
     /*
      * getInitialState(): returns object with initialized component state variables
      */

     getInitialState() {
         return {
           currentSwiperPageIndex: 0,
           showNextButton: false,
           imageData: {imgSource:{}},
           productAndLocationData: {store:{}},
           finalizeAndContributeData: ""
         }
     },

 	render() {

     const swiper = (
       <Swiper ref={SWIPER_REF}
               //index={2}
               snapToAlignment='center'
               style={styles.wrapper}
               bounces={false}
               showsPagination={false}
               loop={false}>
               <View style={styles.slide}>
                 <Image source={require('./img/onboarding-1.png')} style={styles.img} />
               </View>
               <View style={styles.slide}>
                 <Image source={require('./img/onboarding-2.png')} style={styles.img} />
               </View>
               <View style={styles.slide}>
                 <Image source={require('./img/onboarding-3.png')} style={styles.img} />
               </View>
               <View style={styles.slide}>
                 <Image source={require('./img/onboarding-4.png')} style={styles.img} />
               </View>
               <View style={styles.slide}>
                 <Image source={require('./img/onboarding-5.png')} style={styles.img} />
               </View>
               <View style={styles.slide}>
                 <LoginPage navigator={this.props.navigator} />
               </View>
       </Swiper>
     )

 		return (
          <EyespotPageBase
              keyboardShouldPersistTaps={false}
              noScroll={true}
              style={{marginBottom: 0, paddingBottom: 0}}>
              <View style={styles.container}>
               {swiper}
               </View>
          </EyespotPageBase>
     );
 	}
 });

 /*
  * CSS stylings
  */

 const footerHeight = 60;

 const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    img: {
      height: height / 1.01,
      width,
      resizeMode: Image.resizeMode.cover,
    },
   slide: {
     backgroundColor: 'transparent',
     paddingTop: height/19,
     width,
     height,
   },
   wrapper: {
     height: height * 1.01,
     backgroundColor: '#fff',
     bottom: height/32.5,
   }
 });

 module.exports = OnboardingPage;
