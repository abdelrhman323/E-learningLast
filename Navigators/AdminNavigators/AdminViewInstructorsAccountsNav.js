import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AdminViewInstructorInfoScreen from '../../Screens/AdminScreens/AdminViewInstructorInfoScreen'
import Colors from '../../Constants/colors';
import AdminManageInstructorsAccountsNav from './AdminManageInstructorsAccountsNav';

const AdminViewInstructorsAccountsNavigator = createStackNavigator()

export default class AdminViewInstructorsAccountsNav extends React.Component{
  
  getHeaderTitle(route) {
    return route.params.userName
  }


  render(){
    console.log("AQQQQ :"+ this.props.userToken)

    return(
      <AdminViewInstructorsAccountsNavigator.Navigator
        initialRouteName={'adminManageInstructorsAccountsNav'}
        headerMode={'screen'}      
      >
        
        <AdminViewInstructorsAccountsNavigator.Screen 
          name={'adminManageInstructorsAccountsNav'}
          children={() => <AdminManageInstructorsAccountsNav 
            navigation={this.props.navigation} 
            userToken={this.props.userToken}
          />}
          options={{
            headerShown: false
          }}
        />

        <AdminViewInstructorsAccountsNavigator.Screen 
          name={'adminViewInstructorInfoScreen'}
          component={AdminViewInstructorInfoScreen}
          options={({ route }) => ({
            headerTintColor: Colors.primary_color,
            headerTitle: this.getHeaderTitle(route)
          })}
        />

      </AdminViewInstructorsAccountsNavigator.Navigator>
    );
  }
}