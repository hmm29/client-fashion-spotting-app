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

import _ from 'lodash';
import BackIcon from '../../partials/icons/navigation/BackIcon';
import Button from 'apsl-react-native-button';
import CatalogViewIcon from '../../partials/icons/product/CatalogViewIcon';
import EditProfilePage from '../EditProfilePage';
import MapsViewIcon from '../../partials/icons/product/MapsViewIcon';
import EyespotPageBase from '../EyespotPageBase';
import Header from '../../partials/Header';
import FilterBar from '../../partials/FilterBar';
import Footer from '../../partials/Footer';
import Map from '../../partials/Map';
import MoreIcon from '../../partials/icons/navigation/MoreIcon'
import Product from '../../partials/Product';
import ProductFeed from '../ProductFeed';
import Notifications from '../../partials/Notifications';
import NotificationsPage from '../NotificationsPage';
import EyespotNegativeLogo from '../../partials/img/eyespot-logo-negative.png';
import Swiper from 'react-native-swiper';
import TabBarLayout from '../../layouts/TabBarLayout';

import firebaseApp from '../../firebase';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */
var SWIPER_REF = 'PersonalPageSwiper';
var SIZE_OF_PRODUCT_ITEM = height * 0.9;

function addKeyToProducts(allProducts){
  if(!allProducts) return;

  var product_keys = Object.keys(allProducts);
  var products = allProducts;
  product_keys.map(function(key){
    products[key]['.key'] = key;
  })
  return products
}

var Title = React.createClass({

  render() {
    const { user } = this.props;
    if(!(user && user.username)){
      return null
    }
    return (
      <View style={styles.titleContainer}>
        <Text style={[styles.italic, styles.bodoni]}>by</Text>
        <Text style={[styles.username, styles.bodoni]}>{user.username && user.username.toUpperCase()}</Text>
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
          source={{ uri : user && user.profilePicture || "https://res.cloudinary.com/celena/image/upload/v1468541932/u_1.png"}}
          style={styles.profilePicture} />
      </View>
    );
  }

});


