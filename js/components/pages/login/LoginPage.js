/**
 * LoginPage.js
 * Login for users with existing accounts
 *
 * @providesModule LoginPage
 * @flow
 */
'use strict'; /* enable JS strict mode for any ES5 code */

/* 
 * import modules 
 */
import React, { Component } from 'react'; 
import { 
  Dimensions,
  Image,
  StyleSheet,
  Text, 
  TextInput,
  View
} from 'react-native';

import Button from 'apsl-react-native-button';
import DiscoverPage from '../discover/DiscoverPage';
import EyespotPageBase from '../EyespotPageBase';
import FormValidator from 'validate.js';
import { LoginManager } from 'react-native-fbsdk';
import SignUpPage from '../signup/SignUpPage';

var {height, width} = Dimensions.get('window'); /* get screen dimensions */

/* 
 * define the LoginPage class 
 */
var LoginPage = React.createClass({

    /* 
     * getInitialState(): initialize the component's state variables 
     */
    getInitialState() {
        return {
            passwordText: '',
            usernameText: ''
        }
    },

    /* 
     * specify types for properties that this component receives 
     */
    propTypes: {
        
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
                            autocapitalize="none"
                            autocorrect={false}
                            onChangeText={(usernameText) => this.setState({usernameText})}
                            maxLength={30}
                            placeholder="USER NAME" 
                            placeholderTextColor="#999"
                            style={[styles.input, styles.username]} 
                            value={this.state.usernameText} />
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
                          onPress={() => {
                            /*
                             * TODO: remove this temp shortcut to Discover page
                             */
                            this.props.navigator.replace({
                                    title: 'DiscoverPage',
                                    component: DiscoverPage,
                                    passProps: {}
                            });
                          }}>
                            LOGIN WITH EMAIL
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
                                    +result.grantedPermissions.toString());
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
                            LOGIN WITH FACEBOOK
                        </Button>
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

                                })
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

/* CSS stylings */
const styles = StyleSheet.create({
    buttons: {
        alignSelf: 'center',
        borderRadius: 0,
        borderWidth: 2,
        width: width/1.4
    },
    buttonText: {
        fontSize: height/40
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    emailLogin: {
    },
    emailLoginText: {

    },
    facebookLogin: {
        borderColor: 'rgb(59,89,152)',
    },
    facebookLoginText: {
        color: 'rgba(59,89,152,0.8)'
    },
    input: {
        alignSelf: 'center',
        marginTop: height/40,
        marginBottom: height/120,
        textAlign: 'center',
        height: height/40,
        width: width/1.4
    },
    logoImg: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        width: width/1.4,
        height: height/8,
        resizeMode: Image.resizeMode.contain
    },
    loginOption: {
        borderWidth: 0,
    },
    loginOptionText: {
        color: '#aaa',
        textDecorationLine: 'underline',
        fontSize: height/40
    },
    password: {
    },
    section: {
        marginVertical: height/40
    },
    underline: {
        alignSelf: 'center',
        borderColor: '#aaa',
        borderWidth: 1,
        marginBottom: height/40,
        width: width/1.1
    },
    username: {
    }
})

/*
 * export the module so it can be imported into other components
 */
module.exports = LoginPage;