import React, {Component} from 'react';
import {StyleSheet,View,Text,AsyncStorage,TouchableOpacity,TextInput,Image,ListView} from 'react-native';
import MyPresentationalComponent from '../config/ListDetail';
import {FBApp}  from '../FirebaseAuth/FirebaseAuth';
import BackgroundTask from 'react-native-background-task';
  const firstUser = '';
 const secondUser = '';
       const ref1 = '';
       const ref2 = '';
       const uid  = '';
var chat_username = "";
var chat_user_number="";
var rootRef = '';
var ref3 = FBApp.database ().ref('Contact');
var mm = '';
var tt = '';
var kk = '';
var ro = '';

export default class UserDetail extends Component {  
    	constructor(props){
			super(props);
            if(this.props.pageTitle == 'RecentChat'){
                 console.log(this.props.recentData);
                 AsyncStorage.getItem('@MyPhone:key').then((value)=>{
                 num = JSON.parse(value)
                    firstUser = num;
                    secondUser = this.props.phone;
                    ref1 = FBApp.database ().ref('Recent/'+firstUser+"/"+secondUser);
                    ref2 = FBApp.database ().ref('Recent/'+secondUser+"/"+firstUser);
                    ref3 = FBApp.database ().ref('Contact');
                    uid = this.props.groupId
                    rootRef = FBApp.database ().ref('message/'+uid);
                 this.listenForItems(rootRef);
                });
            }
            else{
                 var data = this.props.data;
                 chat_user_number=data.phoneNumbers[0].number;
                 chat_user_number=chat_user_number.replace(/[^\d]/g, ''); 
                 secondUser=chat_user_number;
                
                 AsyncStorage.getItem('@MyPhone:key').then((value)=>{
                         var num  = JSON.parse(value)
                        firstUser = num;
                             ref1 = FBApp.database ().ref('Recent/'+firstUser+"/"+secondUser);
                             ref2 = FBApp.database ().ref('Recent/'+secondUser+"/"+firstUser);
                              uid = firstUser+ '_' +secondUser;
                    chat_username = data.givenName;
                          rootRef = FBApp.database ().ref('message/'+uid);
                          this.listenForItems(rootRef);
                });
            }
                this.state = {
                   dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
                      message: "",
                   VideoChat : "Normal"
		     	}

                  var that = this;
                ref3.on('value', function(snapshot) {
                  let jj = '';
                  let gg = '';
                snapshot.forEach(function(childSnapshot) {
                    if(JSON.stringify(childSnapshot).indexOf('sender_phone') != -1){
                        mm = JSON.stringify(JSON.stringify(childSnapshot).substring(1,JSON.stringify(childSnapshot).indexOf('@')));
                        var uu = JSON.parse(mm);
                        that.handlePress(uu);
                    }

                    if(JSON.stringify(childSnapshot).indexOf('reciever_phone') != -1){
                        tt = JSON.stringify(JSON.stringify(childSnapshot).substring(1,JSON.stringify(childSnapshot).indexOf('@')));
                        var aa = JSON.parse(tt);
                        that.handlePress2(aa);
                    }  
                });
                });
        }

