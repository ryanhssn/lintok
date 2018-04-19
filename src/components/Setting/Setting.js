import React, {Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,TextInput,Image,ListView} from 'react-native';

export default class Setting extends Component {
    onAccountPress(){
        this.props.navigator.replace({
            id:'Account'
        })
    }

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
                            <Text style={{color:'white'}}>Settings</Text>
                        </View>
                  </View>
                  <View style={{width:'100%',height:100}}>
                      <View style={{width:'100%',height:10}}>
                          </View>
                           <View style={{width:'100%',height:80,flexDirection:'row'}}>
                                    <View style={{width:70,height:80,padding:10}}>
                                        <Image source={require('../../images/userbig.png')}/>
                                     </View>
                                     <View style={{width:230,height:80,padding:10}}>
                                          <Text style={{color:'#FD680C',fontSize:15}}>Alexander Desandler Jr</Text>
                                          <View>
                                                <Text>Status Here</Text>
                                        </View>
                                     </View>
                          </View>
                      </View>
                      <View style={{width:'100%',height:300}}>
                           <View style={{width:'100%',height:40,flexDirection:'row'}}>
                                  <View style={{width: 60, height: 40,padding:10,marginLeft:10}}>
                                      <Image source={require('../../images/key.png')}/>
                                      </View>
                                      <View style={{width: 330, height: 40,padding:8}}>
                                            <Text  onPress ={this.onAccountPress.bind(this)} style={{fontSize:15,borderBottomWidth:0.5,borderColor:'#939190'}}>Account</Text>
                                      </View>
                               </View>

                               <View style={{width:'100%',height:40,flexDirection:'row'}}>
                                  <View style={{width: 60, height: 40,padding:10,marginLeft:10}}>
                                      <Image source={require('../../images/chat.png')}/>
                                      </View>
                                      <View style={{width: 330, height: 40,padding:8}}>
                                            <Text style={{fontSize:15,borderBottomWidth:0.5,borderColor:'#939190'}}>Chats</Text>
                                      </View>
                               </View>

                               <View style={{width:'100%',height:40,flexDirection:'row'}}>
                                  <View style={{width: 60, height: 40,padding:10,marginLeft:10}}>
                                      <Image source={require('../../images/notification.png')}/>
                                      </View>
                                      <View style={{width: 330, height: 40,padding:8}}>
                                            <Text style={{fontSize:15,borderBottomWidth:0.5,borderColor:'#939190'}}>Notifications</Text>
                                      </View>
                               </View>

                               <View style={{width:'100%',height:40,flexDirection:'row'}}>
                                  <View style={{width: 60, height: 40,padding:10,marginLeft:10}}>
                                      <Image source={require('../../images/contact.png')}/>
                                      </View>
                                      <View style={{width: 330, height: 40,padding:8}}>
                                            <Text style={{fontSize:15,borderBottomWidth:0.5,borderColor:'#939190'}}>Contacts</Text>
                                      </View>
                               </View>

                               <View style={{width:'100%',height:40,flexDirection:'row'}}>
                                  <View style={{width: 60, height: 40,padding:10,marginLeft:10}}>
                                      <Image source={require('../../images/about.png')}/>
                                      </View>
                                      <View style={{width: 330, height: 40,padding:8}}>
                                            <Text style={{fontSize:15,borderBottomWidth:0.5,borderColor:'#939190'}}>About and Help</Text>
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

module.exports = Setting;
