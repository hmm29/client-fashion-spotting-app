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
        <StatusBar
            translucent={true}
            backgroundColor="rgba(0, 0, 0, 0.2)"
            barStyle="light-content" />
        <NavigatorIOS
          navigationBarHidden={true}
          style={styles.navigator}
          initialRoute={{
            title: "",
            component: null,
            passProps: onExit,
          }}
          itemWrapperStyle={styles.itemWrapper} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemWrapper: {

  },
  navigator: {

  }
});

AppRegistry.registerComponent('Eyespot', () => Eyespot);