        handlePress(uu){
               var mk = '';
               ref3.on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot){
                     if(JSON.stringify(childSnapshot).indexOf('Video') != -1){
                           ro = JSON.stringify(childSnapshot);
                           mk = JSON.parse(ro);
                     }
                })
               })
             if(uu == firstUser && mk == 'Video'){
                this.props.navigator.push({
                    id:'Call',
                    groupId:uid,
                    phone:secondUser
                })
             }
        }

        handlePress2(aa){
               var mk = '';
               ref3.on('value', function(snapshot){
                snapshot.forEach(function(childSnapshot) {
                     if(JSON.stringify(childSnapshot).indexOf('Video') != -1){
                           ro = JSON.stringify(childSnapshot);
                           mk = JSON.parse(ro);
                     }
                })
               })
            if(aa == firstUser  && mk == 'Video'){
               this.props.navigator.push({
                  id:'Call2',
                  groupId:uid,
                  phone:secondUser
               })
            }
        }


    onSendMessage(){
        if (this.state.message === ""){
            return;
        }

        ref1.set({
            createdAt:"632632664",
            groupid:uid,
            senderId:firstUser,
            senderName:firstUser,
            status:1,
            textmessgae:this.state.message,
            type:"private",
            updatedAt:"sadad",
        });

        ref2.set({
            createdAt:"632632664",
            groupid:uid,
            senderId:firstUser,
            senderName:firstUser,
            status:1,
            textmessgae:this.state.message,
            type:"private",
            updatedAt:"sadad",
        });

        rootRef.push({ 
              createdAt:"632632664",
                groupid:uid,
               senderId:firstUser,
             senderName:firstUser,
                 status:1,
            textmessgae:this.state.message,
                   type:"private",
              updatedAt:"sadad",
        });

           this.setState({message: ""});
   }

     listenForItems(rootRef) {
        rootRef.on('value', (dataSnapshot) => {
            var tasks = [];
            dataSnapshot.forEach((child) => {
                console.log(JSON.stringify(child));
                tasks.push(child);
            });
            this.setState({
               dataSource: this.state.dataSource.cloneWithRows(tasks)
            });
        });
    }



    onAttachPress(){
       this.props.navigator.push({
		 id:'Attach'
	   })
    } 

    onBackButtonPress(){
         this.props.navigator.pop();
    }

    onCallPress(){
       this.props.navigator.push({
             id:'Call'
        })
    }

    onVideoPress(){
          ref3.set({
            createdAt:"632632664",
            groupid:uid,
            type:'Video',
            sender_phone:firstUser+'@sender_phone',
            reciever_phone:secondUser+'@reciever_phone',
            sender_status: '',
            reciever_status: ''
          }); 
    }

   renderRow(rowData){
       console.log(rowData);
         // alert(JSON.stringify(rowData));
        //  alert(rowData.val().textmessgae);
        var user =false ;
        if(rowData.val().senderId==firstUser){
            user=true;
        }else{
            user=false;
        }

       return(
        <View style={{width:'100%'}}>
            {user ? (
                <View style={{alignItems:'flex-end',padding:10}}>
                   <Text style={{width:200,backgroundColor:'green',borderRadius:45,padding:10,color:'white'}}>{rowData.val().textmessgae}</Text>
                </View>
            ) : (
                <View style={{alignItems:'flex-start',padding:10}}>
                    <Text style={{width:200,backgroundColor:'grey',borderRadius:45,padding:10,color:'white'}}>{rowData.val().textmessgae} </Text>
                </View>
           )}
        </View>
       )
   }


     render(){
         return (
              <View style={styles.container}>
                   <View style={styles.PinHeader}>
                      <View style={{width: 35, height: 50,padding:10}}>
                          <TouchableOpacity onPress={this.onBackButtonPress.bind(this)}>
                            <Image source={require('../../images/prev.png')}/>
                          </TouchableOpacity>
                        </View>
                        <View style={{width: 40, height: 50,padding:3}}>
                            <Image source={require('../../images/user.png')}/>
                        </View>
                        <View style={{width: 80, height: 50}}>
                        </View>
                         <View style={{width: 200, height: 50,flexDirection:'row'}}>
                                <View style={{width: 50, height: 50,padding:10}}>
                                    <TouchableOpacity onPress={this.onCallPress.bind(this)}>
                                       <Image source={require('../../images/call.png')}/>
                                    </TouchableOpacity>  
                                </View>
                                <View style={{width: 50, height: 50,padding:10}}>
                                    <TouchableOpacity onPress={this.onVideoPress.bind(this)}>
                                        <Image source={require('../../images/video2.png')}/>   
                                    </TouchableOpacity>
                                </View>
                                <View style={{width: 60, height: 50,padding:10}}>
                                    <TouchableOpacity onPress ={this.onAttachPress.bind(this)}>
                                        <Image source={require('../../images/attach.png')}/> 
                                    </TouchableOpacity>
                                </View>
                                <View style={{width: 50, height: 50,padding:10}}>
                                    <Image source={require('../../images/menu.png')}/> 
                                </View>
                        </View>
                  </View>

                  <ListView
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderRow={this.renderRow.bind(this)}
                    />

                  <View style={{width:'100%', height: 50,position:'absolute',bottom:0,flexDirection:'row'}}>
                        <View style={{width:'10%',height:50,padding:10}}>
                            <Image source={require('../../images/mic.png')}/> 
                        </View>
                        <View style={{width:'54%',height:50}}>
                            <TextInput
                                placeholder="What's on your mind?"
                                placeholderTextColor = "#B8AFAF"
                                onChangeText = {(val) => this.setState({message:val})}
                                style={styles.input}
                            />
                        </View>
                           <View style={{width:'10%',height:50,backgroundColor:'#FFFFFF',padding:8}}>
                              <Image source={require('../../images/smile.png')}/> 
                           </View>
                           <View style={{width:'10%',height:50,backgroundColor:'#FFFFFF',padding:8}}>
                              <Image source={require('../../images/camera.png')}/> 
                           </View>
                           <View style={{width:'30%',height:50,backgroundColor:'#FFFFFF'}}>
                                  <TouchableOpacity onPress={this.onSendMessage.bind(this)}>
                                    <Image source={require('../../images/send.png')}/> 
                                  </TouchableOpacity>
                           </View>
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
    backgroundColor: '#FD680C',
    flexDirection: 'row',
    height:46,
  },
  input:{
   	  height:40,
   	  marginBottom:20,
   	  color:'#0D0C0C',
   	  paddingHorizontal:10
   },
   row:{
        flexDirection:'row',
        padding:10,
        backgroundColor:'#FFFFFF',
        marginBottom:5,
        width:'100%'
  },
   separator:{
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
})

module.exports = UserDetail;
