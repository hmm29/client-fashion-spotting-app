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
  Dimensions,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

/*
 * defines the EyespotPageBase class
 */

var EyespotPageBase = React.createClass({

  /*
   * specifies types for properties that this component receives
   */

  propTypes: {
      bounces: React.PropTypes.bool,
      keyboardShouldPersistTaps: React.PropTypes.bool,
      noScroll: React.PropTypes.bool,
      style: React.PropTypes.object
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
      <View style={[styles.container, this.props.style, (!this.props.noScroll ? {paddingBottom: height/30, bottom: height/45} : {})]}>
        <ContentWrapper
          bounces={typeof(this.props.bounces) != "undefined" ? this.props.bounces : true}
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
  },
  wrapper: {
  }
});

/*
 * exports this component as a module so it can be imported into other modules
 */

module.exports = EyespotPageBase;
