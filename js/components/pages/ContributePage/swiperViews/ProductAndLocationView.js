/**
 * ProductAndLocationView.js
 * Second page in Contribute swiper
 *
 * @providesModule ProductAndLocationView
 * @flow
 */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import Autocomplete from 'react-native-autocomplete-input';
import Categories from '../../../partials/categories';
import PlacesNearby from '../../../partials/PlacesNearby';
import LocationPage from '../../LocationPage';
import SelectCategory from '../../../partials/SelectCategory';

const washingtonDC = {
  lat: 38.9072,
  lng: -77.0369
}

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */


var ProductAndLocationView = React.createClass({
	getInitialState() {
		return {
  		storeSelected: {},
      categorySelected: {},
		}
	},
  componentWillMount(){
    var self = this;
    navigator.geolocation.getCurrentPosition((position) => {
        var coords = position.coords;
        self.setState({
          location : {
            lat: coords.latitude.toFixed(5),
            lng: coords.longitude.toFixed(5)
          }
        });
      },
      (error) => {
        self.setState({
          location : washingtonDC
        })
        console.log(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

  },

  componentDidMount() {
    if(this.state.categorySelected && this.state.storeSelected.name){
      this.props.handleShowNextButton(true);
    }
  },

  updateParent(){
    var storeObject = {};
    if(this.state.storeSelected.name){
      var vicinity = this.state.storeSelected.vicinity;
      vicinity = vicinity.replace("#", "");
      storeObject = {
        id: this.state.storeSelected.id,
        name: this.state.storeSelected.name,
        location: this.state.storeSelected.geometry.location,
        place_id: this.state.storeSelected.place_id,
        vicinity: vicinity
      }
    }

    this.props.updateUploadData("productAndLocationView", {
      category : this.state.categorySelected.key,
      store : storeObject
    });
  },

  selectCategory(selected, gender){
    let category, categoryThumbMap = Categories.categoryThumbMap;

    // update selected to determine which option is highlighted in selectCategory
    this.setState({selected});

    if(gender === 'women') {
      switch(selected) {
        case 'Dresses':
            category = categoryThumbMap['dresses_w'];
            break;
        case 'Outerwear':
            category = categoryThumbMap['outerwear_w'];
            break;
        case 'Pants':
            category = categoryThumbMap['pants_w'];
            break;
        case 'Shirts & Top':
            category = categoryThumbMap['shirts_and_top_w'];
            break;
        case 'Shoes':
            category = categoryThumbMap['shoes_w'];
            break;
        case 'Skirts':
            category = categoryThumbMap['skirts_w'];
            break;
        case 'Suits':
            category = categoryThumbMap['suits_w'];
            break;
        case 'Sweaters & Cardigan':
            category = categoryThumbMap['sweaterscardigan_w'];
            break;
        case 'Bags, etc.':
            category = categoryThumbMap['bags_w'];
            break;
        }

      }

    if(gender === 'men') {
      switch(selected) {
        case 'Outerwear':
            category = categoryThumbMap['outerwear_m'];
            break;
        case 'Pants':
            category = categoryThumbMap['pants_m'];
            break;
        case 'Shirts':
            category = categoryThumbMap['shirts_m'];
            break;
        case 'Shoes':
            category = categoryThumbMap['shoes_m'];
            break;
        case 'Suits & Sportcoats':
            category = categoryThumbMap['suits_and_sportcoats_m'];
            break;
        case 'Sweaters':
            category = categoryThumbMap['sweaters_m'];
            break;
        case 'T-Shirts & Polos':
            category = categoryThumbMap['t_shirtspolos_m'];
            break;
        case 'Other':
            category = categoryThumbMap['other_m'];
            break;
      }
    }

      // NOTE: for this to work, always update parents in CALLBACK after setting new state
    this.setState({categorySelected: category}, function() {
      this.updateParent();
      // only show next button if both store and category have been selected
      if(this.state.categorySelected.name && this.state.storeSelected.name){
        this.props.handleShowNextButton(true);
      }
    });
  },

  setStore(store){
    // NOTE: for this to work, always update parents in CALLBACK after setting new state
    this.setState({storeSelected: store}, function(){
      this.updateParent();
      // only show next button if both store and category have been selected
      if(this.state.categorySelected.name && this.state.storeSelected.name){
        this.props.handleShowNextButton(true);
      }
    });

  },

  searchForStore(){
    var self = this;

    this.props.navigator.push({
      title: 'Search For Store',
      component: LocationPage,
      passProps:{
        location: {
          lat: self.state.location && self.state.location.lat,
          lng: self.state.location && self.state.location.lng
        },
        setStore: this.setStore
      }
    });
  },

	render() {
		const { storeSelected, categorySelected, selected, location } = this.state;

    if(!location){
      return null
    }
		return (
			<View style={styles.container}>
				<Text style={styles.text}>PRODUCT AND LOCATION</Text>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>ARE YOU HERE?</Text>
					<PlacesNearby
            setStore={this.setStore}
            storeSelected={storeSelected}
            location={location}/>
				</View>

        <TouchableOpacity
          style={styles.storeFilterBar}
          onPress={this.searchForStore}>
            <View style={styles.autocompleteContainer}>
              <Text style={styles.autocompleteText}>{storeSelected.name}</Text>
            </View>
            <View>
              <Image
                source={require('../../../partials/icons/common/img/location-icon.png')}
                style={styles.icon} />
            </View>
        </TouchableOpacity>
        <SelectCategory
          selected={selected}
          selectCategory={this.selectCategory}
          categorySelected={this.state.categorySelected}/>
			</View>
		);
	}

});

const iconSize = height/35;
const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: 1
};

const styles = StyleSheet.create({
  storeFilterBar: {
    ...border,
    width: width/1.3,
    height: height/15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
	autocompleteContainer: {
    height: height/15,
    flex: 7,
    justifyContent: 'center',
	},
	autocompleteText: {
    fontFamily: 'Avenir-Roman',
    fontSize: 18,
    marginLeft: 10
	},
	container: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height,
		width,
	},
	icon: {
		width: iconSize,
		height: iconSize,
		resizeMode: Image.resizeMode.contain,
		margin: width / 70
	},
	nextStepIcon: {
		width: iconSize/2,
		height: iconSize/2
	},
	section: {
		width: width/1.3,
		marginVertical: height/45,
		flexDirection: 'column',
		alignItems: 'flex-start'
	},
	sectionTitle: {
		marginBottom: height/45,
		fontSize: height/65,
    bottom: height/200
	},

	text: {
    fontFamily: 'Avenir-Medium',
    fontSize: height/55,
	},
});

module.exports = ProductAndLocationView;
