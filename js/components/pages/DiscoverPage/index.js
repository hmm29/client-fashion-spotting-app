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
  TouchableOpacity
} from 'react-native';

import _ from 'lodash';
import Button from 'apsl-react-native-button';
import EyespotPageBase from '../EyespotPageBase';
import Header from '../../partials/Header';
import FilterBar from '../../partials/FilterBar';
import CategoryView from './components/CategoryView';
import ProductFeed from '../ProductFeed';
import EyespotNegativeLogo from '../../partials/img/eyespot-logo-negative.png';

import firebaseApp from '../../firebase';

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

     /*
     <TouchableOpacity style={styles.featuredApplyBox}>
        <View style={styles.textContainer}>
          <Text style={styles.featuredPanelText}>apply to be a featured contributor</Text>
        </View>
     </TouchableOpacity>
     */

     return (
       <View>
         <TouchableOpacity onPress={this.props.onPress} style={styles.featuredPanel}>
           <Image source={require('../../partials/img/fall-collection.png')} style={styles.featuredPanelImage}/>
         </TouchableOpacity>
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

    getInitialState() {
      return {
        genderFilter : "All",
        locationFilter : "Washington, D.C.",
        storeFilter: "All"
      }
    },

    componentWillMount() {
      let { dataStore } = this.props;
      let results = [];
      let topFiveStores = [];
      dataStore && dataStore.products && Object.values(dataStore.products) && Object.values(dataStore.products).forEach(product => {
        if(product.store && product.store.name && product.store.name.length && results.indexOf(product.store.name) < 0) { // dont duplicate store names in Store dropdown
          results.push(product.store.name);
          topFiveStores.push(product.store.name);
        }
      });
      this.setState({topFiveStores: topFiveStores.slice(0,5)});
    },

    navigateToFallCollection() {
      let { navigator } = this.props;
      let { genderFilter } = this.state;

        navigator.push({
          title: 'ProductFeed',
          component: ProductFeed,
          passProps: {
              tag: "Fall!"
          }
        });

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

    setFilter(type, filterName){
      switch(type) {
        case 'Gender':
          this.setState({ genderFilter : filterName });
          break;
        case 'All':
          this.setState({ historyFilter : filterName });
          break;
        case 'Location':
          this.setState({ locationFilter : filterName });
          break;
        case 'Store':
          this.setState({ storeFilter : filterName });
          break;
      };
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
          dropdown: ['Washington, D.C.']
        },
        {
          name: 'Store',
          dropdown: ['All'].concat(this.state.topFiveStores) // show top 5 stores in addition to All
        },
      ]

        return (
          <View style={styles.layeredPageContainer}>
            {this._renderHeader()}
            <EyespotPageBase
                keyboardShouldPersistTaps={false}
                noScroll={false}>
                <View style={styles.container}>
                  <Featured onPress={this.navigateToFallCollection}/>
                  <CategoryView
                    genderFilter={this.state.genderFilter}
                    locationFilter={this.state.locationFilter}
                    storeFilter={this.state.storeFilter}
                    {...this.props} />
                </View>
            </EyespotPageBase>
            <FilterBar
              genderFilter={this.state.genderFilter}
              locationFilter={this.state.locationFilter}
              filters={filters}
              setFilter={this.setFilter}
              storeFilter={this.state.storeFilter}/>
          </View>
        );
    }
});

/*
 * CSS stylings
 */

const headerHeight = height / 11
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
      bottom: height / 45
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
      width: width / 3.9,
      height: height / 30,
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
