import React, { Component } from 'react';
import { View, StyleSheet,ScrollView,Image,TextInput,TouchableOpacity,Text,Picker,ToolbarAndroid,ListView} from 'react-native';
var names = [];
let mm = '';
export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this._onPhotoRow = this._onPhotoRow.bind(this);
    this.state = {
        searchVal:'',
        dataSearch:'',
        isLoggedIn:false,
    }
  }

    async onSearchPress(){
               names.length = 0;
          try{
						   let response = await fetch('http://205.147.102.6/p/sites/lintok/api/users/searchUsers.json',{
								    method:'POST',
                   headers:{
											 'Accept':'application/json',
											 'Content-Type':'application/json'
										},
										body:JSON.stringify({
											  term:this.state.searchVal,
										})
							 });
							      let cd = await response.json();
                    mm = cd.response.data;
                    this.setState({
                      dataSearch:mm,
                    })
                    this.setState({
                          isLoggedIn: true,
                    });
                                  
					}	
          catch(errors){
					}

    }

     onMenuPress(){
        this.props.navigator.push({
            id:'LiveScreen'
       })
    }


_onPhotoRow(id){
        this.props.navigator.push({
            id:'UserProfile',
            photoId:id,
       })
}



  render() {
   const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
        var tt = this.state.dataSearch;
        console.log(tt);
        tt.map(function(data){
            let pic = {
                 uri: data.image
            }
                  names.push(
                      <View style={design.item2}>
                        <TouchableOpacity onPress={()=>this._onPhotoRow(data.id)} >
                       <Image source={pic} style={design.item4}/> 
                       </TouchableOpacity>
                       </View>
                       
                  )
        }.bind(this))

    } else {
      button = <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                    <Image source={require('../../image2/add.png')}/>
                 </View>
    }
    return (
      <View style={design.PinContainer}>
                  <View style={design.PinHeader}>
                     <View style={{width:'10%',height:40,padding:5}}>
                            <TouchableOpacity onPress={this.onSearchPress.bind(this)}>
                                  <Image source={require('../../image2/searchuser.png')}/>
                            </TouchableOpacity>
                    </View>
                        <TextInput
                        style={design.searchBar}
                        placeholder = 'Search'
                        autoCapitalize = 'none'
                        onChangeText = {(val) => this.setState({searchVal:val})}
                        underlineColorAndroid='#FFF'/>
                  </View>
                     <View style={{width: '100%', height: 40,flexDirection:'row'}}>
                           <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                                  <Image source={require('../../image2/Home.png')}/>
                             </View>
                            <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                                  <Image source={require('../../image2/search.png')}/>
                             </View>
                              <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                                <TouchableOpacity onPress ={this.onMenuPress.bind(this)}>
                                  <Image source={require('../../image2/add.png')}/>
                                  </TouchableOpacity>
                             </View>
                             <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                                  <Image source={require('../../image2/heart.png')}/>
                             </View>
                              <View style={{width:'20%',height:40,backgroundColor:'grey',padding:10}}>
                                  <Image source={require('../../image2/five.png')}/>
                             </View>
                        </View>

                          <ScrollView>
                            <View style={design.list}>
                               {names}
                               </View>
                       </ScrollView>

            </View>

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
     padding:5
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
   searchBar: {
        width:'90%',
        height:30,
        backgroundColor: '#ffffff',
        borderColor:'#ffffff',
        borderBottomWidth:0,
    },
     list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item2: {
        backgroundColor: '#ccc',
        margin: 10,
        width: 100,
        height: 100
    },
     item4: {
        width: 100,
        height: 100
    }
})

module.exports = SearchScreen;