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

import React, { PropTypes, Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import Button from 'apsl-react-native-button';
import EyespotPageBase from '../EyespotPageBase';
import Header from '../../partials/Header';
import FilterBar from '../../partials/FilterBar';
import CategoryView from './components/CategoryView';
import EyespotNegativeLogo from '../../partials/img/eyespot-logo-negative.png';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

/*
 * defines the Featured class
 * this code is for the two-column category component
 */

 var Featured = React.createClass({

   /*
    * render(): returns JSX that declaratively specifies page UI
    */

   render() {

     /* }
     <TouchableOpacity style={styles.featuredApplyBox}>
        <View style={styles.textContainer}>
          <Text style={styles.featuredPanelText}>apply to be a featured contributor</Text>
        </View>
     </TouchableOpacity>
     */

     return (
       <View>
         <View style={styles.featuredPanel}>
           <Image source={require('../../partials/img/test.jpg')} style={styles.featuredPanelImage}/>
           <View style={styles.textContainer}>
             <Text style={styles.panelText}>FEATURED CONTRIBUTOR</Text>
           </View>
         </View>
       </View>
     );
   }
 });

/*
 * defines the DiscoverPage class
 */

var DiscoverPage = React.createClass({

    propTypes: {
      dataStore: PropTypes.object,
      navigator: PropTypes.object
    },


    /*
     * _renderHeader(): renders the imported header component
     */

    _renderHeader() {
        return (
            <Header containerStyle={styles.headerContainer}>
                <View />
                <View style={styles.pageTitle}>
                  <Image source={EyespotNegativeLogo}
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

      // FIXME:
      const filters = [
        {
          'name' : 'Gender',
          dropdown : ['Women', 'Men', 'All'],
        },
        {
          'name' : 'Location',
          dropdown: ['DC']
        },
        {
          name: 'Store',
          dropdown: ['Zara', 'Adidas', 'J Crew']
        },
      ]

        return (
          <View style={styles.layeredPageContainer}>
            {this._renderHeader()}
            <EyespotPageBase
                keyboardShouldPersistTaps={false}
                noScroll={false}>
                <View style={styles.container}>
                  <Featured/>
                  <CategoryView {...this.props} />
                </View>
            </EyespotPageBase>
            <FilterBar filters={filters}/>
          </View>
        );
    }
});

/*
 * CSS stylings
 */

const headerHeight = height / 10
const panelMargin = 5;
const sideMargin = 20;
const panelWidth = (width - panelMargin * 4 - sideMargin * 2) / 2;
const featuredPanelWidth = panelWidth * 2 + panelMargin * 2;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: sideMargin,
        paddingTop: headerHeight
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
      alignItems: 'center'
    },
    featuredPanelText: {
      backgroundColor: 'transparent',
      color: 'white'
    },
    headerContainer: {
      backgroundColor: '#000',
      top: -10
    },
    layeredPageContainer: {flex: 1},
    pageTitle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: height / 200
    },
    pageTitleLogo: {
      alignSelf: 'center',
      backgroundColor: 'transparent',
      width: width / 3.2,
      height: height / 24,
      resizeMode: Image.resizeMode.contain
    },
    pageTitleText: {
      color: '#fff',
      fontSize: height / 40,
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
        color: 'white',
        fontFamily: 'BodoniSvtyTwoITCTT-Book'

    },
    textContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: 'white'
    }
});

/*
 * exports this component as a module so it can be imported into other modules
 */

module.exports = DiscoverPage;
