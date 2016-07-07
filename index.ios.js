/**
 * index.ios.js
 * Top-level iOS file for registering and running the app 
 */
'use strict'; /* enable JS strict mode for any ES5 code */

/* 
 * import modules 
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

import LoginPage from './js/components/pages/login/LoginPage';

/* 
 * defines the Eyespot class 
 */
class Eyespot extends Component {

  render() {
    /* 
     * nextRouteProps: properties to pass to next route 
     */
    const nextRouteProps = {};

    /* 
     * render(): returns JSX that declaratively specifies page UI 
     */
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NavigatorIOS
          navigationBarHidden={true}    /* hide navigation bar */
          initialRoute={{               /* initial route in navigator */
            title: 'LoginPage',
            component: LoginPage,
            passProps: nextRouteProps,
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
 * register component as top-level app
 */
AppRegistry.registerComponent('Eyespot', () => Eyespot);
