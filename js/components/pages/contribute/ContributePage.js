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
  Image,
  StyleSheet,
  Text, 
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import AddImageView from './swiperViews/AddImageView';
import BackIcon from '../../partials/icons/navigation/BackIcon';
import EyespotPageBase from '../EyespotPageBase';
import FinalizeAndContributeView from './swiperViews/FinalizeAndContributeView';
import Footer from '../../partials/Footer';
import Header from '../../partials/Header';
import ProductAndLocationView from './swiperViews/ProductAndLocationView';
import Swiper from 'react-native-swiper';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

var BottomButton = React.createClass({
     render() {
     return (
        <TouchableOpacity style={[styles.footerContainer]}>
        <View style={styles.footer}>
        <Text style={styles.footerText}>NEXT</Text>
        </View>
        </TouchableOpacity>
     );
   }
})

/* 
 * defines the ContributePage class 
 */

var ContributePage = React.createClass({
    /* 
     * getInitialState(): returns object with initialized component state variables
     */

    getInitialState() {
        return {

        }
    },

   /*
    * _renderHeader(): renders the imported header component
    */

   _renderHeader() {
       return (
           <Header containerStyle={styles.headerContainer}>
           	 <BackIcon color='white' onPress={() => this.props.navigator.pop()} />
	           <Text style={styles.pageTitleText}>CONTRIBUTE</Text>
             <View />
           </Header>
       );
   },

    /* 
     * render(): returns JSX that declaratively specifies page UI 
     */

	render() {
    const swiper = (
      <Swiper style={styles.wrapper}
                      dot={<View style={{backgroundColor:'#ccc', width: 13,
                                height: 13,borderRadius: 7, top: height / 30, marginLeft: 7, marginRight: 7}} />}
                      activeDot={<View style={{backgroundColor: '#000', width: 13, height: 13,
                                borderRadius: 7, top: height / 30, marginLeft: 7, marginRight: 7}} />}
                      paginationStyle={{top: -(height/1.02)}}
                      loop={false}>
                <View style={styles.slide}>
                  <AddImageView />
                </View>
                <View style={styles.slide}>
                  <ProductAndLocationView />
                </View>
                <View style={styles.slide}>
                  <FinalizeAndContributeView />
                </View>
              </Swiper>
    )

		return (
    <View style={styles.layeredPageContainer}>
         {this._renderHeader()}
         <EyespotPageBase
             keyboardShouldPersistTaps={false}
             noScroll={true}>
             <View style={styles.container}>
              {swiper}
              </View>
         </EyespotPageBase>
         <View style={styles.fixedFooterSpacer} />
         <View style={styles.fixedFooterWrapper}>
            <BottomButton />
         </View>
       </View>
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
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: null,
    height: null
  },
  fixedFooterSpacer: {height: 60},
  fixedFooterWrapper: {
    position: 'absolute',
    top: height * 1.27
  },
   footerContainer: {
   width,
   height: footerHeight,
   position: 'absolute',
   bottom: 200,
 },
 footer: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'black',
   width,
   height: footerHeight,

 },
 footerText: {
   color: '#fff',
   fontSize: height / 40,
   fontFamily: 'Avenir-Roman',
   letterSpacing: 2
 },
	headerContainer: {
      backgroundColor: '#000',
      top: -10
    },
   image: {
    },
    layeredPageContainer: {flex: 1},
  	pageTitleText: {
        color: '#fff',
        fontSize: height / 40,
        fontFamily: 'BodoniSvtyTwoITCTT-Book'
    },
    slide: {
      backgroundColor: 'transparent'
    },
    wrapper: {
      backgroundColor: '#fff'
    }
});

module.exports = ContributePage;



