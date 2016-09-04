/**
 * FilterBar.js
 * Reusable search bar with dropdown & autocomplete
 *
 * @providesModule FilterBar
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

import _ from 'lodash';

 var {height, width} = Dimensions.get('window');

 /*
 * @description determine if an array contains one or more items from another array.
 * @param {array} haystack the array to search.
 * @param {array} arr the array providing items to check for in the haystack.
 * @return {boolean} true|false if haystack contains at least one item from arr.
 */

var findOne = function (haystack, arr) {
    return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
    });
};


/*
* Dropdowns that show up behind navs
*/

var Dropdowns = React.createClass({
 getInitialState() {
     return {
       selected: []
     };
 },

 componentDidMount() {
   let { genderFilter, historyFilter, locationFilter, storeFilter } = this.props;
   this.setState({
     selected: [genderFilter, historyFilter, locationFilter, storeFilter]
   })
 },

 /*
  * preventDuplicateDropdownHighlighting(): because both Gender and Store categories have an 'All' option,
  * you want to prevent confusion between the dropdowns and don't want both Men and All highlighted in Gender dropdown, for example
  * FIXME: it works for now but can be fixed through better organization of the this.state.selected variable,
  * which keeeps track of active filter dropdown items
  */

 preventDuplicateDropdownHighlighting(dropdownItem, filterName) {
   let { selected } = this.state;
   if(_.countBy(selected)['All'] >= 1) {
     if(filterName === 'Gender' && selected.indexOf('Men') > -1 || selected.indexOf('Women') > -1) {
       if(dropdownItem === 'All') return {color: 'black'}
     }

     if(filterName === 'Store') {
       let storeFilter = _.find(this.props.filters, ['name', filterName]);
       let dropdown = storeFilter.dropdown;

       if(findOne(selected, _.difference(dropdown, ['All'])) && dropdownItem === 'All') return {color: 'black'}
     }

     if(filterName === 'Last Month' && selected.indexOf('Last Week') > -1 || selected.indexOf('Today') > -1) {
       if(dropdownItem === 'All') return {color: 'black'}
     }
   }
 },

 selectDropdownItem(d, type, i) {
   // remove any other filters in the same nav CategoryView, then push d to array of selected filters
   var currentSelected = this.state.selected;
   var filter = _.find(this.props.filters, ['name', type]);
   _.pull(currentSelected, ..._.difference(filter.dropdown, ['All'])); // ignore 'All' values bc there might be more than one
   currentSelected.push(d);
   this.setState({selected : currentSelected });
   this.props.setFilter(type, d);
   this.props._setNav(i);
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
                   {filter.dropdown.map(function(d, j) {
                     return (
                       <TouchableOpacity key={j} onPress={() => this.selectDropdownItem(d, filter.name, i)}>
                         <Text style={[styles.dropdownText, (this.state.selected.indexOf(d) > -1 ? {color: 'red'} : {}), (d && d.length > 10 ? {fontSize: height/55} : {}), this.preventDuplicateDropdownHighlighting(d, filter.name)]}>{d}</Text>
                       </TouchableOpacity>
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
* FilterBar - reusable component for different searchbar dropdowns
*/

var FilterBar = React.createClass({

  propTypes: {
    genderFilter: PropTypes.string,
    locationFilter: PropTypes.string,
    filters: PropTypes.array,
    setFilter: PropTypes.function,
    storeFilter: PropTypes.string
  },


 getInitialState() {
   return {
     nav: null,
     navs: []
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
   const  { genderFilter, historyFilter, locationFilter, storeFilter, filters } = this.props;

   return (
     <View style={styles.searchBar}>
       <Dropdowns
         genderFilter={genderFilter}
         historyFilter={historyFilter}
         locationFilter={locationFilter}
         setFilter={this.props.setFilter}
         nav={this.state.nav}
         _setNav={this._setNav}
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
   searchBar: {
     position: 'absolute',
     height: height / 100,
     top: height / 16.5,
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
   navText: {
     fontSize: height/50,
   },
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

module.exports = FilterBar;
