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
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */
const SIZE = height/40; /* icon font size */

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
 * defines the BackIcon class
 */

class BackIcon extends Component {
  constructor(props:Props) {
    super(props);
    this.state = {};
  };

  /*
   * getIconSource(): get static image path based on color prop
   */

  getIconSource() {
    let color = this.props.color,
        source;

    if (color === 'white') {
      source = require('./img/back-button-white.png')
    } else if (color === 'red') {
      source = require('./img/back-button-red.png')
    } else {
      source = require('./img/back-button-black.png')
    }

    return source;
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
                height: (this.props.size || SIZE) * 3.88, alignItems: 'flex-start', right: width/40, top: width/600}]}>
        <Image
          source={this.getIconSource()}
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

module.exports = BackIcon;
