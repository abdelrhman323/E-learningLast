<<<<<<< HEAD
import React from 'react'
import {createDrawerNavigator, } from '@react-navigation/drawer'
import Colors from '../../Constants/colors';
import StudentCoursesScreen from '../../Screens/StudentScreens/StudentCoursesScreen.js';
import StudentCalendarScreen from '../../Screens/StudentScreens/StudentCalendarScreen.js';
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
          component={StudentCoursesScreen} 
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('studentProfileScreen')}}
              >
                <ProfileAvatar size={'small'}/>
              </TouchableOpacity>
            ),
            title: 'Courses',
          }}
        />

        <StudentDashboardNavigator.Screen 
          name='studentCalendarScreen' 
          component={StudentCalendarScreen} 
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('studentProfileScreen')}}
              >
                <ProfileAvatar size={'small'}/>
              </TouchableOpacity>
            ),
            title: 'Calendar',
          }}
        />

        
      </StudentDashboardNavigator.Navigator>
    );
  }
}

||||||| (empty tree)
=======
import React from 'react'
import {createDrawerNavigator, } from '@react-navigation/drawer'
import Colors from '../../Constants/colors';
import StudentCoursesScreen from '../../Screens/StudentScreens/StudentCoursesScreen.js';
import StudentCalendarScreen from '../../Screens/StudentScreens/StudentCalendarScreen.js';
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
          component={StudentCoursesScreen} 
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('studentProfileScreen')}}
              >
                <ProfileAvatar size={'small'}/>
              </TouchableOpacity>
            ),
            title: 'Courses',
          }}
        />

     

        
      </StudentDashboardNavigator.Navigator>
    );
  }
}

>>>>>>> 4e55b32 (LAST-Modified)
