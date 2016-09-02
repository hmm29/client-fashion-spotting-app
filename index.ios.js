/**
 * index.ios.js
 * Top-level iOS file for registering and running the app
 */

'use strict'; /* enables JS strict mode for any ES5 code */

/*
 * imports required modules
 */

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  AsyncStorage,
  NavigatorIOS,
  NetInfo,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

import OnboardingPage from './js/components/pages/OnboardingPage';
import Orientation from 'react-native-orientation';
import TabBarLayout from './js/components/layouts/TabBarLayout';

const firebaseApp = require('./js/components/firebase');

/*
 * defines the Eyespot class
 */

class Eyespot extends Component {

  componentWillMount() {
    var self = this;

    // Lock to portrait mode
    Orientation.lockToPortrait();

    // Login check

    AsyncStorage.getItem('@MyStore:uid')
      .then(uid => {
        if(!uid) {
          setTimeout(() => {
            self.refs.nav.push({
               title: 'OnboardingPage',
               component: OnboardingPage,
            })
          }, 2000);
        }
    });

    // Fail-Safe: check Network connectivity on load
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    });

    // Fail-Safe: set up network connectivity event handler
    NetInfo.isConnected.addEventListener(
      'change',
      this.handleConnectivityChange
    );

  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this.handleConnectivityChange
    );
  };

  handleConnectivityChange(isConnected) {
    if(!isConnected) Alert.alert('You are offline.', 'Please restore connectivity (Settings > Wi-Fi) before continuing.');
  };

  /*
   * render(): returns JSX that declaratively specifies overall app UI
   */

  render() {
    /*
     * nextRouteProps: properties to pass to next route
     */

    const nextRouteProps = {};

    var onExit = false;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NavigatorIOS
          ref='nav'
          navigationBarHidden={true}    /* hide navigation bar */
          initialRoute={{               /* initial route in navigator */
            title: 'TabBarLayout',
            component: TabBarLayout,
          }}
          itemWrapperStyle={styles.itemWrapper} /* styles for nav background */
          style={{flex: 1}} />
      </View>
    );
  }
}

/*
 * CSS stylings
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  itemWrapper: {
    backgroundColor: '#fff',
    marginTop: 20
  }
});

/*
 * registers this component as the top-level app
 */

AppRegistry.registerComponent('Eyespot', () => Eyespot);
