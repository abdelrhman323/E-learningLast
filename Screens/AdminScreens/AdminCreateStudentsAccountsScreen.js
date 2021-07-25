import React from 'react'
import { StyleSheet, View, Button, Text, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import * as DocumentPicker from 'expo-document-picker'
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay'
import { emailReg, url } from '../../Constants/numbers';
import Colors from '../../Constants/colors';
import * as FileSystem from 'expo-file-system'
import { Modal } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'

async function upload() {
  try{
    const file = await DocumentPicker.getDocumentAsync({type: 'text/*'})
    if(file.type === 'success'){
      return file
    }
    else{
      return {}
    }
} catch(e){
  return {}
}
  
}

export default class AdminCreateStudentsAccountsScreen extends React.Component{

  state = {
    isFormValid: false,
    studentName: '',
    studentCode: '',
    studentYear: '',
    studentEmail: '',
    validStudentCode: false,
    validStudentEmail: false,
    file: {},
    visibleModal: false,
    errors: [],
    loading: false,
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.studentName !== this.state.studentName || 
      prevState.studentCode !== this.state.studentCode ||
      prevState.studentYear !== this.state.studentYear ||
      prevState.studentEmail !== this.state.studentEmail
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.studentName.length > 0 && 
      this.state.validStudentEmail &&
      this.state.validStudentCode &&
      this.state.studentYear !== ''
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }

  handleStudentNameUpdate = studentName => {
    this.setState({studentName})
  }
  handleStudentCodeUpdate = studentCode => {
    if(studentCode.length<7){
      this.setState({studentCode: studentCode, validStudentCode: false})
    }
    else{
      this.setState({studentCode: studentCode, validStudentCode: true})
    }
  }
  
  handleStudentYearUpdate =item => {
   this.setState({studentYear: item.value})
  }
  handleStudentEmailUpdate = studentEmail => {
    if (emailReg.test(studentEmail) === false) {
      this.setState({ studentEmail: studentEmail, validStudentEmail: false })
      return false;
    }
    else {
      this.setState({ studentEmail: studentEmail, validStudentEmail: true })
    }
  }

  handleCreate = async() => {
    this.setState({loading: true})
    if(this.state.studentCode.length < 7){
      Toast.show('Please enter code longer than 6 characters', Toast.LONG)
      return
    }
    try{
      const response = await fetch(`${url}/users`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.studentName,
          code: this.state.studentCode,
          email: this.state.studentEmail,
          password: this.state.studentCode,
          year: this.state.studentYear,
          role: 'student'
        })
      })
      const result = await response.json()
      if(response.status === 201){
        this.props.getStudents()
        Toast.show('Student created successfully', Toast.LONG)
      }
      else{//400
        if(result.search('code') !== -1){
          Toast.show('This code is taken by another user', Toast.LONG)
        }
        else if(result.search('email') !== -1 && result.search('validation') === -1){
          Toast.show('This email is taken by another user', Toast.LONG)
        } 
        else if(result.search('email') !== -1 && result.search('validation') !== -1){
          Toast.show('Please enter the email in the correct format', Toast.LONG)
        } 
        else{//500
          Toast.show('Server Error', Toast.LONG)
        }
      }
      this.setState({loading: false})

    } catch(e){
      console.log(e.message)
    }
  }

  sendFile = async() => {
    if(file){
      this.setState({loading: true})
    }
    else{
      this.setState({loading: false})
    }
    const { name, uri } = this.state.file
    var formData = new FormData()
    const file = {
      name: name,
      uri: uri,
      type: 'file/txt',
    }
    formData.append('upload', file)
    try{
      const response = await fetch(`${url}/usersAuto/student`,{
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + this.props.userToken,
        },
        body: formData
      })
      const result = await response.json()
      if(response.status === 201){
        this.props.getStudents()
        Toast.show('Students created successfully')
      }
      else if(response.status === 403){
        Toast.show(result)
      }
      else if(response.status === 400){
        this.props.getStudents()
        this.setState({
          visibleModal: true, 
          errors: result.map(error => {
            if(error.status.search('code') !== -1){
              return{
                lineNumber: error.index_of_line,
                status: 'This code is taken by another user'
              }
            }
            else if(error.status.search('email') !== -1 && error.status.search('validation') === -1){
              return{
                lineNumber: error.index_of_line,
                status: 'This email is taken by another user'
              }
            }
            else if(error.status.search('email') !== -1 && error.status.search('validation') !== -1){
              return{
                lineNumber: error.index_of_line,
                status: 'Please enter the email in the correct format'
              }
            }
            else if(error.status.search('role') !== -1){
              return{
                lineNumber: error.index_of_line,
                status: 'Not a student'
              }
            }
            else{
              return{
                lineNumber: error.index_of_line,
                status: 'Error'
              }
            }
          })
        })
      }
      else{
        return{
          lineNumber: error.index_of_line,
          status: 'Error'
        }
      }
      this.setState({loading: false})

    }catch(e) {
      console.log(e.message)
    }
  }
  handleUpload = async() => {
    this.setState({file: await upload()}, this.sendFile)    
  }

  renderItem = ({item, index}) => (
    <Text style={{fontSize: 18}}>
      {`Line ${item.lineNumber}: ${item.status}`}
    </Text>
  )

  render(){
    return(
      <KeyboardAvoidingView style={styles.container}>
        <Spinner visible={this.state.loading} />
        <ScrollView>
          <Text style={styles.title}>
            Create Students Accounts
          </Text>
          <TextInput 
              value={this.state.studentName}
              placeholder='Full Name'
              onChangeText={this.handleStudentNameUpdate}
              style={styles.nameTextInput}
          />
          <TextInput 
            value={this.state.studentCode}
            placeholder='Code'
            onChangeText={this.handleStudentCodeUpdate}
            style={styles.textInput}
          />

          <Text style={[
            styles.alert,
            (this.state.validStudentCode || this.state.studentCode.length===0) ? 
            {color: '#fff'} : 
            {color: 'red'}
          ]}>
            Code must be at least 7 characters
          </Text>

          <DropDownPicker
            items={[
              {label: 'Year 1', value: '1',},
              {label: 'Year 2', value: '2',},
              {label: 'Year 3', value: '3',},
              {label: 'Year 4', value: '4',},
              {label: 'Year 5', value: '5',},
            ]}
            placeholder='Year'
            value={this.state.studentYear}
            onChangeItem={this.handleStudentYearUpdate}
            containerStyle={styles.dropdownBox}
            placeholderStyle={styles.dropdownBoxPlaceholder}
          />
        
          <TextInput 
            value={this.state.studentEmail}
            placeholder='Email'
            onChangeText={this.handleStudentEmailUpdate}
            style={styles.textInput}
          />
          <Text style={[
              styles.alert,
              (this.state.validStudentEmail || this.state.studentEmail.length===0) ? 
              {color: '#fff'} : 
              {color: 'red'}
            ]}>
              Email not in the correct format
            </Text>
          <View style={styles.createButton}>
            <Button 
              title='Create'
              onPress={this.handleCreate}
              disabled={!this.state.isFormValid}
            />
          </View>

          <View style={styles.uploadButton}>
            <TouchableOpacity
              onPress={this.handleUpload}
            >
              <Icon 
                name='file'
                color='#fff'
                type='font-awesome'
                size={20}
              />
              <Text style={styles.buttonLabel}>Upload File</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Error Report</Text>
                <FlatList
                  data={this.state.errors}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.index_of_line}
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
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {padding: 16, backgroundColor: '#fff'},
  title: {alignSelf: 'center', marginBottom: 20, fontSize: 20, fontWeight: 'bold'},
  nameTextInput: {width: '100%', marginBottom: 32, paddingLeft: 8, fontSize: 16, backgroundColor: '#fff', borderBottomWidth: 1,},
  textInput: {width: '100%', paddingLeft: 8, fontSize: 16, backgroundColor: '#fff', borderBottomWidth: 1,},
  alert: {width: '100%', marginBottom: 20,},
  dropdownBox: {width: '100%', height: 30, marginBottom: 32,},
  dropdownBoxPlaceholder: {color: '#777'},
  createButton: {marginTop: 20, width: '25%', alignSelf: 'center', zIndex: 1},  
  uploadButton: {backgroundColor: Colors.primary_color, marginTop: 60, width: 50, height: 50, borderRadius: 30, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', zIndex: 1},
  modal: {flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22},
  innerModal: {height: '100%', margin: 20, backgroundColor: "#eee", borderRadius: 20, padding: 15, alignItems: "center",shadowColor: "#000",},
  buttonLabel: {color: '#fff', fontSize: 7, textAlign: 'center'},
})