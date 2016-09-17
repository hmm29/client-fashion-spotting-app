/**
* Product.js
* See Product info
*
* @providesModule Product
* @flow
*/

'use strict'; /* enables JS strict mode for any ES5 code */

/*
* imports required modules
*/

import React, { PropTypes } from 'react';
import {
 Dimensions,
 Modal,
 StyleSheet,
 Text,
 TextInput,
 View,
 TouchableOpacity
} from 'react-native';

import Controls from './components/Controls';
import helpers from '../../helpers';
import Image from 'react-native-image-progress';
import Location from './components/Location';
import Contributor from './components/Contributor';
import Comment from './components/Comment';

const firebaseApp = require('../../firebase');

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

/*
* defines the Product class
* this is the code for each Product in the Category Feed
*/

var Product = React.createClass({

  propTypes: {
    categoryName: PropTypes.string,
    product: PropTypes.object.isRequired,
    navigator: PropTypes.object,
    onPressMapEmblem: PropTypes.func,
    user: PropTypes.object
  },

  getInitialState() {
    return {
      modalVisible: false
    }
  },

  addReportTagToProduct() {
    const productId = this.props.product['.key'];
    if(productId) firebaseApp.database().ref(`products/${productId}`).update({reported: true});
  },

  handleModalVisible(modalVisible) {
    this.setState({modalVisible});
  },

  getModalText() {
    // this.state.willReportContributionResponse is either true or doesn't exist
    // so only have to check for those cases
    if(!this.state.willReportContributionResponse) {
      return 'Would you like to report this product?';
    }

    if(this.state.willReportContributionResponse) {
      return 'Thank you for reporting this contribution';
    }
  },

 /*
  * render(): returns JSX that declaratively specifies page UI
  */

  render() {

    const { categoryName, navigator, user, product } = this.props;

    return (
      <View style={styles.product}>
        <View style={styles.productImageContainer}>
        <Image source={{uri : product && product.image && product.image.url }} style={styles.productImage}/>
        {product.tag ? <View style={styles.tag}><Text style={styles.tagText}>{product.tag && product.tag.toUpperCase()}</Text></View> : null}
        </View>
        <View style={styles.info}>
          <Contributor
            user={user}
            navigator={navigator}/>
          <Location
            categoryName={categoryName}
            navigator={navigator}
            onPressMapEmblem={this.props.onPressMapEmblem}
            product={product}/>
          <Comment product={product}/>
          <Controls handleModalVisible={this.handleModalVisible} product={product}/>
          <Text style={styles.timestamp}>{product && product.timestamp ? helpers.getTimePassed(Date.parse(product.timestamp)) + ' ago' : '36 days ago'}</Text>
        </View>
        <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modalVisible}>
            <TouchableOpacity onPress={() => this.setState({modalVisible: false})} style={{width, height}}>
            <View>
            <Text style={[styles.modalText, (!this.state.willReportContributionResponse ? {borderBottomColor: '#fff'} : {})]}>{this.getModalText()}</Text>
              {!this.state.willReportContributionResponse ? <View style={styles.modalButtonContainer}>
                <TouchableOpacity onPress={() => {this.setState({willReportContributionResponse: true}); this.addReportTagToProduct()}} style={styles.modalButton}><Text>YES</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({modalVisible: false})} style={styles.modalButton}><Text>NO</Text></TouchableOpacity>
              </View> : null}
            </View>
            </TouchableOpacity>
            </Modal>
      </View>
    );

  }

});


/*
* CSS stylings
*/

const panelMargin = 5;
const sideMargin = 10;
const panelWidth = (width - panelMargin * 4 - sideMargin * 2) / 2;
const featuredPanelWidth = panelWidth * 2 + panelMargin * 2;

const styles = StyleSheet.create({
    product: {
       flex: 1,
       flexDirection: 'column',
       alignItems: 'center',
       width,
       bottom: height/28,
    },
    productImage: {
      alignSelf: 'center',
      width: featuredPanelWidth,
      height: height * 5.2 / 12,
      resizeMode: 'cover',
      flex: 1
    },
    productImageContainer: {
      width: featuredPanelWidth,
      height: height * 5.2 / 12
    },
    info: {
      width: featuredPanelWidth,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center'},
    modalButton: {
      top: height/2.6,
      backgroundColor: 'white',
      paddingHorizontal: width/6.4,
      paddingVertical: height/200,
      borderColor: 'black',
      borderWidth: 1
    },
    modalText: {
      top: height/2.5,
      marginHorizontal: width/8.4,
      backgroundColor: 'white',
      padding: 50,
      borderColor: 'black',
      borderWidth: 1
    },
    tag: {
      transform: [{rotate: '-90deg'}],
      padding: height/200,
      backgroundColor: 'red',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: width/4.8, // fixed width for now to allow for text changes without disturbing tag rotation
      top: height/29,
      left: -(height/30),
    },
    tagText: {
      color: 'white',
      fontSize: height/40,
      fontFamily: 'Avenir-Medium',
      marginHorizontal: height/200,
      marginVertical: height/400
    },
    timestamp: {
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
      right: -(width/35),
      padding: 10,
      width: width/2.6,
      textAlign: 'right',
      fontFamily: 'Avenir-BookOblique',
      color: '#aaa'
    }
});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = Product;
