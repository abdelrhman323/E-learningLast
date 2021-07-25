import React, { Component,useState } from 'react'
import {Text, View, TextInput,Button,TouchableOpacity,ScrollView ,Platform,StyleSheet} from 'react-native'
import axios from 'axios';
import {FAB} from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Fab } from 'native-base';
import DatePicker from "react-datepicker";


export default class CreateQuiz extends Component {

		state = {
		Data: [],
		answer:'',
		mark:'',
		choices:[],
		question:'',
		questions:[{
			grades:'',
			question:'',
			answer:'',
			choices:[" "],
		}],
		textInput : [],
		inputData : [],
		//date:new Date(1598051730000),
		mode:'time',
		showS:false,
		showE:false,
		text:'empty',
		timeM:'',
		timeS:'',
		value:new Date(),
		mode:'',
		pressed:false,
		ans:[],
		Ans:'',
		count:0,
		remove:[],
		startDate:new Date(),
		endDate:new Date()

	};
	  

	  //function to add TextInput dynamically
	  addTextInput = (index,q,s) => {
		let textInput = this.state.textInput;
		textInput.push(
		<TextInput style={{
			height: 40,
			borderColor: 'black', 
			borderWidth: 1,
			margin: 20,
			position:'relative',
			borderRadius:7,
			padding:5}}
			placeholder={q}
		  onChangeText={(text1) => this.addValues(text1, index,s)} />);
		this.setState({ textInput });
		
	  }
	  addFAB = () => {
		let textInput = this.state.textInput;
		textInput.push(
			<FAB
			small
			icon='plus'
			onPress={() => this.addTextInputC(this.state.textInput.length+1)
			}
			style={{backgroundColor:'blue',width:50,flexDirection: 'row',
			justifyContent: 'center'}}

		/>,
		<FAB
		small
		label='Choose Answer'
		onPress={() => this.addDropdown()
		}
		style={{backgroundColor:'blue',width:150,}}

	/>
		);
		this.setState({ textInput });
		
	  }
	  IteremovemAll(arr, value) {
		var i = 0;
		while (i < arr.length) {
		  if (arr[i] === value) {
			arr.splice(i, 1);
		  } else {

			++i;
		  }
		}
		return arr;
	  }
getValues = async () => {
   //    console.log(this.state.inputData)
	
	for(let i=1;i<this.state.inputData.length;i++)
	{
		 if(this.state.inputData[i].text!="*")
		 {
		 	if(this.state.inputData[i].type=="Enter Mark")
			{
		 	this.setState({mark:this.state.inputData[i].text})
		 	}
		 	 if(this.state.inputData[i].type=="Enter Question")
			  {
		 	this.setState({question:(this.state.inputData[i].text)})
			  }
		 	 if(this.state.inputData[i].type=="Enter Answer")
			  {
		 	this.setState({answer:this.state.inputData[i].text})
		      }
		 	  if(this.state.inputData[i].type=="Enter Choice")
			   {
		  	  this.AddChoices(this.state.inputData[i].text)
			   }  	  
		 }

		if(this.state.inputData[i].title==="*")
		{	
		   this.AddQuestion()
		  continue;
		}
	}await this.AddQuestion()
 }	  


habda= ()=>{
	this.state.ans=[]
	var inputData=[...this.state.inputData]
	inputData.push({"title":"*"})
	this.setState({inputData})
	this.addFAB()
	this.addFields()

}

	addFields=()=>{
		let ph=["Enter Mark","Enter Question","Enter Choice","Enter Choice"]
		for(let i=0; i<4;i++){
		this.addTextInput(this.state.textInput.length,ph[i],ph[i])
	}
}
	addDropdown=()=>{
		
		var ans =[...this.state.ans]
		for(let i=this.state.count;i<this.state.inputData.length;i++){
		if(this.state.inputData[i].type=="Enter Choice" ){
			ans.push(this.state.inputData[i].text)
		}
		this.setState({count:i+1})
		}
		this.setState({ans})
		console.log("Choicesss"+'\n'+ans,this.state.count)
		let textInput = this.state.textInput;
		textInput.push(
			<DropDownPicker
			items={[{label:((ans[0])?ans[0]:""),value:'0'},
			{label:((ans[1])?ans[1]:""),value:'1'},
			{label:((ans[2])?ans[2]:""),value:'2'},
			{label:((ans[3])?ans[3]:""),value:'3'},
			{label:((ans[4])?ans[4]:""),value:'4'}
		]}
			placeholder="Answer"
			value={this.state.Ans}
			onChangeItem={this.handleAnswerUpdate}
			containerStyle={styles.dropdownBox}
			placeholderStyle={styles.dropdownBoxPlaceholder}
		  /> 
		  );
		this.setState({ textInput });		
	  }
	  handleAnswerUpdate =item => {
		this.setState({Ans: item.label})
		this.addValues(item.label,this.state.textInput.length,"Enter Answer")
	   }

