import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import InstructorDashboardNav from './InstructorDashboardNav'
import InstructorCourseNav from './InstructorCourseNav'
import InstructorProfileScreen from '../../Screens/InstructorScreens/InstructorProfileScreen'

const InstructorNavigator = createStackNavigator()

export default class InstructorNav extends React.Component{

  getHeaderVisibility(route) {
    const routeName = getFocusedRouteNameFromRoute(route)
    switch (routeName) {
      case 'instructorProfileScreen':
        return true
    }
    return false
  }

  getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'studentViewStudentsAccountsScreen';
    console.log(route)
    if(routeName==='instructorProfileScreen'){
      return 'Profile'
    }
    else if(route.name==='instructorCourseNav'){
      return `${route.params.course.name}/${route.params.course.code}`
    }
    return ''
  }

  render(){
    return(
      <InstructorNavigator.Navigator 
        initialRouteName={'instructorDashboardNav'} 
        headerMode={'screen'}  
      >
        
        <InstructorNavigator.Screen 
          name={'instructorDashboardNav'} 
          children={() => <InstructorDashboardNav 
            navigation={this.props.navigation} 
            userToken={this.props.route.params.userToken}
            user={this.props.route.params.user}
          />}
          options={({route}) => ({
            headerShown: this.getHeaderVisibility(route),
            title: this.getHeaderTitle(route)
          })}
        />

        <InstructorNavigator.Screen 
          name={'instructorCourseNav'} 
          component={InstructorCourseNav}
          // children={() => <InstructorCourseNav 
          //   navigation={this.props.navigation} 
          //   userToken={this.props.route.params.userToken}
          // />}
          options={({route}) => ({
            title: this.getHeaderTitle(route)
          })}
        />

        <InstructorNavigator.Screen 
          name='instructorProfileScreen' 
          children={() => <InstructorProfileScreen 
            navigation={this.props.navigation} 
            user={this.props.route.params.user}
            userToken={this.props.route.params.userToken}
          />}
          options={{
            title: 'Profile',
            // headerLeft: () => {null}
          }}
        />
      </InstructorNavigator.Navigator>
    );
  }
}