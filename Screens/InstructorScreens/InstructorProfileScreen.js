import React from 'react'
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import Dialog from "react-native-dialog";
import { Icon } from 'react-native-elements'
import { StackActions } from '@react-navigation/routers';
import Spinner from 'react-native-loading-spinner-overlay'
import { url } from '../../Constants/numbers';
import Toast from 'react-native-simple-toast';
import Colors from '../../Constants/colors';

export default class InstructorProfileScreen extends React.Component{
 
  state = {
    dialogVisibility: false,
    enableConfirm: false,
    instructorName: this.props.user.name,
    instructorCode: this.props.user.code,
    instructorEmail: this.props.user.email,
    instructorOldPassword: '',
    instructorNewPassword: '',
    instructorConfirmPassword: '',
    validInstructorConfirmPassword: false,
    validInstructorOldPassword: false,
    validInstructorNewPassword: false,
    loading: false,
  }

  handleInstructorOldPasswordUpdate = instructorOldPassword => {
    if(instructorOldPassword.length<7){
      this.setState({instructorOldPassword: instructorOldPassword, validInstructorOldPassword: false}, this.validateForm)
    }
    else{
      this.setState({instructorOldPassword: instructorOldPassword, validInstructorOldPassword: true}, this.validateForm)
    }
  }

  handleInstructorNewPasswordUpdate = instructorNewPassword => {
    if(instructorNewPassword.length<7){
      this.setState({instructorNewPassword: instructorNewPassword, validInstructorNewPassword: false}, this.validateForm)
    }
    else{
      this.setState({instructorNewPassword: instructorNewPassword, validInstructorNewPassword: true}, this.validateForm)
    }
  }

  handleInstructorConfirmPasswordUpdate = instructorConfirmPassword => {
    if(instructorConfirmPassword !== this.state.instructorNewPassword){
      this.setState({instructorConfirmPassword: instructorConfirmPassword, validInstructorConfirmPassword: false}, this.validateForm)
    }
    else{
      this.setState({instructorConfirmPassword: instructorConfirmPassword, validInstructorConfirmPassword: true}, this.validateForm)
    } 
  }

  validateForm = () => {
    if(this.state.validInstructorOldPassword &&
      this.state.validInstructorNewPassword && 
      this.state.validInstructorConfirmPassword
    ){
      this.setState({enableConfirm: true})
    } else{
      this.setState({enableConfirm: false})
    }
  }

  handleChangePasswordConfirm = async() => {
    
    this.setState({
      dialogVisibility: false,
      enableConfirm: false,
      loading: true,
    })

    try{
      const response = await fetch(`${url}/users/me`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        },
        body: JSON.stringify({
          oldPassword: this.state.instructorOldPassword,
          password: this.state.instructorNewPassword,
          confirmPassword: this.state.instructorConfirmPassword,
        })
      })
      const result = await response.json()
      this.setState({
        instructorOldPassword: '',
        instructorNewPassword: '',
        instructorConfirmPassword: '',
      })
      if(response.status === 400){
        Toast.show(result)
      }
      else if(response.status === 500){
        Toast.show(result)
      }
      else{
        Toast.show(`Your Password Has Been Changed`)
      }
      this.setState({loading: false})
    } catch(e){
      console.log(e.message)
    }
  }

  
  handleLogout = async() => {
    try{
      this.setState({loading: true})
      const response = await fetch(`${url}/users/logout`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        },
      })

      if(response.status === 500){
        Toast.show(`Can't Logout`)
      }
      else{
        this.props.navigation.dispatch(StackActions.replace('loginScreen'))
      }
      this.setState({loading: false})

    } catch(e){
      console.log(e.message)
    }
  }


  render(){
    return(
      <View style={styles.container}>
        <Spinner v={this.state.loading} />
        {/* <View style={styles.picture}>
          <ProfileAvatar size={'large'}/>
        </View> */}
        <Text style={styles.title}>Full Name</Text>
        <Text style={styles.text}>{this.state.instructorName}</Text>
        <Text style={styles.title}>Code</Text>
        <Text style={styles.text}>{this.state.instructorCode}</Text>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.text}>{this.state.instructorEmail}</Text>
        <Dialog.Container 
          visible={this.state.dialogVisibility}
          onBackdropPress={() => {this.setState({dialogVisibility: false})}}
          headerStyle={{alignItems: 'center', color: '#f00'}}
          contentStyle={{minWidth: '100%'}}
        >
          <Dialog.Title>Change Password</Dialog.Title>
          <Dialog.Description>
            {(!this.state.validInstructorOldPassword && this.state.instructorOldPassword.length!==0) ||
            (!this.state.validInstructorNewPassword && this.state.instructorNewPassword.length!==0)
              ? 'Password must be at least 7 characters' 
              : !this.state.validInstructorConfirmPassword && this.state.instructorNewPassword.length!==0 
              ? `Passwords don't match`
              : ''
            }
          </Dialog.Description>
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.instructorOldPassword}
            onChangeText={this.handleInstructorOldPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter your old password'  
          />
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.instructorNewPassword}
            onChangeText={this.handleInstructorNewPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter your new password'  
          />
          
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.instructorConfirmPassword}
            onChangeText={this.handleInstructorConfirmPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter the new password again'
          />
          <Dialog.Button 
            label="Cancel" 
            onPress={() => {
              this.setState({dialogVisibility: false, instructorOldPassword: '', instructorNewPassword: '', instructorConfirmPassword: '', 
                validInstructorConfirmPassword: false, validInstructorOldPassword: false, validInstructorNewPassword: false, enableConfirm: false
              })
            }}
          />
          <Dialog.Button 
            label="Confirm" 
            onPress={this.handleChangePasswordConfirm}
            disabled={!this.state.enableConfirm} 
          />
          
        </Dialog.Container>
        <View style={styles.buttonsGroup}>
          <TouchableOpacity
            onPress={() => {this.setState({dialogVisibility: true})}}
            style={styles.button}
          >
            <Icon 
              name='key'
              type='font-awesome'
              color={'#fff'}  
            />
            <Text style={styles.buttonLabel}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleLogout}
            style={styles.button}
          >
            <Icon 
              name='sign-out'
              type='font-awesome'
              color={'#fff'}  
            />
            <Text style={styles.buttonLabel}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  picture: {marginBottom: 32},
  row: {flex: 1, flexDirection: 'column', marginBottom: 24, alignItems: 'flex-start', maxHeight: 50},
  title: {flex: 1, fontSize: 18, color: '#666', paddingLeft: 8,},
  text: {flex: 1,width: '100%', fontSize: 16, paddingLeft: 8},
  title: {fontSize: 18, color: '#666', paddingLeft: 8, marginBottom: 8},
  text: {width: '100%', fontSize: 16, paddingLeft: 8, marginBottom: 32},
  buttonsGroup: {flex: 1, alignItems: 'flex-end', marginTop: 120},
  button: {width: 50, height: 50, borderRadius: 30, backgroundColor: Colors.primary_color, marginBottom: 16, justifyContent: 'center'},
  buttonLabel: {color: '#fff', fontSize: 7, textAlign: 'center'},
})
