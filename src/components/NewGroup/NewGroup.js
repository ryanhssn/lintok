import React, {Component} from 'react';
import {AppRegistry,StyleSheet,View,Text,TouchableOpacity,TextInput,Image,ListView} from 'react-native';

const users = [
    {name:'John Doe'},
    {name:'Brad Traversy'},
    {name:'Steve Smith'},
    {name:'Janet Williams'},
    {name:'Saurabh Sharma'},
    {name:'Gaurav Sharma'},
    {name:'Akshi Goel'}
]

export default class NewGroup extends Component {
  
  onBackButtonPress(){
     this.props.navigator.pop();
  }

    onPress(){
       this.props.navigator.replace({
		     id:'AddSubject'
	    	})
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
              <View style={{width:60,flexDirection:'row'}}>
                <Text>Mobile</Text>
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
                        <View style={{width: 280, height: 50,padding:2}}>
                            <Text style={{color:'white',fontSize:20}}>New Group</Text>
                            <View>
                                 <Text style={{color:'white',fontSize:10}}>Add Members</Text>
                                </View>
                        </View>
                        <View style={{width: 40, height: 50,padding:10}}>
                            <Image source={require('../../images/search.png')}/>
                        </View>
                  </View>
                        <TouchableOpacity onPress={()=>{this.onPress()}}>
                          <ListView
                                dataSource={this.state.userDataSource}
                                renderRow={this.renderRow.bind(this)}
                                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                            />
                            </TouchableOpacity>
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

module.exports = NewGroup;

