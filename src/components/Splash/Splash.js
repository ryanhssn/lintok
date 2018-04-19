import React,{Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,TextInput,Image,ListView} from 'react-native';


export default class Splash extends Component{
       componentDidMount () {
        var navigator = this.props.navigator;
        setTimeout (() => {
            this.props.navigation.navigate('Login')
        }, 2000);
    }

    render(){
        return(
                <Image source={require('../../images/splash.png')} style={styles.container}>
                </Image>
        )
    }
}


const styles = StyleSheet.create({
     container:{
          flex: 1,
          width: null,
          height: null,
     },
})

module.exports = Splash;
