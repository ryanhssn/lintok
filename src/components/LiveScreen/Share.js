import React, {Component} from 'react';
import {AppRegistry,StyleSheet,View,Text,TouchableOpacity,TextInput,Image,ListView,Dimensions,TouchableHighlight,Switch,AsyncStorage,ActivityIndicator} from 'react-native';
var FileTransfer = require('react-native-file-transfer-android');
import Spinner from 'react-native-loading-spinner-overlay';
 
export default class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fileVersion:this.props.file,
        Id: '',
        latitude:this.props.latitude,
        longitude:this.props.longitude,
        address:this.props.address,
        visible: false,
    }
  }

  onAdvanceSetting(){
      this.props.navigator.replace({
            id:'AdvanceSetting'
       })
  }

  componentDidMount(){
          AsyncStorage.getItem('@UserId:key').then((value)=>{
                 var userId = JSON.parse(value);
                 this.setState({Id:userId});
          })
  }

   onBackPress(){
        this.props.navigator.pop();
    }

      onSharePress(){
         this.setState({
          visible: true,
        });
          if(this.props.Imagetype == 'Image'){
          var uri = this.state.fileVersion;
          console.log(uri);
          var Id = this.state.Id;
            let body = new FormData();
                body.append('file', {uri: uri,name: 'photo.png',filename :'imageName.png',type: 'image/png'});
                    body.append('Content-Type', 'image/png');
                    body.append('owner_id', Id);
                    body.append('type', 'Image')

                fetch('http://205.147.102.6/p/sites/lintok/api/posts/sendPost.json',{ method: 'POST',headers:{  
                    "Content-Type": "multipart/form-data",
                    "otherHeader": "foo",
                    } , body :body} )
                .then((res) => res.json())
                .then((res) => { console.log("response" +JSON.stringify(res)); })
                .catch((e) => console.log(e))
                .done()
                this.setState({
                     visible: false,
                 });
            }
            else if(this.props.Imagetype == 'Camera'){
                        var uri = this.state.fileVersion;
                       console.log(uri);
                       var Id = this.state.Id;
                       let body = new FormData();
                       body.append('file', {uri: uri,name : "gaurav.mp4",type: 'video/mp4'});
                            body.append('owner_id', Id);
                            body.append('type', 'Video')

                        fetch('http://205.147.102.6/p/sites/lintok/api/posts/sendPost.json',{ method: 'POST',headers:{  
                            "Content-Type": "multipart/form-data",
                            "otherHeader": "foo",
                            } , body :body} )
                        .then((res) => res.json())
                        .then((res) => { alert("response" +JSON.stringify(res)); })
                        .catch((e) => console.log(e))
                        .done()
                       this.setState({
                           visible: false,
                       });
            }
         }
   
     render(){
         return (
              <View style={styles.container}>
                  <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                            <View style={styles.PinHeader}>
                                <View style={{width:'30%', height: 80,padding:10}}>
                                <TouchableOpacity onPress={this.onBackPress.bind(this)}>
                                    <Text style={{color:'#FFFFFF',fontSize:20}}>Back</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width:'52%', height: 50,padding:2}}>
                                    <Text style={{color:'#FFFFFF',fontSize:20}}></Text>
                                <View>
                                     <Text style={{color:'#FFFFFF',fontSize:10}}></Text>
                                </View>
                                </View>
                                <View style={{width:'25%', height: 80,padding:10}}>
                                    <TouchableOpacity onPress={this.onSharePress.bind(this)}>
                                       <Text style={{color:'#FFFFFF',fontSize:20}}>Share</Text>
                                    </TouchableOpacity>
                                </View>
                    </View>
                            <View style = {styles.container2}>
                                 <View style={{width:'100%',height:50,borderWidth:.5,borderColor: '#C4C2C2',flexDirection:'row'}}>
                                       <View style={{width:50,height:50,padding:5}}>
                                             <Image source={require('../../images/user.png')}/>
                                        </View>
                                        <View style={{width:320,height:50,padding:5}}>
                                                     <TextInput
                                                        style = {styles.input}
                                                        placeholder = 'Write a Caption'
                                                        autoCapitalize = 'none'
                                                        underlineColorAndroid='#FFF'
                                                    />
                                        </View>
                                     </View><Text>{'\n'}</Text>

                                   <View style={{width:'100%',height:50,borderWidth:.5,borderColor: '#C4C2C2',flexDirection:'row'}}>
                                       <View style={{width:50,height:50,padding:5}}>
                                             <Image source={require('../../images/user.png')}/>
                                        </View>
                                        <View style={{width:320,height:50,padding:5}}>
                                                     <TextInput
                                                        style = {styles.input}
                                                        placeholder = 'Tag People'
                                                        autoCapitalize = 'none'
                                                        underlineColorAndroid='#FFF'
                                                    />
                                        </View>
                                     </View><Text>{'\n'}</Text>

                                <View style={{width:'100%',height:50,borderWidth:.5,borderColor: '#C4C2C2',flexDirection:'row'}}>
                                       <View style={{width:50,height:50,padding:5}}>
                                             <Image source={require('../../images/user.png')}/>
                                        </View>
                                        <View style={{width:320,height:50,padding:5}}>
                                                     <TextInput
                                                        style = {styles.input}
                                                        placeholder = 'Add Location'
                                                        autoCapitalize = 'none'
                                                        underlineColorAndroid='#FFF'
                                                    />
                                        </View>
                                     </View><Text>{'\n'}</Text>
                            
                            <View style={{width:'100%',height:50,borderWidth:.5,borderColor: '#C4C2C2',flexDirection:'row'}}>
                                        <View style={{width:'100%',height:50,flexDirection:'row'}}>
                                                  <View style={{width:'100%',height:50,borderColor:'grey',padding:5}}>
                                                      <Text>{this.props.address}</Text>
                                                  </View>
                                              
                                        </View>
                             </View><Text>{'\n'}</Text>

                            <View style={{width:'100%',height:50,borderWidth:.5,borderColor: '#C4C2C2',flexDirection:'row'}}>
                                       <View style={{width:50,height:50,padding:5}}>
                                             <Image source={require('../../images/user.png')}/>
                                        </View>
                                        <View style={{width:220,height:50,padding:5}}>
                                                     <TextInput
                                                        style = {styles.input}
                                                        placeholder = 'Facebook'
                                                        autoCapitalize = 'none'
                                                        underlineColorAndroid='#FFF'
                                                    />
                                        </View>
                                        <View style={{width:80,height:50,padding:5}}>
                                               <Switch
                                                disabled={true}
                                                style={{marginBottom: 10}}
                                                value={true} />
                                        </View>
                                     </View>
     
                                </View>

                                <View style={styles.footer}>
                                    <TouchableOpacity onPress ={this.onAdvanceSetting.bind(this)}>
                                      <Text style={{color:'white',fontSize:18}}>Advanced Settings</Text>
                                    </TouchableOpacity>
                                    </View>


                   </View>
         )
     }
}

const styles = StyleSheet.create({
     container:{
        flex:1,
     },
     PinHeader: {
         width:'100%',
            backgroundColor: '#FD680C',
            flexDirection: 'row',
            height:46,
     },
     container2: {
      flex: 1,
      padding: 20
   },
   input: {
      height: 30,
      borderColor: 'grey',
      width:280,
      borderBottomWidth:0
   },

    input2: {
      height: 30,
      borderColor: 'grey',
      width:100,
      borderWidth:1,
   },
   submit: {
      backgroundColor: 'silver',
      padding: 10
   },
   footer: {
        height: 50,
        backgroundColor: '#FD680C',
        padding:10,
        alignItems:'center',
        justifyContent: 'center',
    }
})

module.exports = Share;