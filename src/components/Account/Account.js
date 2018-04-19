import React, {Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,TextInput,Image,ListView} from 'react-native';

export default class Account extends Component {   
    
    onBackButtonPress(){
       this.props.navigator.pop();
    }

     render(){
         return (
              <View style={styles.container}>
                   <View style={styles.PinHeader}>
                      <View style={{width: 40, height: 50,padding:10}}>
                            <TouchableOpacity onPress={this.onBackButtonPress.bind(this)}>
                            <Image source={require('../../images/prev.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: 320, height: 50,padding:10}}>
                            <Text style={{color:'white'}}>Account</Text>
                        </View>
                  </View>
                      <View style={{width:'100%',height:300,padding:10}}>
                           <View style={{width:'100%',height:40,flexDirection:'row'}}>
                                      <View style={{width: 360, height: 40,padding:8}}>
                                            <Text style={{fontSize:15,borderBottomWidth:0.5,borderColor:'#939190'}}>Privacy</Text>
                                      </View>
                               </View>

                               <View style={{width:'100%',height:40,flexDirection:'row'}}>
                                      <View style={{width: 360, height: 40,padding:8}}>
                                            <Text style={{fontSize:15,borderBottomWidth:0.5,borderColor:'#939190'}}>Security</Text>
                                      </View>
                               </View>

                               <View style={{width:'100%',height:40,flexDirection:'row'}}>
                                      <View style={{width: 360, height: 40,padding:8}}>
                                            <Text style={{fontSize:15,borderBottomWidth:0.5,borderColor:'#939190'}}>Update Number</Text>
                                      </View>
                               </View>

                               <View style={{width:'100%',height:40,flexDirection:'row'}}>
                                      <View style={{width: 360, height: 40,padding:8}}>
                                            <Text style={{fontSize:15,borderBottomWidth:0.5,borderColor:'#939190'}}>Deactivate my Account</Text>
                                      </View>
                               </View>
                          </View>
                   </View>
         )
     }
}

const styles = StyleSheet.create({
     container:{
        flex:1,
     },
  PinHeader: {
    backgroundColor: '#FD680C',
    flexDirection: 'row',
    height:46,
  }
})

module.exports = Account;

