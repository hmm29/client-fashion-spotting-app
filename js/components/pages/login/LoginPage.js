/**
 * LoginPage.js
 * Login for users with existing accounts
 *
 * @providesModule LoginPage
 * @flow
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
import EyespotPageBase from '../EyespotPageBase';
import FormValidator from 'validate.js';

var {height, width} = Dimensions.get('window')

var LoginPage = React.createClass({
    getInitialState() {
        return {
            passwordText: '',
            usernameText: ''
        }
    },

    propTypes: {
        
    },

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
                          onPress={() => {}}>
                            LOGIN WITH EMAIL
                        </Button>
                        <Button
                          style={[styles.facebookLogin, styles.buttons]} textStyle={[styles.facebookLoginText, styles.buttonText]}
                          onPress={() => {}}>
                            LOGIN WITH FACEBOOK
                        </Button>
                    </View>
                    <View style={styles.section}>
                        <Button 
                            style={styles.loginOption}
                            textStyle={styles.loginOptionText}
                            onPress={() => {

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

const styles = StyleSheet.create({
    buttons: {
        alignSelf: 'center',
        borderRadius: 0,
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
        borderWidth: 2
    },
    emailLoginText: {

    },
    facebookLogin: {
        borderColor: 'rgb(59,89,152)',
        borderWidth: 2
    },
    facebookLoginText: {
        color: 'rgba(59,89,152,0.8)'
    },
    input: {
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        marginTop: height/40,
        marginBottom: height/120,
        textAlign: 'center',
        textDecorationLine: 'underline'
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
        height: height/40,
        width: width/1.4
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
        height: height/40,
        width: width/1.4
    }
})

module.exports = LoginPage;
