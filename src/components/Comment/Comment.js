import React, {Component} from 'react';
import {View,StyleSheet,Image,Text,TouchableOpacity,ScrollView,ListView,TextInput,ToastAndroid} from 'react-native';
var users = [];

class Comment extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      message:''
    };
  }

  onBackButtonPress(){
     this.props.navigator.pop();
  }

  componentDidMount() {
       this.getComment();
  }

    async getComment(){
        try{
          let response = await fetch('http://205.147.102.6/p/sites/lintok/api/posts/postCommentsList.json',{
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
             post_id:this.props.post_id,
         })
         });
         let cd = await response.json();  
          console.log(cd);
          if(cd != undefined){
             cd.response.data.map((element) => {
               users.push(element.message);
             })  
              this.setState({
                 userDataSource: this.state.userDataSource.cloneWithRows(users)
              });  
          } 
        }	
        catch(errors){
				}
    }
   
   renderRow(user,sectionId,rowId,highlightRow){
       return(
        <View style={styles.row}>
            <View style={{width:80,padding:10}}>
                <Image source={require('../../images/user1.png')}/>
            </View>
            <View style={{width:150,padding:10}}>
              <Text style={styles.rowText}>{user}</Text>
              </View>
              <View style={{width:150,padding:10,flexDirection:'row'}}>
                  <View style={{width:50}}>
                      </View>
                  <View style={{width:80,flexDirection:'row'}}>
                        <View style={{width:30,flexDirection:'row'}}>
                            <Image style={{}} source={require('../../images/up-thumb.png')}/>
                        </View>
                        <View style={{width:30,flexDirection:'row'}}>
                            <Image style={{}} source={require('../../images/down-thumb.png')}/>
                        </View>
                 </View>
              </View>
            </View>
       )
   }

 async onSendMessage(){
         try{
				let response = await fetch('http://205.147.102.6/p/sites/lintok/api/posts/sendComment.json',{
				method:'POST',
                headers:{
					'Accept':'application/json',
					'Content-Type':'application/json'
				},
				body:JSON.stringify({
					post_id:this.props.post_id,
                    user_id:this.props.user_id,
                    message:this.state.message
				})
				});
				let cd = await response.json();  
                ToastAndroid.showWithGravity(cd.response.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
				}	
        catch(errors){
				}
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
                            <Text style={{color:'white'}}>Comments</Text>
                        </View>
                        <View style={{width: 40, height: 50,padding:10}}>
                            <Image source={require('../../images/menu.png')}/>
                        </View>
                  </View>
                      <ListView
                        dataSource={this.state.userDataSource}
                        renderRow={this.renderRow.bind(this)}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                      />

                    <View style={{width:'100%', height: 50,position:'absolute',bottom:0,flexDirection:'row'}}>
                             <View style={{width:'85%',height:50}}>
                                <TextInput
                                placeholder="Write comment here"
                                placeholderTextColor = "#B8AFAF"
                                onChangeText = {(val) => this.setState({message:val})}
                                style={styles.input}
                                />
                            </View>
                             <View style={{width:'30%',height:50,backgroundColor:'#FFFFFF'}}>
                                 <TouchableOpacity onPress={this.onSendMessage.bind(this)}>
                                    <Image source={require('../../images/send.png')}/> 
                                 </TouchableOpacity>
                            </View>
                      </View>
             </View>
    );
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

module.exports = Comment;