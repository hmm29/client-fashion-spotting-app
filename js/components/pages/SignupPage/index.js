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

import DiscoverPage from '../DiscoverPage';
import BackIcon from '../../partials/icons/navigation/BackIcon';
import Button from 'apsl-react-native-button';
import EyespotPageBase from '../EyespotPageBase';
import Header from '../../partials/Header';
import { LoginManager } from 'react-native-fbsdk';

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
                            autocapitalize="none"
                            autocorrect={false}
                            onChangeText={(nameText) => this.setState({nameText})}
                            maxLength={25}
                            placeholder="NAME"
                            placeholderTextColor="#777"
                            secureTextEntry={true}
                            style={[styles.input, styles.name]}
                            value={this.state.nameText} />
                            <View style={styles.underline} />
                        <TextInput
                            autocapitalize="none"
                            autocorrect={false}
                            onChangeText={(nicknameText) => this.setState({nicknameText})}
                            maxLength={25}
                            placeholder="NICKNAME"
                            placeholderTextColor="#777"
                            secureTextEntry={true}
                            style={[styles.input, styles.nickname]}
                            value={this.state.nicknameText} />
                            <View style={styles.underline} />
                        <TextInput
                            autocapitalize="none"
                            autocorrect={false}
                            onChangeText={(emailAddressText) => this.setState({emailAddressText})}
                            maxLength={30}
                            placeholder="EMAIL ADDRESS"
                            placeholderTextColor="#999"
                            style={[styles.input, styles.emailAddress]}
                            value={this.state.emailAddressText} />
                            <View style={styles.underline} />
                        <TextInput
                            autocapitalize="none"
                            autocorrect={false}
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
                            var ref = new Firebase("https://eyespot-658a5.firebaseio.com");
                            ref.createUser({
                              email    : this.state.emailAddressText,
                              password : this.state.passwordText
                            }, function(error, userData) {
                              if (error) {
                                switch (error.code) {
                                  case "EMAIL_TAKEN":
                                    Alert.alert("The new user account cannot be created because the email is already in use.");
                                    break;
                                  case "INVALID_EMAIL":
                                    Alert.alert("The specified email is not a valid email.");
                                    break;
                                  default:
                                    Alert.alert("Error creating user", error);
                                }
                              } else {
                                // HACK: store the email in the local data store, for now

                                AsyncStorage.setItem(`EMAIL_FOR_UNAME_${this.state.nameText}`, this.state.emailAddressText)
                                    .catch(error => console.log(error.message))
                                    .done();
                                console.log("Successfully created user account with uid:", userData.uid);
                              }
                            });
                          }}>
                            <Image
                              source={require('../../partials/img/sign-up.png')}
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
