/**
 * EyespotPageBase.js
 * Standard page base component
 *
 * @providesModule EyespotPageBase
 * @flow
 */
'use strict';

import React, { Component } from 'react'; 
import { 
  ScrollView, 
  StyleSheet, 
  View 
} from 'react-native';

var EyespotPageBase = React.createClass({
    propTypes: {
        keyboardShouldPersistTaps: React.PropTypes.bool,
        noScroll: React.PropTypes.bool
  },

  render() {
    let ContentWrapper;
    let wrapperProps;

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
          scrollEnabled={!this.props.noScroll}
          contentContainerStyle={styles.wrapper}
          {...wrapperProps}>
            {this.props.children}
        </ContentWrapper>
      </View>
    );
  }

});

const styles = StyleSheet.create({
 container: {
    backgroundColor: '#fff',
    flex: 1
  },
  wrapper: {
    flex: 1,
    paddingTop: 10
  }
});

module.exports = EyespotPageBase;

 