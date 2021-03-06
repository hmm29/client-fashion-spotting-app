import {
  Alert,
  AsyncStorage,
} from 'react-native';

import uploadImage from './uploadImage.js';
import Firebase from 'firebase';

const firebaseApp = require('../../../firebase');

function uploadProductToCategory(newID, category){
  var categoryRef = firebaseApp.database().ref(`category/${category}`);
  categoryRef.push(newID);
}

function uploadProductToUser(productId, category, userId){
  var userRef = firebaseApp.database().ref(`users/${userId}/products`);
  userRef.push(productId);
}

function uploadNewProduct(imageData, productAndLocationData, finalizeAndContribute){

  AsyncStorage.getItem('@MyStore:uid').then(function(userId){
    // FIXME: image upload is redundant if already done before Facebook Sharing on FinalizeAndContributeView
    uploadImage(imageData.imgSource.uri, function(response){
      const uploadData = {
        image: {
          brightnessValue: imageData.brightnessValue,
          colorTemperatureValue: imageData.colorTemperatureValue,
          contrastValue: imageData.contrastValue,
          sharpenValue: imageData.sharpenValue,
          cloudinary: response,
          url: response.secure_url
        },
        store: productAndLocationData.store,
        category: productAndLocationData.category,
        tag: finalizeAndContribute.activeExcitingTag,
        comment: finalizeAndContribute.input,
        likes: 0,
        timestamp: (new Date()).toString(),
        userId : userId
      }
      var productId = firebaseApp.database().ref("products").push(uploadData).key;

      //@hmm: fail-safe for product upload
      if(!productId) {
        Alert.alert('Please Re-upload Your Product', 'Sorry, there was a problem while recording your contribution. Please resubmit your product.');
      } else {
        uploadProductToCategory(productId, uploadData.category);
        uploadProductToUser(productId, uploadData.category, userId);
      }
    });
  });
}

module.exports = uploadNewProduct;
