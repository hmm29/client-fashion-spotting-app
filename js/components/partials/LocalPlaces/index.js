/**
 * LocalPlaces.js
 * Reusable search bar with dropdown & autocomplete
 *
 * @providesModule LocalPlaces
 * @flow
 */

 import React, { PropTypes } from 'react';

 import {
   Dimensions,
   StyleSheet,
   View,
   TouchableOpacity,
   Text,
   Image
 } from 'react-native';

 import Autocomplete from 'react-native-autocomplete-input';

 var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');


const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

 var {height, width} = Dimensions.get('window');

/*
* LocalPlaces - reusable component for different searchbar dropdowns
*/

var LocalPlaces = React.createClass({

 getInitialState() {
   return {
   };
 },

 render() {
   const { data, query } = this.props;

   return (
     <View style={styles.section}>
       <Text style={styles.sectionTitle}>IF NOT, SEARCH FOR THE STORE</Text>
       <View style={styles.storeSearchBar}>
         <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          fetchDetails={true}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log('here')
            console.log(data);
            console.log(details);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyBYm4q-9VEPYNT_aSsq7YU1LwHFA5H2TTo',
            language: 'en', // language of the results
            types: '(cities)', // default: 'geocode'
          }}
          style={styles.autocompleteInput}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}

          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food',
          }}


          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

          predefinedPlaces={[homePlace, workPlace]}
        />
        <TouchableOpacity>
          <Image
            source={require('../icons/common/img/location-icon.png')}
            style={styles.icon} />
        </TouchableOpacity>
      </View>
     </View>
   );
 }
});

//
// <View style={styles.storeSearchBar}>
//   <Autocomplete
//     autoCapitalize="none"
//           autoCorrect={false}
//           containerStyle={styles.autocompleteContainer}
//       data={data}
//       defaultValue={query}
//       inputContainerStyle={styles.autocompleteInputContainer}
//       listStyle={{}}
//       onChangeText={text => this.setState({query: text})}
//       renderItem={({ storeName, distance }) => (
//             <TouchableOpacity onPress={() => this.setState({ query: title })}>
//               <Text style={styles.itemText}>
//                 {storeName}
//               </Text>
//               <Text>
//                 {distance}
//               </Text>
//             </TouchableOpacity>
//           )}
//           style={styles.autocompleteInput}
//     />
//     <TouchableOpacity>
//       <Image
//         source={require('../icons/common/img/location-icon.png')}
//         style={styles.icon} />
//     </TouchableOpacity>
// </View>

const iconSize = height/25;
const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: 1
};

const styles = StyleSheet.create({
	autocompleteInput: {
		bottom: height/75,
	},
	autocompleteInputContainer: {
		borderWidth: 0,
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
		fontSize: height/55
	},
	storeTagsBar: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	storeTagText: {
		fontFamily: 'Avenir-Roman',
		color: '#fff'
	},
	storeTag: {
		backgroundColor: 'rgba(4,22,43,0.25)',
		padding: height/80,
		marginHorizontal: width / 70,
	},
	storeSearchBar: {
		...border,
		width: width/1.3,
		height: height/15,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontFamily: 'Avenir-Roman',
		marginBottom: height/45,
	},
});

module.exports = LocalPlaces;
