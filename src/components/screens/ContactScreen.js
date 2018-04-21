import React, { Component } from 'react';
import {View, StyleSheet,ScrollView,Image,TextInput,TouchableOpacity,Text,Picker,AsyncStorage,ListView,TouchableHighlight} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { List, ListItem } from 'react-native-elements';
import { users } from '../config/data';
import {FBApp}  from '../FirebaseAuth/FirebaseAuth';
import PhoneContactMap from './PhoneContact';
var Contacts = require('react-native-contacts');

class ContactScreen extends React.Component {
  static navigationOptions = {
      title: 'Contact',
    };
  constructor(props) {
    super(props);
  }


    state = {
      contactsArray: []
    }

    componentDidMount() {
      this._getContacts();
    }

    _getContacts = async () => {
      try {
          let contacts = await Contacts.getAll((err, contacts) => {
            if(err === 'denied'){
              // x.x
            } else {
              contacts =  contacts.sort((a, b) => a.givenName.localeCompare(b.givenName));
              this.setState({
                contactsArray: contacts
              })

            }
         })

      } catch(err) {
        alert(err)
      }
    }

    onPressContact =(user) =>{
      this.props.navigation.navigate('UserDetail', {
        itemId: 'UserDetail',
        data: user
      });

   }


  render() {
    const { contactsArray } = this.state;
      return (
              <View style={design.PinContainer}>
                  <View style={design.PinHeader}>
                      <View style={{width: 150, height: 50, backgroundColor: '#FD680C'}} >
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
                  <View>
                  {
                     contactsArray.map((user, index) => {
                       //alert(JSON.stringify(user));
                       return (
                        <List>
                            <ListItem button onPress={() => {this.onPressContact(user)}}
                              key={user.givenName}
                              title={`${user.givenName.toUpperCase()}`}
                              subtitle="Check All Contact"
                            />
                        </List>
                      )
                      })
                  }
                  </View>
        </View>

        );
  }
}

export default ContactScreen;


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
