import React, {Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,TextInput,Image} from 'react-native';

export default class Status extends Component {
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
                            <Text style={{color:'white'}}>Status</Text>
                        </View>
                        <View style={{width: 40, height: 50,padding:10}}>
                            <Image source={require('../../images/menu.png')}/>
                        </View>
                  </View>
                   <View style={{width:'100%',height:150}}>
                          <View style={{width:'100%',height:100}}>
                                 <Text style={{marginTop:90,marginLeft:40,fontSize:25}}>Type Status here</Text>
                              </View>
                       </View>
                            <TextInput
                            placeholder="Status"
                            placeholderTextColor = "#B8AFAF"
                            style={styles.input}
                            />
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
   	  height:30,
   	  backgroundColor:'rgba(255,255,255,0.2)',
   	  marginBottom:20,
   	  color:'#0D0C0C',
   	  paddingHorizontal:10
   },
})

module.exports = Status;