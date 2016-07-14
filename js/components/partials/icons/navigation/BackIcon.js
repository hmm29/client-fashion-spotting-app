/**
 * BackIcon.js
 * Return to previous route
 *
 * @providesModule BackIcon
 * @flow
 */

'use strict'; /* enables JS strict mode for any ES5 code */

/*
 * imports required modules
 */

import React, { PropTypes, Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const SIZE = 32; /* icon font size */

/*
 * specifies types for properties that this component receives
 */

type Props = {
  color: React.PropTypes.string,
  onPress: React.PropTypes.func.isRequired,
  size: React.PropTypes.number,
  style: View.PropTypes.style
};

/*
 * defines the BackIcon class
 */

class BackIcon extends Component {
  constructor(props:Props) {
    super(props);
    this.state = {};
  };

  /*
   * render(): returns JSX that declaratively specifies icon appearance
   */

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

/*
 * CSS stylings
 */

const styles = StyleSheet.create({
  icon: {
    opacity: 1.0,
    width: SIZE,
    height: SIZE
  }
});

/*
 * exports this component as a module so it can be imported into other modules
 */

module.exports = BackIcon;
