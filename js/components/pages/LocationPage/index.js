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
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import _ from 'lodash';
import BackIcon from '../../partials/icons/navigation/BackIcon';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Header from '../../partials/Header';
import EyespotNegativeLogo from '../../partials/img/eyespot-logo-negative.png';
import EyespotPageBase from '../EyespotPageBase';
import TabBarLayout from '../../layouts/TabBarLayout';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

const google_places_api_key = "AIzaSyBYm4q-9VEPYNT_aSsq7YU1LwHFA5H2TTo";

var LocationPage = React.createClass({

  propTypes: {
    location: PropTypes.object,
  },

  getInitialState(){
    return {
      modalVisible: false,
      places: [],
      placesNames : []
    }
  },

  handleModalVisible(modalVisible) {
    this.setState({modalVisible});
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
    const { location } = this.props;
    const locationString = `${location.lat},${location.lng}`;

    return (
      <View style={styles.layeredPageContainer} onPress={() => this.setState({modalVisible: false})}>
        {this._renderHeader()}
        <EyespotPageBase
          keyboardShouldPersistTaps={false}
          noScroll={false}>
          <View style={{paddingTop: height/40}}>
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={1} // minimum length of text to search
            autoFocus={false}
            fetchDetails={true}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              if(!(data && details)) {
                this.handleModalVisible(true);
              } else {
                this.props.setStore(details);
                this.props.navigator.pop();
              }
            }}
            getDefaultValue={() => {
              return ''; // text input default value
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: google_places_api_key,
              language: 'en', // language of the results,
              location: locationString,
              radius: 50000,
              types: 'establishment', // default: 'geocode'
            }}
            styles={{
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}

            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
              types: 'clothing_store',
            }}


            // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

            predefinedPlaces={[]}
          />
          </View>
        </EyespotPageBase>
        <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modalVisible}
            >
            <TouchableOpacity onPress={() => this.setState({modalVisible: false})} style={{width, height}}>
            <Text style={styles.modalText}>Sorry, we can’t find the location on Google Map of where you’ve spotted this item. Please try a different search.</Text>
            </TouchableOpacity>
            </Modal>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  section: {
    marginTop: 10
  },
  headerContainer: {
    backgroundColor: '#000',
    top: -10
  },
  layeredPageContainer: {flex: 1},
  modalText: {
    top: height/2.5,
    marginHorizontal: width/8,
    backgroundColor: 'white',
    padding: 50,
    borderColor: 'black',
    borderWidth: 1
  },
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
})

module.exports = LocationPage;
