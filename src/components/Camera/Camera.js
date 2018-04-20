import React, {Component} from 'react';
import {AppRegistry,StyleSheet,View,Image,Text,TextInput,TouchableOpacity,AsyncStorage,ToastAndroid,ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { FBApp } from '../FirebaseAuth/FirebaseAuth';

const firebase = require("firebase");

export default class Camera extends Component{
    constructor(props){
        super(props);
	_navigator = this.props.navigator
    this.state = {
          visible: false
        }
    }
     state = {
     videoSource: null,
     username:null,
     phone:null,
     error:null,
  };

   componentDidMount(){
     AsyncStorage.getItem('@MyPhone:key').then((value)=>{
     var num = JSON.parse(value)
     this.setState({phone:num});
   })


   }

  async  onButtonPress(){
          //alert(this.state.phone)
           console.log(this.state.phone);
           console.log(this.state.username);
          this.setState({
              visible: true
           });
					try{
						   let response = await fetch('http://205.147.102.6/p/sites/lintok/api/users/signup.json',{
								    method:'POST',
										headers:{
											 'Accept':'application/json',
											 'Content-Type':'application/json'
										},
										body:JSON.stringify({
											country_code:'91',
											phone_number:this.state.phone,
                      username:'this.state.username',
                      device_type:'Android',
                      device_id:'gjhgjghjghjgjgj'
										})
							 });
							 let res = await response.json();
                             const data = res;
                             console.log(data);
                             await AsyncStorage.setItem('@UserId:key',JSON.stringify(data.response.data.id));
                             if(response.status >= 200 && response.status < 300){
                                for (let prop in data) {
                                    if(data[prop].status == '1'){
                                    firebase.auth().createUserWithEmailAndPassword(this.state.phone+"@gmail.com", "123456")
                                        .then(function(user){
                                          //alert(user.uid);
                                        console.log('uid',user.uid);

                                        //Here if you want you can sign in the user
                                        }).catch(function(error) {
                                           console.log(error);
                                           alert(error);
                                        }).done(this.signInToFirebase());
                                    }
                                }
                             }
                             else{
									   let errors = res;
									   throw errors;
								}
					}catch(errors){
					}
    }

        signInToFirebase(){

            firebase.auth().signInWithEmailAndPassword(this.state.phone+"@gmail.com", "123456")
                .then(function(user){
                  var user = firebase.auth().currentUser;
                  console.log(user);
                  //alert(JSON.stringify(user));
            }).catch(function(error) {
                   console.log('signInWithEmailAndPassword eroor');
            }).done(this.changePage());
       }

    changePage(){

        this.setState({
            visible:false
        });

      this.props.navigation.navigate('chatMain')
    }

    onCameraPress(){
     this.setState({videoSource:''});
     var ImagePicker = require('react-native-image-picker');
     var options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
     };

     ImagePicker.launchCamera(options, (response)  => {
        this.setState({
          videoSource: response.path
        });
      });
    }

 onLibraryPress(){
     this.setState({videoSource:''});
     var ImagePicker = require('react-native-image-picker');
     var options = {
        title: 'Select Avatar',
            storageOptions: {
                skipBackup:true,
                path:'images'
            }
     };

     ImagePicker.launchImageLibrary(options, (response)  => {
        // Same code as in above section!
        console.log(response);
            this.setState({
                videoSource:response.path
            })
      });
    }

	render(){
		return(
           <View style={styles.container}>
                        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
               <View style={styles.first}>
                     <View>
                         <TouchableOpacity onPress={this.onCameraPress.bind(this)}>
                             <Image source={require('../../images/1.png')}/>
                          </TouchableOpacity>
                      </View>
                      <View style={{width:50}}>
                          </View>
                      <View>
                          <TouchableOpacity onPress={this.onLibraryPress.bind(this)}>
                             <Image source={require('../../images/2.png')}/>
                          </TouchableOpacity>
                      </View>
                   </View>
                   <View style={styles.second}>
                        <TextInput
                            placeholder="Enter Username"
                            placeholderTextColor = "#B8AFAF"
                            onChangeText = {(val)=>this.setState({username:val})}
                            style={styles.input}
                         />
                         <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.buttonContainer}>
                             <Text style={styles.buttonText}>Continue</Text>
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
    first:{
       flex:1,
       flexDirection: 'row',
       alignItems:'center',
       justifyContent: 'center',
  },
    second:{
       flex:1,
       paddingHorizontal:15
  },
  input:{
   	  height:40,
   	  backgroundColor:'rgba(255,255,255,0.2)',
   	  marginBottom:20,
   	  color:'#0D0C0C',
   	  paddingHorizontal:10
   },
	  buttonContainer:{
   	 backgroundColor:'#FD680C',
   	 paddingVertical:15,
   },
	 buttonText:{
   	 textAlign:'center',
   	 color:'#FFFFFF',
   	 fontWeight:'700'
   },
});
module.exports = Camera;
//onPress = {()=>{this.onButtonPress()}}
