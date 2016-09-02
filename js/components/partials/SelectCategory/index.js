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
import NextStepIcon from './img/next-step-icon.png';

var SelectedRow = React.createClass({
  propTypes: {
    categorySelected: PropTypes.object,
    selectCategory: PropTypes.func
  },

  getInitialState() {
    return {
      selected: ""
    }
  },

  render(){
    const { selected } = this.state;
    const { option, categorySelected, selectCategory } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          selectCategory(option, this.props.gender);
          this.setState({selected: option})
        }}
        style={
          [
            styles.category,
            (categorySelected === option || selected === option ? {borderColor: 'rgba(0,0,0,0.25)'} : {borderColor: 'rgba(0,0,0,0.65)'})
          ]
        }>
        <Text
          style={
            [
              styles.categoryText,
              (categorySelected === option || selected === option ? {opacity: 0.4} : {opacity: 1.0})
            ]
          }>
          {option}
        </Text>
        <Image source={NextStepIcon} style={[(categorySelected === option || selected === option ? {opacity: 0.2} : {opacity: 1.0}), styles.nextStepIcon]}/>
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
    var options = [
      'Top',
      'Bottom',
      'Accessory',
      'Coverall',
      'Shoe',
    ]

    const selectedStyle = {
      borderBottomColor : 'white',
    }

		return (
				<View style={styles.section}>
		      <Text style={styles.sectionTitle}>SPOTTED WHAT:</Text>
            <View style={styles.genderTabContainer}>
            <TouchableOpacity
              onPress={()=>this.setState({ gender: "women" })}
              style={
                [
                  styles.genderTab, styles.genderWomen,
                  (this.state.gender == "women" ? selectedStyle : {})
                ]
              }>
              <Text
                style={{}}>
                FEMALE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this.setState({ gender: "men" })}
              style={
                [
                  styles.genderTab, styles.genderMen,
                  (this.state.gender == "men" ? selectedStyle : {})
                ]
              }>
              <Text
                style={{}}>
                MALE
              </Text>
            </TouchableOpacity>

          </View>
					<ScrollView
            style={[styles.scrollView, {bottom: height/150}]}
					    automaticallyAdjustContentInsets={false}
              showsVerticalScrollIndicator={false}
              directionalLockEnabled={true}>
						{options.map((option, i) =>
              (
                <SelectedRow
                  key={i}
                  {...this.props}
                  gender={this.state.gender}
                  option={option}
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

const categoryTextSize = height/30;
const footerHeight = 60;

const styles = StyleSheet.create({
  scrollView:{
    // borderTopWidth:1,
    // borderTopColor:'black',
    paddingTop: height/80,
    bottom: -(height/80),
  },
  genderTabContainer:{
    flexDirection:'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    width: width/1.3
  },
  genderTab:{
    paddingVertical: height/100,
    paddingHorizontal: 20,
    borderColor: 'black',
    borderRadius: 1,
    borderWidth: 1,
    backgroundColor:'white',
    marginRight: width/10,
    left: width/6

  },
  genderWomen:{
    top: height/600,
  },
  genderMen:{
    top: height/600
  },
	category: {
		width: width/1.3,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: height/85,
		borderBottomWidth: 1,
		borderColor: '#000',
		paddingBottom: height/85,
    paddingVertical: height/140
	},
	categoryText: {
		fontWeight: '700',
    fontSize: categoryTextSize
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
    height: categoryTextSize * 2/3,
    resizeMode: Image.resizeMode.contain,
    alignSelf: 'center'
  },
	section: {
		width: width/1.3,
		marginVertical: height/45,
		flexDirection: 'column',
		alignItems: 'flex-start',
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
