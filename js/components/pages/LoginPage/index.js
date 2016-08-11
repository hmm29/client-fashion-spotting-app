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
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import Button from 'apsl-react-native-button';
import EyespotPageBase from '../EyespotPageBase';
import { LoginManager } from 'react-native-fbsdk';
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
                            LoginManager.logInWithReadPermissions(['public_profile']).then(
                              result => {
                                if (result.isCancelled) {
                                  Alert.alert('Login cancelled');
                                } else {
                                  console.log('Login success with permissions: '
                                    + result.grantedPermissions.toString());
                                  this.props.navigator.push({
                                    title: 'TabBarLayout',
                                    component: TabBarLayout,
                                    passProps: {}
                                  });
                                }
                              },
                              error => {
                                Alert.alert('Login fail with error:', error);
                              }
                            );
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
        justifyContent: 'center'
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
