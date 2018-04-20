import React,{Component} from 'react';
import {StyleSheet,View, ImageBackground, Text,TouchableOpacity, Dimensions, ActivityIndicator, StatusBar, TextInput,Image,ListView} from 'react-native';

import { FBApp } from '../FirebaseAuth/FirebaseAuth';

const firebase = require("firebase");

const { width, height } = Dimensions.get('window');

export default class Splash extends Component{
    state = { loggedIn: null, currentUser: null}

  componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
          if(user) {
            this.setState({ loggedIn: true, currentUser: user.uid})

          } else {
            this.setState({ loggedIn: false, currentUser: null})
          }
        });
}


       componentDidMount () {
          setTimeout (() => {
            if(this.state.loggedIn==false) {
              this.props.navigation.navigate('Login')
            } else {
              this.props.navigation.navigate('Chat')
            }
          }, 2000);
      }

    render(){
        return(
      <View style={localStyles.splashView}>
             <StatusBar backgroundColor="#2c3e50" barStyle="light-content" />

             <ImageBackground style={localStyles.bgImage} source={require('../../images/splash.png')}>
               <ActivityIndicator style={{marginTop: 300}} color={'#ff6128'} />
             </ImageBackground>

     </View>
        )
    }
}


const localStyles = StyleSheet.create({
  splashView: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#FFF'
 },
 textStyle: {
   color: 'white',
   fontSize: 18
 },
 bgImage: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems:'stretch',
   width
 }
})

module.exports = Splash;
