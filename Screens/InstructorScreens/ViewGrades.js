<<<<<<< HEAD
import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Text, FAB, List } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { addgrade, deletegrade } from '../../reducer/GradesApp'

function ViewGrades({ navigation }) {
    // const [Grades, setGrades] = useState([])
    const Grades = useSelector(state => state)
    const dispatch = useDispatch()

    const addGrade = Grade => {
        console.log(Grade)
        dispatch(addgrade(Grade))
    }

    const deleteGrade = id =>dispatch(deletegrade(id))

    // const addGrades = Grade => {
    //     Grade.id = Grades.length + 1
    //     setGrades([...Grades, Grade])
    // }

    return (
        <>
            <View style={styles.container}>
                {Grades.length === 0 ? (
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>You do not have any Grades</Text>
                    </View>
                ) : (
                        <FlatList
                            data={Grades}
                            renderItem={({ item }) => (
                                <List.Item
                                    title={item.Grade.GradeTitle}
                                    description={item.Grade.GradeDescription}
                                    descriptionNumberOfLines={1}
                                    titleStyle={styles.listTitle}
                                    onPress = {()=> deleteGrade(item.id)}
                                />
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                    )}

                <FAB
                    style={styles.fab}
                    small
                    icon='plus'
                    label='Add a new Grade'
                    onPress={() => navigation.navigate('AddGrades', {
                        addGrade
                    })
                    }
                />
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 20
    },
    fab: {
        backgroundColor: '#219653',
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 10
    },
    listTitle: {
        fontSize: 20,
        backgroundColor:'grey'
    }

})

export default ViewGrades
||||||| (empty tree)
=======
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


export default class InstructorCourseGradesScreen extends Component{
 state={
   grades:[{}],
   attributes: ['Name','Code','Score'],
   adminsBasicData: [[]]
 }
  GetGrades(){
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMjI3OTk1MmVhNTNhMGMyNzdmOTYiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTZAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM2ODQxMjl9.59bZRIMCiSVqXuMXtuqsFHhLfc-mMFiJgcCc043-8fI"
    
fetch(`http://192.168.1.4:3000/quizes/getGrades/cseii3/i2`,{
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
console.log(this.state.grades)
let i=0;
while(i<this.state.grades.length){
this.state.adminsBasicData.push([[this.state.grades[i].title,'               ',this.state.grades[i].student_code,'               ',this.state.grades[i].score]])
i=i+1
}
console.log(this.state.grades.length)
}) .catch(error => {
     console.log(error);
  })
}
 componentDidMount(){
   this.GetGrades()
 }
  render(){
  return (
    <UsersTable1 
    userType={'Instructor'}
    attributes={this.state.attributes} 
    usersShownData={this.state.adminsBasicData} 
    navigation={this.props.navigation} 
/>
  )                
}}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingVertical: 20,
      paddingHorizontal: 10
  },
  titleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
  },
  title: {
      fontSize: 20
  },
  fab: {
      backgroundColor: '#219653',
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 10
  },
  listTitle: {
      fontSize: 20,
      backgroundColor:'grey'
  }

})
>>>>>>> 4e55b32 (LAST-Modified)
