/**
 * LoginPage.js
 * Login for users with existing accounts
 *
 * @providesModule LoginPage
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
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import Button from 'apsl-react-native-button';
import Communications from 'react-native-communications';
import EyespotPageBase from '../EyespotPageBase';
import { FBLoginManager } from 'react-native-facebook-login';
import SignUpPage from '../SignupPage';
import TabBarLayout from '../../layouts/TabBarLayout';

const firebaseApp = require('../../firebase');

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

/*
 * defines the LoginPage class
 */

var LoginPage = React.createClass({

    /*
     * getInitialState(): returns object with initialized component state variables
     */

    getInitialState() {
        return {
            passwordText: '',
            emailText: ''
        };
    },

    /*
     * specifies types for properties that this component receives
     */

    propTypes: {},

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
                    <View style={styles.section}>
                          <Image source={require('../../partials/img/eyespot-logo.png')}
                                style={styles.logoImg} />
                    </View>
                    <View style={styles.section}>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(emailText) => this.setState({emailText})}
                            maxLength={30}
                            placeholder="EMAIL"
                            placeholderTextColor="#777"
                            style={styles.input}
                            value={this.state.emailText} />
                            <View style={styles.underline} />
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(passwordText) => this.setState({passwordText})}
                            maxLength={16}
                            placeholder="PASSWORD"
                            placeholderTextColor="#777"
                            secureTextEntry={true}
                            style={[styles.input, styles.password]}
                            value={this.state.passwordText} />
                            <View style={styles.underline} />
                    </View>
                    <View style={styles.section}>
                           <TouchableOpacity onPress={() => {
                            firebaseApp.auth().signInWithEmailAndPassword(this.state.emailText, this.state.passwordText)
                            .then((user) => {
                                 this.props.navigator.push({
                                    title: 'TabBarLayout',
                                    component: TabBarLayout,
                                    passProps: {}
                                });
                                console.log("Authenticated successfully with payload:", user);
                            }).catch((error) => {
                              Alert.alert("Login Failed", error.message);
                            })

                          }}>
                            <Image
                              source={require('../../partials/img/login-with-email.png')}
                              style={[styles.emailLogin, styles.buttons]} />
                          </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            var self = this;
                            FBLoginManager.loginWithPermissions([], function(error, data){
                              if (!error && data) {
                                let { credentials } = data;
                                let api = `https://graph.facebook.com/v2.3/${credentials.userId}?fields=name,email,gender,age_range&access_token=${credentials.token}`;
                                fetch(api)
                                      .then(response => response.json())
                                      .then(responseData => {
                                        self.updateUserWithFacebookSignInData(credentials.userId, responseData);
                                      })
                                      .done(() => {
                                        self.props.navigator.push({
                                           title: 'TabBarLayout',
                                           component: TabBarLayout,
                                           passProps: {}
                                       });
                                      })

                              } else {
                                Alert.alert("Login Error: ", error);
                              }
                            })
                          }}>
                            <Image
                                source={require('../../partials/img/login-with-facebook.png')}
                                style={[styles.facebookLogin, styles.buttons]} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section}>
                        <Button
                            style={styles.loginOption}
                            textStyle={styles.loginOptionText}
                            onPress={() => {
                                this.props.navigator.push({
                                    title: 'SignUpPage',
                                    component: SignUpPage,
                                    passProps: {}

                                });
                            }} >
                            New User? Sign Up Now!
                        </Button>
                        <Button
                            style={[styles.loginOption, {bottom: 20}]}
                            textStyle={styles.loginOptionText}
                            onPress={() => {
                              // FIXME: Needs to be revised,
                              // This password recovery is super primitive because
                              // React Native doesn't offer open-source tools for password resets at the time
                              AsyncStorage.getItem('@MyStore:uid').then((userId) => {
                                var ref = firebaseApp.database().ref('users');
                                ref.once('value', (snap) => {
                                  if(snap.val() && snap.val()[userId] && snap.val()[userId].email && snap.val()[userId].password){
                                    Communications.email([snap.val()[userId].email], null, null, 'Eyespot: Recovered Password', `Hi, ${snap.val()[userId].name}! Your recovered Eyespot password is ${snap.val()[userId].password}. Thanks for using Eyespot!`);
                                    Alert.alert('Email Success', 'Your recovered password has been sent to your email!');
                                  } else if(snap.val() && snap.val()[userId] && snap.val()[userId].email) {
                                    Alert.alert('Email Login Not Found', 'We did not find a password for your email. You may have previously signed up with Facebook.');
                                  } else {
                                    Alert.alert('Email Send Error', 'We could not send a password recovery email to your address, as there is no email on file. Please log in with another method.');
                                  }
                                });
                              });
                            }}>
                            Forgot Password?
                        </Button>
                    </View>
                </View>
            </EyespotPageBase>
        );
    }
});

/*
 * CSS stylings
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
        marginTop: height / 15,
        flexDirection: 'column',
        justifyContent: 'center',
        width,
        height
    },
    input: {
        alignSelf: 'center',
        marginTop: height / 40,
        marginBottom: height / 120,
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
    loginOption: {borderWidth: 0 },
    loginOptionText: {
        color: '#777',
        textDecorationLine: 'underline',
        fontSize: height / 40,
        fontFamily: 'Avenir-Book'
    },
    password: {},
    section: {marginVertical: height / 40},
    underline: {
        alignSelf: 'center',
        borderColor: '#aaa',
        borderWidth: 1,
        marginBottom: height / 40,
        width: width
    }
});

/*
 * exports this component as a module so it can be imported into other modules
 */

module.exports = LoginPage;
