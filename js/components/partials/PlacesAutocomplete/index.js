/**
* PlacesAutocomplete.js
* Reusable search bar with dropdown & autocomplete
*
* @providesModule PlacesAutocomplete
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
  ListView
} from 'react-native';

var {height, width} = Dimensions.get('window');

/*
* Calculate distance from two lat/lng points
*/

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  var m = d * .621371; // in m
  return m.toFixed(2);
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


/*
* NotListed - Last element in the list.
*/

var NotListed = React.createClass({
  render(){
    return (
      <View style={[styles.row, styles.notListedRow]}>
        <Text style={styles.notListedText}>Not Listed</Text>
      </View>
    )
  }
})

/*
* SuggestionRow - Suggestions listed, containing name and distance
*/

var SuggestionRow = React.createClass({
  handlePress(){
    this.props.setStore(this.props.place);
    this.props.navigator.pop();

  },
  render(){
    const { place, myLocation } = this.props;
    const storeName = place.name;
    const location = place.geometry.location;

    const dist = getDistanceFromLatLonInKm(myLocation.lat, myLocation.lng, location.lat, location.lng);
    return(
      <TouchableOpacity
        style={styles.row}
        onPress={this.handlePress}>
        <Text style={styles.storeName}>{storeName}</Text>
        <Text style={styles.distance}>{dist}m</Text>
      </TouchableOpacity>
    )
  }
})

/*
* PlacesAutocomplete - reusable component for different searchbar dropdowns
*/


var PlacesAutocomplete = React.createClass({

  propTypes: {
    myLocation: PropTypes.object,
    places: PropTypes.array,
  },

  getInitialState(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      text: "",
      dataSource: ds.cloneWithRows([]),
      numRows: ""
    }
  },

  componentDidMount(){
    var places = this.props.places;
    places.push({name:'Not Listed'});

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.places),
    });
  },
  componentWillReceiveProps(nextProps){
    var places = nextProps.places;
    places.push({name:'Not Listed'});

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.places),
    });
  },
  _setFilter(text){
    // filter places by input text
    var filteredPlaces = [];
    this.props.places.map(function(place){
      if(place.name.startsWith(text)){
        filteredPlaces.push(place);
      }
    }, this);

    filteredPlaces.push({name:'Not Listed'});

    this.setState({
      text : text,
      dataSource: this.state.dataSource.cloneWithRows(filteredPlaces),
      numRows : filteredPlaces.length
    });
  },

  render(){

    return (
      <View>
        <View style={styles.autocomplete}>
          <TextInput
            style={styles.autocompleteTextInput}
            onChangeText={(text) => this._setFilter(text)}
            value={this.state.text}/>
          <TouchableOpacity style={styles.iconContainer}>
            <Image
              source={require('../../partials/icons/common/img/location-icon.png')}
              style={styles.icon} />
          </TouchableOpacity>
        </View>
        <ListView
          enableEmptySections={true}
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    )
  },
  _renderRow(rowData, sectionID, rowID){
    const maxRows = 7;
    if(rowID < maxRows && rowData.name != "Not Listed"){
        return (
          <SuggestionRow
            setStore={this.props.setStore}
            myLocation={this.props.myLocation}
            navigator={this.props.navigator}
            place={rowData}/>
      )
    }
    if(rowID == maxRows || rowData.name == "Not Listed"){
      return (<NotListed/>)
    }
    return null
  },
})


const iconSize = 20;
const border = {
  borderColor: 'black',
  borderRadius: 1,
  borderWidth: 2,
  borderTopWidth: 2
};

const autocompleteHeight = 40;
const rowPadding = 10;
const marginHorizontal = 15
const autocompleteWidth = width - marginHorizontal * 2

const grayColor = "#C3C3C3"

const styles = StyleSheet.create({
	autocomplete: {
    flexDirection: 'row',
    marginHorizontal: marginHorizontal,
    height: autocompleteHeight,
    justifyContent: 'center',
    alignItems: 'center',
    ...border,
	},
  autocompleteTextInput:{
    flex: 5,
    padding: 10
  },
  listView:{
    marginHorizontal: marginHorizontal,
    width: autocompleteWidth,
    top: autocompleteHeight + 1,
    position: 'absolute',
    shadowOffset: {
        width: 0,
        height: 0
    },
    shadowColor: 'black',
    shadowOpacity: .3,
    shadowRadius: 10,
    paddingTop: rowPadding
  },
  row:{
    paddingHorizontal: 20,
    paddingVertical: rowPadding,
    flexDirection: 'row'
  },
  storeName:{
    fontWeight: 'bold',
    flex: 3,
    fontSize: 18,
    paddingRight: 20
  },
  distance:{
    fontWeight:'bold',
    color: grayColor,
  },
  notListedRow:{
    borderTopWidth: 2,
    borderTopColor: grayColor,
    paddingVertical: 15,
    marginTop: rowPadding
  },
  notListedText:{
    fontWeight:'bold',
    color: grayColor,
    fontSize: 18,
  },
  iconContainer:{
    flex: 1,
    alignItems: 'center',
  },
	icon: {
		width: iconSize,
		height: iconSize,
		resizeMode: Image.resizeMode.contain,
		margin: width / 70
	},
});

module.exports = PlacesAutocomplete;
