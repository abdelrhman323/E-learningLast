import React, { useState } from 'react'
import { Component } from 'react'
import { StyleSheet, View, FlatList,Button } from 'react-native'
import { Text, FAB, List } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { addgrade, deletegrade } from '../../reducer/GradesApp'

export default class  StudentData extends Component {
state={
    student_id:'',
    attributes: ['Quizzes           ','       Score ',],
}
    
    componentDidMount(){
        const { navigation } = this.props;
        const student_id = navigation.getParam('student_id',"");
        this.setState({student_id})
        console.log("AAAAAAAAAAA"+student_id)
        this.GetGrades(student_id)
    } 
    GetGrades(s){
        const { navigate } = this.props.navigation
        const {student_id}=this.state
        console.log("Abdo: "+s)
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMjI3OTk1MmVhNTNhMGMyNzdmOTYiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTZAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM2ODQxMjl9.59bZRIMCiSVqXuMXtuqsFHhLfc-mMFiJgcCc043-8fI"
        fetch(`http://192.168.1.4:3000/quizes/getGrades/cseii3/${s}`,{
          method:"GET",
          headers: {
            "Content-Type" :"application/json",  
            "Authorization": `Bearer ${token}`,
          },
        })
        .then((res) => res.json())
        .then((data) => {
        //console.log(data)  
        this.setState({grades:data}) 
        //console.log(this.state.grades)
        // let i=0;
        // while(i<this.state.grades.length){
        // this.state.enrolles.push(this.state.grades[i].title,this.state.grades[i].student_code,this.state.grades[i].score)
        // i=i+1
        // }
        
        console.log(this.state.grades)
        }) .catch(error => {
             console.log(error);
          })
        }
        
    render(){
        const { navigate } = this.props.navigation;
        const {student_id} = this.state
        const Item = ({title,score}) => {
            //console.log("Studenttt"+student_id)
            return(
              <View style={styles.item}>
              <Text style={{fontSize:22,fontWeight:'bold'}}>{this.state.attributes}</Text>
              <Text style={{fontSize:20}}>{"    "}{title}{"                       "}{score}</Text>
              </View>
              
            );
            }
            const renderItem = ({item})=>(
              <Item title={item.title} score={item.score} />
              );
        return (
          <View style={styles.container}>
          <FlatList
          data={this.state.grades}
          renderItem={renderItem}
          keyExtractor={item => item.student_name}
            />
            	<Button
                    onPress={() => navigate('Enrollers')}
                    title='Go Back'
                    color="#007bff"
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
    