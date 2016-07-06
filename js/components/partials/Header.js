/**
 * Header.js
 * Page header element
 *
 * @providesModule Header
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View
  } from 'react-native';

var {height, width} = Dimensions.get('window');

var Header = React.createClass({
  propTypes: {
    containerStyle: View.propTypes.style,
    noTitle: React.PropTypes.bool
  },

  render() {
    const noTitle = this.props.noTitle;
    const length = this.props.children && this.props.children.length || 0;

    if (length === 4) {
      return (
        <View style={[styles.headerContainer, this.props.containerStyle]}>
          <View style={styles.header}>
            <View style={{position: 'absolute', left: 10}}>{this.props.children[0]}</View>
            {this.props.children[1]}
            <View style={{position: 'absolute', right: 10}}>{this.props.children[2]}</View>
            {this.props.children[3]}
          </View>
        </View>
      )
    } else if (length === 3) {
      return (
        <View style={[styles.headerContainer, this.props.containerStyle]}>
          <View style={styles.header}>
            <View style={{position: 'absolute', left: 10}}>{this.props.children[0]}</View>
            <Text style={styles.headerText}>{this.props.children[1]}</Text>
            <View style={{position: 'absolute', right: 10}}>{this.props.children[2]}</View>
          </View>
        </View>
      )
    } else if (length === 2) {
      return (
        <View style={[styles.headerContainer, this.props.containerStyle]}>
          <View style={styles.header}>
            <View style={{position: 'absolute', left: 10}}>{this.props.children[0]}</View>
            <View style={{position: 'absolute', right: 10}}>{this.props.children[1]}</View>
          </View>
        </View>
      )
    } else if (length === 1 && noTitle) {
      return (
        <View style={[styles.headerContainer, this.props.containerStyle]}>
          <View style={styles.header}>
            <View style={{position: 'absolute', left: 10}}>{this.props.children[0]}</View>
          </View>
        </View>
      )
    } else if (length === 1) {
      return (
         <View style={[styles.headerContainer, this.props.containerStyle]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{this.props.children[0]}</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={[styles.headerContainer, this.props.containerStyle]}>
          <View style={styles.header}>
          </View>
        </View>
      )
    }
  }
});

var styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    width,
    height: height / 20,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: height / 15
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'AvenirNextCondensed-Regular'
  }
});

module.exports = Header;