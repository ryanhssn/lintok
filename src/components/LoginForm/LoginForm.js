import React, { Component } from 'react';
import {StyleSheet,ScrollView,TouchableOpacity,Text,View,Image,ListView} from 'react-native';
import { List, ListItem } from 'react-native-elements';
var users = [];

class LoginForm extends Component {
    constructor(props) {
    super(props);
    this.state = {
       userDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  }
    componentDidMount(){
       this.UserWhoLikes();
    }

   async UserWhoLikes(){
        try{
                let response = await fetch('http://205.147.102.6/p/sites/lintok/api/posts/postLikesList.json',{
                        method:'POST',
                            headers:{
                                          'Accept':'application/json',
                                    'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                               post_id:this.props.postId,
                            })
                    });
                        let cd = await response.json();
                            mm = cd.response.data;
                            console.log(mm);
                        if(mm != undefined){
                        mm.map((element) => {
                            users.push(element.user);
                        })  
                        this.setState({
                            userDataSource: this.state.userDataSource.cloneWithRows(users)
                        });  
                        } 
                                  
				}	
        catch(errors){
				}
    }

    onBackButtonPress(){
      this.props.navigator.pop();
    }

    renderRow(user,sectionId,rowId,highlightRow){
       let pic = {
          uri: user.image
       }
       return(
        <View style={styles.row}>
            <View style={{width:'15%',padding:10}}>
               <Image source={pic} style={{width:40,height:40,borderRadius:100}}/> 
            </View>
            <View style={{width:'35%',padding:10}}>
                <Text style={styles.rowText}>{user.username}</Text>
            </View>
             <View style={{width:'60%',padding:10,height:60,flexDirection:'row'}}>
                <View style={{width:'40%',height:60}}>
                      <Text style= {{width:'90%',height:40,color:'#FFFFFF',padding:8,borderRadius:4}}></Text>
                </View>
                 <View style={{width:'40%',height:60}}>
                    <Text style= {{width:'90%',height:40,backgroundColor:'#A7ABAD',color:'#FFFFFF',padding:8,borderRadius:4}}>Follow</Text>
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
                         <View style={{width: 40, height: 50,padding:10}}>
                            <Image source={require('../../images/check.png')}/>
                        </View>
                        <View style={{width: 200, height: 50,padding:10}}>
                            <Text style={{color:'white'}}>100 People who reacted</Text>
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

module.exports = LoginForm;