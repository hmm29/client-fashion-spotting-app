/**
 * BackIcon.js
 * Return to previous route
 *
 * @providesModule BackIcon
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const SIZE = 32;

type Props = {
  color: React.PropTypes.string,
  onPress: React.PropTypes.func.isRequired,
  size: React.PropTypes.number,
  style: View.propTypes.style
};

class BackIcon extends Component {
  constructor(props:Props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.1}
        onPress={this.props.onPress}
        style={[this.props.style,{width: (this.props.size || SIZE) * 3.88,
                height: (this.props.size || SIZE) * 3.88, alignItems: 'flex-start'}]}>
        <Icon
          name={Platform.OS === "ios" ? "ios-arrow-back" : "android-arrow-back"}
          size={this.props.size || SIZE}
          color={this.props.color || '#ccc'}
          iconStyle={[styles.icon]} />
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  icon: {
    opacity: 1.0,
    width: SIZE,
    height: SIZE
  }
});

module.exports = BackIcon;