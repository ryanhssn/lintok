import React, { Component } from 'react';
import { View, StyleSheet,ScrollView,Image,TextInput,TouchableOpacity,Text,Picker} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { List, ListItem } from 'react-native-elements';
import simpleContacts from 'react-native-simple-contacts';
var Contacts = require('react-native-contacts');
import { users } from '../config/data';
import Chat from '../screens/Chat';
import MiddlePage from '../screens/MiddlePage';
import {FBApp}  from '../FirebaseAuth/FirebaseAuth';

var ref="";
var names = [];
var PhoneContact = '';

export default class ChatDetail extends Component {
     constructor(props){
        super(props)
     }
      state = {
        language: '',
      }
      state = {
        index: 0,
        routes: [
          { key: '1', title: 'Chat' },
          { key: '2', title: 'Public' },
          { key: '3', title: 'Contact' },
        ],
      };


      _getContacts = async () => {
        try {
          alert('ryanhssn')
          //let contacts = await simpleContacts.getContacts();
          //alert(contacts)
                // if(contacts){
                //   //PhoneContact = contacts.sort(function(a,b) {return (a.givenName > b.givenName) ? 1 : ((b.givenName > a.givenName) ? -1 : 0);} );
                //   let PhoneContact =  await contacts.sort((a, b) => a.givenName.localeCompare(b.givenName));
                //   console.log(PhoneContact);
                //   alert(PhoneContact);
                //  }

            let contacts = await Contacts.getAll((err, contacts) => {
                    if(err === 'denied'){
                      // x.x
                    } else {
                       //PhoneContact = contacts.sort(function(a,b) {return (a.givenName > b.givenName) ? 1 : ((b.givenName > a.givenName) ? -1 : 0);} );
                       PhoneContact =  contacts.sort((a, b) => a.givenName.localeCompare(b.givenName));
                       console.log(PhoneContact);
                       //alert(PhoneContact)
                    }
                 })

        } catch(err) {
          alert(err)
        }
      }


      componentDidMount() {
        this._getContacts();
      }


  _handleChangeTab = (index) => {
    if(index == 0){

    }
    else if( index == 1){
      //this.onBPress()
    }
    else if(index == 2){
    }
     this.setState({ index });
  };

  _renderFooter = (props) => {
    // alert(JSON.stringify(props));
    return <TabBar {...props} />;
  };

    onMenuPress(){
        this.props.navigator.push({
            id:'Userlist'
       })
    }

   /* onPress(){
          this.props.navigator.push({
            id:'UserDetail',
          })
    }*/

    onPressContact(rowId,user){
       this.props.navigator.push({
            id:'UserDetail',
            data:user,
            pageTitle:rowId
       })
    }

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
              return <Chat navigator={this.props.navigator}/>
    case '2':
              return <MiddlePage navigator={this.props.navigator}/>
    case '3':
      return (
      <ScrollView>
              <View style={design.PinContainer}>
                  <View style={design.PinHeader}>
                        <View style={{width: 150, height: 50, backgroundColor: '#FD680C'}}>
                           <Text style={{color:'white',fontSize:30,}}>LinTok</Text>
                        </View>
                        <View style={{width: 150, height: 50, backgroundColor: '#FD680C',flexDirection:'row'}}>
                         <View style={{width: 50, height: 50,padding:10}}>
                               <Image source={require('../../images/search.png')}/>
                         </View>
                         <View style={{width: 50, height: 50,padding:10}}>
                             <TouchableOpacity>
                               <Image source={require('../../images/user2.png')}/>
                             </TouchableOpacity>
                        </View>
                         <View style={{width: 50, height: 50,padding:10}}>
                              <Image source={require('../../images/menu.png')}/>
                         </View>
                      </View>
                  </View>
                      <List>
                       {PhoneContact.map((user) => (
                          <ListItem button onPress={() => {this.onPressContact("ContactDetail",user)}}
                            key={user.givenName}
                            title={`${user.givenName.toUpperCase()}`}
                            subtitle="Check All Contact"
                          />
                       ))}
                      </List>
        </View>
      </ScrollView>);

    default:
      return null;
    }
  };

  render() {
    return (
      <Text>
        RENDER CONTACTS
      </Text>
    );
  }
}
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
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

module.exports = ChatDetail;
