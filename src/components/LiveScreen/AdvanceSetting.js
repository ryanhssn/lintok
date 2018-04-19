import React, {Component} from 'react';
import {AppRegistry,StyleSheet,View,Text,TouchableOpacity,TextInput,Image,ListView,Dimensions,TouchableHighlight,Switch} from 'react-native';
 
export default class AdvancedSetting extends Component {
  constructor() {
    super();
  }
    
       onBackPress(){
        this.props.navigator.pop();
    }
   
     render(){
         return (
              <View style={styles.container}>
                   <View style={styles.PinHeader}>
                      <View style={{width: 100, height: 80,padding:10}}>
                        <TouchableOpacity onPress={this.onBackPress.bind(this)}>
                            <Text style={{color:'white',fontSize:20}}>Back</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: 200, height: 50,padding:8}}>
                            <Text style={{color:'white',fontSize:20}}>Advanced Setting</Text>
                            <View>
                                 <Text style={{color:'white',fontSize:10}}></Text>
                                </View>
                        </View>
                        <View style={{width: 100, height: 80,padding:10}}>
                            <Text style={{color:'white',fontSize:20}}></Text>
                        </View>
                  </View>
                         <View style={{width:'100%',height:50,borderWidth:.5,borderColor: '#C4C2C2',flexDirection:'row'}}>
                              <View style={{width:340,height:50,padding:10}}>
                                  <Text>Comments</Text>
                              </View>
                         </View>
                         <View style={{width:'100%',height:50,borderWidth:.5,borderColor: '#C4C2C2',flexDirection:'row'}}>
                                <View style={{width:340,height:50,padding:10}}>
                                   <Text>Turn Off Commenting</Text>
                               </View>
                               <Switch
                                    disabled={true}
                                    style={{alignItems:'flex-end'}}
                                    value={true} />
                         </View>
                          <Text style={{padding:5,opacity:.5}}>You can change this later by going to the ...menu at the top of {'\n'} your post</Text>
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
     container2: {
      flex: 1,
      padding: 20
   },
   input: {
      height: 30,
      borderColor: 'grey',
      width:280,
      borderBottomWidth:0
   },
   submit: {
      backgroundColor: 'silver',
      padding: 10
   },
   footer: {
        height: 50,
        backgroundColor: '#FD680C',
        padding:10,
        alignItems:'center',
        justifyContent: 'center',
    }
})

module.exports = AdvancedSetting;