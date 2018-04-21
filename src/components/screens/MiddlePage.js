
import React, { Component } from 'react';
import { View, StyleSheet,ScrollView,Image,TextInput,TouchableOpacity,Text, Button, Picker,ToolbarAndroid,AsyncStorage, Dimensions} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Video from 'react-native-video';
import { List, ListItem } from 'react-native-elements';
import { users } from '../config/data';
import {FBApp}  from '../FirebaseAuth/FirebaseAuth';
import VideoPlayer from 'react-native-video-controls';
import Platform from './Platform';

var ref="";
var names = [];

const { width, height } = Dimensions.get('screen');
//alert(width+" "+height)


class MiddlePage extends Component {
  static navigationOptions = {
      title: 'Public',
    };
  constructor(props) {
    super(props);
    this.state = {
        pageData:'',
        Id:'',
        showView:true,
        paused: false,
       orientation: Platform.isPortrait() ? 'portrait' : 'landscape',
       devicetype: Platform.isTablet() ? 'tablet' : 'phone',
       width,
       height: height/3
    }

    // Event Listener for orientation changes
   Dimensions.addEventListener('change', () => {
       this.setState({
           orientation: Platform.isPortrait() ? 'portrait' : 'landscape',
       });
   });

  }

  _setOrientation = (data) => {
  //alert(data.orientation)
  if(data.orientation == 'LANDSCAPE'){
    this.setState({
        width: height,
        height: width
    });

  } else {
    this.setState({
        width,
        height: height/3
    });
  }
  // this.setState({
  //   orientation: evt.orientation,
  //   device: evt.device
  // });
}

  componentDidMount(){
      // Orientation.addListener(this._setOrientation);
      //
      // Orientation.getOrientation(
      //  (orientation, device) => {
      //    console.log(orientation, device);
      //  }
      // );
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
     const { width, height } = this.state;
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

                        <View style={design.singleFeed}>

                        <View style={design.feedHead}>
                          <Image
                           style={design.feedDp}
                            source={require('../../images/user1.png')}
                           />
                           <Text style={design.FeedUserName}>Marry Williams</Text>
                           <Text style={design.feedAgo}>1 hour ago</Text>
                        </View>
                      <TouchableOpacity onPress={() =>
                          {
                            this.setState({
                              paused: !this.state.paused
                            })
                          }
                       }>
                        <Video source={{uri: "http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8"}}   // Can be a URL or a local file.
                        ref={(ref) => {
                        this.player = ref
                        }}                                                 // Store reference
                        rate={1.0}                              // 0 is paused, 1 is normal.
                        volume={1.0}                            // 0 is muted, 1 is normal.
                        muted={false}                           // Mutes the audio entirely.
                        paused={this.state.paused}                          // Pauses playback entirely.
                        resizeMode="stretch"                      // Fill the whole screen at aspect ratio.*
                        repeat={true}                           // Repeat forever.
                        playInBackground={false}                // Audio continues to play when app entering background.
                        playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                        ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                        progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                        onLoadStart={this.loadStart}            // Callback when video starts to load
                        onLoad={this.setDuration}               // Callback when video loads
                        onProgress={this.setTime}               // Callback every ~250ms with currentTime
                        onEnd={this.onEnd}                      // Callback when playback finishes
                        onError={this.videoError}               // Callback when video cannot be loaded
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                        fullscreen={true}
                        style={[design.backgroundVideo, {width, height}]} />
                      </TouchableOpacity>


                        <View style={design.feedFoot}>
                          <View style={{flexDirection: 'row', alignItems: 'center' }}>
                              <Image
                               style={design.likeBtn}
                                source={require('../../images/like.png')}
                               />
                               <Text> 20  Likes</Text>
                           </View>
                            <View style={{flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                               style={design.CmntBtn}
                                source={require('../../images/comment.png')}
                               />
                               <Text> 15  Comments</Text>
                           </View>
                            <View>
                              <Image
                               style={design.menuBtn}
                                source={require('../../images/report.png')}
                               />
                           </View>
                        </View>

                      </View>

                        <View style={design.singleFeed}>

                        <View style={design.feedHead}>
                          <Image
                           style={design.feedDp}
                            source={require('../../images/user1.png')}
                           />
                           <Text style={design.FeedUserName}>Marry Williams</Text>
                           <Text style={design.feedAgo}>1 hour ago</Text>
                        </View>
                      <TouchableOpacity onPress={() =>
                          {
                            this.setState({
                              paused: !this.state.paused
                            })
                          }
                       }>
                        <Video source={{uri: "http://www.streambox.fr/playlists/test_001/stream.m3u8"}}   // Can be a URL or a local file.
                        ref={(ref) => {
                        this.player = ref
                        }}                                                 // Store reference
                        rate={1.0}                              // 0 is paused, 1 is normal.
                        volume={1.0}                            // 0 is muted, 1 is normal.
                        muted={false}                           // Mutes the audio entirely.
                        paused={this.state.paused}                          // Pauses playback entirely.
                        resizeMode="stretch"                      // Fill the whole screen at aspect ratio.*
                        repeat={true}                           // Repeat forever.
                        playInBackground={false}                // Audio continues to play when app entering background.
                        playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                        ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                        progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                        onLoadStart={this.loadStart}            // Callback when video starts to load
                        onLoad={this.setDuration}               // Callback when video loads
                        onProgress={this.setTime}               // Callback every ~250ms with currentTime
                        onEnd={this.onEnd}                      // Callback when playback finishes
                        onError={this.videoError}               // Callback when video cannot be loaded
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                        fullscreen={true}
                        style={[design.backgroundVideo, {width, height}]} />
                      </TouchableOpacity>


                        <View style={design.feedFoot}>
                          <View style={{flexDirection: 'row', alignItems: 'center' }}>
                              <Image
                               style={design.likeBtn}
                                source={require('../../images/like.png')}
                               />
                               <Text> 20  Likes</Text>
                           </View>
                            <View style={{flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                               style={design.CmntBtn}
                                source={require('../../images/comment.png')}
                               />
                               <Text> 15  Comments</Text>
                           </View>
                            <View>
                              <Image
                               style={design.menuBtn}
                                source={require('../../images/report.png')}
                               />
                           </View>
                        </View>

                      </View>
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
  singleFeed: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',
 },
 backgroundVideo: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'stretch',
   borderColor: 'red',
   borderWidth: 2,
   marginTop: 20
 },
 feedHead: {
   flexDirection: 'row',
   justifyContent: 'flex-start',
   alignItems: 'center',
   width,
   marginHorizontal: 15,
   marginTop: 10,
   height: 40
 },
 FeedUserName: {
   fontWeight: 'bold',
   fontSize: 15,
   marginLeft: 10
 },
 feedDp: {
   marginLeft: 15,
   width: 50,
   height: 50
 },
 feedAgo: {
   marginLeft: '30%',
 },
 feedFoot: {
   flex:1,
   width,
   flexDirection: 'row',
   justifyContent: 'flex-start',
   alignItems:'center',
   margin: 10,
   paddingBottom: 10,
   borderBottomColor: '#3c3c3c',
   borderBottomWidth: 1
 },
 likeBtn: {
   width: 20,
   height: 20,
   marginLeft: 20
 },
 CmntBtn: {
   width: 20,
   height: 20,
   marginLeft: '30%'
 },
 menuBtn: {
   marginLeft: '25%'
 }

})
