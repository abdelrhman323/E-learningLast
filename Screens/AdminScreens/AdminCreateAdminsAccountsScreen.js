import React from 'react'
import { StyleSheet, View, Button, Text, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay'
import { emailReg, url } from '../../Constants/numbers';
import Colors from '../../Constants/colors';
import { Modal } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
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

export default class AdminCreateAdminsAccountsScreen extends React.Component{
  state = {
    isFormValid: false,
    adminName: '',
    adminCode: '',
    adminEmail: '',
    validAdminCode: false,
    validAdminEmail: false,
    visibleModal: false,
    file: {},
    errors: [],
    loading: false,
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.adminName !== this.state.adminName || 
      prevState.adminCode !== this.state.adminCode ||
      prevState.adminEmail !== this.state.adminEmail
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.adminName.length > 0 && 
      this.state.validAdminCode && 
      this.state.validAdminEmail
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }
  
  handleAdminNameUpdate = adminName => {
    this.setState({adminName})
  }

  handleAdminCodeUpdate = adminCode => {
    if(adminCode.length<7){
      this.setState({adminCode: adminCode, validAdminCode: false})
    }
    else{
      this.setState({adminCode: adminCode, validAdminCode: true})
    }
  }

  handleAdminEmailUpdate = adminEmail => {
    if (emailReg.test(adminEmail) === false) {
      this.setState({ adminEmail: adminEmail, validAdminEmail: false })
      return false;
    }
    else {
      this.setState({ adminEmail: adminEmail, validAdminEmail: true })
    }
  }

  handleCreate = async() => {
    this.setState({loading: true})
    try{
      const response = await fetch(`${url}/users`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.adminName,
          code: this.state.adminCode,
          email: this.state.adminEmail,
          password: this.state.adminCode,
          role: 'admin'
        })
      })
      const result = await response.json()
      if(response.status === 201){
        this.props.getAdmins()
        Toast.show('Admin created successfully', Toast.LONG)
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
      this.setState
      ({loading: false})
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
      const response = await fetch(`${url}/usersAuto/admin`,{
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + this.props.userToken,
        },
        body: formData
      })
      const result = await response.json()
      if(response.status === 201){
        this.props.getAdmins()
        Toast.show('Admins created successfully')
      }
      else if(response.status === 403){
        Toast.show(result)
      }
      else if(response.status === 400){
        this.props.getAdmins()
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
                status: 'Not an admin'
              }
            }
            
          })
        })
      }
      else{
        Toast.show('Server Error')
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
            Create Admins Accounts
          </Text>
          <TextInput 
              value={this.state.adminName}
              placeholder='Full Name'
              onChangeText={this.handleAdminNameUpdate}
              style={styles.nameTextInput}
          />
          <TextInput 
            value={this.state.adminCode}
            placeholder='Code'
            onChangeText={this.handleAdminCodeUpdate}
            style={styles.textInput}
          />
          <Text style={[
            styles.alert,
            (this.state.validAdminCode || this.state.adminCode.length===0) ? 
            {color: '#fff'} : 
            {color: 'red'}
          ]}>
            Code must be at least 7 characters
          </Text>
          
          <TextInput 
            value={this.state.adminEmail}
            placeholder='Email'
            onChangeText={this.handleAdminEmailUpdate}
            style={styles.textInput}
          />
          <Text style={[
            styles.alert,
            (this.state.validAdminEmail || this.state.adminEmail.length===0) ? 
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
              // color={Colors.primary_color}
            />
          </View>

          <TouchableOpacity
            onPress={this.handleUpload}
            style={styles.uploadButton}
          >
            <Icon 
              name='file'
              color='#fff'
              type='font-awesome'
              size={20}
            />
            <Text style={styles.buttonLabel}>Upload File</Text>
          </TouchableOpacity>
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
                  keyExtractor={item => item.code}
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
  container: {padding: 16,backgroundColor: '#fff'},
  title: {alignSelf: 'center', marginBottom: 20, fontSize: 20, fontWeight: 'bold'},
  nameTextInput: {width: '100%', marginBottom: 32, paddingLeft: 8, fontSize: 16, backgroundColor: '#fff', borderBottomWidth: 1,},
  textInput: {width: '100%', paddingLeft: 8, fontSize: 16, backgroundColor: '#fff', borderBottomWidth: 1,},
  alert: {width: '100%', marginBottom: 20,},
  createButton: {marginTop: 20, width: '25%', alignSelf: 'center', zIndex: 1},  
  uploadButton: {backgroundColor: Colors.primary_color, marginTop: 120, width: 50, height: 50, borderRadius: 30, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', zIndex: 1},
  modal: {flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22},
  innerModal: {height: '100%', margin: 20, backgroundColor: "#eee", borderRadius: 20, padding: 15, alignItems: "center",shadowColor: "#000",},
  buttonLabel: {color: '#fff', fontSize: 7, textAlign: 'center'},
})