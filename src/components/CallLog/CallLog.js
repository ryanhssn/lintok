import React, {Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,TextInput,Image,ListView} from 'react-native';

const users = [
    {name:'John Doe'},
    {name:'Brad Traversy'},
    {name:'Steve Smith'},
    {name:'Janet Williams'}
]

export default class CallLog extends Component {
    onBackButtonPress(){
         this.props.navigator.pop();
    }
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userDataSource: ds.cloneWithRows(users),
    };
  }
   
   renderRow(user,sectionId,rowId,highlightRow){
       return(
        <View style={styles.row}>
            <View style={{width:80,padding:10}}>
            <Image source={require('../../images/user1.png')}/>
            </View>
            <View style={{width:150,padding:10}}>
              <Text style={styles.rowText}>{user.name}</Text>
              </View>
              <View style={{width:150,padding:10,flexDirection:'row'}}>
                  <View style={{width:50}}>
                      </View>
                  <View style={{width:80,flexDirection:'row'}}>
              <View style={{width:30,flexDirection:'row'}}>
              </View>
              <View style={{width:30,flexDirection:'row'}}>
              <Image style={{}} source={require('../../images/video.png')}/>
              </View>
              </View>
              </View>
            </View>
       )
   }
     render(){
         return (
              <View style={styles.container}>
                   <View style={styles.PinHeader}>
                      <View style={{width: 40, height: 50,padding:10}}>
                          <TouchableOpacity onPress={this.onBackButtonPress.bind(this)}>
                            <Image source={require('../../images/prev.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: 320, height: 50,padding:10}}>
                            <Text style={{color:'white'}}>Call log</Text>
                        </View>
                  </View>
                          <ListView
                                dataSource={this.state.userDataSource}
                                renderRow={this.renderRow.bind(this)}
                                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                            />
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

module.exports = CallLog;

