import React, {Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,TextInput,Image,ListView,AsyncStorage} from 'react-native';
import InCallManager from 'react-native-incall-manager';
import {FBApp}  from '../FirebaseAuth/FirebaseAuth';
var ref3 = FBApp.database ().ref('Contact');
const firstUser = '';
const secondUser = '';
const uid  = '';

export default class Call2 extends Component {  
    constructor(props){
        super(props);
        uid = this.props.groupId
                AsyncStorage.getItem('@MyPhone:key').then((value)=>{
                           num = JSON.parse(value)
                     firstUser = num;
                    secondUser = this.props.phone;
                          ref1 = FBApp.database ().ref('Recent/'+firstUser+"/"+secondUser);
                          ref2 = FBApp.database ().ref('Recent/'+secondUser+"/"+firstUser);
                });
                     var that = this;
                ref3.on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    if(JSON.stringify(childSnapshot).indexOf('Reciever_statustrue') != -1){
                        that.changePress();
                    }
                });
                });
        //InCallManager.start({media: 'audio', ringback: '_BUNDLE_'});
    }
     onBackButtonPress(){
          this.props.navigator.pop();
     }

     changePress(){
          this.props.navigator.push({
               id:'VideoChat',
           })
     }

     onAcceptMessage(){
          ref3.set({
            createdAt:"632632664",
            groupid:uid,
            type:'Video',
            sender_phone:firstUser+'@sender_phone',
            reciever_phone:secondUser+'@reciever_phone',
            sender_status:'',
            reciever_status:'Reciever_statustrue'
          }); 
     }
     render(){
         return (
              <Image source={require('../../images/audio.png')} style={styles.container}>
              <View style={{width:'100%',height:46,flexDirection:'row'}}>
                  <View style={{width:30,height:46,padding:10}}>
                      <TouchableOpacity onPress={this.onBackButtonPress.bind(this)}>
                        <Image source={require('../../images/prev.png')}/>
                      </TouchableOpacity>
                 </View>
                         <View style={{width:200,height:46,padding:5}}>
                              <Text style={{color:'black'}}>Suman Saha</Text>
                         <View>
                              <Text style={{color:'black'}}>00:08</Text>
                        </View>
                      </View>
                  </View>
                  <View style={{width:'100%',height:500,alignItems:'center', marginTop:80}}>
                        <Image source={require('../../images/audio_user.png')}/>
                        <View style={{width:'100%',height:100,flexDirection:'row',marginTop:80}}>
                            <View style={{width:130,height:100,alignItems:'center'}}>
                              <Image source={require('../../images/speaker.png')}/>
                            </View>
                            <View style={{width:130,height:100,alignItems:'center'}}>
                              <Image source={require('../../images/call_siglent.png')}/>
                            </View>
                            <View style={{width:130,height:100,alignItems:'center'}}>
                              <Image source={require('../../images/chat22.png')}/>
                            </View>
                            </View>
                            <View style={{width:'100%',height:100,marginTop:40,alignItems:'center'}}>
                              <TouchableOpacity onPress ={this.onAcceptMessage.bind(this)}>
                                 <Image source={require('../../images/call_end.png')}/>
                              </TouchableOpacity>
                           </View>
                  </View>
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

module.exports = Call2;