import React, {Component} from 'react';
import {View,StyleSheet,Image,Text,TouchableOpacity} from 'react-native';

class Communities extends Component{
    render() {
        return (
             <View style={styles.container}>
                   <View style={styles.PinHeader}>
                      <View style={{width: 40, height: 50,padding:10}}>
                            <Image source={require('../../images/prev.png')}/>
                        </View>
                        <View style={{width: 320, height: 50,padding:10}}>
                            <Text style={{color:'white'}}>Communities</Text>
                        </View>
                        <View style={{width: 40, height: 50,padding:10}}>
                            <Image source={require('../../images/menu.png')}/>
                        </View>
                  </View>
                  <View style={{width:'100%',height:200}}>
                        <View style={{width:'100%',height:100,flexDirection:'row'}}>
                            <View style={{width:150,height:100,flexDirection:'row',padding:10}}>
                                     <Image style={{borderRadius: 50,}} source={require('../../images/sony.png')}/>
                                </View>
                                <View style={{width:200,height:100,flexDirection:'row'}}>
                                     <Text style={{width:100,height:100,flexDirection:'row',marginTop:10,color:'black',fontSize:15}}>1165{"\n"}posts</Text>
                                     <Text style={{width:100,height:100,flexDirection:'row',marginTop:10,color:'black',fontSize:15}}>3/7m{"\n"}join</Text>
                                </View>
                            </View>
                              <View style={{width:'100%',height:30,flexDirection:'row'}}>
                                <View style={{width:150,height:30,flexDirection:'row',padding:10}}>
                                </View>
                                <View style={{width:250,height:30,flexDirection:'row'}}>
                                    <TouchableOpacity style={{backgroundColor:'#FD680C',width:200}}>
	                                     <Text style={{textAlign:'center',padding:4,color:'white'}}>Joining</Text>
	                                </TouchableOpacity>
                                </View>
                            </View>
                      </View>
                     <Text style={{color:'black',padding:10}}>Sony{"\n"}</Text>
                    <View style={styles.content}>
                         <Text style={{padding:10,}}>
                            As I mentioned before, flex property with different numeric values 
                            could be used for specifying grow factor for Flex containers, and 
                           </Text>
                       </View>
                      <View style={styles.second}>
                          <View style={{width: 160, height: 50,padding:10,}}>
                              <Image  source={require('../../images/menu-1.png')}/>
                            </View>
                          <View style={{width: 160, height: 50,padding:10,}}>
                                <Image  source={require('../../images/menu-list.png')}/>
                            </View>
                          <View style={{width: 160, height: 50,padding:10,}}>
                                 <Image  source={require('../../images/camera.png')}/>
                            </View>
                     </View>
                     <View style={{width:'100%',height:200}}>
                          <View style={{width:'100%',height:90,flexDirection:'row'}}>
                            <View style={{width: 140, height: 90,padding:10,}}>
                              <Image  source={require('../../images/sony.png')}/>
                            </View>
                            <View style={{width: 140, height: 90,padding:10,}}>
                              <Image  source={require('../../images/sony.png')}/>
                            </View>
                            <View style={{width: 140, height: 90,padding:10,marginRight:10}}>
                              <Image  source={require('../../images/sony.png')}/>
                            </View>
                          </View>
                          <View style={{width:'100%',height:90,flexDirection:'row'}}>
                                <View style={{width: 140, height: 90,padding:10,}}>
                              <Image  source={require('../../images/sony.png')}/>
                            </View>
                            <View style={{width: 140, height: 90,padding:10,}}>
                              <Image  source={require('../../images/sony.png')}/>
                            </View>
                            <View style={{width: 140, height: 90,padding:10,marginRight:10}}>
                              <Image  source={require('../../images/sony.png')}/>
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
  },
  PinHeader2: {
    flexDirection: 'row',
    height:100,
  },
   	  buttonContainer:{
   	 backgroundColor:'#FD680C',
   },
	 buttonText:{
   	 textAlign:'center',
   	 color:'#FFFFFF',
   	 fontWeight:'700'
   },
   second:{
       flexDirection: 'row',
       height:56,
  },
    content:{
       flexDirection: 'row',
       height:100,
  },
})

module.exports = Communities;