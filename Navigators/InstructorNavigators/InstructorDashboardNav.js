import React from 'react'
import {createDrawerNavigator, } from '@react-navigation/drawer'
import Colors from '../../Constants/colors';
import InstructorCoursesScreen from '../../Screens/InstructorScreens/InstructorCoursesScreen.js';
import InstructorCalendarScreen from '../../Screens/InstructorScreens/InstructorCalendarScreen.js';
import InstructorProfileScreen from '../../Screens/InstructorScreens/InstructorProfileScreen.js';
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
          children={() => <InstructorCoursesScreen 
            navigation={this.props.navigation} 
            userToken={this.props.userToken}
            user={this.props.user}
          />}
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('instructorProfileScreen')}}
              >
                <ProfileAvatar size={'small'} name={this.props.user.name}/>
              </TouchableOpacity>
            ),
            title: 'Courses',
          }}
        />

        <InstructorDashboardNavigator.Screen 
          name='instructorCalendarScreen' 
          children={() => <InstructorCalendarScreen 
            navigation={this.props.navigation} 
            userToken={this.props.userToken}
          />}
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('instructorProfileScreen')}}
              >
                <ProfileAvatar size={'small'} name={this.props.user.name}/>
              </TouchableOpacity>
            ),
            title: 'Calendar',
          }}
        />

        {/* <InstructorDashboardNavigator.Screen 
          name='instructorProfileScreen' 
          children={() => <InstructorProfileScreen 
            navigation={this.props.navigation} userToken={this.props.userToken}
          />}
          options={{
            headerShown: false,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('instructorProfileScreen')}}
              >
                <ProfileAvatar size={'small'} name={this.props.user.name}/>
              </TouchableOpacity>
            ),
            title: 'Profile',
          }}
        /> */}

        
      </InstructorDashboardNavigator.Navigator>
    );
  }
}

