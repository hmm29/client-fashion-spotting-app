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

import LoginPage from './js/components/pages/LoginPage';
import ContributePage from './js/components/pages/ContributePage';
import TabBarLayout from './js/components/layouts/TabBarLayout';
import MapPage from './js/components/pages/MapPage';

const firebaseApp = require('./js/components/firebase');


/*
 * defines the Eyespot class
 */

class Eyespot extends Component {

  componentDidMount() {

    // // Fail-Safe: check Network connectivity on load
    // NetInfo.isConnected.fetch().then(isConnected => {
    //   console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    // });
    //
    // // Fail-Safe: set up network connectivity event handler
    // NetInfo.isConnected.addEventListener(
    //   'change',
    //   this.handleConnectivityChange
    // );

  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this.handleConnectivityChange
    );
  };

  handleConnectivityChange(isConnected) {
    Alert.alert('Connectivity Change',
      (isConnected ? 'You are now online.' : 'You are now offline. Please restore connectivity (Settings > Wi-Fi) before continuing.'),
    );
  };

  /*
   * render(): returns JSX that declaratively specifies overall app UI
   */

  render() {

    firebaseApp.auth().onAuthStateChanged(function(user){
      AsyncStorage.setItem('@MyStore:uid', user.uid);
      firebaseApp.database().ref(`users/${user.uid}`).update(true);
    })

    /*
     * nextRouteProps: properties to pass to next route
     */

    const nextRouteProps = {};

    var onExit = false;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NavigatorIOS
          navigationBarHidden={true}    /* hide navigation bar */
          initialRoute={{               /* initial route in navigator */
            title: 'LoginPage',
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
