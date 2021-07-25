import React from 'react'
import { StyleSheet, View, Button, Text, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import Toast from 'react-native-simple-toast'
import Spinner from 'react-native-loading-spinner-overlay'
import { url } from '../../Constants/numbers'



export default class AdminCreateCoursesScreen extends React.Component{

  state = {
    isFormValid: false,
    courseName: '',
    courseCode: '',
    courseYear: '',
    courseScore: '',
    instructorCode: '',
    validInstructorCode: false,
    validCourseScore: false,
    loading: false,
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.courseName !== this.state.courseName || 
      prevState.courseCode !== this.state.courseCode ||
      prevState.courseYear !== this.state.courseYear ||
      prevState.courseScore !== this.state.courseScore ||
      prevState.instructorCode !== this.state.instructorCode
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.courseName.length > 0 && 
      this.state.courseCode.length > 0 && 
      this.state.validCourseScore && 
      this.state.courseYear !== '' && 
      this.state.validInstructorCode
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }

  handleCourseNameUpdate = courseName => {
    this.setState({courseName})
  }
  handleCourseCodeUpdate = courseCode => {
    this.setState({courseCode})
  }
  handleCourseYearUpdate = courseYear => {
    this.setState({courseYear})
  }
  handleCourseScoreUpdate = courseScore => {
    if(+courseScore>100 || Number.isNaN(+courseScore)){
      this.setState({courseScore: courseScore, validCourseScore: false})
    }
    else{
      this.setState({courseScore: courseScore, validCourseScore: true})
    }
  }
  handleInstructorCodeUpdate = instructorCode => {
    if(instructorCode.length<7){
      this.setState({instructorCode: instructorCode, validInstructorCode: false})
    }
    else{
      this.setState({instructorCode: instructorCode, validInstructorCode: true})
    }
  }

  handleCreate = async() => {
    try{
      this.setState({loading: true})
      const response = await fetch(`${url}/admins/addCourse`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        },
        body: JSON.stringify({
          code: this.state.courseCode,
          name: this.state.courseName,
          year: this.state.courseYear,
          score: +this.state.courseScore,
          instructor_code: this.state.instructorCode,
        })
      })
      const result = await response.json()
      if(response.status === 201){
        this.props.getCourses()
        this.enrollCourseToYear()
      }
      else if(response.status === 500){
        if(result.search('code')!==-1){
          Toast.show('This code is taken  by another course')
        }
        else if(result.search('score')!==-1){
          Toast.show('Course score must be less than or equal to 100')
          this.setState({loading: false})
        }
        else{
          Toast.show('Server Error')
          this.setState({loading: false})
        }
      }
      else{//403 and 404
        Toast.show(result)
        this.setState({loading: false})
      }
    } catch(e){
      console.log(e.message)
    }  
  }

  enrollCourseToYear = async() => {
    try{
      this.setState({loading: true})
      const response = await fetch(`${url}/admins/enrollMultiple`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        },
        body: JSON.stringify({
          course_code: this.state.courseCode,
          year: this.state.courseYear,
        })
      })
      const result = await response.json()
      if(response.status === 201){
        Toast.show(`Course added to year ${this.state.courseYear}`)
      }
      else if(response.status === 500){
        Toast.show('Server Error')
      }
      else{
        Toast.show(result)
      }
      this.setState({loading: false})
    } catch(e){
      console.log(e.message)
    }
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.container}>
        <Spinner visible={this.state.loading} />
        <ScrollView >
          <Text style={styles.title}>
            Create New Course
          </Text>
          <TextInput 
              value={this.state.courseName}
              placeholder='Course Name'
              onChangeText={this.handleCourseNameUpdate}
              style={styles.nameTextInput}
          />
          <TextInput 
            value={this.state.courseCode}
            placeholder='Course Code'
            onChangeText={this.handleCourseCodeUpdate}
            style={styles.nameTextInput}
          />
          
          <TextInput 
            value={this.state.courseScore}
            placeholder='Course Score'
            keyboardType='numeric'
            onChangeText={this.handleCourseScoreUpdate}
            style={styles.textInput}
          />

          <Text style={[
            styles.alert,
            (this.state.validCourseScore || this.state.courseScore.length===0) ? 
            {color: '#fff'} : 
            {color: 'red'}
          ]}>
            Score must be number with maximum value 100
          </Text>
          
          <TextInput 
            value={this.state.instructorCode}
            placeholder='Instructor Code'
            onChangeText={this.handleInstructorCodeUpdate}
            style={styles.textInput}
          />

          <Text style={[
            styles.alert,
            (this.state.validInstructorCode || this.state.instructorCode.length===0) ? 
            {color: '#fff'} : 
            {color: 'red'}
          ]}>
            Code must be at least 7 characters
          </Text>

          <DropDownPicker
            items={[
              {label: 'Year 1', value: '1', },
              {label: 'Year 2', value: '2', },
              {label: 'Year 3', value: '3', },
              {label: 'Year 4', value: '4', },
              {label: 'Year 5', value: '5', },
            ]}
            placeholder='Year'
            value={this.state.courseYear}
            onChangeItem={item => this.handleCourseYearUpdate(item.value)}
            containerStyle={styles.dropdownBox}
            placeholderStyle={styles.dropdownBoxPlaceholder}
            
            
          />

          <View style={styles.createButton}>
            <Button 
              title='Create'
              onPress={this.handleCreate}
              disabled={!this.state.isFormValid}
            />
          </View>   
          <View style={styles.empty}></View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  title: {alignSelf: 'center', marginBottom: 20, fontSize: 20, fontWeight: 'bold'},
  nameTextInput: {width: '100%', marginBottom: 32, paddingLeft: 8, fontSize: 16, backgroundColor: '#fff', borderBottomWidth: 1,},
  textInput: {width: '100%', paddingLeft: 8, fontSize: 16, backgroundColor: '#fff', borderBottomWidth: 1,},
  alert: {width: '100%', marginBottom: 20,},
  dropdownBox: {width: '100%', height: 40, marginBottom: 32,},
  dropdownBoxPlaceholder: {color: '#777'},
  createButton: {marginTop: 20, width: '25%', alignSelf: 'center', zIndex: 1},  
  empty: {height: 45, backgroundColor: '#fff'},
})