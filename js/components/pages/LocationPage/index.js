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
import PlacesAutocomplete from '../../partials/PlacesAutocomplete';
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

  fetchData(callback){
    const self = this;
    const { location } = this.props;
    const locationString = `${location.lat},${location.lng}`;
    var endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationString}&radius=1000&rankby=prominence&type=clothing_store&key=${google_places_api_key}`;
    fetch(endpoint)
     .then((response) => response.json())
     .then((responseJson) => {
       callback(responseJson)
       return responseJson;
     })
     .then((responseJson) => {
        var endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationString}&radius=2000&type=department_store&key=${google_places_api_key}`;
        fetch(endpoint)
          .then((response) => response.json())
          .then((responseJson) => {
            self.setState({
              places: self.state.places.concat(responseJson.results),
              placesNames: self.state.placesNames.concat(responseJson.results.map(p => p.name))
            })
            return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
     })
     .then((responseJson) => {
        var endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationString}&radius=3000&type=shopping_mall&key=${google_places_api_key}`;
        fetch(endpoint)
          .then((response) => response.json())
          .then((responseJson) => {
            self.setState({
              places: self.state.places.concat(responseJson.results),
              placesNames: self.state.placesNames.concat(responseJson.results.map(p => p.name))
            })
            return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
     })
     .then((responseJson) => {
        var endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationString}&radius=4000&type=shoe_store&key=${google_places_api_key}`;
        fetch(endpoint)
          .then((response) => response.json())
          .then((responseJson) => {
            self.setState({
              places: self.state.places.concat(responseJson.results),
              placesNames: self.state.placesNames.concat(responseJson.results.map(p => p.name))
            })
            return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
     })
     .then((responseJson) => {
        var endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationString}&radius=5000&type=store&key=${google_places_api_key}`;
        fetch(endpoint)
          .then((response) => response.json())
          .then((responseJson) => {
            self.setState({
              places: self.state.places.concat(responseJson.results),
              placesNames: self.state.placesNames.concat(responseJson.results.map(p => p.name))
            })
            return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
     })
     .catch((error) => {
       console.error(error);
     });
  },

  componentDidMount(){
    var self = this;
    this.fetchData(function(response){
      var places = response.results;
      var placesNames = response.results.map(p => p.name);
      self.setState({
        places,
        placesNames
      });
    })
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
    return (
      <View style={styles.layeredPageContainer} onPress={() => this.setState({modalVisible: false})}>
        {this._renderHeader()}
        <EyespotPageBase
          keyboardShouldPersistTaps={false}
          noScroll={false}>
          <View style={{paddingTop: height/36}}>
          <PlacesAutocomplete
            handleModalVisible={this.handleModalVisible}
            myLocation={this.props.location}
            places={this.state.places}
            navigator={this.props.navigator}
            setStore={this.props.setStore}/>
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
