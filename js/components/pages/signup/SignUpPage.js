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

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native';

import BackIcon from '../../partials/icons/navigation/BackIcon';
import Button from 'apsl-react-native-button';
import DiscoverPage from '../discover/DiscoverPage';
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
            passwordText: '',
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
                <BackIcon color="#444" onPress={() => this.props.navigator.pop()} />
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
                            placeholderTextColor="#999"
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
                            placeholderTextColor="#999"
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
                        <Button
                          style={[styles.emailLogin, styles.buttons]} textStyle={[styles.emailLoginText, styles.buttonText]}
                          onPress={() => {}}>
                            SIGN UP
                        </Button>
                        <Button
                          style={[styles.facebookLogin, styles.buttons]} textStyle={[styles.facebookLoginText, styles.buttonText]}
                          onPress={() => {
                            LoginManager.logInWithReadPermissions(['public_profile']).then(
                              function(result) {
                                if (result.isCancelled) {
                                  alert('Login cancelled');
                                } else {
                                  alert('Login success with permissions: '
                                    + result.grantedPermissions.toString());
                                  this.props.navigator.resetTo({
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
                            LOGIN WITH FACEBOOK
                        </Button>
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
        borderRadius: 0,
        borderWidth: 2,
        width: width / 1.4
    },
    buttonText: {fontSize: height / 40},
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
    headerContainer: {marginBottom: 10},
    input: {
        alignSelf: 'center',
        marginTop: height / 60,
        marginBottom: height / 240,
        textAlign: 'center',
        height: height / 40,
        width: width / 1.4
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
        color: '#aaa',
        textDecorationLine: 'underline',
        fontSize: height / 40
    },
    section: {marginVertical: height / 40},
    underline: {
        alignSelf: 'center',
        borderColor: '#aaa',
        borderWidth: 1,
        marginBottom: height / 40,
        width: width / 1.1
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
