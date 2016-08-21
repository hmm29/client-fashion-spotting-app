/**
 * Location.js
 * Page header element
 *
 * @providesModule Location
 * @flow
 */

'use strict'; /* enables JS strict mode for any ES5 code */

/*
* imports required modules
*/

import React from 'react';
import {
 Dimensions,
 StyleSheet,
 View,
 Text,
 Image,
 TouchableOpacity
} from 'react-native';

var {width} = Dimensions.get('window'); /* gets screen dimensions */


/*
* defines the Location class
*/

var Location = React.createClass({

  componentDidMount(){
  },
  handlePress(){
    // lazy load
    const MapPage = require('../../../pages/MapPage');

    this.props.navigator.push({
      title: 'MapPage',
      component: MapPage,
      passProps: {
        products : [this.props.product]
      }
    });
  },

  render() {

    const { product, products } = this.props;

    const store = product.store.name;
    var vicinity = product.store.vicinity;
    if(vicinity.length > 12){
      vicinity = vicinity.slice(0,18) + "..";
    }

    return (
      <View style={styles.container} onPress={this.handlePress}>
        <Text><Text style={styles.italic}>at</Text> {store} /</Text>
        <Text> {vicinity}</Text>
          <TouchableOpacity onPress={this.handlePress}>
          <Image
            style={styles.location}
            onPress={()=>{ this.handlePress()}}
            source={require('../img/location.png')}/>
          </TouchableOpacity>

      </View>
    );
  }
});


/*
* CSS stylings
*/

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderColor: 'black',
    transform: [{translateY: -20}],
  },
  italic: {fontStyle: 'italic'},
  location: {
    width: 15,
    height:15,
    resizeMode: 'contain',
    marginLeft:10,
  }

});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = Location;
