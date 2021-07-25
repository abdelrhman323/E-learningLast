import React from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import Dialog from "react-native-dialog";
import { Icon } from 'react-native-elements'
import { StackActions } from '@react-navigation/routers'
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay'
import { url } from '../../Constants/numbers';
import Colors from '../../Constants/colors';


export default class StudentProfileScreen extends React.Component{
 
  state = {
    dialogVisibility: false,
    studentName: this.props.user.name,
    studentCode: this.props.user.code,
    studentEmail: this.props.user.email,
    studentYear: this.props.user.year,
    studentOldPassword: '',
    studentNewPassword: '',
    studentConfirmPassword: '',
    validStudentConfirmPassword: false,
    validStudentOldPassword: false,
    validStudentNewPassword: false,
    loading: false,
  }

  handleStudentOldPasswordUpdate = studentOldPassword => {
    if(studentOldPassword.length<7){
      this.setState({studentOldPassword: studentOldPassword, validStudentOldPassword: false}, this.validateForm)
    }
    else{
      this.setState({studentOldPassword: studentOldPassword, validStudentOldPassword: true}, this.validateForm)
    }
  }

  handleStudentNewPasswordUpdate = studentNewPassword => {
    if(studentNewPassword.length<7){
      this.setState({studentNewPassword: studentNewPassword, validStudentNewPassword: false}, this.validateForm)
    }
    else{
      this.setState({studentNewPassword: studentNewPassword, validStudentNewPassword: true}, this.validateForm)
    }
  }

  handleStudentConfirmPasswordUpdate = studentConfirmPassword => {
    if(studentConfirmPassword !== this.state.studentNewPassword){
      this.setState({studentConfirmPassword: studentConfirmPassword, validStudentConfirmPassword: false}, this.validateForm)
    }
    else{
      this.setState({studentConfirmPassword: studentConfirmPassword, validStudentConfirmPassword: true}, this.validateForm)
    } 
  }

  validateForm = () => {
    if(this.state.validStudentOldPassword &&
      this.state.validStudentNewPassword && 
      this.state.validStudentConfirmPassword
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
          oldPassword: this.state.studentOldPassword,
          password: this.state.studentNewPassword,
          confirmPassword: this.state.studentConfirmPassword,
        })
      })
      const result = await response.json()
      this.setState({
        studentOldPassword: '',
        studentNewPassword: '',
        studentConfirmPassword: '',
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
        <Spinner visible={this.state.loading} />
        <Text style={styles.title}>Full Name</Text>
        <Text style={styles.text}>{this.state.studentName}</Text>
        <Text style={styles.title}>Code</Text>
        <Text style={styles.text}>{this.state.studentCode}</Text>
        <Text style={styles.title}>Year</Text>
        <Text style={styles.text}>{this.state.studentYear}</Text>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.text}>{this.state.studentEmail}</Text>
        <Dialog.Container
          visible={this.state.dialogVisibility}
          onBackdropPress={() => {this.setState({dialogVisibility: false})}}
          headerStyle={{alignItems: 'center', color: '#f00'}}
          contentStyle={{minWidth: '100%'}}
        >
          <Dialog.Title>Change Password</Dialog.Title>
          <Dialog.Description>
            {(!this.state.validStudentOldPassword && this.state.studentOldPassword.length!==0) ||
            (!this.state.validStudentNewPassword && this.state.studentNewPassword.length!==0)
              ? 'Password must be at least 7 characters' 
              : !this.state.validStudentConfirmPassword && this.state.studentNewPassword.length!==0 
              ? `Passwords don't match`
              : ''
            }
          </Dialog.Description>
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.studentOldPassword}
            onChangeText={this.handleStudentOldPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter your old password'  
          />

          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.studentNewPassword}
            onChangeText={this.handleStudentNewPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter your new password'  
          />
          
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.studentConfirmPassword}
            onChangeText={this.handleStudentConfirmPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter the new password again'
          />

          <Dialog.Button 
            label="Cancel" 
            onPress={() => {
              this.setState({dialogVisibility: false, studentOldPassword: '', studentNewPassword: '', studentConfirmPassword: '', 
                validStudentConfirmPassword: false, validStudentOldPassword: false, validStudentNewPassword: false, enableConfirm: false
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
  title: {fontSize: 18, color: '#666', paddingLeft: 8, marginBottom: 8},
  text: {width: '100%', fontSize: 16, paddingLeft: 8, marginBottom: 32},
  buttonsGroup: {flex: 1, alignItems: 'flex-end', marginTop: 50},
  button: {width: 50, height: 50, borderRadius: 30, backgroundColor: Colors.primary_color, marginBottom: 16, justifyContent: 'center'},
  buttonLabel: {color: '#fff', fontSize: 7, textAlign: 'center'},
})
