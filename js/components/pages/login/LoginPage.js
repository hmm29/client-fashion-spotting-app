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
import FormValidator from 'validate.js';
import { LoginManager } from 'react-native-fbsdk';
import SignUpPage from '../signup/SignUpPage';
import TabBarLayout from '../../layouts/TabBarLayout';
import DiscoverPage from '../discover/DiscoverPage';


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
            usernameText: ''
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
                            autocapitalize="none"
                            autocorrect={false}
                            onChangeText={(usernameText) => this.setState({usernameText})}
                            maxLength={30}
                            placeholder="USER NAME"
                            placeholderTextColor="#777"
                            style={[styles.input, styles.username]}
                            value={this.state.usernameText} />
                            <View style={styles.underline} />
                        <TextInput
                            autocapitalize="none"
                            autocorrect={false}
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

                            /*
                             * TODO: remove this temp shortcut to Discover page
                             */
                            this.props.navigator.replace({
                                    title: 'TabBarLayout',
                                    component: TabBarLayout,
                                    passProps: {}
                            });
                          }}>
                            <Image
                              source={require('../../partials/img/login-with-email.png')}
                              style={[styles.emailLogin, styles.buttons]} />
                          </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            LoginManager.logInWithReadPermissions(['public_profile']).then(
                              function(result) {
                                if (result.isCancelled) {
                                  alert('Login cancelled');
                                } else {
                                  alert('Login success with permissions: '
                                    + result.grantedPermissions.toString());
                                  this.props.navigator.replace({
                                    title: 'DiscoverPage',
                                    component: DiscoverPage,
                                    passProps: {}
                                  });
                                }
                              },
                              function(error) {
                                alert('Login fail with error: ' + error);
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
    },
    username: {}
});

/*
 * exports this component as a module so it can be imported into other modules
 */

module.exports = LoginPage;
