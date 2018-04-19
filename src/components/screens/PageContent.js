import React, { Component } from 'react';
import { View, StyleSheet,ScrollView,Image,TextInput,TouchableOpacity,Text,Picker,ToolbarAndroid} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { List, ListItem } from 'react-native-elements';
import { users } from '../config/data';
import {FBApp}  from '../FirebaseAuth/FirebaseAuth';

class PageContent extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
      return ( 
                    <View>
                       <View style={design.first}>
                           <View style={{width: 70, height: 50,padding:10}}>
                              <Image  source={require('../../images/user.png')}/>
                          </View>
                          <View style={{width: 250, height: 50,}}>
                              <Text style={{color:'black',padding:10}}>What's on your mind?</Text>
                          </View>
                          <View style={{width: 100, height: 50,}}>
                              <Text style={{color:'black',padding:10}}>Live</Text>
                          </View>
                       </View>

                      <View style={design.second}>
                          <View style={{width: 70, height: 50,padding:10}}>
                              <Image  source={require('../../images/user1.png')}/>
                          </View>
                          <View style={{width: 220, height: 50,}}>
                              <Text onPress={this.onNamePress.bind(this)} style={{color:'black',padding:10}}>Marry Willams</Text>
                          </View>
                          <View style={{width: 130, height: 50,}}>
                            <Text style={{color:'black',padding:10}}>1 hour ago</Text>
                         </View>
                     </View>

                    <View style={design.PinContent}>
                       <Image style={design.item} source={require('../../images/img@3x.png')}/>
                    </View>

                      <View style={design.second}>
                          <View style={{width: 100, height: 50,padding:10,}}>
                              <Image  source={require('../../images/like@3x.png')}/>
                              <Text onPress ={this.onLikePress.bind(this)}>20 Likes</Text>
                          </View>
                          <View style={{width: 220, height: 50,padding:10,}}>
                                 <Image  source={require('../../images/comment@2x.png')}/>
                                 <Text onPress={this.onCommentPress.bind(this)}>15 Comments</Text>
                         </View>
                          <View style={{width: 130, height: 50,padding:10,}}>
                              <Image  source={require('../../images/report.png')}/>
                          </View>
                     </View>

                     <View style={design.second}>
                          <View style={{width: 70, height: 50,padding:10}}>
                             <Image  source={require('../../images/user1.png')}/>
                          </View>
                          <View style={{width: 220, height: 50,}}>
                              <Text style={{color:'black',padding:10}}>Marry Willams</Text>
                          </View>
                          <View style={{width: 130, height: 50,}}>
                               <Text style={{color:'black',padding:10}}>1 hour ago</Text>
                          </View>
                     </View>

                     <View style={design.content}>
                          <Text style={{padding:10,}}>
                              As I mentioned before, flex property with different numeric values 
                              could be used for specifying grow factor for Flex containers, and
                          </Text>
                     </View>
                      <View style={design.second}>
                      <View style={{width: 100, height: 50,padding:10,}}>
                         <Image  source={require('../../images/like@3x.png')}/>
                         <Text>20 Likes</Text>
                     </View>
                     <View style={{width: 220, height: 50,padding:10,}}>
                          <Image  source={require('../../images/comment@2x.png')}/>
                          <Text>15 Comments</Text>
                    </View>
                    <View style={{width: 130, height: 50,padding:10,}}>
                         <Image  source={require('../../images/report.png')}/>
                    </View>
                     </View>
                     </View>
        
        );
  }
}

export default PageContent;