/**
* PlacesNearby.js
* Reusable search bar with dropdown & autocomplete
*
* @providesModule PlacesNearby
* @flow
*/

import React, { PropTypes } from 'react';

import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ScrollView,
  ListView
} from 'react-native';

const CARD_PREVIEW_WIDTH = 20
const CARD_MARGIN = 5;
const CARD_WIDTH = 50;
const CARD_HEIGHT = 40;


var {height, width} = Dimensions.get('window');
var locationIcon = require('../img/location.png');
const google_places_api_key = "AIzaSyBYm4q-9VEPYNT_aSsq7YU1LwHFA5H2TTo";

/*
* PlacesNearby - reusable component for different searchbar dropdowns
*/

var PlacesNearby = React.createClass({

  propTypes: {
    places: PropTypes.array,
    storeSelected : PropTypes.object
  },

  getInitialState(){
    return {
      places:[],
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

      self.setState({
        places : response.results,
      });
    })
  },

  setStore(place){
    this.props.setStore(place);
  },

  render(){
    const storeSelected = this.props.storeSelected;
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={this.getStoreLocations}>
          <Image
            source={require('../icons/contribute/img/reset-refresh-location-icon.png')}
            style={styles.iconLocation} />
        </TouchableOpacity>
        <ScrollView
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            directionalLockEnabled={true}>
            {this.state.places.map((place, i) => {
              var style = {};
              if(place.name == storeSelected.name){
                  style.backgroundColor = "black";
              }
              return(
                <TouchableOpacity key={i}
                  onPress={() => {
                      this.setStore(place);
                  }}
                  style={[styles.place, style]}>
                  <Text  style={styles.placeText}>
                    {place.name}
                  </Text>
                </TouchableOpacity>
              )
          })}
         </ScrollView>
      </View>
    )
  },

})


const iconSize = 20;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
   content: {
     marginTop: 10,
     paddingHorizontal: CARD_PREVIEW_WIDTH,
     alignItems: 'center',
     flex: 1,
   },
   areYouHere:{
     fontFamily: 'Avenir-Book',
     marginLeft: 30,
     fontSize: 12
   },
   iconContainer:{
     height: CARD_HEIGHT,
     justifyContent:'center',
     alignItems: 'center',
     marginRight: 20
   },
   iconLocation: {
     width: iconSize,
     height: iconSize,
     resizeMode: Image.resizeMode.contain,
     margin: width / 70
   },
   icon:{
     resizeMode: 'contain',
     width: 25,
   },
   card: {
     backgroundColor: '#ccc',
     margin: CARD_MARGIN,
     height: CARD_HEIGHT,
     alignItems: 'center',
     justifyContent: 'center',
     padding:20
   },
   cardText: {
     color: 'white',
     fontFamily: 'Avenir-Book'
   },
 	placeText: {
 		fontFamily: 'Avenir-Roman',
 		color: '#fff'
 	},
 	place: {
 		backgroundColor: 'rgba(4,22,43,0.25)',
 		padding: height/80,
 		marginHorizontal: width / 70,
 	},
});

module.exports = PlacesNearby;
