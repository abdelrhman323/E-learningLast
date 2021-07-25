import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import StudentDashboardNav from './StudentDashboardNav'
import StudentCourseNav from './StudentCourseNav'
import QuizResult from './QuizResult';
import StudentProfileScreen from '../../Screens/StudentScreens/StudentProfileScreen'

const StudentNavigator = createStackNavigator()

export default class StudentNav extends React.Component{

  getHeaderVisibility(route) {
    const routeName = getFocusedRouteNameFromRoute(route)
    switch (routeName) {
      case 'studentProfileScreen':
        return true
    }
    return false
  }

  getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'studentViewStudentsAccountsScreen';
    console.log(route)
    if(routeName==='studentProfileScreen'){
      return 'Profile'
    }
    else if(route.name==='studentCourseNav'){
      return `${route.params.course.name}/${route.params.course.code}`
    }
    return ''
  }

  render(){
    return(
      <StudentNavigator.Navigator 
        initialRouteName={'studentDashboardNav'} 
        headerMode={'screen'}  
      >
        
        <StudentNavigator.Screen 
          name={'studentDashboardNav'} 
          children={() => <StudentDashboardNav 
            navigation={this.props.navigation} 
            userToken={this.props.route.params.userToken}
            user={this.props.route.params.user}
          />}
          options={({route}) => ({
            headerShown: this.getHeaderVisibility(route),
            title: this.getHeaderTitle(route)
          })}
        />

        <StudentNavigator.Screen 
          name={'studentCourseNav'} 
          component={StudentCourseNav}
          // children={() => <StudentCourseNav 
          //   navigation={this.props.navigation} 
          //   user={this.props.route.params.user}
          //   userToken={this.props.route.params.userToken}
          // />}
          options={({route}) => ({
            title: this.getHeaderTitle(route)
          })}
        />

        <StudentNavigator.Screen 
          name='studentProfileScreen' 
          children={() => <StudentProfileScreen
         //   navigation={this.props.navigation} 
            user={this.props.route.params.user}
            userToken={this.props.route.params.userToken}
          />}
          options={{
            title: 'Profile',
            // headerLeft: () => {null}
          }}
        />
        <StudentNavigator.Screen 
          name={'QuizResult'} 
          component={QuizResult}
          // children={() => <QuizResult 
          //   navigation={this.props.navigation} 
          //   userToken={this.props.route.params.userToken}
          //   user={this.props.route.params.user}
          // />}

        />
      </StudentNavigator.Navigator>
    );
  }
}