// 'use strict';
// import React, {Component} from 'react';
// import {AppRegistry,Platform,View,TextInput,ListView,TouchableHighlight,Text,ToastAndroid,StyleSheet} from 'react-native';
// //import FirebaseCrash from 'react-native-firebase-crash-report';
//
// // import {
// //   RTCPeerConnection,
// //   RTCMediaStream,
// //   RTCIceCandidate,
// //   RTCSessionDescription,
// //   RTCView,
// //   MediaStreamTrack,
// //   getUserMedia,
// // } from 'react-native-webrtc';
// // import io from 'socket.io-client';
//
// var VDChat = null;
//
// class VideoChat extends Component{
//
// 	constructor(props){
// 		super(props);
//
// 	  	VDChat = this;
//       this.configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
//       this.socket =null;
//       this.pcPeers={};
//       this.pc = null;
//       this.clsr = this.onMyconnet.bind(this);
//       this.clsrlocstreamcb = this.LocalStreamCB.bind(this);
//       this.clsrlogerro = this.LogMyerror.bind(this);
//       this.clsrexchange= this.Exchange.bind(this);
//       this.clsrleave= this.Leave.bind(this);
// 		  //this.clsronicecandidate = this.OnIceCandidate.bind(this);
// 	    this.clsromjoinded = this.RoomJoined.bind(this);
// 	    this.localStream = null;
// 		  this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
//       this.state = {
//             info: 'Initializing',
//             status: 'init',
//             roomID: '1234',
//             isFront: true,
//             selfViewSrc: null,
//             remoteList: {},
//             textRoomConnected: false,
//             textRoomData: [],
//             textRoomValue: ''
//       }
//
// 		this.initt();
//
// 	}
//
// 	initt (){
// 		this.socket=io.connect('https://react-native-webrtc.herokuapp.com', {transports: ['websocket']});
// 		this.socket.on('connect', this.clsr);
// 		this.socket.on('exchange', this.clsrexchange);
// 		this.socket.on('leave', this.clsrleave);
// 	}
//
// 	 createPC(socketId, isOffer) {
//     ToastAndroid.showWithGravity('Enter Into create pc', ToastAndroid.SHORT, ToastAndroid.CENTER);
//     var self = this;
//     const pc = new RTCPeerConnection(this.configuration);
//     this.pcPeers[socketId] = pc;
//     pc.onicecandidate = function (event) {
//     console.log('onicecandidate', event.candidate);
//     if (event.candidate) {
//       self.socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
//     }
//   };
//   function createOffer() {
//     pc.createOffer(function(desc) {
//       console.log('createOffer', desc);
//       pc.setLocalDescription(desc, function () {
//         console.log('setLocalDescription', pc.localDescription);
//         self.socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
//       }, self.LogMyerror);
//     }, self.LogMyerror);
//   }
//   pc.onnegotiationneeded = function () {
//     console.log('onnegotiationneeded');
//     if (isOffer) {
//       createOffer();
//     }
//   }
//   pc.oniceconnectionstatechange = function(event) {
//     console.log('oniceconnectionstatechange', event.target.iceConnectionState);
//     if (event.target.iceConnectionState === 'completed'){
//       setTimeout(() => {
//         self.getStats();
//       }, 1000);
//     }
//     if (event.target.iceConnectionState === 'connected') {
//          createDataChannel();
//     }
//   };
//   pc.onsignalingstatechange = function(event) {
//     console.log('onsignalingstatechange', event.target.signalingState);
//   };
//   pc.onaddstream = function (event) {
//     console.log('onaddstream', event.stream);
//     self.setState({info: 'One peer join!'});
//     const remoteList = self.state.remoteList;
//     remoteList[socketId] = event.stream.toURL();
//     self.setState({remoteList: remoteList});
//   };
//   pc.onremovestream = function (event) {
//     console.log('onremovestream', event.stream);
//   };
//   pc.addStream(this.localStream);
//   function createDataChannel() {
//     if (pc.textDataChannel) {
//       return;
//     }
//     const dataChannel = pc.createDataChannel("text");
//     dataChannel.onerror = function (error) {
//       console.log("dataChannel.onerror", error);
//     };
//     dataChannel.onmessage = function (event) {
//       console.log("dataChannel.onmessage:", event.data);
//       VDChat.receiveTextData({user: socketId, message: event.data});
//     };
//     dataChannel.onopen = function () {
//       console.log('dataChannel.onopen');
//       VDChat.setState({textRoomConnected: true});
//     };
//     dataChannel.onclose = function () {
//       console.log("dataChannel.onclose");
//     };
//         pc.textDataChannel = dataChannel;
//   }
//   return pc;
// }
//  receiveTextData(data) {
//     const textRoomData = this.state.textRoomData.slice();
//     textRoomData.push(data);
//     this.setState({textRoomData, textRoomValue: ''});
//   }
//
// getStats() {
//    const pc = this.pcPeers[Object.keys(this.pcPeers)[0]];
//    if (pc.getRemoteStreams()[0] && pc.getRemoteStreams()[0].getAudioTracks()[0]){
//     const track = pc.getRemoteStreams()[0].getAudioTracks()[0];
//     console.log('track', track);
//     pc.getStats(track, function(report) {
//       console.log('getStats report', report);
//     }, this.clsrlogerro);
//   }
// }
//
//   RoomJoined (socketIds){
//     var self = this;
//     for (const i in socketIds) {
//           const socketId = socketIds[i];
//           this.createPC(socketId,true);
//       }
//   }
//
// 	RoomJoin (roomid){
//      this.socket.emit('join',roomid,this.clsromjoinded);
//   }
//
//
// 	Exchange(data){
//         var self = this;
//     const fromId = data.from;
//     let pc;
//     if (fromId in this.pcPeers) {
//      pc = this.pcPeers[fromId];
//     } else {
//       pc = this.createPC(fromId, false);
//     }
//     if (data.sdp) {
//       console.log('exchange sdp', data);
//       pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function(){
//         if (pc.remoteDescription.type == "offer")
//           pc.createAnswer(function(desc) {
//             console.log('createAnswer', desc);
//             pc.setLocalDescription(desc, function () {
//                console.log('setLocalDescription', pc.localDescription);
//                self.socket.emit('exchange', {'to': fromId, 'sdp':pc.localDescription});
//             }, self.clsrlogerro);
//           }, self.clsrlogerro);
//       }, self.clsrlogerro);
//   } else {
//          console.log('exchange candidate', data);
//          pc.addIceCandidate(new RTCIceCandidate(data.candidate));
//   }
//   }
//
//  Leave(socketId){
// 	  console.log('leave', socketId);
//     const pc = this.pcPeers[socketId];
//     const viewIndex = pc.viewIndex;
//     pc.close();
//     delete this.pcPeers[socketId];
//     const remoteList = this.state.remoteList;
//     delete remoteList[socketId]
//     this.setState({ remoteList: remoteList });
//     this.setState({info: 'One peer leave!'});
//   }
//
//   LogMyerror(data){
//     console.log(data);
//   }
//
// 	 LocalStreamCB(stream){
// 		 ToastAndroid.showWithGravity('on connect 1', ToastAndroid.SHORT, ToastAndroid.CENTER);
//      this.localStream = stream;
//      this.setState({selfViewSrc: stream.toURL()});
//      this.setState({status: 'ready', info: 'Please enter or create room ID'});
//      ToastAndroid.showWithGravity('on connect 2', ToastAndroid.SHORT, ToastAndroid.CENTER);
//   }
//   onMyconnet(data){
//     this.getLocalStream(true ,this.clsrlocstreamcb);
//   }
//
// 	getLocalStream(isFront, callback) {
//       let videoSourceId;
//       ToastAndroid.showWithGravity('on connect 23', ToastAndroid.SHORT, ToastAndroid.CENTER);
//        // on android, you don't have to specify sourceId manually, just use facingMode
//       // uncomment it if you want to specify
//       if (Platform.OS === 'ios') {
//         MediaStreamTrack.getSources(sourceInfos => {
//           console.log("sourceInfos: ", sourceInfos);
//           for (var i = 0; i < sourceInfos.length; i++){
//             const sourceInfo = sourceInfos[i];
//             if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")){
//                 videoSourceId = sourceInfo.id;
//             }
//           }
//         });
//       }
//       getUserMedia({
//         audio: true,
//         video: {
//           mandatory: {
//                 minWidth: 640, // Provide your own width, height and frame rate here
//                minHeight: 360,
//             minFrameRate: 30,
//           },
//           facingMode: (isFront ? "user" : "environment"),
//             optional: (videoSourceId ? [{sourceId: videoSourceId}] : []),
//         }
//       }, function (stream) {
//           ToastAndroid.showWithGravity('on connect 24', ToastAndroid.SHORT, ToastAndroid.CENTER);
//           console.log('getUserMedia success 000', stream);
//           callback(stream);
//       }, this.clsrlogerro);
// }
//
//      componentDidMount(){
//
//      }
//      _press(){
//          this.setState({status: 'connect', info: 'Connecting'});
//          this.RoomJoin(this.state.roomID);
//      }
//
// 	   _textRoomPress() {
//         if (!this.state.textRoomValue){
//           return
//         }
//         const textRoomData = this.state.textRoomData.slice();
//         textRoomData.push({user: 'Me', message: this.state.textRoomValue});
//         for (const key in this.pcPeers) {
//           const pc = this.pcPeers[key];
//           pc.textDataChannel.send(this.state.textRoomValue);
//         }
//           this.setState({textRoomData, textRoomValue: ''});
//     }
//
// 	_renderTextRoom() {
//     return (
//       <View style={styles.listViewContainer}>
//         <ListView
//             dataSource={this.ds.cloneWithRows(this.state.textRoomData)}
//             renderRow={rowData => <Text>{`${rowData.user}: ${rowData.message}`}</Text>}
//           />
//         <TextInput
//           style={{width: 200, height: 30, borderColor: 'gray', borderWidth: 1}}
//           onChangeText={value => this.setState({textRoomValue: value})}
//           value={this.state.textRoomValue}
//         />
//         <TouchableHighlight
//           onPress={this._textRoomPress}>
//           <Text>Send</Text>
//         </TouchableHighlight>
//       </View>
//     );
//   }
//
// 	mapHash(hash, func) {
//     const array = [];
//     for (const key in hash) {
//       const obj = hash[key];
//       array.push(func(obj, key));
//     }
//        return array;
//   }
//
//
//      render(){
//         return (
//           <View style={styles.container}>
//                <Text style={styles.welcome}>
//                     {this.state.info}
//                </Text>
//                {this.state.textRoomConnected && this._renderTextRoom()}
//                <View style={{flexDirection: 'row'}}>
//                   <Text>
//                         {this.state.isFront ? "Use front camera" : "Use back camera"}
//                   </Text>
//                      <TouchableHighlight
//                         style={{borderWidth: 1, borderColor: 'black'}}>
//                         <Text>Switch camera</Text>
//                      </TouchableHighlight>
//                     </View>
//                     { this.state.status == 'ready' ?
//                     (<View>
//                     <TextInput
//                       ref='roomID'
//                       autoCorrect={false}
//                       style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
//                    // onChangeText={(text) => this.setState({roomID: text})}
//                       value={this.state.roomID}
//                     />
//                   <TouchableHighlight
//                      onPress={this._press.bind(this)}>
//                     <Text>Enter room</Text>
//                   </TouchableHighlight>
//                   </View>) : null
//                     }
//                 <RTCView streamURL={this.state.selfViewSrc} style={styles.container} />
//                 {
//                   this.mapHash(this.state.remoteList, function(remote, index) {
//                     return <RTCView key={index} streamURL={remote} style={styles.remoteView}/>
//                   })
//                 }
//             </View>
//
//         );
// 	  }
//
//
// }
//
// const styles = StyleSheet.create({
//   selfView: {
//     width: 200,
//     height: 150,
//   },
//   remoteView: {
//     width: 200,
//     height: 150,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   listViewContainer: {
//     height: 150,
//   },
// });
//
// module.exports = VideoChat;
//
// //cd android && ./gradlew assembleRelease
