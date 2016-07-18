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

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

var ProductAndLocationView = React.createClass({
	getInitialState() {
		return {
			storeTags: [],
			stores: [],
      		query: ''
		}
	},

	_categories: ['Top', 'Bottom', 'Accessory', 'Coverall', 'Shoe'],

	componentWillMount() {
		this.getRecentStoreLocations();
		this.getStoreList();
	},

	componentDidMount() {

	},

	_filterData(data) {

	},

	_findStore(query) {
	    if (query === '') {
	      return [];
	    }

	    const { stores } = this.state;
	    const regex = new RegExp(`${query.trim()}`, 'i');
	    return stores.filter(store => store.name.search(regex) >= 0);
	  },

	getRecentStoreLocations() {
		this.setState({
			storeTags: ['Zara', 'Forever 21', 'Banana Republic', 'GAP', 'Bloomingdales']
		})
	},

	getStoreList() {
		this.setState({
			stores: []
		})
	},

	render() {
		const { query } = this.state;
  		const data = this._filterData(query);

		return (
			<View style={styles.container}>
				<Text style={styles.text}>PRODUCT AND LOCATION</Text>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>ARE YOU HERE?</Text>
					<View style={styles.storeTagsBar}>
						<TouchableOpacity onPress={this.getStoreLocations}>
							<Image 
								source={require('../../../partials/icons/contribute/img/reset-refresh-location-icon.png')} 
								style={styles.icon} />
						</TouchableOpacity>
						<ScrollView
							  automaticallyAdjustContentInsets={false}
				              contentContainerStyle={styles.scrollView}
				              showsHorizontalScrollIndicator={false}
				              horizontal={true}
				              directionalLockEnabled={true}>
							{this.state.storeTags && this.state.storeTags.map((storeTag, i) => (
				                <TouchableOpacity key={i} onPress={() => {
				                	this.setState({query: storeTag});
				                	this.props.handleShowNextButton(true);
				                }} style={styles.storeTag}><Text
				                  style={styles.storeTagText}>{storeTag && storeTag.toUpperCase()}</Text></TouchableOpacity>
				              ))}
			             </ScrollView>
					</View>
				</View>

				<View style={styles.section}>
				<Text style={styles.sectionTitle}>IF NOT, SEARCH FOR THE STORE</Text>
				<View style={styles.storeSearchBar}>
					<Autocomplete
						autoCapitalize="none"
			            autoCorrect={false}
			            containerStyle={styles.autocompleteContainer}
					    data={data}
					    defaultValue={query}
					    inputContainerStyle={styles.autocompleteInputContainer}
					    listStyle={{}}
					    onChangeText={text => this.setState({query: text})}
					    renderItem={({ storeName, distance }) => (
				            <TouchableOpacity onPress={() => this.setState({ query: title })}>
				              <Text style={styles.itemText}>
				                {storeName}
				              </Text>
				              <Text>
				              	{distance}
				              </Text>
				            </TouchableOpacity>
				          )}
				          style={styles.autocompleteInput}
					  />
					  <TouchableOpacity>
							<Image 
								source={require('../../../partials/icons/common/img/location-icon.png')} 
								style={styles.icon} />
					  </TouchableOpacity>
				</View>

				</View>

				<View style={styles.section}>
				<Text style={styles.sectionTitle}>SPOTTED WHAT:</Text>
					<ScrollView
					  automaticallyAdjustContentInsets={false}
		              showsVerticalScrollIndicator={false}
		              directionalLockEnabled={true}>
						{this._categories && this._categories.map((category, i) => 
							<TouchableOpacity key={i} onPress={() => this.setState({selectedCategory: category})} style={[styles.category, (this.state.selectedCategory === category ? {} : {borderColor: 'rgba(4,22,43,0.45)'})]} >
								<Text style={[styles.categoryText, (this.state.selectedCategory === category ? {} : {opacity: 0.4})]}>{category}</Text>
							</TouchableOpacity>
						)}
					</ScrollView>
				</View>
			</View>
		);
	}

});

const iconSize = height/25;
const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: 1
};

const styles = StyleSheet.create({
	autocompleteContainer: {
	},	
	autocompleteInput: {
		bottom: height/75,
	},
	autocompleteInputContainer: {
		borderWidth: 0,
	},
	category: {
		width: width/1.3,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: height/85,
		borderBottomWidth: 1,
		borderColor: '#000',
		paddingBottom: height/85
	},
	categoryText: {
		fontWeight: 'bold'
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
	scrollView: {

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

module.exports = ProductAndLocationView;