  addValues = (text, index,t) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0){
      dataArray.forEach(element => {
        if (element.index === index ){
          element.text = text;
          checkBool = true;
        }
      });
    }
	//console.log(this.state.pressed)
	let x=[]
    if (checkBool){
		this.setState({
			inputData: dataArray
		  });
  }
      
	//   if(this.state.pressed===true && checkBool===false)
	//   {
	// 	  dataArray.push({'text':"*"})
	// 		this.setState({pressed:false})
	//   }
	else{ 
    dataArray.push({'text':text,'index':index,'type':t});
    this.setState({
      inputData: dataArray
    });
}
console.log(this.state.inputData)
  }

	  handleTimeMUpdate =item => {
		this.setState({timeM: item.value})
	   }
	   handleTimeSUpdate =item => {
		this.setState({timeS: item.value})
	   }
	 addTextInputC = (index) => {
		index=index-1
		var remove=[...this.state.remove]
		remove.push("*")
		this.setState({remove})
		let textInput = this.state.textInput;
		textInput.push(<TextInput style={{
			height: 40,
			borderColor: 'black', 
			borderWidth: 1,
			margin: 20,
			position:'relative',
			borderRadius:7,
			padding:5

		}} placeholder="Enter Choice"
		onChangeText={(text) => {this.addValues(text,index,"Enter Choice")}} />,
		  );	
	  }

   TotlaMark=()=>{
	   let sum=0;
	//   console.log(this.state.questions.length)
	   for(let i=1; i < this.state.questions.length;i++){
		sum=sum+parseInt(this.state.questions[i].grades);
	   }
	   return sum;  
   }

   //function to remove TextInput dynamically
	  removeTextInput = () => {
		let textInput = this.state.textInput;
		let inputData = this.state.inputData;
		console.log(textInput[0])
		for(let i=0;i<7+(this.state.remove.length);i++){
		
		textInput.pop();
		inputData.pop();
		
	}
		this.setState({ textInput,inputData,remove:[] });
	  }


	QuizPost= async()=>  {
		await this.TotlaMark()
		console.log(this.TotlaMark())
		await this.getValues()
		console.log("TIMEEE "+this.state.timeM+this.state.timeS)
		const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMjI3OTk1MmVhNTNhMGMyNzdmOTYiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTZAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM2ODQxMjl9.59bZRIMCiSVqXuMXtuqsFHhLfc-mMFiJgcCc043-8fI"
		const modified=[]
		console.log("NOT MODIFIED"+this.state.questions)
		for(let i=1;i<this.state.questions.length;i++){
			modified[i]=this.state.questions[i]
			console.log(modified[i])
		}
		var filtered = modified.filter(function(x) {
			return x !== undefined;
	   });
	   
		console.log("MODIFIED"+modified)
		let body={
				title:this.state.input1,
				total_marks:this.TotlaMark(),
				startDate:this.state.startDate,
				endDate:this.state.endDate,	
				time:parseInt(this.state.timeM+this.state.timeS),	
				questions:filtered,
				course_code:'cseii3',
				instructor_code:'i6',
		}
		console.log(body)		
		fetch('http://192.168.1.4:3000/create', {
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
		this.setState({cout:0});
	};
  	AddChoices(choicex){
		var choices=[...this.state.choices]
		choices.push(choicex)
		this.setState({choices})

	} 
	AddQuestion(){
		//alert(this.state.mark)
		var questions =[...this.state.questions]
		questions.push({
			grades:this.state.mark,
			question:this.state.question,
			answer:this.state.answer,
			choices:this.state.choices
		})
		this.setState({questions,choices:[],answer:'',mark:'',question:''})
	//	this.setState({Prev:this.state.Prev.push(questions)})
	}
	handleMUpdate =item => {
		this.setState({timeM: item.value})
		console.log("Time"+this.state.timeM)
	   }	
	   handleSUpdate =item => {
		this.setState({timeS: item.value})
	   }	   
	handleDatePicked(){
		this.setState({mode:'date'})
		}
	hideDateTimePicker(){
		this.setState({mode:'time'})

		}
		Preview = async () => {
			await this.getValues()
			const { navigate } = this.props.navigation;
			const {questions}=this.state
			
			console.log(questions)
			 navigate('QuizTeacher',{questions})
		}
	render() {
        const { navigate } = this.props.navigation;
		const x=[]
			for(let i=0;i<60;i++){
				if(i===59){
					continue;
				}
				x[i]=i+1	
			}
			
		const showModeS = (currentMode) => {
			this.setState({showS:true});
			this.setState({mode:currentMode});
		  };
		  const showModeE = (currentMode) => {
			this.setState({showE:true});
			this.setState({mode:currentMode});
		  };  
		  const onChangeS = (event, selectedDate) => {
			const currentDate = selectedDate || date;
			this.setState({showS:(Platform.OS === 'ios')});
			this.setState({startDate:currentDate});
			let tempDate = new Date(currentDate);
			let fTime = 'hr: ' + tempDate.getHours() + ' | min: ' + tempDate.getMinutes()
			this.setState({text:fTime})
			this.setState({time:String(tempDate.getHours()+''+tempDate.getMinutes())})
			console.log('time '+this.state.time)
			console.log('startDate '+this.state.startDate)	
		}
		const onChangeE = (event, selectedDate) => {
			const currentDate = selectedDate || date;
			this.setState({showE:(Platform.OS === 'ios')});
			this.setState({endDate:currentDate});
			// Process the date values
			let tempDate = new Date(currentDate);
			let fTime = 'hr: ' + tempDate.getHours() + ' | min: ' + tempDate.getMinutes()
			this.setState({text:fTime})
			this.setState({time:String(tempDate.getHours()+''+tempDate.getMinutes())})
			console.log('time '+this.state.time)
			console.log('endDate '+this.state.endDate)
		}
		const showDatepickerS = () => {
			showModeS('date');
		  };
		  const showDatepickerE = () => {
			showModeE('date');
		  };
		  const showTimepicker = () => {
			showMode('time');
		  };
 
return (
	<ScrollView>		
	<View style={styles.container}>
	<Text style={{marginTop:20, fontSize:25, fontWeight:'bold' }}>
	Add a Quiz 
	</Text >
	<View>
	<Text style={{right:30,top:10}} >Title</Text>	
	<TextInput
	
	placeholder='Enter the title'
	style={{height: 50, width: 200, fontSize: 15,backgroundColor:'white',paddingLeft:10,right:50,borderRadius:10,right:50,marginBottom:10,marginTop:10,backgroundColor:'#EEEEEE'}}
	onChangeText={(input1) => this.setState({input1})}
	value={this.state.input1}
	/>	
	<Text>Time(min)</Text>
            <DropDownPicker
              items={[
				{label: '1', value: '1', },
				{label: '2', value: '2', },
				{label: '3', value: '3', },
				{label: '4', value: '4', },
				{label: '5', value: '5', },
				{label: '6', value: '6', },
				{label: '7', value: '7', },
				{label: '8', value: '8', },
				{label: '9', value: '9', },
				{label: '10', value: '10', },  
				{label: '11', value: '11', },
				{label: '12', value: '12', },
				{label: '13', value: '13', },
				{label: '14', value: '14', },
				{label: '15', value: '15', },
				{label: '16', value: '16', },
				{label: '17', value: '17', },
				{label: '18', value: '18', },
				{label: '19', value: '19', },
				{label: '20', value: '20', },
				{label: '21', value: '21', },
				{label: '22', value: '22', },
				{label: '23', value: '23', },
				{label: '24', value: '24', },
				{label: '25', value: '25', },
				{label: '26', value: '26', },
				{label: '27', value: '27', },
				{label: '28', value: '28', },
				{label: '29', value: '29', },
				{label: '30', value: '30', },
				{label: '31', value: '31', },
				{label: '32', value: '32', },
				{label: '33', value: '33', },
				{label: '34', value: '34', },
				{label: '35', value: '35', },
				{label: '36', value: '36', },
				{label: '37', value: '37', },
				{label: '38', value: '38', },
				{label: '39', value: '39', },
				{label: '40', value: '40', },
				{label: '41', value: '41', },
				{label: '42', value: '42', },
				{label: '43', value: '43', },
				{label: '44', value: '44', },
				{label: '45', value: '45', },
				{label: '46', value: '46', },
				{label: '47', value: '47', },
				{label: '48', value: '48', },
				{label: '49', value: '49', },
				{label: '50', value: '50', },
				{label: '51', value: '51', },
				{label: '52', value: '52', },
				{label: '53', value: '53', },
				{label: '54', value: '54', },
				{label: '55', value: '55', },
				{label: '56', value: '56', },
				{label: '57', value: '57', },
				{label: '58', value: '58', },
				{label: '59', value: '59', },

			  ]}
			  placeholder="Minuites"
              value={this.state.timeM}
              onChangeItem={this.handleMUpdate}
              containerStyle={styles.dropdownBox}
              placeholderStyle={styles.dropdownBoxPlaceholder}
            /> 
	<Text>Time(sec)</Text>
			<DropDownPicker
              items={[
				{label: '1', value: '1', },
				{label: '2', value: '2', },
				{label: '3', value: '3', },
				{label: '4', value: '4', },
				{label: '5', value: '5', },
				{label: '6', value: '6', },
				{label: '7', value: '7', },
				{label: '8', value: '8', },
				{label: '9', value: '9', },
				{label: '10', value: '10', },  
				{label: '11', value: '11', },
				{label: '12', value: '12', },
				{label: '13', value: '13', },
				{label: '14', value: '14', },
				{label: '15', value: '15', },
				{label: '16', value: '16', },
				{label: '17', value: '17', },
				{label: '18', value: '18', },
				{label: '19', value: '19', },
				{label: '20', value: '20', },
				{label: '21', value: '21', },
				{label: '22', value: '22', },
				{label: '23', value: '23', },
				{label: '24', value: '24', },
				{label: '25', value: '25', },
				{label: '26', value: '26', },
				{label: '27', value: '27', },
				{label: '28', value: '28', },
				{label: '29', value: '29', },
				{label: '30', value: '30', },
				{label: '31', value: '31', },
				{label: '32', value: '32', },
				{label: '33', value: '33', },
				{label: '34', value: '34', },
				{label: '35', value: '35', },
				{label: '36', value: '36', },
				{label: '37', value: '37', },
				{label: '38', value: '38', },
				{label: '39', value: '39', },
				{label: '40', value: '40', },
				{label: '41', value: '41', },
				{label: '42', value: '42', },
				{label: '43', value: '43', },
				{label: '44', value: '44', },
				{label: '45', value: '45', },
				{label: '46', value: '46', },
				{label: '47', value: '47', },
				{label: '48', value: '48', },
				{label: '49', value: '49', },
				{label: '50', value: '50', },
				{label: '51', value: '51', },
				{label: '52', value: '52', },
				{label: '53', value: '53', },
				{label: '54', value: '54', },
				{label: '55', value: '55', },
				{label: '56', value: '56', },
				{label: '57', value: '57', },
				{label: '58', value: '58', },
				{label: '59', value: '59', },

			  ]}
			  placeholder="Seconds"
              value={this.state.timeS}
              onChangeItem={this.handleSUpdate}
              containerStyle={styles.dropdownBox}
              placeholderStyle={styles.dropdownBoxPlaceholder}
            />

    </View>
<View style={{marginTop:135}}>
<View >
      <View style={{marginBottom:5}}>
		  <Text style={{textAlign:'center'}}>StartDate</Text>
        <Button onPress={showDatepickerS} title="Show date picker!" />
      </View>
 
      {this.state.showS && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.startDate}
          mode={this.state.mode}
          
          display="default"
          onChange={onChangeS}
        />
      )}
	  
    </View>
	<View>
      <View style={{marginBottom:5}}>
	  <Text style={{textAlign:'center'}}>EndDate</Text>
        <Button onPress={showDatepickerE} title="Show date picker!" />
      </View>
      {this.state.showE && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.endDate}
          mode={this.state.mode}
          is24Hour={true}
          display="default"
          onChange={onChangeE}
        />
      )}
	  
    </View>

