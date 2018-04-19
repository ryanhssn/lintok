import React, {Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,TextInput,Image,ListView} from 'react-native';

export default class Attach extends Component {  
    onCallPress(){
      this.props.navigator.replace({
		id:'Call'
	   })
    }
    
    onBackButtonPress(){
        this.props.navigator.pop();
    }

     render(){
         return (
              <View style={styles.container}>
                   <View style={styles.PinHeader}>
                      <View style={{width: 35, height: 50,padding:10}}>
                          <TouchableOpacity onPress={this.onBackButtonPress.bind(this)}>
                            <Image source={require('../../images/prev.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: 40, height: 50,padding:3}}>
                            <Image source={require('../../images/user.png')}/>
                        </View>
                        <View style={{width: 120, height: 50}}>
                        </View>
                         <View style={{width: 200, height: 50,flexDirection:'row'}}>
                                <View style={{width: 50, height: 50,padding:10}}>
                                    <TouchableOpacity onPress ={this.onCallPress.bind(this)}>
                                      <Image source={require('../../images/call.png')}/>  
                                      </TouchableOpacity>
                                    </View>
                                    <View style={{width: 50, height: 50,padding:10}}>
                                        <Image source={require('../../images/video2.png')}/>  
                                    </View>
                                    <View style={{width: 60, height: 50,padding:10}}>
                                           <Image source={require('../../images/attach.png')}/> 
                                    </View>
                                    <View style={{width: 50, height: 50,padding:10}}>
                                         <Image source={require('../../images/menu.png')}/> 
                                    </View>
                        </View>
                  </View>
                  <View style={{width:'100%', height: 50,position:'absolute',bottom:0,flexDirection:'row'}}>
                        <View style={{width:30,height:50,padding:10}}>
                            <Image source={require('../../images/mic.png')}/> 
                            </View>
                             <View style={{width:240,height:50,padding:10}}>
                                <TextInput
                                placeholder="What's on your mind?"
                                placeholderTextColor = "#B8AFAF"
                                style={styles.input}
                                />
                            </View>
                           <View style={{width:40,height:50,backgroundColor:'#FFFFFF',padding:10}}>
                              <Image source={require('../../images/smile.png')}/> 
                            </View>
                            <View style={{width:40,height:50,backgroundColor:'#FFFFFF',padding:10}}>
                              <Image source={require('../../images/camera.png')}/> 
                            </View>
                             <View style={{width:100,height:50,backgroundColor:'#FFFFFF'}}>
                              <Image source={require('../../images/send.png')}/> 
                            </View>
                      </View>
                        <View style={{width:"100%",height:250,flexDirection:'row'}}>
                            <View style={{width:200,height:250,alignItems:'center',padding:10}}>
                                  <Image source={require('../../images/cameracc.png')}/>
                                </View>
                                <View style={{width:200,height:250,alignItems:'center',padding:10}}>
                                     <Image source={require('../../images/gallerygg.png')}/>
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
  },
  input:{
   	  height:40,
   	  marginBottom:20,
   	  color:'#0D0C0C',
   	  paddingHorizontal:10
   },
})

module.exports = Attach;
