/**
 * DiscoverPage.js
 * Browse the item catalog
 *
 * @providesModule DiscoverPage
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
  View,
  TouchableOpacity
} from 'react-native';

import Button from 'apsl-react-native-button';
import EyespotPageBase from '../EyespotPageBase';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import SearchBar from '../../partials/SearchBar';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

/*
 * defines the Categories class
 * this code is for the two-column category component
 */

 var Featured = React.createClass({

   /*
    * getInitialState(): returns object with initialized component state variables
    */

   getInitialState() {
     return {
     }
   },

   /*
    * render(): returns JSX that declaratively specifies page UI
    */

   render(){


     return (
       <View>
         <View style={styles.featuredPanel}>
           <Image source={require('./test.jpg')} style={styles.featuredPanelImage}/>
           <View style={styles.textContainer}>
             <Text style={styles.panelText}>FEATURED CONTRIBUTOR</Text>
           </View>
           <TouchableOpacity style={styles.featuredApplyBox}>
              <View style={styles.textContainer}>
                <Text style={styles.featuredPanelText}>apply to be a featured contributor</Text>
              </View>
           </TouchableOpacity>
         </View>
       </View>
     )
   }
 })


/*
 * defines the Categories class
 * this code is for the two-column category component
 */

var Categories = React.createClass({

  /*
   * getInitialState(): returns object with initialized component state variables
   */

  getInitialState() {
    return {
      categories : [
        {
          'name' : 'ALL',
          'imgUrl' : './test.jpg'
        },
        {
          'name' : 'SHOE',
          'imgUrl' : './test.jpg'
        },
        {
          'name' : 'SKIRT',
          'imgUrl' : './test.jpg'
        },
        {
          'name' : 'DRESS',
          'imgUrl' : './test.jpg'
        },
        {
          'name' : 'BAG',
          'imgUrl' : './test.jpg'
        },
        {
          'name' : 'BLOUSE',
          'imgUrl' : './test.jpg'
        },
        {
          'name' : 'COAT',
          'imgUrl' : '../../../../../assets/images/test.jpg'
        }
      ]
    }
  },

  /*
   * render(): returns JSX that declaratively specifies page UI
   */

  render(){

    /*
     * FIXME: get jpegs for product images
     */

    return (
      <View style ={styles.categories}>
        <Featured/>
        {this.state.categories.map(function(c, i){
          return (
            <TouchableOpacity key={i} style={styles.panel}>
              <Image source={require('./test.jpg')} style={styles.panelImage}/>
              <View style={styles.textContainer}>
                <Text style={styles.panelText}>{c.name}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
})

/*
 * defines the DiscoverPage class
 */

var DiscoverPage = React.createClass({

    /*
     * getInitialState(): returns object with initialized component state variables
     */

    getInitialState() {
        return {

        }
    },

    /*
     * specifies types for properties that this component receives
     */

    propTypes: {

    },

    /*
     * _renderHeader(): renders the imported header component
     */

    _renderHeader() {
        return (
            <Header containerStyle={styles.headerContainer}>
                <View />
                <View style={styles.pageTitle}>
                  <Image source={require('./eyespot-logo-negative.png')} 
                                  style={styles.pageTitleLogo} />
                    <Text style={styles.pageTitleText}>Discover</Text>
                </View>
                <View />
            </Header>
        );
    },

    /*
     * render(): returns JSX that declaratively specifies page UI
     */

    render() {
        return (
            <EyespotPageBase
                keyboardShouldPersistTaps={false}
                noScroll={false}>
                <View style={styles.container}>
                    {this._renderHeader()}
                    <View>
                      <Categories/>
                      <SearchBar/>
                    </View>
                </View>
            </EyespotPageBase>
        );
    }
});

/*
 * CSS stylings
 */

const panelMargin = 5;
const sideMargin = 20;
const panelWidth = (width - panelMargin * 4 - sideMargin * 2)/2;
const featuredPanelWidth = panelWidth * 2 + panelMargin * 2;

const styles = StyleSheet.create({
    categories:{
        flexDirection:'row',
        flexWrap: 'wrap',
        padding: sideMargin
    },
    featuredPanel: {
      width: featuredPanelWidth,
      height: panelWidth,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: panelMargin
    },
    featuredPanelImage: {
      width: featuredPanelWidth,
      height: panelWidth,
      position: 'absolute',
      top: 0
    },
    featuredApplyBox: {
      position: 'absolute',
      bottom: 20,
      width: featuredPanelWidth,
      paddingHorizontal: 20,
      flexDirection: 'column',
      alignItems: 'center',
    },
    featuredPanelText: {
      backgroundColor: 'transparent',
      color: 'white'
    },
    headerContainer: {
      backgroundColor: '#000',
      top: -30
    },
    pageTitle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: height/200
    },
    pageTitleLogo: {
      alignSelf: 'center',
      backgroundColor: 'transparent',
      width: width/3.2,
      height: height/24,
      resizeMode: Image.resizeMode.contain
    },
    pageTitleText: {
      color: '#fff',
      fontSize: height/40,
      fontFamily: 'BodoniSvtyTwoITCTT-Book'

    },
    panel: {
        width: panelWidth,
        height: panelWidth,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: panelMargin
    },
    panelImage: {
        width: panelWidth,
        height: panelWidth,
        position: 'absolute',
        top: 0
    },
    panelText: {
        fontSize: 20,
        backgroundColor: 'transparent',
        color: 'white'
    },
    textContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: 'white'
    }
})

/*
 * exports this component as a module so it can be imported into other modules
 */

module.exports = DiscoverPage;
