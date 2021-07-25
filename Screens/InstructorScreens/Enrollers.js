import React from 'react'
import {Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from '../../Navigators/InstructorNavigators/index'
import {Provider as StoreProvider} from 'react-redux'
import store from '../../reducer/store'
import UsersTable1 from '../../Components/UsersTable1';
import { render } from 'react-dom'
import { Component } from 'react'
import { Text, FAB, List } from 'react-native-paper'
import {View,StyleSheet,Button,FlatList,Lis} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'


export default class Enrollers extends Component{
 state={
   grades:[{}],
   attributes: ['Name           ','       Code ','         Year'],
   enrolles:[],
   student_id:''
 }
EnrolledStudents(){
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMjI3OTk1MmVhNTNhMGMyNzdmOTYiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTZAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM2ODQxMjl9.59bZRIMCiSVqXuMXtuqsFHhLfc-mMFiJgcCc043-8fI"
fetch(`http://192.168.1.4:3000/instructors/InstructorCourses/course/studentsList/cseii3`,{
method:"GET",
headers: {
  "Content-Type" :"application/json",  
  "Authorization": `Bearer ${token}`,
},
})
.then((res) => res.json())
.then((data) => {
//console.log(data)  
this.setState({enrolles:data}) 
//console.log(this.state.enrolles)
// let i=0;
// while(i<this.state.grades.length){
// this.state.adminsBasicData.push(this.state.grades[i].title,this.state.grades[i].student_code,this.state.grades[i].score)
// i=i+1
// }

 //console.log(this.state.enrolles)
}) .catch(error => {
   console.log(error);
})
}
 componentDidMount(){
   this.EnrolledStudents() 
  }
  render(){
    const { navigate } = this.props.navigation;
    const {student_id} =this.state
    const Item = ({student_name,student_code,year}) => {
      //console.log("Studenttt"+student_id)
      return(
        <TouchableOpacity onPress={() => {
          navigate('StudentData',{student_id:student_code})
          }} >
        <View style={styles.item}>
        <Text style={{fontSize:22,fontWeight:'bold'}}>{this.state.attributes}</Text>
        <Text style={{fontSize:20}}>{student_name}{"              "}{student_code}{"                 "}{year}</Text>
        </View>
        </TouchableOpacity>
      );
      }
      const renderItem = ({item})=>(
        <Item student_name={item.student_name} student_code={item.student_code} year={item.year}/>
        );
  return (
    <View style={styles.container}>
	<FlatList
	data={this.state.enrolles}
	renderItem={renderItem}
	keyExtractor={item => item.student_name}
  	/>
</View>
     )                
}}
const styles = StyleSheet.create({
  container: {
    marginTop:30,
    padding:2,
  },
  item: {
    backgroundColor: '#989898',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  });
  