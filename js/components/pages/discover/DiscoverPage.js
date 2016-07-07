/**
 * DiscoverPage.js
 * Browse the item catalog
 *
 * @providesModule DiscoverPage
 * @flow
 */
'use strict'; /* enable JS strict mode for any ES5 code */

/* 
 * import modules 
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

var {height, width} = Dimensions.get('window'); /* get screen dimensions */

/* 
 * define DiscoverPage class 
 */
var DiscoverPage = React.createClass({

    /* 
     * getInitialState(): initialize the component's state variables 
     */
    getInitialState() {
        return {
            
        }
    },

    /* 
     * specify types for properties that this component receives 
     */
    propTypes: {
        
    },

    /* 
     * _renderHeader(): render the imported header component 
     */
    _renderHeader() {
        return (
            <Header containerStyle={styles.headerContainer}>
                <View />
            </Header>
        );
    },

    /* 
     * render(): returns JSX that declaratively specifies page UI 
     */
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

/* 
 * CSS stylings 
 */
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

/*
 * export the module so it can be imported to other components
 */
module.exports = DiscoverPage;
