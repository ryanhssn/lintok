import React, { Component } from 'react';
import { View, StyleSheet,ScrollView,Image,TextInput,TouchableOpacity,Text,Picker,AsyncStorage,Alert} from 'react-native';
var names = [];

export default class UserProfile extends Component {
        constructor(props) {
            super(props)
                this.state = {
                  Image:'',
                  username:'',
                  Id:'',
              }
             this.getUserProfile();
        }

       componentDidMount(){
          AsyncStorage.getItem('@UserId:key').then((value)=>{
                 var userId = JSON.parse(value);
                 this.setState({Id:userId});
          })
        }

        onBackButtonPress(){
          this.props.navigator.pop();
        }

       async getUserProfile(){
            try{
						   let response = await fetch('http://205.147.102.6/p/sites/lintok/api/users/profileUser.json',{
								    method:'POST',
                    headers:{
											       'Accept':'application/json',
											 'Content-Type':'application/json'
										},
										body:JSON.stringify({
											  user_id:this.props.photoId,
										})
							 });
							     let cd = await response.json();
                   console.log(cd);
                   for(var i in cd){
                    let pic = {
                           uri: cd.response.data.image
                      }
                            this.setState({
                                Image:pic,
                            })

                            this.setState({
                              username: cd.response.data.username,
                            });
                   }
					}	
          catch(errors){
					}
        }

     async onFollowUser(){
              try{
						   let response = await fetch('http://205.147.102.6/p/sites/lintok/api/users/followRequest.json',{
								    method:'POST',
                    headers:{
											       'Accept':'application/json',
											 'Content-Type':'application/json'
										},
										body:JSON.stringify({
                        follower_id:this.state.Id,
											  following_id:this.props.photoId,
										})
							 });
							      let cd = await response.json();
                    console.log(cd);
                    if(cd.response.message == "Successfully"){
                         Alert.alert(
                                'Congrats',
                                'You have Successfully follow person',
                                 [

                                 ],
                                 { cancelable: true }
                              )
                     }
					}	
          catch(errors){
					}
        }

       render(){
            return (
                <ScrollView>
                   <View style={design.PinContainer}>
                       <Image style={design.PinContent} source={require('../../images/bann1.png')}>
                          <View style={{width:'100%',height:46,flexDirection:'row',padding:10}}>
                            <View style={{width:30,height:46}}>
                              <TouchableOpacity onPress={this.onBackButtonPress.bind(this)}>
                               <Image source={require('../../images/prev.png')}/>
                               </TouchableOpacity>
                               </View>
                               <Text style={{color:'#FFFFFF',fontSize:15}}>Profile</Text>
                            </View>
                       </Image>

                      <View style={{width:'100%',height:140,flexDirection:'row'}}>
                          <View style={{width:150,height:140}}>
                           <Image source={this.state.Image} style={{width:150,height:140,borderRadius:100}}/> 
                           </View>
                            <View style={{width:240,height:140,padding:10}}>
                              <Text style={{color:'#FD680C'}}>{this.state.username}</Text>
                              <View>
                                    <Text>San Francisco,CA Canada</Text>
                                  </View>
                           </View>
                       </View>
                       <View style={{width:'100%',height:100,flexDirection:'row'}}>
                           <View style={{width:300,height:100,padding:10}}>
                             <TouchableOpacity onPress = {this.onFollowUser.bind(this)} style={design.buttonContainer}>
	                                    <Text style={design.buttonText}>Following</Text>
	                           </TouchableOpacity>
                             </View>
                             <View style={{width:100,height:100,padding:15}}>
                               <Image source={require('../../images/chat16.png')}/>
                             </View>
                         </View>
                         <View style={{width:'100%',height:150,flexDirection:'row',borderTopWidth:1,borderBottomWidth:1,borderBottomColor:'#B2AEAA',borderTopColor:'#B2AEAA'}}>
                           <View style={{width:200,height:150,borderRightWidth:1,borderRightColor:'#B2AEAA',alignItems:'center',justifyContent:'center'}}>
                             <Text style={{color:'black',fontSize:20}}>21</Text>
                             <View>
                                      <Text style={{color:'black',fontSize:20}}>Followers</Text>
                               </View>
                             </View>
                             <View style={{width:200,height:150,borderRightWidth:1,borderRightColor:'#B2AEAA',alignItems:'center',justifyContent:'center'}}>
                                   <Text style={{color:'black',fontSize:20}}>05</Text>
                                  <View>
                                        <Text style={{color:'black',fontSize:20}}>Followings</Text>
                                 </View> 
                               </View>
                           </View>
            </View>
            </ScrollView>
            )
       }
  };
const design = StyleSheet.create({
    PinContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },
  PinHeader: {
    backgroundColor: '#FD680C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:66,
  },
   PinContent: {
    backgroundColor:'black',
    width:'100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
  },
  item:{
     width: '100%',
  },
  first:{
       flexDirection: 'row',
       backgroundColor:'#E7E8EA',
       height:56,
  },
   second:{
       flexDirection: 'row',
       backgroundColor:'#E7E8EA',
       height:56,
  },
    content:{
       flexDirection: 'row',
       backgroundColor:'#E7E8EA',
       height:100,
  },
  buttonContainer:{
   	 backgroundColor:'#FD680C',
      padding:10
   },
	 buttonText:{
   	 textAlign:'center',
   	 color:'#FFFFFF',
   	 fontWeight:'700'
   },
})

module.exports = UserProfile;