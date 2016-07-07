/**
 * DiscoverPage.js
 * Browse the item catalog
 *
 * @providesModule DiscoverPage
 * @flow
 */
 
'use strict'; /* enable JS strict mode for any ES5 code */

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
  View,
  TouchableOpacity
} from 'react-native';

import Button from 'apsl-react-native-button';
import EyespotPageBase from '../EyespotPageBase';
import Header from '../../partials/Header';
import SearchBar from '../../partials/SearchBar';

var {height, width} = Dimensions.get('window'); /* get screen dimensions */

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
        {this.state.categories.map(function(c, i){
          return (
            <View key={i} style={styles.panel}>
              <Image source={require('./test.jpg')} style={styles.panelImage}/>
              <View style={styles.textContainer}>
                <Text style={styles.panelText}>{c.name}</Text>
              </View>
            </View>
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
            <Header containerStyle={styles.headerContainer} noTitle={true}>
                <BackIcon color='#444' onPress={() => this.props.navigator.pop()} />
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
                noScroll={true}>
                <View style={styles.container}>
                    <View style={styles.section}>
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

const styles = StyleSheet.create({
    categories:{
        flexDirection:'row',
        flexWrap: 'wrap',
        padding: sideMargin
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
 * export the module so it can be imported into other components
 */

module.exports = DiscoverPage;
