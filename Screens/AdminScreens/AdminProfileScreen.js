import React from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import Colors from '../../Constants/colors';
import Dialog from "react-native-dialog";
import { Icon } from 'react-native-elements'
import { StackActions } from '@react-navigation/routers'
import Spinner from 'react-native-loading-spinner-overlay'
import { url } from '../../Constants/numbers';
import { invokeBackBehaviour } from '../../Constants/Functions';
import Toast from 'react-native-simple-toast';
import { BackHandler } from 'react-native';


export default class AdminProfileScreen extends React.Component{
 
  state = {
    dialogVisibility: false,
    adminName: this.props.user.name,
    adminCode: this.props.user.code,
    adminEmail: this.props.user.email,
    adminOldPassword: '',
    adminNewPassword: '',
    adminConfirmPassword: '',
    validAdminConfirmPassword: false,
    validAdminOldPassword: false,
    validAdminNewPassword: false,
    loading: false,
  }

  handleAdminOldPasswordUpdate = adminOldPassword => {
    if(adminOldPassword.length<7){
      this.setState({adminOldPassword: adminOldPassword, validAdminOldPassword: false}, this.validateForm)
    }
    else{
      this.setState({adminOldPassword: adminOldPassword, validAdminOldPassword: true}, this.validateForm)
    }
  }

  handleAdminNewPasswordUpdate = adminNewPassword => {
    if(adminNewPassword.length<7){
      this.setState({adminNewPassword: adminNewPassword, validAdminNewPassword: false}, this.validateForm)
    }
    else{
      this.setState({adminNewPassword: adminNewPassword, validAdminNewPassword: true}, this.validateForm)
    }
  }

  handleAdminConfirmPasswordUpdate = adminConfirmPassword => {
    if(adminConfirmPassword !== this.state.adminNewPassword){
      this.setState({adminConfirmPassword: adminConfirmPassword, validAdminConfirmPassword: false}, this.validateForm)
    }
    else{
      this.setState({adminConfirmPassword: adminConfirmPassword, validAdminConfirmPassword: true}, this.validateForm)
    } 
  }

  validateForm = () => {
    if(this.state.validAdminOldPassword &&
      this.state.validAdminNewPassword && 
      this.state.validAdminConfirmPassword
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
          oldPassword: this.state.adminOldPassword,
          password: this.state.adminNewPassword,
          confirmPassword: this.state.adminConfirmPassword,
        })
      })
      const result = await response.json()
      this.setState({
        adminOldPassword: '',
        adminNewPassword: '',
        adminConfirmPassword: '',
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
        {/* <View style={styles.picture}>
          <ProfileAvatar size={'large'}/>
        </View> */}
        <Text style={styles.title}>Full Name</Text>
        <Text style={styles.text}>{this.state.adminName}</Text>
        <Text style={styles.title}>Code</Text>
        <Text style={styles.text}>{this.state.adminCode}</Text>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.text}>{this.state.adminEmail}</Text>
        <Dialog.Container 
          visible={this.state.dialogVisibility}
          onBackdropPress={() => {this.setState({dialogVisibility: false})}}
          headerStyle={{alignItems: 'center', color: '#f00'}}
          contentStyle={{minWidth: '100%'}}
          children={<Text>aaaaaa</Text>}
        >
          <Dialog.Title>Change Password</Dialog.Title>
          <Dialog.Description>
            {(!this.state.validAdminOldPassword && this.state.adminOldPassword.length!==0) ||
            (!this.state.validAdminNewPassword && this.state.adminNewPassword.length!==0)
              ? 'Password must be at least 7 characters' 
              : !this.state.validAdminConfirmPassword && this.state.adminNewPassword.length!==0 
              ? `Passwords don't match`
              : ''
            }
          </Dialog.Description>
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.adminOldPassword}
            onChangeText={this.handleAdminOldPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter your old password'  
          />

          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.adminNewPassword}
            onChangeText={this.handleAdminNewPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter your new password'  
          />
          
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.adminConfirmPassword}
            onChangeText={this.handleAdminConfirmPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter the new password again'
          />
          
          <Dialog.Button 
            label="Cancel" 
            onPress={() => {
              this.setState({dialogVisibility: false, adminOldPassword: '', adminNewPassword: '', adminConfirmPassword: '', 
                validAdminConfirmPassword: false, validAdminOldPassword: false, validAdminNewPassword: false, enableConfirm: false
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
  buttonsGroup: {flex: 1, alignItems: 'flex-end', marginTop: 120},
  button: {width: 50, height: 50, borderRadius: 30, backgroundColor: Colors.primary_color, marginBottom: 16, justifyContent: 'center'},
  buttonLabel: {color: '#fff', fontSize: 7, textAlign: 'center'},
})