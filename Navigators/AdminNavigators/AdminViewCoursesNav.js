import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AdminViewCourseInfoScreen from '../../Screens/AdminScreens/AdminViewCourseInfoScreen'
import Colors from '../../Constants/colors';
import AdminManageCoursesNav from './AdminManageCoursesNav';

const AdminViewCoursesNavigator = createStackNavigator()

export default class AdminViewCoursesNav extends React.Component{

  getHeaderTitle(route){
    return route.params.userName
  }

  render(){
    return(
      <AdminViewCoursesNavigator.Navigator
        initialRouteName={'adminManageCoursesNav'}
        headerMode={'screen'}      
      >
        
        <AdminViewCoursesNavigator.Screen 
          name={'adminManageCoursesNav'}
          children={() => <AdminManageCoursesNav 
            navigation={this.props.navigation} 
            userToken={this.props.userToken}
          />}
          options={{
            headerShown: false
          }}
        />

        <AdminViewCoursesNavigator.Screen 
          name={'adminViewCourseInfoScreen'}
          component={AdminViewCourseInfoScreen}
          options={({ route }) => ({
            headerTintColor: Colors.primary_color,
            headerTitle: this.getHeaderTitle(route)
          })}
        />

      </AdminViewCoursesNavigator.Navigator>
    );
  }
}