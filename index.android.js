/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import Splash from './src/components/Splash/Splash';
import Chat from './src/components/screens/Chat';
import MiddlePage from './src/components/screens/MiddlePage';
import ContactScreen from './src/components/screens/ContactScreen';

         var Login = require('./src/components/Login/Login');
  var Confirmation = require('./src/components/Confirmation/Confirmation');
        var Camera = require('./src/components/Camera/Camera');
    //var Userlist = require('./src/components/Userlist/Userlist');
     var LoginForm = require('./src/components/LoginForm/LoginForm');
   var Communities = require('./src/components/Communities/Communities');
       var Comment = require('./src/components/Comment/Comment');
        var Status = require('./src/components/Status/Status');
       var CallLog = require('./src/components/CallLog/CallLog');
       var Setting = require('./src/components/Setting/Setting');
       var Account = require('./src/components/Account/Account');
    var UserDetail = require('./src/components/Userlist/UserDetail');
        var Attach = require('./src/components/Attach/Attach');
          var Call = require('./src/components/Call/Call');
         var Call2 = require('./src/components/Call/Call2');
    var ChatDetail = require('./src/components/Userlist/ChatDetail');
   var UserProfile = require('./src/components/Userlist/UserProfile');
      var NewGroup = require('./src/components/NewGroup/NewGroup');
    var AddSubject = require('./src/components/NewGroup/AddSubject');
          //var Chat = require('./src/components/screens/Chat');
     var Following = require('./src/components/screens/Following');
           var You = require('./src/components/screens/You');
    //var MiddlePage = require('./src/components/screens/MiddlePage');
    var LiveScreen = require('./src/components/LiveScreen/LiveScreen');
         var Share = require('./src/components/LiveScreen/Share');
var AdvanceSetting = require('./src/components/LiveScreen/AdvanceSetting');
  var SearchScreen = require('./src/components/screens/SearchScreen');
var FollowerDetail = require('./src/components/Userlist/FollowerDetail');
     var VideoChat = require('./src/components/screens/VideoChat');


export default class lintok extends Component {
  render() {

    const MainNavigator = TabNavigator({
      Splash: { screen: Splash},
      main: {
        screen: TabNavigator({
          Login: { screen: Login},
          Confirmation: { screen: Confirmation},
          Camera: { screen: Camera},
          ChatDetail: { screen: ChatDetail},
        }, {
          tabBarPosition: 'bottom',
          swipeEnabled: true,
          tabBarOptions: {
            labelStyle: {
              fontSize: 9,
              paddingVertical: 5,
              margin: 0
            },
            style: {
              backgroundColor: 'rgba(218, 45, 249, 0.8)',
              padding: 0,
              margin: 0
              }
            }
        })
      },
      chatMain: {
        screen: TabNavigator({
          Chat: { screen: Chat},
          MiddlePage: { screen: MiddlePage},
          ContactScreen: { screen: ContactScreen},
        })
      }
    }, {
      tabBarPosition: 'bottom',
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true,
      swipeEnabled: false,
    })



    return (
      <View style={styles.container}>
           <MainNavigator />
         </View>
        // <Navigator
        //   initialRoute ={{
        //      id:'Splash'
        //   }}
        //   renderScene={
        //      this.navigatorRenderScene
        //   }
        //   configureScene={(route) => {
        //   if (route.sceneConfig) {
        //     return route.sceneConfig;
        //   }
        //   return Navigator.SceneConfigs.FloatFromRight;
        // }}
        // />
    );
  }
  // navigatorRenderScene(route,navigator){
  //    _navigator = navigator;
  //    switch(route.id){
  //       case 'Splash':
  //       return(<Splash navigator={navigator} title="Splash"/>);
  //       case 'Login':
  //       return(<Login navigator={navigator} data={route.data} title="Login"/>);
  //       case 'Confirmation':
  //       return(<Confirmation navigator={navigator} title="Confirmation"/>);
  //       case 'Camera':
  //       return(<Camera navigator={navigator} title="Camera"/>);
  //       /*case 'Userlist':
  //       return(<Userlist navigator={navigator} title="Userlist"/>);*/
  //       case 'LoginForm':
  //       return(<LoginForm navigator={navigator} title="LoginForm" postId={route.postId}/>);
  //       case 'Communities':
  //       return(<Communities navigator={navigator} title="Communities"/>);
  //       case 'Comment':
  //       return(<Comment navigator={navigator} title="Comment" post_id={route.post_id} user_id={route.user_id}  />);
  //       case 'Status':
  //       return(<Status navigator={navigator} title="Status"/>);
  //       case 'CallLog':
  //       return(<CallLog navigator={navigator} title="CallLog"/>);
  //       case 'Setting':
  //       return(<Setting navigator={navigator} title="Setting"/>);
  //       case 'Account':
  //       return(<Account navigator={navigator} title="Account"/>);
  //       case 'UserDetail':
  //       return(<UserDetail navigator={navigator} data={route.data} recentData={route.recentData} pageTitle={route.pageTitle} phone={route.phone} groupId={route.groupId} title="UserDetail"/>);
  //       case 'Attach':
  //       return(<Attach navigator={navigator} title="Attach"/>);
  //       case 'Call':
  //       return(<Call navigator={navigator} title="Call"  groupId={route.groupId} phone={route.phone}/>);
  //       case 'Call2':
  //       return(<Call2 navigator={navigator} title="Call2"  groupId={route.groupId} phone={route.phone}/>);
  //       case 'ChatDetail':
  //       return(<ChatDetail navigator={navigator} title="ChatDetail"/>);
  //       case 'UserProfile':
  //       return(<UserProfile navigator={navigator} photoId={route.photoId} title="UserProfile"/>);
  //       case 'NewGroup':
  //       return(<NewGroup navigator={navigator} title="NewGroup"/>);
  //       case 'AddSubject':
  //       return(<AddSubject navigator={navigator} title="AddSubject"/>);
  //       case 'Chat':
  //       return(<Chat navigator={navigator} title="Chat"/>);
  //       case 'Following':
  //       return(<Following navigator={navigator} title="Following"/>);
  //       case 'You':
  //       return(<You navigator={navigator} title="You"/>);
  //       case 'MiddlePage':
  //       return(<MiddlePage navigator={navigator} title="MiddlePage"/>);
  //       case 'LiveScreen':
  //       return(<LiveScreen navigator={navigator} title="LiveScreen"/>);
  //       case 'Share':
  //       return(<Share navigator={navigator} file={route.file} Imagetype={route.Imagetype} latitude={route.latitude} longitude={route.longitude} address={route.address} title="Share"/>);
  //       case 'AdvanceSetting':
  //       return(<AdvanceSetting navigator={navigator} title="AdvanceSetting"/>);
  //       case 'SearchScreen':
  //       return(<SearchScreen navigator={navigator} title="SearchScreen"/>);
  //       case 'FollowerDetail':
  //       return(<FollowerDetail navigator={navigator} title="FollowerDetail"/>);
  //       case 'VideoChat':
  //       return(<VideoChat navigator={navigator} title="VideoChat"/>);
  //    }
  // }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('lintok', () => lintok);
