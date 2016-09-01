/**
 * EyespotPageBase.js
 * Standard page base component
 *
 * @providesModule EyespotPageBase
 * @flow
 */

'use strict'; /* enables JS strict mode for any ES5 code */

/*
 * imports required modules
 */

import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

/*
 * defines the EyespotPageBase class
 */

var EyespotPageBase = React.createClass({

  /*
   * specifies types for properties that this component receives
   */

  propTypes: {
      keyboardShouldPersistTaps: React.PropTypes.bool,
      noScroll: React.PropTypes.bool
  },

  /*
   * render(): returns JSX that declaratively specifies page UI
   */

  render() {
    let ContentWrapper;
    let wrapperProps = {};

    if (this.props.noScroll) {
      ContentWrapper = (ScrollView: ReactClass<any>);
    } else {
      ContentWrapper = (ScrollView: ReactClass<any>);
      wrapperProps.keyboardDismissMode = 'interactive';
      wrapperProps.keyboardShouldPersistTaps = true;
    }

    return (
      <View style={styles.container}>
        <ContentWrapper
          automaticallyAdjustContentInsets={false}
          scrollEnabled={!this.props.noScroll}
          contentContainerStyle={styles.wrapper}
          {...wrapperProps}>
            {this.props.children}
        </ContentWrapper>
      </View>
    );
  }

});

/*
 * CSS stylings
 */

const styles = StyleSheet.create({
 container: {
    backgroundColor: '#fff',
    flex: 1, // must have flex: 1 for page scrolling,
    bottom: 0
  },
  wrapper: {
  }
});

/*
 * exports this component as a module so it can be imported into other modules
 */

module.exports = EyespotPageBase;
