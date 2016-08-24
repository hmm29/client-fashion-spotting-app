/**
 * SelectCategory.js
 * Second page in Contribute swiper
 *
 * @providesModule SelectCategory
 * @flow
 */

import React, { PropTypes } from 'react';
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


var {height, width} = Dimensions.get('window'); /* gets screen dimensions */
import Categories from '../categories';

var SelectedRow = React.createClass({
  propTypes: {
    categorySelected: PropTypes.object,
    selectCategory: PropTypes.func
  },
  render(){
    const { category, categorySelected, selectCategory } = this.props;
    return (
      <TouchableOpacity
        onPress={() => selectCategory(category)}
        style={
          [
            styles.category,
            (categorySelected.key === category.key ? {} : {borderColor: 'rgba(4,22,43,0.45)'})
          ]
        }>
        <Text
          style={
            [
              styles.categoryText,
              (categorySelected.key === category.key ? {} : {opacity: 0.4})
            ]
          }>
          {category.name}
        </Text>
      </TouchableOpacity>
    )
  }
})

var SelectCategory = React.createClass({

  propTypes: {
    categorySelected: PropTypes.object,
    selectCategory: PropTypes.func
  },
  _categoriesKeys: Categories.categoryKeys, //replace with category names (men vs women?)

  getInitialState(){
    return {
      gender: "women"
    }
  },
	render() {

    var categoriesGender = [];
    this._categoriesKeys.map(function(category_key,i){
      var category = Categories.categoryThumbMap[category_key];
      if(category.gender == this.state.gender){
        categoriesGender.push(category);
      }
    }, this);

    const selectedStyle = {
      backgroundColor : 'black',
    }
		return (
				<View style={styles.section}>
		      <Text style={styles.sectionTitle}>SPOTTED WHAT:</Text>
          <View style={styles.genderTabContainer}>
            <TouchableOpacity
              onPress={()=>this.setState({ gender: "women" })}
              style={
                [
                  styles.genderTab,
                  (this.state.gender == "women" ? selectedStyle : {})
                ]
              }>
              <Text
                style={
                  (this.state.gender == "women" ? {color: 'white'} : {})
              }>
                FEMALE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this.setState({ gender: "men" })}
              style={
                [
                  styles.genderTab,
                  (this.state.gender == "men" ? selectedStyle : {})
                ]
              }>
              <Text
                style={
                  (this.state.gender == "men" ? {color: 'white'} : {})
              }>
                MALE
              </Text>
            </TouchableOpacity>

          </View>
					<ScrollView
            style={styles.scrollView}
					    automaticallyAdjustContentInsets={false}
              showsVerticalScrollIndicator={false}
              directionalLockEnabled={true}>
						{categoriesGender.map((category, i) =>
              (
                <SelectedRow
                  key={i}
                  {...this.props}
                  category={category}
                />
              )
						)}
					</ScrollView>
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

const footerHeight = 60;

const styles = StyleSheet.create({
  scrollView:{
    // borderTopWidth:1,
    // borderTopColor:'black',
    paddingTop: 10,
    height: height/2.9 /* specify height so that scrollview doesn't stick */
  },
  genderTabContainer:{
    flexDirection:'row',
    marginBottom: 10
  },
  genderTab:{
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderColor: 'black',
    borderRadius: 1,
    borderWidth: 1,
    backgroundColor:'white',
    marginRight: 15
  },
  genderWomen:{
    // left:width/5
  },
  genderMen:{
    // left: width*3/5
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
		fontWeight: 'bold',
    fontSize: 18
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
	text: {
		fontFamily: 'Avenir-Roman',
		marginBottom: height/45,
	},
});

module.exports = SelectCategory;
