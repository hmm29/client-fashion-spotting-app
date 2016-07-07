/**
 * SearchBar.js
 * Reusable search bar with dropdown & autocomplete
 *
 * @providesModule SearchBar
 * @flow
 */


 import React, { Component } from 'react';
 import {
   Dimensions,
   Image,
   StyleSheet,
   Text,
   TextInput,
   View,
   TouchableOpacity
 } from 'react-native';


 var {height, width} = Dimensions.get('window');


 // Dropdown navs (Gender, Location, Store)

 var Dropdowns = React.createClass({
   getInitialState() {
       return {

       }
   },

   render() {
     return (
       <View style ={styles.dropdownContainer}>
         <View style={styles.dropdownInner}>

             {this.props.navs.map(function(nav, i){
               if(i != this.props.nav){
                 return (
                   <View key={i} style={styles.dropdown}>
                     <Text>none</Text>
                   </View>
                 )
               }
               else{
                 return (
                   <View key={i} style={styles.dropdownActive}>
                     {nav.dropdown.map(function(d, i){
                       return (
                         <Text style={styles.dropdownText} key={i}>{d}</Text>
                       )
                     }, this)}
                   </View>
                 )
               }
             }, this)}
         </View>
       </View>

     )
   }
 })

 var Navs = React.createClass({

   handlePress(i){
     //close dropdown if clicking active dropdown
     if(this.props.nav == i){
       this.setState({ nav: null });
     }
     //activate dropdown
     else{
       this.setState({ nav: i });
     }
   },

   render() {
     // FIXME: get jpg for dropdown arrow
     return (
       <View style ={styles.navsContainer}>
         <View style ={styles.navsInner}>
               {this.props.navs.map(function(nav, i){
                 return (
                   <View key={i} style={styles.nav}>
                     <TouchableOpacity
                       onPress={()=>this.props._setNav(i)}
                       style={styles.navTouch}>
                       <Text style={styles.navText}>
                         {nav.name}
                       </Text>
                     </TouchableOpacity>
                   </View>
                 )
               }, this)}
           </View>
       </View>
     )
   }
 })

 var SearchBar = React.createClass({
   getInitialState() {
     return {
       nav : null,
       navs : [
         {
             name : 'GENDER',
             dropdown : ['female', 'male', 'all'],
             store : ['z', 'b', 'c']
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
     }
   },

   _setNav(i){
     if(this.state.nav == i){
       this.setState({ nav: null });
     }
     //activate dropdown
     else{
       this.setState({ nav: i });
     }
   },

   render() {
     return(
       <View style={styles.searchBar}>
         <Dropdowns nav={this.state.nav} navs={this.state.navs}/>
           <Navs nav={this.state.nav} navs={this.state.navs}
             _setNav={this._setNav}/>
       </View>
     )
   }
 })



const navsContainerHeight = 50;
const dropdownPadding = navsContainerHeight + 20;
const searchBarPadding = 20;
const searchBarInnerWidth = width-searchBarPadding*2;

const styles = StyleSheet.create({
   container: {

   },
   section: {
       marginVertical: height/40,
       flex:1,
   },
   searchBarContainer: {
       position: 'absolute',
       height: height/80,
       top: -20,

   },
   searchBar: {
     position: 'absolute',
     height: height/80,
     top: -40,
   },
   navsContainer: {
     position: 'absolute',
     top: 0,
     justifyContent:'center',
     flexDirection: 'row',
     alignItems:'center',
     width: width,
     height: navsContainerHeight,
     shadowOffset:{
         width: 0,
         height: 5,
     },
     shadowColor: 'black',
     shadowOpacity: .2,
     paddingHorizontal: 20,
   },

   navsInner: {
     height: navsContainerHeight,
     flexDirection: 'row',
     width: searchBarInnerWidth,
     justifyContent: 'center',
   },
   nav: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
   },
   navText: {
     padding: 10,
   },
   dropdownContainer: {
     position: 'absolute',
     top: 0,
     justifyContent:'center',
     flexDirection: 'row',
     alignItems:'center',
     width: width,
     backgroundColor: 'transparent'
   },
   dropdownInner:{
     flexDirection: 'row',
     width: searchBarInnerWidth,
     justifyContent: 'center',
     backgroundColor: 'transparent'
   },
   dropdown: {
     flex: 1,
     backgroundColor: 'transparent'
   },
   dropdownActive:{
     flex: 1,
     flexDirection: 'column',
     justifyContent: 'flex-start',
     alignItems: 'flex-start',
     paddingTop: dropdownPadding,
     paddingBottom: 20,
     shadowOffset:{
         width: 0,
         height: 5,
     },
     shadowColor: 'black',
     shadowOpacity: .2,
     backgroundColor:'white'
   },
   dropdownText:{
     marginVertical: 5,
     marginHorizontal: 20,
   },
})

module.exports = SearchBar;
