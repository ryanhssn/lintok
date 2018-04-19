
import React, { Component } from 'react';
import { View, StyleSheet,ScrollView,Image,TextInput,TouchableOpacity,Text,Picker,AsyncStorage,ListView,TouchableHighlight,ToolbarAndroid} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { List, ListItem } from 'react-native-elements';
import { users } from '../config/data';
import {FBApp}  from '../FirebaseAuth/FirebaseAuth';

var ref="";
var numberOfChat =[];

class Chat extends React.Component {
  constructor(props) {
    super(props);
     
      this._onPressRow = this._onPressRow.bind(this);
 
          this.state = {
                   dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
                   message:""
		     	  }  


              AsyncStorage.getItem('@MyPhone:key').then((value)=>{
                 var num = JSON.parse(value)
                 console.log('Gaurav');
                 console.log(num);
                 firstUser=num;
                 ref1 = FBApp.database ().ref('Recent/'+firstUser);
                 console.log(ref1);
                 ref1.on('value', (dataSnapshot) => {
                      dataSnapshot.forEach(function(childSnapshot) {
                        // key will be "ada" the first time and "alan" the second time
                        var key = childSnapshot.key;
                        var childData = childSnapshot.val();
                        var record = {}
                        record.phone = key
                        record.message = childData.textmessgae
                        record.groudId = childData.groupid
                        record.type = childData.type
                        numberOfChat.push(record)
                      });
                      this.setState({
                          dataSource: this.state.dataSource.cloneWithRows(numberOfChat)
                      });
                  });
             });

  }

    _onPressRow(rowId, rowData,phone,groupId) {
        this.props.navigator.replace({
                id:'UserDetail',
                recentData:rowData,
                pageTitle:rowId,
                phone:phone,
                groupId:groupId
          })
      }

      renderRow(rowData){
             console.log(rowData);
            return(
                <TouchableOpacity onPress={()=>{this._onPressRow("RecentChat",rowData,rowData.phone,rowData.groudId)}}>
                <ListItem
                    key={rowData.phone}
                    roundAvatar
                    avatar={{ uri: 'https://randomuser.me/api/portraits/thumb/men/29.jpg'}}
                    title={rowData.phone}
                    subtitle={rowData.message}
                 />

              </TouchableOpacity>
            )
        }

  render() {
    return (
       <View style={design.PinContainer}>
        <View style={{width:'100%',backgroundColor:'#FD680C',height:46,flexDirection:'row'}}>
               <View style={{width:100,height:46}}>
                 <Text style={{color:'white',fontSize:30}}>LinTok</Text>
               </View>
                  <View style={{width:300,height:46,flexDirection:'row'}}>
                        <View style={{width:100,height:46}}>
                        </View>
                         <View style={{width:50,height:46,padding:10}}>
                            <Image source={require('../../images/search.png')}/>
                         </View>
                          <View style={{width:50,height:46,padding:10}}>
                             <Image source={require('../../images/chat18.png')}/>
                          </View>
                          <View style={{width:50,height:46,padding:10}}>
                             <Image source={require('../../images/menu.png')}/>
                         </View>
                   </View>
          </View>

           <ScrollView>
                 <ListView
                    dataSource = {this.state.dataSource}
                     renderRow = {this.renderRow.bind(this)}
                />
            </ScrollView>
      </View>
    );
  }
}

export default Chat;


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
})



