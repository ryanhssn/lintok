
import React, { Component } from 'react';
import { View, StyleSheet,ScrollView,Image,TextInput,TouchableOpacity,Text,Picker,AsyncStorage,ListView,TouchableHighlight,ToolbarAndroid,Button} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
const users = '';

class You extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
       Id:'',
    };
  }



  onBackButtonPress(){
     this.props.navigator.pop();
  }

  componentDidMount(){
          AsyncStorage.getItem('@UserId:key').then((value)=>{
                 var userId = JSON.parse(value);
                 this.setState({Id:userId});
                 this.YouDetail();
          })
  }

  async YouDetail(){
            try{
                let response = await fetch('http://205.147.102.6/p/sites/lintok/api/users/you.json',{
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
                        users = cd.response.data;
                        this.setState({
                            userDataSource: this.state.userDataSource.cloneWithRows(users)
                        })
				}	
        catch(errors){
				}
  }

  async FollowMode(id){
                    try{
						   let response = await fetch('http://205.147.102.6/p/sites/lintok/api/users/followRequest.json',{
								   method:'POST',
                   headers:{
											 'Accept':'application/json',
											 'Content-Type':'application/json'
										},
										body:JSON.stringify({
											  follower_id :this.state.Id,
                        following_id:id
										})
							 });
							      let cd = await response.json();
                    console.log(cd);
                   if(cd.response.message == 'Successfully'){
                       this.YouDetail();
                   }
					}	
          catch(errors){
					}
  }

   async UnFollowMode(id){
       try{
						   let response = await fetch('http://205.147.102.6/p/sites/lintok/api/users/unFollow.json',{
								    method:'POST',
                   headers:{
											       'Accept':'application/json',
											 'Content-Type':'application/json'
										},
										body:JSON.stringify({
											  follower_id :this.state.Id,
                        following_id:id
										})
							 });
							      let cd = await response.json();
                    console.log(cd);
                   if(cd.response.message == 'successfully'){
                       this.YouDetail();
                   }
					}	
          catch(errors){
					}
  }
   
   renderRow(user,sectionId,rowId,highlightRow){
            let pic = {
                 uri: user.image
            }

      var vv=false ;
      if(user.mode == 'Follow'){
          vv=true;
      }else{
          vv=false
      }
       return(
        <View style={styles.row}>
            <View style={{width:'15%',padding:10}}>
              <Image source={pic} style={{width:40,height:40,borderRadius:100}}/> 
            </View>
            <View style={{width:'55%',padding:10}}>
              <Text style={styles.rowText}>{user.username}</Text>
              </View>
              <View style={{width:'60%',padding:10,height:60,flexDirection:'row'}}>
                 <View style={{width:'40%',height:60}}>
                   {vv ? (
                         <TouchableOpacity onPress={this.FollowMode.bind(this,user.id)}>
                                <Text style= {{width:'100%',height:40,backgroundColor:'#A7ABAD',color:'#FFFFFF',padding:8,borderRadius:4}}>{user.mode}</Text>
                         </TouchableOpacity>
                      ):(
                          <TouchableOpacity onPress={this.UnFollowMode.bind(this,user.id)}>
                                <Text style= {{width:'100%',height:40,backgroundColor:'#FD680C',color:'#FFFFFF',padding:8,borderRadius:4}}>{user.mode}</Text>
                         </TouchableOpacity>
                      )
                   }

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

export default You;


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



