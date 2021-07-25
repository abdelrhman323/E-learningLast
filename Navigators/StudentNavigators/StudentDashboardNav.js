import React from 'react'
import {createDrawerNavigator, } from '@react-navigation/drawer'
import Colors from '../../Constants/colors';
import StudentCoursesScreen from '../../Screens/StudentScreens/StudentCoursesScreen.js';
import StudentCalendarScreen from '../../Screens/StudentScreens/StudentCalendarScreen.js';
import StudentProfileScreen from '../../Screens/StudentScreens/StudentProfileScreen.js';
import StudentCourseGradesScreen from '../../Screens/StudentScreens/StudentCourseGradesScreen.js';
import StudentCourseQuizzesScreen from '../../Screens/StudentScreens/StudentCourseQuizzesScreen.js';
import ProfileAvatar from '../../Components/ProfileAvatar';
import CustomDrawer from '../../Components/CustomDrawer';
import { TouchableOpacity } from 'react-native';

const StudentDashboardNavigator = createDrawerNavigator();

export default class StudentDashboardNav extends React.Component{

  render(){
    return(
      <StudentDashboardNavigator.Navigator 
        initialRouteName={'studentCoursesScreen'}
        drawerType='slide'
        drawerContent={props => <CustomDrawer {...props}/>}
      >
        <StudentDashboardNavigator.Screen 
          name='studentCoursesScreen' 
          children={() => <StudentCoursesScreen 
            navigation={this.props.navigation} 
            userToken={this.props.userToken}
            user={this.props.user}
          />}
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('studentProfileScreen')}}
              >
                <ProfileAvatar size={'small'} name={this.props.user.name}/>
              </TouchableOpacity>
            ),
            title: 'Courses',
          }}
        />

        <StudentDashboardNavigator.Screen 
          name='studentCalendarScreen' 
          children={() => <StudentCalendarScreen 
            navigation={this.props.navigation} userToken={this.props.userToken}
          />}
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('studentProfileScreen')}}
              >
                <ProfileAvatar size={'small'} name={this.props.user.name}/>
              </TouchableOpacity>
            ),
            title: 'Calendar',
          }}
        />

        {/* <StudentDashboardNavigator.Screen 
          name='studentGradesScreen' 
          component={StudentGradesScreen} 
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('studentProfileScreen')}}
              >
                <ProfileAvatar size={'small'} name={this.props.user.name}/>
              </TouchableOpacity>
            ),
            title: 'Grades',
          }}
        />

        <StudentDashboardNavigator.Screen 
          name='studentQuizzesScreen' 
          component={StudentQuizzesScreen} 
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('studentProfileScreen')}}
              >
                <ProfileAvatar size={'small'} name={this.props.user.name}/>
              </TouchableOpacity>
            ),
            title: 'Quizzes',
          }}
        /> */}

        {/* <StudentDashboardNavigator.Screen 
          name='studentProfileScreen' 
          children={() => <studentProfileScreen 
            navigation={this.props.navigation} userToken={this.props.userToken}
          />}
          options={{
            headerShown: false,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('studentProfileScreen')}}
              >
                <ProfileAvatar size={'small'} name={this.props.user.name}/>
              </TouchableOpacity>
            ),
            title: 'Profile',
          }}
        /> */}

        
      </StudentDashboardNavigator.Navigator>
    );
  }
}

