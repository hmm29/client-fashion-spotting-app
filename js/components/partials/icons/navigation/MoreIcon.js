/**
 * MoreIcon.js
 * Return to previous route
 *
 * @providesModule MoreIcon
 * @flow
 */

'use strict'; /* enables JS strict mode for any ES5 code */

/*
 * imports required modules
 */

import React, { PropTypes, Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const SIZE = 20; /* icon font size */

/*
 * specifies types for properties that this component receives
 */

type Props = {
  color: React.PropTypes.string.isOptional,
  onPress: React.PropTypes.func.isRequired,
  size: React.PropTypes.number,
  style: View.PropTypes.style
};

/*
 * defines the MoreIcon class
 */

class MoreIcon extends Component {
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
        style={[this.props.style,{width: (this.props.size || SIZE) * 6.88,
                height: (this.props.size || SIZE) * 3.88, alignItems: 'flex-start'}]}>
        <Image
          source={require('./img/more-icon.png')}
          style={[styles.icon]} />
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
    height: SIZE,
    resizeMode: Image.resizeMode.contain
  }
});

/*
 * exports this component as a module so it can be imported into other modules
 */

module.exports = MoreIcon;
