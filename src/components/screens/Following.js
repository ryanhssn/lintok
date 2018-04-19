
import React, { Component } from 'react';
import { View, StyleSheet,ScrollView,Image,TextInput,TouchableOpacity,Text,Picker,AsyncStorage,ListView,TouchableHighlight,ToolbarAndroid,ToastAndroid} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { List, ListItem } from 'react-native-elements';
import {FBApp}  from '../FirebaseAuth/FirebaseAuth';

var ref="";
var numberOfChat =[];
const users = ''

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      Id:'',
      follower_id:'',
      following_id:''
    };
  }

    componentDidMount(){
          AsyncStorage.getItem('@UserId:key').then((value)=>{
                 var userId = JSON.parse(value);
                 this.setState({Id:userId});
                 this.FollowerDetail();
          })
  }

  async FollowerDetail(){
               try{
						   let response = await fetch('http://205.147.102.6/p/sites/lintok/api/users/followers.json',{
								    method:'POST',
                   headers:{
											 'Accept':'application/json',
											 'Content-Type':'application/json'
										},
										body:JSON.stringify({
											  user_id:this.state.Id,
										})
							 });
							      let cd = await response.json();
                    console.log(cd.response.datafollowersRequest); 
                  if(cd != undefined){
                      users = cd.response.data.followersRequest;
                      console.log(users);
                      this.setState({
                          userDataSource: this.state.userDataSource.cloneWithRows(users)
                      });  
                    } 
					}	
          catch(errors){
					}
  }

  async onAcceptPress(follower_id,following_id){
        try{
						   let response = await fetch('http://205.147.102.6/p/sites/lintok/api/users/confirmRequest.json',{
								   method:'POST',
                   headers:{
											 'Accept':'application/json',
											 'Content-Type':'application/json'
										},
										body:JSON.stringify({
											  follower_id:follower_id,
                        following_id:following_id
										})
							 });
							      let cd = await response.json();
                    ToastAndroid.showWithGravity(cd.response.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
					}	
          catch(errors){
					}
  }

  async onDeclinePress(follower_id,following_id){
              try{
						   let response = await fetch('http://205.147.102.6/p/sites/lintok/api/users/deleteRequest.json',{
								    method:'POST',
                   headers:{
											 'Accept':'application/json',
											 'Content-Type':'application/json'
										},
										body:JSON.stringify({
											   follower_id:follower_id,
                        following_id:following_id
										})
							 });
							      let cd = await response.json();
                    console.log(cd);
                    ToastAndroid.showWithGravity(cd.response.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
					}	
          catch(errors){
					}
  }



   onBackButtonPress(){
       this.props.navigator.pop();
   }
   
   renderRow(user,sectionId,rowId,highlightRow){
       let pic = {
                 uri: user.follower_detail.image
       }
       return(
        <View style={styles.row}>
            <View style={{width:'15%',padding:10}}>
               <Image source={pic} style={{width:40,height:40,borderRadius:100}}/> 
            </View>
            <View style={{width:'35%',padding:10}}>
              <Text style={styles.rowText}>{user.follower_detail.username}</Text>
            </View>
              <View style={{width:'60%',padding:10,height:60,flexDirection:'row'}}>
                <View style={{width:'40%',height:60}}>
                    <TouchableOpacity onPress ={this.onAcceptPress.bind(this,user.follower_id,user.following_id)}>
                       <Text style= {{width:'90%',height:40,backgroundColor:'#FD680C',color:'#FFFFFF',padding:8,borderRadius:4}}>Accept</Text>
                    </TouchableOpacity>
                </View>

                 <View style={{width:'40%',height:60}}>
                    <TouchableOpacity onPress ={this.onDeclinePress.bind(this,user.follower_id,user.following_id)} >
                      <Text style= {{width:'90%',height:40,backgroundColor:'#A7ABAD',color:'#FFFFFF',padding:8,borderRadius:4}}>Decline</Text>
                    </TouchableOpacity>
                </View>
             </View>
            </View>
       )
   }

  render() {
    return (
             <View style={styles.container}>
                   <View style={styles.PinHeader}>
                      <View style={{width: 40, height: 50,padding:10}}>
                        <TouchableOpacity onPress={this.onBackButtonPress.bind(this)}>
                            <Image source={require('../../images/prev.png')}/>
                        </TouchableOpacity>
                        </View>
                        <View style={{width: 320, height: 50,padding:10}}>
                            <Text style={{color:'white'}}>LinTok</Text>
                        </View>
                        <View style={{width: 40, height: 50,padding:10}}>
                        </View>
                  </View>
                  <View style={{width: '100%', height: 40,flexDirection:'row'}}>
                            <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                                  <Image source={require('../../image2/Home.png')}/>
                             </View>
                            <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                                  <Image source={require('../../image2/search.png')}/>
                             </View>
                              <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                                  <Image source={require('../../image2/add.png')}/>
                             </View>
                             <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                                  <Image source={require('../../image2/heart.png')}/>
                             </View>
                              <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                                  <Image source={require('../../image2/five.png')}/>
                             </View>
                    </View>
                                <ListView
                                  dataSource={this.state.userDataSource}
                                  renderRow={this.renderRow.bind(this)}
                                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                                />
                </View>
    );
  }
}

export default Following;


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



