import React, { Component } from 'react';
import { View, StyleSheet,ScrollView,Image,TextInput,TouchableOpacity,Text,Picker} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { List, ListItem } from 'react-native-elements';
import { users } from '../config/data';
import Following from '../screens/Following';
import You from '../screens/You';
import {FBApp}  from '../FirebaseAuth/FirebaseAuth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class FollowerDetail extends Component {
     constructor(props){
        super(props)
     }
      state = {
        language: '',
      }
      state = {
        index: 0,
        routes: [
          { key: '1', title: 'Following' },
          { key: '2', title: 'You' },
        ],
      };



  _handleChangeTab = (index) => {
    if(index == 0){

    }
    else if( index == 1){
      //this.onBPress()
    }
     this.setState({ index });
  };

  _renderFooter = (props) => {
    // alert(JSON.stringify(props));
    return <TabBar {...props} />;
  };



    


  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
              return <Following navigator={this.props.navigator}/>
    case '2':
              return <You navigator={this.props.navigator}/> 

    default:
      return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onRequestChangeTab={this._handleChangeTab}
      />
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
})

module.exports = FollowerDetail;