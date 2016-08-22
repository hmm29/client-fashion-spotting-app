/**
* Notifications.js
* See Notifications info
*
* @providesModule Notifications
* @flow
*/


'use strict'; /* enables JS strict mode for any ES5 code */

/*
* imports required modules
*/

import React, { PropTypes } from 'react';
import {
 Dimensions,
 StyleSheet,
 Text,
 TextInput,
 View,
 ListView,
 Image,
 TouchableOpacity
} from 'react-native';

import notification from '../img/notification.png';
import helpers from '../../helpers';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

var UnreadBar = React.createClass({
  render(){

    if(this.props.notification.read){
      return (
        <View style={styles.readBar}></View>
      )
    }
    else{
      return(
        <View style={styles.unreadBar}></View>
      )
    }
  }
})

var NotificationRow = React.createClass({
  propTypes:{
    notification: PropTypes.object,
    dataStore: PropTypes.object
  },

  render(){
    const { notification, dataStore } = this.props;
    if(!dataStore.users[notification.userId]){
      return null
    }
    return (
      <View style={styles.row}>
        <UnreadBar notification={notification}/>
        <View style={{flex:1, alignItems:'center'}}>
          <Image style={styles.rowImage} source={{uri : dataStore.users[notification.userId].profilePicture}}/>
        </View>
        <View style={styles.rowText}>
          <Text><Text style={styles.userText}>{dataStore.users[notification.userId].username}</Text> liked your contribution</Text>
          <Text style={styles.timePassed}>{helpers.getTimePassed(notification.date)}</Text>
        </View>
        <View style={{flex:1, alignItems:'center'}}>
          <Image style={styles.rowImage} source={{uri : dataStore.products[notification.productId].image.url}}/>
        </View>
      </View>
    )
  }
})

var NotificationsList = React.createClass({

  getInitialState(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      text: "",
      dataSource: ds.cloneWithRows([]),
      numRows: ""
    }
  },

  componentDidMount(){
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.props.notifications) });
  },
  componentWillReceiveProps(nextProps){
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.notifications) });
  },
  // _setFilter(text){
  //   // filter places by input text
  //   var filteredPlaces = [];
  //   this.props.places.map(function(place){
  //     if(place.name.startsWith(text)){
  //       filteredPlaces.push(place);
  //     }
  //   }, this);
  //
  //   filteredPlaces.push({name:'Not Listed'});
  //
  //   this.setState({
  //     text : text,
  //     dataSource: this.state.dataSource.cloneWithRows(filteredPlaces),
  //     numRows : filteredPlaces.length
  //   });
  // },

  render(){

    return (
      <View style={styles.notificationsList}>
        <Text style={styles.listHeader}>Notifications</Text>
        <ListView
          enableEmptySections={true}
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    )
  },
  _renderRow(rowData, sectionID, rowID){
    return (
      <NotificationRow
        navigator={this.props.navigator}
        notification={rowData}
        dataStore={this.props.dataStore}
      />
    )
  },
})



/*
* defines the Notifications class
* this is the code for each Notifications in the Category Feed
*/


var Notifications = React.createClass({

  propTypes: {
    navigator: PropTypes.object,
    user: PropTypes.object
  },

 /*
  * render(): returns JSX that declaratively specifies page UI
  */

  getNewNotifications(){
    if(!this.props.user){
      return 0
    }
    var notifications = this.props.user.notifications || [];
    var arr = helpers.objectToArray(notifications);
    var unread = 0;

    arr.map((notification) => {
      if(!notification.read){
        unread += 1;
      }
    });
    return unread
  },

  render() {

    const { navigator, user, dataStore } = this.props;
    var notificationsArray = helpers.objectToArray(user.notifications);

    const numNotifcations = this.getNewNotifications();

    return (
      <TouchableOpacity style={styles.container} onPress={()=>this.props.showNotifications()}>
        <View style={styles.tab}>
          <View style={{flex:1}}>
            <Image style={styles.notificationIcon} source={notification}/>
          </View>
          <Text style={styles.notificationNum}>{numNotifcations}</Text>
        </View>
        {/*}<NotificationsList notifications={notificationsArray.reverse()} dataStore={dataStore}/>*/}
      </TouchableOpacity>
    );

  }

});


/*
* CSS stylings
*/
const notificationTabWidth = 35;
const rowImageRadius = 25;
const rowHeight = 100;
const red = '#D43F4A';

const styles = StyleSheet.create({
  container:{
    position: 'absolute',
    flex:1,
    width: notificationTabWidth,
    height,
    top:0,
    left:0
  },
  tab:{
    position: 'absolute',
    width:notificationTabWidth,
    left:0,
    top: 100,
    backgroundColor: 'white',
    flexDirection:'column',
    alignItems:'center',
    paddingVertical: 5,
  },
  notificationIcon:{
    resizeMode: 'contain',
    width:15,
    height:20,
  },
  notificationNum:{
    color: 'red',
    fontFamily: 'Avenir-Roman',
  },
  notificationsList:{
    position:'absolute',
    top: 0,
    left:notificationTabWidth,
    width: (width - notificationTabWidth),
    height: height,
    backgroundColor:'white',
    shadowOffset: {
        width: 0,
        height: 0
    },
    shadowColor: 'black',
    shadowOpacity: .3,
    shadowRadius: 10,
  },

  listHeader:{
    fontSize : 24,
    fontWeight: 'bold',
    fontFamily: 'Avenir-Roman',
    padding:10

  },
  listView:{
    position: 'absolute',
    width: (width - notificationTabWidth),
  },
  userText:{
    color: red,
    fontWeight: 'bold'
  },
  row:{
    flexDirection: 'row',
    flex:1,
    height: rowHeight,
    alignItems:'center',
    justifyContent:'flex-start',
    borderWidth: 0.5,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderColor: 'gray',
    paddingLeft: 10,
    backgroundColor:'red'
  },
  rowImage:{
    width: rowImageRadius * 2,
    height: rowImageRadius * 2,
    borderRadius: rowImageRadius,

  },
  rowText:{
    flexDirection:'column',
    flex:3,
  },
  timePassed:{
    opacity: .7
  },
  unreadBar:{
    position:'absolute',
    top:0,
    left:0,

    height: rowHeight,
    width: 10,
    backgroundColor: red
  },
  readBar:{
    position:'absolute',
    top:0,
    left:0,
    height: rowHeight,
    width: 12,
    backgroundColor: 'gray',
    opacity: .3,
  }

});

/*
* exports this component as a module so it can be imported into other modules
*/

module.exports = Notifications;
