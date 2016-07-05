/**
 * SignUpPage.js
 * Sign up for new users
 *
 * @providesModule SignUpPage
 * @flow
 */

const React = require('react');
const ReactNative = require('react-native');
const {
  Text,
  View
} = ReactNative;

const { Form } = require('tcomb-form-native').form;
const FormValidator = require('validate.js');