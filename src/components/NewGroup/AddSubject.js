import React, {Component} from 'react';
import {AppRegistry,StyleSheet,View,Text,TouchableOpacity,TextInput,Image,ListView} from 'react-native';

export default class AddSubject extends Component {
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
                        <View style={{width: 280, height: 50,padding:2}}>
                            <Text style={{color:'white',fontSize:20}}>New Group</Text>
                            <View>
                                 <Text style={{color:'white',fontSize:10}}>Add Subject</Text>
                                </View>
                        </View>
                  </View>
                  <View  style={{width:'100%',height:50}}>
                      </View>
                  <View style={{width:'100%',height:100,flexDirection:'row'}}>
                      <View style={{width:100,height:100,padding:10}}>
                          <Image source={require('../../images/cameraBig.png')}/>
                          </View>
                       <View style={{width:250,height:100,padding:20}}>
                           		<TextInput
                                    placeholder="Type Group Subject Here"
                                    placeholderTextColor = "#B8AFAF"
                                />
                          </View>
                      </View>
                      <View style={{width:'100%',height:50,alignItems:'center',justifyContent:'center'}}>
                          <Text>Provide a group subject and optional group icon</Text>
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
    row:{
        flexDirection:'row',
        padding:10,
        backgroundColor:'#FFFFFF',
        marginBottom:5,
        width:'100%'
        
  },
  rowText:{
       flex:1
  },
  separator:{
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',

  }
})

module.exports = AddSubject;