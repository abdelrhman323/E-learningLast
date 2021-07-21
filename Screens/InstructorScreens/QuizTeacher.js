import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator ,TouchableOpacity} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel, } from 'react-native-simple-radio-button';
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'
import {FAB} from 'react-native-paper'
import { Touchable } from 'react-native';

export default class Quiz extends Component {

    state = {
        questions:[],
    }
    componentDidMount(){
        const { navigation } = this.props;
        const questions = navigation.getParam('questions',[]);
        this.setState({questions})
       // console.log("AAAAAAAAAAA"+questions.question)
    } 
    render() {
        const { navigate } = this.props.navigation;
        const dataMongo = this.state.questions.map((item, index)=>{
			let arr=[]
			arr.push(`${'\n'}${'\n'}Choices:${'\n'}`,)
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
	
        return(
            <View style={{marginLeft:20}}>
            <Text style={{fontSize:25}}>Quiz Preview</Text>
            <View style={{fontSize:15}}>
                {dataMongo}
            </View>
           <View style={{marginRight:20}}> 
            <Button
                    onPress={() => navigate('CreateQuiz')}
                    title='Go Back'
                    color="#007bff"
                />
               </View> 
            </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
 
});