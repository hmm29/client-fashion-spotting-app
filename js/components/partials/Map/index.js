/**
 * Map.js
 * Photo collections with grid display
 *
 * @providesModule MapViewContainer
 * @flow
 */

'use strict'; /* enables JS strict mode for any ES5 code */

/*
 * imports required modules
 */

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
import Emblem from '../img/marker.png';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

const washingtonDC = {
  lat: 38.9072,
  lng: -77.0369
}

const Delta = {
  lat: 0.0922,
  lng: 0.0421,
}

/*
 * defines the MapView class
 */

var Map = React.createClass({

  /*
   * specifies types for properties that this component receives
   */

  propTypes: {
    onPressMapEmblem: PropTypes.func,
    products: PropTypes.array
  },

   /*
    * render(): returns JSX that declaratively specifies photo gallery UI
    */

    getInitialState() {
      return {
        region: {
          latitude: washingtonDC.lat,
          longitude: washingtonDC.lng,
          latitudeDelta: Delta.lat,
          longitudeDelta: Delta.lng,
        },
        markers: []
      };
    },

    componentDidMount(){
      // create markers from products' location data
      var markers = this.props.products.map(function(product){

        return {
          latlng: {
            latitude: product.store.location.lat,
            longitude: product.store.location.lng,
            title: product.store.name
          }
        }
      })
      this.setState({ markers : markers });
    },

    onRegionChange(region) {
      this.setState({ region });
    },

    render() {
      return (
        <MapView
          style={styles.map}
          region={this.state.region}
          initialRegion={{
            latitude: washingtonDC.lat,
            longitude: washingtonDC.lng,
            latitudeDelta: Delta.lat,
            longitudeDelta: Delta.lng,
          }}
          onRegionChange={this.onRegionChange}>
          {this.state.markers.map((marker, i) => {
            return (
              <MapView.Marker
                key={i}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
                image={Emblem}
                onPress={this.props.onPressMapEmblem}
              />
            )
          })}
        </MapView>
      )
    }
});

/*
 * CSS stylings
 */

const styles = StyleSheet.create({
  map:{
    width: width,
    height: height
  },
  marker:{
    width: 10,
    height: 10,
  }
});

/*
 * exports this component as a module so it can be imported into other modules
 */

module.exports = Map;
