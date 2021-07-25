import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList} from 'react-native';
import { Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import Dialog from "react-native-dialog";
import { Modal } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'
import { url } from '../../Constants/numbers';
import Toast from 'react-native-simple-toast';
import Colors from '../../Constants/colors';
import { compareByStudentName } from '../../Constants/Functions';



export default class AdminViewCourseInfoScreen extends React.Component{
 
  state = {
    isFormValid: true,
    editable: false,
    courseOldCode: this.props.route.params.userCode, 
    courseName: this.props.route.params.userName,
    courseCode: this.props.route.params.userCode,
    courseYear: this.props.route.params.userYear,
    courseID: this.props.route.params.userID,
    instructorCode: '',
    courseScore: this.props.route.params.userScore,
    validCourseScore: true,
    courseStudents: [],
    deleteDialogVisibility: false,
    codeToBeDeleted: -1,
    studentNameToBeDeleted: '',
    studentIdToBeDeleted: -1,
    visibleModal: false,
    loading: false,
  }

  componentDidMount(){
    this.getStudents()
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.courseName !== this.state.courseName || 
      prevState.courseCode !== this.state.courseCode ||
      prevState.courseYear !== this.state.courseYear ||
      prevState.courseScore !== this.state.courseScore 
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.courseName.length > 0 && 
      this.state.courseCode.length > 0 &&
      this.state.validCourseScore
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }


  makeEditable = () => {
    this.setState({editable: true})
  }
  makeIneditable = () => {
    this.setState({editable: false})
  }

  handleCourseNameUpdate = courseName => {
    this.setState({courseName})
  }
  handleCourseCodeUpdate = courseCode => {
    this.setState({courseCode})
  }
  handleInstructorCodeUpdate = instructorCode => {
    this.setState({instructorCode})
  }
  handleCourseScoreUpdate = courseScore => {
    if(+courseScore>100 || Number.isNaN(+courseScore)){
      this.setState({courseScore: courseScore, validCourseScore: false})
    }
    else{
      this.setState({courseScore: courseScore, validCourseScore: true})
    }
  }

  handleSave = async() => {
    try{
      this.setState({loading: true})
      const response = await fetch(`${url}/admins/courses/update`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.route.params.userToken,        
        },
        body: JSON.stringify({
          old_code: this.state.courseOldCode,
          code: this.state.courseCode,
          name: this.state.courseName,
          year: this.state.courseYear,
          score: this.state.courseScore,
        })
      })
      const result = await response.json()
      if(response.status === 200){
        Toast.show('Course updated successfully')
        this.makeIneditable()
        this.props.route.params.refresh()
        this.props.navigation.goBack()
      }
      else if(response.status === 500){
        if(result.search('code')!==-1){
          Toast.show('This code is taken by another course')
        }
        else{
          Toast.show(result)
        }
      }
      else{
        Toast.show(result)
      }
      this.setState({loading: false})
    } catch(e){
      console.log(e.message)
    }
  }

  getStudents = async() => {
    try{
      this.setState({loading: true})
      const response = await fetch(`${url}/admins/courses/course/students/${this.state.courseCode}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.route.params.userToken,        
        },
      })

      const result = await response.json()
      if(response.status === 200){
        this.setState({courseStudents: [...result.sort(compareByStudentName)]})
      }
      else if(response.status === 500){
        Toast.show(result)
      }
      else{
        Toast.show(result)
      }
      this.setState({loading: false})
      
    } catch(e){
      console.log(e.message)
    }
  }

  handleCancel = () => {
    this.setState({deleteDialogVisibility: false})
  };

  handleDelete = async() => {
    this.setState({
      deleteDialogVisibility: false,
      loading: true,
    })
    
    try{
      const response = await fetch(`${url}/admins/students/deleteEnroll`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.route.params.userToken,        
        },
        body: JSON.stringify({
          course_id: this.state.courseID,
          user_id: this.state.studentIdToBeDeleted
        })
      })

      const result = await response.json()
      if(response.status === 200){
        this.setState({courseStudents: [...this.state.courseStudents.filter(student => student.studentCode !== this.state.codeToBeDeleted)]})
        Toast.show(`${this.state.studentNameToBeDeleted} removed from the course ${this.state.courseName}`)
      }
      else if(response.status === 500){
        Toast.show(result)
      }
      else{
        Toast.show(result)
      }
      this.setState({loading: false})
    } catch(e){
      console.log(e.message)
    }
  }


  renderItem = ({item, index}) => (
    <View style={index%2 === 0 ? styles.evenStudentRow : styles.oddStudentRow}>
      <Text style={styles.studentName}>{item.studentName}</Text>
      <Text style={styles.studentCode}>{item.studentCode}</Text>
      <TouchableOpacity 
        onPress={() => {
          this.setState({
            deleteDialogVisibility: true, 
            codeToBeDeleted: item.studentCode,
            studentNameToBeDeleted: item.studentName,
            studentIdToBeDeleted: item.studentID
          })
        }}
      >
        <Icon 
          name='trash-alt'
          type='font-awesome-5' 
        />
    </TouchableOpacity>
    </View>
  )

  render(){

    return(
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior='padding' 
        keyboardVerticalOffset={-100}
      >
        <Spinner visible={this.state.loading} />
        <ScrollView>
          <View>
            <TouchableOpacity
              onPress={() => {this.makeEditable()}}
              style={[styles.editButton, {backgroundColor: this.state.editable ? '#aaa' : Colors.primary_color}]}
              disabled={this.state.editable}
            >
              <Icon 
                name='edit'
                type='font-awesome'
                color={'#fff'}  
              />
              <Text style={styles.buttonLabel}>Edit</Text>
            </TouchableOpacity>
          </View>
            <Text style={styles.title}>Course Name</Text>
            <TextInput 
              value={this.state.courseName}
              onChangeText={this.handleCourseNameUpdate}
              editable={this.state.editable}
              style={this.state.editable ? styles.textWithSpaceEditable : styles.textWithSpace}
            />
            <Text style={styles.title}>Course Code</Text>
            <TextInput 
              value={this.state.courseCode}
              onChangeText={this.handleCourseCodeUpdate}
              editable={this.state.editable}
              style={this.state.editable ? styles.textWithSpaceEditable : styles.textWithSpace}
            />
            <Text style={styles.title}>Year</Text>
            <DropDownPicker
              items={[
                {label: 'Year 1', value: '1',},
                {label: 'Year 2', value: '2', },
                {label: 'Year 3', value: '3', },
                {label: 'Year 4', value: '4', },
                {label: 'Year 5', value: '5', },
              ]}
              defaultValue={this.state.courseYear}
              value={this.state.courseYear}
              onChangeItem={item => {this.setState({courseYear: item.value})}}
              disabled={!this.state.editable}
              containerStyle={styles.dropdownBox}
              labelStyle={styles.dropdownLabel}
            />
          
            <Text style={styles.title}>Score</Text>
            <TextInput 
              value={String(this.state.courseScore)}
              editable={this.state.editable}
              onChangeText={this.handleCourseScoreUpdate}
              style={this.state.editable ? styles.textEditable : styles.text}
            />
            <Text style={[
              styles.alert,
              (this.state.validCourseScore || !this.state.editable) ? 
              {color: '#fff'} : 
              {color: 'red'}
            ]}>
              Score must be number with maximum value 100
            </Text>
          
          <View style={styles.saveButton}>
            <Button 
              title='Save'
              onPress={this.handleSave}
              disabled={!this.state.editable || !this.state.isFormValid}
            />
          </View>
          <TouchableOpacity 
            style={styles.studentsButton}
            onPress={() => {this.setState({visibleModal: true})}}  
          >
            <Icon 
              name='list'
              type='font-awesome'
              color='#fff'
            />
            <Text style={styles.buttonLabel}>View Students</Text>
          </TouchableOpacity>
        <Dialog.Container visible={this.state.deleteDialogVisibility}>
          <Dialog.Title>Delete</Dialog.Title>
          <Dialog.Description>
            {`Are you sure you want to remove ${this.state.studentNameToBeDeleted} from the course ${this.state.courseName}? You cannot undo this action.`}
          </Dialog.Description>
          <Dialog.Button 
            label="Cancel" 
            onPress={this.handleCancel} 
            style={styles.dialogCancelButton}
          />
          <Dialog.Button 
            label="Delete" 
            onPress={this.handleDelete} 
            style={styles.dialogDeleteButton}
          />
        </Dialog.Container>

        <View style={styles.modal}>
          <Modal
            visible={this.state.visibleModal}
            onRequestClose={() => {this.setState({visibleModal: false})}}
            onMagicTap={() => {this.setState({visibleModal: false})}}            
            animationType='slide'
            transparent={false}
          >
            <View style={styles.modal}>
              <View style={styles.innerModal}>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}>Students</Text>
                <FlatList
                  data={this.state.courseStudents}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id}
                  style={styles.studentsList}
                />
                <Button 
                  title='Ok'
                  onPress={() => {this.setState({visibleModal: false})}}
                  color={Colors.primary_color}
                />
              </View>
            </View>
          </Modal>
        </View>

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  info: {height: '65%', marginBottom: 16, justifyContent: 'flex-start'},
  picture: {marginBottom: 32},
  row: {flex: 1, flexDirection: 'column', maxHeight: 74, marginBottom: 16, alignItems: 'flex-start',},
  course: {height: 30, alignItems: 'flex-start'},
  title: {flex: 1, fontSize: 18, color: '#666', paddingLeft: 8, maxHeight: 35, marginBottom: 4,},
  text: {flex: 1,width: '90%', fontSize: 16, backgroundColor: '#fff',height: 35, paddingLeft: 8,},
  textWithSpace: {flex: 1,width: '90%', marginBottom: 16, fontSize: 16, backgroundColor: '#fff',height: 35, paddingLeft: 8,},
  textWithSpaceEditable: {flex: 1, width: '90%', fontSize: 16, backgroundColor: '#fff',
                          height: 35, paddingLeft: 8, borderBottomWidth: 1, marginBottom: 16},
  textEditable: {flex: 1,width: '90%', fontSize: 16, backgroundColor: '#fff',
                  height: 35, paddingLeft: 8, borderBottomWidth: 1,},
  alert: {width: '90%',  marginBottom: 4,},
  dropdownBox: {flex: 1, height: 30, width: '90%', marginBottom: 16},
  saveButton: {width: '30%', alignSelf: 'center', marginBottom: 16},
  editButton: {alignSelf: 'flex-end', backgroundColor: Colors.primary_color, borderRadius: 30, width: 50, height: 50, justifyContent: 'center'},
  studentsList: {paddingLeft: 8, width: 300, marginBottom: 16},
  evenStudentRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 40, backgroundColor: '#eef'},
  oddStudentRow: {flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center', minHeight: 40, backgroundColor: '#fff'},
  studentName: {fontSize: 18, flex: 1, padding: 4, minWidth: '33%',},
  studentCode: {fontSize: 18, flex: 0.5, padding: 4, minWidth: '33%',},
  dialogDeleteButton: {color: 'red'},
  dialogCancelButton: {color: Colors.primary_color},
  studentsButton: {width: 50, height: 50, borderRadius: 30, alignSelf: 'flex-end', backgroundColor: Colors.primary_color, justifyContent: 'center'},
  modal: {flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22,},
  innerModal: {height: '100%', margin: 20, backgroundColor: "#fff", borderRadius: 20, padding: 15, alignItems: "center",shadowColor: "#000",},
  buttonLabel: {color: '#fff', fontSize: 7, textAlign: 'center'},
})