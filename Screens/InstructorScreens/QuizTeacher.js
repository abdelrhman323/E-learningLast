import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView ,TouchableOpacity} from 'react-native';
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
        var filtered = this.state.questions.filter(function (el) {
            return el.question != "";
        });
        const dataMongo = filtered.map((item, index)=>{
            let arr=[]
			if(item.question!=""){
            arr.push(`${'\n'}${'\n'}Choices:${'\n'}`,)
			for(let i=0;i<item.choices.length;i++){
              arr.push(
				 item.choices[i],
				`${'\n'}`)
			}}
			var quiz = [`${'\n'}Question:${'\n'}`,item.question,arr,'\n',"Correct Answer: "
			,(item.answer).toString(),]
		    arr=[]
            if(item.question!=""){
			return (
			<TouchableOpacity >				
			<Text style={{fontSize:20}}  key={index}>{quiz}</Text>
			</TouchableOpacity>
			)}
            else{
                return (
                    <TouchableOpacity >				
                    <Text style={{fontSize:20}} key={index}>No Preview Exist</Text>
                    </TouchableOpacity>
                )}
		  })
	
        return(
            <ScrollView>
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
            </ScrollView>
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