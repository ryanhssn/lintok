import React, {Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,TextInput,BackAndroid,Navigator,Platform,ToastAndroid,AsyncStorage} from 'react-native';
import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';
//import LoginForm from './LoginForm';

const ACCESS_OTP = 'access_otp';

export default class Login extends Component {
	constructor(props){
			super(props);
			_navigator = this.props.navigator
			this.state = {
				country:'',
				  phone:'',
				 myText:'',
			     errors:'',
				 myVar:'',
			    initialPosition: 'unknown',
                lastPosition: 'unknown',
			}
		}

  async storeOtp(val){
      try {
 			 await AsyncStorage.setItem('@MySuperStore:key',JSON.stringify(val));
		} catch (error) {
			// Error saving data
		}
	}

	async storePhone(val){
		  try{
				  	await AsyncStorage.setItem('@MyPhone:key',JSON.stringify(val));
			}catch(error){

			}
	}

    componentDidMount() {
        this.populateDropDown();
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
		    navigator.geolocation.getCurrentPosition(
				(position) => {
					var initialPosition = JSON.stringify(position);
					 AsyncStorage.setItem('@location:key',JSON.stringify(initialPosition));
				},
				(error) => alert(JSON.stringify(error)),
				{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
			);
    }

	populateDropDown(url){
		fetch("http://205.147.102.6/p/sites/lintok/api/users/countries.json", {method: "POST"})
			.then((response) => response.json())
			.then((responseData) => {
				console.log(responseData);
			})
			.done();
	}

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

	  _getOptionList() {
        return this.refs['OPTIONLIST'];
       }


  _canada(province) {
	this.setState({
		...this.state,
		canada: province
		});
	}


	 async onButtonPress(){

			this.setState({myVar:''});
			this.storePhone(this.state.phone);
					try{
						   let response = await fetch('http://205.147.102.6/p/sites/lintok/api/users/numberVerify.json',{
								    method:'POST',
										headers:{
											 'Accept':'application/json',
											 'Content-Type':'application/json'
										},
										body:JSON.stringify({
											  country_code:'91',
												phone_number:this.state.phone

										})
							 });
							 let res = await response.json();
							 const data = res;
							 console.log(data);
               if(response.status >= 200 && response.status < 300){
								for (let prop in data) {
									//this.setState({myText: data[prop].message})
							  if(data[prop].status == '1'){
									this.setState({myVar:data[prop].otp});
									this.storeOtp(this.state.myVar);
												 ToastAndroid.showWithGravity(data[prop].message, ToastAndroid.SHORT, ToastAndroid.CENTER);
													this.props.navigation.navigate('Confirmation')
								}
								else{
									  let errors = res;
									  throw errors;
								}

								}
							 }

					}	catch(errors){
							for(let prop in errors){
							 if(errors[prop].status == '0'){
								ToastAndroid.showWithGravity(errors[prop].message, ToastAndroid.SHORT, ToastAndroid.CENTER);
							 }
							}
					}

		 }
//	}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
           <Text style={styles.title}>Select your country,enter your phone number and click continue</Text>

        </View>
				<View style={styles.container2}>
					<View>
            <Text style={styles.validationMessage}>
               {this.state.myText}
          </Text>
         </View>
		 <View style={{marginTop:20}}>
	        		<Select
            ref="SELECT1"
			style={styles.selectbox}
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Your Country"
            onSelect={this._canada.bind(this)}>
            <Option value = {{id : "alberta"}}>Alberta</Option>
            <Option>British Columbia</Option>
            <Option>Manitoba</Option>
            <Option>New Brunswick</Option>
            <Option>Newfoundland and Labrador</Option>
            <Option>Northwest Territories</Option>
            <Option>Nova Scotia</Option>
            <Option>Nunavut</Option>
            <Option>Ontario</Option>
            <Option>Prince Edward Island</Option>
            <Option>Quebec</Option>
            <Option>Saskatchewan</Option>
            <Option>Yukon</Option>
          </Select>
          <OptionList ref="OPTIONLIST"/>
		  </View>
			  <TextInput
			  placeholder="phone"
			  placeholderTextColor = "#B8AFAF"
				onChangeText = {(val) => this.setState({phone:val})}
			  style={styles.input}
			  />
        <View>
            <TouchableOpacity onPress ={this.onButtonPress.bind(this)}  style={styles.buttonContainer}>
	            <Text style={styles.buttonText}>Continue</Text>
	          </TouchableOpacity>
        </View>
				</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	 container:{
	 	flex:1,
	 	backgroundColor:'#FFFFFF'
	 },
	 container2:{
		   padding:20
	 },
	 logoContainer:{
	 	alignItems:'center',
	 	flexGrow:1,
	 	justifyContent:'center'
	 },
	 logo:{
	 	width:100,
	 	height:100
	 },
	 title:{
	 	color:'#FD680C',
	 	marginTop:10,
	 	width:300,
	 	textAlign:'center',
	 	opacity:0.9
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
   	 paddingVertical:15
   },
	 buttonText:{
   	 textAlign:'center',
   	 color:'#FFFFFF',
   	 fontWeight:'700'
   },
    validationMessage:{
	  color:'#FD680C',
	  textAlign:'center',
	  fontFamily:"HelveticaNeue-CondenseBold",
	},
	selectbox:{
		 borderTopWidth:0,
		 borderLeftWidth:0,
		 borderRightWidth:0,
		 marginLeft:5,
		 width:347,
	     borderColor:'#C4C2C2',
		 borderWidth:.5,
	}
})

module.exports = Login;
