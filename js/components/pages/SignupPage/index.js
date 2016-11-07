/**
 * SignUpPage.js
 * Sign up for new users
 *
 * @providesModule SignUpPage
 * @flow
 */

 'use strict'; /* enables JS strict mode for any ES5 code */

/*
 * imports required modules
 */

import React from 'react';
import {
  Alert,
  AsyncStorage,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';

import BackIcon from '../../partials/icons/navigation/BackIcon';
import Button from 'apsl-react-native-button';
import EyespotPageBase from '../EyespotPageBase';
import Header from '../../partials/Header';
import SocialAuth from 'react-native-social-auth';
import TabBarLayout from '../../layouts/TabBarLayout';

const firebaseApp = require('../../firebase');

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

/*
 * defines the SignUpPage class
 */

var SignUpPage = React.createClass({

    /*
     * getInitialState(): returns object with initialized component state variables
     */

    getInitialState() {
        return {
            emailAddressText: '',
            nameText: '',
            nicknameText: '',
            passwordText: ''
        };
    },

    /*
     * specifies types for properties that this component receives
     */

    propTypes: {},

    /*
     * _renderHeader(): renders the imported header component
     */

    _renderHeader() {
        return (
            <Header containerStyle={styles.headerContainer}>
                <BackIcon color='black' onPress={() => this.props.navigator.pop()} />
                <View />
            </Header>
        );
    },

    /*
     * updateUserWithEmailSignInData(): create user profile with Firebase email/password login data
     */

    updateUserWithEmailSignInData(){
      var self = this;

      firebaseApp.auth().onAuthStateChanged(function(user){
        if(user) {
          // if user is signed in
          // store user id in async storage
          var userId = user.uid;
          console.log('updateUserWithEmailSignInData()');
          console.log('userId', userId);
          if(!userId){ return };
          if(!self.state.emailAddressText){ return };
          var userRef = firebaseApp.database().ref(`users/${userId}`);
          console.log(self.state.emailAddressText, self.state.nameText);
          userRef.set({
            email: self.state.emailAddressText.toLowerCase(),
            name: self.state.nameText,
            password: self.state.passwordText,
            profilePicture: "",
            username: self.state.nicknameText,
            uid: user.uid
          });

          AsyncStorage.setItem('@MyStore:uid', userId);
        }
      });

    },

    /*
     * updateUserWithFacebookSignInData(): create user profile with Facebook login data
     */

    updateUserWithFacebookSignInData(userId, responseData) {
      var userRef = firebaseApp.database().ref(`users/${userId}`);
      userRef.update({
        name: responseData.name,
        gender: responseData.gender,
        profilePicture: `https://res.cloudinary.com/celena/image/facebook/q_90/${userId}.jpg`,
        username: responseData.name,
        uid: userId
      });

      // set userId in local storage
      AsyncStorage.setItem('@MyStore:uid', userId);
    },

    /*
     * render(): returns JSX that declaratively specifies page UI
     */

    render() {
        return (
            <EyespotPageBase
                keyboardShouldPersistTaps={false}
                noScroll={true}>
                <View style={styles.container}>
                    {this._renderHeader()}
                    <View style={styles.section}>
                          <Image source={require('../../partials/img/eyespot-logo.png')}
                                style={styles.logoImg} />
                    </View>
                    <View style={styles.section}>
                         <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(nameText) => this.setState({nameText})}
                            maxLength={25}
                            placeholder="NAME"
                            placeholderTextColor="#777"
                            style={[styles.input, styles.name]}
                            value={this.state.nameText} />
                            <View style={styles.underline} />
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(nicknameText) => this.setState({nicknameText})}
                            maxLength={25}
                            placeholder="NICKNAME"
                            placeholderTextColor="#777"
                            style={[styles.input, styles.nickname]}
                            value={this.state.nicknameText} />
                            <View style={styles.underline} />
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(emailAddressText) => this.setState({emailAddressText})}
                            maxLength={30}
                            placeholder="EMAIL ADDRESS"
                            placeholderTextColor="#999"
                            style={[styles.input, styles.emailAddress]}
                            value={this.state.emailAddressText} />
                            <View style={styles.underline} />
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(passwordText) => this.setState({passwordText})}
                            maxLength={16}
                            placeholder="PASSWORD"
                            placeholderTextColor="#999"
                            secureTextEntry={true}
                            style={[styles.input, styles.password]}
                            value={this.state.passwordText} />
                            <View style={styles.underline} />
                    </View>
                    <View style={styles.section}>
                        <TouchableOpacity onPress={() => {
                            firebase.auth().createUserWithEmailAndPassword(this.state.emailAddressText, this.state.passwordText)
                            .then((user) => {
                              this.updateUserWithEmailSignInData();
                              this.props.navigator.push({
                                title: 'TabBarLayout',
                                component: TabBarLayout,
                                passProps: {userId: user.uid}
                              });
                            })
                            .catch((error) => {
                              // Handle Errors here.
                              var errorCode = error.code;
                              var errorMessage = error.message;
                              Alert.alert('Error Creating User:', errorMessage);
                            });
                          }}>
                            <Image
                              source={require('../../partials/img/sign-up.png')}
                              style={[styles.emailLogin, styles.buttons]} />
                          </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            var self = this;

                            SocialAuth.setFacebookApp({id: '270246266700258', name: 'Eyespot'});
                            SocialAuth.getFacebookCredentials(["email", "user_friends"], SocialAuth.facebookPermissionsType.read)
                            .then((credentials) => {
                              let api = `https://graph.facebook.com/v2.3/${credentials.userId}?fields=name,email,gender,age_range&access_token=${credentials.accessToken}`;
                              fetch(api)
                                    .then(response => response.json())
                                    .then(responseData => {
                                      self.updateUserWithFacebookSignInData(credentials.userId, responseData);
                                    })
                                    .done(() => {
                                      self.props.navigator.push({
                                         title: 'TabBarLayout',
                                         component: TabBarLayout,
                                         passProps: {userId: credentials.userId}
                                     });
                                    })
                            })
                            .catch((error) => {
                              if(!error.cancelled) Alert.alert('Login Error', 'The operation could not be completed. Please try again.');
                              console.log(error);
                            });
                          }}>
                            <Image
                                source={require('../../partials/img/login-with-facebook.png')}
                                style={[styles.facebookLogin, styles.buttons]} />
                        </TouchableOpacity>
                    </View>
                </View>
            </EyespotPageBase>
        );
    }
});

