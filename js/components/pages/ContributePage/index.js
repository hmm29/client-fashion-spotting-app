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
import uploadNewProduct from './helpers/upload.js';

var NUMBER_OF_SWIPER_VIEWS = 3;
var SWIPER_REF = 'ContributePageSwiper'
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
          currentSwiperPageIndex: 0,
          showNextButton: false,
          imageData: {imgSource:{}},
          productAndLocationData: {store:{}},
          finalizeAndContributeData: ""
        }
    },

    navigateBack() {
      if(this.state.currentSwiperPageIndex > 0) {
        this.refs[SWIPER_REF].scrollBy(-1);
        this.setState({
            currentSwiperPageIndex: this.state.currentSwiperPageIndex-1,
            showNextButton: true
          });
      } else {
        this.props.navigator.pop();
      }
    },

    updateUploadData(type, data) {

      switch (type) {
        case "imageView":
          this.setState({ imageData :  data });
          break;
        case "productAndLocationView":
          this.setState({ productAndLocationData :  data });
          break;
        case "finalizeAndContributeView":
          this.setState({ finalizeAndContributeData :  data });
          break;
        default:
          break;
      }

    },

   /*
    * handleShowNextButton(): shows the "NEXT" button depending on state in swiper views
    * @param (Boolean) showNextButton: whether or not to show the button to proceed
    * @param (String) buttonText: text on the bottom button
    * @param (Function) func: callback function
    */

    handleShowNextButton(showNextButton, buttonText=null, func=null) {
      this.setState({showNextButton: !!showNextButton});
      if(buttonText) this.setState({buttonText});
      if(func) this.setState({onPressButton: func});
    },

   /*
    * _renderHeader(): renders the imported header component
    */

   _renderHeader() {
       return (
           <Header containerStyle={styles.headerContainer}>
           	 <BackIcon color='white' onPress={this.navigateBack} />
	           <Text style={styles.pageTitleText}>CONTRIBUTE</Text>
             <View />
           </Header>
       );
   },

    /*
     * render(): returns JSX that declaratively specifies page UI
     */

  upload(){

    uploadNewProduct(
      this.state.imageData,
      this.state.productAndLocationData,
      this.state.finalizeAndContributeData
    );
  },

	render() {

    var confirmButton;

    if(this.state.currentSwiperPageIndex == 2){
      confirmButton =
        <TouchableOpacity
          onPress={() => {
            this.upload();
            this.props.navigator.pop();
          }}
          style={[styles.footerContainer]}>
            <View style={styles.footer}>
            <Text style={styles.footerText}>{"CONTRIBUTE"}</Text>
            </View>
        </TouchableOpacity>;
    }

    const nextButton =
    <TouchableOpacity
      onPress={() => {
        // check current index or page number in swiper
        if (this.state.currentSwiperPageIndex < NUMBER_OF_SWIPER_VIEWS-1) {
          this.refs[SWIPER_REF].scrollBy(1);
          this.setState({
            currentSwiperPageIndex: this.state.currentSwiperPageIndex+1,
            showNextButton: false
          });
        } else if (this.state.currentSwiperPageIndex === NUMBER_OF_SWIPER_VIEWS-1) {
          // call function passed to final button
          this.state.onPressButton && this.state.onPressButton();
        }
      }}
      style={[styles.footerContainer]}>
        <View style={styles.footer}>
        <Text style={styles.footerText}>{(this.state.buttonText || "NEXT").toUpperCase()}</Text>
        </View>
    </TouchableOpacity>;

    const swiper = (
      <Swiper ref={SWIPER_REF}
              //index={2}
              style={styles.wrapper}
              bounces={false}
              scrollEnabled={false} // prevent touch scrolling
              dot={<View style={{backgroundColor:'#ccc', width: 13,
                        height: 13,borderRadius: 7, top: height / 30, marginLeft: 7, marginRight: 7}} />}
              activeDot={<View style={{backgroundColor: '#000', width: 13, height: 13,
                        borderRadius: 7, top: height / 30, marginLeft: 7, marginRight: 7}} />}
              paginationStyle={{top: -(height/1.02)}}
              loop={false}>
              <View style={styles.slide}>
                <AddImageView
                  updateUploadData={this.updateUploadData}
                  handleShowNextButton={this.handleShowNextButton} />
              </View>
              <View style={styles.slide}>
                <ProductAndLocationView
                  navigator={this.props.navigator}
                  updateUploadData={this.updateUploadData}
                  handleShowNextButton={this.handleShowNextButton}/>
              </View>
              <View style={styles.slide}>
                <FinalizeAndContributeView
                  imageData={this.state.imageData}
                  productAndLocationData={this.state.productAndLocationData}
                  updateUploadData={this.updateUploadData}
                  handleShowNextButton={this.handleShowNextButton}/>
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
            {this.state.showNextButton ? nextButton : null}
            {confirmButton}
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
      fontSize: height / 36,
      fontFamily: 'BodoniSvtyTwoITCTT-Book'
  },
  slide: {
    backgroundColor: 'transparent',
    paddingTop: height/19
  },
  wrapper: {
    backgroundColor: '#fff'
  }
});

module.exports = ContributePage;
