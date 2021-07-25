import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import { Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { url } from '../../Constants/numbers';
import Colors from '../../Constants/colors';

export default class AdminViewAdminInfoScreen extends React.Component{
 
  state = {
    isFormValid: true,
    editable: false,
    adminOldCode: this.props.route.params.userCode,
    adminName: this.props.route.params.userName,
    adminCode: this.props.route.params.userCode,
    adminEmail: this.props.route.params.userEmail
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
      this.state.adminCode.length > 0 && 
      this.state.adminEmail.length > 0
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

  handleAdminNameUpdate = adminName => {
    this.setState({adminName})
  }
  handleAdminCodeUpdate = adminCode => {
    this.setState({adminCode})
  }
  handleAdminEmailUpdate = adminEmail => {
    this.setState({adminEmail})
  }

  handleSave = async() => {
    try{
      const response = await fetch(`${url}/admins/users/update`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.route.params.userToken,        
        },
        body: JSON.stringify({
          old_code: this.state.adminOldCode,
          code: this.state.adminCode,
          name: this.state.adminName,
          email: this.state.adminEmail,
          role: 'admin',
        })
      })

      if(response.status === 200){
        Toast.show('Admin Updated Successfully')
        this.makeIneditable()
        this.props.route.params.refresh()
        this.props.navigation.goBack()
      }
      else if(response.status === 404){
        Toast.show('Admin Not Found')
      }
      else if(response.status === 403){
        Toast.show('Unauthorized Action')
      }
      else if(response.status === 400){
        Toast.show('Invalid Updates')
      }
      else if(response.status === 500){
        Toast.show('Server Error')
      }

    } catch(e){
      console.log(e.message)
    }

    
  }

  render(){
    return(
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior='padding' 
        keyboardVerticalOffset={-100}
      >
        <ScrollView>
          {/* <View style={styles.picture}>
            <ProfileAvatar size={'large'}/>
          </View> */}
          {/* <View>
            <TouchableOpacity
              onPress={() => {this.makeEditable()}}
              style={[styles.editIcon, {backgroundColor: this.state.editable ? '#aaa' : Colors.primary_color}]}
              disabled={this.state.editable}
            >
              <Icon 
                name='edit'
                color={'#fff'}  
              />
            </TouchableOpacity>
          </View> */}
          <View style={styles.row}>
            <Text style={styles.title}>Full Name</Text>
            <TextInput 
              value={this.state.adminName}
              onChangeText={this.handleAdminNameUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Code</Text>
            <TextInput 
              value={this.state.adminCode}
              onChangeText={this.handleAdminCodeUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View>
          
          <View style={styles.row}>
            <Text style={styles.title}>Email</Text>
            <TextInput 
              value={this.state.adminEmail}
              editable={this.state.editable}
              onChangeText={this.handleAdminEmailUpdate}
              style={styles.text}
            />
          </View>
          {/* <View style={styles.saveButton}>
            <Button 
              title='Save'
              onPress={this.handleSave}
              disabled={!this.state.editable || !this.state.isFormValid}
            />
          </View> */}
          </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16,},
  picture: {marginBottom: 32},
  row: {flex: 1, flexDirection: 'column', marginBottom: 16, alignItems: 'flex-start',},
  title: {flex: 1, fontSize: 18, color: '#666', paddingLeft: 8, marginBottom: 4},
  text: {flex: 1,width: '90%', marginBottom: 16,  fontSize: 16, backgroundColor: '#fff',height: 35, borderRadius: 20, paddingLeft: 8},
  dropdownBox: {flex: 0.65, height: 30,},
  saveButton: {marginTop: 30, width: '30%', alignSelf: 'center', backgroundColor: '#0f0'},
  editIcon: {alignSelf: 'flex-end', marginTop: 8, borderRadius: 40, width: 30, height: 30, justifyContent: 'center'}
})