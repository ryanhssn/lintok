import React, {Component} from 'react';
import {AppRegistry,StyleSheet,View,Text,TouchableOpacity,TextInput,Image,ListView,Dimensions,StatusBar,AsyncStorage} from 'react-native';
import Camera from 'react-native-camera';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 200,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
  PinHeader: {
      width:'100%',
    backgroundColor: '#FD680C',
    flexDirection: 'row',
    height:46,
  },
  contentContainer: {
        flex: 1,
        flexDirection: 'column'
  },
    footer: {
        width:'100%',
        height: 50,
        backgroundColor: '#FD680C',
        flexDirection:'row'
  },
});

export default class LiveScreen extends Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
        Imagetype:'',
        file:'',
        latitude:'',
        longitude:'',
        address:''
      },
      isRecording: false,
    };
          AsyncStorage.getItem("@location:key").then((value) => {
              var lastLocation = JSON.parse(value);
                 this.setState({lastPosition:lastLocation});
        })
        .then(res => {
            var myObj = JSON.parse(this.state.lastPosition);
            console.log(myObj);
         for(var i in myObj){
            if(myObj.hasOwnProperty(i)){
                console.log(i + ":"+ myObj[i]);
                if(i == 'coords'){
                   this.state.latitude  = myObj[i].latitude;
                   this.state.longitude = myObj[i].longitude;
                   var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.latitude+','+this.state.longitude+'&sensor=true';
                      console.log(url);
                  fetch(url)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson.results);
                        responseJson.results.map((element,i) => {
                             if(i == 0){
                                console.log(element.formatted_address);
                                this.state.address = element.formatted_address;
                             }
                        });
                    })
                    .catch((error) => {
                    console.error(error);
                    });
                }
            }
        }
    });
  }

  componentDidMount(){

  }

  takePicture = () => {
     this.setState({
        Imagetype:'Image'
     });
    if (this.camera) {
      this.camera.capture()
        .then((data) => {
            this.setState({
              file:data.path
            });
        })
        .catch(err => console.error(err));
    }
  }

  startRecording = () => {
    this.setState({
        Imagetype:'Camera'
     });
    if (this.camera) {
      this.camera.capture({mode: Camera.constants.CaptureMode.video})
          .then((data) => {
            this.setState({
              file:data.path
            });
          })
          .catch(err => console.error(err));
          this.setState({
            isRecording: true
          });
    }
  }

  stopRecording = () => {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false
      });
    }
  }
    onPhotoPress(){
        this.props.navigator.replace({
            id:'Share',
            file:this.state.file,
            Imagetype:this.state.Imagetype,
            latitude:this.state.latitude,
            longitude:this.state.longitude,
            address:this.state.address
       })
    }

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front){
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
         icon = require('../../images/reload1.png');
    } else if (this.state.camera.type === front) {
         icon = require('../../images/reload1.png');
    }

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }
    
    onBackPress(){
        this.props.navigator.pop();
    }

      handleItemTouch(item){
       if(item == "gallery"){
            this.setState({videoSource:''});
            var ImagePicker = require('react-native-image-picker');
            var options = {
            title: 'Select Avatar',
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
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
    }

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
        icon = require('../../images/flash.png');
    } else if (this.state.camera.flashMode === on) {
        icon = require('../../images/flash.png');
    } else if (this.state.camera.flashMode === off) {
        icon = require('../../images/flash.png');
    }

    return icon;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          hidden
        />
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
                <TouchableOpacity onPress ={this.onPhotoPress.bind(this)}>
                <Text style={{color:'#FFFFFF',fontSize:20}}>Share</Text>
                </TouchableOpacity>
            </View>
   </View>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          mirrorImage={false}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}
          >
            <Image
              source={this.typeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash}
          >
            <Image
              source={this.flashIcon}
            />
          </TouchableOpacity>
        </View>
         <View style={styles.contentContainer}> 
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {
            !this.state.isRecording
            &&
            <TouchableOpacity
                style={styles.captureButton}
                onPress={this.takePicture}
            >
               <Image
                  source={require('../../image2/vv.png')}
              />
            </TouchableOpacity>
            ||
            null
          }
          <View style={styles.buttonsSpace} />
          {
              this.state.isRecording
              &&
              <TouchableOpacity
                  style={styles.captureButton}
                  onPress={this.stopRecording}
              >
              <Image
                  source={require('../../image2/call.png')}
              />
              </TouchableOpacity>
          }
        </View>
        </View>
         <View style={styles.footer}>
            <View style={{width:'25%', height: 80,padding:10}}>
                <TouchableOpacity onPress={this.handleItemTouch.bind(this,"gallery")}>
                    <Text style={{color:'#FFFFFF',fontSize:18,padding:10}}>Gallery</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:'25%', height: 80,padding:10}}>
                    <TouchableOpacity>
                        <Text style={{color:'#FFFFFF',fontSize:18,padding:10}}>Photo</Text>
                        </TouchableOpacity>
                </View>
                <View style={{width:'25%', height: 80,padding:10}}>
                    <TouchableOpacity  onPress={this.startRecording}>
                        <Text style={{color:'#FFFFFF',fontSize:18,padding:10}}>Video</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:'25%', height: 80,padding:10}}>
                    <TouchableOpacity> 
                        <Text style={{color:'#FFFFFF',fontSize:18,padding:10}}>Live</Text>
                    </TouchableOpacity>
                </View>
        </View>
      </View>
    );
  }
}

module.exports = LiveScreen;