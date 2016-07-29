/*
 * define Firebase
 */

import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCygLcYQL110PLj4cXAeC3SRFWPmg9QsXE",
    authDomain: "eyespot-658a5.firebaseapp.com",
    databaseURL: "https://eyespot-658a5.firebaseio.com",
    storageBucket: "eyespot-658a5.appspot.com",
  };

const firebaseApp = firebase.initializeApp(config);


module.exports = firebaseApp;