/*
 * CSS stylings
 * These stylings are accessed in the styles object
 * e.g. styles.buttons, styles.container
 */

const styles = StyleSheet.create({
    buttons: {
        alignSelf: 'center',
        marginVertical: height/100,
        width: width / 1.4,
        height: height/14,
        resizeMode: Image.resizeMode.contain
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: height / 20
    },
    emailLogin: {},
    emailLoginText: {},
    facebookLogin: {borderColor: 'rgb(59,89,152)' },
    facebookLoginText: {color: 'rgba(59,89,152,0.8)'},
    headerContainer: {marginBottom: 10, top: height/24},
    input: {
        alignSelf: 'center',
        marginTop: height / 40,
        marginBottom: height / 240,
        textAlign: 'center',
        height: height / 40,
        width: width / 1.4,
        fontFamily: 'Avenir-Book'
    },
    logoImg: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        width: width / 1.4,
        height: height / 8,
        resizeMode: Image.resizeMode.contain
    },
    section: {marginVertical: height / 40},
    underline: {
        alignSelf: 'center',
        borderColor: '#777',
        borderWidth: 1,
        marginBottom: height / 40,
        width: width
    },
    username: {
        height: height / 40,
        width: width / 1.4
    }
});

/*
 * exports this component as a module so it can be imported into other modules
 */

module.exports = SignUpPage;
