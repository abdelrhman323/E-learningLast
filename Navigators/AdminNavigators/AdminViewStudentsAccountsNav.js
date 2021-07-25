import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AdminViewStudentInfoScreen from '../../Screens/AdminScreens/AdminViewStudentInfoScreen'
import Colors from '../../Constants/colors';
import AdminManageStudentsAccountsNav from './AdminManageStudentsAccountsNav';

const AdminViewStudentsAccountsNavigator = createStackNavigator()

export default class AdminViewStudentsAccountsNav extends React.Component{

  getHeaderTitle(route){
    return route.params.userName
  }

  render(){
    return(
      <AdminViewStudentsAccountsNavigator.Navigator
        initialRouteName={'adminManageStudentsAccountsNav'}
        headerMode={'screen'}      
      >
        
        <AdminViewStudentsAccountsNavigator.Screen 
          name={'adminManageStudentsAccountsNav'}
          children={() => <AdminManageStudentsAccountsNav 
            navigation={this.props.navigation} 
            userToken={this.props.userToken}
          />}
          options={{
            headerShown: false
          }}
        />

        <AdminViewStudentsAccountsNavigator.Screen 
          name={'adminViewStudentInfoScreen'}
          component={AdminViewStudentInfoScreen}
          options={({ route }) => ({
            headerTintColor: Colors.primary_color,
            headerTitle: this.getHeaderTitle(route)
          })}
        />

      </AdminViewStudentsAccountsNavigator.Navigator>
    );
  }
}