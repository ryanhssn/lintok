
import React, { Component } from 'react';
import { View, StyleSheet,ScrollView,Image,TextInput,TouchableOpacity,Text,Picker,ToolbarAndroid,AsyncStorage} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { List, ListItem } from 'react-native-elements';
import { users } from '../config/data';
import {FBApp}  from '../FirebaseAuth/FirebaseAuth';
import VideoPlayer from 'react-native-video-controls';
var ref="";
var names = [];
class MiddlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pageData:'',
        Id:'',
        showView:true,
    }
  }

  componentDidMount(){
          AsyncStorage.getItem('@UserId:key').then((value)=>{
                 var userId = JSON.parse(value);
                 this.setState({Id:userId});
                     this.onBPress();
          })
  }

    	 async onBPress(){
         if(this.state.showView == true){
					try{
						   let response = await fetch('http://205.147.102.6/p/sites/lintok/api/posts/postList.json',{
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

                              for(var i in cd){
                                   cd.response.data.map(function(data){
                                     let pic = {
                                            uri: data.file
                                     };
                                     names.push(
                                        <View>
                                        <View style={design.second}>
                                        <View style={{width: 70, height: 50,padding:10}}>
                                          <Image  source={require('../../images/user1.png')}/>
                                        </View>
                                        <View style={{width: 220, height: 50,}}>
                                        <Text onPress={this._onNamePress.bind(this)} style={{color:'black',padding:10}}>{data.user.username}</Text>
                                        </View>
                                        <View style={{width: 130, height: 50,}}>
                                         <Text style={{color:'black',padding:10}}>{data.created}</Text>
                                        </View>
                                        </View>
                                        <View style={design.PinContent}>
                                           {data.type=='Image' ?
                                             <Image source={pic} style={{width:'100%', height: 250}}/>
                                            :
                                             <VideoPlayer source={data.file}/>
                                           }
                                        </View>
                                        <View style={design.second}>
                                        <View style={{width: 100, height: 50,padding:10,}}>
                                      <TouchableOpacity onPress={this.onLikePress.bind(this,data.id)}>
                                        <Image  source={require('../../images/like.png')}/>
                                      </TouchableOpacity>
                                            <Text onPress={this.onLikeCountPress.bind(this,data.id)}>{data.likesCount+ 'Likes'}</Text>
                                        </View>
                                        <View style={{width: 220, height: 50,padding:10,}}>
                                        <Image  source={require('../../images/comment.png')}/>
                                           <Text onPress={this.onCommentPress.bind(this,data.id)}>{data.commentsCount+ 'Comments'}</Text>
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
                                            <Text style={{color:'black',padding:10}}>{data.user.username}</Text>
                                        </View>
                                        <View style={{width: 130, height: 50,}}>
                                            <Text style={{color:'black',padding:10}}>{data.created}</Text>
                                        </View>
                                        </View>
                                        <View style={design.content}>
                                        <Text style={{padding:10,}}>
                                           As I mentioned before, flex property with different numeric values
                                           could be used for specifying grow factor for Flex containers, and
                                        </Text>
                                        </View>
                                        </View>
                                     )
                                   }.bind(this))
                              }
					}	catch(errors){
					}
         }
         else{
                				try{
						   let response = await fetch('http://205.147.102.6/p/sites/lintok/api/posts/postList.json',{
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
                              for(var i in cd){
                                   cd.response.data.map(function(data){
                                     let pic = {
                                            uri: data.file
                                     };
                                     names.push(
                                        <View>
                                        <View style={design.second}>
                                        <View style={{width: 70, height: 50,padding:10}}>
                                           <Image  source={require('../../images/user1.png')}/>
                                        </View>
                                        <View style={{width: 220, height: 50,}}>
                                          <Text onPress={this._onNamePress.bind(this)} style={{color:'black',padding:10}}>{data.user.username}</Text>
                                        </View>
                                        <View style={{width: 130, height: 50,}}>
                                           <Text style={{color:'black',padding:10}}>{data.created}</Text>
                                        </View>
                                        </View>
                                        <View style={design.PinContent}>
                                           {data.type=='Image' ?
                                             <Image source={pic} style={{width:'100%', height: 250}}/>
                                            :
                                             <VideoPlayer source={data.file}/>
                                           }
                                        </View>
                                        <View style={design.second}>
                                        <View style={{width: 100, height: 50,padding:10,}}>
                                        <TouchableOpacity onPress={this.onLikePress.bind(this,data.id)}>
                                          <Image  source={require('../../images/like.png')}/>
                                        </TouchableOpacity>
                                            <Text onPress={this.onLikeCountPress.bind(this,data.id)}>{data.likesCount+ 'Likes'}</Text>
                                        </View>
                                        <View style={{width: 220, height: 50,padding:10,}}>
                                        <Image  source={require('../../images/comment.png')}/>
                                           <Text onPress={this.onCommentPress.bind(this,data.id)}>{data.commentsCount+ 'Comments'}</Text>
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
                                            <Text style={{color:'black',padding:10}}>{data.user.username}</Text>
                                        </View>
                                        <View style={{width: 130, height: 50,}}>
                                            <Text style={{color:'black',padding:10}}>{data.created}</Text>
                                        </View>
                                        </View>
                                        <View style={design.content}>
                                        <Text style={{padding:10,}}>
                                          As I mentioned before, flex property with different numeric values
                                          could be used for specifying grow factor for Flex containers, and
                                        </Text>
                                        </View>
                                        </View>
                                     )
                                   }.bind(this))
                              }
                                  this.setState({showView:true})
					}	catch(errors){
					}
         }
		 }

      _onNamePress(){
          this.props.navigator.push({
                id:'Communities'
          })
      }


   async onLikePress(Postid){
            try{
						   let response = await fetch('http://205.147.102.6/p/sites/lintok/api/posts/postLike.json',{
								    method:'POST',
                   headers:{
											 'Accept':'application/json',
											 'Content-Type':'application/json'
										},
										body:JSON.stringify({
											  user_id:this.state.Id,
                        post_id:Postid
										})
							 });
							      let cd = await response.json();
                    mm = cd.response.data;
                    console.log(mm);
                    names.length = 0;
                    this.setState({showView:false})
                    this.onBPress();
					}
          catch(errors){
					}
    }

    onLikeCountPress(postId){
        this.props.navigator.push({
            id:'LoginForm',
            postId:postId
        })
     }

   onCommentPress(commentId){
        this.props.navigator.push({
            id:'Comment',
            post_id:commentId,
            user_id :this.state.Id,
       })
    }

    onMenuPress(){
        this.props.navigator.push({
            id:'LiveScreen'
        })
    }

    onSearchPress(){
       this.props.navigator.push({
            id:'SearchScreen'
       })
    }

    onheartPress(){
      this.props.navigator.push({
            id:'FollowerDetail'
       })
    }

  render() {
    return (
      <View style={design.PinContainer}>
                  <View style={design.PinHeader}>
                        <View style={{width: 200, height: 50, backgroundColor: '#FD680C'}}>
                            <Text style={{color:'white',fontSize:30,}}>LinTok</Text>
                        </View>
                       <View style={{width: 100, height: 50, backgroundColor: '#FD680C',flexDirection:'row'}}>
                         <View style={{width: 50, height: 50,padding:10}}>
                            <Image source={require('../../images/alarm.png')}/>
                         </View>
                      </View>
                  </View>
                     <View style={{width: '100%', height: 40,flexDirection:'row'}}>
                           <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                                  <Image source={require('../../image2/Home.png')}/>
                             </View>
                            <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                              <TouchableOpacity onPress ={this.onSearchPress.bind(this)}>
                                  <Image source={require('../../image2/search.png')}/>
                                  </TouchableOpacity>
                             </View>
                              <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                             <TouchableOpacity onPress ={this.onMenuPress.bind(this)}>
                                  <Image source={require('../../image2/add.png')}/>
                              </TouchableOpacity>
                             </View>
                             <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                               <TouchableOpacity onPress={this.onheartPress.bind(this)}>
                                  <Image source={require('../../image2/heart.png')}/>
                                  </TouchableOpacity>
                             </View>
                              <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                                  <Image source={require('../../image2/five.png')}/>
                             </View>
                        </View>
                        <ScrollView>
                             {names}
                       </ScrollView>
            </View>

    );
  }
}

export default MiddlePage;


const design = StyleSheet.create({
  PinContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },
  PinHeader: {
    backgroundColor: '#FD680C',
      flexDirection: 'row',
     justifyContent: 'space-between',
             height:46,
  },
  PinContent: {
     backgroundColor:'black',
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
    backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
