/**
 * Eyespot
 * Top-level app component
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

import LoginPage from './js/components/pages/login/LoginPage';
import DiscoverPage from './js/components/pages/discover/DiscoverPage';

class Eyespot extends Component {
  render() {
    const onExit = {};

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NavigatorIOS
          navigationBarHidden={true}
          initialRoute={{
            title: 'LoginPage',
            component: DiscoverPage,
            passProps: onExit,
          }}
          itemWrapperStyle={styles.itemWrapper}
          style={{flex: 1}} />
      </View>
    );
  }
}

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

AppRegistry.registerComponent('Eyespot', () => Eyespot);
