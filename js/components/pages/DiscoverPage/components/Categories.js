/**
 * Categories.js
 * Browse the item catalog
 *
 * @providesModule Categories
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

import CategoryFeed from '../../ProductFeed';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function productsInCategory(category, dataStore){

  const categories = dataStore.categories;
  const products = dataStore.products;

  var productsArr = [];

  // get product_ids in category
  var products_in_category = categories[category.key];

  if(products_in_category){
    var product_ids = Object.keys(products_in_category);

    // get product info using product_id
    product_ids.map((id, i) => {
      productsArr.push(products[id]);
    });
  }

  // return product info
  return productsArr
}

var Panel = React.createClass({

  propTypes: {
    dataStore: PropTypes.object,
    navigator: PropTypes.object
  },


  render(){


    let { navigator, category, dataStore } = this.props;

    // get products in this panel's category
    const catProducts = productsInCategory(category, dataStore);

    return (
      <TouchableOpacity
        style={styles.panel}
        onPress={() => navigator.push({
          title: 'CategoryFeed',
          component: CategoryFeed,
          passProps: {
              products: catProducts,
              dataStore : dataStore,
              categoryKey: category.key && category.key.capitalize()
          }
        })}
        >
        <Image source={require('../test.jpg')} style={styles.panelImage}/>
        <View style={styles.textContainer}>
          <Text style={styles.panelText}>{category.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
})


/*
 * defines the Categories class
 * this is the code for the two-column category component
 */

var Categories = React.createClass({

  propTypes: {
    dataStore: PropTypes.object,
    navigator: PropTypes.object
  },

  /*
   * getInitialState(): returns object with initialized component state variables
   */

  getInitialState() {
    return {
      categories: [
        {
          'name': 'ALL',
          'key': 'all',
          'imgUrl': './test.jpg'
        },
        {
          'name': 'SHOE',
          'key': 'shoes',
          'imgUrl': './test.jpg'
        },
        {
          'name': 'SKIRT',
          'key': 'skirt',
          'imgUrl': './test.jpg'
        },
        {
          'name': 'DRESS',
          'key': 'dress',
          'imgUrl': './test.jpg'
        },
        {
          'name': 'BAG',
          'key': 'bag',
          'imgUrl': './test.jpg'
        },
        {
          'name': 'BLOUSE',
          'key': 'blouse',
          'imgUrl': './test.jpg'
        },
        {
          'name': 'COAT',
          'key': 'coat',
          'imgUrl': '../../../../../assets/images/test.jpg'
        }
      ]
    };
  },

  /*
   * specifies types for properties that this component receives
   */

   propTypes: {
    navigator: React.PropTypes.object
   },

  /*
   * render(): returns JSX that declaratively specifies page UI
   */

  render() {

    /*
     * FIXME: get jpegs for product images
     */

    return (
      <View style={styles.categories}>
        {this.state.categories.map(function(c, i) {
          return (
            <Panel key={i} category={c} {...this.props}/>
          )
        },this)}
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

module.exports = Categories;
