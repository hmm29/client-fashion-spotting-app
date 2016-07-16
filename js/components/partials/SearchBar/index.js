/**
 * SearchBar.js
 * Reusable search bar with dropdown & autocomplete
 *
 * @providesModule SearchBar
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


 var {height, width} = Dimensions.get('window');


/*
* Dropdowns that show up behind navs
*/

var Dropdowns = React.createClass({
 getInitialState() {
     return {};
 },

 render() {
   return (
     <View style ={styles.dropdownContainer}>
       <View style={styles.dropdownInner}>
           {this.props.filters.map(function(filter, i) {
             if (i != this.props.nav) {
               return (
                 <View key={i} style={styles.dropdown}>
                 </View>
               );
             }
             else {
               return (
                 <View key={i} style={styles.dropdownActive}>
                   {filter.dropdown.map(function(d, i) {
                     return (
                       <Text style={styles.dropdownText} key={i}>{d}</Text>
                     );
                   }, this)}
                 </View>
               );
             }
           }, this)}
       </View>
     </View>

   );
 }
});

/*
* Navs (Gender, Location, Store)
*/

var Navs = React.createClass({

 render() {
   return (
     <View style ={styles.navsContainer}>
       <View style ={styles.navsInner}>
           {this.props.filters.map(function(filter, i) {
             if (i == this.props.nav) {
               var activeNavStyle = { color: 'red'};
             }
             else {
               var activeNavStyle = {};
             }
             return (
               <View key={i} style={styles.nav}>
                 <TouchableOpacity
                   activeOpacty={.8}
                   onPress={() => this.props._setNav(i)}
                   style={styles.navTouch}>
                   <Text style={[styles.navText, activeNavStyle]}>
                     {filter.name.toUpperCase()}
                   </Text>
                   <Image style={styles.dropdownIcon} source={require('../img/dropdown.png')}/>
                 </TouchableOpacity>
               </View>
             );
           }, this)}
         </View>
     </View>
   );
 }
});


/*
* SearchBar - reusable component for different searchbar dropdowns
*/

var SearchBar = React.createClass({

  propTypes: {
    filters: PropTypes.object,
  },


 getInitialState() {
   return {
     nav: null,
     navs: [
       {
           name: 'GENDER',
           dropdown: ['female', 'male', 'all'],
           store: ['z', 'b', 'c']
       },
       {
           name: 'LOCATION',
           dropdown: ['DC']
       },
       {
           name: 'STORE',
           dropdown: ['a', 'b', 'c']
       }
     ]
   };
 },

 _setNav(i) {
   if (this.state.nav == i) {
     this.setState({ nav: null });
   }
   // activate dropdown
   else {
     this.setState({ nav: i });
   }
 },

 render() {
   const  { filters } = this.props;

   return (
     <View style={styles.searchBar}>
       <Dropdowns
         nav={this.state.nav}
         filters={filters}/>
       <Navs
         nav={this.state.nav}
         filters={filters}
         _setNav={this._setNav}/>
     </View>
   );
 }
});

const headerHeight = 60;
const navsContainerHeight = 50;
const dropdownPadding = navsContainerHeight + 20;
const searchBarPadding = 20;
const searchBarInnerWidth = width - searchBarPadding * 2;

const styles = StyleSheet.create({
   container: {},
   section: {
       marginVertical: height / 40,
       flex: 1
   },
   searchBarContainer: {
       position: 'absolute',
       height: height / 80,
   },
   searchBar: {
     position: 'absolute',
     height: height / 80,
     top: headerHeight,
   },
   navsContainer: {
     position: 'absolute',
     top: 5,
     justifyContent: 'center',
     flexDirection: 'row',
     alignItems: 'center',
     width,
     height: navsContainerHeight,
     shadowOffset: {
         width: 0,
         height: 5
     },
     shadowColor: 'black',
     shadowOpacity: .2,
     paddingHorizontal: 20
   },

   navsInner: {
     height: navsContainerHeight,
     flexDirection: 'row',
     width: searchBarInnerWidth,
     justifyContent: 'center'
   },
   nav: {
     flex: 1,
     height: navsContainerHeight,
     flexDirection: 'column',
     justifyContent: 'center',
     alignItems: 'center'
   },
   navTouch: {
     flexDirection: 'row',
     width: searchBarInnerWidth / 3,
     height: navsContainerHeight,

    justifyContent: 'center',
    alignItems: 'center'
   },
   navText: {},

   dropdownIcon: {
     width: 15,
     resizeMode: 'contain',
     marginLeft: 10
   },
   dropdownContainer: {
     position: 'absolute',
     top: 5,
     justifyContent: 'center',
     flexDirection: 'row',
     alignItems: 'center',
     width: width,
     backgroundColor: 'transparent'
   },
   dropdownInner: {
     flexDirection: 'row',
     width: searchBarInnerWidth,
     justifyContent: 'center',
     backgroundColor: 'transparent'
   },
   dropdown: {
     flex: 1,
     backgroundColor: 'transparent'
   },
   dropdownActive: {
     flex: 1,
     flexDirection: 'column',
     justifyContent: 'flex-start',
     alignItems: 'flex-start',
     paddingTop: dropdownPadding,
     paddingBottom: 20,
     shadowOffset: {
         width: 0,
         height: 5
     },
     shadowColor: 'black',
     shadowOpacity: .2,
     backgroundColor: 'white'
   },
   dropdownText: {
     marginVertical: 5,
     marginHorizontal: 20
   }

});

module.exports = SearchBar;
