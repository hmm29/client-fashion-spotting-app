/**
 * CategoryView.js
 * Browse the item catalog
 *
 * @providesModule CategoryView
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

import ProductFeed from '../../ProductFeed';
import Categories from '../../../partials/categories';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

var move = function(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};


var Panel = React.createClass({

  propTypes: {
    navigator: PropTypes.object,
    category_key: PropTypes.string
  },

  render(){

    let { navigator, category_key, genderFilter, locationFilter, storeFilter } = this.props;

    const category = Categories.categoryThumbMap[category_key];
    const thumbImg = category.thumb;
    const name = category.name;
    if(genderFilter.toLowerCase() != category.gender){
      if(genderFilter != "All"){
        return null
      }
    }


    return (
      <TouchableOpacity
        style={styles.panel}

        onPress={() => navigator.push({
          title: 'ProductFeed',
          component: ProductFeed,
          passProps: {
              categoryKey: category_key,
              categoryName: name,
              storeName: (storeFilter !== 'All' ? storeFilter : undefined)
          }
        })}>
        <Image source={thumbImg} style={styles.panelImage}/>
      </TouchableOpacity>
    );
  }
})


/*
 * defines the CategoryView class
 * this is the code for the two-column category component
 */

var CategoryView = React.createClass({


  /*
   * specifies types for properties that this component receives
   */

  propTypes: {
    genderFilter: PropTypes.string,
    locationFilter: PropTypes.string,
    storeFilter: PropTypes.string,
    navigator: PropTypes.object
  },

  orderCategoryKeys(categoryKeys) {
    let { genderFilter } = this.props;
    if(genderFilter === 'Men' || genderFilter === 'All') {
      // move others category to the end
      move(categoryKeys, categoryKeys.indexOf('other_m'), categoryKeys.length-1)
    }

    if(genderFilter === 'Women') {
      // move bags to the end
      move(categoryKeys, categoryKeys.indexOf('bags_w'), categoryKeys.length-1)
    }

    return categoryKeys;
  },


  /*
   * render(): returns JSX that declaratively specifies page UI
   */

  render() {

    var orderedCategoryKeys = this.orderCategoryKeys(Categories.categoryKeys);

    return (
      <View style={styles.categories}>
        {orderedCategoryKeys && orderedCategoryKeys.map(function(category_key, i) {
          return (
            <Panel
              key={i}
              category_key={category_key}
              genderFilter={this.props.genderFilter}
              {...this.props}/>
          )
        }, this)}
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

const styles = StyleSheet.create({
    categories: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap'
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

module.exports = CategoryView;
