import {
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
        item: finalizeAndContribute.contributeSummary.item,
        category: productAndLocationData.category,
        tags: finalizeAndContribute.activeExcitingTags,
        comment: finalizeAndContribute.input,
        likes: 0,
        userId : userId
      }
      var productId = firebaseApp.database().ref("products").push(uploadData).key;
      uploadProductToCategory(productId, uploadData.category);
      uploadProductToUser(productId, uploadData.category, userId);
    });

  });

}

module.exports = uploadNewProduct;
