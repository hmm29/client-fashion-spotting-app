/**
 * PersonalPage.js
 * Current user account and activity history
 *
 * @providesModule PersonalPage
 * @flow
 */


'use strict'; /* enables JS strict mode for any ES5 code */

/*
* imports required modules
*/

import React, { PropTypes, Component } from 'react';
import {
 AsyncStorage,
 Dimensions,
 Image,
 StyleSheet,
 Text,
 TextInput,
 View,
 TouchableOpacity
} from 'react-native';

import BackIcon from '../../partials/icons/navigation/BackIcon';
import Button from 'apsl-react-native-button';
import CatalogViewIcon from '../../partials/icons/product/CatalogViewIcon';
import MapsViewIcon from '../../partials/icons/product/MapsViewIcon';
import EyespotPageBase from '../EyespotPageBase';
import Header from '../../partials/Header';
import FilterBar from '../../partials/FilterBar';
import Map from '../../partials/Map';
import Product from '../../partials/Product';
import Notifications from '../../partials/Notifications';
import NotificationsPage from '../NotificationsPage';
import EyespotNegativeLogo from '../../partials/img/eyespot-logo-negative.png';

import firebaseApp from '../../firebase';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

/*
* defines the Categories class
* this code is for the two-column category component
*/


var Title = React.createClass({

  render() {
    const { user } = this.props;
    if(!user.username){
      return null
    }
    return (
      <View style={styles.titleContainer}>
        <Text style={[styles.italic, styles.bodoni]}>by</Text>
        <Text style={[styles.username, styles.bodoni]}>{user.username.toUpperCase()}</Text>
      </View>
    );
  }

});

var ProfileContainer = React.createClass({

  render() {
    const { user } = this.props;

    return (
      <View>
        <Image
          source={{ uri : user.profilePicture || "https://res.cloudinary.com/celena/image/upload/v1468541932/u_1.png"}}
          style={styles.profilePicture} />
      </View>
    );
  }

});


var UserProducts = React.createClass({

  render() {
    const { user, dataStore, onPressMapEmblem, navigator } = this.props;

    if(!user.products){
      return null
    }


    return (
      <View>
        {user && user.products && Object.keys(user && user.products).map((key, i) => {


         /*
          * return Product component for each product
          */
          const product_id = user && user.products && user.products[key];

          const product = dataStore.products[product_id];
          if(!product){
            return null
          }

          return (
            <Product
              key={i}
              navigator={navigator}
              onPressMapEmblem={() => {navigator.pop(); onPressMapEmblem()}}
              product={product}
              user={product.user}/>
          );
        }) || []}
      </View>
    );
  }

});


/*
* defines the PersonalPage class
*/

var PersonalPage = React.createClass({

   /*
    * specifies types for properties that this component receives
    */

   getInitialState(){

      return {
        catalogViewIconActive: true,
        mapsViewIconActive: false,
        user : "",
        userId : ""
      }
   },


   propTypes: {
     dataStore: PropTypes.object,
   },

   // componentWillMount lets you call functions before anything renders
   // This is important: you can check userId and fetch dataStore before render

   componentWillMount(){
     AsyncStorage.getItem('@MyStore:uid').then((userId) => {
       this.setState({ userId : userId });
     });

     var ref = firebaseApp.database().ref();
     ref.on('value', (snap) => {
       if(snap.val()){
         this.setState({
           dataStore : snap.val(),
         })
       }
     });

   },

   onPressMapEmblem() {
     this.setState({catalogViewIconActive: true, mapsViewIconActive: false});
   },

   /*
    * _renderHeader(): renders the imported header component
    */

   _renderHeader() {
       const backIcon = (
         <BackIcon color='white' onPress={() => this.props.navigator.pop()} />
       );
       const currentRoute = this.props.navigator.navigationContext.currentRoute;

       return (
           <Header containerStyle={styles.headerContainer}>
               {currentRoute.title !== 'TabBarLayout' ? backIcon : null}
               <View style={styles.pageTitle}>
                 <Image source={EyespotNegativeLogo}
                                 style={styles.pageTitleLogo} />
               </View>
               <View style={{width: width/6, left: width/9, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                   <CatalogViewIcon isActive={this.state.catalogViewIconActive} onPress={() => this.setState({catalogViewIconActive: true, mapsViewIconActive: false})} />
                   <MapsViewIcon isActive={this.state.mapsViewIconActive} onPress={() => this.setState({catalogViewIconActive: false, mapsViewIconActive: true})} />
               </View>
           </Header>
       );
   },

   showNotifications(){
     this.props.navigator.push({
       title: 'Notifications',
       component: NotificationsPage,
       passProps:{
         user: this.props.user,
         dataStore: this.state.dataStore
       }
     });
   },

   /*
    * render(): returns JSX that declaratively specifies page UI
    */

   render() {

     const dataStore = this.state.dataStore;
     const { navigator, user } = this.props;
     if(!user){
       return null
     }

     return (
       <View style={styles.layeredPageContainer}>
         {this._renderHeader()}
         <EyespotPageBase
             keyboardShouldPersistTaps={false}
             noScroll={false}>
             <View style={styles.container}>
             {this.state.catalogViewIconActive ?
              <View style={styles.container}>
                <Title user={user}/>
                <ProfileContainer user={user}/>
                <View style={styles.myContributions}>
                  <Text style={styles.bodoni}>
                    <Text style={styles.italic}>My</Text> CONTRIBUTIONS
                  </Text>
               </View>
                <UserProducts onPressMapEmblem={this.onPressMapEmblem} user={user} navigator={navigator} dataStore={dataStore}/>
              </View>
              :
                <Map onPressMapEmblem={this.onPressMapEmblem} products={user && user.products && Object.keys(user.products).map((key, i) => {
                  const product_id = user && user.products && user.products[key];
                  const product = dataStore.products[product_id];
                  return product;
                }) || []} />
              }
             </View>
         </EyespotPageBase>
         {user.uid === this.state.userId ? <Notifications user={user} dataStore={dataStore} showNotifications={this.showNotifications}/> : null}

       </View>
     );
   }
});

/*
* CSS stylings
*/

const styles = StyleSheet.create({
   container: {
     flexDirection: 'column',
     alignItems: 'center'
   },
   titleContainer: {
     flexDirection: 'column',
     alignItems: 'center',
     paddingBottom: 15
   },
   italic: {fontStyle: 'italic'},
   bodoni: {fontFamily: 'BodoniSvtyTwoITCTT-Book'},
   username: {fontSize: 30 },
   profilePicture: {
     width,
     height: height / 3,
     resizeMode: 'cover'
   },
   myContributions: {
     width,
     padding: 20
   },
   fixedFooterSpacer: {height: 60},
   fixedFooterWrapper: {
     position: 'absolute',
     top: height * 1.27
   },
   headerContainer: {
     backgroundColor: '#000',
     top: -10
   },
   layeredPageContainer: {flex: 1},
   pageTitle: {
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     bottom: height / 200
   },
   pageTitleLogo: {
     alignSelf: 'center',
     backgroundColor: 'transparent',
     width: width / 3.2,
     height: height / 24,
     resizeMode: Image.resizeMode.contain
   },
   pageTitleText: {
     color: '#fff',
     fontSize: height / 40,
     fontFamily: 'BodoniSvtyTwoITCTT-Book'

   }
});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = PersonalPage;
