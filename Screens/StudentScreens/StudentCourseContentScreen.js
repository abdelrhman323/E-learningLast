import React from 'react'
import { StyleSheet, View, Button } from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import DropdownMenus from '../../Components/DropdownMenus';
import UsersTable1 from '../../Components/UsersTable1';


 
export default class StudentCourseContentScreen extends React.Component{
  
  state={
    attributes: ['Week', 'Work',],
    studentsShownData: [
      ['Week1', 'Lesson1'],
      ['Week2', 'Lesson2'],
      ['Week3', 'Lesson3'],
      ['Week4', 'Lesson4'],
      ['Week5', 'Lesson5'],
      ['Week6', 'Lesson6'],
      ['Week7', 'Lesson7'],
 ]
};


  render(){

    return(  
      <View>      
        <UsersTable1
          userType={'Student'}
          attributes={this.state.attributes} 
          usersShownData={this.state.studentsShownData} 
          navigation={this.props.navigation} 
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  fixedView: {marginBottom: 20},
  
});