var UserProducts = React.createClass({

  /*
   * onScroll(): keep track of product flipboard item index and direction of swiping
   */

  onScroll(event) {
     var currentOffset = event.nativeEvent.contentOffset.x;
     var direction = currentOffset > this.offset ? 'down' : 'up';
     var hasChangedItem = Math.abs(currentOffset-this.offset) > SIZE_OF_PRODUCT_ITEM;
     this.offset = currentOffset;

     if(direction == 'down' && hasChangedItem) {
       this.currentProductSwiperPageIndex = this.currentProductSwiperPageIndex+1;
     }
     else if (direction === 'up' && hasChangedItem) {
       this.currentProductSwiperPageIndex = this.currentProductSwiperPageIndex-1;
     }
 },

  render() {
    const { user, dataStore, onPressMapEmblem, navigator } = this.props;

    if(!user.products){
      return null
    }


    return (
      <View style ={styles.products}>
        <Swiper ref={SWIPER_REF}
                index={this.currentProductSwiperPageIndex}
                bounces={false}
                loop={false}
                horizontal={false}
                onScroll={this.onScroll}
                scrollEnabled={true}
                scrollEventThrottle={-1000}
                showsPagination={false}
                style={styles.wrapper}>
                {user && user.products && Object.keys(user && user.products) && _.reverse(Object.keys(user && user.products)).map((key, i) => {


                 /*
                  * return Product component for each product
                  */
                  const product_id = user && user.products && user.products[key];

                  const product = dataStore.products[product_id];
                  _.assign(product, {'.key': product_id})

                  if(!product){
                    return null
                  }

                  return (
                    <Product
                      key={i}
                      navigator={navigator}
                      onPressMapEmblem={() => {navigator.pop(); onPressMapEmblem()}}
                      product={product}
                      style={styles.product}
                      user={user}/>
                  );
                }) || []}
            </Swiper>
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

   // componentWillMount lets you call functions before initial render
   // This is important: you can check userId and fetch dataStore before render

   componentWillMount(){
     var self = this;
     var ref = firebaseApp.database().ref();
     ref.on('value', (snap) => {
       if(snap.val()){
         this.setState({
           dataStore: snap.val()
         })

         AsyncStorage.getItem('@MyStore:uid').then((userId) => {
           let { dataStore } = self.state;
           self.setState({
             contributionCount: dataStore.users && dataStore.users[userId] && dataStore.users[userId].contributionCount || 0,
             likeCount: dataStore.users && dataStore.users[userId] && dataStore.users[userId].likeCount || 0,
             userId
           })
         });
       }
     });
   },

   navigateToEditProfilePage(user) {
     this.props.navigator.push({
       title: 'Edit Profile Page',
       component: EditProfilePage,
       passProps: {
         user
       }
     })
   },

   showLikedProducts() {
     let { navigator } = this.props;

     navigator.push({
       title: 'ProductFeed',
       component: ProductFeed,
       passProps: {
         lastPage: "PersonalPage",
         userId: this.state.userId
       }
     });
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
    * _renderHeader(): renders the imported header component
    */

   _renderHeader() {
       const backIcon = (
         <BackIcon color='white' onPress={() => this.props.navigator.pop()} />
       );
       const currentRoute = this.props.navigator.navigationContext.currentRoute;

       return (
           <Header containerStyle={styles.headerContainer}>
               {currentRoute.title !== 'TabBarLayout' ? backIcon : <MoreIcon onPress={() => this.navigateToEditProfilePage(this.props.user || {})} />}
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

   /*
   * _renderFooter(): renders the imported footer component
   */

  _renderFooter() {
    return (
        <Footer navigator={this.props.navigator} />
    );
  },

   /*
    * render(): returns JSX that declaratively specifies page UI
    */

   render() {

     let { contributionCount, dataStore, likeCount } = this.state;
     let { navigator, user } = this.props;
     if(!user){
       return null
     }

     if(dataStore && dataStore.products) {
       dataStore.products = addKeyToProducts(dataStore.products);
     }

     return (
       <View style={styles.layeredPageContainer}>
         {this._renderHeader()}
         <EyespotPageBase
             keyboardShouldPersistTaps={false}
             noScroll={false}
             style={(this.state.mapsViewIconActive ? {height, bottom: height/45} : {})}
             >
             <View style={styles.container}>
             {this.state.catalogViewIconActive ?
              <View style={styles.container}>
                <Title user={user}/>
                <ProfileContainer user={user}/>
                {user.uid === this.state.userId ? <Notifications user={user} dataStore={dataStore} showNotifications={this.showNotifications}/> : null}
                <View style={styles.stats}>
                  <Text style={styles.bodoni}>
                    <Text style={styles.italic}>My</Text> CONTRIBUTIONS
                    <Text style={styles.num}>  {user.uid === this.state.userId ? contributionCount : user && user.products && Object.keys(user.products) && Object.keys(user.products).length}</Text>
                  </Text>
                  {user.uid === this.state.userId ? <TouchableOpacity onPress={this.showLikedProducts}><Text style={[styles.bodoni, {left: width/30}, styles.gray]}>
                    <Text style={styles.italic}>My</Text> Likes
                    <Text style={[styles.num, styles.gray]}>  {likeCount}</Text>
                  </Text></TouchableOpacity> : null}
               </View>
                <UserProducts onPressMapEmblem={this.onPressMapEmblem} user={user} navigator={navigator} dataStore={dataStore}/>
              </View>
              :
                <Map navigator={navigator} onPressMapEmblem={null} products={user && user.products && Object.keys(user.products).map((key, i) => {
                  const product_id = user && user.products && user.products[key];
                  const product = dataStore && dataStore.products && dataStore.products[product_id];
                  return product;
                }) || []} />
              }
             </View>
         </EyespotPageBase>
         {this._renderFooter()}
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
     paddingVertical: height/80
   },
   italic: {fontStyle: 'italic'},
   bodoni: {fontFamily: 'BodoniSvtyTwoITCTT-Book'},
   num: {
     color: 'red',
     fontFamily: 'Avenir-Roman',
     fontSize: height/58
   },
   username: {fontSize: 30 },
   profilePicture: {
     width,
     height: height / 3,
     resizeMode: 'cover'
   },
   stats: {
     width,
     padding: 20,
     marginBottom: height/550,
     flexDirection: 'row',
     justifyContent: 'flex-start'
   },
   fixedFooterSpacer: {height: 60},
   fixedFooterWrapper: {
     position: 'absolute',
     top: height * 1.27
   },
   gray: {
     color: '#999'
   },
   headerContainer: {
     backgroundColor: '#000',
    bottom: height / 45
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
     width: width / 3.9,
     height: height / 30,
     resizeMode: Image.resizeMode.contain
   },
   pageTitleText: {
     color: '#fff',
     fontSize: height / 40,
     fontFamily: 'BodoniSvtyTwoITCTT-Book'

   },
   product: {
     bottom: 0,
   },
   products: {
     flexDirection: 'column',
     justifyContent: 'flex-start',
   },
   wrapper: {
     backgroundColor: '#fff',
     width
   }
});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = PersonalPage;
