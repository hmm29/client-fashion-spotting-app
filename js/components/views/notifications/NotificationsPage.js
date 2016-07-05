/**
 * NotificationPage.js
 * See other users' activity around your posts
 *
 * @providesModule NotificationPage
 * @flow
 */

const React = require('react');
const ReactNative = require('react-native');
const {
  Text,
  View
} = ReactNative;

const RefreshableListView = require('../../partials/RefreshableListView');
