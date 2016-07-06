/**
 * Eyespot
 * Top-level app component 
 */
'use strict'; /* use JS strict mode for any ES5 code */

/* import modules */
import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

import LoginPage from './js/components/pages/login/LoginPage';

/* define the Eyespot class */
class Eyespot extends Component {
  render() {
    const nextRouteProps = {}; /* properties to pass to next route */

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NavigatorIOS
          navigationBarHidden={true}
          initialRoute={{
            title: 'LoginPage',
            component: LoginPage,
            passProps: nextRouteProps,
          }}
          itemWrapperStyle={styles.itemWrapper} 
          style={{flex: 1}} />
      </View>
    );
  }
}

/* CSS stylings */
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

/* register component as top-level app */
AppRegistry.registerComponent('Eyespot', () => Eyespot);
