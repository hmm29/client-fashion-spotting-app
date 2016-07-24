/**
* LocationPage.js
* Reusable search bar with dropdown & autocomplete
*
* @providesModule LocationPage
* @flow
*/

import React, { PropTypes } from 'react';

import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import BackIcon from '../../partials/icons/navigation/BackIcon';
import PlacesAutocomplete from '../../partials/PlacesAutocomplete';
import PlacesNearby from '../../partials/PlacesNearby';
import Header from '../../partials/Header';
import EyespotNegativeLogo from '../../partials/img/eyespot-logo-negative.png';
import EyespotPageBase from '../EyespotPageBase';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

const google_places_api_key = "AIzaSyBYm4q-9VEPYNT_aSsq7YU1LwHFA5H2TTo";

var LocationPage = React.createClass({

  propTypes: {
    location: PropTypes.object,
  },

  getInitialState(){
    return {
      places: [],
      placesNames : []
    }
  },

  fetchData(callback){
    const { location } = this.props;
    const locationString = `${location.lat},${location.lng}`;
    var endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationString}&radius=500&types=clothing_store&key=${google_places_api_key}`;
    fetch(endpoint)
     .then((response) => response.json())
     .then((responseJson) => {
       callback(responseJson);
       return responseJson;
     })
     .catch((error) => {
       console.error(error);
     });
  },

  componentDidMount(){
    var self = this;
    this.fetchData(function(response){
      var placesNames = response.results.map(function(r, i){
        return r.name
      })
      self.setState({
        places : response.results,
        placesNames : placesNames
      });
    })
  },

  /*
   * _renderHeader(): renders the imported header component
   */

  _renderHeader() {
      return (
        <Header containerStyle={styles.headerContainer}>
          <BackIcon color='white' onPress={() => this.props.navigator.pop()} />
          <View style={styles.pageTitle}>
              <Text style={styles.pageTitleText}>CONTRIBUTE</Text>
          </View>
          <View />
        </Header>
      );
  },

  render(){
    nextButton =
      <TouchableOpacity
        onPress={() => {
          this.props.navigator.pop();
        }}
        style={[styles.footerContainer]}>
          <View style={styles.footer}>
          <Text style={styles.footerText}>{"NEXT"}</Text>
          </View>
      </TouchableOpacity>;

    return (
      <View style={styles.layeredPageContainer}>
        {this._renderHeader()}
        <EyespotPageBase
          keyboardShouldPersistTaps={false}
          noScroll={false}>
          <PlacesAutocomplete
            myLocation={this.props.location}
            places={this.state.places}
            navigator={this.props.navigator}
            setStore={this.props.setStore}/>
        </EyespotPageBase>
        {/*}<View style={styles.fixedFooterWrapper}>
           {nextButton}
        </View>*/}
      </View>
    )
  }
})

const footerHeight = 60;

const styles = StyleSheet.create({
  section: {
    marginTop: 10
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


})

module.exports = LocationPage;
