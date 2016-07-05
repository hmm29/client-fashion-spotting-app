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

class Eyespot extends Component {
  render() {
    const onExit = {};

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NavigatorIOS
          navigationBarHidden={true}
          style={styles.nav}
          initialRoute={{
            title: '',
            component: View,
            passProps: onExit,
          }}
          itemWrapperStyle={styles.itemWrapper} />
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

  },
  nav: {

  }
});

AppRegistry.registerComponent('Eyespot', () => Eyespot);
