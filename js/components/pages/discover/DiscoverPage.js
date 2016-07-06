/**
 * DiscoverPage.js
 * Browse the item catalog
 *
 * @providesModule DiscoverPage
 * @flow
 */

/* import modules */
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

/* define DiscoverPage class */
var DiscoverPage = React.createClass({

    /* declare and define the component's state variables */
    getInitialState() {
        return {
            
        }
    },

    /* define types for properties that this component receives */
    propTypes: {
        
    },

    /* render the header element */
    _renderHeader() {
        return (
            <Header containerStyle={styles.headerContainer}>
                <View />
            </Header>
        );
    },

    /* JSX to declaratively specify page UI */
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

/* CSS stylings */
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