</View>
	 <View >
	 <View style= {styles.row}>
          <View style={{margin: 10,marginTop:135}}>
       		<FAB
                    small
                    icon='plus'
                    label='Add '
                    onPress={() => this.habda()
                    }
					style={{backgroundColor:'blue',marginBottom:10}}

                />
	    </View>
        <View style={{margin: 10,position:'relative',left:20,marginTop:135}}>
		<FAB
                    small
                    icon='minus'
                    label='Remove '
                    onPress={() => this.removeTextInput()} 
					style={{backgroundColor:'blue',marginBottom:10,width:120,left:10}}
                />
				<FAB
                    small
                    label='Submit Quiz '
                    onPress={() => this.QuizPost()} 
					style={{backgroundColor:'blue',top:15,right:70,marginBottom:10}}
                />
		</View>
        </View>
        {this.state.textInput.map((value) => {
          return value
        })}

      </View>
   <View style={{left:10}}>
	   <View style={{marginBottom:20}}>
	<Button
                    onPress={() => navigate('CreateShow')}
                    title='Go Back'
                    color="#007bff"
                />
		</View>
		
		<Button
                    onPress={()=>this.Preview()}
                    title='Preview'
                    color="#007bff"
                />		
	</View>
	</View>
	</ScrollView>
	);
	}
	}
	

	const styles = StyleSheet.create({ 
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'white',
			borderWidth:2,
			width:350,
			alignContent:'center',
			marginLeft:20,
			marginTop:20,
			position:'relative',
			borderRadius:7,
			borderColor:'blue'
		  },
		  buttonView: {
		  flexDirection: 'row'
		  },
		  textInput: {
		  height: 40,
		  borderColor: 'black', 
		  borderWidth: 1,
		  margin: 20,
		  position:'relative'
		},
		row:{
		  flexDirection: 'row',
		  justifyContent: 'center'
		  },
		  dropdownBox: {width: 150, height: 30, marginBottom: 16,},
		  dropdownBoxPlaceholder: {color: '#777'},
		
	})