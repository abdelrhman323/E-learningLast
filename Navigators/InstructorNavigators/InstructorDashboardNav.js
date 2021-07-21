<<<<<<< HEAD
import React from 'react'
import {createDrawerNavigator, } from '@react-navigation/drawer'
import Colors from '../../Constants/colors';
import InstructorCoursesScreen from '../../Screens/InstructorScreens/InstructorCoursesScreen.js';
import InstructorCalendarScreen from '../../Screens/InstructorScreens/InstructorCalendarScreen.js';
import ProfileAvatar from '../../Components/ProfileAvatar';
import CustomDrawer from '../../Components/CustomDrawer';
import { TouchableOpacity } from 'react-native';


const InstructorDashboardNavigator = createDrawerNavigator();

export default class InstructorDashboardNav extends React.Component{

  render(){
    return(
      <InstructorDashboardNavigator.Navigator 
        initialRouteName={'instructorCoursesScreen'}
        drawerType='slide'
        drawerContent={props => <CustomDrawer {...props}/>}
      >
        <InstructorDashboardNavigator.Screen 
          name='instructorCoursesScreen' 
          component={InstructorCoursesScreen} 
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('instructorProfileScreen')}}
              >
                <ProfileAvatar size={'small'}/>
              </TouchableOpacity>
            ),
            title: 'Courses',
          }}
        />

        <InstructorDashboardNavigator.Screen 
          name='instructorCalendarScreen' 
          component={InstructorCalendarScreen} 
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('instructorProfileScreen')}}
              >
                <ProfileAvatar size={'small'}/>
              </TouchableOpacity>
            ),
            title: 'Calendar',
          }}
        />

        
      </InstructorDashboardNavigator.Navigator>
    );
  }
}

||||||| (empty tree)
=======
import React from 'react'
import {createDrawerNavigator, } from '@react-navigation/drawer'
import Colors from '../../Constants/colors';
import InstructorCoursesScreen from '../../Screens/InstructorScreens/InstructorCoursesScreen.js';
import InstructorCalendarScreen from '../../Screens/InstructorScreens/InstructorCalendarScreen.js';
import ProfileAvatar from '../../Components/ProfileAvatar';
import CustomDrawer from '../../Components/CustomDrawer';
import { TouchableOpacity } from 'react-native';


const InstructorDashboardNavigator = createDrawerNavigator();

export default class InstructorDashboardNav extends React.Component{

  render(){
    return(
      <InstructorDashboardNavigator.Navigator 
        initialRouteName={'instructorCoursesScreen'}
        drawerType='slide'
        drawerContent={props => <CustomDrawer {...props}/>}
      >
        <InstructorDashboardNavigator.Screen 
          name='instructorCoursesScreen' 
          component={InstructorCoursesScreen} 
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('instructorProfileScreen')}}
              >
                <ProfileAvatar size={'small'}/>
              </TouchableOpacity>
            ),
            title: 'Courses',
          }}
        />

      
        
      </InstructorDashboardNavigator.Navigator>
    );
  }
}

>>>>>>> 4e55b32 (LAST-Modified)
