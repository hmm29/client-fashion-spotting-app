/**
 * EditProfilePage
 * Edit user account info
 *
 * @providesModule EditProfilePage
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
import EyespotPageBase from '../EyespotPageBase';
import emailIcon from './img/email-icon.png';
import genderIcon from './img/gender-icon.png';
import profileIcon from './img/profile-icon.png';
import Header from '../../partials/Header';
import ImagePicker from 'react-native-image-picker';

import firebaseApp from '../../firebase';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

/*
* defines the Categories class
* this code is for the two-column category component
*/


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
    const { user, navigateToEditProfilePage } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateToEditProfilePage(user.profilePicture)}>
        <Image
          source={{ uri : user.profilePicture || "https://res.cloudinary.com/celena/image/upload/v1468541932/u_1.png"}}
          style={styles.profilePicture} />
      </TouchableOpacity>
    );
  }

});

/*
* defines the EditProfilePage class
*/

var EditProfilePage = React.createClass({

   /*
    * specifies types for properties that this component receives
    */

   getInitialState(){
     let { user } = this.props;

      return {
        email: user.email || '',
        gender: user.gender && user.gender.capitalize() || '',
        imgSource: {uri: user.profilePicture || ''},
        username: user.username || '',
      }
   },


   propTypes: {
     dataStore: PropTypes.object,
   },

   // componentWillMount lets you call functions before anything renders
   // This is important: you can check userId and fetch dataStore before render

   componentWillMount(){
     var self = this;
     var ref = firebaseApp.database().ref();
     ref.on('value', (snap) => {
       if(snap.val()){
         this.setState({
           dataStore : snap.val(),
         })

         AsyncStorage.getItem('@MyStore:uid').then((userId) => {
           self.setState({userId});

           let { dataStore } = self.state;
           self.setState({
             contributionCount: dataStore.users && dataStore.users[userId] && dataStore.users[userId].contributionCount
           })

         });
       }
     });
   },

   launchImageLibrary() {
     let options = {
         title: null, // specify null or empty string to remove the title
         cancelButtonTitle: 'Cancel',
         takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
         chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
         customButtons: {
           'Use My Facebook Profile Photo': 'fb', // [Button Text] : [String returned upon selection]
         },
         cameraType: 'front', // 'front' or 'back'
         mediaType: 'photo', // 'photo' or 'video'
         videoQuality: 'high', // 'low', 'medium', or 'high'
         maxWidth: width, // photos only
         maxHeight: height, // photos only
         aspectX: 2, // aspectX:aspectY, the cropping image's ratio of width to height
         aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
         quality: 0.6, // photos only
         angle: 0, // photos only
         allowsEditing: true, // Built in functionality to resize/reposition the image
         noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
         //storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
         //  skipBackup: true, // image will NOT be backed up to icloud
         // path: 'images' // will save image at /Documents/images rather than the root
         //}
       };

       ImagePicker.launchImageLibrary(options, (response) => {
         console.log('Response = ', response);

         if (response.didCancel) {
           console.log('User cancelled image picker');
         }
         else if (response.error) {
           console.log('ImagePickerManager Error: ', response.error);
         } else {
           // You can display the image using either data:
           const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

           // uri on iOS
           //const source = {uri: response.uri.replace('file://', ''), isStatic: true};

           this.setState({
             imgSource: source
           });
         }
       })
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
              <BackIcon color='white' onPress={() => this.props.navigator.pop()} />
               <View style={styles.pageTitle}>
                 <Text style={styles.pageTitleText}>EDIT PROFILE</Text>
               </View>
               <TouchableOpacity onPress={this.updateProfile}>
               <Text style={styles.doneButton}>Done</Text>
               </TouchableOpacity>
           </Header>
       );
   },

   updateProfile() {
     var userRef = firebaseApp.database().ref(`users/${this.props.user.uid}`);
     userRef.update({
       email: this.state.email,
       gender: this.state.gender.toLowerCase(),
       username: this.state.username,
       profilePicture: this.state.imgSource.uri,
     });
     this.props.navigator.pop();
   },

   /*
    * render(): returns JSX that declaratively specifies page UI
    */

   render() {
     let { user } = this.props;

     return (
       <View style={styles.layeredPageContainer}>
         {this._renderHeader()}
         <EyespotPageBase
             keyboardShouldPersistTaps={false}
             noScroll={false}
             >
             <View style={styles.container}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>PROFILE</Text>
                <View style={styles.row}>
                  <Image source={profileIcon} style={styles.icon} />
                  <View style={styles.inputContainer}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(username) => this.setState({username})}
                    placeholder="Name"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.state.username} />
                  </View>
                </View>
                <View style={styles.editProfile}>
                  <Image source={this.state.imgSource} style={styles.profilePicture}/>
                  <TouchableOpacity onPress={this.launchImageLibrary} style={styles.editButton}><Text>Edit</Text></TouchableOpacity>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.section}>
              <Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text>
              <View style={styles.row}>
                <Image source={emailIcon} style={styles.icon} />
                <View style={styles.inputContainer}>
                  <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(email) => this.setState({email})}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={this.state.email} />
                </View>
                </View>
                <View style={styles.row}>
                  <Image source={genderIcon} style={styles.icon} />
                  <View style={styles.inputContainer}>
                  <TextInput autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(gender) => this.setState({gender})}
                  maxLength={6}
                  placeholder="Gender"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={this.state.gender} />
                  </View>
                  </View>
              </View>
             </View>
         </EyespotPageBase>
       </View>
     );
   }
});

/*
* CSS stylings
*/

const profilePictureSize = width/2.2;
const iconSize = height/30;

const styles = StyleSheet.create({
   container: {
     flexDirection: 'column',
     alignItems: 'center',
   },
   titleContainer: {
     flexDirection: 'column',
     alignItems: 'center',
     paddingVertical: height/80
   },
   italic: {fontStyle: 'italic'},
   bodoni: {fontFamily: 'BodoniSvtyTwoITCTT-Book'},
   editButton: {
     marginLeft: width/20
   },
   editProfile: {
     width: width/1.4,
     left: width/6,
     padding: height/30,
     justifyContent: 'space-between',
     flexDirection: 'row',
     alignItems: 'center'
   },
   profilePicture: {
     width,
     height: height / 3,
     resizeMode: 'cover'
   },
   divider: {
     width,
     borderWidth: 1,
     borderColor: 'black'
   },
   icon: {
     width: iconSize,
     height: iconSize,
     resizeMode: Image.resizeMode.contain
   },
   input: {
     textAlign: 'left',
     height: height / 20,
     width: width / 1.3,
     fontFamily: 'Avenir-Book',
     paddingBottom: height/100,
     fontSize: height/50
   },
   inputContainer: {
     height: height / 20,
     width: width / 1.3,
     borderBottomWidth: 2,
     left: width / 7,
     borderColor: 'black',
     marginTop: height / 40,
     marginBottom: height / 240,
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
   doneButton: {
     color: '#fff'
   },
   section: {
     marginVertical: height / 40
   },
   sectionTitle: {
     fontFamily: 'Avenir-Medium'
   },
   profilePicture: {
     width: profilePictureSize,
     height: profilePictureSize,
   },
   row: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
   }
});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = EditProfilePage;
