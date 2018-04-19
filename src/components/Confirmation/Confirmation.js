import React, {Component} from 'react';
import {AppRegistry,StyleSheet,View,Text,TextInput,TouchableOpacity,AsyncStorage,ToastAndroid} from 'react-native';

export default class Confirmation extends Component{
	constructor(props){
			super(props);
			_navigator = this.props.navigator
			this.state = {
				myKey:'',
                otp:'',
                otpMatch:'',
			}
		} 

    componentDidMount() {
          AsyncStorage.getItem('@MySuperStore:key').then((value)=>{
                 this.setState({otpMatch: value})
          })
	 }

        onButtonPress(){
            if(this.state.otp == ''){
                ToastAndroid.showWithGravity('Please Enter OTP', ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
            else if(this.state.otpMatch == this.state.otp){
                  this.props.navigator.replace({
						 id:'Camera'
					})
              }
              else{
                    ToastAndroid.showWithGravity('Please Enter Valid OTP', ToastAndroid.SHORT, ToastAndroid.CENTER);
              }
	     }


        render(){
          return(
              <View style={styles.container}>
                 <View style={styles.logoContainer}>
                     <Text style={styles.title}>One Time Password Verification</Text>
                     <Text style={styles.largeText}>
                            Your One Time Password will be sent to 
                    </Text>
                    <Text style={styles.littleText}>
                            your mobile number
                    </Text>
                 </View>
                 <View style={styles.verfication}>
                      <TextInput
                        placeholder="Enter Your OTP"
                        placeholderTextColor = "#B8AFAF"
                        onChangeText={(val)=> this.setState({otp:val})}
                        style={styles.input}
                        />
                <TouchableOpacity onPress ={this.onButtonPress.bind(this)} style={styles.buttonContainer}>
	               <Text style={styles.buttonText}>Continue</Text>
	            </TouchableOpacity>
                </View>
                </View>

          )
      }
}

const styles = StyleSheet.create({
     container:{
         flex:0.5,
         backgroundColor:'#FFFFFF',
     },
 	 logoContainer:{
	 	alignItems:'center',
	 	flexGrow:1,
	 	justifyContent:'center'
	 },
      title:{
	 	color:'#FD680C',
	 	marginTop:10,
	 	width:200,
	 	textAlign:'center',
        fontSize:20
	 },
     largeText:{
          padding:5
     },
     littleText:{
         padding:0 
     },
     verfication:{
        flex:1,
        justifyContent: 'center',
        paddingHorizontal:15
     },
    input:{
   	  height:40,
   	  backgroundColor:'rgba(255,255,255,0.2)',
   	  marginBottom:20,
   	  color:'#0D0C0C',
   	  paddingHorizontal:10,
   },
  buttonContainer:{
   	 backgroundColor:'#FD680C',
   	 paddingVertical:15,
     marginBottom:100,
   },
    buttonText:{
   	 textAlign:'center',
   	 color:'#FFFFFF',
   	 fontWeight:'700'
   },
})

module.exports = Confirmation;