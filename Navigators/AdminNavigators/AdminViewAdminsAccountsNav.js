import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AdminViewAdminInfoScreen from '../../Screens/AdminScreens/AdminViewAdminInfoScreen'
import Colors from '../../Constants/colors';
import AdminManageAdminsAccountsNav from './AdminManageAdminsAccountsNav';

const AdminViewAdminsAccountsNavigator = createStackNavigator()

export default class AdminViewAdminsAccountsNav extends React.Component{
  
  getHeaderTitle(route) {
    return route.params.userName
  }


  render(){
    return(
      <AdminViewAdminsAccountsNavigator.Navigator
        initialRouteName={'adminManageAdminsAccountsNav'}
        headerMode={'screen'}      
      >
        
        <AdminViewAdminsAccountsNavigator.Screen 
          name={'adminManageAdminsAccountsNav'}
          children={() => <AdminManageAdminsAccountsNav 
            navigation={this.props.navigation} 
            userToken={this.props.userToken}
          />}
          options={{
            headerShown: false
          }}
        />

        <AdminViewAdminsAccountsNavigator.Screen 
          name={'adminViewAdminInfoScreen'}
          component={AdminViewAdminInfoScreen}
          options={({ route }) => ({
            headerTintColor: Colors.primary_color,
            headerTitle: this.getHeaderTitle(route)
          })}
        />

      </AdminViewAdminsAccountsNavigator.Navigator>
    );
  }
}