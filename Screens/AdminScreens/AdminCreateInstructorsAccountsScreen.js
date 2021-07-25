import React from 'react'
import { StyleSheet, View, Button, Text, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import * as DocumentPicker from 'expo-document-picker'
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay'
import { emailReg, url } from '../../Constants/numbers';
import Colors from '../../Constants/colors';
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
    return
  }
  
}

export default class AdminCreateInstructorsAccountsScreen extends React.Component{

  state = {
    isFormValid: false,
    instructorName: '',
    instructorCode: '',
    instructorEmail: '',
    validInstructorCode: false,
    validInstructorEmail: false,
    file: {},
    visibleModal: false,
    errors: [],
    loading: false,
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.instructorName !== this.state.instructorName || 
      prevState.instructorCode !== this.state.instructorCode ||
      prevState.department !== this.state.department ||
      prevState.instructorEmail !== this.state.instructorEmail
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.instructorName.length > 0 && 
      this.state.validInstructorCode && 
      this.state.validInstructorEmail
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }

  handleInstructorNameUpdate = instructorName => {
    this.setState({instructorName})
  }
  handleInstructorCodeUpdate = instructorCode => {
    if(instructorCode.length<7){
      this.setState({instructorCode: instructorCode, validInstructorCode: false})
    }
    else{
      this.setState({instructorCode: instructorCode, validInstructorCode: true})
    }
  }
  
  handleInstructorEmailUpdate = instructorEmail => {
    if (emailReg.test(instructorEmail) === false) {
      this.setState({ instructorEmail: instructorEmail, validInstructorEmail: false })
      return false;
    }
    else {
      this.setState({ instructorEmail: instructorEmail, validInstructorEmail: true })
    }
  }

  handleCreate = async() => {

    try{
      this.setState({loading: true})
      const response = await fetch(`${url}/users`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.instructorName,
          code: this.state.instructorCode,
          email: this.state.instructorEmail,
          password: this.state.instructorCode,
          role: 'instructor'
        })
      })
      const result = await response.json()
      if(response.status === 201){
        this.props.getInstructors()
        Toast.show('Instructor created successfully', Toast.LONG)
      }
      else{//400
        console.log('result', result)
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
      const response = await fetch(`${url}/usersAuto/instructor`,{
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + this.props.userToken,
        },
        body: formData
      })
      const result = await response.json()
      if(response.status === 201){
        this.props.getInstructors()
        Toast.show('Instructors created successfully')
      }
      else if(response.status === 403){
        Toast.show(result)
      }
      else if(response.status === 400){
        this.props.getInstructors()
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
                status: 'Not an instructor'
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
            Create Instructors Accounts
          </Text>
          <TextInput 
              value={this.state.instructorName}
              placeholder='Full Name'
              onChangeText={this.handleInstructorNameUpdate}
              style={styles.nameTextInput}
            />
            <TextInput 
              value={this.state.instructorCode}
              placeholder='Code'
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
            
            <TextInput 
              value={this.state.instructorEmail}
              placeholder='Email'
              onChangeText={this.handleInstructorEmailUpdate}
              style={styles.textInput}
            />
            <Text style={[
              styles.alert,
              (this.state.validInstructorEmail || this.state.instructorEmail.length===0) ? 
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
  container: {padding: 16, backgroundColor: '#fff',},
  title: {alignSelf: 'center', marginBottom: 20, fontSize: 20, fontWeight: 'bold'},
  nameTextInput: {width: '100%', marginBottom: 32, paddingLeft: 8, fontSize: 16, backgroundColor: '#fff', borderBottomWidth: 1,},
  textInput: {width: '100%', paddingLeft: 8, fontSize: 16, backgroundColor: '#fff', borderBottomWidth: 1,},
  alert: {width: '100%', marginBottom: 20,},
  createButton: {marginTop: 20, width: '25%', alignSelf: 'center',},  
  uploadButton: {backgroundColor: Colors.primary_color, marginTop: 120, width: 50, height: 50, borderRadius: 30, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', zIndex: 1},
  modal: {flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22},
  innerModal: {height: '100%', margin: 20, backgroundColor: "#eee", borderRadius: 20, padding: 15, alignItems: "center",shadowColor: "#000",},
  buttonLabel: {color: '#fff', fontSize: 7, textAlign: 'center'},
})