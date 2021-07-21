<<<<<<< HEAD
import React, { Component } from 'react'
import {Text, View, TextInput, TouchableOpacity,ScrollView ,StyleSheet} from 'react-native'
import axios from 'axios';
import { Button } from 'native-base';

export default class InstructorCourseQuizzesScreen extends Component {
	constructor(){
		super();
		this.state = {
		Data: [],
		questions:[],
		choices:[],
	  };

	  }
	
	QuizPost(){
		const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMjI3OTk1MmVhNTNhMGMyNzdmOTYiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTZAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM0MzIwNjh9.4bY6mGqTHNzHgc2i_JKYA-TFJgz05c3g6xEwtQGGEAE'
	    let body={
				title:this.state.input1,
				total_marks:this.state.input2,
				time:this.state.input3,	
				questions:this.state.questions,
				course_code:'cseii3',
				instructor_code:'i6',
		}
		console.log(body)		
		fetch('http://192.168.1.6:3000/create', {
		  method:"post",
		  headers: {
			"Content-Type" :"application/json",  
			"Authorization": `Bearer ${token}`,
		  },
		  body:JSON.stringify(body)
		}).then((res) => {
			console.log(res);
			if (!res.ok) {
			  throw Error(res.status);
			}
			console.log("then data");
		  })
		.catch(function (error) {
		  console.log(error);
		});
		this.setState({input1:''});
		this.setState({input2:''});
		this.setState({input3:''});
		this.setState({input4:''});
		this.setState({input5:''});
		this.setState({input6:''});
	  };
	AddChoices(){
		var choices=[...this.state.choices]
		choices.push(this.state.input6)
		this.setState({choices})
	}  
	AddQuestion(){
		var questions=[...this.state.questions]
		questions.push({
			question:this.state.input4,
			answer:this.state.input5,
			choices:this.state.choices
		})
		this.setState({questions,choices:[]})
	}
  
	render() {

		const dataMongo = this.state.questions.map((item, index)=>{
			let arr=[]
			arr.push(`${'\n'}${'\n'}Options:${'\n'}`,)
			for(let i=0;i<item.choices.length;i++){
              arr.push(
				 item.choices[i],
				`${'\n'}`)
			}
			var quiz = [`${'\n'}Question:${'\n'}`,item.question,arr,'\n',"Correct Answer: "
			,(item.answer).toString(),]
		    arr=[]
			return (
			<TouchableOpacity >				
			<Text  key={index}>{quiz}</Text>
			</TouchableOpacity>
			)
		  })
	
 
return (
	<ScrollView>		
	<View>
	<View style={{flexDirection:'column', alignItems:'center'}}>
	<Text style={{marginTop:20, fontSize:25, fontWeight:'bold' }}>
	Add a Quiz 
	</Text >
	<TextInput
	placeholder='Enter the title'
	style={{height: 50, width: 200, fontSize: 15,backgroundColor:'white',paddingLeft:10,borderRadius:10,marginRight:180,marginBottom:10,marginTop:10}}
	onChangeText={(input1) => this.setState({input1})}
	value={this.state.input1}
	/>
	<TextInput
	placeholder='Enter total marks'
	style={{height: 50, width: 200, fontSize: 15,backgroundColor:'white',paddingLeft:10,borderRadius:10,marginRight:180,marginBottom:10}}
	onChangeText={(input2) => this.setState({input2:parseInt(input2)})}
	value={this.state.input2}
	/>
	<TextInput
	placeholder='Enter the time'
	style={{height: 50, width: 200, fontSize: 15,backgroundColor:'white',paddingLeft:10,borderRadius:10,marginRight:180,marginBottom:10}}
	onChangeText={(input3) => this.setState({input3:parseInt(input3)})}
	value={this.state.input3}
	multiline = {true}
    numberOfLines={5}
	/>
	<TextInput
	placeholder='Enter the question'
	style={{height: 50, width: 300, fontSize: 15,backgroundColor:'white',paddingLeft:10,borderRadius:10,marginRight:70,marginBottom:10,marginTop:10}}
	onChangeText={(input4) => this.setState({input4})}
	value={this.state.input4}
	/>
	<TextInput
	placeholder='Enter the answer'
	style={{height: 50, width: 250, fontSize: 15,backgroundColor:'white',paddingLeft:10,borderRadius:10,marginRight:70,marginBottom:10,marginTop:10}}
	onChangeText={(input5) => this.setState({input5})}
	value={this.state.input5}
	/>
	<TextInput
	placeholder='Enter the chioce'
	style={{height: 50, width: 250, fontSize: 15,backgroundColor:'white',paddingLeft:10,borderRadius:10,marginRight:70,marginBottom:10,marginTop:10}}
	onChangeText={(input6) => this.setState({input6})}
	value={this.state.input6}
	/>
	<TouchableOpacity
	style={{
		backgroundColor:'blue', borderRadius:10,
		flex:1, width:170, height:50, margin:20,
		flexDirection:'row', justifyContent:'center',
		alignItems:'center'
		}}
	onPress={this.AddChoices.bind(this)}
	>
	<Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
	Add Choice
	</Text>
	</TouchableOpacity>


	<TouchableOpacity
	style={{
		backgroundColor:'blue', borderRadius:10,
		flex:1, width:200, height:50, margin:20,
		flexDirection:'row', justifyContent:'center',
		alignItems:'center'
		}}
	onPress={this.AddQuestion.bind(this)}
	>
	<Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
	Add Question
	</Text>
	</TouchableOpacity>

	<TouchableOpacity
	style={{
		backgroundColor:'blue', borderRadius:10,
		flex:1, width:100, height:50, margin:20,
		flexDirection:'row', justifyContent:'center',
		alignItems:'center'
		}}
	onPress={this.QuizPost.bind(this)}
	>
	<Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
	Submit
	</Text>
	</TouchableOpacity>
	</View>
	<View style={{marginLeft:20}}>
	<Text style={{fontSize:25}}>Quiz Preview</Text>
	<View style={{fontSize:15}}>
		{dataMongo}
	</View>
	</View>
	</View>
	</ScrollView>
	);
	}
	}
	
	const styles = StyleSheet.create({ 
		cont: {
		//	borderStyle:'solid'
		}
	})
||||||| (empty tree)
=======
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QuizTeacher from '../../Navigators/InstructorNavigators/QuizTeacher';
import Navigation from '../../Navigators/InstructorNavigators/QuizTeacher'

export default function App() {
  return (
    <QuizTeacher/>
    
 
    );
}
>>>>>>> 4e55b32 (LAST-Modified)
