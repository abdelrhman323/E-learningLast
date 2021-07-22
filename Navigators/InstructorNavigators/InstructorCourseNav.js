import React from 'react'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import InstructorCourseOverviewScreen from '../../Screens/InstructorScreens/InstructorCourseOverviewScreen'
import InstructorCourseContentScreen from '../../Screens/InstructorScreens/InstructorCourseContentScreen'
import InstructorCourseQuizzesScreen from '../../Screens/InstructorScreens/InstructorCourseQuizzesScreen'
import InstructorCourseGradesScreen from '../../Screens/InstructorScreens/InstructorCourseGradesScreen'
import InstructorCourseAssignmentsScreen from '../../Screens/InstructorScreens/InstructorCourseAssignmentsScreen'
import Colors from '../../Constants/colors';



const InstructorCourseNavigator = createBottomTabNavigator();

export default class InstructorCourseNav extends React.Component{
  render(){
    return(
      <InstructorCourseNavigator.Navigator
        initialRouteName='content'
        backBehavior='none'
        tabBarOptions={{
          activeTintColor: Colors.primary_color,
          labelStyle: {fontSize: 13}
        }}  
      >
  
        <InstructorCourseNavigator.Screen
          name='content'
          component={InstructorCourseContentScreen}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='list-alt'
                type='font-awesome-5' 
                color={color} 
                size={size} />)
          }}
        />
        <InstructorCourseNavigator.Screen
          name='quizzes'
          component={InstructorCourseQuizzesScreen}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='clipboard-list'
                type='font-awesome-5' 
                color={color} 
                size={size} />)
          }}
        />
        <InstructorCourseNavigator.Screen
          name='assignments'
          component={InstructorCourseAssignmentsScreen}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='file-alt'
                type='font-awesome-5' 
                color={color} 
                size={size} />)
          }}
        />
        <InstructorCourseNavigator.Screen
          name='grades'
          component={InstructorCourseGradesScreen}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='mix'
                type='font-awesome-5' 
                color={color} 
                size={size} />)
          }}
        />
      </InstructorCourseNavigator.Navigator>
    );
  }
}
