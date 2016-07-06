/**
 * DiscoverPage.js
 * Browse the item catalog
 *
 * @providesModule DiscoverPage
 * @flow
 */

import React, { Component } from 'react'; 
import { 
  Dimensions,
  Image,
  StyleSheet,
  Text, 
  TextInput,
  View
} from 'react-native';

import Button from 'apsl-react-native-button';
import EyespotPageBase from '../EyespotPageBase';
import Header from '../../partials/Header';

var {height, width} = Dimensions.get('window')

var DiscoverPage = React.createClass({
    getInitialState() {
        return {
            
        }
    },

    propTypes: {
        
    },

    _renderHeader() {
        return (
            <Header containerStyle={styles.headerContainer}>
                <View />
            </Header>
        );
    },

    render() {
        return (
            <EyespotPageBase
                keyboardShouldPersistTaps={false} 
                noScroll={true}>
                <View style={styles.container}>
                    <View style={styles.section}>
    
                   
                    </View>
                </View>
            </EyespotPageBase>
        );
    }
});

const styles = StyleSheet.create({
    container: {

    },
    headerContainer: {
        position: 'absolute',
        height: height/80,
        top: -20
    },
    section: {
        marginVertical: height/40
    },
})

module.exports = DiscoverPage;
