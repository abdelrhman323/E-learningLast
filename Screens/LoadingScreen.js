import React from 'react'
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native'
import Colors from '../Constants/colors';
import Toast from 'react-native-simple-toast'
import { StackActions } from '@react-navigation/routers'
import {url} from '../Constants/numbers'



export default class LoadingScreen extends React.Component{
     
  state = {
    userToken: null,
    user: {},
  }
  
  componentDidMount(){
    this.loginUser()
    
  }

  loginUser = async () => {
      
    //======================Login=======================//
    try{
      const response = await fetch(`${url}/users/login`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: this.props.route.params.username,
          password: this.props.route.params.password,
        })
      })
      
      const result = await response.json()
      if(response.status === 400){
        Toast.show(result)
        this.props.navigation.dispatch(StackActions.replace('loginScreen'))
      }
      else{
        this.setState({userToken: result.token, user: result.user}, 
          this.props.navigation.dispatch(StackActions.replace(`${result.user.role}Nav`,
            {
              userToken: result.token,
              user: result.user,
            }
          )))
      }
    } catch (e) {
      console.log(e.message)
    }

  }

  render(){
    
    return(
      <View style={styles.container}>
        <ActivityIndicator color={'#fff'} size='large' />
      </View>
    );
  }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary_color,
        justifyContent: 'center',
        alignContent: 'center'    
        
    }
})