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


 import Swiper from 'react-native-swiper';

 var NUMBER_OF_SWIPER_VIEWS = 5;
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
               style={styles.wrapper}
               bounces={false}
               showsPagination={false}
               loop={false}>
               <View style={styles.slide}>
                 <Image source={require('./img/onboarding-1.jpg')} style={styles.img} />
               </View>
               <View style={styles.slide}>
                 <Image source={require('./img/onboarding-2.jpg')} style={styles.img} />
               </View>
               <View style={styles.slide}>
                 <Image source={require('./img/onboarding-3.jpg')} style={styles.img} />
               </View>
               <View style={styles.slide}>
                 <Image source={require('./img/onboarding-4.jpg')} style={styles.img} />
               </View>
               <View style={styles.slide}>
                 <Image source={require('./img/onboarding-5.jpg')} style={styles.img} />
               </View>
       </Swiper>
     )

 		return (
          <EyespotPageBase
              keyboardShouldPersistTaps={false}
              noScroll={true}>
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
      flex: 1,
      height,
      width
    },
   slide: {
     backgroundColor: 'transparent',
     paddingTop: height/19
   },
   wrapper: {
     backgroundColor: '#fff'
   }
 });

 module.exports = OnboardingPage;
